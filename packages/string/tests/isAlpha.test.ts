import { isAlpha } from '../src/isAlpha';

/**
 * Unit tests for the isAlpha function.
 */
describe('isAlpha', () => {
  // Test case 1: Check if a string with only alphabetic characters returns true
  it('1. should return true for a string with only alphabetic characters', () => {
    const str: string = 'HelloWorld';
    const expected: boolean = true;
    const result: boolean = isAlpha(str);
    expect(result).toBe(expected);
  });

  // Test case 2: Check if a string with spaces returns false
  it('2. should return false for a string with spaces', () => {
    const str: string = 'Hello World';
    const expected: boolean = false;
    const result: boolean = isAlpha(str);
    expect(result).toBe(expected);
  });

  // Test case 3: Check if a string with numbers returns false
  it('3. should return false for a string with numbers', () => {
    const str: string = 'Hello123';
    const expected: boolean = false;
    const result: boolean = isAlpha(str);
    expect(result).toBe(expected);
  });

  // Test case 4: Check if a string with special characters returns false
  it('4. should return false for a string with special characters', () => {
    const str: string = 'Hello@World';
    const expected: boolean = false;
    const result: boolean = isAlpha(str);
    expect(result).toBe(expected);
  });

  // Test case 5: Check if an empty string returns false
  it('5. should return false for an empty string', () => {
    const str: string = '';
    const expected: boolean = false;
    const result: boolean = isAlpha(str);
    expect(result).toBe(expected);
  });

  // Test case 6: Check if a string with mixed case alphabetic characters returns true
  it('6. should return true for a string with mixed case alphabetic characters', () => {
    const str: string = 'HelloWorld';
    const expected: boolean = true;
    const result: boolean = isAlpha(str);
    expect(result).toBe(expected);
  });

  // Test case 7: Check if a string with only uppercase alphabetic characters returns true
  it('7. should return true for a string with only uppercase alphabetic characters', () => {
    const str: string = 'HELLOWORLD';
    const expected: boolean = true;
    const result: boolean = isAlpha(str);
    expect(result).toBe(expected);
  });

  // Test case 8: Check if a string with only lowercase alphabetic characters returns true
  it('8. should return true for a string with only lowercase alphabetic characters', () => {
    const str: string = 'helloworld';
    const expected: boolean = true;
    const result: boolean = isAlpha(str);
    expect(result).toBe(expected);
  });

  // Test case 9: Check if a string with leading spaces returns false
  it('9. should return false for a string with leading spaces', () => {
    const str: string = '   HelloWorld';
    const expected: boolean = false;
    const result: boolean = isAlpha(str);
    expect(result).toBe(expected);
  });

  // Test case 10: Check if a string with trailing spaces returns false
  it('10. should return false for a string with trailing spaces', () => {
    const str: string = 'HelloWorld   ';
    const expected: boolean = false;
    const result: boolean = isAlpha(str);
    expect(result).toBe(expected);
  });

  // Test case 11: Check if a string with both leading and trailing spaces returns false
  it('11. should return false for a string with both leading and trailing spaces', () => {
    const str: string = '   HelloWorld   ';
    const expected: boolean = false;
    const result: boolean = isAlpha(str);
    expect(result).toBe(expected);
  });

  // Test case 12: Check if a string with alphabetic characters and punctuation returns false
  it('12. should return false for a string with alphabetic characters and punctuation', () => {
    const str: string = 'Hello,World!';
    const expected: boolean = false;
    const result: boolean = isAlpha(str);
    expect(result).toBe(expected);
  });

  // Test case 13: Check if a string with alphabetic characters and newline characters returns false
  it('13. should return false for a string with alphabetic characters and newline characters', () => {
    const str: string = 'Hello\nWorld';
    const expected: boolean = false;
    const result: boolean = isAlpha(str);
    expect(result).toBe(expected);
  });

  // Test case 14: Check if a string with alphabetic characters and tab characters returns false
  it('14. should return false for a string with alphabetic characters and tab characters', () => {
    const str: string = 'Hello\tWorld';
    const expected: boolean = false;
    const result: boolean = isAlpha(str);
    expect(result).toBe(expected);
  });

  // Test case 15: Check if a string with alphabetic characters and mixed whitespace returns false
  it('15. should return false for a string with alphabetic characters and mixed whitespace', () => {
    const str: string = 'Hello \t\nWorld';
    const expected: boolean = false;
    const result: boolean = isAlpha(str);
    expect(result).toBe(expected);
  });
});
