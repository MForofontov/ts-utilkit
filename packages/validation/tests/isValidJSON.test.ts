import { isValidJSON } from '../src/isValidJSON';

/**
 * Unit tests for the isValidJSON function.
 */
describe('isValidJSON', () => {
  // Test case 1: Valid JSON strings
  it('1. should return true for valid JSON strings', () => {
    expect(isValidJSON('{"name": "John", "age": 30}')).toBe(true);
    expect(isValidJSON('["apple", "banana", "cherry"]')).toBe(true);
    expect(isValidJSON('"hello world"')).toBe(true);
    expect(isValidJSON('123')).toBe(true);
    expect(isValidJSON('true')).toBe(true);
    expect(isValidJSON('false')).toBe(true);
    expect(isValidJSON('null')).toBe(true);
  });

  // Test case 2: Invalid JSON strings
  it('2. should return false for invalid JSON strings', () => {
    expect(isValidJSON('{"name": "John", "age": 30,}')).toBe(false);
    expect(isValidJSON("{'name': 'John'}")).toBe(false);
    expect(isValidJSON('{name: "John"}')).toBe(false);
    expect(isValidJSON('undefined')).toBe(false);
    expect(isValidJSON('')).toBe(false);
    expect(isValidJSON('{')).toBe(false);
    expect(isValidJSON('}')).toBe(false);
  });

  // Test case 3: Performance with various JSON strings
  it('3. should validate JSON strings efficiently', () => {
    const jsonStrings = [
      '{"valid": true}',
      '["array", "of", "strings"]',
      '{"invalid": json}',
      'null',
      '123',
    ];

    const startTime = performance.now();
    const results = jsonStrings.map((json) => isValidJSON(json));
    const endTime = performance.now();

    expect(results).toEqual([true, true, false, true, true]);
    expect(endTime - startTime).toBeLessThan(10);
  });

  // Test case 4: TypeError for invalid input types
  it('4. should throw TypeError for invalid input types', () => {
    const invalidInputs = [123, null, undefined, [], {}, true];

    invalidInputs.forEach((input) => {
      expect(() => isValidJSON(input as unknown as string)).toThrow(TypeError);
      expect(() => isValidJSON(input as unknown as string)).toThrow(
        'jsonString must be a string, got',
      );
    });
  });
});
