import { hasLowercase } from '../src/hasLowercase';

/**
 * Unit tests for the hasLowercase function.
 */
describe('hasLowercase', () => {
  // Test case 1: Check if a string with mixed case contains lowercase letters
  it('1. should return true for a string with mixed case', () => {
    const str: string = 'Hello';
    const expected: boolean = true;
    const result: boolean = hasLowercase(str);
    expect(result).toBe(expected);
  });

  // Test case 2: Check if a string with all uppercase letters contains lowercase letters
  it('2. should return false for a string with all uppercase letters', () => {
    const str: string = 'HELLO';
    const expected: boolean = false;
    const result: boolean = hasLowercase(str);
    expect(result).toBe(expected);
  });

  // Test case 3: Check if a string with all lowercase letters contains lowercase letters
  it('3. should return true for a string with all lowercase letters', () => {
    const str: string = 'hello';
    const expected: boolean = true;
    const result: boolean = hasLowercase(str);
    expect(result).toBe(expected);
  });

  // Test case 4: Check if an empty string contains lowercase letters
  it('4. should return false for an empty string', () => {
    const str: string = '';
    const expected: boolean = false;
    const result: boolean = hasLowercase(str);
    expect(result).toBe(expected);
  });

  // Test case 5: Check if a string with numbers contains lowercase letters
  it('5. should return false for a string with numbers', () => {
    const str: string = '12345';
    const expected: boolean = false;
    const result: boolean = hasLowercase(str);
    expect(result).toBe(expected);
  });

  // Test case 6: Check if a string with special characters contains lowercase letters
  it('6. should return false for a string with special characters', () => {
    const str: string = '@#$%^&*';
    const expected: boolean = false;
    const result: boolean = hasLowercase(str);
    expect(result).toBe(expected);
  });

  // Test case 7: Check if a string with mixed case and numbers contains lowercase letters
  it('7. should return true for a string with mixed case and numbers', () => {
    const str: string = 'Hello123';
    const expected: boolean = true;
    const result: boolean = hasLowercase(str);
    expect(result).toBe(expected);
  });

  // Test case 8: Check if a string with mixed case and special characters contains lowercase letters
  it('8. should return true for a string with mixed case and special characters', () => {
    const str: string = 'Hello@123';
    const expected: boolean = true;
    const result: boolean = hasLowercase(str);
    expect(result).toBe(expected);
  });

  // Test case 9: Check if a string with only one lowercase letter contains lowercase letters
  it('9. should return true for a string with only one lowercase letter', () => {
    const str: string = 'h';
    const expected: boolean = true;
    const result: boolean = hasLowercase(str);
    expect(result).toBe(expected);
  });

  // Test case 10: Check if a string with leading spaces contains lowercase letters
  it('10. should return true for a string with leading spaces', () => {
    const str: string = '   hello';
    const expected: boolean = true;
    const result: boolean = hasLowercase(str);
    expect(result).toBe(expected);
  });

  // Test case 11: Check if a string with trailing spaces contains lowercase letters
  it('11. should return true for a string with trailing spaces', () => {
    const str: string = 'hello   ';
    const expected: boolean = true;
    const result: boolean = hasLowercase(str);
    expect(result).toBe(expected);
  });

  // Test case 12: Check if a string with both leading and trailing spaces contains lowercase letters
  it('12. should return true for a string with both leading and trailing spaces', () => {
    const str: string = '   hello   ';
    const expected: boolean = true;
    const result: boolean = hasLowercase(str);
    expect(result).toBe(expected);
  });

  // Test case 13: Check if a string with mixed case and spaces contains lowercase letters
  it('13. should return true for a string with mixed case and spaces', () => {
    const str: string = '   HeLLo   ';
    const expected: boolean = true;
    const result: boolean = hasLowercase(str);
    expect(result).toBe(expected);
  });
});
