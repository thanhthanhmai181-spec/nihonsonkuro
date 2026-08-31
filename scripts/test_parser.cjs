const fs = require('fs');
const path = require('path');

// Test parser logic on page text
function parseEntries(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const items = [];
  let current = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^\d+$/.test(line)) {
      if (current) items.push(current);
      current = { id: parseInt(line), rawLines: [] };
    } else if (current) {
      current.rawLines.push(line);
    }
  }
  if (current) items.push(current);
  return items;
}

console.log("Parser test ready");
