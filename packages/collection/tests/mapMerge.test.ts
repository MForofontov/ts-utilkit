import { mapMerge } from '../src/mapMerge';

describe('mapMerge', () => {
  it('1. should merge two maps without conflicts', () => {
    const map1 = new Map([
      ['a', 1],
      ['b', 2],
    ]);
    const map2 = new Map([
      ['c', 3],
      ['d', 4],
    ]);
    const result = mapMerge(map1, map2);
    expect(result).toEqual(
      new Map([
        ['a', 1],
        ['b', 2],
        ['c', 3],
        ['d', 4],
      ]),
    );
  });

  it('2. should handle conflicts with later maps winning', () => {
    const map1 = new Map([
      ['a', 1],
      ['b', 2],
    ]);
    const map2 = new Map([
      ['b', 20],
      ['c', 3],
    ]);
    const result = mapMerge(map1, map2);
    expect(result).toEqual(
      new Map([
        ['a', 1],
        ['b', 20],
        ['c', 3],
      ]),
    );
  });

  it('3. should merge multiple maps', () => {
    const map1 = new Map([['a', 1]]);
    const map2 = new Map([['b', 2]]);
    const map3 = new Map([['c', 3]]);
    const result = mapMerge(map1, map2, map3);
    expect(result).toEqual(
      new Map([
        ['a', 1],
        ['b', 2],
        ['c', 3],
      ]),
    );
  });

  it('4. should handle empty maps', () => {
    const map1 = new Map([['a', 1]]);
    const map2 = new Map<string, number>();
    const result = mapMerge(map1, map2);
    expect(result).toEqual(new Map([['a', 1]]));
  });

  it('5. should not modify original maps', () => {
    const map1 = new Map([['a', 1]]);
    const map2 = new Map([['b', 2]]);
    const original1 = new Map(map1);
    const original2 = new Map(map2);
    mapMerge(map1, map2);
    expect(map1).toEqual(original1);
    expect(map2).toEqual(original2);
  });

  it('6. should throw Error when fewer than two maps provided', () => {
    const map = new Map([['a', 1]]);
    expect(() => mapMerge(map)).toThrow('At least two maps are required');
  });

  it('7. should throw TypeError when argument is not a Map', () => {
    const validMap = new Map([['a', 1]]);
    const invalidMap = { b: 2 } as unknown as Map<string, number>;
    expect(() => mapMerge(validMap, invalidMap)).toThrow(TypeError);
  });
});
