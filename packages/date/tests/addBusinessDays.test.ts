import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { transpileModule, ModuleKind, ScriptTarget } from 'typescript';
import { addBusinessDays } from '../src';

describe('addBusinessDays', () => {
  it('1. skips weekends in either direction and preserves local time', () => {
    const friday = new Date(2026, 9, 23, 14, 15, 16, 17);
    const monday = addBusinessDays(friday, 1);
    expect([
      monday.getFullYear(),
      monday.getMonth(),
      monday.getDate(),
      monday.getHours(),
      monday.getMinutes(),
      monday.getSeconds(),
      monday.getMilliseconds(),
    ]).toEqual([2026, 9, 26, 14, 15, 16, 17]);
    expect(addBusinessDays(monday, -1).getTime()).toBe(friday.getTime());
    expect(friday.getDate()).toBe(23);
  });
  it('2. starts counting at the first weekday after a weekend', () => {
    for (const day of [24, 25]) {
      expect(addBusinessDays(new Date(2026, 9, day), 1).getDate()).toBe(26);
      expect(addBusinessDays(new Date(2026, 9, day), -1).getDate()).toBe(23);
    }
  });
  it('3. returns an independent copy for zero, including weekend inputs', () => {
    const date = new Date(2026, 9, 24);
    const result = addBusinessDays(date, 0);
    expect(result).not.toBe(date);
    expect(result.getTime()).toBe(date.getTime());
  });
  it('4. matches a calendar oracle across whole weeks, months, leap days, and years', () => {
    for (const month of [1, 11])
      for (let day = 23; day <= 29; day++)
        for (const amount of [-16, -10, -6, -5, -1, 1, 5, 6, 10, 16]) {
          const date = new Date(2024, month, day, 12);
          const expected = new Date(date);
          let left = Math.abs(amount);
          while (left > 0) {
            expected.setDate(expected.getDate() + Math.sign(amount));
            if (expected.getDay() !== 0 && expected.getDay() !== 6) left--;
          }
          expect(addBusinessDays(date, amount).getTime()).toBe(
            expected.getTime(),
          );
        }
  });
  it('5. preserves wall-clock time across spring and autumn DST changes', () => {
    const source = readFileSync(
      resolve(__dirname, '../src/addBusinessDays.ts'),
      'utf8',
    );
    const compiled = transpileModule(source, {
      compilerOptions: {
        module: ModuleKind.CommonJS,
        target: ScriptTarget.ES2023,
      },
    }).outputText;
    const code = `${compiled}
      const spring=exports.addBusinessDays(new Date(2026,2,6,2,30),1);
      const autumn=exports.addBusinessDays(new Date(2026,9,30,1,30),1);
      console.log(JSON.stringify([spring.getDate(),spring.getHours(),spring.getMinutes(),autumn.getMonth(),autumn.getDate(),autumn.getHours()]));`;
    const child = spawnSync(process.execPath, ['-e', code], {
      env: { ...process.env, TZ: 'America/New_York' },
      encoding: 'utf8',
      timeout: 20000,
    });
    expect(child.error).toBeUndefined();
    expect(child.stderr).toBe('');
    expect(child.status).toBe(0);
    expect(JSON.parse(child.stdout)).toEqual([9, 2, 30, 10, 2, 1]);
  }, 25000);
  it('6. supports years before 100 literally', () => {
    const date = new Date(0);
    date.setFullYear(4, 1, 27);
    expect(addBusinessDays(date, 3).getFullYear()).toBe(4);
  });
  it('7. rejects invalid types and dates', () => {
    expect(() => addBusinessDays('2026-01-01' as unknown as Date, 1)).toThrow(
      TypeError,
    );
    expect(() => addBusinessDays(new Date(), '1' as unknown as number)).toThrow(
      TypeError,
    );
    expect(() => addBusinessDays(new Date(NaN), 1)).toThrow(RangeError);
  });
  it.each([NaN, Infinity, -Infinity, 0.5, Number.MAX_SAFE_INTEGER + 1])(
    '8. rejects invalid amounts %s',
    (amount) => {
      expect(() => addBusinessDays(new Date(), amount)).toThrow(RangeError);
    },
  );
  it('9. rejects dates outside the supported range without unbounded iteration', () => {
    expect(() => addBusinessDays(new Date(), Number.MAX_SAFE_INTEGER)).toThrow(
      RangeError,
    );
    expect(() => addBusinessDays(new Date(8.64e15), 1)).toThrow(RangeError);
    expect(() => addBusinessDays(new Date(-8.64e15), -1)).toThrow(RangeError);
  });
});
