import { generateSalt } from '../src/generateSalt';

/**
 * Unit tests for the generateSalt function.
 */
describe('generateSalt', () => {
  // Test case 1: Generate salt with default length
  it('1. should generate salt with default length (32 bytes = 64 hex chars)', () => {
    const result = generateSalt();
    expect(typeof result).toBe('string');
    expect(result).toHaveLength(64); // 32 bytes = 64 hex characters
    expect(result).toMatch(/^[a-f0-9]{64}$/);
  });

  // Test case 2: Generate salt with custom length
  it('2. should generate salt with custom length', () => {
    const result = generateSalt(16);
    expect(result).toHaveLength(32); // 16 bytes = 32 hex characters
    expect(result).toMatch(/^[a-f0-9]{32}$/);
  });

  // Test case 3: Generate salt with minimum length (1 byte)
  it('3. should generate salt with minimum length', () => {
    const result = generateSalt(1);
    expect(result).toHaveLength(2); // 1 byte = 2 hex characters
    expect(result).toMatch(/^[a-f0-9]{2}$/);
  });

  // Test case 4: Generate salt with large length
  it('4. should generate salt with large length', () => {
    const result = generateSalt(128);
    expect(result).toHaveLength(256); // 128 bytes = 256 hex characters
    expect(result).toMatch(/^[a-f0-9]{256}$/);
  });

  // Test case 5: Each salt is unique (randomness)
  it('5. should generate unique salts', () => {
    const salt1 = generateSalt();
    const salt2 = generateSalt();
    expect(salt1).not.toBe(salt2);
  });

  // Test case 6: Multiple salts are all unique
  it('6. should generate multiple unique salts', () => {
    const salts = new Set();
    for (let i = 0; i < 100; i++) {
      salts.add(generateSalt());
    }
    expect(salts.size).toBe(100); // All unique
  });

  // Test case 7: Throw error for zero length
  it('7. should throw Error when length is zero', () => {
    expect(() => generateSalt(0)).toThrow(Error);
    expect(() => generateSalt(0)).toThrow('length must be a positive integer');
  });

  // Test case 8: Throw error for negative length
  it('8. should throw Error when length is negative', () => {
    expect(() => generateSalt(-1)).toThrow(Error);
    expect(() => generateSalt(-1)).toThrow('length must be a positive integer');
  });

  // Test case 9: Throw error for null
  it('9. should throw TypeError when length is null', () => {
    expect(() => generateSalt(null as unknown as number)).toThrow(TypeError);
    expect(() => generateSalt(null as unknown as number)).toThrow(
      'length must be a number',
    );
  });

  // Test case 10: Throw error for string
  it('10. should throw TypeError when length is a string', () => {
    expect(() => generateSalt('16' as unknown as number)).toThrow(TypeError);
    expect(() => generateSalt('16' as unknown as number)).toThrow(
      'length must be a number',
    );
  });

  // Test case 11: Throw error for NaN
  it('11. should throw Error when length is NaN', () => {
    expect(() => generateSalt(NaN)).toThrow(Error);
    expect(() => generateSalt(NaN)).toThrow('length must be a valid number');
  });

  // Test case 12: Throw error for object
  it('12. should throw TypeError when length is an object', () => {
    expect(() => generateSalt({} as unknown as number)).toThrow(TypeError);
    expect(() => generateSalt({} as unknown as number)).toThrow(
      'length must be a number',
    );
  });
});
