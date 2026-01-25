import { sanitizeForSerialization } from '../src/sanitizeForSerialization';

/**
 * Unit tests for the sanitizeForSerialization function.
 */
describe('sanitizeForSerialization', () => {
  // Normal/typical usage
  it('1. should remove functions from object', () => {
    // Arrange
    const input = { a: 1, b: () => {}, c: 2 };
    const expected = { a: 1, c: 2 };

    // Act
    const result = sanitizeForSerialization(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('2. should remove symbols from object', () => {
    // Arrange
    const sym = Symbol('test');
    const input = { a: 1, [sym]: 'value', b: 2 };
    const expected = { a: 1, b: 2 };

    // Act
    const result = sanitizeForSerialization(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('3. should remove undefined values', () => {
    // Arrange
    const input = { a: 1, b: undefined, c: 2 };
    const expected = { a: 1, c: 2 };

    // Act
    const result = sanitizeForSerialization(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('4. should keep null values by default', () => {
    // Arrange
    const input = { a: 1, b: null, c: 2 };
    const expected = { a: 1, b: null, c: 2 };

    // Act
    const result = sanitizeForSerialization(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('5. should remove null values when removeNull is true', () => {
    // Arrange
    const input = { a: 1, b: null, c: 2 };
    const expected = { a: 1, c: 2 };

    // Act
    const result = sanitizeForSerialization(input, true);

    // Assert
    expect(result).toEqual(expected);
  });

  it('6. should sanitize nested objects', () => {
    // Arrange
    const input = { a: { b: () => {}, c: 1 }, d: 2 };
    const expected = { a: { c: 1 }, d: 2 };

    // Act
    const result = sanitizeForSerialization(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('7. should sanitize arrays', () => {
    // Arrange
    const input = [1, () => {}, 2, undefined, 3];
    const expected = [1, 2, 3];

    // Act
    const result = sanitizeForSerialization(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('8. should sanitize array of objects', () => {
    // Arrange
    const input = [
      { a: 1, b: () => {} },
      { c: 2, d: undefined },
    ];
    const expected = [{ a: 1 }, { c: 2 }];

    // Act
    const result = sanitizeForSerialization(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Edge cases
  it('9. should handle empty object', () => {
    // Arrange
    const input = {};
    const expected = {};

    // Act
    const result = sanitizeForSerialization(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('10. should handle empty array', () => {
    // Arrange
    const input: any[] = [];
    const expected: any[] = [];

    // Act
    const result = sanitizeForSerialization(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('11. should handle object with only non-serializable values', () => {
    // Arrange
    const input = { a: () => {}, b: Symbol('x'), c: undefined };
    const expected = {};

    // Act
    const result = sanitizeForSerialization(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('12. should preserve serializable values', () => {
    // Arrange
    const input = {
      str: 'hello',
      num: 42,
      bool: true,
      arr: [1, 2],
      obj: { a: 1 },
    };
    const expected = {
      str: 'hello',
      num: 42,
      bool: true,
      arr: [1, 2],
      obj: { a: 1 },
    };

    // Act
    const result = sanitizeForSerialization(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('13. should handle deeply nested structure', () => {
    // Arrange
    const input = { a: { b: { c: { d: () => {}, e: 'value' } } } };
    const expected = { a: { b: { c: { e: 'value' } } } };

    // Act
    const result = sanitizeForSerialization(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('14. should not modify original object', () => {
    // Arrange
    const input = { a: 1, b: () => {}, c: 2 };
    const original = { ...input };

    // Act
    sanitizeForSerialization(input);

    // Assert
    expect(input).toEqual(original);
  });

  // Error cases
  it('15. should throw TypeError when removeNull is not boolean', () => {
    // Arrange
    const input = { a: 1 };
    const invalidRemoveNull: any = 'true';
    const expectedMessage = 'removeNull must be a boolean, got string';

    // Act & Assert
    expect(() => sanitizeForSerialization(input, invalidRemoveNull)).toThrow(
      TypeError,
    );
    expect(() => sanitizeForSerialization(input, invalidRemoveNull)).toThrow(
      expectedMessage,
    );
  });
});
