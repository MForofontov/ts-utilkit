import { hasUppercase } from '../src/hasUppercase';

/**
 * Unit tests for the hasUppercase function.
 */
describe('hasUppercase', () => {
  // Test case 1: Check if a string with mixed case contains uppercase letters
  it('1. should return true for a string with mixed case', () => {
    const str: string = 'Hello';
    const expected: boolean = true;
    const result: boolean = hasUppercase(str);
    expect(result).toBe(expected);
  });

  // Test case 2: Check if a string with all uppercase letters contains uppercase letters
  it('2. should return true for a string with all uppercase letters', () => {
    const str: string = 'HELLO';
    const expected: boolean = true;
    const result: boolean = hasUppercase(str);
    expect(result).toBe(expected);
  });

  // Test case 3: Check if a string with all lowercase letters contains uppercase letters
  it('3. should return false for a string with all lowercase letters', () => {
    const str: string = 'hello';
    const expected: boolean = false;
    const result: boolean = hasUppercase(str);
    expect(result).toBe(expected);
  });

  // Test case 4: Check if an empty string contains uppercase letters
  it('4. should return false for an empty string', () => {
    const str: string = '';
    const expected: boolean = false;
    const result: boolean = hasUppercase(str);
    expect(result).toBe(expected);
  });

  // Test case 5: Check if a string with numbers contains uppercase letters
  it('5. should return false for a string with numbers', () => {
    const str: string = '12345';
    const expected: boolean = false;
    const result: boolean = hasUppercase(str);
    expect(result).toBe(expected);
  });

  // Test case 6: Check if a string with special characters contains uppercase letters
  it('6. should return false for a string with special characters', () => {
    const str: string = '@#$%^&*';
    const expected: boolean = false;
    const result: boolean = hasUppercase(str);
    expect(result).toBe(expected);
  });

  // Test case 7: Check if a string with mixed case and numbers contains uppercase letters
  it('7. should return true for a string with mixed case and numbers', () => {
    const str: string = 'Hello123';
    const expected: boolean = true;
    const result: boolean = hasUppercase(str);
    expect(result).toBe(expected);
  });

  // Test case 8: Check if a string with mixed case and special characters contains uppercase letters
  it('8. should return true for a string with mixed case and special characters', () => {
    const str: string = 'Hello@123';
    const expected: boolean = true;
    const result: boolean = hasUppercase(str);
    expect(result).toBe(expected);
  });

  // Test case 9: Check if a string with only one uppercase letter contains uppercase letters
  it('9. should return true for a string with only one uppercase letter', () => {
    const str: string = 'H';
    const expected: boolean = true;
    const result: boolean = hasUppercase(str);
    expect(result).toBe(expected);
  });

  // Test case 10: Check if a string with leading spaces contains uppercase letters
  it('10. should return true for a string with leading spaces', () => {
    const str: string = '   Hello';
    const expected: boolean = true;
    const result: boolean = hasUppercase(str);
    expect(result).toBe(expected);
  });

  // Test case 11: Check if a string with trailing spaces contains uppercase letters
  it('11. should return true for a string with trailing spaces', () => {
    const str: string = 'Hello   ';
    const expected: boolean = true;
    const result: boolean = hasUppercase(str);
    expect(result).toBe(expected);
  });

  // Test case 12: Check if a string with both leading and trailing spaces contains uppercase letters
  it('12. should return true for a string with both leading and trailing spaces', () => {
    const str: string = '   Hello   ';
    const expected: boolean = true;
    const result: boolean = hasUppercase(str);
    expect(result).toBe(expected);
  });

  // Test case 13: Check if a string with mixed case and spaces contains uppercase letters
  it('13. should return true for a string with mixed case and spaces', () => {
    const str: string = '   HeLLo   ';
    const expected: boolean = true;
    const result: boolean = hasUppercase(str);
    expect(result).toBe(expected);
  });
});
