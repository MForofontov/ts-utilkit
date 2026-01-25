import { setConfigValue } from '../src/setConfigValue';

/**
 * Unit tests for the setConfigValue function.
 */
describe('setConfigValue', () => {
  // Normal cases
  it('1. should set top-level value', () => {
    const config = { port: 3000 };
    const result = setConfigValue(config, 'host', 'localhost');
    expect(result).toEqual({ port: 3000, host: 'localhost' });
    expect(result).toBe(config); // Should modify in place
  });

  it('2. should set nested value with dot notation', () => {
    const config: Record<string, any> = {};
    const result = setConfigValue(config, 'db.host', 'localhost');
    expect(result).toEqual({ db: { host: 'localhost' } });
  });

  it('3. should set deeply nested value', () => {
    const config: Record<string, any> = {};
    const result = setConfigValue(config, 'a.b.c.d', 'value');
    expect(result).toEqual({ a: { b: { c: { d: 'value' } } } });
  });

  it('4. should override existing value', () => {
    const config = { port: 3000 };
    const result = setConfigValue(config, 'port', 4000);
    expect(result).toEqual({ port: 4000 });
  });

  it('5. should preserve existing nested structure', () => {
    const config = { db: { host: 'localhost', port: 5432 } };
    const result = setConfigValue(config, 'db.user', 'admin');
    expect(result).toEqual({
      db: { host: 'localhost', port: 5432, user: 'admin' },
    });
  });

  // Edge cases
  it('6. should set null value', () => {
    const config: Record<string, any> = {};
    const result = setConfigValue(config, 'value', null);
    expect(result).toEqual({ value: null });
  });

  it('7. should set zero value', () => {
    const config: Record<string, any> = {};
    const result = setConfigValue(config, 'count', 0);
    expect(result).toEqual({ count: 0 });
  });

  it('8. should set false value', () => {
    const config: Record<string, any> = {};
    const result = setConfigValue(config, 'enabled', false);
    expect(result).toEqual({ enabled: false });
  });

  it('9. should set empty string value', () => {
    const config: Record<string, any> = {};
    const result = setConfigValue(config, 'message', '');
    expect(result).toEqual({ message: '' });
  });

  it('10. should set array value', () => {
    const config: Record<string, any> = {};
    const result = setConfigValue(config, 'items', [1, 2, 3]);
    expect(result).toEqual({ items: [1, 2, 3] });
  });

  it('11. should replace non-object intermediate value with object', () => {
    const config = { a: 'string' };
    const result = setConfigValue(config, 'a.b.c', 'value');
    expect(result).toEqual({ a: { b: { c: 'value' } } });
  });

  it('12. should replace null intermediate value with object', () => {
    const config = { a: null };
    const result = setConfigValue(config, 'a.b', 'value');
    expect(result).toEqual({ a: { b: 'value' } });
  });

  it('13. should replace array intermediate value with object', () => {
    const config = { a: [1, 2, 3] };
    const result = setConfigValue(config, 'a.b', 'value');
    expect(result).toEqual({ a: { b: 'value' } });
  });

  // Error cases
  it('14. should throw TypeError when config is not an object', () => {
    expect(() =>
      setConfigValue('not an object' as any, 'key', 'value'),
    ).toThrow(TypeError);
    expect(() =>
      setConfigValue('not an object' as any, 'key', 'value'),
    ).toThrow('config must be an object, got string');
  });

  it('15. should throw TypeError when config is null', () => {
    expect(() => setConfigValue(null as any, 'key', 'value')).toThrow(
      TypeError,
    );
    expect(() => setConfigValue(null as any, 'key', 'value')).toThrow(
      'config must be an object, got object',
    );
  });

  it('16. should throw TypeError when config is an array', () => {
    expect(() => setConfigValue([1, 2, 3] as any, 'key', 'value')).toThrow(
      TypeError,
    );
    expect(() => setConfigValue([1, 2, 3] as any, 'key', 'value')).toThrow(
      'config must be an object, got array',
    );
  });

  it('17. should throw TypeError when path is not a string', () => {
    expect(() => setConfigValue({}, 123 as any, 'value')).toThrow(TypeError);
    expect(() => setConfigValue({}, 123 as any, 'value')).toThrow(
      'path must be a string, got number',
    );
  });

  it('18. should throw Error when path is empty string', () => {
    expect(() => setConfigValue({}, '', 'value')).toThrow(Error);
    expect(() => setConfigValue({}, '', 'value')).toThrow(
      'path cannot be an empty string',
    );
  });
});
