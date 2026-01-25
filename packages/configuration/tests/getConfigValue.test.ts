import { getConfigValue } from '../src/getConfigValue';

/**
 * Unit tests for the getConfigValue function.
 */
describe('getConfigValue', () => {
  // Normal cases
  it('1. should get top-level value', () => {
    const config = { port: 3000, host: 'localhost' };
    const result = getConfigValue(config, 'port');
    expect(result).toBe(3000);
  });

  it('2. should get nested value with dot notation', () => {
    const config = { db: { host: 'localhost', port: 5432 } };
    const result = getConfigValue(config, 'db.host');
    expect(result).toBe('localhost');
  });

  it('3. should get deeply nested value', () => {
    const config = { a: { b: { c: { d: 'value' } } } };
    const result = getConfigValue(config, 'a.b.c.d');
    expect(result).toBe('value');
  });

  it('4. should return default when path does not exist', () => {
    const config = { port: 3000 };
    const result = getConfigValue(config, 'missing', 'default');
    expect(result).toBe('default');
  });

  it('5. should return undefined when path does not exist and no default', () => {
    const config = { port: 3000 };
    const result = getConfigValue(config, 'missing');
    expect(result).toBeUndefined();
  });

  // Edge cases
  it('6. should get numeric zero value', () => {
    const config = { count: 0 };
    const result = getConfigValue(config, 'count');
    expect(result).toBe(0);
  });

  it('7. should get boolean false value', () => {
    const config = { enabled: false };
    const result = getConfigValue(config, 'enabled');
    expect(result).toBe(false);
  });

  it('8. should get empty string value', () => {
    const config = { message: '' };
    const result = getConfigValue(config, 'message');
    expect(result).toBe('');
  });

  it('9. should get null value', () => {
    const config = { value: null };
    const result = getConfigValue(config, 'value');
    expect(result).toBeNull();
  });

  it('10. should return default when intermediate value is not an object', () => {
    const config = { a: 'string' };
    const result = getConfigValue(config, 'a.b.c', 'default');
    expect(result).toBe('default');
  });

  it('11. should return default when intermediate value is null', () => {
    const config = { a: { b: null } };
    const result = getConfigValue(config, 'a.b.c', 'default');
    expect(result).toBe('default');
  });

  it('12. should get array value', () => {
    const config = { items: [1, 2, 3] };
    const result = getConfigValue(config, 'items');
    expect(result).toEqual([1, 2, 3]);
  });

  // Error cases
  it('13. should throw TypeError when config is not an object', () => {
    expect(() => getConfigValue('not an object' as any, 'key')).toThrow(
      TypeError,
    );
    expect(() => getConfigValue('not an object' as any, 'key')).toThrow(
      'config must be an object, got string',
    );
  });

  it('14. should throw TypeError when config is null', () => {
    expect(() => getConfigValue(null as any, 'key')).toThrow(TypeError);
    expect(() => getConfigValue(null as any, 'key')).toThrow(
      'config must be an object, got object',
    );
  });

  it('15. should throw TypeError when config is an array', () => {
    expect(() => getConfigValue([1, 2, 3] as any, 'key')).toThrow(TypeError);
    expect(() => getConfigValue([1, 2, 3] as any, 'key')).toThrow(
      'config must be an object, got array',
    );
  });

  it('16. should throw TypeError when path is not a string', () => {
    expect(() => getConfigValue({}, 123 as any)).toThrow(TypeError);
    expect(() => getConfigValue({}, 123 as any)).toThrow(
      'path must be a string, got number',
    );
  });

  it('17. should throw Error when path is empty string', () => {
    expect(() => getConfigValue({}, '')).toThrow(Error);
    expect(() => getConfigValue({}, '')).toThrow(
      'path cannot be an empty string',
    );
  });
});
