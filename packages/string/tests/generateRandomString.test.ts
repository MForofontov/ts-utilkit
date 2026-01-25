import { generateRandomString } from '../src/generateRandomString';

/**
 * Unit tests for the generateRandomString function.
 */
describe('generateRandomString', () => {
  // Test case 1: Generate a random string of a given length from a specified charset
  it('1. should generate a random string of a given length from a specified charset', () => {
    const length: number = 10;
    const charset: string =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const result: string = generateRandomString(length, charset);
    expect(result).toHaveLength(length);
    expect(result).toMatch(new RegExp(`^[${charset}]+$`));
  });

  // Test case 2: Generate a random string and verify it throws error for length 0
  it('2. should throw an error when length is 0', () => {
    const length: number = 0;
    const charset: string =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    expect(() => generateRandomString(length, charset)).toThrow(Error);
    expect(() => generateRandomString(length, charset)).toThrow(
      'length must be a positive integer',
    );
  });

  // Test case 3: Generate a random string of length 1
  it('3. should generate a random string of length 1', () => {
    const length: number = 1;
    const charset: string =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const result: string = generateRandomString(length, charset);
    expect(result).toHaveLength(length);
    expect(result).toMatch(new RegExp(`^[${charset}]$`));
  });

  // Test case 4: Generate a random string of a large length
  it('4. should generate a random string of a large length', () => {
    const length: number = 1000;
    const charset: string =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const result: string = generateRandomString(length, charset);
    expect(result).toHaveLength(length);
    expect(result).toMatch(new RegExp(`^[${charset}]+$`));
  });

  // Test case 5: Generate a string of repeated characters when charset has a single character
  it('5. should generate a string of repeated characters when charset has a single character', () => {
    const length: number = 10;
    const charset: string = 'A';
    const expected: string = 'A'.repeat(length);
    const result: string = generateRandomString(length, charset);
    expect(result).toBe(expected);
  });

  // Test case 6: Generate a random string with special characters in charset
  it('6. should generate a random string with special characters in charset', () => {
    const length: number = 10;
    const charset: string = '!@#$%^&*()';
    const result: string = generateRandomString(length, charset);
    expect(result).toHaveLength(length);
    expect(result).toMatch(
      new RegExp(`^[${charset.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}]+$`),
    );
  });

  // Test case 7: Generate a random string with numeric characters in charset
  it('7. should generate a random string with numeric characters in charset', () => {
    const length: number = 10;
    const charset: string = '0123456789';
    const result: string = generateRandomString(length, charset);
    expect(result).toHaveLength(length);
    expect(result).toMatch(new RegExp(`^[${charset}]+$`));
  });

  // Test case 8: Generate a random string with non-numeric length
  it('8. should throw an error when length is non-numeric', () => {
    const charset: string =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    expect(() =>
      generateRandomString('a' as unknown as number, charset),
    ).toThrow(TypeError);
    expect(() =>
      generateRandomString('a' as unknown as number, charset),
    ).toThrow('length must be a number');
  });

  // Test case 9: Generate a random string with negative length
  it('9. should throw an error when length is negative', () => {
    const length: number = -1;
    const charset: string =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    expect(() => generateRandomString(length, charset)).toThrow(Error);
    expect(() => generateRandomString(length, charset)).toThrow(
      'length must be a positive integer',
    );
  });

  // Test case 10: Generate a random string with an empty charset
  it('10. should throw an error when charset is empty', () => {
    const length: number = 10;
    const charset: string = '';
    expect(() => generateRandomString(length, charset)).toThrow(Error);
    expect(() => generateRandomString(length, charset)).toThrow(
      'charset cannot be empty',
    );
  });

  // Test case 11: Generate a random string with NaN length
  it('11. should throw an error when length is NaN', () => {
    const length: number = NaN;
    const charset: string =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    expect(() => generateRandomString(length, charset)).toThrow(Error);
    expect(() => generateRandomString(length, charset)).toThrow(
      'length must be a valid number, not NaN',
    );
  });

  // Test case 12: Generate a random string with floating point length
  it('12. should throw an error when length is a floating point number', () => {
    const length: number = 10.5;
    const charset: string =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    expect(() => generateRandomString(length, charset)).toThrow(Error);
    expect(() => generateRandomString(length, charset)).toThrow(
      'length must be a positive integer',
    );
  });

  // Test case 13: Ensure randomness - generated strings should not all be the same
  it('13. should generate different random strings on multiple calls', () => {
    const length: number = 20;
    const charset: string =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const results = new Set();
    for (let i = 0; i < 100; i++) {
      results.add(generateRandomString(length, charset));
    }
    // With 20-character strings from 62-character charset, getting 100 unique values is highly likely
    expect(results.size).toBeGreaterThan(95);
  });

  // Test case 14: Generate with non-string charset (should throw TypeError)
  it('14. should throw TypeError when charset is not a string', () => {
    const length: number = 10;
    const charset = 123 as unknown as string;
    expect(() => generateRandomString(length, charset)).toThrow(TypeError);
    expect(() => generateRandomString(length, charset)).toThrow(
      'charset must be a string',
    );
  });

  // Test case 15: Generate with default charset (alphanumeric)
  it('15. should generate a random string with default alphanumeric charset', () => {
    const length: number = 20;
    const result: string = generateRandomString(length);
    expect(result).toHaveLength(length);
    expect(result).toMatch(/^[A-Za-z0-9]+$/);
  });
});
