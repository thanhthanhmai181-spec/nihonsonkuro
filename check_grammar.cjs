const fs = require('fs');
const path = require('path');

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      getAllFiles(path.join(dir, file), fileList);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
}

const files = getAllFiles('src');

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  
  lines.forEach((line, idx) => {
    // 1. Check for "nước" in Japanese text, e.g. ki*nước*, mi*nước*, し*nước*, etc.
    if (line.includes('nước') && !file.includes('vocab') && !file.includes('exam')) {
      // Check if it's not a normal Vietnamese translation word
      if (/ki\*nước\*|\*nước\*|minước|kinước|しnước|nước[ぁ-んァ-ヶ一-龠]|[ぁ-んァ-ヶ一-龠]nước/.test(line)) {
        console.log(`[NUOC BUG] ${file}:${idx+1} -> ${line.trim()}`);
      }
    }

    // 2. Check for Romaji mixed inside Japanese words/sentences in grammar data
    // match single or double english letters attached to Japanese kanji or kana
    const matches = line.match(/[\u3040-\u30ff\u4e00-\u9faf]+[a-zA-Z]{1,10}[\u3040-\u30ff\u4e00-\u9faf]*/g);
    if (matches && (file.includes('grammar') || file.includes('Grammar') || file.includes('lessons'))) {
      matches.forEach(m => {
        // filter out keywords like class, div, span, option, correct, explanation, label, type, etc.
        if (!/^(class|div|span|option|correct|explanation|label|type|style|const|import|export|function|return|interface|type|default|false|true|null|undefined)$/i.test(m)
           && !m.includes('class') && !m.includes('http') && !m.includes('div') && !m.includes('span') && !m.includes('style')
           && !m.includes('bg-') && !m.includes('text-') && !m.includes('font-') && !m.includes('border-') && !m.includes('flex')) {
          console.log(`[ROMAJI IN JP] ${file}:${idx+1} -> match: "${m}" in: ${line.trim().substring(0, 120)}`);
        }
      });
    }
  });
}
