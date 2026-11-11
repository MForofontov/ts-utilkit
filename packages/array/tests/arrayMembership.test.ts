import { arrayDifference, arrayIntersection } from '../src';
import { deepEqual } from '@ts-utilkit/object';

describe.each([
  ['difference', arrayDifference, false],
  ['intersection', arrayIntersection, true],
] as const)('array %s membership', (_name, operation, include) => {
  function previous(a: unknown[], b: unknown[]): unknown[] {
    return a.filter((x) => b.some((y) => deepEqual(x, y)) === include);
  }

  it('1. preserves special values, duplicate order, and reference equality', () => {
    const symbol = Symbol('same');
    const fn = () => 1;
    const values: unknown[] = [
      NaN,
      -0,
      0,
      undefined,
      null,
      false,
      1n,
      '1',
      symbol,
      Symbol('same'),
      fn,
      () => 1,
    ];
    const a = Array.from({ length: 8 }, () => values).flat();
    const b = Array.from({ length: 8 }, () => values.slice(0, 9)).flat();
    Object.freeze(a);
    Object.freeze(b);
    expect(operation(a, b)).toEqual(previous(a, b));
    const largeObjects = Array.from({ length: 64 }, (_, id) => ({ id }));
    expect(operation(largeObjects, largeObjects.slice())).toEqual(
      previous(largeObjects, largeObjects.slice()),
    );
  });

  it('2. skips holes without treating them as undefined', () => {
    const a = new Array<number | undefined>(64);
    a[1] = undefined;
    a[3] = 3;
    const b = new Array<number | undefined>(64);
    b[3] = 3;
    expect(operation(a, b)).toEqual(previous(a, b));
  });

  it('3. retains deep matching for mixed arrays and complex objects', () => {
    const a: unknown[] = [
      { id: 1 },
      { id: 2 },
      new Set([1]),
      new Map([['a', 1]]),
      1,
      null,
    ];
    const b: unknown[] = [{ id: 1 }, new Set([1]), new Map([['a', 2]]), 1];
    expect(operation(a, b)).toEqual(previous(a, b));
    expect(
      operation<unknown>(
        [{ id: 1 }],
        Array.from({ length: 64 }, () => 1),
      ),
    ).toEqual(
      previous(
        [{ id: 1 }],
        Array.from({ length: 64 }, () => 1),
      ),
    );
  });

  it('4. preserves lazy accessor reads and source-triggered comparison mutations', () => {
    function inputs(): [number[], number[]] {
      const b = Array.from({ length: 64 }, (_, i) => i);
      const a = Array.from({ length: 64 }, (_, i) => i);
      Object.defineProperty(a, 0, {
        get() {
          b[0] = -1;
          return 0;
        },
      });
      return [a, b];
    }
    expect(operation(...inputs())).toEqual(previous(...inputs()));
    const b = Array.from({ length: 64 }, (_, i) => i);
    const getter = jest.fn(() => 0);
    Object.defineProperty(b, 0, { get: getter });
    expect(operation([], b)).toEqual([]);
    expect(getter).not.toHaveBeenCalled();
    expect(
      operation(
        Array.from({ length: 64 }, () => 0),
        b,
      ),
    ).toEqual(include ? Array.from({ length: 64 }, () => 0) : []);
    expect(getter).toHaveBeenCalledTimes(64);
  });

  it('5. retains inherited indexed values', () => {
    const b = new Array<number>(64);
    const prototype = Object.create(Array.prototype) as number[];
    prototype[1] = 7;
    Object.setPrototypeOf(b, prototype);
    const a = Array.from({ length: 64 }, () => 7);
    expect(operation(a, b)).toEqual(previous(a, b));
  });
});
