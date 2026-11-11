import { chunkArray } from '../src/chunkArray';
import { uniqueElementsWithCounts } from '../src/uniqueElementsWithCounts';
import { removeByIndex } from '../src/removeByIndex';

describe('array regressions', () => {
  it('1. counts reordered objects and distinguishes Map/Set contents', () => {
    const a = { a: 1, b: 2 };
    const b = { b: 2, a: 1 };
    expect(uniqueElementsWithCounts([a, b])).toEqual([
      { element: a, count: 2 },
    ]);
    expect(
      uniqueElementsWithCounts([new Map([['a', 1]]), new Map([['b', 2]])]),
    ).toHaveLength(2);
    expect(uniqueElementsWithCounts([new Set([1]), new Set([2])])).toHaveLength(
      2,
    );
  });

  it('2. never merges unrelated values that share a numeric hash', () => {
    expect(
      uniqueElementsWithCounts([{ value: 'Aa' }, { value: 'BB' }]),
    ).toHaveLength(2);
    expect(uniqueElementsWithCounts([{}, 3938])).toHaveLength(2);
    expect(uniqueElementsWithCounts([1n, { value: 1n }])).toHaveLength(2);
  });

  it('3. removes duplicate indices and preserves sparse-array filtering', () => {
    expect(removeByIndex([0, 1, 2, 3], [1, 1, -1, NaN, 8])).toEqual([0, 2, 3]);
    const sparse = new Array<number>(4);
    sparse[1] = 1;
    sparse[3] = 3;
    expect(removeByIndex(sparse, [1])).toEqual([3]);
  });

  it.each([NaN, Infinity])('4. rejects invalid chunk sizes %s', (size) => {
    expect(() => chunkArray([1, 2, 3], size)).toThrow(Error);
  });
});
