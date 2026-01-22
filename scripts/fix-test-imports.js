const fs = require('fs');
const path = require('path');

const packages = [
  'array',
  'async',
  'collection',
  'configuration',
  'crypto',
  'date',
  'encoding',
  'event',
  'format',
  'math',
  'network',
  'object',
  'parsing',
  'random',
  'regex',
  'serialization',
  'string',
  'utility',
  'validation',
  'webscraping'
];

// Map old folder names to new ones
const folderMap = {
  'arrayFunctions': 'array',
  'asyncFunctions': 'async',
  'collectionFunctions': 'collection',
  'configurationFunctions': 'configuration',
  'cryptoFunctions': 'crypto',
  'dateFunctions': 'date',
  'encodingFunctions': 'encoding',
  'eventFunctions': 'event',
  'formatFunctions': 'format',
  'mathFunctions': 'math',
  'networkFunctions': 'network',
  'objectFunctions': 'object',
  'parsingFunctions': 'parsing',
  'randomFunctions': 'random',
  'regexFunctions': 'regex',
  'serializationFunctions': 'serialization',
  'stringFunctions': 'string',
  'utilityFunctions': 'utility',
  'validationFunctions': 'validation',
  'webScrapingFunctions': 'webscraping'
};

console.log('Fixing test imports across all packages...\n');

let totalFixed = 0;

packages.forEach(packageName => {
  const testsPath = path.join(__dirname, '..', 'packages', packageName, 'tests');
  
  if (!fs.existsSync(testsPath)) {
    console.log(`⚠ No tests directory for ${packageName}`);
    return;
  }
  
  const testFiles = fs.readdirSync(testsPath).filter(f => f.endsWith('.test.ts'));
  
  if (testFiles.length === 0) {
    console.log(`⚠ No test files in ${packageName}`);
    return;
  }
  
  console.log(`Processing ${packageName} (${testFiles.length} test files)...`);
  
  testFiles.forEach(testFile => {
    const filePath = path.join(testsPath, testFile);
    let content = fs.readFileSync(filePath, 'utf-8');
    const originalContent = content;
    
    // Fix imports from old structure to new structure
    // Pattern: import ... from '../../oldFolderName/file'
    // Replace with: import ... from '../src/file'
    
    Object.keys(folderMap).forEach(oldName => {
      const newName = folderMap[oldName];
      
      // Pattern 1: ../../oldFolderName/file
      const pattern1 = new RegExp(`from ['"]../../${oldName}/([^'"]+)['"]`, 'g');
      content = content.replace(pattern1, `from '../src/$1'`);
      
      // Pattern 2: ../oldFolderName/file (if test was already in subfolder)
      const pattern2 = new RegExp(`from ['"]../${oldName}/([^'"]+)['"]`, 'g');
      content = content.replace(pattern2, `from '../src/$1'`);
      
      // Pattern 3: Handle subfolder imports for math functions
      // ../../mathFunctions/algebraFunctions/power -> ../src/algebraFunctions/power
      const pattern3 = new RegExp(`from ['"]../../${oldName}/([^'"]+)/([^'"]+)['"]`, 'g');
      content = content.replace(pattern3, `from '../src/$1/$2'`);
    });
    
    // Fix testingUtilities imports
    // ../../testingUtilities/... -> ../../../testingUtilities/...
    const utilPattern = new RegExp(`from ['"]../../testingUtilities/([^'"]+)['"]`, 'g');
    content = content.replace(utilPattern, `from '../../../testingUtilities/$1'`);
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      totalFixed++;
    }
  });
  
  console.log(`  ✓ Processed ${testFiles.length} files`);
});

console.log(`\n✓ Fixed imports in ${totalFixed} test files!`);
