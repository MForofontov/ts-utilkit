import { setNestedValue } from '../src/setNestedValue';

describe('setNestedValue', () => {
  // Test case 1: Set a nested value in a simple object
  it('1. should set a nested value in a simple object', () => {
    const obj = { a: { b: { c: 3 } } };
    setNestedValue(obj, 'a.b.c', 4);
    const expected = { a: { b: { c: 4 } } };
    expect(obj).toEqual(expected);
  });

  // Test case 2: Set a nested value in a nested object
  it('2. should set a nested value in a nested object', () => {
    const obj = { a: { b: { c: { d: 4 } } } };
    setNestedValue(obj, 'a.b.c.d', 5);
    const expected = { a: { b: { c: { d: 5 } } } };
    expect(obj).toEqual(expected);
  });

  // Test case 3: Set a nested value in an array
  it('3. should set a nested value in an array', () => {
    const obj = { a: [{ b: 2 }, { c: 3 }] };
    setNestedValue(obj, 'a.1.c', 4);
    const expected = { a: [{ b: 2 }, { c: 4 }] };
    expect(obj).toEqual(expected);
  });

  // Test case 4: Set a nested value in an object with various data types
  it('4. should set a nested value in an object with various data types', () => {
    const obj = {
      a: {
        b: {
          c: true,
          d: 'string',
          e: null,
          f: undefined,
          g: [1, 2, 3],
          h: { i: 4 },
        },
      },
    };
    setNestedValue(obj, 'a.b.h.i', 5);
    const expected = {
      a: {
        b: {
          c: true,
          d: 'string',
          e: null,
          f: undefined,
          g: [1, 2, 3],
          h: { i: 5 },
        },
      },
    };
    expect(obj).toEqual(expected);
  });

  // Test case 5: Create a nested path if it does not exist
  it('5. should create a nested path if it does not exist', () => {
    const obj = { a: 1 };
    setNestedValue(obj, 'b.c.d', 2);
    const expected = { a: 1, b: { c: { d: 2 } } };
    expect(obj).toEqual(expected);
  });

  // Test case 6: Handle non-object input (number)
  it('6. should throw a TypeError if input is a number', () => {
    expect(() =>
      setNestedValue(42 as unknown as Record<string, unknown>, 'a.b.c', 4),
    ).toThrow(TypeError);
  });

  // Test case 7: Handle non-object input (string)
  it('7. should throw a TypeError if input is a string', () => {
    expect(() =>
      setNestedValue(
        'string' as unknown as Record<string, unknown>,
        'a.b.c',
        4,
      ),
    ).toThrow(TypeError);
  });

  // Test case 8: Handle non-object input (boolean)
  it('8. should throw a TypeError if input is a boolean', () => {
    expect(() =>
      setNestedValue(true as unknown as Record<string, unknown>, 'a.b.c', 4),
    ).toThrow(TypeError);
  });

  // Test case 9: Handle non-object input (null)
  it('9. should throw a TypeError if input is null', () => {
    expect(() =>
      setNestedValue(null as unknown as Record<string, unknown>, 'a.b.c', 4),
    ).toThrow(TypeError);
  });

  // Test case 10: Handle non-object input (undefined)
  it('10. should throw a TypeError if input is undefined', () => {
    expect(() =>
      setNestedValue(
        undefined as unknown as Record<string, unknown>,
        'a.b.c',
        4,
      ),
    ).toThrow(TypeError);
  });
});
