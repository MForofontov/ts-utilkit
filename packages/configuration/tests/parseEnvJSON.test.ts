import { parseEnvJSON } from '../src/parseEnvJSON';

/**
 * Unit tests for the parseEnvJSON function.
 */
describe('parseEnvJSON', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  // Normal cases
  it('1. should parse valid JSON object', () => {
    process.env.CONFIG = '{"host":"localhost","port":3000}';
    const result = parseEnvJSON<{ host: string; port: number }>('CONFIG');
    expect(result).toEqual({ host: 'localhost', port: 3000 });
  });

  it('2. should parse valid JSON array', () => {
    process.env.PORTS = '[3000,4000,5000]';
    const result = parseEnvJSON<number[]>('PORTS');
    expect(result).toEqual([3000, 4000, 5000]);
  });

  it('3. should parse JSON string', () => {
    process.env.MESSAGE = '"hello world"';
    const result = parseEnvJSON<string>('MESSAGE');
    expect(result).toBe('hello world');
  });

  it('4. should parse JSON number', () => {
    process.env.NUMBER = '42';
    const result = parseEnvJSON<number>('NUMBER');
    expect(result).toBe(42);
  });

  it('5. should parse JSON boolean', () => {
    process.env.FLAG = 'true';
    const result = parseEnvJSON<boolean>('FLAG');
    expect(result).toBe(true);
  });

  it('6. should parse JSON null', () => {
    process.env.NULL_VAL = 'null';
    const result = parseEnvJSON('NULL_VAL');
    expect(result).toBeNull();
  });

  it('7. should return default value when variable not set', () => {
    delete process.env.MISSING;
    const result = parseEnvJSON('MISSING', { default: true });
    expect(result).toEqual({ default: true });
  });

  it('8. should return undefined when variable not set and no default', () => {
    delete process.env.MISSING;
    const result = parseEnvJSON('MISSING');
    expect(result).toBeUndefined();
  });

  // Edge cases
  it('9. should parse nested JSON object', () => {
    process.env.NESTED = '{"db":{"host":"localhost","port":5432}}';
    const result = parseEnvJSON('NESTED');
    expect(result).toEqual({ db: { host: 'localhost', port: 5432 } });
  });

  it('10. should return default for invalid JSON', () => {
    process.env.INVALID = '{invalid json}';
    const result = parseEnvJSON('INVALID', { fallback: true });
    expect(result).toEqual({ fallback: true });
  });

  it('11. should return default for empty string', () => {
    process.env.EMPTY = '';
    const result = parseEnvJSON('EMPTY', []);
    expect(result).toEqual([]);
  });

  it('12. should handle JSON with escaped characters', () => {
    process.env.ESCAPED = '{"message":"Line 1\\nLine 2"}';
    const result = parseEnvJSON<{ message: string }>('ESCAPED');
    expect(result).toEqual({ message: 'Line 1\nLine 2' });
  });

  // Error cases
  it('13. should throw TypeError when key is not a string', () => {
    expect(() => parseEnvJSON(123 as any)).toThrow(TypeError);
    expect(() => parseEnvJSON(123 as any)).toThrow(
      'key must be a string, got number',
    );
  });

  it('14. should throw Error when key is empty string', () => {
    expect(() => parseEnvJSON('')).toThrow(Error);
    expect(() => parseEnvJSON('')).toThrow('key cannot be an empty string');
  });
});
