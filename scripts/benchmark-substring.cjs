// Reproduce with npm run build && npm run benchmark:substring.
const assert = require('node:assert/strict');
const { performance } = require('node:perf_hooks');
const { countSubstring } = require('../packages/string/dist/countSubstring');
const { escapeRegex } = require('../packages/string/dist/escapeRegex');
const previous = (text, search) =>
  search.length === 0
    ? 0
    : (text.match(new RegExp(escapeRegex(search), 'g')) || []).length;
const median = (samples) =>
  samples.sort((a, b) => a - b)[Math.floor(samples.length / 2)];
let checksum = 0;
function measure(fn, text, search, iterations) {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) checksum += fn(text, search);
  return performance.now() - start;
}
for (const [name, text, search, iterations] of [
  ['small', 'hello hello world', 'hello', 20_000],
  ['dense', 'ab'.repeat(100_000), 'ab', 10],
  ['absent', 'a'.repeat(200_000), 'xyz', 1_000],
  ['literal', 'a.*😀/'.repeat(20_000), '.*😀', 20],
]) {
  assert.equal(countSubstring(text, search), previous(text, search));
  const samples = [[], []];
  const implementations = [previous, countSubstring];
  for (let round = -3; round < 9; round++) {
    for (const index of round % 2 === 0 ? [0, 1] : [1, 0]) {
      const elapsed = measure(implementations[index], text, search, iterations);
      if (round >= 0) samples[index].push(elapsed);
    }
  }
  const beforeMs = median(samples[0]);
  const afterMs = median(samples[1]);
  console.log(
    JSON.stringify({
      name,
      iterations,
      beforeMs,
      afterMs,
      speedup: beforeMs / afterMs,
    }),
  );
}
assert(checksum > 0);
