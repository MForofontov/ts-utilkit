import { uniqueBy } from '../src';

describe('uniqueBy', () => {
  it('1. retains first occurrences and original object references', () => {
    const first = { id: 1, name: 'A' };
    const items = [first, { id: 2, name: 'B' }, { id: 1, name: 'C' }];
    Object.freeze(items);
    expect(uniqueBy(items, (item) => item.id)).toEqual([first, items[1]]);
    expect(uniqueBy(items, (item) => item.id)[0]).toBe(first);
  });
  it('2. applies SameValueZero equality to keys', () => {
    expect(uniqueBy([NaN, NaN, -0, 0, 1], (n) => n)).toEqual([NaN, -0, 1]);
    const shared = {};
    const other = {};
    expect(uniqueBy([shared, shared, other], (value) => value)).toEqual([
      shared,
      other,
    ]);
  });
  it('3. passes original indices and visits sparse slots', () => {
    const items = new Array<number | undefined>(2);
    items[1] = 2;
    const callback = jest.fn(
      (item: number | undefined, index: number) => index,
    );
    expect(uniqueBy(items, callback)).toEqual([undefined, 2]);
    expect(callback.mock.calls).toEqual([
      [undefined, 0],
      [2, 1],
    ]);
  });
  it('4. returns an empty array without invoking the callback', () => {
    const callback = jest.fn();
    expect(uniqueBy([], callback)).toEqual([]);
    expect(callback).not.toHaveBeenCalled();
  });
  it('5. propagates callback errors', () => {
    const error = new Error('key failed');
    expect(() =>
      uniqueBy([1], () => {
        throw error;
      }),
    ).toThrow(error);
  });
  it('6. validates inputs', () => {
    expect(() => uniqueBy(null as unknown as number[], (n) => n)).toThrow(
      TypeError,
    );
    expect(() => uniqueBy([], null as unknown as () => number)).toThrow(
      TypeError,
    );
  });
});
