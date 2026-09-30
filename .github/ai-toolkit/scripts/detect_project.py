#!/usr/bin/env python3
from __future__ import annotations
import json, os, subprocess
from pathlib import Path

ROOT = Path(os.environ.get('AI_TOOLKIT_ROOT', Path.cwd())).resolve()
CONFIG = ROOT / '.github' / 'ai-toolkit' / 'config.json'
DEFAULT_IGNORE = {'.git','node_modules','vendor','.venv','venv','dist','build','target','.next','.turbo','coverage','__pycache__','.agent-state'}
MANIFESTS = {
    'package.json':'javascript', 'pyproject.toml':'python', 'requirements.txt':'python',
    'go.mod':'go', 'Cargo.toml':'rust', 'pom.xml':'java', 'build.gradle':'java',
    'build.gradle.kts':'kotlin', 'composer.json':'php', 'Gemfile':'ruby',
    'pubspec.yaml':'dart', 'Package.swift':'swift'
}

def load_config():
    try: return json.loads(CONFIG.read_text())
    except Exception: return {}

def run(*cmd):
    try:
        p=subprocess.run(cmd,cwd=ROOT,text=True,capture_output=True,timeout=5)
        return p.stdout.strip() if p.returncode==0 else None
    except Exception: return None

def rel(p):
    try: return str(p.relative_to(ROOT)) or '.'
    except Exception: return str(p)

def package_info(path: Path):
    try: data=json.loads(path.read_text(encoding='utf-8'))
    except Exception: return {}
    deps={}
    for key in ('dependencies','devDependencies','peerDependencies','optionalDependencies'):
        deps.update(data.get(key) or {})
    names=set(deps); fw=[]
    checks=[('next','nextjs'),('react','react'),('vue','vue'),('svelte','svelte'),('@angular/core','angular'),
            ('@nestjs/core','nestjs'),('express','express'),('fastify','fastify'),('hono','hono'),
            ('electron','electron'),('@tauri-apps/api','tauri'),('react-native','react-native'),('expo','expo')]
    for dep,name in checks:
        if dep in names: fw.append(name)
    pm=None
    for lock,name in [('pnpm-lock.yaml','pnpm'),('yarn.lock','yarn'),('bun.lock','bun'),('bun.lockb','bun'),('package-lock.json','npm')]:
        if (path.parent/lock).exists(): pm=name; break
    if not pm and data.get('packageManager'): pm=str(data['packageManager']).split('@')[0]
    return {'packageManager':pm,'frameworks':fw,'scripts':sorted((data.get('scripts') or {}).keys()),'workspaces':bool(data.get('workspaces'))}

def text_detect(path: Path, language: str):
    try: text=path.read_text(encoding='utf-8',errors='ignore').lower()
    except Exception: text=''
    fw=[]
    if language=='python':
        for token,name in [('django','django'),('fastapi','fastapi'),('flask','flask')]:
            if token in text: fw.append(name)
    elif language in ('java','kotlin') and 'spring' in text: fw.append('spring')
    elif language=='php' and 'laravel' in text: fw.append('laravel')
    return {'frameworks':fw}

def classify(language, frameworks, root):
    f=set(frameworks)
    if f & {'react-native','expo'}: return 'mobile'
    if f & {'electron','tauri'}: return 'desktop-or-mobile'
    if f & {'nextjs','react','vue','svelte','angular'}: return 'frontend'
    if f & {'nestjs','express','fastify','hono','django','fastapi','flask','spring','laravel'}: return 'backend'
    low=root.lower()
    if any(x in low.split('/') for x in ('frontend','web','ui','client')): return 'frontend'
    if any(x in low.split('/') for x in ('backend','api','server','service','services')): return 'backend'
    if any(x in low.split('/') for x in ('mobile','android','ios')): return 'mobile'
    return 'project-or-library'

