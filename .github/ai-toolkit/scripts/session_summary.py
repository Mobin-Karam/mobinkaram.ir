#!/usr/bin/env python3
import json, subprocess
from pathlib import Path
root=Path.cwd()
def run(*cmd):
    try:
        p=subprocess.run(cmd,cwd=root,text=True,capture_output=True,timeout=5)
        return p.stdout.strip() if p.returncode==0 else ''
    except Exception:return ''
status=run('git','status','--short')
msg='Session ended.' + (f' Working tree changes remain:\n{status[:4000]}' if status else ' Working tree is clean.')
print(json.dumps({'additionalContext':msg}))
