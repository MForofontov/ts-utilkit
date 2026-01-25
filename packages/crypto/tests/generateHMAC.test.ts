import { generateHMAC } from '../src/generateHMAC';

/**
 * Unit tests for the generateHMAC function.
 */
describe('generateHMAC', () => {
  const testKey = 'secret-key';
  const testData = 'message to authenticate';

  // Test case 1: Generate HMAC with SHA-256
  it('1. should generate HMAC with SHA-256', () => {
    const result = generateHMAC(testData, testKey, 'sha256');
    expect(typeof result).toBe('string');
    expect(result.length).toBe(64); // SHA-256 = 64 hex chars
  });

  // Test case 2: Generate HMAC with SHA-512
  it('2. should generate HMAC with SHA-512', () => {
    const result = generateHMAC(testData, testKey, 'sha512');
    expect(typeof result).toBe('string');
    expect(result.length).toBe(128); // SHA-512 = 128 hex chars
  });

  // Test case 3: Same input produces same HMAC (consistency)
  it('3. should produce same HMAC for same inputs', () => {
    const result1 = generateHMAC(testData, testKey, 'sha256');
    const result2 = generateHMAC(testData, testKey, 'sha256');
    expect(result1).toBe(result2);
  });

  // Test case 4: Different data produces different HMAC
  it('4. should produce different HMAC for different data', () => {
    const result1 = generateHMAC('data1', testKey, 'sha256');
    const result2 = generateHMAC('data2', testKey, 'sha256');
    expect(result1).not.toBe(result2);
  });

  // Test case 5: Different keys produce different HMAC
  it('5. should produce different HMAC for different keys', () => {
    const result1 = generateHMAC(testData, 'key1', 'sha256');
    const result2 = generateHMAC(testData, 'key2', 'sha256');
    expect(result1).not.toBe(result2);
  });

  // Test case 6: Generate HMAC for empty string
  it('6. should generate HMAC for empty string', () => {
    const result = generateHMAC('', testKey, 'sha256');
    expect(typeof result).toBe('string');
    expect(result.length).toBe(64);
  });

  // Test case 7: Generate HMAC with Buffer data
  it('7. should generate HMAC with Buffer data', () => {
    const bufferData = Buffer.from(testData);
    const result = generateHMAC(bufferData, testKey, 'sha256');
    expect(typeof result).toBe('string');
    expect(result.length).toBe(64);
  });

  // Test case 8: HMAC with long data
  it('8. should generate HMAC for long data', () => {
    const longData = 'A'.repeat(10000);
    const result = generateHMAC(longData, testKey, 'sha256');
    expect(typeof result).toBe('string');
    expect(result.length).toBe(64);
  });

  // Test case 9: Known HMAC test vector (SHA-256)
  it('9. should generate correct HMAC for known test vector', () => {
    const data = 'The quick brown fox jumps over the lazy dog';
    const key = 'key';
    const result = generateHMAC(data, key, 'sha256');
    expect(result).toBe(
      'f7bc83f430538424b13298e6aa6fb143ef4d59a14946175997479dbc2d1a3cd8',
    );
  });

  // Error test cases (always at the end)

  // Test case 10: Throw error for null data
  it('10. should throw TypeError when data is null', () => {
    expect(() =>
      generateHMAC(null as unknown as string, testKey, 'sha256'),
    ).toThrow(TypeError);
    expect(() =>
      generateHMAC(null as unknown as string, testKey, 'sha256'),
    ).toThrow('data must be a string or Buffer');
  });

  // Test case 11: Throw error for null secret
  it('11. should throw TypeError when secret is null', () => {
    expect(() =>
      generateHMAC(testData, null as unknown as string, 'sha256'),
    ).toThrow(TypeError);
    expect(() =>
      generateHMAC(testData, null as unknown as string, 'sha256'),
    ).toThrow('secret must be a string');
  });

  // Test case 12: Throw error for algorithm type
  it('12. should throw TypeError when algorithm is not a string', () => {
    expect(() =>
      generateHMAC(testData, testKey, 123 as unknown as 'sha256'),
    ).toThrow(TypeError);
    expect(() =>
      generateHMAC(testData, testKey, 123 as unknown as 'sha256'),
    ).toThrow('algorithm must be a string');
  });

  // Test case 13: Throw error for empty secret
  it('13. should throw Error when secret is empty', () => {
    expect(() => generateHMAC(testData, '', 'sha256')).toThrow(Error);
    expect(() => generateHMAC(testData, '', 'sha256')).toThrow(
      'secret cannot be empty',
    );
  });

  // Test case 14: Throw error for invalid algorithm value
  it('14. should throw Error for unsupported algorithm', () => {
    const invalidAlgorithm = 'md5';

    expect(() =>
      generateHMAC(testData, testKey, invalidAlgorithm as unknown as 'sha256'),
    ).toThrow(Error);

    expect(() =>
      generateHMAC(testData, testKey, invalidAlgorithm as unknown as 'sha256'),
    ).toThrow('algorithm must be one of');
  });
});
