import { keyBy } from '../src/keyBy';

describe('keyBy', () => {
  // Test case 1: Group by a string key
  it('1. should group by a string key', () => {
    const array = [
      { id: 'a', name: 'apple' },
      { id: 'b', name: 'banana' },
      { id: 'c', name: 'carrot' },
    ];
    const result = keyBy(array, 'id');
    const expected = {
      a: { id: 'a', name: 'apple' },
      b: { id: 'b', name: 'banana' },
      c: { id: 'c', name: 'carrot' },
    };
    expect(result).toEqual(expected);
  });

  // Test case 2: Group by a number key
  it('2. should group by a number key', () => {
    const array = [
      { id: 1, name: 'apple' },
      { id: 2, name: 'banana' },
      { id: 3, name: 'carrot' },
    ];
    const result = keyBy(array, 'id');
    const expected = {
      '1': { id: 1, name: 'apple' },
      '2': { id: 2, name: 'banana' },
      '3': { id: 3, name: 'carrot' },
    };
    expect(result).toEqual(expected);
  });

  // Test case 3: Group by a boolean key
  it('3. should group by a boolean key', () => {
    const array = [
      { isFruit: true, name: 'apple' },
      { isFruit: true, name: 'banana' },
      { isFruit: false, name: 'carrot' },
    ];
    const result = keyBy(array, 'isFruit');
    const expected = {
      true: { isFruit: true, name: 'banana' },
      false: { isFruit: false, name: 'carrot' },
    };
    expect(result).toEqual(expected);
  });

  // Test case 4: Handle empty array
  it('4. should return an empty object for an empty array', () => {
    const array: Array<Record<string, unknown>> = [];
    const result = keyBy(array, 'id');
    const expected = {};
    expect(result).toEqual(expected);
  });

  // Test case 5: Handle array with no matching key
  it('5. should return an empty object if key does not exist', () => {
    const array = [
      { id: 'a', name: 'apple' },
      { id: 'b', name: 'banana' },
      { id: 'c', name: 'carrot' },
    ];
    const result = keyBy(array, 'nonExistentKey' as keyof (typeof array)[0]);
    const expected = {};
    expect(result).toEqual(expected);
  });
});
