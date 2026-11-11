// Run after building. Compare the previous matching loop with native membership.
const assert = require('node:assert/strict');
const { performance } = require('node:perf_hooks');
const { deepEqual } = require('../packages/object/dist/deepEqual');

function previous(a, b) {
  if (a.size !== b.size) return false;
  const values = [...b];
  const matched = new Set();
  for (const value of a) {
    let found = false;
    for (let i = 0; i < values.length; i++) {
      if (!matched.has(i) && deepEqual(value, values[i])) {
        matched.add(i);
        found = true;
        break;
      }
    }
    if (!found) return false;
  }
  return true;
}

for (const size of [100, 1000, 5000]) {
  const a = new Set(Array.from({ length: size }, (_, i) => i));
  const b = new Set([...a].reverse());
  assert.equal(previous(a, b), deepEqual(a, b));
  const calls = 10;
  const run = (fn) => {
    const start = performance.now();
    for (let i = 0; i < calls; i++) assert.equal(fn(a, b), true);
    return performance.now() - start;
  };
  for (let i = 0; i < 3; i++) {
    run(previous);
    run(deepEqual);
  }
  const before = [];
  const after = [];
  for (let i = 0; i < 7; i++) {
    if (i % 2) {
      after.push(run(deepEqual));
      before.push(run(previous));
    } else {
      before.push(run(previous));
      after.push(run(deepEqual));
    }
  }
  const median = (values) => values.sort((x, y) => x - y)[3];
  const beforeMs = median(before);
  const afterMs = median(after);
  console.log(
    JSON.stringify({
      size,
      calls,
      beforeMs,
      afterMs,
      speedup: beforeMs / afterMs,
    }),
  );
}
