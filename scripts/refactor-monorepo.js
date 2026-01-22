const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Module mappings: old_name -> new_name
const modules = {
  arrayFunctions: 'array',
  asyncFunctions: 'async',
  collectionFunctions: 'collection',
  configurationFunctions: 'configuration',
  cryptoFunctions: 'crypto',
  dateFunctions: 'date',
  encodingFunctions: 'encoding',
  eventFunctions: 'event',
  formatFunctions: 'format',
  mathFunctions: 'math',
  networkFunctions: 'network',
  objectFunctions: 'object',
  parsingFunctions: 'parsing',
  randomFunctions: 'random',
  regexFunctions: 'regex',
  serializationFunctions: 'serialization',
  stringFunctions: 'string',
  utilityFunctions: 'utility',
  validationFunctions: 'validation',
  webScrapingFunctions: 'webscraping'
};

console.log('=========================================');
console.log('  Refactoring to Standard Monorepo');
console.log('=========================================\n');

// Step 1: Rename package directories
console.log('Step 1: Renaming package directories...');
for (const [oldName, newName] of Object.entries(modules)) {
  const oldPath = path.join('packages', oldName);
  const newPath = path.join('packages', newName);
  
  if (fs.existsSync(oldPath)) {
    console.log(`  Renaming packages/${oldName} -> packages/${newName}`);
    fs.renameSync(oldPath, newPath);
  }
}
console.log('✓ Package directories renamed\n');

// Step 2: Move tests to packages
console.log('Step 2: Moving tests to packages...');
for (const [oldName, newName] of Object.entries(modules)) {
  const possibleTestDirs = [
    `functionsUnittests/${oldName}Unittest`,
    `functionsUnittests/${oldName}Unittests`,
    `functionsUnittests/${oldName}sUnittest`
  ];
  
  const targetDir = path.join('packages', newName, 'tests');
  
  let testDirFound = false;
  for (const testDir of possibleTestDirs) {
    if (fs.existsSync(testDir)) {
      console.log(`  Moving ${testDir} -> ${targetDir}`);
      fs.mkdirSync(targetDir, { recursive: true });
      
      const files = fs.readdirSync(testDir);
      files.forEach(file => {
        const srcFile = path.join(testDir, file);
        const destFile = path.join(targetDir, file);
        fs.copyFileSync(srcFile, destFile);
      });
      
      testDirFound = true;
      break;
    }
  }
  
  if (!testDirFound) {
    console.log(`  ⚠ No tests found for ${oldName}`);
  }
}
console.log('✓ Tests moved to packages\n');

// Step 3: Clean up root-level directories
console.log('Step 3: Cleaning up root-level directories...');
for (const oldName of Object.keys(modules)) {
  if (fs.existsSync(oldName)) {
    console.log(`  Removing root-level ${oldName}/`);
    fs.rmSync(oldName, { recursive: true, force: true });
  }
}
console.log('✓ Root directories cleaned\n');

// Step 4: Remove old test directory
console.log('Step 4: Removing old test directory...');
if (fs.existsSync('functionsUnittests')) {
  console.log('  Removing functionsUnittests/');
  fs.rmSync('functionsUnittests', { recursive: true, force: true });
}
console.log('✓ Old test directory removed\n');

console.log('=========================================');
console.log('  Refactoring Complete!');
console.log('=========================================\n');
console.log('New structure:');
console.log('  packages/');
console.log('    ├── array/        (was arrayFunctions)');
console.log('    │   ├── src/');
console.log('    │   ├── tests/');
console.log('    │   └── package.json');
console.log('    ├── async/');
console.log('    ├── crypto/');
console.log('    └── ...\n');
console.log('Next steps:');
console.log('  1. Update test imports to use relative paths');
console.log('  2. Update root index.ts');
console.log('  3. Update jest configuration');
console.log('  4. Run tests to verify: npm test');
