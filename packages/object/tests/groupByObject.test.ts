import { groupByObject } from '../src/groupByObject';

describe('groupByObject', () => {
  // Test case 1: Group by a string key
  it('1. should group by a string key', () => {
    const array = [
      { category: 'fruit', name: 'apple' },
      { category: 'fruit', name: 'banana' },
      { category: 'vegetable', name: 'carrot' },
    ];
    const result = groupByObject(array, 'category');
    const expected = {
      fruit: [
        { category: 'fruit', name: 'apple' },
        { category: 'fruit', name: 'banana' },
      ],
      vegetable: [{ category: 'vegetable', name: 'carrot' }],
    };
    expect(result).toEqual(expected);
  });

  // Test case 2: Group by a number key
  it('2. should group by a number key', () => {
    const array = [
      { id: 1, name: 'apple' },
      { id: 2, name: 'banana' },
      { id: 1, name: 'carrot' },
    ];
    const result = groupByObject(array, 'id');
    const expected = {
      '1': [
        { id: 1, name: 'apple' },
        { id: 1, name: 'carrot' },
      ],
      '2': [{ id: 2, name: 'banana' }],
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
    const result = groupByObject(array, 'isFruit');
    const expected = {
      true: [
        { isFruit: true, name: 'apple' },
        { isFruit: true, name: 'banana' },
      ],
      false: [{ isFruit: false, name: 'carrot' }],
    };
    expect(result).toEqual(expected);
  });

  // Test case 4: Group by a key with undefined values
  it('4. should group by a key with undefined values', () => {
    const array = [
      { category: 'fruit', name: 'apple' },
      { category: undefined, name: 'banana' },
      { category: 'vegetable', name: 'carrot' },
    ];
    const result = groupByObject(array, 'category');
    const expected = {
      fruit: [{ category: 'fruit', name: 'apple' }],
      undefined: [{ category: undefined, name: 'banana' }],
      vegetable: [{ category: 'vegetable', name: 'carrot' }],
    };
    expect(result).toEqual(expected);
  });

  // Test case 5: Group by a key with null values
  it('5. should group by a key with null values', () => {
    const array = [
      { category: 'fruit', name: 'apple' },
      { category: null, name: 'banana' },
      { category: 'vegetable', name: 'carrot' },
    ];
    const result = groupByObject(array, 'category');
    const expected = {
      fruit: [{ category: 'fruit', name: 'apple' }],
      null: [{ category: null, name: 'banana' }],
      vegetable: [{ category: 'vegetable', name: 'carrot' }],
    };
    expect(result).toEqual(expected);
  });

  // Test case 6: Handle empty array
  it('6. should return an empty object for an empty array', () => {
    const array: Array<Record<string, unknown>> = [];
    const result = groupByObject(array, 'category');
    const expected = {};
    expect(result).toEqual(expected);
  });

  // Test case 7: Handle array with no matching key
  it('7. should return an empty object if key does not exist', () => {
    const array = [
      { category: 'fruit', name: 'apple' },
      { category: 'fruit', name: 'banana' },
      { category: 'vegetable', name: 'carrot' },
    ];
    const result = groupByObject(
      array,
      'nonExistentKey' as keyof (typeof array)[0],
    );
    const expected = {};
    expect(result).toEqual(expected);
  });

  // Test case 8: Handle array with mixed types
  it('8. should group by a key with mixed types', () => {
    const array = [
      { category: 'fruit', name: 'apple' },
      { category: 1, name: 'banana' },
      { category: 'vegetable', name: 'carrot' },
    ];
    const result = groupByObject(array, 'category');
    const expected = {
      fruit: [{ category: 'fruit', name: 'apple' }],
      '1': [{ category: 1, name: 'banana' }],
      vegetable: [{ category: 'vegetable', name: 'carrot' }],
    };
    expect(result).toEqual(expected);
  });

  // Test case 9: Handle non-array input (number)
  it('9. should throw a TypeError if input is not an array', () => {
    expect(() =>
      groupByObject(
        42 as unknown as Array<Record<string, unknown>>,
        'category',
      ),
    ).toThrow(TypeError);
  });

  // Test case 10: Handle non-array input (string)
  it('10. should throw a TypeError if input is a string', () => {
    expect(() =>
      groupByObject(
        'string' as unknown as Array<Record<string, unknown>>,
        'category',
      ),
    ).toThrow(TypeError);
  });

  // Test case 11: Handle non-array input (boolean)
  it('11. should throw a TypeError if input is a boolean', () => {
    expect(() =>
      groupByObject(
        true as unknown as Array<Record<string, unknown>>,
        'category',
      ),
    ).toThrow(TypeError);
  });

  // Test case 12: Handle null input
  it('12. should throw a TypeError if input is null', () => {
    expect(() =>
      groupByObject(
        null as unknown as Array<Record<string, unknown>>,
        'category',
      ),
    ).toThrow(TypeError);
  });

  // Test case 13: Handle undefined input
  it('13. should throw a TypeError if input is undefined', () => {
    expect(() =>
      groupByObject(
        undefined as unknown as Array<Record<string, unknown>>,
        'category',
      ),
    ).toThrow(TypeError);
  });
});
