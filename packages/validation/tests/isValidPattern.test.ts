import { isValidPattern } from '../src/isValidPattern';

/**
 * Unit tests for the isValidPattern function.
 */
describe('isValidPattern', () => {
  // Test case 1: Basic pattern matching
  it('1. should return true for strings matching patterns', () => {
    expect(isValidPattern('ABC123', '[A-Z]{3}[0-9]{3}')).toBe(true);
    expect(isValidPattern('hello', 'h.*o')).toBe(true);
    expect(isValidPattern('test@example.com', '^[^@]+@[^@]+\\.[^@]+$')).toBe(
      true,
    );
    expect(
      isValidPattern('(555) 123-4567', '^\\([0-9]{3}\\) [0-9]{3}-[0-9]{4}$'),
    ).toBe(true);
  });

  // Test case 2: Pattern mismatches
  it('2. should return false for strings not matching patterns', () => {
    expect(isValidPattern('abc123', '[A-Z]{3}[0-9]{3}')).toBe(false);
    expect(isValidPattern('hello', '^world$')).toBe(false);
    expect(isValidPattern('invalid-email', '^[^@]+@[^@]+\\.[^@]+$')).toBe(
      false,
    );
    expect(
      isValidPattern('555-123-4567', '^\\([0-9]{3}\\) [0-9]{3}-[0-9]{4}$'),
    ).toBe(false);
  });

  // Test case 3: Case-insensitive patterns with flags
  it('3. should handle regex flags correctly', () => {
    expect(isValidPattern('abc123', '[A-Z]{3}[0-9]{3}', 'i')).toBe(true);
    expect(isValidPattern('ABC123', '[a-z]{3}[0-9]{3}', 'i')).toBe(true);
    expect(isValidPattern('Hello\nWorld', 'hello.*world', 'is')).toBe(true);
  });

  // Test case 4: Performance with various patterns
  it('4. should validate patterns efficiently', () => {
    const tests = [
      { input: 'ABC123', pattern: '[A-Z]{3}[0-9]{3}' },
      { input: 'test@example.com', pattern: '^[^@]+@[^@]+\\.[^@]+$' },
      { input: 'invalid', pattern: '[A-Z]+' },
      { input: '123-45-6789', pattern: '^[0-9]{3}-[0-9]{2}-[0-9]{4}$' },
    ];

    const startTime = performance.now();
    const results = tests.map((test) =>
      isValidPattern(test.input, test.pattern),
    );
    const endTime = performance.now();

    expect(results).toEqual([true, true, false, true]);
    expect(endTime - startTime).toBeLessThan(10);
  });

  // Test case 5: TypeError for invalid input types
  it('5. should throw TypeError for invalid input types', () => {
    const invalidInputs = [123, null, undefined, [], {}, true];

    invalidInputs.forEach((input) => {
      expect(() =>
        isValidPattern(input as unknown as string, '[A-Z]+'),
      ).toThrow(TypeError);
      expect(() => isValidPattern('test', input as unknown as string)).toThrow(
        TypeError,
      );
      expect(() =>
        isValidPattern('test', '[A-Z]+', input as unknown as string),
      ).toThrow(TypeError);
    });
  });

  // Test case 6: Error for invalid regex patterns
  it('6. should throw Error for invalid regex patterns', () => {
    const invalidPatterns = ['[', ')', '*', '+{', '(?'];

    invalidPatterns.forEach((pattern) => {
      expect(() => isValidPattern('test', pattern)).toThrow(Error);
      expect(() => isValidPattern('test', pattern)).toThrow(
        'Invalid regular expression pattern',
      );
    });
  });
});
