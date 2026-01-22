import { hashMD5 } from '../src/hashMD5';

/**
 * Unit tests for the hashMD5 function.
 */
describe('hashMD5', () => {
  // Test case 1: Hash a simple string with known value
  it('1. should generate correct MD5 hash for a simple string', () => {
    const data = 'hello world';
    const result = hashMD5(data);
    expect(result).toBe('5eb63bbbe01eeed093cb22bb8f5acdc3');
    expect(result).toHaveLength(32); // MD5 produces 32 hex characters
  });

  // Test case 2: Hash an empty string (edge case)
  it('2. should generate correct MD5 hash for an empty string', () => {
    const data = '';
    const result = hashMD5(data);
    expect(result).toBe('d41d8cd98f00b204e9800998ecf8427e');
  });

  // Test case 3: Hash a Buffer
  it('3. should generate correct MD5 hash for a Buffer', () => {
    const data = Buffer.from('hello world');
    const result = hashMD5(data);
    expect(result).toBe('5eb63bbbe01eeed093cb22bb8f5acdc3');
  });

  // Test case 4: Hash long string (performance edge case)
  it('4. should generate MD5 hash for a long string', () => {
    const data = 'a'.repeat(10000);
    const result = hashMD5(data);
    expect(result).toHaveLength(32);
    expect(result).toMatch(/^[a-f0-9]{32}$/);
  });

  // Test case 5: Same input produces same hash (consistency)
  it('5. should produce the same hash for the same input', () => {
    const data = 'test data';
    const result1 = hashMD5(data);
    const result2 = hashMD5(data);
    expect(result1).toBe(result2);
  });

  // Test case 6: Different inputs produce different hashes (uniqueness)
  it('6. should produce different hashes for different inputs', () => {
    const result1 = hashMD5('data1');
    const result2 = hashMD5('data2');
    expect(result1).not.toBe(result2);
  });

  // Test case 7: Hash empty Buffer (edge case)
  it('7. should generate MD5 hash for empty Buffer', () => {
    const data = Buffer.from('');
    const result = hashMD5(data);
    expect(result).toBe('d41d8cd98f00b204e9800998ecf8427e');
  });

  // Test case 8: Throw error for null
  it('8. should throw TypeError when data is null', () => {
    expect(() => hashMD5(null as unknown as string)).toThrow(TypeError);
    expect(() => hashMD5(null as unknown as string)).toThrow(
      'data must be a string or Buffer',
    );
  });

  // Test case 9: Throw error for undefined
  it('9. should throw TypeError when data is undefined', () => {
    expect(() => hashMD5(undefined as unknown as string)).toThrow(TypeError);
    expect(() => hashMD5(undefined as unknown as string)).toThrow(
      'data must be a string or Buffer',
    );
  });

  // Test case 10: Throw error for number
  it('10. should throw TypeError when data is a number', () => {
    expect(() => hashMD5(123 as unknown as string)).toThrow(TypeError);
    expect(() => hashMD5(123 as unknown as string)).toThrow(
      'data must be a string or Buffer',
    );
  });

  // Test case 11: Throw error for object
  it('11. should throw TypeError when data is an object', () => {
    expect(() => hashMD5({} as unknown as string)).toThrow(TypeError);
    expect(() => hashMD5({} as unknown as string)).toThrow(
      'data must be a string or Buffer',
    );
  });

  // Test case 12: Throw error for array
  it('12. should throw TypeError when data is an array', () => {
    expect(() => hashMD5([] as unknown as string)).toThrow(TypeError);
    expect(() => hashMD5([] as unknown as string)).toThrow(
      'data must be a string or Buffer',
    );
  });
});
