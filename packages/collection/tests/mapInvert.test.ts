import { mapInvert } from '../src/mapInvert';

describe('mapInvert', () => {
  it('1. should invert map keys and values', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
    const result = mapInvert(map);
    expect(result).toEqual(
      new Map([
        [1, 'a'],
        [2, 'b'],
        [3, 'c'],
      ]),
    );
  });

  it('2. should handle duplicate values with last key winning', () => {
    const map = new Map([
      ['a', 1],
      ['b', 1],
      ['c', 2],
    ]);
    const result = mapInvert(map);
    expect(result).toEqual(
      new Map([
        [1, 'b'],
        [2, 'c'],
      ]),
    );
  });

  it('3. should handle empty map', () => {
    const map = new Map<string, number>();
    const result = mapInvert(map);
    expect(result).toEqual(new Map());
  });

  it('4. should work with string values as keys', () => {
    const map = new Map([
      [1, 'a'],
      [2, 'b'],
    ]);
    const result = mapInvert(map);
    expect(result).toEqual(
      new Map([
        ['a', 1],
        ['b', 2],
      ]),
    );
  });

  it('5. should not modify original map', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
    ]);
    const original = new Map(map);
    mapInvert(map);
    expect(map).toEqual(original);
  });

  it('6. should throw TypeError when map is not a Map', () => {
    const invalidMap = { a: 1 } as unknown as Map<string, number>;
    expect(() => mapInvert(invalidMap)).toThrow(TypeError);
  });
});
