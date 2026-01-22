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

const tsConfig = {
  extends: '../../tsconfig.json',
  compilerOptions: {
    outDir: './dist',
    rootDir: './src',
    declaration: true,
    declarationMap: true,
    sourceMap: true
  },
  include: ['src/**/*'],
  exclude: ['node_modules', 'dist', '**/*.test.ts', '**/*.spec.ts']
};

console.log('Generating tsconfig.json files for all modules...\n');

modules.forEach(moduleName => {
  const packagePath = path.join(__dirname, '..', 'packages', moduleName);
  const tsConfigPath = path.join(packagePath, 'tsconfig.json');
  
  if (!fs.existsSync(packagePath)) {
    console.error(`✗ Package directory not found: ${packagePath}`);
    return;
  }
  
  fs.writeFileSync(tsConfigPath, JSON.stringify(tsConfig, null, 2) + '\n');
  console.log(`✓ Created ${moduleName}/tsconfig.json`);
});

console.log('\n✓ All tsconfig.json files generated successfully!');
