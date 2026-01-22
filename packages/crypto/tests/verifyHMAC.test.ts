import { generateHMAC } from '../src/generateHMAC';
import { verifyHMAC } from '../src/verifyHMAC';

/**
 * Unit tests for the verifyHMAC function.
 */
describe('verifyHMAC', () => {
  const testKey = 'secret-key';
  const testData = 'message to authenticate';

  // Test case 1: Verify valid HMAC with SHA-256
  it('1. should return true for valid HMAC with SHA-256', () => {
    const hmac = generateHMAC(testData, testKey, 'sha256');
    const result = verifyHMAC(testData, testKey, hmac, 'sha256');
    expect(result).toBe(true);
  });

  // Test case 2: Verify valid HMAC with SHA-512
  it('2. should return true for valid HMAC with SHA-512', () => {
    const hmac = generateHMAC(testData, testKey, 'sha512');
    const result = verifyHMAC(testData, testKey, hmac, 'sha512');
    expect(result).toBe(true);
  });

  // Test case 3: Return false for invalid HMAC
  it('3. should return false for invalid HMAC', () => {
    const invalidHmac =
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
    const result = verifyHMAC(testData, testKey, invalidHmac, 'sha256');
    expect(result).toBe(false);
  });

  // Test case 4: Return false for wrong key
  it('4. should return false when key is wrong', () => {
    const hmac = generateHMAC(testData, 'key1', 'sha256');
    const result = verifyHMAC(testData, 'key2', hmac, 'sha256');
    expect(result).toBe(false);
  });

  // Test case 5: Return false for wrong data
  it('5. should return false when data is different', () => {
    const hmac = generateHMAC('data1', testKey, 'sha256');
    const result = verifyHMAC('data2', testKey, hmac, 'sha256');
    expect(result).toBe(false);
  });

  // Test case 6: Verify HMAC with empty string
  it('6. should verify HMAC for empty string', () => {
    const hmac = generateHMAC('', testKey, 'sha256');
    const result = verifyHMAC('', testKey, hmac, 'sha256');
    expect(result).toBe(true);
  });

  // Test case 7: Verify HMAC with Buffer data
  it('7. should verify HMAC with Buffer data', () => {
    const bufferData = Buffer.from(testData);
    const hmac = generateHMAC(bufferData, testKey, 'sha256');
    const result = verifyHMAC(bufferData, testKey, hmac, 'sha256');
    expect(result).toBe(true);
  });

  // Test case 8: Verify with long data
  it('8. should verify HMAC for long data', () => {
    const longData = 'A'.repeat(10000);
    const hmac = generateHMAC(longData, testKey, 'sha256');
    const result = verifyHMAC(longData, testKey, hmac, 'sha256');
    expect(result).toBe(true);
  });

  // Test case 9: Throw error for wrong HMAC length
  it('9. should throw error for wrong HMAC length', () => {
    const shortHmac = 'tooshort';
    expect(() => verifyHMAC(testData, testKey, shortHmac, 'sha256')).toThrow(
      Error,
    );
    expect(() => verifyHMAC(testData, testKey, shortHmac, 'sha256')).toThrow(
      'hmac length for',
    );
  });

  // Error test cases (always at the end)

  // Test case 10: Throw error for null data
  it('10. should throw TypeError when data is null', () => {
    const hmac = generateHMAC(testData, testKey, 'sha256');
    expect(() =>
      verifyHMAC(null as unknown as string, testKey, hmac, 'sha256'),
    ).toThrow(TypeError);
    expect(() =>
      verifyHMAC(null as unknown as string, testKey, hmac, 'sha256'),
    ).toThrow('data must be a string or Buffer');
  });

  // Test case 11: Throw error for null secret
  it('11. should throw TypeError when secret is null', () => {
    const hmac = generateHMAC(testData, testKey, 'sha256');
    expect(() =>
      verifyHMAC(testData, null as unknown as string, hmac, 'sha256'),
    ).toThrow(TypeError);
    expect(() =>
      verifyHMAC(testData, null as unknown as string, hmac, 'sha256'),
    ).toThrow('secret must be a string');
  });

  // Test case 12: Throw error for null hmac
  it('12. should throw TypeError when hmac is null', () => {
    expect(() =>
      verifyHMAC(testData, testKey, null as unknown as string, 'sha256'),
    ).toThrow(TypeError);
    expect(() =>
      verifyHMAC(testData, testKey, null as unknown as string, 'sha256'),
    ).toThrow('hmac must be a string');
  });

  // Test case 13: Throw error for algorithm type
  it('13. should throw TypeError when algorithm is not a string', () => {
    const hmac = generateHMAC(testData, testKey, 'sha256');
    expect(() =>
      verifyHMAC(testData, testKey, hmac, 123 as unknown as 'sha256'),
    ).toThrow(TypeError);
    expect(() =>
      verifyHMAC(testData, testKey, hmac, 123 as unknown as 'sha256'),
    ).toThrow('algorithm must be a string');
  });

  // Test case 14: Throw error for empty secret
  it('14. should throw Error when secret is empty', () => {
    const hmac = generateHMAC(testData, testKey, 'sha256');
    expect(() => verifyHMAC(testData, '', hmac, 'sha256')).toThrow(Error);
    expect(() => verifyHMAC(testData, '', hmac, 'sha256')).toThrow(
      'secret cannot be empty',
    );
  });

  // Test case 15: Throw error for empty hmac
  it('15. should throw Error when hmac is empty', () => {
    expect(() => verifyHMAC(testData, testKey, '', 'sha256')).toThrow(Error);
    expect(() => verifyHMAC(testData, testKey, '', 'sha256')).toThrow(
      'hmac cannot be empty',
    );
  });

  // Test case 16: Throw error for invalid algorithm
  it('16. should throw Error for unsupported algorithm', () => {
    const hmac = '0'.repeat(64);
    const invalidAlgorithm = 'md5';

    expect(() =>
      verifyHMAC(
        testData,
        testKey,
        hmac,
        invalidAlgorithm as unknown as 'sha256',
      ),
    ).toThrow(Error);

    expect(() =>
      verifyHMAC(
        testData,
        testKey,
        hmac,
        invalidAlgorithm as unknown as 'sha256',
      ),
    ).toThrow('algorithm must be one of');
  });

  // Test case 17: Throw error for non-hex hmac
  it('17. should throw Error when hmac contains non-hexadecimal characters', () => {
    const invalidHmac =
      'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz';
    expect(() => verifyHMAC(testData, testKey, invalidHmac, 'sha256')).toThrow(
      Error,
    );
    expect(() => verifyHMAC(testData, testKey, invalidHmac, 'sha256')).toThrow(
      'hmac must contain only hexadecimal characters',
    );
  });
});
