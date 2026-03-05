import { parseEnvInt } from '../src/parseEnvInt';

/**
 * Unit tests for the parseEnvInt function.
 */
describe('parseEnvInt', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  // Normal cases
  it('1. should parse valid integer string', () => {
    process.env.PORT = '3000';
    const result = parseEnvInt('PORT');
    expect(result).toBe(3000);
  });

  it('2. should parse negative integer', () => {
    process.env.OFFSET = '-100';
    const result = parseEnvInt('OFFSET');
    expect(result).toBe(-100);
  });

  it('3. should parse zero', () => {
    process.env.ZERO = '0';
    const result = parseEnvInt('ZERO');
    expect(result).toBe(0);
  });

  it('4. should return default value when variable not set', () => {
    delete process.env.MISSING;
    const result = parseEnvInt('MISSING', 5000);
    expect(result).toBe(5000);
  });

  it('5. should return undefined when variable not set and no default', () => {
    delete process.env.MISSING;
    const result = parseEnvInt('MISSING');
    expect(result).toBeUndefined();
  });

  it('6. should parse integer from string with leading zeros', () => {
    process.env.NUM = '0042';
    const result = parseEnvInt('NUM');
    expect(result).toBe(42);
  });

  // Edge cases
  it('7. should parse only integer part of decimal string', () => {
    process.env.DECIMAL = '3.14';
    const result = parseEnvInt('DECIMAL');
    expect(result).toBe(3);
  });

  it('8. should return default for invalid number string', () => {
    process.env.INVALID = 'not a number';
    const result = parseEnvInt('INVALID', 100);
    expect(result).toBe(100);
  });

  it('9. should return default for empty string', () => {
    process.env.EMPTY = '';
    const result = parseEnvInt('EMPTY', 200);
    expect(result).toBe(200);
  });

  it('10. should handle large integers', () => {
    process.env.LARGE = '2147483647';
    const result = parseEnvInt('LARGE');
    expect(result).toBe(2147483647);
  });

  it('11. should parse integer with whitespace', () => {
    process.env.SPACES = '  42  ';
    const result = parseEnvInt('SPACES');
    expect(result).toBe(42);
  });

  it('13. should throw Error when key is empty string', () => {
    expect(() => parseEnvInt('')).toThrow(Error);
    expect(() => parseEnvInt('')).toThrow('key cannot be an empty string');
  });

  it('16. should return a number (never undefined) when a defaultValue is provided', () => {
    delete process.env['PARSE_ENV_INT_OVERLOAD_TEST'];
    const result = parseEnvInt('PARSE_ENV_INT_OVERLOAD_TEST', 99);
    expect(result).toBe(99);
    expect(typeof result).toBe('number');
  });
});
