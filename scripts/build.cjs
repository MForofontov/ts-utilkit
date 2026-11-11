// Build workspace dependencies first, using the same Node runtime as this script.
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const packages = new Map(
  fs.readdirSync(path.join(root, 'packages')).map((directory) => {
    const cwd = path.join(root, 'packages', directory);
    const manifest = JSON.parse(
      fs.readFileSync(path.join(cwd, 'package.json'), 'utf8'),
    );
    return [manifest.name, { cwd, manifest }];
  }),
);
const built = new Set();
const visiting = new Set();

function build(name) {
  if (built.has(name)) return;
  if (visiting.has(name))
    throw new Error(`Cyclic workspace dependency: ${name}`);
  visiting.add(name);
  const { cwd, manifest } = packages.get(name);
  for (const dependency of Object.keys(manifest.dependencies || {})) {
    if (packages.has(dependency)) build(dependency);
  }
  console.log(`Building ${name}`);
  const result = spawnSync(
    process.execPath,
    [
      require.resolve('typescript/bin/tsc'),
      '-p',
      path.join(cwd, 'tsconfig.json'),
    ],
    { cwd, stdio: 'inherit' },
  );
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status || 1);
  visiting.delete(name);
  built.add(name);
}

for (const name of packages.keys()) build(name);
