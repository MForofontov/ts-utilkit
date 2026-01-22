const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Fixing jest.mock paths in all test files...\n');

// Find all test files in packages
const testFiles = execSync('find packages -name "*.test.ts" -type f', { encoding: 'utf-8' })
  .trim()
  .split('\n')
  .filter(Boolean);

let fixedCount = 0;

testFiles.forEach(testFile => {
  let content = fs.readFileSync(testFile, 'utf-8');
  const originalContent = content;
  
  // Fix jest.mock paths
  // Pattern: jest.mock('../../../oldPackageFunctions/...')
  // Replace with: jest.mock('../src/...')
  
  content = content.replace(
    /jest\.mock\(['"]\.\.\/\.\.\/\.\.\/(\w+Functions)\/([^'"]+)['"]\)/g,
    (match, oldPkg, file) => {
      return `jest.mock('../src/${file}')`;
    }
  );
  
  content = content.replace(
    /jest\.mock\(['"]\.\.\/\.\.\/\.\.\/\.\.\/(\w+Functions)\/([^'"]+)['"]\)/g,
    (match, oldPkg, file) => {
      return `jest.mock('../src/${file}')`;
    }
  );
  
  if (content !== originalContent) {
    fs.writeFileSync(testFile, content, 'utf-8');
    console.log(`✓ Fixed jest.mock in ${testFile}`);
    fixedCount++;
  }
});

console.log(`\n✓ Fixed jest.mock paths in ${fixedCount} test files\n`);
