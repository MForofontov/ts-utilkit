// Run after building. Captured pre-optimization functions are included below.
const assert = require('node:assert/strict');
const { performance } = require('node:perf_hooks');
const object_1 = require('../packages/object/dist');
const { findUniqueElements } = require('../packages/array/dist');
const { isValidTime } = require('../packages/validation/dist');
const previousUnique = function findUniqueElements(arr) {
  const uniqueElements = [];
  for (const item of arr) {
    if (
      !uniqueElements.some((uniqueItem) =>
        (0, object_1.deepEqual)(uniqueItem, item),
      )
    ) {
      uniqueElements.push(item);
    }
  }
  return uniqueElements;
};
const previousTime = function isValidTime(
  timeString,
  allowSeconds = true,
  format24Hour = true,
) {
  const cleanTimeString = timeString.trim();
  let hour;
  let minute;
  let second = 0;
  if (format24Hour) {
    // 24-hour format: HH:MM or HH:MM:SS
    const patterns = {
      withSeconds: /^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9]):([0-5]?[0-9])$/,
      withoutSeconds: /^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9])$/,
    };
    let match;
    if (allowSeconds) {
      match =
        cleanTimeString.match(patterns.withSeconds) ||
        cleanTimeString.match(patterns.withoutSeconds);
    } else {
      match = cleanTimeString.match(patterns.withoutSeconds);
      // If seconds are present but not allowed, return false
      if (
        cleanTimeString.includes(':') &&
        cleanTimeString.split(':').length > 2
      ) {
        return false;
      }
    }
    if (!match) {
      return false;
    }
    hour = parseInt(match[1], 10);
    minute = parseInt(match[2], 10);
    if (match[3]) {
      second = parseInt(match[3], 10);
    }
  } else {
    // 12-hour format: H:MM AM/PM or H:MM:SS AM/PM
    const patterns = {
      withSeconds: /^([1-9]|1[0-2]):([0-5]?[0-9]):([0-5]?[0-9]) (AM|PM)$/i,
      withoutSeconds: /^([1-9]|1[0-2]):([0-5]?[0-9]) (AM|PM)$/i,
    };
    let match;
    if (allowSeconds) {
      match =
        cleanTimeString.match(patterns.withSeconds) ||
        cleanTimeString.match(patterns.withoutSeconds);
    } else {
      match = cleanTimeString.match(patterns.withoutSeconds);
      // If seconds are present but not allowed, return false
      if (
        cleanTimeString.includes(':') &&
        cleanTimeString.split(' ')[0].split(':').length > 2
      ) {
        return false;
      }
    }
    if (!match) {
      return false;
    }
    hour = parseInt(match[1], 10);
    minute = parseInt(match[2], 10);
    if (match[3] && match[3] !== 'AM' && match[3] !== 'PM') {
      second = parseInt(match[3], 10);
    }
    // Validate 12-hour format specific rules
    if (hour < 1 || hour > 12) {
      return false;
    }
  }
  // Validate hour, minute, second ranges
  if (format24Hour) {
    if (hour < 0 || hour > 23) {
      return false;
    }
  }
  if (minute < 0 || minute > 59) {
    return false;
  }
  if (second < 0 || second > 59) {
    return false;
  }
  return true;
};

// Check all combinations of representative numeric boundaries and mode switches.
let checked = 0;
for (let h = -1; h <= 25; h++)
  for (const m of [-1, 0, 1, 9, 59, 60])
    for (const s of [undefined, 0, 59, 60])
      for (const suffix of ['', ' AM', ' pm'])
        for (const padded of [false, true]) {
          const str =
            (padded ? String(h).padStart(2, '0') : String(h)) +
            ':' +
            String(m).padStart(2, '0') +
            (s === undefined ? '' : ':' + String(s).padStart(2, '0')) +
            suffix;
          for (const allow of [false, true])
            for (const hours24 of [false, true]) {
              assert.equal(
                isValidTime(str, allow, hours24),
                previousTime(str, allow, hours24),
                str,
              );
              checked++;
            }
        }
console.log(JSON.stringify({ timeEquivalenceCases: checked }));
function compare(label, before, after, calls) {
  const run = (fn) => {
    let sink = 0;
    const start = performance.now();
    for (let i = 0; i < calls; i++) sink += fn(i);
    return { ms: performance.now() - start, sink };
  };
  for (let i = 0; i < 3; i++) {
    run(before);
    run(after);
  }
  const beforeTimes = [],
    afterTimes = [];
  for (let i = 0; i < 7; i++) {
    let b, a;
    if (i % 2) {
      a = run(after);
      b = run(before);
    } else {
      b = run(before);
      a = run(after);
    }
    assert.equal(a.sink, b.sink);
    beforeTimes.push(b.ms);
    afterTimes.push(a.ms);
  }
  const median = (values) => values.sort((a, b) => a - b)[3];
  const beforeMs = median(beforeTimes),
    afterMs = median(afterTimes);
  console.log(
    JSON.stringify({
      label,
      calls,
      beforeMs,
      afterMs,
      speedup: beforeMs / afterMs,
    }),
  );
}
for (const [length, distinct] of [
  [1000, 1000],
  [3000, 3000],
  [10000, 100],
]) {
  const values = Array.from({ length }, (_, i) => i % distinct);
  assert.deepEqual(findUniqueElements(values), previousUnique(values));
  compare(
    'unique ' + length + '/' + distinct,
    () => previousUnique(values).length,
    () => findUniqueElements(values).length,
    10,
  );
}
for (const [label, values] of [
  ['object', Array.from({ length: 100 }, (_, id) => ({ id }))],
  ['mixed', Array.from({ length: 200 }, (_, id) => (id % 2 ? { id } : id))],
]) {
  assert.deepEqual(findUniqueElements(values), previousUnique(values));
  compare(
    label + ' uniqueness',
    () => previousUnique(values).length,
    () => findUniqueElements(values).length,
    10,
  );
}

for (const [text, allow, hours24] of [
  ['14:30:45', true, true],
  ['2:05 PM', false, false],
  ['25:60', true, true],
]) {
  compare(
    'time ' + text,
    (i) => Number(previousTime(text, allow, hours24)),
    (i) => Number(isValidTime(text, allow, hours24)),
    100000,
  );
}
