// Run after npm run build. Median timings are informational, never assertions.
const assert = require('node:assert/strict');
const { performance } = require('node:perf_hooks');
const current = require('../packages/date/dist');
// Exact implementations before literal-year fixes and allocation reductions.
const baselineDateUtils = (() => {
  function shiftMonths(date, months) {
    const result = new Date(date);
    const day = result.getDate();
    const targetMonth = result.getMonth() + months;
    result.setDate(1);
    result.setMonth(targetMonth);
    const lastDayOfMonth = new Date(
      result.getFullYear(),
      result.getMonth() + 1,
      0,
    ).getDate();
    result.setDate(Math.min(day, lastDayOfMonth));
    return result;
  }
  function dayOfYear(date) {
    const year = date.getFullYear();
    let days = date.getDate() - 1;
    for (let month = 0; month < date.getMonth(); month++) {
      days += new Date(year, month + 1, 0).getDate();
    }
    return days;
  }

  return { dayOfYear };
})();
const previousWeekNumber = (() => {
  const dateUtils_1 = baselineDateUtils;
  function getWeekNumber(date) {
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
    const start = new Date(date.getFullYear(), 0, 1);
    const days = (0, dateUtils_1.dayOfYear)(date);
    return Math.ceil((days + start.getDay() + 1) / 7);
  }

  return getWeekNumber;
})();
const previousWeekdays = (() => {
  function getWeekdaysInMonth(date) {
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
    const year = date.getFullYear();
    const month = date.getMonth();
    let weekdayCount = 0;
    // Loop through all days of the month
    for (let day = 1; day <= new Date(year, month + 1, 0).getDate(); day++) {
      const currentDay = new Date(year, month, day).getDay();
      // Check if the day is Monday to Friday
      if (currentDay >= 1 && currentDay <= 5) {
        weekdayCount++;
      }
    }
    return weekdayCount;
  }

  return getWeekdaysInMonth;
})();
let sink;
function measurePair(previous, next, date) {
  const run = (fn) => {
    const start = performance.now();
    for (let i = 0; i < 10000; i++) sink = fn(date);
    return performance.now() - start;
  };
  for (let i = 0; i < 3; i++) {
    run(previous);
    run(next);
  }
  const before = [];
  const after = [];
  for (let i = 0; i < 7; i++) {
    if (i % 2 === 0) {
      before.push(run(previous));
      after.push(run(next));
    } else {
      after.push(run(next));
      before.push(run(previous));
    }
  }
  return [before.sort((a, b) => a - b)[3], after.sort((a, b) => a - b)[3]];
}
for (const [name, previous] of [
  ['getWeekNumber', previousWeekNumber],
  ['getWeekdaysInMonth', previousWeekdays],
]) {
  for (const month of [0, 5, 11]) {
    const date = new Date(2024, month, 15, 12);
    assert.equal(current[name](date), previous(date));
    const [beforeMs, afterMs] = measurePair(previous, current[name], date);
    assert.equal(sink, previous(date));
    console.log(
      JSON.stringify({
        function: name,
        month: month + 1,
        calls: 10000,
        beforeMs,
        afterMs,
        speedup: beforeMs / afterMs,
      }),
    );
  }
}
