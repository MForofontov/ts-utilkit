// Run after npm run build. Median timings are informational, never assertions.
const { performance } = require('node:perf_hooks');
const assert = require('node:assert/strict');
const { findDuplicates } = require('../packages/array/dist/findDuplicates');
// Exact pre-optimization implementation, compiled from TypeScript.
const previous = (() => {
  const object_1 = require('@ts-utilkit/object');
  function isPrimitiveKeyable(value) {
    const type = typeof value;
    return (
      value === null ||
      type === 'string' ||
      type === 'number' ||
      type === 'boolean' ||
      type === 'bigint' ||
      type === 'undefined'
    );
  }
  function primitiveKey(value) {
    if (value === undefined) return '__undefined__';
    if (value === null) return '__null__';
    if (typeof value === 'number' && Number.isNaN(value)) return '__nan__';
    return `${typeof value}:${String(value)}`;
  }
  function findDuplicates(arr) {
    const duplicates = [];
    const primitiveSeen = new Map();
    const objectSeen = [];
    for (const item of arr) {
      if (isPrimitiveKeyable(item)) {
        const key = primitiveKey(item);
        if (primitiveSeen.has(key)) {
          if (
            !duplicates.some((duplicate) =>
              (0, object_1.deepEqual)(duplicate, item),
            )
          ) {
            duplicates.push(item);
          }
        } else {
          primitiveSeen.set(key, item);
        }
        continue;
      }
      if (
        objectSeen.some((seenItem) => (0, object_1.deepEqual)(seenItem, item))
      ) {
        if (
          !duplicates.some((duplicate) =>
            (0, object_1.deepEqual)(duplicate, item),
          )
        ) {
          duplicates.push(item);
        }
      } else {
        objectSeen.push(item);
      }
    }
    return duplicates;
  }

  return findDuplicates;
})();
function measure(fn, input) {
  for (let i = 0; i < 3; i++) fn(input);
  const samples = Array.from({ length: 7 }, () => {
    const start = performance.now();
    fn(input);
    return performance.now() - start;
  }).sort((a, b) => a - b);
  return samples[3];
}
for (const size of [1000, 5000, 10000]) {
  const values = Array.from({ length: size }, (_, i) => i);
  const input = [...values, ...values, ...values];
  assert.deepEqual(findDuplicates(input), previous(input));
  const beforeMs = measure(previous, input);
  const afterMs = measure(findDuplicates, input);
  console.log(
    JSON.stringify({
      distinctValues: size,
      items: input.length,
      beforeMs,
      afterMs,
      speedup: beforeMs / afterMs,
    }),
  );
}
