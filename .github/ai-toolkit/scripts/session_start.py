#!/usr/bin/env python3
import json, os, subprocess
from pathlib import Path
root=Path(os.environ.get('AI_TOOLKIT_ROOT',Path.cwd())).resolve()
script=root/'.github/ai-toolkit/scripts/detect_project.py'
env=dict(os.environ,AI_TOOLKIT_ROOT=str(root))
try:
    p=subprocess.run(['python3',str(script)],cwd=root,env=env,text=True,capture_output=True,timeout=30)
    if p.returncode==0:
        data=json.loads(p.stdout)
        summary=f"Repository discovery complete: type={data.get('repositoryType')}, languages={', '.join(data.get('languages',[])) or 'unknown'}, frameworks={', '.join(data.get('frameworks',[])) or 'none detected'}. Read .agent-state/project.json before major edits."
    else: summary='Repository discovery script failed; inspect the repository manually before editing.'
except Exception:
    summary='Repository discovery could not run; inspect the repository manually before editing.'
print(json.dumps({'additionalContext':summary}))
