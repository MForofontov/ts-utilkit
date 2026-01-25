import { applyDefaults } from '../src/applyDefaults';

describe('applyDefaults', () => {
  // Test case 1: Apply defaults to an object with missing properties
  it('1. should apply defaults to an object with missing properties', () => {
    const obj = { a: 1 };
    const defaults = { a: 0, b: 2 };
    const result = applyDefaults(obj, defaults);
    const expected = { a: 1, b: 2 };
    expect(result).toEqual(expected);
  });

  // Test case 2: Apply defaults to an object with all properties present
  it('2. should not overwrite existing properties with defaults', () => {
    const obj = { a: 1, b: 2 };
    const defaults = { a: 0, b: 3 };
    const result = applyDefaults(obj, defaults);
    const expected = { a: 1, b: 2 };
    expect(result).toEqual(expected);
  });

  // Test case 3: Apply defaults to an empty object
  it('3. should apply defaults to an empty object', () => {
    const obj = {};
    const defaults = { a: 1, b: 2 };
    const result = applyDefaults(
      obj as unknown as Record<string, unknown>,
      defaults,
    );
    const expected = { a: 1, b: 2 };
    expect(result).toEqual(expected);
  });

  // Test case 4: Handle empty defaults
  it('4. should return the input object if defaults are empty', () => {
    const obj = { a: 1, b: 2 };
    const defaults = {};
    const result = applyDefaults(obj, defaults);
    const expected = { a: 1, b: 2 };
    expect(result).toEqual(expected);
  });

  // Test case 5: Handle both input objects being empty
  it('5. should return an empty object if both inputs are empty', () => {
    const obj = {};
    const defaults = {};
    const result = applyDefaults(obj, defaults);
    const expected = {};
    expect(result).toEqual(expected);
  });

  // Test case 6: Handle non-object input for the first parameter (number)
  it('6. should throw a TypeError if the first input is a number', () => {
    expect(() =>
      applyDefaults(42 as unknown as Record<string, unknown>, { a: 1 }),
    ).toThrow(TypeError);
  });

  // Test case 7: Handle non-object input for the first parameter (string)
  it('7. should throw a TypeError if the first input is a string', () => {
    expect(() =>
      applyDefaults('string' as unknown as Record<string, unknown>, { a: 1 }),
    ).toThrow(TypeError);
  });

  // Test case 8: Handle non-object input for the first parameter (boolean)
  it('8. should throw a TypeError if the first input is a boolean', () => {
    expect(() =>
      applyDefaults(true as unknown as Record<string, unknown>, { a: 1 }),
    ).toThrow(TypeError);
  });

  // Test case 9: Handle non-object input for the first parameter (null)
  it('9. should throw a TypeError if the first input is null', () => {
    expect(() =>
      applyDefaults(null as unknown as Record<string, unknown>, { a: 1 }),
    ).toThrow(TypeError);
  });

  // Test case 10: Handle non-object input for the first parameter (undefined)
  it('10. should throw a TypeError if the first input is undefined', () => {
    expect(() =>
      applyDefaults(undefined as unknown as Record<string, unknown>, { a: 1 }),
    ).toThrow(TypeError);
  });

  // Test case 11: Handle non-object input for the second parameter (number)
  it('11. should throw a TypeError if the second input is a number', () => {
    expect(() =>
      applyDefaults({ a: 1 }, 42 as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 12: Handle non-object input for the second parameter (string)
  it('12. should throw a TypeError if the second input is a string', () => {
    expect(() =>
      applyDefaults({ a: 1 }, 'string' as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 13: Handle non-object input for the second parameter (boolean)
  it('13. should throw a TypeError if the second input is a boolean', () => {
    expect(() =>
      applyDefaults({ a: 1 }, true as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 14: Handle non-object input for the second parameter (null)
  it('14. should throw a TypeError if the second input is null', () => {
    expect(() =>
      applyDefaults({ a: 1 }, null as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 15: Handle non-object input for the second parameter (undefined)
  it('15. should throw a TypeError if the second input is undefined', () => {
    expect(() =>
      applyDefaults({ a: 1 }, undefined as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });
});
