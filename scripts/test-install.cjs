// Exercise real packed artifacts outside the checkout and its workspace symlinks.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { createRequire } = require('node:module');
const { spawnSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const npmCli = process.env.npm_execpath;
if (!npmCli || !fs.existsSync(npmCli)) {
  throw new Error('Run this check with npm run test:install:full');
}
const consumer = fs.mkdtempSync(path.join(os.tmpdir(), 'ts-utilkit-consumer-'));
const packages = fs
  .readdirSync(path.join(root, 'packages'), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => {
    const directory = path.join(root, 'packages', entry.name);
    return {
      directory,
      manifest: JSON.parse(
        fs.readFileSync(path.join(directory, 'package.json'), 'utf8'),
      ),
    };
  });

function run(args, cwd = consumer) {
  const result = spawnSync(process.execPath, args, {
    cwd,
    encoding: 'utf8',
    env: { ...process.env, NODE_PATH: '' },
    maxBuffer: 16 * 1024 * 1024,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(
      `Command failed: ${args.join(' ')}\n${result.stdout}\n${result.stderr}`,
    );
  }
  return result.stdout;
}

async function main() {
  try {
    const tarballs = packages.map(({ directory }) => {
      const before = new Set(fs.readdirSync(consumer));
      const [packed] = JSON.parse(
        run([
          npmCli,
          'pack',
          directory,
          '--json',
          '--ignore-scripts',
          '--pack-destination',
          consumer,
        ]),
      );
      assert(packed.files.some((file) => file.path === 'dist/index.d.ts'));
      assert(packed.files.some((file) => file.path === 'dist/index.js'));
      // npm versions differ in the scoped filename reported by --json.
      const created = fs
        .readdirSync(consumer)
        .filter((name) => name.endsWith('.tgz') && !before.has(name));
      assert.equal(created.length, 1, `Expected one tarball for ${directory}`);
      return path.join(consumer, created[0]);
    });
    fs.writeFileSync(
      path.join(consumer, 'package.json'),
      JSON.stringify({ name: 'ts-utilkit-consumer', private: true }),
    );
    // Install all tarballs together so npm can satisfy workspace edges locally.
    run([
      npmCli,
      'install',
      '--ignore-scripts',
      '--no-audit',
      '--no-fund',
      '--package-lock=false',
      ...tarballs,
    ]);

    const requireConsumer = createRequire(path.join(consumer, 'package.json'));
    const imports = [];
    for (const { directory, manifest } of packages) {
      const entry = requireConsumer.resolve(manifest.name);
      const installed = requireConsumer(manifest.name);
      const built = require(path.join(directory, manifest.main));
      assert.deepEqual(
        Object.keys(installed).sort(),
        Object.keys(built).sort(),
      );
      const requirePackage = createRequire(entry);
      for (const dependency of Object.keys(manifest.dependencies || {})) {
        if (packages.some((pkg) => pkg.manifest.name === dependency)) {
          assert.equal(
            fs.realpathSync(requirePackage.resolve(dependency)),
            fs.realpathSync(requireConsumer.resolve(dependency)),
            `${manifest.name} must resolve the tested ${dependency} artifact`,
          );
        }
      }
      imports.push(`import * as p${imports.length} from '${manifest.name}';`);
    }
    imports.push(
      "import { chunkArray } from '@ts-utilkit/array';",
      'const chunks: number[][] = chunkArray([1, 2, 3], 2);',
      "import { arrayDifferenceBy, arrayIntersectionBy } from '@ts-utilkit/array';",
      'const difference: { id: number }[] = arrayDifferenceBy([{ id: 1 }], [], item => item.id);',
      'const intersection: { id: number }[] = arrayIntersectionBy([{ id: 1 }], [{ id: 1 }], item => item.id);',
      "import { ok, unwrap } from '@ts-utilkit/result';",
      "import { fromAsyncThrowable, type Result } from '@ts-utilkit/result';",
      'const pending: Promise<Result<number, unknown>> = fromAsyncThrowable(() => Promise.resolve(42));',
      "const value: string = unwrap(ok('installed'));",
      'void [chunks, value, difference, intersection, pending];',
    );
    fs.writeFileSync(path.join(consumer, 'consumer.ts'), imports.join('\n'));
    run([
      require.resolve('typescript/bin/tsc'),
      '--noEmit',
      '--strict',
      '--target',
      'es2023',
      '--module',
      'node16',
      '--moduleResolution',
      'node16',
      '--typeRoots',
      path.join(root, 'node_modules/@types'),
      '--types',
      'node',
      'consumer.ts',
    ]);
    fs.writeFileSync(
      path.join(consumer, 'imports.mjs'),
      `import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
for (const name of ${JSON.stringify(packages.map((pkg) => pkg.manifest.name))}) {
  const namespace = await import(name);
  assert.deepEqual(Object.keys(namespace.default).sort(), Object.keys(require(name)).sort());
}
const arrays = await import('@ts-utilkit/array');
assert.deepEqual(arrays.arrayDifferenceBy([{ id: 1 }, { id: 2 }], [{ id: 1 }], item => item.id), [{ id: 2 }]);
assert.deepEqual(arrays.arrayIntersectionBy([{ id: 1 }, { id: 2 }], [{ id: 1 }], item => item.id), [{ id: 1 }]);
const results = await import('@ts-utilkit/result');
assert.deepEqual(await results.fromAsyncThrowable(() => Promise.resolve(42)), { ok: true, value: 42 });
`,
    );
    run(['imports.mjs']);
    // Run behavior checks in a fresh process whose resolution starts in consumer.
    fs.writeFileSync(
      path.join(consumer, 'smoke.cjs'),
      `const assert = require('node:assert/strict');
const { chunkArray } = require('@ts-utilkit/array');
const { arrayDifferenceBy, arrayIntersectionBy } = require('@ts-utilkit/array');
const { fromAsyncThrowable } = require('@ts-utilkit/result');
const { asyncMap } = require('@ts-utilkit/async');
const { deserializeFromXML } = require('@ts-utilkit/serialization');
assert.deepEqual(chunkArray([1, 2, 3], 2), [[1, 2], [3]]);
assert.deepEqual(arrayDifferenceBy([{ id: 1 }, { id: 2 }], [{ id: 1 }], item => item.id), [{ id: 2 }]);
assert.deepEqual(arrayIntersectionBy([{ id: 1 }, { id: 2 }], [{ id: 1 }], item => item.id), [{ id: 1 }]);
assert.deepEqual(deserializeFromXML('<a><ab>x</ab></a>'), { a: { ab: 'x' } });
Promise.all([
  asyncMap([1, 2], async value => value * 2),
  fromAsyncThrowable(() => Promise.resolve(42)),
  fromAsyncThrowable(() => { throw 'original reason'; }),
]).then(([mapped, success, failure]) => {
  assert.deepEqual(mapped, [2, 4]);
  assert.deepEqual(success, { ok: true, value: 42 });
  assert.deepEqual(failure, { ok: false, error: 'original reason' });
}).catch(error => { console.error(error); process.exitCode = 1; });
`,
    );
    run(['smoke.cjs']);
    console.log(
      `Verified ${packages.length} packed packages: CommonJS, dynamic import, declarations, dependency resolution, and behavior.`,
    );
  } finally {
    // Only remove the exact, freshly created temporary consumer directory.
    assert.equal(path.dirname(consumer), path.resolve(os.tmpdir()));
    assert(path.basename(consumer).startsWith('ts-utilkit-consumer-'));
    fs.rmSync(consumer, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
