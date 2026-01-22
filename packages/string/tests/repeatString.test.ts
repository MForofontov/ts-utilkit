import { repeatString } from '../src/repeatString';

/**
 * Unit tests for the repeatString function.
 */
describe('repeatString', () => {
  // Test case 1: Repeat a string a specified number of times
  it('1. should repeat a string a specified number of times', () => {
    const str: string = 'hello';
    const count: number = 3;
    const expected: string = 'hellohellohello';
    const result: string = repeatString(str, count);
    expect(result).toBe(expected);
  });

  // Test case 2: Repeat a string zero times
  it('2. should return an empty string when repeating a string zero times', () => {
    const str: string = 'hello';
    const count: number = 0;
    const expected: string = '';
    const result: string = repeatString(str, count);
    expect(result).toBe(expected);
  });

  // Test case 3: Repeat a string one time
  it('3. should return the original string when repeating a string one time', () => {
    const str: string = 'hello';
    const count: number = 1;
    const expected: string = 'hello';
    const result: string = repeatString(str, count);
    expect(result).toBe(expected);
  });

  // Test case 4: Repeat an empty string a specified number of times
  it('4. should return an empty string when repeating an empty string a specified number of times', () => {
    const str: string = '';
    const count: number = 5;
    const expected: string = '';
    const result: string = repeatString(str, count);
    expect(result).toBe(expected);
  });

  // Test case 5: Repeat a string with special characters a specified number of times
  it('5. should repeat a string with special characters a specified number of times', () => {
    const str: string = '@hello@';
    const count: number = 3;
    const expected: string = '@hello@@hello@@hello@';
    const result: string = repeatString(str, count);
    expect(result).toBe(expected);
  });

  // Test case 6: Repeat a string with numbers a specified number of times
  it('6. should repeat a string with numbers a specified number of times', () => {
    const str: string = '123';
    const count: number = 4;
    const expected: string = '123123123123';
    const result: string = repeatString(str, count);
    expect(result).toBe(expected);
  });

  // Test case 7: Repeat a string with mixed characters a specified number of times
  it('7. should repeat a string with mixed characters a specified number of times', () => {
    const str: string = 'a1@b2#';
    const count: number = 2;
    const expected: string = 'a1@b2#a1@b2#';
    const result: string = repeatString(str, count);
    expect(result).toBe(expected);
  });

  // Test case 8: Repeat a string with leading spaces a specified number of times
  it('8. should repeat a string with leading spaces a specified number of times', () => {
    const str: string = '  hello';
    const count: number = 3;
    const expected: string = '  hello  hello  hello';
    const result: string = repeatString(str, count);
    expect(result).toBe(expected);
  });

  // Test case 9: Repeat a string with trailing spaces a specified number of times
  it('9. should repeat a string with trailing spaces a specified number of times', () => {
    const str: string = 'hello  ';
    const count: number = 2;
    const expected: string = 'hello  hello  ';
    const result: string = repeatString(str, count);
    expect(result).toBe(expected);
  });

  // Test case 10: Repeat a string with both leading and trailing spaces a specified number of times
  it('10. should repeat a string with both leading and trailing spaces a specified number of times', () => {
    const str: string = '  hello  ';
    const count: number = 2;
    const expected: string = '  hello    hello  ';
    const result: string = repeatString(str, count);
    expect(result).toBe(expected);
  });

  // Test case 11: Repeat a string with mixed whitespace characters a specified number of times
  it('11. should repeat a string with mixed whitespace characters a specified number of times', () => {
    const str: string = ' \t\n hello \t\n ';
    const count: number = 2;
    const expected: string = ' \t\n hello \t\n  \t\n hello \t\n ';
    const result: string = repeatString(str, count);
    expect(result).toBe(expected);
  });

  // Test case 12: Repeat a string with a large count
  it('12. should repeat a string with a large count', () => {
    const str: string = 'hello';
    const count: number = 1000;
    const expected: string = 'hello'.repeat(count);
    const result: string = repeatString(str, count);
    expect(result).toBe(expected);
  });

  // Test case 13: Repeat a string with a count of one
  it('13. should return the original string when repeating a string with a count of one', () => {
    const str: string = 'hello';
    const count: number = 1;
    const expected: string = 'hello';
    const result: string = repeatString(str, count);
    expect(result).toBe(expected);
  });

  // Error handling test case 1: Repeat a string with a negative count
  it('13. should throw an error when repeating a string with a negative count', () => {
    const str: string = 'hello';
    const count: number = -1;
    expect(() => repeatString(str, count)).toThrow(
      'Count must be non-negative',
    );
  });

  // Error handling test case 2: Repeat a string with a non-numeric count
  it('13. should throw an error when repeating a string with a non-numeric count', () => {
    const str: string = 'hello';
    expect(() => repeatString(str, 'a' as unknown as number)).toThrow(
      'Count must be a number',
    );
  });
});
