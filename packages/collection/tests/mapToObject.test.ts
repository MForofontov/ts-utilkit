import { mapToObject } from '../src/mapToObject';

describe('mapToObject', () => {
  it('1. should convert map to object', () => {
    const map = new Map<string, string | number>([
      ['name', 'John'],
      ['age', 30],
    ]);
    const result = mapToObject(map);
    expect(result).toEqual({ name: 'John', age: 30 });
  });

  it('2. should handle symbol keys', () => {
    const sym = Symbol('id');
    const map = new Map<string | symbol, string | number>([
      ['name', 'John'],
      [sym, 123],
    ]);
    const result = mapToObject(map);
    expect(result).toEqual({ name: 'John', [sym]: 123 });
  });

  it('3. should handle empty map', () => {
    const map = new Map<string, number>();
    const result = mapToObject(map);
    expect(result).toEqual({});
  });

  it('4. should handle numeric string keys', () => {
    const map = new Map([
      ['1', 'a'],
      ['2', 'b'],
    ]);
    const result = mapToObject(map);
    expect(result).toEqual({ '1': 'a', '2': 'b' });
  });

  it('5. should throw TypeError when map is not a Map', () => {
    const invalidMap = { a: 1 } as unknown as Map<string, number>;
    expect(() => mapToObject(invalidMap)).toThrow(TypeError);
  });

  it('6. should throw Error for non-string non-symbol keys', () => {
    const map = new Map([[1 as any, 'value']]);
    expect(() => mapToObject(map as any)).toThrow(
      'Map keys must be strings or symbols',
    );
  });
});
