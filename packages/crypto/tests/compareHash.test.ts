import { compareHash } from '../src/compareHash';
import { hashSHA256 } from '../src/hashSHA256';

/**
 * Unit tests for the compareHash function.
 */
describe('compareHash', () => {
  // Test case 1: Compare matching SHA-256 hashes
  it('1. should return true for matching SHA-256 hashes', () => {
    const data = 'hello world';
    const hash =
      'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9';
    const result = compareHash(data, hash, 'sha256');
    expect(result).toBe(true);
  });

  // Test case 2: Compare non-matching SHA-256 hashes
  it('2. should return false for non-matching SHA-256 hashes', () => {
    const data = 'hello world';
    const hash =
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'; // Wrong hash with correct length
    const result = compareHash(data, hash, 'sha256');
    expect(result).toBe(false);
  });

  // Test case 3: Compare matching SHA-512 hashes
  it('3. should return true for matching SHA-512 hashes', () => {
    const data = 'hello world';
    const hash =
      '309ecc489c12d6eb4cc40f50c902f2b4d0ed77ee511a7c7a9bcd3ca86d4cd86f989dd35bc5ff499670da34255b45b0cfd830e81f605dcf7dc5542e93ae9cd76f';
    const result = compareHash(data, hash, 'sha512');
    expect(result).toBe(true);
  });

  // Test case 4: Compare non-matching SHA-512 hashes
  it('4. should return false for non-matching SHA-512 hashes', () => {
    const data = 'hello world';
    const hash =
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'; // 128 chars
    const result = compareHash(data, hash, 'sha512');
    expect(result).toBe(false);
  });

  // Test case 5: Compare matching MD5 hashes
  it('5. should return true for matching MD5 hashes', () => {
    const data = 'hello world';
    const hash = '5eb63bbbe01eeed093cb22bb8f5acdc3';
    const result = compareHash(data, hash, 'md5');
    expect(result).toBe(true);
  });

  // Test case 6: Compare non-matching MD5 hashes
  it('6. should return false for non-matching MD5 hashes', () => {
    const data = 'hello world';
    const hash = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'; // Wrong hash with correct length
    const result = compareHash(data, hash, 'md5');
    expect(result).toBe(false);
  });

  // Test case 7: Compare with Buffer input
  it('7. should compare hash correctly with Buffer input', () => {
    const data = Buffer.from('hello world');
    const hash =
      'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9';
    const result = compareHash(data, hash, 'sha256');
    expect(result).toBe(true);
  });

  // Test case 8: Compare empty string
  it('8. should compare hash correctly for empty string', () => {
    const data = '';
    const hash =
      'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
    const result = compareHash(data, hash, 'sha256');
    expect(result).toBe(true);
  });

  // Test case 9: Wrong hash length for algorithm
  it('9. should throw error for wrong hash length', () => {
    const data = 'hello world';
    const hash = 'tooshort';
    expect(() => compareHash(data, hash, 'sha256')).toThrow(Error);
    expect(() => compareHash(data, hash, 'sha256')).toThrow(
      'hash length for sha256',
    );
  });

  // Test case 10: Compare with long data string
  it('10. should compare hash correctly with long data string', () => {
    const data = 'a'.repeat(10000);
    const hash = hashSHA256(data);
    const result = compareHash(data, hash, 'sha256');
    expect(result).toBe(true);
  });

  // Error test cases (always at the end)

  // Test case 11: Throw error for null data
  it('11. should throw TypeError when data is null', () => {
    const hash = 'somehash';
    expect(() =>
      compareHash(null as unknown as string, hash, 'sha256'),
    ).toThrow(TypeError);
    expect(() =>
      compareHash(null as unknown as string, hash, 'sha256'),
    ).toThrow('data must be a string or Buffer');
  });

  // Test case 12: Throw error for null hash
  it('12. should throw TypeError when hash is null', () => {
    const data = 'test';
    expect(() =>
      compareHash(data, null as unknown as string, 'sha256'),
    ).toThrow(TypeError);
    expect(() =>
      compareHash(data, null as unknown as string, 'sha256'),
    ).toThrow('hash must be a string');
  });

  // Test case 13: Throw error for invalid algorithm type
  it('13. should throw TypeError when algorithm is not a string', () => {
    const data = 'test';
    const hash =
      'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9';
    expect(() => compareHash(data, hash, 123 as unknown as 'sha256')).toThrow(
      TypeError,
    );
    expect(() => compareHash(data, hash, 123 as unknown as 'sha256')).toThrow(
      'algorithm must be a string',
    );
  });

  // Test case 14: Throw error for unsupported algorithm
  it('14. should throw Error for unsupported algorithm', () => {
    const data = 'test';
    const hash = 'somehash';
    const invalidAlgorithm = 'invalid';
    expect(() =>
      compareHash(data, hash, invalidAlgorithm as unknown as 'sha256'),
    ).toThrow(Error);
    expect(() =>
      compareHash(data, hash, invalidAlgorithm as unknown as 'sha256'),
    ).toThrow('algorithm must be one of');
  });

  // Test case 15: Throw error for hash with non-hex characters
  it('15. should throw Error when hash contains non-hexadecimal characters', () => {
    const data = 'test';
    const hash =
      'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz'; // 64 chars but not hex
    expect(() => compareHash(data, hash, 'sha256')).toThrow(Error);
    expect(() => compareHash(data, hash, 'sha256')).toThrow(
      'hash must contain only hexadecimal characters',
    );
  });
});
