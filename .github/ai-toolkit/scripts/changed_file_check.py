#!/usr/bin/env python3
import json,sys
from pathlib import Path
try: data=json.load(sys.stdin)
except Exception: print('{}'); raise SystemExit(0)
args=data.get('toolArgs') if 'toolArgs' in data else data.get('tool_input')
text=json.dumps(args) if not isinstance(args,str) else args
notes=[]
# Keep this hook intentionally cheap: it provides reminders, not full builds.
if '.github/hooks/' in text and '.json' in text:
    notes.append('Hook configuration changed: verify valid JSON and hook configuration version 1.')
if any(x in text for x in ('migration','schema.prisma','.sql')):
    notes.append('Persistence-related files changed: review migration/data compatibility and run database validation.')
if notes: print(json.dumps({'additionalContext':' '.join(notes)}))
else: print('{}')
