const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/LG/.claude/projects/C--Users-LG-aspice-app/';
const targets = fs.readdirSync(dir).filter(n => n.endsWith('.jsonl'));
const re = /(LoginPage\.jsx|SignupPage\.jsx|ProfileModal\.jsx|App\.jsx)$/;
const cutoff = Date.parse('2026-04-23T00:50:00Z');

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
      const tsParsed = ts ? Date.parse(ts) : 0;
      if (Array.isArray(c)) {
        c.forEach(x => {
          if (x.type === 'tool_use' && x.input) {
            const fpath = (x.input.file_path || '').replace(/\\/g, '/');
            if (re.test(fpath) && (x.name === 'Write' || x.name === 'Edit')) {
              const beforeCutoff = tsParsed && tsParsed < cutoff ? 'BEFORE' : 'AFTER ';
              events.push(`  line ${i+1} ${ts} [${beforeCutoff}] ${x.name} ${fpath} content_len=${(x.input.content||'').length} new_len=${(x.input.new_string||'').length}`);
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
