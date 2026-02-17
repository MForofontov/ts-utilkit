import { requireEnv } from '../src/requireEnv';

/**
 * Unit tests for the requireEnv function.
 */
describe('requireEnv', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  // Normal cases
  it('1. should return environment variable value when set', () => {
    process.env.REQUIRED_VAR = 'test_value';
    const result = requireEnv('REQUIRED_VAR');
    expect(result).toBe('test_value');
  });

  it('2. should return numeric string values', () => {
    process.env.PORT = '3000';
    const result = requireEnv('PORT');
    expect(result).toBe('3000');
  });

  it('3. should return values with special characters', () => {
    process.env.DB_URL = 'postgresql://user:pass@localhost/db';
    const result = requireEnv('DB_URL');
    expect(result).toBe('postgresql://user:pass@localhost/db');
  });

  it('4. should return values with spaces', () => {
    process.env.MESSAGE = 'hello world';
    const result = requireEnv('MESSAGE');
    expect(result).toBe('hello world');
  });

  // Edge cases
  it('5. should handle underscore and numbers in key name', () => {
    process.env.VAR_123_TEST = 'value';
    const result = requireEnv('VAR_123_TEST');
    expect(result).toBe('value');
  });

  // Error cases
  it('6. should throw Error when environment variable is not set', () => {
    delete process.env.MISSING_VAR;
    expect(() => requireEnv('MISSING_VAR')).toThrow(Error);
    expect(() => requireEnv('MISSING_VAR')).toThrow(
      "Required environment variable 'MISSING_VAR' is not set",
    );
  });

  it('7. should throw Error when environment variable is empty string', () => {
    process.env.EMPTY_VAR = '';
    expect(() => requireEnv('EMPTY_VAR')).toThrow(Error);
    expect(() => requireEnv('EMPTY_VAR')).toThrow(
      "Required environment variable 'EMPTY_VAR' is not set",
    );
  });

  it('8. should throw TypeError when key is not a string', () => {
    expect(() => requireEnv(123 as any)).toThrow(TypeError);
    expect(() => requireEnv(123 as any)).toThrow(
      'key must be a string, got number',
    );
  });

  it('9. should throw TypeError when key is null', () => {
    expect(() => requireEnv(null as any)).toThrow(TypeError);
    expect(() => requireEnv(null as any)).toThrow(
      'key must be a string, got object',
    );
  });

  it('10. should throw Error when key is empty string', () => {
    expect(() => requireEnv('')).toThrow(Error);
    expect(() => requireEnv('')).toThrow('key cannot be an empty string');
  });
});
