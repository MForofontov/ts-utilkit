import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { transpileModule, ModuleKind, ScriptTarget } from 'typescript';
import { getWeekdaysInMonth } from '../src/getWeekdaysInMonth';
import { localDate } from './dateTestUtils';

/**
 * Unit tests for the getWeekdaysInMonth function.
 */
describe('getWeekdaysInMonth', () => {
  // Test case 1: Get the number of weekdays in January 2023
  it('1. should return the number of weekdays in January 2023', () => {
    const date: Date = localDate(2023, 0, 1);
    const expected: number = 22;
    const result: number = getWeekdaysInMonth(date);
    expect(result).toBe(expected);
  });

  // Test case 2: Get the number of weekdays in February 2023 (non-leap year)
  it('2. should return the number of weekdays in February 2023 (non-leap year)', () => {
    const date: Date = localDate(2023, 1, 1);
    const expected: number = 20;
    const result: number = getWeekdaysInMonth(date);
    expect(result).toBe(expected);
  });

  // Test case 3: Get the number of weekdays in February 2024 (leap year)
  it('3. should return the number of weekdays in February 2024 (leap year)', () => {
    const date: Date = localDate(2024, 1, 1);
    const expected: number = 21;
    const result: number = getWeekdaysInMonth(date);
    expect(result).toBe(expected);
  });

  // Test case 4: Get the number of weekdays in April 2023
  it('4. should return the number of weekdays in April 2023', () => {
    const date: Date = localDate(2023, 3, 1);
    const expected: number = 20;
    const result: number = getWeekdaysInMonth(date);
    expect(result).toBe(expected);
  });

  // Test case 5: Get the number of weekdays in December 2023
  it('5. should return the number of weekdays in December 2023', () => {
    const date: Date = localDate(2023, 11, 1);
    const expected: number = 21;
    const result: number = getWeekdaysInMonth(date);
    expect(result).toBe(expected);
  });

  // Test case 6: Get the number of weekdays in a month with 30 days
  it('6. should return the number of weekdays in June 2023', () => {
    const date: Date = localDate(2023, 5, 1);
    const expected: number = 22;
    const result: number = getWeekdaysInMonth(date);
    expect(result).toBe(expected);
  });

  // Test case 7: Get the number of weekdays in a month with 31 days
  it('7. should return the number of weekdays in July 2023', () => {
    const date: Date = localDate(2023, 6, 1);
    const expected: number = 21;
    const result: number = getWeekdaysInMonth(date);
    expect(result).toBe(expected);
  });

  // Test case 8: Get the number of weekdays in a month with zero time components
  it('8. should return the number of weekdays in January 2023 with zero time components', () => {
    const date: Date = localDate(2023, 0, 1, 0, 0, 0);
    const expected: number = 22;
    const result: number = getWeekdaysInMonth(date);
    expect(result).toBe(expected);
  });

  // Test case 9: Get the number of weekdays in a month with non-zero time components
  it('9. should return the number of weekdays in January 2023 with non-zero time components', () => {
    const date: Date = localDate(2023, 0, 1, 12, 34, 56);
    const expected: number = 22;
    const result: number = getWeekdaysInMonth(date);
    expect(result).toBe(expected);
  });

  // Test case 10: Get the number of weekdays in a month with a negative year
  it('10. should return the number of weekdays in January -000001', () => {
    const date: Date = localDate(-1, 0, 1);
    const expected: number = 21;
    const result: number = getWeekdaysInMonth(date);
    expect(result).toBe(expected);
  });

  // Test case 11: Get the number of weekdays in a month for a NaN date (should throw an error)
  it('11. should throw an error for a NaN date', () => {
    const date: Date = new Date(NaN);
    expect(() => getWeekdaysInMonth(date)).toThrow('Invalid date');
  });

  // Test case 12: Get the number of weekdays in a month for an invalid date (should throw an error)
  it('12. should throw an error for an invalid date', () => {
    const date: Date = new Date('invalid-date');
    expect(() => getWeekdaysInMonth(date)).toThrow('Invalid date');
  });
});

it.each([
  'UTC',
  'Europe/Lisbon',
  'America/New_York',
  'Pacific/Apia',
  'Pacific/Kiritimati',
])(
  'preserves local weekday counting across DST and skipped dates in %s',
  (timezone) => {
    const modules = Object.fromEntries(
      ['getWeekdaysInMonth', 'getDaysInMonth', '_calendarDate'].map((name) => [
        './' + name,
        transpileModule(
          readFileSync(require.resolve('../src/' + name), 'utf8'),
          {
            compilerOptions: {
              module: ModuleKind.CommonJS,
              target: ScriptTarget.ES2022,
            },
          },
        ).outputText,
      ]),
    );
    const script = `
      const modules = ${JSON.stringify(modules)};
      function load(id) {
        const exports = {};
        new Function('require', 'exports', modules[id])(load, exports);
        return exports;
      }
      const { getWeekdaysInMonth } = load('./getWeekdaysInMonth');
      const rows = [[1994, 11], [2011, 11], [2024, 2], [2024, 9]].map(([year, month]) => {
        const lastDay = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
        let expected = 0;
        for (let day = 1; day <= lastDay; day++) {
          const weekday = new Date(year, month, day).getDay();
          if (weekday >= 1 && weekday <= 5) expected++;
        }
        return [getWeekdaysInMonth(new Date(year, month, 15)), expected];
      });
      for (const year of [0, 4, 42, 99]) {
        const input = new Date(2000, 1, 15); input.setFullYear(year);
        const lastDay = new Date(year + 400, 2, 0).getDate();
        let expected = 0;
        for (let day = 1; day <= lastDay; day++) {
          const weekday = new Date(year + 400, 1, day).getDay();
          if (weekday >= 1 && weekday <= 5) expected++;
        }
        rows.push([getWeekdaysInMonth(input), expected]);
      }
      console.log(JSON.stringify(rows));
    `;
    const rows = JSON.parse(
      execFileSync(process.execPath, ['-e', script], {
        encoding: 'utf8',
        env: {
          ...process.env,
          TZ: timezone,
          NODE_OPTIONS: '--max-old-space-size=128 --max-semi-space-size=4',
        },
        timeout: 10000,
      }),
    ) as number[][];
    for (const [actual, expected] of rows) expect(actual).toBe(expected);
    if (timezone === 'Pacific/Kiritimati') expect(rows[0][0]).toBe(22);
  },
);

it.each([0, 4, 42, 99])(
  'matches the Gregorian 400-year cycle for literal year %i',
  (year) => {
    for (let month = 0; month < 12; month++) {
      const input = new Date(2000, month, 15);
      input.setFullYear(year);
      const reference = new Date(year + 400, month, 15);
      const before = input.getTime();
      expect(getWeekdaysInMonth(input)).toBe(getWeekdaysInMonth(reference));
      expect(input.getTime()).toBe(before);
    }
  },
);
