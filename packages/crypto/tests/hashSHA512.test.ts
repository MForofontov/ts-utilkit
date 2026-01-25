import { hashSHA512 } from '../src/hashSHA512';

/**
 * Unit tests for the hashSHA512 function.
 */
describe('hashSHA512', () => {
  // Test case 1: Hash a simple string with known value
  it('1. should generate correct SHA-512 hash for a simple string', () => {
    const data = 'hello world';
    const result = hashSHA512(data);
    expect(result).toBe(
      '309ecc489c12d6eb4cc40f50c902f2b4d0ed77ee511a7c7a9bcd3ca86d4cd86f989dd35bc5ff499670da34255b45b0cfd830e81f605dcf7dc5542e93ae9cd76f',
    );
    expect(result).toHaveLength(128); // SHA-512 produces 128 hex characters
  });

  // Test case 2: Hash an empty string (edge case)
  it('2. should generate correct SHA-512 hash for an empty string', () => {
    const data = '';
    const result = hashSHA512(data);
    expect(result).toBe(
      'cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e',
    );
  });

  // Test case 3: Hash a Buffer
  it('3. should generate correct SHA-512 hash for a Buffer', () => {
    const data = Buffer.from('hello world');
    const result = hashSHA512(data);
    expect(result).toBe(
      '309ecc489c12d6eb4cc40f50c902f2b4d0ed77ee511a7c7a9bcd3ca86d4cd86f989dd35bc5ff499670da34255b45b0cfd830e81f605dcf7dc5542e93ae9cd76f',
    );
  });

  // Test case 4: Hash long string (performance edge case)
  it('4. should generate SHA-512 hash for a long string', () => {
    const data = 'a'.repeat(10000);
    const result = hashSHA512(data);
    expect(result).toHaveLength(128);
    expect(result).toMatch(/^[a-f0-9]{128}$/);
  });

  // Test case 5: Same input produces same hash (consistency)
  it('5. should produce the same hash for the same input', () => {
    const data = 'test data';
    const result1 = hashSHA512(data);
    const result2 = hashSHA512(data);
    expect(result1).toBe(result2);
  });

  // Test case 6: Different inputs produce different hashes (uniqueness)
  it('6. should produce different hashes for different inputs', () => {
    const result1 = hashSHA512('data1');
    const result2 = hashSHA512('data2');
    expect(result1).not.toBe(result2);
  });

  // Test case 7: Hash empty Buffer (edge case)
  it('7. should generate SHA-512 hash for empty Buffer', () => {
    const data = Buffer.from('');
    const result = hashSHA512(data);
    expect(result).toBe(
      'cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e',
    );
  });

  // Test case 8: Throw error for null
  it('8. should throw TypeError when data is null', () => {
    expect(() => hashSHA512(null as unknown as string)).toThrow(TypeError);
    expect(() => hashSHA512(null as unknown as string)).toThrow(
      'data must be a string or Buffer',
    );
  });

  // Test case 9: Throw error for undefined
  it('9. should throw TypeError when data is undefined', () => {
    expect(() => hashSHA512(undefined as unknown as string)).toThrow(TypeError);
    expect(() => hashSHA512(undefined as unknown as string)).toThrow(
      'data must be a string or Buffer',
    );
  });

  // Test case 10: Throw error for number
  it('10. should throw TypeError when data is a number', () => {
    expect(() => hashSHA512(123 as unknown as string)).toThrow(TypeError);
    expect(() => hashSHA512(123 as unknown as string)).toThrow(
      'data must be a string or Buffer',
    );
  });

  // Test case 11: Throw error for object
  it('11. should throw TypeError when data is an object', () => {
    expect(() => hashSHA512({} as unknown as string)).toThrow(TypeError);
    expect(() => hashSHA512({} as unknown as string)).toThrow(
      'data must be a string or Buffer',
    );
  });

  // Test case 12: Throw error for array
  it('12. should throw TypeError when data is an array', () => {
    expect(() => hashSHA512([] as unknown as string)).toThrow(TypeError);
    expect(() => hashSHA512([] as unknown as string)).toThrow(
      'data must be a string or Buffer',
    );
  });
});
