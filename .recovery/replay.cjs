const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/LG/.claude/projects/C--Users-LG-aspice-app/';
const file = path.join(dir, '8d5b2cd6-8f6c-4c32-8e04-401e8b4af75f.jsonl');
const lines = fs.readFileSync(file, 'utf8').split('\n');

// state of each file
const state = {};

const targetRe = /(AuthContext\.jsx|userStore\.js|EmailVerifyPage\.jsx)$/;

lines.forEach((l, i) => {
  if (!l.trim()) return;
  let obj;
  try { obj = JSON.parse(l); } catch (e) { return; }
  const c = obj.message && obj.message.content;
  if (!Array.isArray(c)) return;
  c.forEach(x => {
    if (x.type !== 'tool_use' || !x.input) return;
    const fp = (x.input.file_path || '').replace(/\\/g, '/');
    if (!targetRe.test(fp)) return;
    const basename = path.basename(fp);
    if (x.name === 'Write') {
      state[basename] = x.input.content;
      console.log(`line ${i+1} WRITE ${basename} (now ${state[basename].length} chars)`);
    } else if (x.name === 'Edit') {
      const cur = state[basename];
      if (cur == null) {
        console.log(`line ${i+1} EDIT ${basename} - NO PRIOR STATE, skipping`);
        return;
      }
      const oldS = x.input.old_string;
      const newS = x.input.new_string;
      const replaceAll = !!x.input.replace_all;
      if (replaceAll) {
        const before = cur;
        state[basename] = cur.split(oldS).join(newS);
        const occ = (before.length - state[basename].length) / (oldS.length - newS.length);
        console.log(`line ${i+1} EDIT ${basename} replace_all (${occ}x) (now ${state[basename].length} chars)`);
      } else {
        const idx = cur.indexOf(oldS);
        if (idx < 0) {
          console.log(`line ${i+1} EDIT ${basename} - OLD STRING NOT FOUND. old_len=${oldS.length} new_len=${newS.length}`);
          console.log('  old preview:', JSON.stringify(oldS.substring(0,80)));
          return;
        }
        const occ = cur.split(oldS).length - 1;
        if (occ > 1) {
          console.log(`line ${i+1} EDIT ${basename} - WARN ${occ} occurrences, using first`);
        }
        state[basename] = cur.substring(0, idx) + newS + cur.substring(idx + oldS.length);
        console.log(`line ${i+1} EDIT ${basename} (now ${state[basename].length} chars)`);
      }
    }
  });
});

const outDir = 'C:/Users/LG/aspice-app/.recovery/';
for (const k of Object.keys(state)) {
  const out = outDir + k.replace(/\.(jsx|js)$/, '.pre.$1');
  fs.writeFileSync(out, state[k]);
  console.log(`wrote ${out} (${state[k].length} chars)`);
}
