import { arrayDifferenceBy } from '../src';

describe('arrayDifferenceBy', () => {
  it('1. preserves input order, duplicates, and original references', () => {
    const first = { id: 1 };
    const second = { id: 2 };
    const items = [first, second, first];
    const other = [{ id: 1 }];
    Object.freeze(items);
    Object.freeze(other);
    const result: { id: number }[] = arrayDifferenceBy(
      items,
      other,
      (item) => item.id,
    );
    expect(result).toEqual([second]);
    expect(result[0]).toBe(second);
  });

  it('2. uses SameValueZero for keys and compares object keys by reference', () => {
    const shared = {};
    const separate = {};
    const items = [shared, separate, shared];
    expect(arrayDifferenceBy(items, [shared], (item) => item)).toEqual([
      separate,
    ]);
    expect(
      arrayDifferenceBy([NaN, -0, 0, 2], [NaN, 0], (item) => item),
    ).toEqual([2]);
    expect(
      arrayDifferenceBy(
        ['__proto__', 'constructor', 'a'],
        ['__proto__'],
        (item) => item,
      ),
    ).toEqual(['constructor', 'a']);
  });

  it('3. skips sparse slots in both inputs and visits explicit undefined', () => {
    const items = new Array<number | undefined>(4);
    items[1] = undefined;
    items[3] = 3;
    const other = new Array<number | undefined>(4);
    other[2] = 3;
    const keyFn = jest.fn((item: number | undefined) => item);
    expect(arrayDifferenceBy(items, other, keyFn)).toEqual([undefined]);
    expect(keyFn.mock.calls).toEqual([[3], [undefined], [3]]);
  });

  it('4. handles empty arrays without mutating inputs', () => {
    const keyFn = jest.fn((item: number) => item);
    expect(arrayDifferenceBy([], [], keyFn)).toEqual([]);
    expect(keyFn).not.toHaveBeenCalled();
    expect(arrayDifferenceBy([1, 2], [], keyFn)).toEqual([1, 2]);
    expect(arrayDifferenceBy([], [1, 2], keyFn)).toEqual([]);
  });

  it.each(['items', 'other'])('5. propagates key errors from %s', (side) => {
    const error = new Error('key failed');
    expect(() =>
      arrayDifferenceBy([1], [2], (item) => {
        if (item === (side === 'items' ? 1 : 2)) throw error;
        return item;
      }),
    ).toThrow(error);
  });

  it('6. validates arrays and callback before invoking user code', () => {
    const keyFn = jest.fn((item: number) => item);
    expect(() =>
      arrayDifferenceBy(null as unknown as number[], [], keyFn),
    ).toThrow(TypeError);
    expect(() =>
      arrayDifferenceBy([], null as unknown as number[], keyFn),
    ).toThrow(TypeError);
    expect(keyFn).not.toHaveBeenCalled();
    expect(() =>
      arrayDifferenceBy([], [], null as unknown as (item: number) => number),
    ).toThrow(TypeError);
  });
});
