import { repeatUntilLength } from '../src/repeatUntilLength';

/**
 * Unit tests for the repeatUntilLength function.
 */
describe('repeatUntilLength', () => {
  // Test case 1: Repeat a string until it reaches a specified length
  it('1. should repeat a string until it reaches a specified length', () => {
    const str: string = 'abc';
    const length: number = 10;
    const expected: string = 'abcabcabca';
    const result: string = repeatUntilLength(str, length);
    expect(result).toBe(expected);
  });

  // Test case 2: Repeat a string until it reaches a length of zero
  it('2. should return an empty string when the desired length is zero', () => {
    const str: string = 'abc';
    const length: number = 0;
    const expected: string = '';
    const result: string = repeatUntilLength(str, length);
    expect(result).toBe(expected);
  });

  // Test case 3: Repeat a string until it reaches a length of one
  it('3. should return the first character of the string when the desired length is one', () => {
    const str: string = 'abc';
    const length: number = 1;
    const expected: string = 'a';
    const result: string = repeatUntilLength(str, length);
    expect(result).toBe(expected);
  });

  // Test case 4: Repeat an empty string until it reaches a specified length
  it('4. should return an empty string when repeating an empty string to any length', () => {
    const str: string = '';
    const length: number = 5;
    const expected: string = '';
    const result: string = repeatUntilLength(str, length);
    expect(result).toBe(expected);
  });

  // Test case 5: Repeat a string with special characters until it reaches a specified length
  it('5. should repeat a string with special characters until it reaches a specified length', () => {
    const str: string = '@hello@';
    const length: number = 15;
    const expected: string = '@hello@@hello@@';
    const result: string = repeatUntilLength(str, length);
    expect(result).toBe(expected);
  });

  // Test case 6: Repeat a string with numbers until it reaches a specified length
  it('6. should repeat a string with numbers until it reaches a specified length', () => {
    const str: string = '123';
    const length: number = 10;
    const expected: string = '1231231231';
    const result: string = repeatUntilLength(str, length);
    expect(result).toBe(expected);
  });

  // Test case 7: Repeat a string with mixed characters until it reaches a specified length
  it('7. should repeat a string with mixed characters until it reaches a specified length', () => {
    const str: string = 'a1@b2#';
    const length: number = 12;
    const expected: string = 'a1@b2#a1@b2#';
    const result: string = repeatUntilLength(str, length);
    expect(result).toBe(expected);
  });

  // Test case 8: Repeat a string with leading spaces until it reaches a specified length
  it('8. should repeat a string with leading spaces until it reaches a specified length', () => {
    const str: string = '  hello';
    const length: number = 15;
    const expected: string = '  hello  hello ';
    const result: string = repeatUntilLength(str, length);
    expect(result).toBe(expected);
  });

  // Test case 9: Repeat a string with trailing spaces until it reaches a specified length
  it('9. should repeat a string with trailing spaces until it reaches a specified length', () => {
    const str: string = 'hello  ';
    const length: number = 14;
    const expected: string = 'hello  hello  ';
    const result: string = repeatUntilLength(str, length);
    expect(result).toBe(expected);
  });

  // Test case 10: Repeat a string with both leading and trailing spaces until it reaches a specified length
  it('10. should repeat a string with both leading and trailing spaces until it reaches a specified length', () => {
    const str: string = '  hello  ';
    const length: number = 20;
    const expected: string = '  hello    hello    ';
    const result: string = repeatUntilLength(str, length);
    expect(result).toBe(expected);
  });

  // Test case 11: Repeat a string with mixed whitespace characters until it reaches a specified length
  it('11. should repeat a string with mixed whitespace characters until it reaches a specified length', () => {
    const str: string = ' \t\n hello \t\n ';
    const length: number = 25;
    const expected: string = ' \t\n hello \t\n  \t\n hello \t\n';
    const result: string = repeatUntilLength(str, length);
    expect(result).toBe(expected);
  });

  // Test case 12: Repeat a string with a large length
  it('12. should repeat a string with a large length', () => {
    const str: string = 'hello';
    const length: number = 1000;
    const expected: string = 'hello'.repeat(200).substring(0, 1000);
    const result: string = repeatUntilLength(str, length);
    expect(result).toBe(expected);
  });

  // Test case 13: Repeat a string with a length of one
  it('13. should return the first character of the string when the desired length is one', () => {
    const str: string = 'hello';
    const length: number = 1;
    const expected: string = 'h';
    const result: string = repeatUntilLength(str, length);
    expect(result).toBe(expected);
  });

  // Error handling test case 1: Repeat a string with a negative length
  it('13. should throw an error when repeating a string with a negative length', () => {
    const str: string = 'hello';
    const length: number = -1;
    expect(() => repeatUntilLength(str, length)).toThrow(
      'Length must be non-negative',
    );
  });

  // Error handling test case 2: Repeat a string with a non-numeric length
  it('13. should throw an error when repeating a string with a non-numeric length', () => {
    const str: string = 'hello';
    expect(() => repeatUntilLength(str, 'a' as unknown as number)).toThrow(
      'Length must be a number',
    );
  });
});
