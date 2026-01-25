import { sortBy } from '../src/sortBy';

describe('sortBy', () => {
  // Test case 1: Sorting an array of objects by a numeric key
  test('1. should sort an array of objects by a numeric key', () => {
    const array: { id: number; name: string }[] = [
      { id: 3, name: 'Charlie' },
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];
    const result: { id: number; name: string }[] = sortBy(array, 'id');
    expect(result).toEqual([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ]);
  });

  // Test case 2: Sorting an array of objects by a string key
  test('2. should sort an array of objects by a string key', () => {
    const array: { id: number; name: string }[] = [
      { id: 3, name: 'Charlie' },
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];
    const result: { id: number; name: string }[] = sortBy(array, 'name');
    expect(result).toEqual([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ]);
  });

  // Test case 3: Sorting an array of objects by a boolean key
  test('3. should sort an array of objects by a boolean key', () => {
    const array: { id: number; active: boolean }[] = [
      { id: 3, active: false },
      { id: 1, active: true },
      { id: 2, active: false },
    ];
    const result: { id: number; active: boolean }[] = sortBy(array, 'active');
    expect(result).toEqual([
      { id: 1, active: true },
      { id: 3, active: false },
      { id: 2, active: false },
    ]);
  });

  // Test case 4: Sorting an array of objects by a Date key
  test('4. should sort an array of objects by a Date key', () => {
    const date1: Date = new Date('2021-01-01');
    const date2: Date = new Date('2022-01-01');
    const date3: Date = new Date('2023-01-01');
    const array: { id: number; date: Date }[] = [
      { id: 3, date: date3 },
      { id: 1, date: date1 },
      { id: 2, date: date2 },
    ];
    const result: { id: number; date: Date }[] = sortBy(array, 'date');
    expect(result).toEqual([
      { id: 1, date: date1 },
      { id: 2, date: date2 },
      { id: 3, date: date3 },
    ]);
  });

  // Test case 5: Sorting an array of objects by a BigInt key
  test('5. should sort an array of objects by a BigInt key', () => {
    const array: { id: number; value: bigint }[] = [
      { id: 3, value: BigInt(3) },
      { id: 1, value: BigInt(1) },
      { id: 2, value: BigInt(2) },
    ];
    const result: { id: number; value: bigint }[] = sortBy(array, 'value');
    expect(result).toEqual([
      { id: 1, value: BigInt(1) },
      { id: 2, value: BigInt(2) },
      { id: 3, value: BigInt(3) },
    ]);
  });

  // Test case 6: Sorting an empty array
  test('6. should return an empty array when the input array is empty', () => {
    const array: [] = [];
    const result = sortBy(array, 'id');
    expect(result).toEqual([]);
  });

  // Test case 7: Sorting an array with one element
  test('7. should return the same array when the input array has one element', () => {
    const array: { id: number; name: string }[] = [{ id: 1, name: 'Alice' }];
    const result: { id: number; name: string }[] = sortBy(array, 'id');
    expect(result).toEqual([{ id: 1, name: 'Alice' }]);
  });

  // Test case 8: Sorting an array of objects with unsupported types
  test('8. should throw an error when sorting an array of objects with unsupported types', () => {
    const array: { id: number; value: symbol }[] = [
      { id: 3, value: Symbol('sym3') },
      { id: 1, value: Symbol('sym1') },
      { id: 2, value: Symbol('sym2') },
    ];
    expect(() => sortBy(array, 'value')).toThrow(
      'Unsupported types for sorting: symbol and symbol',
    );
  });
});
