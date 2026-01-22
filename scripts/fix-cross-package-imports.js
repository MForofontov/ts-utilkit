const fs = require('fs');
const { execSync } = require('child_process');

console.log('Fixing cross-package imports in source files...\n');

// Find all source files (not tests)
const sourceFiles = execSync('find packages -name "*.ts" -type f -not -path "*/tests/*"', { encoding: 'utf-8' })
  .trim()
  .split('\n')
  .filter(Boolean);

let fixedCount = 0;

sourceFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  const originalContent = content;
  
  // Fix cross-package imports
  // Pattern: from '../arrayFunctions/file' -> from '../array/src/file'
  // Pattern: from '../objectFunctions/file' -> from '../object/src/file'
  
  content = content.replace(
    /from ['"]\.\.\/(\w+)Functions\/([^'"]+)['"]/g,
    (match, pkg, file) => {
      return `from '../${pkg}/src/${file}'`;
    }
  );
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf-8');
    console.log(`✓ Fixed ${file}`);
    fixedCount++;
  }
});

console.log(`\n✓ Fixed ${fixedCount} source files\n`);
