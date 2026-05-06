const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/LG/.claude/projects/C--Users-LG-aspice-app/';
const targets = fs.readdirSync(dir).filter(n => n.endsWith('.jsonl'));
const re = /AuthContext\.jsx|userStore\.js|EmailVerifyPage\.jsx|supabaseClient/;
for (const f of targets) {
  const fp = path.join(dir, f);
  const lines = fs.readFileSync(fp, 'utf8').split('\n');
  const events = [];
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
            if (re.test(fpath) && (x.name === 'Write' || x.name === 'Edit')) {
              events.push(`  line ${i+1} ${ts} ${x.name} ${fpath} content_len=${(x.input.content||'').length} new_len=${(x.input.new_string||'').length}`);
            }
          }
        });
      }
    } catch (e) {}
  });
  if (events.length) {
    console.log('=== ' + f + ' ===');
    events.forEach(e => console.log(e));
  }
}
