// Compare against the exact pre-optimization nested deep-equality algorithms.
// Run npm run build first. Timings are informational, never CI thresholds.
const assert = require('node:assert/strict');
const { performance } = require('node:perf_hooks');
const {
  arrayDifference,
  arrayIntersection,
} = require('../packages/array/dist');
const { deepEqual } = require('../packages/object/dist');

const previous = {
  arrayDifference: (a, b) => a.filter((x) => !b.some((y) => deepEqual(x, y))),
  arrayIntersection: (a, b) => a.filter((x) => b.some((y) => deepEqual(x, y))),
};
const sparse = new Array(2000);
for (let i = 0; i < sparse.length; i += 3) sparse[i] = i;
const cases = [
  ['small primitives', Array.from({ length: 20 }, (_, i) => i), [5, 10, 15]],
  [
    'large primitives',
    Array.from({ length: 10000 }, (_, i) => i),
    Array.from({ length: 5000 }, (_, i) => i * 2),
  ],
  [
    'objects',
    Array.from({ length: 400 }, (_, i) => ({ id: i })),
    Array.from({ length: 200 }, (_, i) => ({ id: i * 2 })),
  ],
  [
    'mixed',
    Array.from({ length: 600 }, (_, i) => (i % 2 ? { id: i } : i)),
    Array.from({ length: 300 }, (_, i) => (i % 2 ? { id: i } : i)),
  ],
  [
    'duplicate-heavy',
    Array.from({ length: 6000 }, (_, i) => i % 100),
    Array.from({ length: 3000 }, (_, i) => i % 50),
  ],
  ['sparse', sparse, sparse.slice(1000)],
];
function median(fn, a, b) {
  const times = [];
  for (let i = 0; i < 5; i++) fn(a, b);
  for (let i = 0; i < 11; i++) {
    const start = performance.now();
    fn(a, b);
    times.push(performance.now() - start);
  }
  return times.sort((a, b) => a - b)[5];
}
console.log(
  `Node ${process.version}; ${process.platform}/${process.arch}; five warmups, median of eleven runs`,
);
for (const [name, fn] of Object.entries({
  arrayDifference,
  arrayIntersection,
})) {
  for (const [scenario, a, b] of cases) {
    const expected = previous[name](a, b);
    assert.deepEqual(fn(a, b), expected, `${name}: ${scenario}`);
    const before = median(previous[name], a, b);
    const after = median(fn, a, b);
    console.log(
      JSON.stringify({
        name,
        scenario,
        beforeMs: +before.toFixed(4),
        afterMs: +after.toFixed(4),
        speedup: +(before / after).toFixed(2),
      }),
    );
  }
}
