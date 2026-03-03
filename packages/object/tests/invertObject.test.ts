import { invertObject } from '../src/invertObject';

describe('invertObject', () => {
  // Test case 1: Invert a simple object
  it('1. should invert a simple object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = invertObject(obj);
    const expected = { '1': 'a', '2': 'b', '3': 'c' };
    expect(result).toEqual(expected);
  });

  // Test case 2: Invert an object with string values
  it('2. should invert an object with string values', () => {
    const obj = { a: 'x', b: 'y', c: 'z' };
    const result = invertObject(obj);
    const expected = { x: 'a', y: 'b', z: 'c' };
    expect(result).toEqual(expected);
  });

  // Test case 3: Invert an object with mixed values
  it('3. should invert an object with mixed values', () => {
    const obj = { a: 1, b: 'x', c: true };
    const result = invertObject(obj);
    const expected = { '1': 'a', x: 'b', true: 'c' };
    expect(result).toEqual(expected);
  });

  // Test case 4: Invert an object with duplicate values
  it('4. should invert an object with duplicate values', () => {
    const obj = { a: 1, b: 1, c: 2 };
    const result = invertObject(obj);
    const expected = { '1': 'b', '2': 'c' }; // Last key with the same value should be used
    expect(result).toEqual(expected);
  });

  // Test case 5: Invert an object with arrays
  it('5. should invert an object with arrays', () => {
    const obj = { a: [1, 2], b: [3, 4] };
    const result = invertObject(obj);
    const expected = { '1,2': 'a', '3,4': 'b' };
    expect(result).toEqual(expected);
  });

});
