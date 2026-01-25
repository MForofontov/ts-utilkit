import { isLeapYear } from '../src/isLeapYear';

/**
 * Unit tests for the isLeapYear function.
 */
describe('isLeapYear', () => {
  // Test case 1: Typical leap year (divisible by 4 but not by 100)
  it('1. should return true for a typical leap year', () => {
    const year: number = 2024;
    const expected: boolean = true;
    const result: boolean = isLeapYear(year);
    expect(result).toBe(expected);
  });

  // Test case 2: Typical non-leap year (not divisible by 4)
  it('2. should return false for a typical non-leap year', () => {
    const year: number = 2023;
    const expected: boolean = false;
    const result: boolean = isLeapYear(year);
    expect(result).toBe(expected);
  });

  // Test case 3: Century year that is not a leap year (divisible by 100 but not by 400)
  it('3. should return false for a century year that is not a leap year', () => {
    const year: number = 1900;
    const expected: boolean = false;
    const result: boolean = isLeapYear(year);
    expect(result).toBe(expected);
  });

  // Test case 4: Century year that is a leap year (divisible by 400)
  it('4. should return true for a century year that is a leap year', () => {
    const year: number = 2000;
    const expected: boolean = true;
    const result: boolean = isLeapYear(year);
    expect(result).toBe(expected);
  });

  // Test case 5: Negative year
  it('5. should return true for a negative leap year', () => {
    const year: number = -4;
    const expected: boolean = true;
    const result: boolean = isLeapYear(year);
    expect(result).toBe(expected);
  });

  // Test case 6: Year zero
  it('6. should return true for the year zero', () => {
    const year: number = 0;
    const expected: boolean = true;
    const result: boolean = isLeapYear(year);
    expect(result).toBe(expected);
  });

  // Test case 7: NaN year (should throw an error)
  it('7. should throw a TypeError for a NaN year', () => {
    const year: number = NaN;
    expect(() => isLeapYear(year)).toThrow('Year should be a valid number');
  });
});
