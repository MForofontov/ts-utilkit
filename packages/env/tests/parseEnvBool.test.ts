import { parseEnvBool } from '../src/parseEnvBool';

/**
 * Unit tests for the parseEnvBool function.
 */
describe('parseEnvBool', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  // Normal cases - truthy values
  it('1. should parse "true" as true', () => {
    process.env.FLAG = 'true';
    const result = parseEnvBool('FLAG');
    expect(result).toBe(true);
  });

  it('2. should parse "1" as true', () => {
    process.env.FLAG = '1';
    const result = parseEnvBool('FLAG');
    expect(result).toBe(true);
  });

  it('3. should parse "yes" as true', () => {
    process.env.FLAG = 'yes';
    const result = parseEnvBool('FLAG');
    expect(result).toBe(true);
  });

  it('4. should parse "on" as true', () => {
    process.env.FLAG = 'on';
    const result = parseEnvBool('FLAG');
    expect(result).toBe(true);
  });

  // Normal cases - falsy values
  it('5. should parse "false" as false', () => {
    process.env.FLAG = 'false';
    const result = parseEnvBool('FLAG');
    expect(result).toBe(false);
  });

  it('6. should parse "0" as false', () => {
    process.env.FLAG = '0';
    const result = parseEnvBool('FLAG');
    expect(result).toBe(false);
  });

  it('7. should parse "no" as false', () => {
    process.env.FLAG = 'no';
    const result = parseEnvBool('FLAG');
    expect(result).toBe(false);
  });

  it('8. should parse "off" as false', () => {
    process.env.FLAG = 'off';
    const result = parseEnvBool('FLAG');
    expect(result).toBe(false);
  });

  // Edge cases - case insensitivity
  it('9. should parse "TRUE" as true (case insensitive)', () => {
    process.env.FLAG = 'TRUE';
    const result = parseEnvBool('FLAG');
    expect(result).toBe(true);
  });

  it('10. should parse "False" as false (case insensitive)', () => {
    process.env.FLAG = 'False';
    const result = parseEnvBool('FLAG');
    expect(result).toBe(false);
  });

  it('11. should handle whitespace around value', () => {
    process.env.FLAG = '  true  ';
    const result = parseEnvBool('FLAG');
    expect(result).toBe(true);
  });

  // Edge cases - default values
  it('12. should return default when variable not set', () => {
    delete process.env.MISSING;
    const result = parseEnvBool('MISSING', false);
    expect(result).toBe(false);
  });

  it('13. should return undefined when variable not set and no default', () => {
    delete process.env.MISSING;
    const result = parseEnvBool('MISSING');
    expect(result).toBeUndefined();
  });

  it('14. should return default for unrecognized value', () => {
    process.env.INVALID = 'maybe';
    const result = parseEnvBool('INVALID', true);
    expect(result).toBe(true);
  });

  it('15. should return default for empty string', () => {
    process.env.EMPTY = '';
    const result = parseEnvBool('EMPTY', false);
    expect(result).toBe(false);
  });

  // Error cases
  it('16. should throw TypeError when key is not a string', () => {
    expect(() => parseEnvBool(123 as any)).toThrow(TypeError);
    expect(() => parseEnvBool(123 as any)).toThrow(
      'key must be a string, got number',
    );
  });

  it('17. should throw Error when key is empty string', () => {
    expect(() => parseEnvBool('')).toThrow(Error);
    expect(() => parseEnvBool('')).toThrow('key cannot be an empty string');
  });

  it('18. should throw TypeError when defaultValue is not a boolean', () => {
    expect(() => parseEnvBool('KEY', 'not a bool' as any)).toThrow(TypeError);
    expect(() => parseEnvBool('KEY', 'not a bool' as any)).toThrow(
      'defaultValue must be a boolean, got string',
    );
  });
});
