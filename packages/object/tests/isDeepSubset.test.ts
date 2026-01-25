import { isDeepSubset } from '../src/isDeepSubset';

describe('isDeepSubset', () => {
  // Test case 1: Subset matches the object
  it('1. should return true if subset matches the object', () => {
    const subset = { a: 1, b: 2 };
    const obj = { a: 1, b: 2, c: 3 };
    const result = isDeepSubset(subset, obj);
    expect(result).toBe(true);
  });

  // Test case 2: Subset does not match the object
  it('2. should return false if subset does not match the object', () => {
    const subset = { a: 1, b: 4 };
    const obj = { a: 1, b: 2, c: 3 };
    const result = isDeepSubset(subset, obj);
    expect(result).toBe(false);
  });

  // Test case 3: Nested subset matches the object
  it('3. should return true if nested subset matches the object', () => {
    const subset = { a: { b: 2 } };
    const obj = { a: { b: 2, c: 3 }, d: 4 };
    const result = isDeepSubset(subset, obj);
    expect(result).toBe(true);
  });

  // Test case 4: Nested subset does not match the object
  it('4. should return false if nested subset does not match the object', () => {
    const subset = { a: { b: 5 } };
    const obj = { a: { b: 2, c: 3 }, d: 4 };
    const result = isDeepSubset(subset, obj);
    expect(result).toBe(false);
  });

  // Test case 5: Empty subset
  it('5. should return true if subset is empty', () => {
    const subset = {};
    const obj = { a: 1, b: 2 };
    const result = isDeepSubset(subset, obj);
    expect(result).toBe(true);
  });

  // Test case 6: Subset with null values
  it('6. should return true if subset with null values matches the object', () => {
    const subset = { a: null };
    const obj = { a: null, b: 2 };
    const result = isDeepSubset(subset, obj);
    expect(result).toBe(true);
  });

  // Test case 7: Subset with undefined values
  it('7. should return false if subset with undefined values does not match the object', () => {
    const subset = { a: undefined } as unknown as Record<string, unknown>;
    const obj = { a: 1, b: 2 };
    const result = isDeepSubset(subset, obj);
    expect(result).toBe(false);
  });

  // Test case 8: Subset with array values
  it('8. should return true if subset with array values matches the object', () => {
    const subset = { a: [1, 2] };
    const obj = { a: [1, 2, 3], b: 4 };
    const result = isDeepSubset(subset, obj);
    expect(result).toBe(true);
  });

  // Test case 9: Subset with mismatched array values
  it('9. should return false if subset with array values does not match the object', () => {
    const subset = { a: [1, 3] };
    const obj = { a: [1, 2, 3], b: 4 };
    const result = isDeepSubset(subset, obj);
    expect(result).toBe(false);
  });

  // Test case 10: Subset with nested arrays
  it('10. should return true if subset with nested arrays matches the object', () => {
    const subset = { a: { b: [1, 2] } };
    const obj = { a: { b: [1, 2, 3] }, c: 4 };
    const result = isDeepSubset(subset, obj);
    expect(result).toBe(true);
  });

  // Test case 11: Subset with mismatched nested arrays
  it('11. should return false if subset with nested arrays does not match the object', () => {
    const subset = { a: { b: [1, 4] } };
    const obj = { a: { b: [1, 2, 3] }, c: 4 };
    const result = isDeepSubset(subset, obj);
    expect(result).toBe(false);
  });

  // Test case 12: Subset with different data types
  it('12. should return false if subset has mismatched data types', () => {
    const subset = { a: '1' } as unknown as Record<string, unknown>;
    const obj = { a: 1, b: 2 };
    const result = isDeepSubset(subset, obj);
    expect(result).toBe(false);
  });

  // Test case 13: Subset with additional keys in the object
  it('13. should return true if subset matches even with additional keys in the object', () => {
    const subset = { a: 1 };
    const obj = { a: 1, b: 2, c: 3 };
    const result = isDeepSubset(subset, obj);
    expect(result).toBe(true);
  });

  // Test case 14: Subset with empty nested object
  it('14. should return true if subset has an empty nested object', () => {
    const subset = { a: {} };
    const obj = { a: { b: 1 }, c: 2 };
    const result = isDeepSubset(subset, obj);
    expect(result).toBe(true);
  });

  // Test case 15: Subset with mismatched nested object
  it('15. should return false if subset has a mismatched nested object', () => {
    const subset = { a: { b: 2 } };
    const obj = { a: { b: 1 }, c: 2 };
    const result = isDeepSubset(subset, obj);
    expect(result).toBe(false);
  });

  // Test case 16: Subset with deep nesting
  it('16. should return true if deeply nested subset matches the object', () => {
    const subset = { a: { b: { c: { d: 1 } } } };
    const obj = { a: { b: { c: { d: 1, e: 2 } }, f: 3 }, g: 4 };
    const result = isDeepSubset(subset, obj);
    expect(result).toBe(true);
  });

  // Test case 17: Subset with mismatched deep nesting
  it('17. should return false if deeply nested subset does not match the object', () => {
    const subset = { a: { b: { c: { d: 2 } } } };
    const obj = { a: { b: { c: { d: 1, e: 2 } }, f: 3 }, g: 4 };
    const result = isDeepSubset(subset, obj);
    expect(result).toBe(false);
  });

  // Test case 18: Missing nested key should return false without throwing
  it('18. should return false if nested key is missing in the object', () => {
    const subset = { a: { b: 2 } } as Record<string, unknown>;
    const obj = { a: 1 } as Record<string, unknown>;

    expect(() => isDeepSubset(subset, obj)).not.toThrow();
    expect(isDeepSubset(subset, obj)).toBe(false);
  });

  // Error-handling test cases

  // Test case 19: Handle non-object subset
  it('19. should throw a TypeError if subset is not an object', () => {
    expect(() =>
      isDeepSubset(null as unknown as Record<string, unknown>, { a: 1 }),
    ).toThrow(TypeError);
  });

  // Test case 20: Handle non-object obj
  it('20. should throw a TypeError if obj is not an object', () => {
    expect(() =>
      isDeepSubset({ a: 1 }, null as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 21: Handle both subset and obj as non-objects
  it('21. should throw a TypeError if both subset and obj are not objects', () => {
    expect(() =>
      isDeepSubset(
        null as unknown as Record<string, unknown>,
        null as unknown as Record<string, unknown>,
      ),
    ).toThrow(TypeError);
  });
});
