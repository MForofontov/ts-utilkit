import { hashSHA256 } from '../src/hashSHA256';

/**
 * Unit tests for the hashSHA256 function.
 */
describe('hashSHA256', () => {
  // Test case 1: Hash a simple string
  it('1. should generate correct SHA-256 hash for a simple string', () => {
    const data = 'hello world';
    const result = hashSHA256(data);
    expect(result).toBe(
      'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9',
    );
    expect(result).toHaveLength(64); // SHA-256 produces 64 hex characters
  });

  // Test case 2: Hash an empty string
  it('2. should generate correct SHA-256 hash for an empty string', () => {
    const data = '';
    const result = hashSHA256(data);
    expect(result).toBe(
      'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    );
  });

  // Test case 3: Hash a Buffer
  it('3. should generate correct SHA-256 hash for a Buffer', () => {
    const data = Buffer.from('hello world');
    const result = hashSHA256(data);
    expect(result).toBe(
      'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9',
    );
  });

  // Test case 4: Hash long string (edge case for performance)
  it('4. should generate SHA-256 hash for a long string', () => {
    const data = 'a'.repeat(10000);
    const result = hashSHA256(data);
    expect(result).toHaveLength(64);
    expect(result).toMatch(/^[a-f0-9]{64}$/);
  });

  // Test case 5: Same input produces same hash (consistency)
  it('5. should produce the same hash for the same input', () => {
    const data = 'test data';
    const result1 = hashSHA256(data);
    const result2 = hashSHA256(data);
    expect(result1).toBe(result2);
  });

  // Test case 6: Different inputs produce different hashes (uniqueness)
  it('6. should produce different hashes for different inputs', () => {
    const result1 = hashSHA256('data1');
    const result2 = hashSHA256('data2');
    expect(result1).not.toBe(result2);
  });

  // Test case 7: Hash empty Buffer (edge case)
  it('7. should generate SHA-256 hash for empty Buffer', () => {
    const data = Buffer.from('');
    const result = hashSHA256(data);
    expect(result).toBe(
      'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    );
  });

  // Test case 8: Throw error for null
  it('8. should throw TypeError when data is null', () => {
    expect(() => hashSHA256(null as unknown as string)).toThrow(TypeError);
    expect(() => hashSHA256(null as unknown as string)).toThrow(
      'data must be a string or Buffer',
    );
  });

  // Test case 9: Throw error for undefined
  it('9. should throw TypeError when data is undefined', () => {
    expect(() => hashSHA256(undefined as unknown as string)).toThrow(TypeError);
    expect(() => hashSHA256(undefined as unknown as string)).toThrow(
      'data must be a string or Buffer',
    );
  });

  // Test case 10: Throw error for number
  it('10. should throw TypeError when data is a number', () => {
    expect(() => hashSHA256(123 as unknown as string)).toThrow(TypeError);
    expect(() => hashSHA256(123 as unknown as string)).toThrow(
      'data must be a string or Buffer',
    );
  });

  // Test case 11: Throw error for object
  it('11. should throw TypeError when data is an object', () => {
    expect(() => hashSHA256({} as unknown as string)).toThrow(TypeError);
    expect(() => hashSHA256({} as unknown as string)).toThrow(
      'data must be a string or Buffer',
    );
  });

  // Test case 12: Throw error for array
  it('12. should throw TypeError when data is an array', () => {
    expect(() => hashSHA256([] as unknown as string)).toThrow(TypeError);
    expect(() => hashSHA256([] as unknown as string)).toThrow(
      'data must be a string or Buffer',
    );
  });
});
