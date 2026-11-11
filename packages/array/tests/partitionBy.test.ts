import { partitionBy } from '../src';

describe('partitionBy', () => {
  it('1. groups adjacent keys without merging separated runs', () => {
    expect(partitionBy([1, 3, 2, 4, 5], (n) => n % 2)).toEqual([
      [1, 3],
      [2, 4],
      [5],
    ]);
  });
  it('2. groups undefined, NaN, and signed zero keys correctly', () => {
    expect(
      partitionBy([undefined, undefined, NaN, NaN, -0, 0], (x) => x),
    ).toEqual([
      [undefined, undefined],
      [NaN, NaN],
      [-0, 0],
    ]);
  });
  it('3. compares object keys by reference and retains item references', () => {
    const shared = {};
    const a = { key: shared };
    const b = { key: shared };
    const c = { key: {} };
    const items = [a, b, c];
    Object.freeze(items);
    const result = partitionBy(items, (item) => item.key);
    expect(result).toEqual([[a, b], [c]]);
    expect(result[0][0]).toBe(a);
  });
  it('4. handles empty arrays and original indices, including sparse slots', () => {
    expect(partitionBy([], (x) => x)).toEqual([]);
    const items = new Array<number | undefined>(2);
    items[1] = 2;
    const callback = jest.fn(
      (item: number | undefined, index: number) => index,
    );
    expect(partitionBy(items, callback)).toEqual([[undefined], [2]]);
    expect(callback.mock.calls).toEqual([
      [undefined, 0],
      [2, 1],
    ]);
  });
  it('5. propagates callback errors', () => {
    expect(() =>
      partitionBy([1], () => {
        throw new Error('failed');
      }),
    ).toThrow('failed');
  });
  it('6. validates inputs', () => {
    expect(() => partitionBy(null as unknown as number[], (n) => n)).toThrow(
      TypeError,
    );
    expect(() => partitionBy([], null as unknown as () => number)).toThrow(
      TypeError,
    );
  });
});
