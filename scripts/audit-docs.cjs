// Check README examples, release versions, export listings, and runtime counts.
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
const inventory = new Map();
const unlisted = [];
const countMismatches = [];
const invalidImports = [];
const invalidListings = [];
const examples = new Map();
const exampleFiles = new Map();
const versionMismatches = [];
let quickExamplesChecked = 0;
let rootExamplesChecked = 0;

for (const name of fs.readdirSync(path.join(root, 'packages'))) {
  const source = program.getSourceFile(
    path.join(root, 'packages', name, 'src', 'index.ts'),
  );
  const symbols = checker.getExportsOfModule(
    checker.getSymbolAtLocation(source),
  );
  const values = [];
  for (let symbol of symbols) {
    const exportedName = symbol.name;
    if (symbol.flags & ts.SymbolFlags.Alias)
      symbol = checker.getAliasedSymbol(symbol);
    if (symbol.flags & ts.SymbolFlags.Value) {
      values.push({
        name: exportedName,
        description: ts
          .displayPartsToString(symbol.getDocumentationComment(checker))
          .split(/\r?\n\s*\r?\n/)[0]
          .replace(/\r?\n/g, ' ')
          .trim(),
      });
    }
  }
  inventory.set(`@ts-utilkit/${name}`, {
    version: JSON.parse(
      fs.readFileSync(
        path.join(root, 'packages', name, 'package.json'),
        'utf8',
      ),
    ).version,
    symbols: new Set(symbols.map((symbol) => symbol.name)),
    values,
  });
}

