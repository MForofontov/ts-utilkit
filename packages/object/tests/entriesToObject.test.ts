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

});
