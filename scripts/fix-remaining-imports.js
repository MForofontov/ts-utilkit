const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Fixing all remaining test imports...\n');

// Find all test files in packages
const testFiles = execSync('find packages -name "*.test.ts" -type f', { encoding: 'utf-8' })
  .trim()
  .split('\n')
  .filter(Boolean);

let fixedCount = 0;
let alreadyCorrect = 0;

testFiles.forEach(testFile => {
  let content = fs.readFileSync(testFile, 'utf-8');
  const originalContent = content;
  
  // Extract package name from path: packages/array/tests/...
  const packageMatch = testFile.match(/packages\/([^/]+)\//);
  if (!packageMatch) {
    console.log(`⚠ Could not determine package for: ${testFile}`);
    return;
  }
  
  const packageName = packageMatch[1];
  
  // Fix imports that point to old structure
  // Match: from '../../../arrayFunctions/...' or '../../../../mathFunctions/...'
  // Replace with: from '../src/...'
  
  // Pattern 1: ../../../oldPackageFunctions/file -> ../src/file
  content = content.replace(
    /from ['"]\.\.\/\.\.\/\.\.\/(\w+Functions)\/([^'"]+)['"]/g,
    (match, oldPkg, file) => {
      return `from '../src/${file}'`;
    }
  );
  
  // Pattern 2: ../../../../oldPackageFunctions/subdir/file -> ../src/subdir/file
  content = content.replace(
    /from ['"]\.\.\/\.\.\/\.\.\/\.\.\/(\w+Functions)\/([^'"]+)['"]/g,
    (match, oldPkg, file) => {
      return `from '../src/${file}'`;
    }
  );
  
  // Pattern 3: ../../../testingUtilities/file -> ../../../testingUtilities/file (keep as is)
  // Pattern 4: ../../testingUtilities/file -> ../../../testingUtilities/file (fix depth)
  content = content.replace(
    /from ['"]\.\.\/\.\.\/testingUtilities\/([^'"]+)['"]/g,
    (match, file) => {
      return `from '../../../testingUtilities/${file}'`;
    }
  );
  
  if (content !== originalContent) {
    fs.writeFileSync(testFile, content, 'utf-8');
    console.log(`✓ Fixed imports in ${testFile}`);
    fixedCount++;
  } else {
    alreadyCorrect++;
  }
});

console.log(`\n========================================`);
console.log(`✓ Fixed imports in ${fixedCount} test files`);
console.log(`✓ ${alreadyCorrect} test files already had correct imports`);
console.log(`✓ Total: ${testFiles.length} test files processed`);
console.log(`========================================\n`);
