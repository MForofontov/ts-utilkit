// Inventory public runtime exports and the test files for their implementations.
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');
const config = ts.readConfigFile(
  path.join(root, 'tsconfig.json'),
  ts.sys.readFile,
);
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
const program = ts.createProgram(parsed.fileNames, parsed.options);
const checker = program.getTypeChecker();
const inventory = [];

function testNames(directory) {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory()
        ? testNames(path.join(directory, entry.name))
        : [entry.name],
    );
}

for (const name of fs.readdirSync(path.join(root, 'packages'))) {
  const source = program.getSourceFile(
    path.join(root, 'packages', name, 'src', 'index.ts'),
  );
  const tests = new Set(testNames(path.join(root, 'packages', name, 'tests')));
  const symbols = checker.getExportsOfModule(
    checker.getSymbolAtLocation(source),
  );
  const exports = [];
  for (let symbol of symbols) {
    const exportedName = symbol.name;
    if (symbol.flags & ts.SymbolFlags.Alias)
      symbol = checker.getAliasedSymbol(symbol);
    if (!(symbol.flags & ts.SymbolFlags.Value)) continue;
    const declaration = symbol.valueDeclaration || symbol.declarations?.[0];
    const implementation = path.basename(
      declaration.getSourceFile().fileName,
      '.ts',
    );
    exports.push({
      name: exportedName,
      tested:
        tests.has(implementation + '.test.ts') ||
        tests.has(exportedName + '.test.ts'),
    });
  }
  inventory.push({ package: name, count: exports.length, exports });
}
console.log(JSON.stringify(inventory, null, 2));
if (inventory.some((pkg) => pkg.exports.some((entry) => !entry.tested))) {
  process.exitCode = 1;
}
