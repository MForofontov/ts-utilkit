import { isNumeric } from '../src/isNumeric';

/**
 * Unit tests for the isNumeric function.
 */
describe('isNumeric', () => {
  // Test case 1: Check if a string with only numeric characters returns true
  it('1. should return true for a string with only numeric characters', () => {
    const str: string = '12345';
    const expected: boolean = true;
    const result: boolean = isNumeric(str);
    expect(result).toBe(expected);
  });

  // Test case 2: Check if a string with alphabetic characters returns false
  it('2. should return false for a string with alphabetic characters', () => {
    const str: string = '123a45';
    const expected: boolean = false;
    const result: boolean = isNumeric(str);
    expect(result).toBe(expected);
  });

  // Test case 3: Check if a string with special characters returns false
  it('3. should return false for a string with special characters', () => {
    const str: string = '123@45';
    const expected: boolean = false;
    const result: boolean = isNumeric(str);
    expect(result).toBe(expected);
  });

  // Test case 4: Check if an empty string returns false
  it('4. should return false for an empty string', () => {
    const str: string = '';
    const expected: boolean = false;
    const result: boolean = isNumeric(str);
    expect(result).toBe(expected);
  });

  // Test case 5: Check if a string with mixed characters returns false
  it('5. should return false for a string with mixed characters', () => {
    const str: string = '123a@45';
    const expected: boolean = false;
    const result: boolean = isNumeric(str);
    expect(result).toBe(expected);
  });

  // Test case 6: Check if a string with leading spaces returns false
  it('6. should return false for a string with leading spaces', () => {
    const str: string = '   12345';
    const expected: boolean = false;
    const result: boolean = isNumeric(str);
    expect(result).toBe(expected);
  });

  // Test case 7: Check if a string with trailing spaces returns false
  it('7. should return false for a string with trailing spaces', () => {
    const str: string = '12345   ';
    const expected: boolean = false;
    const result: boolean = isNumeric(str);
    expect(result).toBe(expected);
  });

  // Test case 8: Check if a string with both leading and trailing spaces returns false
  it('8. should return false for a string with both leading and trailing spaces', () => {
    const str: string = '   12345   ';
    const expected: boolean = false;
    const result: boolean = isNumeric(str);
    expect(result).toBe(expected);
  });

  // Test case 9: Check if a string with numeric characters and punctuation returns false
  it('9. should return false for a string with numeric characters and punctuation', () => {
    const str: string = '12345!';
    const expected: boolean = false;
    const result: boolean = isNumeric(str);
    expect(result).toBe(expected);
  });

  // Test case 10: Check if a string with numeric characters and newline characters returns false
  it('10. should return false for a string with numeric characters and newline characters', () => {
    const str: string = '12345\n';
    const expected: boolean = false;
    const result: boolean = isNumeric(str);
    expect(result).toBe(expected);
  });

  // Test case 11: Check if a string with numeric characters and tab characters returns false
  it('11. should return false for a string with numeric characters and tab characters', () => {
    const str: string = '12345\t';
    const expected: boolean = false;
    const result: boolean = isNumeric(str);
    expect(result).toBe(expected);
  });

  // Test case 12: Check if a string with numeric characters and mixed whitespace returns false
  it('12. should return false for a string with numeric characters and mixed whitespace', () => {
    const str: string = '12345 \t\n';
    const expected: boolean = false;
    const result: boolean = isNumeric(str);
    expect(result).toBe(expected);
  });

  // Test case 13: Check if a string with only numeric characters and leading zeros returns true
  it('13. should return true for a string with only numeric characters and leading zeros', () => {
    const str: string = '0012345';
    const expected: boolean = true;
    const result: boolean = isNumeric(str);
    expect(result).toBe(expected);
  });

  // Test case 14: Check if a string with only numeric characters and trailing zeros returns true
  it('14. should return true for a string with only numeric characters and trailing zeros', () => {
    const str: string = '1234500';
    const expected: boolean = true;
    const result: boolean = isNumeric(str);
    expect(result).toBe(expected);
  });

  // Test case 15: Check if a string with only numeric characters and mixed zeros returns true
  it('15. should return true for a string with only numeric characters and mixed zeros', () => {
    const str: string = '001234500';
    const expected: boolean = true;
    const result: boolean = isNumeric(str);
    expect(result).toBe(expected);
  });
});
