// Run after npm run build. Measures repeated calls after cache warmup.
const assert = require('node:assert/strict');
const { performance } = require('node:perf_hooks');
const {
  calculateFactorial,
} = require('../packages/math/dist/combinatoricsFunctions/calculateFactorial');
// Exact implementation before the bounded cache optimization.
const previous = (() => {
  function calculateFactorial(n) {
    if (isNaN(n)) {
      throw new Error('Input must be a number');
    }
    if (!Number.isInteger(n)) {
      throw new Error('Input must be an integer');
    }
    if (n < 0) {
      throw new Error('Input must be a non-negative integer');
    }
    if (n > 170) return Infinity;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }

  return calculateFactorial;
})();
for (let n = 0; n <= 171; n++) assert.equal(calculateFactorial(n), previous(n));
let sink;
function measure(fn, n) {
  const run = () => {
    const start = performance.now();
    for (let i = 0; i < 100000; i++) sink = fn(n);
    return performance.now() - start;
  };
  for (let i = 0; i < 3; i++) run();
  return Array.from({ length: 7 }, run).sort((a, b) => a - b)[3];
}
for (const n of [10, 100, 170]) {
  const beforeMs = measure(previous, n);
  const afterMs = measure(calculateFactorial, n);
  assert.equal(sink, previous(n));
  console.log(
    JSON.stringify({
      n,
      calls: 100000,
      beforeMs,
      afterMs,
      speedup: beforeMs / afterMs,
    }),
  );
}
