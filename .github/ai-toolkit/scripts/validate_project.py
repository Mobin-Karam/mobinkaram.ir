#!/usr/bin/env python3
from __future__ import annotations
import json, os, shutil, subprocess, sys
from pathlib import Path

ROOT=Path(os.environ.get('AI_TOOLKIT_ROOT',Path.cwd())).resolve()
MODE=(sys.argv[1] if len(sys.argv)>1 else 'quick').lower()
if MODE not in ('quick','full'): raise SystemExit('usage: validate_project.py [quick|full]')
IGNORE={'.git','node_modules','vendor','.venv','venv','dist','build','target','.next','.turbo','coverage','.agent-state'}
failures=[]; ran=[]; skipped=[]

def ignored(p): return any(part in IGNORE for part in p.relative_to(ROOT).parts)
def files(name): return sorted(p for p in ROOT.rglob(name) if not ignored(p))
def have(cmd): return shutil.which(cmd) is not None

def run(cmd,cwd,label,timeout=1200):
    print(f'\n==> {label}\n    cwd: {cwd}')
    try: p=subprocess.run(cmd,cwd=cwd,timeout=timeout)
    except FileNotFoundError: skipped.append(f'{label}: command not found'); print('SKIP: command not found'); return
    except subprocess.TimeoutExpired: failures.append(f'{label}: timeout'); print('FAIL: timeout'); return
    ran.append(label)
    if p.returncode: failures.append(f'{label}: exit {p.returncode}')

def nearest_pm(d):
    cur=d
    while True:
        for lock,pm in [('pnpm-lock.yaml','pnpm'),('yarn.lock','yarn'),('bun.lock','bun'),('bun.lockb','bun'),('package-lock.json','npm')]:
            if (cur/lock).exists() and have(pm): return pm
        if cur==ROOT or ROOT not in cur.parents: break
        cur=cur.parent
    return 'npm' if have('npm') else None

def deps_available(d):
    cur=d
    while True:
        if (cur/'node_modules').exists(): return True
        if cur==ROOT or ROOT not in cur.parents: break
        cur=cur.parent
    return False

def node_validate(p):
    try: data=json.loads(p.read_text())
    except Exception as e: failures.append(f'{p}: invalid JSON: {e}'); return
    scripts=data.get('scripts') or {}; d=p.parent
    if not scripts: return
    if not deps_available(d): skipped.append(f'{p}: node dependencies not installed'); return
    pm=nearest_pm(d)
    if not pm: skipped.append(f'{p}: package manager unavailable'); return
    names=[]
    for candidate in ('typecheck','type-check','check','lint','test'):
        if candidate in scripts and candidate not in names: names.append(candidate)
    if MODE=='full' and 'build' in scripts: names.append('build')
    for name in names:
        cmd=['npm','run',name] if pm=='npm' else ([pm,name] if pm=='yarn' else [pm,'run',name])
        run(cmd,d,f'{p.parent}: {" ".join(cmd)}')

def unique_dirs(paths): return sorted({p.parent for p in paths}, key=str)

def main():
    for p in files('package.json'): node_validate(p)

    pyroots=unique_dirs(files('pyproject.toml')+files('requirements.txt'))
    for d in pyroots:
        if have('ruff'): run(['ruff','check','.'],d,f'{d}: ruff check')
        if have('mypy') and ((d/'mypy.ini').exists() or (d/'pyproject.toml').exists()): run(['mypy','.'],d,f'{d}: mypy')
        has_pytests=(d/'tests').exists() or any(d.glob('test_*.py')) or any(d.glob('*_test.py'))
        if has_pytests and have('pytest'): run(['pytest','-q'],d,f'{d}: pytest')
        elif has_pytests: skipped.append(f'{d}: pytest unavailable')

    for mod in files('go.mod'):
        d=mod.parent
        if have('go'):
            run(['go','test','./...'],d,f'{d}: go test')
            if MODE=='full':
                run(['go','vet','./...'],d,f'{d}: go vet')
                run(['go','build','./...'],d,f'{d}: go build')
        else: skipped.append(f'{d}: go unavailable')

    cargo=files('Cargo.toml')
    workspace_roots=[]
    for p in cargo:
        try: is_ws='[workspace]' in p.read_text(errors='ignore')
        except Exception: is_ws=False
        if is_ws: workspace_roots.append(p)
    cargo_targets=workspace_roots or cargo
    for p in cargo_targets:
        d=p.parent
        if have('cargo'):
            run(['cargo','check','--workspace'],d,f'{d}: cargo check')
            run(['cargo','test','--workspace'],d,f'{d}: cargo test')
            if MODE=='full': run(['cargo','build','--workspace'],d,f'{d}: cargo build')
        else: skipped.append(f'{d}: cargo unavailable')

    poms=files('pom.xml'); pom_targets=[p for p in poms if p.parent==ROOT] or poms
    for p in pom_targets:
        d=p.parent
        if have('mvn'):
            cmd=['mvn','-B','test'] if MODE=='quick' else ['mvn','-B','verify']
            run(cmd,d,f'{d}: Maven {cmd[-1]}')
        else: skipped.append(f'{d}: mvn unavailable')

    gradlew=files('gradlew')
    gradle_targets=[p for p in gradlew if p.parent==ROOT] or gradlew
    for p in gradle_targets:
        cmd=['bash',str(p),'test']
        if MODE=='full': cmd=['bash',str(p),'check']
        run(cmd,p.parent,f'{p.parent}: Gradle {cmd[-1]}')

    # Handle solution/project wildcards directly.
    slns=sorted(p for p in ROOT.rglob('*.sln') if not ignored(p))
    csprojs=sorted(p for p in ROOT.rglob('*.csproj') if not ignored(p))
    dotnet_targets=slns or csprojs
    if dotnet_targets:
        if have('dotnet'):
            for p in dotnet_targets: run(['dotnet','test',str(p)],p.parent,f'{p}: dotnet test')
        else: skipped.append('.NET project detected: dotnet unavailable')

    for p in files('composer.json'):
        d=p.parent
        if have('composer'): run(['composer','validate','--no-check-publish'],d,f'{d}: composer validate')
        else: skipped.append(f'{d}: composer unavailable')

    for p in files('Gemfile'):
        d=p.parent
        if have('bundle'):
            run(['bundle','check'],d,f'{d}: bundle check')
            if (d/'Rakefile').exists(): run(['bundle','exec','rake','test'],d,f'{d}: rake test')
        else: skipped.append(f'{d}: bundle unavailable')

    for p in files('pubspec.yaml'):
        d=p.parent
        is_flutter=(d/'android').exists() or (d/'ios').exists()
        tool='flutter' if is_flutter and have('flutter') else ('dart' if have('dart') else None)
        if tool:
            run([tool,'analyze'],d,f'{d}: {tool} analyze')
            if (d/'test').exists(): run([tool,'test'],d,f'{d}: {tool} test')
        else: skipped.append(f'{d}: Dart/Flutter toolchain unavailable')

    for p in files('Package.swift'):
        d=p.parent
        if have('swift'):
            run(['swift','test'],d,f'{d}: swift test')
            if MODE=='full': run(['swift','build','-c','release'],d,f'{d}: swift release build')
        else: skipped.append(f'{d}: swift unavailable')

    print('\n=== Validation summary ===')
    print(f'Mode: {MODE}')
    print(f'Commands run: {len(ran)}')
    for x in ran: print('  RUN ',x)
    for x in skipped: print('  SKIP',x)
    for x in failures: print('  FAIL',x)
    if failures: raise SystemExit(1)
if __name__=='__main__': main()
