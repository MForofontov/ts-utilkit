import { cloneTestData } from '../src/cloneTestData';
import { generateRandomObject } from '../src/generateRandomObject';

describe('test data prototype boundaries', () => {
  it('generates __proto__ as an own property and skips inherited schema keys', () => {
    const value = { injected: true };
    const schema = Object.create({ inherited: () => 'ignored' }) as Record<
      string,
      () => unknown
    >;
    Object.defineProperty(schema, '__proto__', {
      value: () => value,
      enumerable: true,
    });
    const result = generateRandomObject(schema);
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
    expect(Object.keys(result)).toEqual(['__proto__']);
    expect(result.__proto__).toBe(value);
  });

  it('clones nested __proto__ data without changing object prototypes', () => {
    const input: unknown = JSON.parse('{"__proto__":{"nested":{"id":1}}}');
    const result = cloneTestData(input) as Record<string, unknown>;
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
    expect(Object.hasOwn(result, '__proto__')).toBe(true);
    expect(result).toEqual(input);
    expect(result.__proto__).not.toBe(
      (input as Record<string, unknown>).__proto__,
    );
  });
});
