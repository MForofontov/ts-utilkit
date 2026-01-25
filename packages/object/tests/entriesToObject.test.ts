import { entriesToObject } from '../src/entriesToObject';

describe('entriesToObject', () => {
  // Test case 1: Convert valid entries to an object
  it('1. should convert valid entries to an object', () => {
    const entries: [string, number][] = [
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ];
    const result = entriesToObject(entries);
    const expected = { a: 1, b: 2, c: 3 };
    expect(result).toEqual(expected);
  });

  // Test case 2: Handle empty entries array
  it('2. should return an empty object for an empty entries array', () => {
    const entries: [string, unknown][] = [];
    const result = entriesToObject(entries);
    const expected = {};
    expect(result).toEqual(expected);
  });

  // Test case 3: Handle entries with duplicate keys
  it('3. should use the last value for duplicate keys', () => {
    const entries: [string, number][] = [
      ['a', 1],
      ['b', 2],
      ['a', 3],
    ];
    const result = entriesToObject(entries);
    const expected = { a: 3, b: 2 };
    expect(result).toEqual(expected);
  });

  // Test case 4: Handle entries with various value types
  it('4. should handle entries with various value types', () => {
    const entries: [string, number | string | boolean | null | undefined][] = [
      ['a', 1],
      ['b', 'string'],
      ['c', true],
      ['d', null],
      ['e', undefined],
    ];
    const result = entriesToObject(entries);
    const expected = { a: 1, b: 'string', c: true, d: null, e: undefined };
    expect(result).toEqual(expected);
  });

  // Test case 5: Handle entries with non-string keys
  it('5. should throw a TypeError if an entry has a non-string key', () => {
    const entries: [string, unknown][] = [[123 as unknown as string, 'value']];
    expect(() => entriesToObject(entries)).toThrow(TypeError);
  });

  // Test case 6: Handle entries with invalid structure
  it('6. should throw a TypeError if an entry is not a [string, any] pair', () => {
    const entries: unknown[] = [['a', 1], ['b'], 'invalid'];
    expect(() =>
      entriesToObject(entries as unknown as [string, unknown][]),
    ).toThrow(TypeError);
  });

  // Test case 7: Handle non-array input
  it('7. should throw a TypeError if input is not an array', () => {
    expect(() => entriesToObject(42 as unknown as [string, unknown][])).toThrow(
      TypeError,
    );
  });

  // Test case 8: Handle null input
  it('8. should throw a TypeError if input is null', () => {
    expect(() =>
      entriesToObject(null as unknown as [string, unknown][]),
    ).toThrow(TypeError);
  });

  // Test case 9: Handle undefined input
  it('9. should throw a TypeError if input is undefined', () => {
    expect(() =>
      entriesToObject(undefined as unknown as [string, unknown][]),
    ).toThrow(TypeError);
  });
});
