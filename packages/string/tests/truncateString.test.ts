import { truncateString } from '../src/truncateString';

/**
 * Unit tests for the truncateString function.
 */
describe('truncateString', () => {
  // Test case 1: Truncate a string to a specified length
  it('1. should truncate a string to a specified length', () => {
    const str: string = 'This is a long string that needs to be truncated.';
    const maxLength: number = 20;
    const expected: string = 'This is a long st...';
    const result: string = truncateString(str, maxLength);
    expect(result).toBe(expected);
  });

  // Test case 2: Return the original string if it is shorter than the maximum length
  it('2. should return the original string if it is shorter than the maximum length', () => {
    const str: string = 'Short string';
    const maxLength: number = 20;
    const expected: string = 'Short string';
    const result: string = truncateString(str, maxLength);
    expect(result).toBe(expected);
  });

  // Test case 3: Return an empty string if the maximum length is zero
  it('3. should return an empty string if the maximum length is zero', () => {
    const str: string = 'This is a long string.';
    const maxLength: number = 0;
    const expected: string = '';
    const result: string = truncateString(str, maxLength);
    expect(result).toBe(expected);
  });

  // Test case 4: Return an empty string if the maximum length is negative
  it('4. should return an empty string if the maximum length is negative', () => {
    const str: string = 'This is a long string.';
    const maxLength: number = -5;
    const expected: string = '';
    const result: string = truncateString(str, maxLength);
    expect(result).toBe(expected);
  });

  // Test case 5: Return the ellipsis if the maximum length is less than or equal to 3
  it('5. should return the ellipsis if the maximum length is less than or equal to 3', () => {
    const str: string = 'This is a long string.';
    const maxLength: number = 3;
    const expected: string = '...';
    const result: string = truncateString(str, maxLength);
    expect(result).toBe(expected);
  });

  // Test case 6: Truncate a string with special characters
  it('6. should truncate a string with special characters', () => {
    const str: string =
      'This is a long string with special characters @#$%^&*()!';
    const maxLength: number = 30;
    const expected: string = 'This is a long string with ...';
    const result: string = truncateString(str, maxLength);
    expect(result).toBe(expected);
  });

  // Test case 7: Truncate a string with numbers
  it('7. should truncate a string with numbers', () => {
    const str: string = 'This is a long string with numbers 1234567890.';
    const maxLength: number = 25;
    const expected: string = 'This is a long string ...';
    const result: string = truncateString(str, maxLength);
    expect(result).toBe(expected);
  });

  // Test case 8: Truncate a string with mixed characters
  it('8. should truncate a string with mixed characters', () => {
    const str: string =
      'This is a long string with mixed characters a1@ B2# C3$.';
    const maxLength: number = 35;
    const expected: string = 'This is a long string with mixed...';
    const result: string = truncateString(str, maxLength);
    expect(result).toBe(expected);
  });

  // Test case 9: Truncate a string with leading spaces
  it('9. should truncate a string with leading spaces', () => {
    const str: string = '   This is a long string with leading spaces.';
    const maxLength: number = 30;
    const expected: string = '   This is a long string wi...';
    const result: string = truncateString(str, maxLength);
    expect(result).toBe(expected);
  });

  // Test case 10: Truncate a string with trailing spaces
  it('10. should truncate a string with trailing spaces', () => {
    const str: string = 'This is a long string with trailing spaces.   ';
    const maxLength: number = 30;
    const expected: string = 'This is a long string with ...';
    const result: string = truncateString(str, maxLength);
    expect(result).toBe(expected);
  });

  // Test case 11: Truncate a string with both leading and trailing spaces
  it('11. should truncate a string with both leading and trailing spaces', () => {
    const str: string =
      '   This is a long string with both leading and trailing spaces.   ';
    const maxLength: number = 40;
    const expected: string = '   This is a long string with both le...';
    const result: string = truncateString(str, maxLength);
    expect(result).toBe(expected);
  });

  // Test case 12: Truncate an empty string
  it('12. should return an empty string when truncating an empty string', () => {
    const str: string = '';
    const maxLength: number = 10;
    const expected: string = '';
    const result: string = truncateString(str, maxLength);
    expect(result).toBe(expected);
  });

  // Test case 13: Truncate a string with newline characters
  it('13. should truncate a string with newline characters', () => {
    const str: string = 'This is a long string\nwith newline characters.';
    const maxLength: number = 30;
    const expected: string = 'This is a long string\nwith ...';
    const result: string = truncateString(str, maxLength);
    expect(result).toBe(expected);
  });

  // Test case 14: Truncate a string with tab characters
  it('14. should truncate a string with tab characters', () => {
    const str: string = 'This is a long string\twith tab characters.';
    const maxLength: number = 30;
    const expected: string = 'This is a long string\twith ...';
    const result: string = truncateString(str, maxLength);
    expect(result).toBe(expected);
  });

  // Test case 15: Truncate a string with mixed whitespace characters
  it('15. should truncate a string with mixed whitespace characters', () => {
    const str: string =
      'This is a long string \t\n with mixed whitespace characters.';
    const maxLength: number = 35;
    const expected: string = 'This is a long string \t\n with mi...';
    const result: string = truncateString(str, maxLength);
    expect(result).toBe(expected);
  });
});
