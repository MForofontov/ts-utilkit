import { generateRandomBytes } from '../src/generateRandomBytes';

/**
 * Unit tests for the generateRandomBytes function.
 */
describe('generateRandomBytes', () => {
  // Test case 1: Generate bytes with specified length
  it('1. should generate Buffer with specified length', () => {
    const result = generateRandomBytes(16);
    expect(Buffer.isBuffer(result)).toBe(true);
    expect(result.length).toBe(16);
  });

  // Test case 2: Generate bytes with custom length
  it('2. should generate Buffer with custom length', () => {
    const result = generateRandomBytes(32);
    expect(Buffer.isBuffer(result)).toBe(true);
    expect(result.length).toBe(32);
  });

  // Test case 3: Generate minimum length (1 byte)
  it('3. should generate Buffer with minimum length', () => {
    const result = generateRandomBytes(1);
    expect(Buffer.isBuffer(result)).toBe(true);
    expect(result.length).toBe(1);
  });

  // Test case 4: Generate large buffer
  it('4. should generate large Buffer', () => {
    const result = generateRandomBytes(1024);
    expect(Buffer.isBuffer(result)).toBe(true);
    expect(result.length).toBe(1024);
  });

  // Test case 5: Each buffer is unique (randomness)
  it('5. should generate unique random bytes', () => {
    const buffer1 = generateRandomBytes(16);
    const buffer2 = generateRandomBytes(16);
    expect(buffer1.equals(buffer2)).toBe(false);
  });

  // Test case 6: Distribution test (not all zeros or all same value)
  it('6. should have proper random distribution', () => {
    const buffer = generateRandomBytes(100);
    const uniqueBytes = new Set(buffer);
    expect(uniqueBytes.size).toBeGreaterThan(10); // Should have variety
  });

  // Test case 7: Throw error for zero length
  it('7. should throw Error when length is zero', () => {
    expect(() => generateRandomBytes(0)).toThrow(Error);
    expect(() => generateRandomBytes(0)).toThrow(
      'length must be a positive integer',
    );
  });

  // Test case 8: Throw error for negative length
  it('8. should throw Error when length is negative', () => {
    expect(() => generateRandomBytes(-1)).toThrow(Error);
    expect(() => generateRandomBytes(-1)).toThrow(
      'length must be a positive integer',
    );
  });

  // Test case 9: Throw error for null
  it('9. should throw TypeError when length is null', () => {
    expect(() => generateRandomBytes(null as unknown as number)).toThrow(
      TypeError,
    );
    expect(() => generateRandomBytes(null as unknown as number)).toThrow(
      'length must be a number',
    );
  });

  // Test case 10: Throw error for string
  it('10. should throw TypeError when length is a string', () => {
    expect(() => generateRandomBytes('16' as unknown as number)).toThrow(
      TypeError,
    );
    expect(() => generateRandomBytes('16' as unknown as number)).toThrow(
      'length must be a number',
    );
  });

  // Test case 11: Throw error for NaN
  it('11. should throw Error when length is NaN', () => {
    expect(() => generateRandomBytes(NaN)).toThrow(Error);
    expect(() => generateRandomBytes(NaN)).toThrow(
      'length must be a valid number',
    );
  });

  // Test case 12: Throw error for object
  it('12. should throw TypeError when length is an object', () => {
    expect(() => generateRandomBytes({} as unknown as number)).toThrow(
      TypeError,
    );
    expect(() => generateRandomBytes({} as unknown as number)).toThrow(
      'length must be a number',
    );
  });
});
