import { mapReduce } from '../src/mapReduce';

describe('mapReduce', () => {
  it('1. should sum all values', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
    const result = mapReduce(map, (acc, [, value]) => acc + value, 0);
    expect(result).toBe(6);
  });

  it('2. should concatenate keys', () => {
    const map = new Map([
      ['hello', 1],
      ['world', 2],
    ]);
    const result = mapReduce(map, (acc, [key]) => acc + key, '');
    expect(result).toBe('helloworld');
  });

  it('3. should build object from map', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
    ]);
    const result = mapReduce(map, (acc, [k, v]) => ({ ...acc, [k]: v }), {});
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('4. should use index in reduction', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
    const result = mapReduce(
      map,
      (acc, [, value], index) => acc + value + index,
      0,
    );
    expect(result).toBe(9); // (1+0) + (2+1) + (3+2) = 9
  });

  it('5. should handle empty map', () => {
    const map = new Map<string, number>();
    const result = mapReduce(map, (acc, [, value]) => acc + value, 0);
    expect(result).toBe(0);
  });

  it('6. should find max value', () => {
    const map = new Map([
      ['a', 1],
      ['b', 5],
      ['c', 3],
    ]);
    const result = mapReduce(
      map,
      (acc, [, value]) => Math.max(acc, value),
      -Infinity,
    );
    expect(result).toBe(5);
  });

  it('7. should throw TypeError when map is not a Map', () => {
    const invalidMap = { a: 1 } as unknown as Map<string, number>;
    expect(() => mapReduce(invalidMap, (acc) => acc, 0)).toThrow(TypeError);
  });

  it('8. should throw TypeError when reducer is not a function', () => {
    const map = new Map([['a', 1]]);
    const invalidReducer = 'not a function' as unknown as () => number;
    expect(() => mapReduce(map, invalidReducer, 0)).toThrow(TypeError);
  });
});
