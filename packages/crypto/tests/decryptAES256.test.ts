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

  // Test case 5: Tampered salt fails decryption (security)
  it('5. should throw error when salt is tampered', () => {
    const encrypted = encryptAES256(testData, testPassword);
    const parts = encrypted.split(':');
    const tampered =
      'aaaa' +
      parts[0].slice(4) +
      ':' +
      parts[1] +
      ':' +
      parts[2] +
      ':' +
      parts[3];
    expect(() => decryptAES256(tampered, testPassword)).toThrow();
  });

  // Test case 6: Tampered IV fails decryption (security)
  it('6. should throw error when IV is tampered', () => {
    const encrypted = encryptAES256(testData, testPassword);
    const parts = encrypted.split(':');
    const tampered =
      parts[0] +
      ':' +
      'aaaa' +
      parts[1].slice(4) +
      ':' +
      parts[2] +
      ':' +
      parts[3];
    expect(() => decryptAES256(tampered, testPassword)).toThrow();
  });

  // Test case 7: Tampered ciphertext fails decryption (security)
  it('7. should throw error when ciphertext is tampered', () => {
    const encrypted = encryptAES256(testData, testPassword);
    const parts = encrypted.split(':');
    const tampered =
      parts[0] +
      ':' +
      parts[1] +
      ':' +
      parts[2] +
      ':' +
      'bbbb' +
      parts[3].slice(4);
    expect(() => decryptAES256(tampered, testPassword)).toThrow();
  });

  // Test case 8: Tampered auth tag fails decryption (security)
  it('8. should throw error when auth tag is tampered', () => {
    const encrypted = encryptAES256(testData, testPassword);
    const parts = encrypted.split(':');
    const tampered =
      parts[0] +
      ':' +
      parts[1] +
      ':' +
      'cccc' +
      parts[2].slice(4) +
      ':' +
      parts[3];
    expect(() => decryptAES256(tampered, testPassword)).toThrow();
  });

  // Test case 9: Invalid format fails decryption
  it('9. should throw error for invalid encrypted format', () => {
    expect(() => decryptAES256('invalid:format', testPassword)).toThrow();
    expect(() => decryptAES256('only-one-part', testPassword)).toThrow();
  });

  // Test case 10: Legacy 3-part format is rejected
  it('10. should reject legacy 3-part iv:authTag:ciphertext format', () => {
    const legacy =
      Buffer.alloc(16).toString('base64') +
      ':' +
      Buffer.alloc(16).toString('base64') +
      ':' +
      Buffer.from('test').toString('base64');
    expect(() => decryptAES256(legacy, testPassword)).toThrow(
      /legacy 3-part format/,
    );
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

  // Test case 15: Throw error for invalid salt length
  it('15. should throw Error when salt length is invalid', () => {
    const shortSalt = Buffer.from('short', 'utf8').toString('base64');
    const validIV = Buffer.alloc(16).toString('base64');
    const validAuthTag = Buffer.alloc(16).toString('base64');
    const validCiphertext = Buffer.from('test', 'utf8').toString('base64');
    const invalidEncrypted = `${shortSalt}:${validIV}:${validAuthTag}:${validCiphertext}`;

    expect(() => decryptAES256(invalidEncrypted, testPassword)).toThrow(Error);
    expect(() => decryptAES256(invalidEncrypted, testPassword)).toThrow(
      'invalid salt length',
    );
  });

  // Test case 16: Throw error for invalid IV length
  it('16. should throw Error when IV length is invalid', () => {
    const validSalt = Buffer.alloc(16).toString('base64');
    const shortIV = Buffer.from('short', 'utf8').toString('base64');
    const validAuthTag = Buffer.alloc(16).toString('base64');
    const validCiphertext = Buffer.from('test', 'utf8').toString('base64');
    const invalidEncrypted = `${validSalt}:${shortIV}:${validAuthTag}:${validCiphertext}`;

    expect(() => decryptAES256(invalidEncrypted, testPassword)).toThrow(Error);
    expect(() => decryptAES256(invalidEncrypted, testPassword)).toThrow(
      'invalid IV length',
    );
  });

  // Test case 17: Throw error for invalid auth tag length
  it('17. should throw Error when auth tag length is invalid', () => {
    const validSalt = Buffer.alloc(16).toString('base64');
    const validIV = Buffer.alloc(16).toString('base64');
    const shortAuthTag = Buffer.from('short', 'utf8').toString('base64');
    const validCiphertext = Buffer.from('test', 'utf8').toString('base64');
    const invalidEncrypted = `${validSalt}:${validIV}:${shortAuthTag}:${validCiphertext}`;

    expect(() => decryptAES256(invalidEncrypted, testPassword)).toThrow(Error);
    expect(() => decryptAES256(invalidEncrypted, testPassword)).toThrow(
      'invalid authentication tag length',
    );
  });
});
