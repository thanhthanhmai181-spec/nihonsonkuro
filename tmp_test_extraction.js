import fs from "fs";

function testExtraction(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const choukaiStart = fileContent.indexOf("choukai: [");
  if (choukaiStart === -1) {
    console.log("No choukai section found in", filePath);
    return;
  }
  
  // Find closing bracket
  let bracketCount = 1;
  let index = choukaiStart + "choukai: [".length;
  while (bracketCount > 0 && index < fileContent.length) {
    if (fileContent[index] === '[') bracketCount++;
    else if (fileContent[index] === ']') bracketCount--;
    index++;
  }
  const choukaiBlock = fileContent.substring(choukaiStart, index);
  
  // Match objects
  let objects = [];
  let braceCount = 0;
  let startPos = -1;
  for (let i = 0; i < choukaiBlock.length; i++) {
    if (choukaiBlock[i] === '{') {
      if (braceCount === 0) {
        startPos = i;
      }
      braceCount++;
    } else if (choukaiBlock[i] === '}') {
      braceCount--;
      if (braceCount === 0 && startPos !== -1) {
        objects.push({
          start: startPos,
          end: i + 1,
          text: choukaiBlock.substring(startPos, i + 1)
        });
      }
    }
  }
  
  console.log(`Extracted ${objects.length} objects from choukai section of ${filePath}`);
  
  // Show first 3 parsed objects
  for (let i = 0; i < Math.min(objects.length, 3); i++) {
    const text = objects[i].text;
    const idMatch = text.match(/id:\s*['"]([^'"]+)['"]/);
    const typeMatch = text.match(/type:\s*['"]([^'"]+)['"]/);
    const qMatch = text.match(/question:\s*['"`]([\s\S]*?)['"`]\s*,/);
    const explMatch = text.match(/explanation:\s*['"`]([\s\S]*?)['"`]\s*(?:,|\s*})/);
    
    console.log(`Object ${i}:`);
    console.log(`  id:`, idMatch ? idMatch[1] : null);
    console.log(`  type:`, typeMatch ? typeMatch[1] : null);
    console.log(`  question:`, qMatch ? qMatch[1].substring(0, 40) + "..." : null);
    console.log(`  explanation:`, explMatch ? explMatch[1].substring(0, 60) + "..." : null);
  }
}

testExtraction("src/data/examN3_2022_12.ts");
