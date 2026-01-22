import { extractSubstring } from '../src/extractSubstring';

/**
 * Unit tests for the extractSubstring function.
 */
describe('extractSubstring', () => {
  // Test case 1: Extract a substring from a simple string
  it('1. should extract a substring from a simple string', () => {
    const str: string = 'hello world';
    const start: number = 6;
    const length: number = 5;
    const expected: string = 'world';
    const result: string = extractSubstring(str, start, length);
    expect(result).toBe(expected);
  });

  // Test case 2: Extract a substring from the middle of a string
  it('2. should extract a substring from the middle of a string', () => {
    const str: string = 'hello world';
    const start: number = 3;
    const length: number = 4;
    const expected: string = 'lo w';
    const result: string = extractSubstring(str, start, length);
    expect(result).toBe(expected);
  });

  // Test case 3: Extract a substring with length greater than string length
  it('3. should extract a substring when length is greater than string length', () => {
    const str: string = 'hello world';
    const start: number = 6;
    const length: number = 20;
    const expected: string = 'world';
    const result: string = extractSubstring(str, start, length);
    expect(result).toBe(expected);
  });

  // Test case 4: Extract a substring with length of zero
  it('4. should return an empty string when length is zero', () => {
    const str: string = 'hello world';
    const start: number = 6;
    const length: number = 0;
    const expected: string = '';
    const result: string = extractSubstring(str, start, length);
    expect(result).toBe(expected);
  });

  // Test case 5: Extract a substring with start index and length of zero
  it('5. should return an empty string when start index and length are zero', () => {
    const str: string = 'hello world';
    const start: number = 0;
    const length: number = 0;
    const expected: string = '';
    const result: string = extractSubstring(str, start, length);
    expect(result).toBe(expected);
  });

  // Test case 6: Extract a substring from a string with special characters
  it('6. should extract a substring from a string with special characters', () => {
    const str: string = 'hello @world!';
    const start: number = 6;
    const length: number = 6;
    const expected: string = '@world';
    const result: string = extractSubstring(str, start, length);
    expect(result).toBe(expected);
  });

  // Test case 7: Extract a substring from a string with numbers
  it('7. should extract a substring from a string with numbers', () => {
    const str: string = 'hello 123 world';
    const start: number = 6;
    const length: number = 3;
    const expected: string = '123';
    const result: string = extractSubstring(str, start, length);
    expect(result).toBe(expected);
  });

  // Test case 8: Extract a substring from a string with mixed characters
  it('8. should extract a substring from a string with mixed characters', () => {
    const str: string = 'a1@ b2# c3$';
    const start: number = 4;
    const length: number = 3;
    const expected: string = 'b2#';
    const result: string = extractSubstring(str, start, length);
    expect(result).toBe(expected);
  });

  // Test case 9: Extract a substring from an empty string
  it('9. should return an empty string when extracting a substring from an empty string', () => {
    const str: string = '';
    const start: number = 0;
    const length: number = 5;
    const expected: string = '';
    const result: string = extractSubstring(str, start, length);
    expect(result).toBe(expected);
  });

  // Test case 10: Extract a substring from a single character string
  it('10. should extract a substring from a single character string', () => {
    const str: string = 'a';
    const start: number = 0;
    const length: number = 1;
    const expected: string = 'a';
    const result: string = extractSubstring(str, start, length);
    expect(result).toBe(expected);
  });

  // Test case 11: Extract a substring from a string with leading spaces
  it('11. should extract a substring from a string with leading spaces', () => {
    const str: string = '  hello world';
    const start: number = 2;
    const length: number = 5;
    const expected: string = 'hello';
    const result: string = extractSubstring(str, start, length);
    expect(result).toBe(expected);
  });

  // Test case 12: Extract a substring from a string with trailing spaces
  it('12. should extract a substring from a string with trailing spaces', () => {
    const str: string = 'hello world  ';
    const start: number = 6;
    const length: number = 5;
    const expected: string = 'world';
    const result: string = extractSubstring(str, start, length);
    expect(result).toBe(expected);
  });

  // Test case 13: Extract a substring from a string with both leading and trailing spaces
  it('13. should extract a substring from a string with both leading and trailing spaces', () => {
    const str: string = '  hello world  ';
    const start: number = 2;
    const length: number = 5;
    const expected: string = 'hello';
    const result: string = extractSubstring(str, start, length);
    expect(result).toBe(expected);
  });

  // Test case 14: Extract a substring with non-numeric start index
  it('14. should throw an error when start index is non-numeric', () => {
    const str: string = 'hello world';
    const length: number = 5;
    expect(() =>
      extractSubstring(str, 'a' as unknown as number, length),
    ).toThrow('Start index and length must be numbers');
  });

  // Test case 15: Extract a substring with non-numeric length
  it('15. should throw an error when length is non-numeric', () => {
    const str: string = 'hello world';
    const start: number = 0;
    expect(() =>
      extractSubstring(str, start, 'a' as unknown as number),
    ).toThrow('Start index and length must be numbers');
  });

  // Test case 16: Extract a substring with start index greater than string length
  it('16. should throw an error when start index is greater than string length', () => {
    const str: string = 'hello world';
    const start: number = 20;
    const length: number = 5;
    expect(() => extractSubstring(str, start, length)).toThrow(
      'Start index must be less than or equal to the string length',
    );
  });

  // Test case 17: Extract a substring with negative start index
  it('17. should throw an error when start index is negative', () => {
    const str: string = 'hello world';
    const start: number = -1;
    const length: number = 5;
    expect(() => extractSubstring(str, start, length)).toThrow(
      'Start index must be non-negative',
    );
  });
});
