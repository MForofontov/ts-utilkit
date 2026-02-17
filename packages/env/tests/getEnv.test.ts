import { getEnv } from '../src/getEnv';

/**
 * Unit tests for the getEnv function.
 */
describe('getEnv', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Reset process.env before each test
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    // Restore original environment
    process.env = originalEnv;
  });

  // Normal cases
  it('1. should return environment variable value when set', () => {
    process.env.TEST_VAR = 'test_value';
    const result = getEnv('TEST_VAR');
    expect(result).toBe('test_value');
  });

  it('2. should return default value when variable is not set', () => {
    delete process.env.TEST_VAR;
    const result = getEnv('TEST_VAR', 'default');
    expect(result).toBe('default');
  });

  it('3. should return undefined when variable not set and no default', () => {
    delete process.env.TEST_VAR;
    const result = getEnv('TEST_VAR');
    expect(result).toBeUndefined();
  });

  it('4. should return actual value even when default is provided', () => {
    process.env.TEST_VAR = 'actual';
    const result = getEnv('TEST_VAR', 'default');
    expect(result).toBe('actual');
  });

  it('5. should handle numeric string values', () => {
    process.env.PORT = '3000';
    const result = getEnv('PORT');
    expect(result).toBe('3000');
  });

  it('6. should handle empty string values', () => {
    process.env.EMPTY_VAR = '';
    const result = getEnv('EMPTY_VAR', 'default');
    expect(result).toBe('');
  });

  // Edge cases
  it('7. should handle special characters in variable name', () => {
    process.env.TEST_VAR_123 = 'value';
    const result = getEnv('TEST_VAR_123');
    expect(result).toBe('value');
  });

  it('8. should handle values with spaces', () => {
    process.env.TEST_VAR = 'value with spaces';
    const result = getEnv('TEST_VAR');
    expect(result).toBe('value with spaces');
  });

  // Error cases
  it('9. should throw TypeError when key is not a string', () => {
    expect(() => getEnv(123 as any)).toThrow(TypeError);
    expect(() => getEnv(123 as any)).toThrow(
      'key must be a string, got number',
    );
  });

  it('10. should throw TypeError when key is null', () => {
    expect(() => getEnv(null as any)).toThrow(TypeError);
    expect(() => getEnv(null as any)).toThrow(
      'key must be a string, got object',
    );
  });

  it('11. should throw TypeError when key is undefined', () => {
    expect(() => getEnv(undefined as any)).toThrow(TypeError);
    expect(() => getEnv(undefined as any)).toThrow(
      'key must be a string, got undefined',
    );
  });

  it('12. should throw Error when key is empty string', () => {
    expect(() => getEnv('')).toThrow(Error);
    expect(() => getEnv('')).toThrow('key cannot be an empty string');
  });
});
