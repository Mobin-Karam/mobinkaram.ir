#!/usr/bin/env python3
import json,re,sys

def strings(value):
    if isinstance(value, str):
        yield value
    elif isinstance(value, dict):
        for k,v in value.items():
            yield str(k)
            yield from strings(v)
    elif isinstance(value, (list,tuple)):
        for v in value: yield from strings(v)
    elif value is not None:
        yield str(value)

try:
    data=json.load(sys.stdin)
except Exception:
    print('{}'); raise SystemExit(0)
name=(data.get('toolName') or data.get('tool_name') or '').lower()
args=data.get('toolArgs') if 'toolArgs' in data else data.get('tool_input')
text='\n'.join(strings(args))
if name in ('bash','powershell','terminal','execute') or 'bash' in name or 'terminal' in name or 'powershell' in name:
    patterns=[
      (r'(^|\n|[;&|]\s*)rm\s+-rf\s+/(?:\s|$|\*)','Refusing recursive deletion of the filesystem root.'),
      (r'(^|\n|[;&|]\s*)rm\s+-rf\s+~(?:/|\s|$)','Refusing recursive deletion of the home directory.'),
      (r'\bmkfs(?:\.|\s)','Refusing filesystem formatting command.'),
      (r'\bdd\s+[^\n]*\bof=/dev/','Refusing raw-device overwrite command.'),
      (r':\(\)\s*\{\s*:\|:&\s*;\s*\}\s*;\s*:','Refusing fork-bomb command.'),
      (r'\bgit\s+clean\s+[^\n]*(?:(?:-\S*x\S*)[^\n]*(?:-\S*f\S*)|(?:-\S*f\S*)[^\n]*(?:-\S*x\S*))','Refusing destructive git clean including ignored files.'),
    ]
    for pat,reason in patterns:
        if re.search(pat,text,re.I):
            print(json.dumps({'permissionDecision':'deny','permissionDecisionReason':reason})); raise SystemExit(0)
print('{}')
