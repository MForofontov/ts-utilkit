import { objectToMap } from '../src/objectToMap';

describe('objectToMap', () => {
  it('1. should convert object to map', () => {
    const obj = { name: 'John', age: 30 };
    const result = objectToMap(obj);
    expect(result).toEqual(
      new Map<string, string | number>([
        ['name', 'John'],
        ['age', 30],
      ]),
    );
  });

  it('2. should handle symbol keys', () => {
    const sym = Symbol('id');
    const obj: Record<string | symbol, string | number> = {
      name: 'John',
      [sym]: 123,
    };
    const result = objectToMap(obj);
    expect(result).toEqual(
      new Map<string | symbol, string | number>([
        ['name', 'John'],
        [sym, 123],
      ]),
    );
  });

  it('3. should handle empty object', () => {
    const obj = {};
    const result = objectToMap(obj);
    expect(result).toEqual(new Map());
  });

  it('4. should only include own enumerable properties', () => {
    const obj = Object.create({ inherited: 'value' });
    obj.own = 'ownValue';
    const result = objectToMap(obj);
    expect(result).toEqual(new Map([['own', 'ownValue']]));
  });

  it('5. should handle numeric string keys', () => {
    const obj = { '1': 'a', '2': 'b' };
    const result = objectToMap(obj);
    expect(result).toEqual(
      new Map([
        ['1', 'a'],
        ['2', 'b'],
      ]),
    );
  });

  it('6. should throw TypeError when obj is null', () => {
    const invalidObj = null as unknown as Record<string, any>;
    expect(() => objectToMap(invalidObj)).toThrow(TypeError);
  });

  it('7. should throw TypeError when obj is not an object', () => {
    const invalidObj = 'not an object' as unknown as Record<string, any>;
    expect(() => objectToMap(invalidObj)).toThrow(TypeError);
  });
});
