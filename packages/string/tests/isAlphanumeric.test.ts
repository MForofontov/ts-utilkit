import { isAlphanumeric } from '../src/isAlphanumeric';

/**
 * Unit tests for the isAlphanumeric function.
 */
describe('isAlphanumeric', () => {
  // Test case 1: Check if a string with only alphanumeric characters returns true
  it('1. should return true for a string with only alphanumeric characters', () => {
    const str: string = 'Hello123';
    const expected: boolean = true;
    const result: boolean = isAlphanumeric(str);
    expect(result).toBe(expected);
  });

  // Test case 2: Check if a string with spaces returns false
  it('2. should return false for a string with spaces', () => {
    const str: string = 'Hello 123';
    const expected: boolean = false;
    const result: boolean = isAlphanumeric(str);
    expect(result).toBe(expected);
  });

  // Test case 3: Check if a string with special characters returns false
  it('3. should return false for a string with special characters', () => {
    const str: string = 'Hello@123';
    const expected: boolean = false;
    const result: boolean = isAlphanumeric(str);
    expect(result).toBe(expected);
  });

  // Test case 4: Check if an empty string returns false
  it('4. should return false for an empty string', () => {
    const str: string = '';
    const expected: boolean = false;
    const result: boolean = isAlphanumeric(str);
    expect(result).toBe(expected);
  });

  // Test case 5: Check if a string with only alphabetic characters returns true
  it('5. should return true for a string with only alphabetic characters', () => {
    const str: string = 'HelloWorld';
    const expected: boolean = true;
    const result: boolean = isAlphanumeric(str);
    expect(result).toBe(expected);
  });

  // Test case 6: Check if a string with only numeric characters returns true
  it('6. should return true for a string with only numeric characters', () => {
    const str: string = '1234567890';
    const expected: boolean = true;
    const result: boolean = isAlphanumeric(str);
    expect(result).toBe(expected);
  });

  // Test case 7: Check if a string with mixed case alphanumeric characters returns true
  it('7. should return true for a string with mixed case alphanumeric characters', () => {
    const str: string = 'HelloWorld123';
    const expected: boolean = true;
    const result: boolean = isAlphanumeric(str);
    expect(result).toBe(expected);
  });

  // Test case 8: Check if a string with leading spaces returns false
  it('8. should return false for a string with leading spaces', () => {
    const str: string = '   Hello123';
    const expected: boolean = false;
    const result: boolean = isAlphanumeric(str);
    expect(result).toBe(expected);
  });

  // Test case 9: Check if a string with trailing spaces returns false
  it('9. should return false for a string with trailing spaces', () => {
    const str: string = 'Hello123   ';
    const expected: boolean = false;
    const result: boolean = isAlphanumeric(str);
    expect(result).toBe(expected);
  });

  // Test case 10: Check if a string with both leading and trailing spaces returns false
  it('10. should return false for a string with both leading and trailing spaces', () => {
    const str: string = '   Hello123   ';
    const expected: boolean = false;
    const result: boolean = isAlphanumeric(str);
    expect(result).toBe(expected);
  });

  // Test case 11: Check if a string with alphanumeric characters and punctuation returns false
  it('11. should return false for a string with alphanumeric characters and punctuation', () => {
    const str: string = 'Hello123!';
    const expected: boolean = false;
    const result: boolean = isAlphanumeric(str);
    expect(result).toBe(expected);
  });

  // Test case 12: Check if a string with alphanumeric characters and newline characters returns false
  it('12. should return false for a string with alphanumeric characters and newline characters', () => {
    const str: string = 'Hello123\n';
    const expected: boolean = false;
    const result: boolean = isAlphanumeric(str);
    expect(result).toBe(expected);
  });

  // Test case 13: Check if a string with alphanumeric characters and tab characters returns false
  it('13. should return false for a string with alphanumeric characters and tab characters', () => {
    const str: string = 'Hello123\t';
    const expected: boolean = false;
    const result: boolean = isAlphanumeric(str);
    expect(result).toBe(expected);
  });

  // Test case 14: Check if a string with alphanumeric characters and mixed whitespace returns false
  it('14. should return false for a string with alphanumeric characters and mixed whitespace', () => {
    const str: string = 'Hello123 \t\n';
    const expected: boolean = false;
    const result: boolean = isAlphanumeric(str);
    expect(result).toBe(expected);
  });

  // Test case 15: Check if a string with only uppercase alphanumeric characters returns true
  it('15. should return true for a string with only uppercase alphanumeric characters', () => {
    const str: string = 'HELLO123';
    const expected: boolean = true;
    const result: boolean = isAlphanumeric(str);
    expect(result).toBe(expected);
  });
});
