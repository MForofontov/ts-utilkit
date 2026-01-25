import { decryptAES256 } from '../src/decryptAES256';
import { encryptAES256 } from '../src/encryptAES256';

/**
 * Unit tests for the decryptAES256 function.
 */
describe('decryptAES256', () => {
  const testPassword = 'test-password-123';
  const testData = 'Hello, World!';

  // Test case 1: Decrypt simple string (roundtrip test)
  it('1. should decrypt a simple encrypted string', () => {
    const encrypted = encryptAES256(testData, testPassword);
    const decrypted = decryptAES256(encrypted, testPassword);
    expect(decrypted).toBe(testData);
  });

  // Test case 2: Decrypt single character
  it('2. should decrypt single character', () => {
    const singleChar = 'a';
    const encrypted = encryptAES256(singleChar, testPassword);
    const decrypted = decryptAES256(encrypted, testPassword);
    expect(decrypted).toBe(singleChar);
  });

  // Test case 3: Decrypt long string (performance)
  it('3. should decrypt long string', () => {
    const longData = 'A'.repeat(10000);
    const encrypted = encryptAES256(longData, testPassword);
    const decrypted = decryptAES256(encrypted, testPassword);
    expect(decrypted).toBe(longData);
  });

  // Test case 4: Wrong password fails decryption (security)
  it('4. should throw error with wrong password', () => {
    const encrypted = encryptAES256(testData, 'password1');
    expect(() => decryptAES256(encrypted, 'password2')).toThrow();
  });

  // Test case 5: Tampered IV fails decryption (security)
  it('5. should throw error when IV is tampered', () => {
    const encrypted = encryptAES256(testData, testPassword);
    const parts = encrypted.split(':');
    const tampered =
      'aaaa' + parts[0].slice(4) + ':' + parts[1] + ':' + parts[2];
    expect(() => decryptAES256(tampered, testPassword)).toThrow();
  });

  // Test case 6: Tampered ciphertext fails decryption (security)
  it('6. should throw error when ciphertext is tampered', () => {
    const encrypted = encryptAES256(testData, testPassword);
    const parts = encrypted.split(':');
    const tampered =
      parts[0] + ':' + 'bbbb' + parts[1].slice(4) + ':' + parts[2];
    expect(() => decryptAES256(tampered, testPassword)).toThrow();
  });

  // Test case 7: Tampered auth tag fails decryption (security)
  it('7. should throw error when auth tag is tampered', () => {
    const encrypted = encryptAES256(testData, testPassword);
    const parts = encrypted.split(':');
    const tampered =
      parts[0] + ':' + parts[1] + ':' + 'cccc' + parts[2].slice(4);
    expect(() => decryptAES256(tampered, testPassword)).toThrow();
  });

  // Test case 8: Invalid format fails decryption
  it('8. should throw error for invalid encrypted format', () => {
    expect(() => decryptAES256('invalid:format', testPassword)).toThrow();
    expect(() => decryptAES256('only-one-part', testPassword)).toThrow();
  });

  // Test case 9: Throw error for null encrypted data
  it('9. should throw TypeError when encrypted is null', () => {
    expect(() =>
      decryptAES256(null as unknown as string, testPassword),
    ).toThrow(TypeError);
    expect(() =>
      decryptAES256(null as unknown as string, testPassword),
    ).toThrow('encrypted must be a string');
  });

  // Test case 10: Throw error for undefined encrypted data
  it('10. should throw TypeError when encrypted is undefined', () => {
    expect(() =>
      decryptAES256(undefined as unknown as string, testPassword),
    ).toThrow(TypeError);
    expect(() =>
      decryptAES256(undefined as unknown as string, testPassword),
    ).toThrow('encrypted must be a string');
  });

  // Test case 11: Throw error for null key
  it('11. should throw TypeError when key is null', () => {
    const encrypted = encryptAES256(testData, testPassword);
    expect(() => decryptAES256(encrypted, null as unknown as string)).toThrow(
      TypeError,
    );
    expect(() => decryptAES256(encrypted, null as unknown as string)).toThrow(
      'key must be a string',
    );
  });

  // Test case 12: Throw error for undefined key
  it('12. should throw TypeError when key is undefined', () => {
    const encrypted = encryptAES256(testData, testPassword);
    expect(() =>
      decryptAES256(encrypted, undefined as unknown as string),
    ).toThrow(TypeError);
    expect(() =>
      decryptAES256(encrypted, undefined as unknown as string),
    ).toThrow('key must be a string');
  });

  // Test case 13: Throw error for empty key
  it('13. should throw Error when key is empty', () => {
    const encrypted = encryptAES256(testData, testPassword);
    expect(() => decryptAES256(encrypted, '')).toThrow(Error);
    expect(() => decryptAES256(encrypted, '')).toThrow('key cannot be empty');
  });

  // Test case 14: Throw error for empty encrypted string
  it('14. should throw Error when encrypted is empty', () => {
    expect(() => decryptAES256('', testPassword)).toThrow(Error);
    expect(() => decryptAES256('', testPassword)).toThrow(
      'encrypted cannot be empty',
    );
  });

  // Test case 15: Throw error for invalid IV length
  it('15. should throw Error when IV length is invalid', () => {
    // Create encrypted data with incorrect IV length (too short)
    const shortIV = Buffer.from('short', 'utf8').toString('base64');
    const validAuthTag = Buffer.alloc(16).toString('base64');
    const validCiphertext = Buffer.from('test', 'utf8').toString('base64');
    const invalidEncrypted = `${shortIV}:${validAuthTag}:${validCiphertext}`;

    expect(() => decryptAES256(invalidEncrypted, testPassword)).toThrow(Error);
    expect(() => decryptAES256(invalidEncrypted, testPassword)).toThrow(
      'invalid IV length',
    );
  });

  // Test case 16: Throw error for invalid auth tag length
  it('16. should throw Error when auth tag length is invalid', () => {
    // Create encrypted data with incorrect auth tag length
    const validIV = Buffer.alloc(16).toString('base64');
    const shortAuthTag = Buffer.from('short', 'utf8').toString('base64');
    const validCiphertext = Buffer.from('test', 'utf8').toString('base64');
    const invalidEncrypted = `${validIV}:${shortAuthTag}:${validCiphertext}`;

    expect(() => decryptAES256(invalidEncrypted, testPassword)).toThrow(Error);
    expect(() => decryptAES256(invalidEncrypted, testPassword)).toThrow(
      'invalid authentication tag length',
    );
  });
});
