import { parseEnvFloat } from '../src/parseEnvFloat';

/**
 * Unit tests for the parseEnvFloat function.
 */
describe('parseEnvFloat', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  // Normal cases
  it('1. should parse valid float string', () => {
    process.env.TAX_RATE = '0.15';
    const result = parseEnvFloat('TAX_RATE');
    expect(result).toBe(0.15);
  });

  it('2. should parse negative float', () => {
    process.env.TEMP = '-3.14';
    const result = parseEnvFloat('TEMP');
    expect(result).toBe(-3.14);
  });

  it('3. should parse integer as float', () => {
    process.env.NUM = '42';
    const result = parseEnvFloat('NUM');
    expect(result).toBe(42.0);
  });

  it('4. should return default value when variable not set', () => {
    delete process.env.MISSING;
    const result = parseEnvFloat('MISSING', 1.5);
    expect(result).toBe(1.5);
  });

  it('5. should return undefined when variable not set and no default', () => {
    delete process.env.MISSING;
    const result = parseEnvFloat('MISSING');
    expect(result).toBeUndefined();
  });

  it('6. should parse scientific notation', () => {
    process.env.SCI = '1.5e2';
    const result = parseEnvFloat('SCI');
    expect(result).toBe(150);
  });

  // Edge cases
  it('7. should parse zero', () => {
    process.env.ZERO = '0.0';
    const result = parseEnvFloat('ZERO');
    expect(result).toBe(0);
  });

  it('8. should return default for invalid number string', () => {
    process.env.INVALID = 'not a number';
    const result = parseEnvFloat('INVALID', 2.5);
    expect(result).toBe(2.5);
  });

  it('9. should return default for empty string', () => {
    process.env.EMPTY = '';
    const result = parseEnvFloat('EMPTY', 3.14);
    expect(result).toBe(3.14);
  });

  it('10. should handle very small floats', () => {
    process.env.SMALL = '0.00001';
    const result = parseEnvFloat('SMALL');
    expect(result).toBe(0.00001);
  });

  it('11. should parse float with whitespace', () => {
    process.env.SPACES = '  3.14  ';
    const result = parseEnvFloat('SPACES');
    expect(result).toBe(3.14);
  });

  // Error cases
  it('12. should throw TypeError when key is not a string', () => {
    expect(() => parseEnvFloat(123 as any)).toThrow(TypeError);
    expect(() => parseEnvFloat(123 as any)).toThrow(
      'key must be a string, got number',
    );
  });

  it('13. should throw Error when key is empty string', () => {
    expect(() => parseEnvFloat('')).toThrow(Error);
    expect(() => parseEnvFloat('')).toThrow('key cannot be an empty string');
  });

  it('14. should throw TypeError when defaultValue is not a number', () => {
    expect(() => parseEnvFloat('KEY', 'not a number' as any)).toThrow(
      TypeError,
    );
    expect(() => parseEnvFloat('KEY', 'not a number' as any)).toThrow(
      'defaultValue must be a number, got string',
    );
  });

  it('15. should throw TypeError when defaultValue is NaN', () => {
    expect(() => parseEnvFloat('KEY', NaN)).toThrow(TypeError);
    expect(() => parseEnvFloat('KEY', NaN)).toThrow(
      'defaultValue must be a valid number, not NaN',
    );
  });
});
