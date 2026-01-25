import { mapMap } from '../src/mapMap';

describe('mapMap', () => {
  it('1. should transform map values', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
    const result = mapMap(map, ([, value]) => value * 2);
    expect(result).toEqual(
      new Map([
        ['a', 2],
        ['b', 4],
        ['c', 6],
      ]),
    );
  });

  it('2. should transform based on key', () => {
    const map = new Map([
      ['name', 'john'],
      ['age', '30'],
    ]);
    const result = mapMap(map, ([key, value]) =>
      key === 'age' ? parseInt(value) : value,
    );
    expect(result).toEqual(
      new Map<string, string | number>([
        ['name', 'john'],
        ['age', 30],
      ]),
    );
  });

  it('3. should use index in transformation', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
    const result = mapMap(map, ([, value], index) => value + index);
    expect(result).toEqual(
      new Map([
        ['a', 1],
        ['b', 3],
        ['c', 5],
      ]),
    );
  });

  it('4. should change value types', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
    ]);
    const result = mapMap(map, ([, value]) => String(value));
    expect(result).toEqual(
      new Map([
        ['a', '1'],
        ['b', '2'],
      ]),
    );
  });

  it('5. should not modify original map', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
    ]);
    const original = new Map(map);
    mapMap(map, ([, value]) => value * 2);
    expect(map).toEqual(original);
  });

  it('6. should handle empty map', () => {
    const map = new Map<string, number>();
    const result = mapMap(map, ([, value]) => value * 2);
    expect(result).toEqual(new Map());
  });

  it('7. should throw TypeError when map is not a Map', () => {
    const invalidMap = { a: 1 } as unknown as Map<string, number>;
    expect(() => mapMap(invalidMap, () => 0)).toThrow(TypeError);
  });

  it('8. should throw TypeError when mapper is not a function', () => {
    const map = new Map([['a', 1]]);
    const invalidMapper = 'not a function' as unknown as () => number;
    expect(() => mapMap(map, invalidMapper)).toThrow(TypeError);
  });
});
