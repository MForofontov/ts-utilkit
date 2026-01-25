import { hashPassword } from '../src/hashPassword';

/**
 * Unit tests for the hashPassword function.
 */
describe('hashPassword', () => {
  const testPassword = 'MySecurePassword123!';
  const testSalt = 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4';

  // Test case 1: Hash password with default iterations
  it('1. should hash password with default iterations', async () => {
    const result = await hashPassword(testPassword, testSalt);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  // Test case 2: Hash produces 128-character hex string
  it('2. should produce 128-character hex string', async () => {
    const result = await hashPassword(testPassword, testSalt);
    expect(result.length).toBe(128);
    expect(result).toMatch(/^[a-f0-9]+$/);
  });

  // Test case 3: Same inputs produce same hash (consistency)
  it('3. should produce same hash for same inputs', async () => {
    const result1 = await hashPassword(testPassword, testSalt);
    const result2 = await hashPassword(testPassword, testSalt);
    expect(result1).toBe(result2);
  });

  // Test case 4: Different passwords produce different hashes
  it('4. should produce different hashes for different passwords', async () => {
    const result1 = await hashPassword('password1', testSalt);
    const result2 = await hashPassword('password2', testSalt);
    expect(result1).not.toBe(result2);
  });

  // Test case 5: Different salts produce different hashes
  it('5. should produce different hashes for different salts', async () => {
    const salt1 = 'a'.repeat(32);
    const salt2 = 'b'.repeat(32);
    const result1 = await hashPassword(testPassword, salt1);
    const result2 = await hashPassword(testPassword, salt2);
    expect(result1).not.toBe(result2);
  });

  // Test case 6: Hash with custom iterations
  it('6. should hash password with custom iterations', async () => {
    const result = await hashPassword(testPassword, testSalt, 50000);
    expect(typeof result).toBe('string');
    expect(result.length).toBe(128);
  });

  // Test case 7: More iterations take more time
  it('7. should take longer with more iterations', async () => {
    const start1 = Date.now();
    await hashPassword(testPassword, testSalt, 10000);
    const time1 = Date.now() - start1;

    const start2 = Date.now();
    await hashPassword(testPassword, testSalt, 50000);
    const time2 = Date.now() - start2;

    expect(time2).toBeGreaterThan(time1);
  }, 30000);

  // Test case 8: Hash single character password
  it('8. should hash single character password', async () => {
    const result = await hashPassword('a', testSalt);
    expect(typeof result).toBe('string');
    expect(result.length).toBe(128);
  });

  // Test case 9: Hash long password
  it('9. should hash long password', async () => {
    const longPassword = 'A'.repeat(1000);
    const result = await hashPassword(longPassword, testSalt);
    expect(typeof result).toBe('string');
    expect(result.length).toBe(128);
  });

  // Error test cases (always at the end)

  // Test case 10: Throw error for null password
  it('10. should throw TypeError when password is null', async () => {
    await expect(
      hashPassword(null as unknown as string, testSalt),
    ).rejects.toThrow(TypeError);
    await expect(
      hashPassword(null as unknown as string, testSalt),
    ).rejects.toThrow('password must be a string');
  });

  // Test case 11: Throw error for empty password
  it('11. should throw Error when password is empty', async () => {
    await expect(hashPassword('', testSalt)).rejects.toThrow(Error);
    await expect(hashPassword('', testSalt)).rejects.toThrow(
      'password cannot be empty',
    );
  });

  // Test case 12: Throw error for null salt
  it('12. should throw TypeError when salt is null', async () => {
    await expect(
      hashPassword(testPassword, null as unknown as string),
    ).rejects.toThrow(TypeError);
    await expect(
      hashPassword(testPassword, null as unknown as string),
    ).rejects.toThrow('salt must be a string');
  });

  // Test case 13: Throw error for empty salt
  it('13. should throw Error when salt is empty', async () => {
    await expect(hashPassword(testPassword, '')).rejects.toThrow(Error);
    await expect(hashPassword(testPassword, '')).rejects.toThrow(
      'salt cannot be empty',
    );
  });

  // Test case 14: Throw error for salt with non-hex characters
  it('14. should throw Error when salt contains non-hexadecimal characters', async () => {
    const invalidSalt = 'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz';
    await expect(hashPassword(testPassword, invalidSalt)).rejects.toThrow(
      Error,
    );
    await expect(hashPassword(testPassword, invalidSalt)).rejects.toThrow(
      'salt must contain only hexadecimal characters',
    );
  });

  // Test case 15: Throw error for NaN iterations
  it('15. should throw Error when iterations is NaN', async () => {
    await expect(hashPassword(testPassword, testSalt, NaN)).rejects.toThrow(
      Error,
    );
    await expect(hashPassword(testPassword, testSalt, NaN)).rejects.toThrow(
      'iterations must be a valid number, not NaN',
    );
  });

  // Test case 16: Throw error for invalid iterations type
  it('16. should throw TypeError when iterations is not a number', async () => {
    await expect(
      hashPassword(testPassword, testSalt, 'invalid' as unknown as number),
    ).rejects.toThrow(TypeError);
    await expect(
      hashPassword(testPassword, testSalt, 'invalid' as unknown as number),
    ).rejects.toThrow('iterations must be a number');
  });

  // Test case 17: Throw error for zero iterations
  it('17. should throw Error for zero iterations', async () => {
    await expect(hashPassword(testPassword, testSalt, 0)).rejects.toThrow(
      Error,
    );
    await expect(hashPassword(testPassword, testSalt, 0)).rejects.toThrow(
      'iterations must be a positive integer',
    );
  });
});
