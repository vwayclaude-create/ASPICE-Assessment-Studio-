const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/LG/.claude/projects/C--Users-LG-aspice-app/';
const targets = [
  '19a33089-64e2-4458-9e66-cfe7cbf930fe.jsonl',
  '964e85e2-9fca-4885-89c9-fc8e437fdffb.jsonl',
  'b1403627-71c2-4e01-b7f0-5ccf0843740c.jsonl',
  '3148ab6e-08ef-4ce3-83c6-e999c430fb59.jsonl',
  '8d5b2cd6-8f6c-4c32-8e04-401e8b4af75f.jsonl',
  '2827030a-7ff0-4f35-83d2-7ed53488a31b.jsonl',
];
const re = /AuthContext\.jsx|userStore\.js|EmailVerifyPage\.jsx|supabaseClient/;
for (const f of targets) {
  const fp = path.join(dir, f);
  if (!fs.existsSync(fp)) { console.log('missing', fp); continue; }
  console.log('=== ' + f + ' ===');
  const lines = fs.readFileSync(fp, 'utf8').split('\n');
  lines.forEach((l, i) => {
    if (!l.trim()) return;
    try {
      const obj = JSON.parse(l);
      const c = obj.message && obj.message.content;
      const ts = obj.timestamp || '';
      if (Array.isArray(c)) {
        c.forEach(x => {
          if (x.type === 'tool_use' && x.input) {
            const fpath = x.input.file_path || '';
            if (re.test(fpath)) {
              console.log('line', i+1, ts, 'tool', x.name, 'file', fpath, 'content_len', (x.input.content||'').length, 'new_len', (x.input.new_string||'').length);
            }
          }
        });
      }
    } catch (e) {}
  });
}
