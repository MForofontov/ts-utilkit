const fs = require('fs');
const path = require('path');

const modules = [
  'arrayFunctions',
  'asyncFunctions',
  'collectionFunctions',
  'configurationFunctions',
  'cryptoFunctions',
  'dateFunctions',
  'encodingFunctions',
  'eventFunctions',
  'formatFunctions',
  'mathFunctions',
  'networkFunctions',
  'objectFunctions',
  'parsingFunctions',
  'randomFunctions',
  'regexFunctions',
  'serializationFunctions',
  'stringFunctions',
  'utilityFunctions',
  'validationFunctions',
  'webScrapingFunctions'
];

console.log('Generating index.ts files for all packages...\n');

modules.forEach(moduleName => {
  const packagePath = path.join(__dirname, '..', 'packages', moduleName);
  const srcPath = path.join(packagePath, 'src');
  const indexPath = path.join(packagePath, 'src', 'index.ts');
  
  if (!fs.existsSync(srcPath)) {
    console.error(`✗ Source directory not found: ${srcPath}`);
    return;
  }
  
  // Get all .ts files except index.ts
  const files = fs.readdirSync(srcPath)
    .filter(file => file.endsWith('.ts') && file !== 'index.ts')
    .sort();
  
  if (files.length === 0) {
    console.warn(`⚠ No TypeScript files found in ${moduleName}/src`);
    return;
  }
  
  // Generate exports
  let indexContent = `// Auto-generated index file for ${moduleName}\n`;
  indexContent += `// This file exports all functions from this module\n\n`;
  
  files.forEach(file => {
    const baseName = file.replace('.ts', '');
    indexContent += `export * from './${baseName}';\n`;
  });
  
  fs.writeFileSync(indexPath, indexContent);
  console.log(`✓ Created ${moduleName}/src/index.ts (${files.length} exports)`);
});

console.log('\n✓ All index.ts files generated successfully!');
