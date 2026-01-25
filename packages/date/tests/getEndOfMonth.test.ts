import { getEndOfMonth } from '../src/getEndOfMonth';

/**
 * Unit tests for the getEndOfMonth function.
 */
describe('getEndOfMonth', () => {
  // Test case 1: Get the last date of the month for January
  it('1. should return the last date of January', () => {
    const date: Date = new Date('2023-01-15');
    const expected: Date = new Date('2023-01-31');
    const result: Date = getEndOfMonth(date);
    expect(result).toEqual(expected);
  });

  // Test case 2: Get the last date of the month for February in a non-leap year
  it('2. should return the last date of February in a non-leap year', () => {
    const date: Date = new Date('2023-02-15');
    const expected: Date = new Date('2023-02-28');
    const result: Date = getEndOfMonth(date);
    expect(result).toEqual(expected);
  });

  // Test case 3: Get the last date of the month for February in a leap year
  it('3. should return the last date of February in a leap year', () => {
    const date: Date = new Date('2024-02-15');
    const expected: Date = new Date('2024-02-29');
    const result: Date = getEndOfMonth(date);
    expect(result).toEqual(expected);
  });

  // Test case 4: Get the last date of the month for April
  it('4. should return the last date of April', () => {
    const date: Date = new Date('2023-04-15');
    const expected: Date = new Date('2023-04-30');
    const result: Date = getEndOfMonth(date);
    expect(result).toEqual(expected);
  });

  // Test case 5: Get the last date of the month for December
  it('5. should return the last date of December', () => {
    const date: Date = new Date('2023-12-15');
    const expected: Date = new Date('2023-12-31');
    const result: Date = getEndOfMonth(date);
    expect(result).toEqual(expected);
  });

  // Test case 6: Get the last date of the month for a date with time components
  it('6. should return the last date of the month for a date with time components', () => {
    const date: Date = new Date('2023-01-15T12:34:56');
    const expected: Date = new Date('2023-01-31');
    const result: Date = getEndOfMonth(date);
    expect(result).toEqual(expected);
  });

  // Test case 7: Get the last date of the month for a NaN date (should throw an error)
  it('7. should throw an error for a NaN date', () => {
    const date: Date = new Date(NaN);
    expect(() => getEndOfMonth(date)).toThrow('Invalid date');
  });

  // Test case 8: Get the last date of the month for an invalid date (should throw an error)
  it('8. should throw an error for an invalid date', () => {
    const date: Date = new Date('invalid-date');
    expect(() => getEndOfMonth(date)).toThrow('Invalid date');
  });
});
