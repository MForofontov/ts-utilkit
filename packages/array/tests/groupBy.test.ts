import { groupBy } from '../src/groupBy';

describe('groupBy', () => {
  // Test case 1: Normal array of objects
  it('1. should group a normal array of objects by a specific property', () => {
    const arr: { name: string; age: number }[] = [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 25 },
      { name: 'Charlie', age: 30 },
    ];
    const result = groupBy(arr, 'age');
    expect(result).toEqual({
      '25': [
        { name: 'Alice', age: 25 },
        { name: 'Bob', age: 25 },
      ],
      '30': [{ name: 'Charlie', age: 30 }],
    });
  });

  // Test case 2: Empty array
  it('2. should return an empty object when the array is empty', () => {
    const arr: { name: string; age: number }[] = [];
    const result = groupBy(arr, 'age');
    expect(result).toEqual({});
  });

  // Test case 3: Array of objects with different types of values
  it('3. should group an array of objects with different types of values', () => {
    const arr: { name: string; value: number | string | boolean }[] = [
      { name: 'Alice', value: 25 },
      { name: 'Bob', value: '25' },
      { name: 'Charlie', value: true },
    ];
    const result = groupBy(arr, 'value');
    expect(result).toEqual({
      '25': [
        { name: 'Alice', value: 25 },
        { name: 'Bob', value: '25' },
      ],
      true: [{ name: 'Charlie', value: true }],
    });
  });

  // Test case 4: Array of objects with nested properties
  it('4. should group an array of objects with nested properties', () => {
    const arr: { name: string; details: { age: number } }[] = [
      { name: 'Alice', details: { age: 25 } },
      { name: 'Bob', details: { age: 25 } },
      { name: 'Charlie', details: { age: 30 } },
    ];
    const result = groupBy(arr, 'details');
    expect(result).toEqual({
      '[object Object]': [
        { name: 'Alice', details: { age: 25 } },
        { name: 'Bob', details: { age: 25 } },
        { name: 'Charlie', details: { age: 30 } },
      ],
    });
  });

  // Test case 5: Array of objects with null and undefined values
  it('5. should group an array of objects with null and undefined values', () => {
    const arr: { name: string; value: number | null | undefined }[] = [
      { name: 'Alice', value: null },
      { name: 'Bob', value: undefined },
      { name: 'Charlie', value: 25 },
    ];
    const result = groupBy(arr, 'value');
    expect(result).toEqual({
      null: [{ name: 'Alice', value: null }],
      undefined: [{ name: 'Bob', value: undefined }],
      '25': [{ name: 'Charlie', value: 25 }],
    });
  });

  // Test case 6: Array of objects with NaN values
  it('6. should group an array of objects with NaN values', () => {
    const arr: { name: string; value: number }[] = [
      { name: 'Alice', value: NaN },
      { name: 'Bob', value: NaN },
      { name: 'Charlie', value: 25 },
    ];
    const result = groupBy(arr, 'value');
    expect(result).toEqual({
      NaN: [
        { name: 'Alice', value: NaN },
        { name: 'Bob', value: NaN },
      ],
      '25': [{ name: 'Charlie', value: 25 }],
    });
  });

  // Test case 7: Array of objects with special characters in keys
  it('7. should group an array of objects with special characters in keys', () => {
    const arr: { name: string; 'special-key': string }[] = [
      { name: 'Alice', 'special-key': '@' },
      { name: 'Bob', 'special-key': '#' },
      { name: 'Charlie', 'special-key': '@' },
    ];
    const result = groupBy(arr, 'special-key');
    expect(result).toEqual({
      '@': [
        { name: 'Alice', 'special-key': '@' },
        { name: 'Charlie', 'special-key': '@' },
      ],
      '#': [{ name: 'Bob', 'special-key': '#' }],
    });
  });

  // Test case 8: Array of objects with symbols as keys
  it('8. should group an array of objects with symbols as keys', () => {
    const sym1: symbol = Symbol('sym1');
    const sym2: symbol = Symbol('sym2');
    const arr: { name: string; key: symbol }[] = [
      { name: 'Alice', key: sym1 },
      { name: 'Bob', key: sym2 },
      { name: 'Charlie', key: sym1 },
    ];
    const result = groupBy(arr, 'key');
    expect(result).toEqual({
      [String(sym1)]: [
        { name: 'Alice', key: sym1 },
        { name: 'Charlie', key: sym1 },
      ],
      [String(sym2)]: [{ name: 'Bob', key: sym2 }],
    });
  });

  // Test case 9: Array of objects with dates as values
  it('9. should group an array of objects with dates as values', () => {
    const date1: Date = new Date(2020, 0, 1);
    const date2: Date = new Date(2021, 0, 1);
    const arr: { name: string; date: Date }[] = [
      { name: 'Alice', date: date1 },
      { name: 'Bob', date: date2 },
      { name: 'Charlie', date: date1 },
    ];
    const result = groupBy(arr, 'date');
    expect(result).toEqual({
      [String(date1)]: [
        { name: 'Alice', date: date1 },
        { name: 'Charlie', date: date1 },
      ],
      [String(date2)]: [{ name: 'Bob', date: date2 }],
    });
  });

  // Test case 10: Array of objects with functions as values
  it('10. should group an array of objects with functions as values', () => {
    const func1: () => number = () => 1;
    const func2: () => number = () => 2;
    const arr: { name: string; func: () => number }[] = [
      { name: 'Alice', func: func1 },
      { name: 'Bob', func: func2 },
      { name: 'Charlie', func: func1 },
    ];
    const result = groupBy(arr, 'func');
    expect(result).toEqual({
      [String(func1)]: [
        { name: 'Alice', func: func1 },
        { name: 'Charlie', func: func1 },
      ],
      [String(func2)]: [{ name: 'Bob', func: func2 }],
    });
  });

  // Test case 11: Large array of objects
  it('11. should group a large array of objects by a specific property', () => {
    const arr: { name: string; age: number }[] = Array.from(
      { length: 1000 },
      (_, i) => ({
        name: `Person ${i}`,
        age: i % 10,
      }),
    );
    const result = groupBy(arr, 'age');
    for (let i = 0; i < 10; i++) {
      expect(result[String(i)].length).toBe(100);
    }
  });

  // Test case 12: Grouping by string property
  it('12. should group objects by string property', () => {
    const arr: { id: number; category: string }[] = [
      { id: 1, category: 'fruit' },
      { id: 2, category: 'vegetable' },
      { id: 3, category: 'fruit' },
      { id: 4, category: 'meat' },
    ];
    const result = groupBy(arr, 'category');
    expect(result).toEqual({
      fruit: [
        { id: 1, category: 'fruit' },
        { id: 3, category: 'fruit' },
      ],
      vegetable: [{ id: 2, category: 'vegetable' }],
      meat: [{ id: 4, category: 'meat' }],
    });
  });

  // Test case 13: Grouping by boolean property
  it('13. should group objects by boolean property', () => {
    const arr: { id: number; completed: boolean }[] = [
      { id: 1, completed: true },
      { id: 2, completed: false },
      { id: 3, completed: true },
      { id: 4, completed: false },
    ];
    const result = groupBy(arr, 'completed');
    expect(result).toEqual({
      true: [
        { id: 1, completed: true },
        { id: 3, completed: true },
      ],
      false: [
        { id: 2, completed: false },
        { id: 4, completed: false },
      ],
    });
  });

  // Test case 14: Single item array
  it('14. should group single item array correctly', () => {
    const arr: { name: string; age: number }[] = [{ name: 'Alice', age: 25 }];
    const result = groupBy(arr, 'age');
    expect(result).toEqual({
      '25': [{ name: 'Alice', age: 25 }],
    });
  });

  // Test case 15: Array with all unique values
  it('15. should group array where all values are unique', () => {
    const arr: { id: number; value: number }[] = [
      { id: 1, value: 10 },
      { id: 2, value: 20 },
      { id: 3, value: 30 },
      { id: 4, value: 40 },
    ];
    const result = groupBy(arr, 'value');
    expect(result).toEqual({
      '10': [{ id: 1, value: 10 }],
      '20': [{ id: 2, value: 20 }],
      '30': [{ id: 3, value: 30 }],
      '40': [{ id: 4, value: 40 }],
    });
  });

  // Test case 16: Array with all same values
  it('16. should group array where all values are the same', () => {
    const arr: { id: number; status: string }[] = [
      { id: 1, status: 'active' },
      { id: 2, status: 'active' },
      { id: 3, status: 'active' },
    ];
    const result = groupBy(arr, 'status');
    expect(result).toEqual({
      active: [
        { id: 1, status: 'active' },
        { id: 2, status: 'active' },
        { id: 3, status: 'active' },
      ],
    });
  });

  // Test case 17: Grouping with empty strings
  it('17. should group objects with empty string values', () => {
    const arr: { id: number; name: string }[] = [
      { id: 1, name: '' },
      { id: 2, name: 'Alice' },
      { id: 3, name: '' },
    ];
    const result = groupBy(arr, 'name');
    expect(result).toEqual({
      '': [
        { id: 1, name: '' },
        { id: 3, name: '' },
      ],
      Alice: [{ id: 2, name: 'Alice' }],
    });
  });

  // Test case 18: Grouping with zero values
  it('18. should group objects with zero as property value', () => {
    const arr: { id: number; count: number }[] = [
      { id: 1, count: 0 },
      { id: 2, count: 1 },
      { id: 3, count: 0 },
    ];
    const result = groupBy(arr, 'count');
    expect(result).toEqual({
      '0': [
        { id: 1, count: 0 },
        { id: 3, count: 0 },
      ],
      '1': [{ id: 2, count: 1 }],
    });
  });

  // Test case 19: Grouping with negative numbers
  it('19. should group objects with negative number values', () => {
    const arr: { id: number; temperature: number }[] = [
      { id: 1, temperature: -5 },
      { id: 2, temperature: 0 },
      { id: 3, temperature: -5 },
      { id: 4, temperature: 10 },
    ];
    const result = groupBy(arr, 'temperature');
    expect(result).toEqual({
      '-5': [
        { id: 1, temperature: -5 },
        { id: 3, temperature: -5 },
      ],
      '0': [{ id: 2, temperature: 0 }],
      '10': [{ id: 4, temperature: 10 }],
    });
  });

  // Test case 20: Grouping with numeric strings
  it('20. should group objects treating numeric strings as distinct from numbers', () => {
    const arr: { id: number; code: string | number }[] = [
      { id: 1, code: '100' },
      { id: 2, code: 100 },
      { id: 3, code: '100' },
      { id: 4, code: 100 },
    ];
    const result = groupBy(arr, 'code');
    expect(result).toEqual({
      '100': [
        { id: 1, code: '100' },
        { id: 2, code: 100 },
        { id: 3, code: '100' },
        { id: 4, code: 100 },
      ],
    });
  });
});
