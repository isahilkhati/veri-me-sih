const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

const files = walk('apps/web/src').filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');

  // Hardcode back the original fetch calls for now, then we'll properly replace them.
  // Wait, let's just forcefully replace the broken syntax.
  content = content.replace(/fetch\(\s*[\$\{\}process\.env\.NEXT_PUBLIC_API_URL \|\"http:\/\/localhost:4000\"]*\/api\//g, 'fetch(`\${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/api/');
  content = content.replace(/\/api\/(.*?)',\s*\{/g, '/api/$1\`, {');
  
  // also fix API_BASE
  content = content.replace(/const API_BASE.*?;/g, 'const API_BASE = process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api/ai` : "http://localhost:4000/api/ai";');

  fs.writeFileSync(f, content);
});

console.log('Fixed URLs');
