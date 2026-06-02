const fs = require('fs');
const path = require('path');

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      getFiles(path.join(dir, file), fileList);
    } else if (file === 'page.tsx') {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
}

const files = getFiles(path.join(process.cwd(), 'app/dashboard/admin'));

files.forEach(file => {
  // Normalize slashes for comparison
  const normalizedFile = file.replace(/\\/g, '/');
  
  if (normalizedFile.endsWith('admin/page.tsx') || normalizedFile.includes('/kamar/')) {
    // Skip main pages that were already refactored
    return;
  }

  let code = fs.readFileSync(file, 'utf-8');

  // Skip if it doesn't import Sidebar
  if (!code.includes('import Sidebar')) return;

  console.log('Processing:', file);

  // 1. Remove invalid imports
  code = code.replace(/import Sidebar from [^\n]+;\n/g, '');
  code = code.replace(/import MobileNavbar from [^\n]+;\n/g, '');

  // 2. Regex for wrapper
  const contentRegex = /<div className="flex-1[^>]*>([\s\S]*?)<\/div>\s*<MobileNavbar \/>/m;
  const match = code.match(contentRegex);
  
  if (match) {
    const innerContent = match[1].trim();
    const fullWrapperRegex = /return \(\s*<div className="flex min-h-screen"[^\n]*[\s\S]*?<Sidebar \/>[\s\S]*?<MobileNavbar \/>\s*<\/div>\s*\);/m;
    
    if (fullWrapperRegex.test(code)) {
      code = code.replace(fullWrapperRegex, `return (\n    <div className="flex-1 flex flex-col">\n      ${innerContent}\n    </div>\n  );`);
      fs.writeFileSync(file, code);
      console.log('Fixed:', file);
    } else {
      console.log('Could not match full wrapper in:', file);
    }
  } else {
    console.log('Regex failed for:', file);
  }
});
