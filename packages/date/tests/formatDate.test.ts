import { formatDate } from '../src/formatDate';

/**
 * Unit tests for the formatDate function.
 */
describe('formatDate', () => {
  // Test case 1: Format a valid date with 'YYYY-MM-DD' format
  it('1. should format the date correctly with "YYYY-MM-DD" format', () => {
    const date: Date = new Date('2023-01-01');
    const format: string = 'YYYY-MM-DD';
    const expected: string = '2023-01-01';
    const result: string = formatDate(date, format);
    expect(result).toBe(expected);
  });

  // Test case 2: Format a valid date with 'MM/DD/YYYY' format
  it('2. should format the date correctly with "MM/DD/YYYY" format', () => {
    const date: Date = new Date('2023-01-01');
    const format: string = 'MM/DD/YYYY';
    const expected: string = '01/01/2023';
    const result: string = formatDate(date, format);
    expect(result).toBe(expected);
  });

  // Test case 3: Format a valid date with 'YYYY-MM-DD HH:mm:ss' format
  it('3. should format the date correctly with "YYYY-MM-DD HH:mm:ss" format', () => {
    const date: Date = new Date('2023-01-01T10:20:30');
    const format: string = 'YYYY-MM-DD HH:mm:ss';
    const expected: string = '2023-01-01 10:20:30';
    const result: string = formatDate(date, format);
    expect(result).toBe(expected);
  });

  // Test case 4: Format a valid date with 'HH:mm:ss' format
  it('4. should format the date correctly with "HH:mm:ss" format', () => {
    const date: Date = new Date('2023-01-01T10:20:30');
    const format: string = 'HH:mm:ss';
    const expected: string = '10:20:30';
    const result: string = formatDate(date, format);
    expect(result).toBe(expected);
  });

  // Test case 5: Format a valid date with 'DD-MM-YYYY' format
  it('5. should format the date correctly with "DD-MM-YYYY" format', () => {
    const date: Date = new Date('2023-01-01');
    const format: string = 'DD-MM-YYYY';
    const expected: string = '01-01-2023';
    const result: string = formatDate(date, format);
    expect(result).toBe(expected);
  });

  // Test case 6: Format a date with negative year
  it('6. should format the date correctly with a negative year', () => {
    const date: Date = new Date('-000001-01-01');
    const format: string = 'YYYY-MM-DD';
    const expected: string = '-000001-01-01';
    const result: string = formatDate(date, format);
    expect(result).toBe(expected);
  });

  // Test case 7: Format a date with a leap day
  it('7. should format the date correctly with a leap day', () => {
    const date: Date = new Date('2020-02-29');
    const format: string = 'YYYY-MM-DD';
    const expected: string = '2020-02-29';
    const result: string = formatDate(date, format);
    expect(result).toBe(expected);
  });

  // Test case 8: Format a date with time components
  it('8. should format the date correctly with time components', () => {
    const date: Date = new Date('2023-01-01T23:59:59');
    const format: string = 'YYYY-MM-DD HH:mm:ss';
    const expected: string = '2023-01-01 23:59:59';
    const result: string = formatDate(date, format);
    expect(result).toBe(expected);
  });

  // Test case 9: Format a date with an empty format string
  it('9. should return an empty string for an empty format string', () => {
    const date: Date = new Date('2023-01-01');
    const format: string = '';
    const expected: string = '';
    const result: string = formatDate(date, format);
    expect(result).toBe(expected);
  });

  // Test case 10: Format a date when the date string is missing time components
  it('10. should format the date correctly when the date string is missing time components but the format string includes time components', () => {
    const date: Date = new Date('2023-01-01');
    const format: string = 'YYYY-MM-DD HH:mm:ss';
    const expected: string = '2023-01-01 00:00:00'; // Assuming the time defaults to 00:00:00
    const result: string = formatDate(date, format);
    expect(result).toBe(expected);
  });

  // Test case 11: Format an invalid date (should throw an error)
  it('11. should throw an error for an invalid date', () => {
    const date: Date = new Date('invalid-date');
    const format: string = 'YYYY-MM-DD';
    expect(() => formatDate(date, format)).toThrow('Invalid date');
  });

  // Test case 12: Format a NaN date (should throw an error)
  it('12. should throw an error for a NaN date', () => {
    const date: Date = new Date(NaN);
    const format: string = 'YYYY-MM-DD';
    expect(() => formatDate(date, format)).toThrow('Invalid date');
  });

  // Test case 13: Format a date with an unsupported format token (should throw an error)
  it('13. should throw an error for an unsupported format token', () => {
    const date: Date = new Date('2023-01-01');
    const format: string = 'YYYY-MM-DD-XYZ';
    expect(() => formatDate(date, format)).toThrow(
      'Unsupported format tokens: XYZ. Supported tokens are: YYYY, MM, DD, HH, mm, ss',
    );
  });
});
