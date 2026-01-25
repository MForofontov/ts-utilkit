import { freezeConfig } from '../src/freezeConfig';

/**
 * Unit tests for the freezeConfig function.
 */
describe('freezeConfig', () => {
  // Normal cases
  it('1. should freeze simple object', () => {
    const config = { port: 3000, host: 'localhost' };
    const result = freezeConfig(config);
    expect(Object.isFrozen(result)).toBe(true);
  });

  it('2. should freeze nested objects', () => {
    const config = { db: { host: 'localhost', port: 5432 } };
    const result = freezeConfig(config);
    expect(Object.isFrozen(result)).toBe(true);
    expect(Object.isFrozen(result.db)).toBe(true);
  });

  it('3. should freeze deeply nested objects', () => {
    const config = { a: { b: { c: { d: 'value' } } } };
    const result = freezeConfig(config);
    expect(Object.isFrozen(result.a)).toBe(true);
    expect(Object.isFrozen(result.a.b)).toBe(true);
    expect(Object.isFrozen(result.a.b.c)).toBe(true);
  });

  it('4. should return the same object reference', () => {
    const config = { value: 42 };
    const result = freezeConfig(config);
    expect(result).toBe(config);
  });

  it('5. should freeze arrays within object', () => {
    const config = { items: [1, 2, 3] };
    const result = freezeConfig(config);
    expect(Object.isFrozen(result.items)).toBe(true);
  });

  // Edge cases
  it('6. should freeze empty object', () => {
    const config = {};
    const result = freezeConfig(config);
    expect(Object.isFrozen(result)).toBe(true);
  });

  it('7. should handle null values', () => {
    const config = { value: null };
    const result = freezeConfig(config);
    expect(Object.isFrozen(result)).toBe(true);
  });

  it('8. should handle undefined values', () => {
    const config = { value: undefined };
    const result = freezeConfig(config);
    expect(Object.isFrozen(result)).toBe(true);
  });

  it('9. should freeze objects with mixed value types', () => {
    const config = {
      string: 'text',
      number: 42,
      boolean: true,
      array: [1, 2],
      object: { nested: true },
      nullValue: null,
    };
    const result = freezeConfig(config);
    expect(Object.isFrozen(result)).toBe(true);
    expect(Object.isFrozen(result.array)).toBe(true);
    expect(Object.isFrozen(result.object)).toBe(true);
  });

  it('10. should prevent modifications in strict mode', () => {
    'use strict';
    const config = { value: 42 };
    const result = freezeConfig(config);
    expect(() => {
      (result as any).value = 100;
    }).toThrow();
  });

  it('11. should prevent adding new properties in strict mode', () => {
    'use strict';
    const config = { value: 42 };
    const result = freezeConfig(config);
    expect(() => {
      (result as any).newProp = 'test';
    }).toThrow();
  });

  it('12. should prevent deleting properties in strict mode', () => {
    'use strict';
    const config = { value: 42 };
    const result = freezeConfig(config);
    expect(() => {
      delete (result as any).value;
    }).toThrow();
  });

  it('13. should prevent nested modifications in strict mode', () => {
    'use strict';
    const config = { db: { host: 'localhost' } };
    const result = freezeConfig(config);
    expect(() => {
      (result.db as any).host = 'remote';
    }).toThrow();
  });

  // Error cases
  it('14. should throw TypeError when config is not an object', () => {
    expect(() => freezeConfig('not an object' as any)).toThrow(TypeError);
    expect(() => freezeConfig('not an object' as any)).toThrow(
      'config must be an object, got string',
    );
  });

  it('15. should throw TypeError when config is null', () => {
    expect(() => freezeConfig(null as any)).toThrow(TypeError);
    expect(() => freezeConfig(null as any)).toThrow(
      'config must be an object, got object',
    );
  });

  it('16. should throw TypeError when config is a number', () => {
    expect(() => freezeConfig(123 as any)).toThrow(TypeError);
    expect(() => freezeConfig(123 as any)).toThrow(
      'config must be an object, got number',
    );
  });
});
