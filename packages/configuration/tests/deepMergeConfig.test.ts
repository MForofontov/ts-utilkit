import { deepMergeConfig } from '../src/deepMergeConfig';

/**
 * Unit tests for the deepMergeConfig function.
 */
describe('deepMergeConfig', () => {
  // Normal cases
  it('1. should merge two simple objects', () => {
    const config1: Record<string, any> = { port: 3000, debug: false };
    const config2: Record<string, any> = { debug: true, timeout: 5000 };
    const result = deepMergeConfig(config1, config2);
    expect(result).toEqual({ port: 3000, debug: true, timeout: 5000 });
  });

  it('2. should merge nested objects', () => {
    const config1: Record<string, any> = {
      db: { host: 'localhost', port: 5432 },
    };
    const config2: Record<string, any> = { db: { port: 3306, user: 'admin' } };
    const result = deepMergeConfig(config1, config2);
    expect(result).toEqual({
      db: { host: 'localhost', port: 3306, user: 'admin' },
    });
  });

  it('3. should merge multiple configs', () => {
    const config1: Record<string, any> = { a: 1 };
    const config2: Record<string, any> = { b: 2 };
    const config3: Record<string, any> = { c: 3 };
    const result = deepMergeConfig(config1, config2, config3);
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('4. should override with later values', () => {
    const config1 = { value: 'first' };
    const config2 = { value: 'second' };
    const config3 = { value: 'third' };
    const result = deepMergeConfig(config1, config2, config3);
    expect(result).toEqual({ value: 'third' });
  });

  it('5. should handle single config', () => {
    const config = { port: 3000, host: 'localhost' };
    const result = deepMergeConfig(config);
    expect(result).toEqual({ port: 3000, host: 'localhost' });
  });

  // Edge cases
  it('6. should replace arrays, not merge them', () => {
    const config1: Record<string, any> = { ports: [3000, 4000] };
    const config2: Record<string, any> = { ports: [5000] };
    const result = deepMergeConfig(config1, config2);
    expect(result).toEqual({ ports: [5000] });
  });

  it('7. should override with null values', () => {
    const config1: Record<string, any> = { value: 'something' };
    const config2: Record<string, any> = { value: null };
    const result = deepMergeConfig(config1, config2);
    expect(result).toEqual({ value: null });
  });

  it('8. should handle deeply nested objects', () => {
    const config1: Record<string, any> = { a: { b: { c: { d: 1 } } } };
    const config2: Record<string, any> = { a: { b: { c: { e: 2 } } } };
    const result = deepMergeConfig(config1, config2);
    expect(result).toEqual({ a: { b: { c: { d: 1, e: 2 } } } });
  });

  it('9. should handle empty objects', () => {
    const config1 = {};
    const config2 = { value: 42 };
    const result = deepMergeConfig(config1, config2);
    expect(result).toEqual({ value: 42 });
  });

  it('10. should replace object with primitive', () => {
    const config1: Record<string, any> = { value: { nested: true } };
    const config2: Record<string, any> = { value: 'string' };
    const result = deepMergeConfig(config1, config2);
    expect(result).toEqual({ value: 'string' });
  });

  it('11. should replace primitive with object', () => {
    const config1: Record<string, any> = { value: 'string' };
    const config2: Record<string, any> = { value: { nested: true } };
    const result = deepMergeConfig(config1, config2);
    expect(result).toEqual({ value: { nested: true } });
  });

  // Error cases
  it('12. should throw Error when no configs provided', () => {
    expect(() => deepMergeConfig()).toThrow(Error);
    expect(() => deepMergeConfig()).toThrow(
      'At least one config object must be provided',
    );
  });

  it('13. should throw TypeError when config is not an object', () => {
    expect(() => deepMergeConfig('not an object' as any)).toThrow(TypeError);
    expect(() => deepMergeConfig('not an object' as any)).toThrow(
      'Config at index 0 must be an object, got string',
    );
  });

  it('14. should throw TypeError when config is null', () => {
    expect(() => deepMergeConfig(null as any)).toThrow(TypeError);
    expect(() => deepMergeConfig(null as any)).toThrow(
      'Config at index 0 must be an object, got object',
    );
  });

  it('15. should throw TypeError when config is an array', () => {
    expect(() => deepMergeConfig([1, 2, 3] as any)).toThrow(TypeError);
    expect(() => deepMergeConfig([1, 2, 3] as any)).toThrow(
      'Config at index 0 must be an object, got array',
    );
  });

  it('16. should throw TypeError for invalid config in middle', () => {
    expect(() => deepMergeConfig({ a: 1 }, 'invalid' as any, { c: 3 })).toThrow(
      TypeError,
    );
    expect(() => deepMergeConfig({ a: 1 }, 'invalid' as any, { c: 3 })).toThrow(
      'Config at index 1 must be an object, got string',
    );
  });
});
