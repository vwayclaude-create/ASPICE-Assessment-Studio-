// Replay all Write/Edit events for the 4 target files, across all transcripts,
// in chronological order, stopping at the Supabase cutoff (2026-04-23T00:50 UTC).
const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/LG/.claude/projects/C--Users-LG-aspice-app/';
const targets = fs.readdirSync(dir).filter(n => n.endsWith('.jsonl'));
const re = /(LoginPage\.jsx|SignupPage\.jsx|ProfileModal\.jsx|App\.jsx)$/;
const cutoff = Date.parse('2026-04-23T00:50:00Z');

// Collect all events
const events = [];
for (const f of targets) {
  const fp = path.join(dir, f);
  const lines = fs.readFileSync(fp, 'utf8').split('\n');
  lines.forEach((l, i) => {
    if (!l.trim()) return;
    try {
      const obj = JSON.parse(l);
      const c = obj.message && obj.message.content;
      const ts = obj.timestamp || '';
      const tsParsed = ts ? Date.parse(ts) : 0;
      if (!tsParsed || tsParsed >= cutoff) return;
      if (Array.isArray(c)) {
        c.forEach(x => {
          if (x.type !== 'tool_use' || !x.input) return;
          if (x.name !== 'Write' && x.name !== 'Edit') return;
          const fpath = (x.input.file_path || '').replace(/\\/g, '/');
          if (!re.test(fpath)) return;
          events.push({
            ts: tsParsed,
            tsStr: ts,
            file: f,
            line: i + 1,
            name: x.name,
            input: x.input,
            basename: path.basename(fpath),
          });
        });
      }
    } catch (e) {}
  });
}

events.sort((a, b) => a.ts - b.ts);

const state = {};
const lastTs = {};

for (const ev of events) {
  const b = ev.basename;
  if (ev.name === 'Write') {
    state[b] = ev.input.content;
    lastTs[b] = ev.tsStr;
    console.log(`${ev.tsStr} ${ev.file}:${ev.line} WRITE ${b} (${state[b].length} chars)`);
  } else {
    const cur = state[b];
    if (cur == null) {
      console.log(`${ev.tsStr} ${ev.file}:${ev.line} EDIT ${b} - NO PRIOR STATE, skipping`);
      continue;
    }
    const oldS = ev.input.old_string;
    const newS = ev.input.new_string;
    const replaceAll = !!ev.input.replace_all;
    if (replaceAll) {
      if (cur.indexOf(oldS) < 0) {
        console.log(`${ev.tsStr} ${ev.file}:${ev.line} EDIT ${b} replace_all - OLD STRING NOT FOUND`);
        continue;
      }
      const before = cur;
      state[b] = cur.split(oldS).join(newS);
      const occ = (before.length - state[b].length) / Math.max(1, (oldS.length - newS.length));
      lastTs[b] = ev.tsStr;
      console.log(`${ev.tsStr} ${ev.file}:${ev.line} EDIT ${b} replace_all (${occ}x) (${state[b].length} chars)`);
    } else {
      const idx = cur.indexOf(oldS);
      if (idx < 0) {
        console.log(`${ev.tsStr} ${ev.file}:${ev.line} EDIT ${b} - OLD STRING NOT FOUND. old_len=${oldS.length}`);
        console.log('  old preview:', JSON.stringify(oldS.substring(0, 80)));
        continue;
      }
      const occ = cur.split(oldS).length - 1;
      if (occ > 1) {
        console.log(`${ev.tsStr} ${ev.file}:${ev.line} EDIT ${b} - WARN ${occ} occurrences, using first`);
      }
      state[b] = cur.substring(0, idx) + newS + cur.substring(idx + oldS.length);
      lastTs[b] = ev.tsStr;
      console.log(`${ev.tsStr} ${ev.file}:${ev.line} EDIT ${b} (${state[b].length} chars)`);
    }
  }
}

console.log('\n=== FINAL STATE ===');
const wantBasenames = ['LoginPage.jsx', 'SignupPage.jsx', 'ProfileModal.jsx', 'App.jsx'];
const outDir = 'C:/Users/LG/aspice-app/.recovery/';
for (const b of wantBasenames) {
  if (state[b] == null) {
    console.log(`${b}: NOT RECOVERED`);
    continue;
  }
  const out = outDir + b.replace(/\.(jsx|js)$/, '.pre.$1');
  fs.writeFileSync(out, state[b]);
  console.log(`${b}: wrote ${out} (${state[b].length} chars), last touched ${lastTs[b]}`);
}
