import { decryptAES256 } from '../src/decryptAES256';
import { encryptAES256 } from '../src/encryptAES256';

/**
 * Unit tests for the encryptAES256 function.
 */
describe('encryptAES256', () => {
  const testPassword = 'test-password-123';
  const testData = 'Hello, World!';

  // Test case 1: Encrypt simple string
  it('1. should encrypt a simple string', () => {
    const result = encryptAES256(testData, testPassword);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  // Test case 2: Encrypted data should not match original
  it('2. should produce encrypted data different from original', () => {
    const result = encryptAES256(testData, testPassword);
    expect(result).not.toContain(testData);
  });

  // Test case 3: Encrypt single character
  it('3. should encrypt single character', () => {
    const result = encryptAES256('a', testPassword);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  // Test case 4: Same input produces different encrypted output (due to random IV)
  it('4. should produce different ciphertext with random IV', () => {
    const result1 = encryptAES256(testData, testPassword);
    const result2 = encryptAES256(testData, testPassword);
    expect(result1).not.toBe(result2);
  });

  // Test case 5: Encrypt long string
  it('5. should encrypt long string', () => {
    const longData = 'A'.repeat(10000);
    const result = encryptAES256(longData, testPassword);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  // Test case 6: Encrypt with different password produces different output
  it('6. should produce different output with different passwords', () => {
    const result1 = encryptAES256(testData, 'password1');
    const result2 = encryptAES256(testData, 'password2');
    expect(result1).not.toBe(result2);
  });

  // Test case 7: Encrypted data contains salt, IV, auth tag, and ciphertext
  it('7. should produce formatted output with salt:iv:authTag:ciphertext', () => {
    const result = encryptAES256(testData, testPassword);
    const parts = result.split(':');
    expect(parts.length).toBe(4);
    expect(parts[0].length).toBeGreaterThan(0); // salt
    expect(parts[1].length).toBeGreaterThan(0); // IV
    expect(parts[2].length).toBeGreaterThan(0); // auth tag
    expect(parts[3].length).toBeGreaterThan(0); // ciphertext
  });

  // Test case 8: Encrypted data is base64 encoded
  it('8. should produce base64-encoded output', () => {
    const result = encryptAES256(testData, testPassword);
    const parts = result.split(':');
    parts.forEach((part) => {
      // Base64 pattern: alphanumeric, +, /, and = for padding
      expect(part).toMatch(/^[A-Za-z0-9+/]+=*$/);
    });
  });

  // Test case 9: Can decrypt encrypted data (roundtrip test)
  it('9. should be decryptable with correct password', () => {
    const encrypted = encryptAES256(testData, testPassword);
    const decrypted = decryptAES256(encrypted, testPassword);
    expect(decrypted).toBe(testData);
  });

  // Test case 10: Each encryption uses a unique salt
  it('10. should use a unique salt per encryption', () => {
    const result1 = encryptAES256(testData, testPassword);
    const result2 = encryptAES256(testData, testPassword);
    expect(result1.split(':')[0]).not.toBe(result2.split(':')[0]);
  });

  // Test case 14: Throw error for empty data
  it('14. should throw Error when data is empty', () => {
    expect(() => encryptAES256('', testPassword)).toThrow(Error);
    expect(() => encryptAES256('', testPassword)).toThrow(
      'data cannot be empty',
    );
  });

  // Test case 15: Throw error for empty key
  it('15. should throw Error when key is empty', () => {
    expect(() => encryptAES256(testData, '')).toThrow(Error);
    expect(() => encryptAES256(testData, '')).toThrow('key cannot be empty');
  });
});
