import { calculateAge } from '../src/calculateAge';

/**
 * Unit tests for the calculateAge function.
 */
describe('calculateAge', () => {
  // Test case 1: Calculate age for a valid date of birth
  it('1. should return the correct age for a valid date of birth', () => {
    const dob: Date = new Date('1990-09-19');
    const expected: number =
      new Date().getFullYear() -
      1990 -
      (new Date().getMonth() < 8 ||
      (new Date().getMonth() === 8 && new Date().getDate() < 19)
        ? 1
        : 0);
    const result: number = calculateAge(dob);
    expect(result).toBe(expected);
  });

  // Test case 2: Calculate age for a leap year date of birth
  it('2. should return the correct age for a leap year date of birth', () => {
    const dob: Date = new Date('2000-02-29');
    const expected: number =
      new Date().getFullYear() -
      2000 -
      (new Date().getMonth() < 1 ||
      (new Date().getMonth() === 1 && new Date().getDate() < 29)
        ? 1
        : 0);
    const result: number = calculateAge(dob);
    expect(result).toBe(expected);
  });

  // Test case 3: Calculate age for a date of birth with time components
  it('3. should return the correct age for a date of birth with time components', () => {
    const dob: Date = new Date('1990-09-19T12:34:56');
    const expected: number =
      new Date().getFullYear() -
      1990 -
      (new Date().getMonth() < 8 ||
      (new Date().getMonth() === 8 && new Date().getDate() < 19)
        ? 1
        : 0);
    const result: number = calculateAge(dob);
    expect(result).toBe(expected);
  });

  // Test case 4: Calculate age for a date of birth at the start of the year
  it('4. should return the correct age for a date of birth at the start of the year', () => {
    const dob: Date = new Date('1990-01-01');
    const expected: number =
      new Date().getFullYear() -
      1990 -
      (new Date().getMonth() === 0 && new Date().getDate() < 1 ? 1 : 0);
    const result: number = calculateAge(dob);
    expect(result).toBe(expected);
  });

  // Test case 5: Calculate age for a date of birth at the end of the year
  it('5. should return the correct age for a date of birth at the end of the year', () => {
    const dob: Date = new Date('1990-12-31');
    const expected: number =
      new Date().getFullYear() -
      1990 -
      (new Date().getMonth() < 11 ||
      (new Date().getMonth() === 11 && new Date().getDate() < 31)
        ? 1
        : 0);
    const result: number = calculateAge(dob);
    expect(result).toBe(expected);
  });

  // Test case 6: Calculate age for a date of birth with zero time components
  it('6. should return the correct age for a date of birth with zero time components', () => {
    const dob: Date = new Date('1990-09-19T00:00:00');
    const expected: number =
      new Date().getFullYear() -
      1990 -
      (new Date().getMonth() < 8 ||
      (new Date().getMonth() === 8 && new Date().getDate() < 19)
        ? 1
        : 0);
    const result: number = calculateAge(dob);
    expect(result).toBe(expected);
  });

  // Test case 7: Calculate age for a date of birth with a negative year
  it('7. should return the correct age for a date of birth with a negative year', () => {
    const dob: Date = new Date('-000001-01-01');
    const expected: number = new Date().getFullYear() + 1;
    const result: number = calculateAge(dob);
    expect(result).toBe(expected);
  });

  // Test case 8: Calculate age for a date of birth that is today
  it('8. should return 0 for a date of birth that is today', () => {
    const dob: Date = new Date();
    const expected: number = 0;
    const result: number = calculateAge(dob);
    expect(result).toBe(expected);
  });

  // Test case 9: Calculate age for a date of birth on February 29 in a non-leap year
  it('9. should return the correct age for a date of birth on February 29 in a non-leap year', () => {
    const dob: Date = new Date('2000-02-29');
    const expected: number =
      new Date().getFullYear() -
      2000 -
      (new Date().getMonth() < 1 ||
      (new Date().getMonth() === 1 && new Date().getDate() < 28)
        ? 1
        : 0);
    const result: number = calculateAge(dob);
    expect(result).toBe(expected);
  });

  // Test case 10: Calculate age for a NaN date of birth (should throw an error)
  it('10. should throw an error for a NaN date of birth', () => {
    const dob: Date = new Date(NaN);
    expect(() => calculateAge(dob)).toThrow('Invalid date of birth');
  });

  // Test case 11: Calculate age for an invalid date of birth (should throw an error)
  it('11. should throw an error for an invalid date of birth', () => {
    const dob: Date = new Date('invalid-date');
    expect(() => calculateAge(dob)).toThrow('Invalid date of birth');
  });

  // Test case 12: Calculate age for a date of birth in the future (should throw an error)
  it('12. should throw an error for a date of birth in the future', () => {
    const dob: Date = new Date('3000-01-01');
    expect(() => calculateAge(dob)).toThrow('Date of birth is in the future');
  });
});
