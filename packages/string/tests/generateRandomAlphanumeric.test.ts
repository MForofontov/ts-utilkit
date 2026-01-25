import { generateRandomAlphanumeric } from '../src/generateRandomAlphanumeric';

/**
 * Unit tests for the generateRandomAlphanumeric function.
 */
describe('generateRandomAlphanumeric', () => {
  // Test case 1: Generate a random alphanumeric string of a given length
  it('1. should generate a random alphanumeric string of a given length', () => {
    const length: number = 10;
    const result: string = generateRandomAlphanumeric(length);
    expect(result).toHaveLength(length);
    expect(result).toMatch(/^[A-Za-z0-9]+$/);
  });

  // Test case 2: Generate a random alphanumeric string of length 0
  it('2. should generate an empty string when length is 0', () => {
    const length: number = 0;
    const expected: string = '';
    const result: string = generateRandomAlphanumeric(length);
    expect(result).toBe(expected);
  });

  // Test case 3: Generate a random alphanumeric string of length 1
  it('3. should generate a random alphanumeric string of length 1', () => {
    const length: number = 1;
    const result: string = generateRandomAlphanumeric(length);
    expect(result).toHaveLength(length);
    expect(result).toMatch(/^[A-Za-z0-9]$/);
  });

  // Test case 4: Generate a random alphanumeric string of a large length
  it('4. should generate a random alphanumeric string of a large length', () => {
    const length: number = 1000;
    const result: string = generateRandomAlphanumeric(length);
    expect(result).toHaveLength(length);
    expect(result).toMatch(/^[A-Za-z0-9]+$/);
  });

  // Test case 5: Generate a random alphanumeric string with non-numeric length
  it('5. should throw an error when length is non-numeric', () => {
    expect(() => generateRandomAlphanumeric('a' as unknown as number)).toThrow(
      'Length must be a non-negative number',
    );
  });

  // Test case 6: Generate a random alphanumeric string with negative length
  it('6. should throw an error when length is negative', () => {
    const length: number = -1;
    expect(() => generateRandomAlphanumeric(length)).toThrow(
      'Length must be a non-negative number',
    );
  });
});