def main():
    cfg=load_config(); dcfg=cfg.get('discovery',{})
    max_depth=int(dcfg.get('maxDepth',6)); ignore=DEFAULT_IGNORE|set(dcfg.get('ignoreDirectories',[]))
    manifests=[]; languages=set(); frameworks=set(); package_managers=set(); roots=[]; infra=set(); db=set()
    for dirpath, dirnames, filenames in os.walk(ROOT):
        p=Path(dirpath); depth=len(p.relative_to(ROOT).parts)
        dirnames[:]=[d for d in dirnames if d not in ignore]
        if depth>max_depth: dirnames[:]=[]; continue
        for fn in filenames:
            low=fn.lower()
            if low == 'dockerfile' or low.startswith('docker-compose') or low.startswith('compose.'):
                infra.add('docker')
            if low.endswith('.tf'):
                infra.add('terraform')
            if low == 'schema.prisma':
                db.add('prisma')
            if low.endswith('.sql'):
                db.add('sql')
            if fn not in MANIFESTS and not fn.endswith(('.csproj','.fsproj','.vbproj')): continue
            lang=MANIFESTS.get(fn,'dotnet'); fp=p/fn; languages.add(lang)
            info=package_info(fp) if fn=='package.json' else text_detect(fp,lang)
            for x in info.get('frameworks',[]): frameworks.add(x)
            if info.get('packageManager'): package_managers.add(info['packageManager'])
            item={'path':rel(fp),'root':rel(p),'type':fn,'language':lang,**info}
            item['kind']=classify(lang,item.get('frameworks',[]),item['root'])
            manifests.append(item); roots.append(rel(p))
    for lock,pm in [('pnpm-lock.yaml','pnpm'),('yarn.lock','yarn'),('package-lock.json','npm'),('bun.lock','bun'),('bun.lockb','bun'),('uv.lock','uv'),('poetry.lock','poetry')]:
        if (ROOT/lock).exists(): package_managers.add(pm)
    if (ROOT/'.github/workflows').exists(): infra.add('github-actions')
    git={'branch':run('git','branch','--show-current'),'head':run('git','rev-parse','--short','HEAD'),'remote':run('git','remote','get-url','origin'),'changedFiles':(run('git','status','--porcelain') or '').splitlines()}
    components=[]; seen=set()
    for m in manifests:
        key=(m['root'],m['kind'])
        if key in seen: continue
        seen.add(key)
        components.append({'root':m['root'],'kind':m['kind'],'language':m['language'],'frameworks':m.get('frameworks',[])})
    result={'toolkitVersion':3,'root':str(ROOT),'repositoryType':'monorepo' if len(set(roots))>1 or any(m.get('workspaces') for m in manifests) else 'single-project','languages':sorted(languages),'frameworks':sorted(frameworks),'packageManagers':sorted(package_managers),'components':sorted(components,key=lambda x:(x['root'],x['kind'])),'manifests':sorted(manifests,key=lambda x:x['path']),'databaseSignals':sorted(db),'infrastructure':sorted(infra),'git':git}
    state=ROOT/'.agent-state'; state.mkdir(exist_ok=True)
    (state/'project.json').write_text(json.dumps(result,indent=2)+"\n",encoding='utf-8')
    lines=['# Detected Project Context','',f"- Repository type: `{result['repositoryType']}`",f"- Languages: {', '.join(result['languages']) or 'UNKNOWN'}",f"- Frameworks: {', '.join(result['frameworks']) or 'none detected'}",f"- Package managers: {', '.join(result['packageManagers']) or 'none detected'}",f"- Infrastructure: {', '.join(result['infrastructure']) or 'none detected'}",'','## Components','']
    if components:
        for c in result['components']: lines.append(f"- `{c['root']}` — {c['kind']} — {c['language']}" + (f" ({', '.join(c['frameworks'])})" if c['frameworks'] else ''))
    else: lines.append('- No supported manifest detected; inspect manually.')
    lines += ['','## Git','',f"- Branch: `{git.get('branch') or 'UNKNOWN'}`",f"- HEAD: `{git.get('head') or 'UNKNOWN'}`",'','Generated by `.github/ai-toolkit/scripts/detect-project.sh`.']
    (state/'context.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
    print(json.dumps(result,indent=2))
if __name__=='__main__': main()
