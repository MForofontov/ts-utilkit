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
});
