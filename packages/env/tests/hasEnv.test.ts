import { hasEnv } from '../src/hasEnv';

describe('hasEnv', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('1. should return true when variable is set to a non-empty string', () => {
    process.env.MY_VAR = 'hello';
    expect(hasEnv('MY_VAR')).toBe(true);
  });

  it('2. should return false when variable is not set', () => {
    delete process.env.MISSING_VAR;
    expect(hasEnv('MISSING_VAR')).toBe(false);
  });

  it('3. should return false when variable is set to an empty string', () => {
    process.env.EMPTY_VAR = '';
    expect(hasEnv('EMPTY_VAR')).toBe(false);
  });

  it('4. should return true for a variable set to "0" (falsy string is still a value)', () => {
    process.env.ZERO_VAR = '0';
    expect(hasEnv('ZERO_VAR')).toBe(true);
  });

  it('5. should return true for a variable set to "false"', () => {
    process.env.FLAG_VAR = 'false';
    expect(hasEnv('FLAG_VAR')).toBe(true);
  });

  it('6. should return true for a variable set to a URL string', () => {
    process.env.DB_URL = 'postgresql://user:pass@localhost/db';
    expect(hasEnv('DB_URL')).toBe(true);
  });

  it('7. should return true for a variable set to a numeric string', () => {
    process.env.PORT = '3000';
    expect(hasEnv('PORT')).toBe(true);
  });

  it('8. should return true for a variable set to whitespace (non-empty)', () => {
    process.env.SPACE_VAR = '   ';
    expect(hasEnv('SPACE_VAR')).toBe(true);
  });

  it('9. should handle key names with underscores and numbers', () => {
    process.env.VAR_123_TEST = 'value';
    expect(hasEnv('VAR_123_TEST')).toBe(true);
    delete process.env.VAR_123_TEST;
    expect(hasEnv('VAR_123_TEST')).toBe(false);
  });

  it('10. should not modify process.env', () => {
    process.env.STABLE_VAR = 'check';
    const before = process.env.STABLE_VAR;
    hasEnv('STABLE_VAR');
    expect(process.env.STABLE_VAR).toBe(before);
  });

  it('13. should throw Error for an empty string key', () => {
    expect(() => hasEnv('')).toThrow(Error);
    expect(() => hasEnv('')).toThrow('key cannot be an empty string');
  });
});