const readmes = [
  'README.md',
  ...[...inventory.keys()].map(
    (name) => `packages/${name.split('/')[1]}/README.md`,
  ),
];
for (const file of readmes) {
  const text = fs.readFileSync(path.join(root, file), 'utf8');
  if (file !== 'README.md') {
    const quick = text.match(
      /## Quick Example[\s\S]*?```(?:typescript|ts)\s*\r?\n([\s\S]*?)```/,
    );
    if (!quick) throw new Error(`Missing Quick Example in ${file}`);
    quickExamplesChecked++;
    const packageName = `@ts-utilkit/${file.split('/')[1]}`;
    const { version } = inventory.get(packageName);
    const declared = text.match(/Version: \[([^\]]+)\]\(([^)]+)\)/);
    const expectedUrl = `https://www.npmjs.com/package/${packageName}/v/${version}`;
    if (!declared || declared[1] !== version || declared[2] !== expectedUrl)
      versionMismatches.push({
        file,
        expected: version,
        actual: declared?.[1],
      });
    const changelog = path.join(path.dirname(file), 'CHANGELOG.md');
    const released = fs
      .readFileSync(path.join(root, changelog), 'utf8')
      .match(/^## \[(\d+\.\d+\.\d+)\] - (\d{4}-\d{2}-\d{2})$/m);
    if (!released || released[1] !== version)
      versionMismatches.push({
        file: changelog,
        expected: version,
        actual: released?.[1],
      });
  } else {
    const total = [...inventory.values()].reduce(
      (sum, entry) => sum + entry.values.length,
      0,
    );
    for (const match of text.matchAll(
      /\*\*(\d+) (?:public )?runtime exports\*\*/gi,
    ))
      if (Number(match[1]) !== total)
        countMismatches.push({
          file,
          advertised: Number(match[1]),
          actual: total,
        });
    for (const [packageName, { version, values }] of inventory) {
      const row = text
        .split(/\r?\n/)
        .find((line) => line.startsWith(`| **${packageName}**`));
      const expected = `[${version}](https://www.npmjs.com/package/${packageName}/v/${version})`;
      if (!row || row.split('|')[2].trim() !== expected)
        versionMismatches.push({
          file,
          package: packageName,
          expected: version,
        });
      const name = packageName.split('/')[1];
      const countRow = text
        .split(/\r?\n/)
        .find((line) => line.startsWith(`| **${name}**`));
      const advertised = countRow && Number(countRow.split('|')[2].trim());
      if (advertised !== values.length)
        countMismatches.push({
          file,
          package: name,
          advertised,
          actual: values.length,
        });
    }
  }
  let blockIndex = 0;
  for (const block of text.matchAll(
    /```(?:typescript|ts|javascript|js)\s*\r?\n([\s\S]*?)```/g,
  )) {
    const source = ts.createSourceFile(
      'example.ts',
      block[1],
      ts.ScriptTarget.Latest,
      true,
    );
    const imports = [];
    const body = [];
    let hasPackageImport = false;
    for (const node of source.statements) {
      (ts.isImportDeclaration(node) ? imports : body).push(
        node.getText(source),
      );
      if (!ts.isImportDeclaration(node)) continue;
      const exports = inventory.get(node.moduleSpecifier.text);
      if (!exports) {
        if (node.moduleSpecifier.text.startsWith('@ts-utilkit/'))
          invalidImports.push({
            file,
            package: node.moduleSpecifier.text,
            name: '(unknown package)',
          });
        continue;
      }
      hasPackageImport = true;
      for (const specifier of node.importClause?.namedBindings?.elements ||
        []) {
        const name = (specifier.propertyName || specifier.name).text;
        if (!exports.symbols.has(name)) invalidImports.push({ file, name });
      }
    }
    if (hasPackageImport) {
      const virtualPath = path.join(
        root,
        path.dirname(file),
        `__readme_example_${blockIndex}.ts`,
      );
      examples.set(
        virtualPath,
        `${imports.join('\n')}\nexport {};\nvoid (async () => {\n${body.join('\n')}\n})();`,
      );
      exampleFiles.set(virtualPath, `${file} (example ${blockIndex + 1})`);
      if (file === 'README.md') rootExamplesChecked++;
    }
    blockIndex++;
  }
  if (file === 'README.md') continue;
  const packageName = file.split('/')[1];
  const { values, symbols } = inventory.get(`@ts-utilkit/${packageName}`);
  const listed = new Set();
  for (const line of text.split(/\r?\n/)) {
    if (!/^- (?:\*\*)?`/.test(line)) continue;
    const names = line.split(/ (?:—|–|-) /)[0];
    for (const match of names.matchAll(/`([\w$]+)`/g)) listed.add(match[1]);
  }
  for (const name of listed)
    if (!symbols.has(name)) invalidListings.push({ file, name });
  const missing = values.filter((value) => !listed.has(value.name));
  if (missing.length) unlisted.push({ package: packageName, exports: missing });
  const count = text.match(/## Available Functions \((\d+)\)/);
  if (count && Number(count[1]) !== values.length)
    countMismatches.push({
      package: packageName,
      advertised: Number(count[1]),
      actual: values.length,
    });
}

const options = { ...parsed.options, noEmit: true };
const host = ts.createCompilerHost(options);
const getSourceFile = host.getSourceFile.bind(host);
const fileExists = host.fileExists.bind(host);
host.fileExists = (file) =>
  examples.has(path.normalize(file)) || fileExists(file);
host.getSourceFile = (
  file,
  languageVersion,
  onError,
  shouldCreateNewSourceFile,
) =>
  examples.has(path.normalize(file))
    ? ts.createSourceFile(
        file,
        examples.get(path.normalize(file)),
        languageVersion,
        true,
      )
    : getSourceFile(file, languageVersion, onError, shouldCreateNewSourceFile);
const exampleProgram = ts.createProgram(
  [...parsed.fileNames, ...examples.keys()],
  options,
  host,
);
const exampleErrors = ts
  .getPreEmitDiagnostics(exampleProgram)
  .map((diagnostic) => ({
    file:
      (diagnostic.file &&
        exampleFiles.get(path.normalize(diagnostic.file.fileName))) ||
      diagnostic.file?.fileName,
    message: ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'),
  }));

console.log(
  JSON.stringify(
    {
      packages: inventory.size,
      runtimeExports: [...inventory.values()].reduce(
        (sum, entry) => sum + entry.values.length,
        0,
      ),
      invalidImports,
      invalidListings,
      unlisted,
      countMismatches,
      versionMismatches,
      releaseVersionsChecked: inventory.size,
      changelogsChecked: inventory.size,
      quickExamplesChecked,
      rootExamplesChecked,
      readmeExamplesChecked: examples.size,
      exampleErrors,
    },
    null,
    2,
  ),
);
if (
  invalidImports.length ||
  invalidListings.length ||
  unlisted.length ||
  countMismatches.length ||
  versionMismatches.length ||
  exampleErrors.length
)
  process.exitCode = 1;
