// Run after npm run build. Timings are informational, never test assertions.
const { performance } = require('node:perf_hooks');
const assert = require('node:assert/strict');
const { removeByIndex } = require('../packages/array/dist/removeByIndex');

const previous = (array, indices) =>
  array.filter((_, index) => !indices.includes(index));

function median(samples) {
  return samples.sort((a, b) => a - b)[Math.floor(samples.length / 2)];
}

function measure(fn, array, indices) {
  for (let i = 0; i < 5; i++) fn(array, indices);
  return median(
    Array.from({ length: 11 }, () => {
      const start = performance.now();
      fn(array, indices);
      return performance.now() - start;
    }),
  );
}

for (const [size, removed] of [
  [1000, 100],
  [10000, 1000],
  [50000, 5000],
]) {
  const array = Array.from({ length: size }, (_, i) => i);
  const indices = Array.from({ length: removed }, (_, i) => i * 2);
  assert.deepEqual(removeByIndex(array, indices), previous(array, indices));
  const beforeMs = measure(previous, array, indices);
  const afterMs = measure(removeByIndex, array, indices);
  console.log(
    JSON.stringify({
      size,
      removed,
      beforeMs,
      afterMs,
      speedup: beforeMs / afterMs,
    }),
  );
}
