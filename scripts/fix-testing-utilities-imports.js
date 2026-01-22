const fs = require('fs');
const { execSync } = require('child_process');

console.log('Fixing testingUtilities imports in all test files...\n');

// Find all test files
const testFiles = execSync('find packages -name "*.test.ts" -type f', { encoding: 'utf-8' })
  .trim()
  .split('\n')
  .filter(Boolean);

let fixedCount = 0;

testFiles.forEach(testFile => {
  let content = fs.readFileSync(testFile, 'utf-8');
  const originalContent = content;
  
  // Extract package name from path: packages/array/tests/...
  const packageMatch = testFile.match(/packages\/([^/]+)\//);
  if (!packageMatch) {
    return;
  }
  
  const currentPackage = packageMatch[1];
  
  // Fix imports from testingUtilities
  // Pattern: from '../../../testingUtilities/file' -> from '../../testing-utilities/src/file'
  // Pattern: from '../../testingUtilities/file' -> from '../testing-utilities/src/file' (for testing-utilities own tests)
  
  if (currentPackage === 'testing-utilities') {
    // For testing-utilities package tests: ../../testingUtilities -> ../src
    content = content.replace(
      /from ['"]\.\.\/\.\.\/testingUtilities\/([^'"]+)['"]/g,
      (match, file) => `from '../src/${file}'`
    );
  } else {
    // For other packages: ../../../testingUtilities -> ../../testing-utilities/src
    content = content.replace(
      /from ['"]\.\.\/\.\.\/\.\.\/testingUtilities\/([^'"]+)['"]/g,
      (match, file) => `from '../../testing-utilities/src/${file}'`
    );
  }
  
  if (content !== originalContent) {
    fs.writeFileSync(testFile, content, 'utf-8');
    console.log(`✓ Fixed ${testFile}`);
    fixedCount++;
  }
});

console.log(`\n✓ Fixed ${fixedCount} test files\n`);
