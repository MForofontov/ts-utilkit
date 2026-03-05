import { parseEnvArray } from '../src/parseEnvArray';

/**
 * Unit tests for the parseEnvArray function.
 */
describe('parseEnvArray', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  // Normal cases
  it('1. should parse comma-separated values', () => {
    process.env.HOSTS = 'localhost,example.com,test.com';
    const result = parseEnvArray('HOSTS');
    expect(result).toEqual(['localhost', 'example.com', 'test.com']);
  });

  it('2. should parse single value', () => {
    process.env.HOST = 'localhost';
    const result = parseEnvArray('HOST');
    expect(result).toEqual(['localhost']);
  });

  it('3. should use custom delimiter', () => {
    process.env.PATHS = '/usr/bin:/usr/local/bin:/bin';
    const result = parseEnvArray('PATHS', ':');
    expect(result).toEqual(['/usr/bin', '/usr/local/bin', '/bin']);
  });

  it('4. should trim whitespace from elements', () => {
    process.env.ITEMS = 'item1 , item2 , item3';
    const result = parseEnvArray('ITEMS');
    expect(result).toEqual(['item1', 'item2', 'item3']);
  });

  it('5. should return default value when variable not set', () => {
    delete process.env.MISSING;
    const result = parseEnvArray('MISSING', ',', ['default']);
    expect(result).toEqual(['default']);
  });

  it('6. should return undefined when variable not set and no default', () => {
    delete process.env.MISSING;
    const result = parseEnvArray('MISSING');
    expect(result).toBeUndefined();
  });

  // Edge cases
  it('7. should filter out empty elements', () => {
    process.env.SPARSE = 'a,,b,,,c';
    const result = parseEnvArray('SPARSE');
    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('8. should handle trailing delimiter', () => {
    process.env.TRAILING = 'a,b,c,';
    const result = parseEnvArray('TRAILING');
    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('9. should handle leading delimiter', () => {
    process.env.LEADING = ',a,b,c';
    const result = parseEnvArray('LEADING');
    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('10. should return default for empty string', () => {
    process.env.EMPTY = '';
    const result = parseEnvArray('EMPTY', ',', ['default']);
    expect(result).toEqual(['default']);
  });

  it('11. should handle values with spaces in them', () => {
    process.env.NAMES = 'John Doe,Jane Smith,Bob Jones';
    const result = parseEnvArray('NAMES');
    expect(result).toEqual(['John Doe', 'Jane Smith', 'Bob Jones']);
  });

  it('13. should throw Error when key is empty string', () => {
    expect(() => parseEnvArray('')).toThrow(Error);
    expect(() => parseEnvArray('')).toThrow('key cannot be an empty string');
  });

  it('15. should throw Error when delimiter is empty string', () => {
    expect(() => parseEnvArray('KEY', '')).toThrow(Error);
    expect(() => parseEnvArray('KEY', '')).toThrow(
      'delimiter cannot be an empty string',
    );
  });
});
