import { validateConfig } from '../src/validateConfig';

/**
 * Unit tests for the validateConfig function.
 */
describe('validateConfig', () => {
  // Normal cases
  it('1. should return true when all required keys exist', () => {
    const config = { port: 3000, host: 'localhost', debug: true };
    const result = validateConfig(config, ['port', 'host', 'debug']);
    expect(result).toBe(true);
  });

  it('2. should validate nested keys with dot notation', () => {
    const config = { db: { host: 'localhost', port: 5432 } };
    const result = validateConfig(config, ['db.host', 'db.port']);
    expect(result).toBe(true);
  });

  it('3. should return true when no keys required', () => {
    const config = { value: 42 };
    const result = validateConfig(config, []);
    expect(result).toBe(true);
  });

  it('4. should validate deeply nested keys', () => {
    const config = { a: { b: { c: { d: 'value' } } } };
    const result = validateConfig(config, ['a.b.c.d']);
    expect(result).toBe(true);
  });

  it('5. should validate mix of top-level and nested keys', () => {
    const config = { port: 3000, db: { host: 'localhost' } };
    const result = validateConfig(config, ['port', 'db.host']);
    expect(result).toBe(true);
  });

  // Edge cases
  it('6. should handle numeric values', () => {
    const config = { count: 0, value: null };
    const result = validateConfig(config, ['count']);
    expect(result).toBe(true);
  });

  it('7. should handle boolean false values', () => {
    const config = { enabled: false };
    const result = validateConfig(config, ['enabled']);
    expect(result).toBe(true);
  });

  it('8. should handle empty string values', () => {
    const config = { message: '' };
    const result = validateConfig(config, ['message']);
    expect(result).toBe(true);
  });

  // Error cases
  it('9. should throw Error when required key is missing', () => {
    const config = { port: 3000 };
    expect(() => validateConfig(config, ['port', 'host'])).toThrow(Error);
    expect(() => validateConfig(config, ['port', 'host'])).toThrow(
      "Required configuration key 'host' is missing or undefined",
    );
  });

  it('10. should throw Error when nested key is missing', () => {
    const config = { db: { host: 'localhost' } };
    expect(() => validateConfig(config, ['db.port'])).toThrow(Error);
    expect(() => validateConfig(config, ['db.port'])).toThrow(
      "Required configuration key 'db.port' is missing or undefined",
    );
  });

  it('11. should throw Error when value is undefined', () => {
    const config = { value: undefined };
    expect(() => validateConfig(config, ['value'])).toThrow(Error);
    expect(() => validateConfig(config, ['value'])).toThrow(
      "Required configuration key 'value' is missing or undefined",
    );
  });

  it('12. should throw Error when intermediate object is missing', () => {
    const config = { a: {} };
    expect(() => validateConfig(config, ['a.b.c'])).toThrow(Error);
    expect(() => validateConfig(config, ['a.b.c'])).toThrow(
      "Required configuration key 'a.b.c' is missing or undefined",
    );
  });
});
