import { differenceBy } from '../src';

describe('differenceBy own-key boundaries', () => {
  it('1. includes missing undefined values without calling the comparator', () => {
    const comparator = jest.fn((a: unknown, b: unknown) => a === b);
    const result = differenceBy({ missing: undefined }, {}, comparator);
    expect(Object.hasOwn(result, 'missing')).toBe(true);
    expect(result.missing).toBeUndefined();
    expect(comparator).not.toHaveBeenCalled();
  });

  it('2. ignores inherited values and never invokes inherited getters', () => {
    const getter = jest.fn(() => 1);
    const prototype: Record<string, unknown> = {};
    Object.defineProperty(prototype, 'value', { get: getter });
    const other = Object.create(prototype) as Record<string, unknown>;
    expect(differenceBy({ value: 1 }, other, (a, b) => a === b)).toEqual({
      value: 1,
    });
    expect(getter).not.toHaveBeenCalled();
  });

  it('3. retains missing symbol and prototype-like keys as own data', () => {
    const symbol = Symbol('missing');
    const input: Record<PropertyKey, unknown> = { [symbol]: undefined };
    Object.defineProperty(input, '__proto__', {
      value: undefined,
      enumerable: true,
    });
    const result = differenceBy(input, {}, (a, b) => a === b);
    expect(Reflect.ownKeys(result)).toEqual(Reflect.ownKeys(input));
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
  });

  it('4. still compares own undefined values and preserves both inputs', () => {
    const input: Readonly<{ missing: undefined; changed: number }> =
      Object.freeze({ missing: undefined, changed: 1 });
    const other = Object.freeze({ missing: undefined, changed: 2 });
    expect(differenceBy(input, other, (a, b) => a === b)).toEqual({
      changed: 1,
    });
  });
});
