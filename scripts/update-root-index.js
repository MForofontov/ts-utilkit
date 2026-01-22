const fs = require('fs');
const path = require('path');

console.log('Updating root index.ts to export from packages/...\n');

const indexPath = 'index.ts';
let content = fs.readFileSync(indexPath, 'utf8');

// Module mappings
const replacements = {
  './arrayFunctions/': './packages/array/src/',
  './asyncFunctions/': './packages/async/src/',
  './collectionFunctions/': './packages/collection/src/',
  './configurationFunctions/': './packages/configuration/src/',
  './cryptoFunctions/': './packages/crypto/src/',
  './dateFunctions/': './packages/date/src/',
  './encodingFunctions/': './packages/encoding/src/',
  './eventFunctions/': './packages/event/src/',
  './formatFunctions/': './packages/format/src/',
  './mathFunctions/': './packages/math/src/',
  './networkFunctions/': './packages/network/src/',
  './objectFunctions/': './packages/object/src/',
  './parsingFunctions/': './packages/parsing/src/',
  './randomFunctions/': './packages/random/src/',
  './regexFunctions/': './packages/regex/src/',
  './serializationFunctions/': './packages/serialization/src/',
  './stringFunctions/': './packages/string/src/',
  './utilityFunctions/': './packages/utility/src/',
  './validationFunctions/': './packages/validation/src/',
  './webScrapingFunctions/': './packages/webscraping/src/'
};

for (const [oldPath, newPath] of Object.entries(replacements)) {
  const count = (content.match(new RegExp(oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  content = content.replace(new RegExp(oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newPath);
  console.log(`✓ Replaced ${count} occurrences of ${oldPath}`);
}

fs.writeFileSync(indexPath, content);

console.log('\n✓ Root index.ts updated successfully!');
console.log('All exports now point to packages/ directories.');
