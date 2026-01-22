import { mapFilter } from '../src/mapFilter';

describe('mapFilter', () => {
  it('1. should filter map by value', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
    const result = mapFilter(map, ([, value]) => value > 1);
    expect(result).toEqual(
      new Map([
        ['b', 2],
        ['c', 3],
      ]),
    );
  });

  it('2. should filter map by key', () => {
    const map = new Map([
      ['apple', 1],
      ['banana', 2],
      ['cherry', 3],
    ]);
    const result = mapFilter(map, ([key]) => key.startsWith('a'));
    expect(result).toEqual(new Map([['apple', 1]]));
  });

  it('3. should filter with index', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
    const result = mapFilter(map, (entry, index) => index < 2);
    expect(result).toEqual(
      new Map([
        ['a', 1],
        ['b', 2],
      ]),
    );
  });

  it('4. should return empty map when no entries match', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
    ]);
    const result = mapFilter(map, ([, value]) => value > 10);
    expect(result).toEqual(new Map());
  });

  it('5. should return all entries when all match', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
    const result = mapFilter(map, ([, value]) => value > 0);
    expect(result).toEqual(map);
  });

  it('6. should not modify original map', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
    ]);
    const original = new Map(map);
    mapFilter(map, ([, value]) => value > 1);
    expect(map).toEqual(original);
  });

  it('7. should handle empty map', () => {
    const map = new Map<string, number>();
    const result = mapFilter(map, ([, value]) => value > 0);
    expect(result).toEqual(new Map());
  });

  it('8. should throw TypeError when map is not a Map', () => {
    const invalidMap = { a: 1 } as unknown as Map<string, number>;
    expect(() => mapFilter(invalidMap, () => true)).toThrow(TypeError);
  });

  it('9. should throw TypeError when predicate is not a function', () => {
    const map = new Map([['a', 1]]);
    const invalidPredicate = 'not a function' as unknown as () => boolean;
    expect(() => mapFilter(map, invalidPredicate)).toThrow(TypeError);
  });
});
