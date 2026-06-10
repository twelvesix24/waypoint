// build-articles.js
// Runs at Netlify build time. Scans _articles/ for .md files
// and writes _articles/index.json listing their filenames.
// The front-end fetches this list, then fetches each file individually.

const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '_articles');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
  console.log('Created _articles/ directory.');
}

const files = fs.readdirSync(dir)
  .filter(f => f.endsWith('.md'))
  .sort()
  .reverse(); // newest first by filename date prefix

fs.writeFileSync(
  path.join(dir, 'index.json'),
  JSON.stringify(files, null, 2)
);

console.log(`Built _articles/index.json with ${files.length} article(s).`);
