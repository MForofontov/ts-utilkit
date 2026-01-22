import { flattenForSerialization } from '../src/flattenForSerialization';

/**
 * Unit tests for the flattenForSerialization function.
 */
describe('flattenForSerialization', () => {
  // Normal/typical usage
  it('1. should flatten simple nested object', () => {
    // Arrange
    const input = { a: { b: { c: 1 } } };
    const expected = { 'a.b.c': 1 };

    // Act
    const result = flattenForSerialization(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('2. should flatten object with multiple properties', () => {
    // Arrange
    const input = { a: { b: 1, c: 2 }, d: 3 };
    const expected = { 'a.b': 1, 'a.c': 2, d: 3 };

    // Act
    const result = flattenForSerialization(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('3. should flatten array with numeric keys', () => {
    // Arrange
    const input = { items: [1, 2, 3] };
    const expected = { 'items.0': 1, 'items.1': 2, 'items.2': 3 };

    // Act
    const result = flattenForSerialization(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('4. should flatten array of objects', () => {
    // Arrange
    const input = { people: [{ name: 'John' }, { name: 'Jane' }] };
    const expected = { 'people.0.name': 'John', 'people.1.name': 'Jane' };

    // Act
    const result = flattenForSerialization(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('5. should handle mixed nested structures', () => {
    // Arrange
    const input = { a: { b: [1, { c: 2 }] } };
    const expected = { 'a.b.0': 1, 'a.b.1.c': 2 };

    // Act
    const result = flattenForSerialization(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('6. should flatten with custom prefix', () => {
    // Arrange
    const input = { a: 1 };
    const prefix = 'root';
    const expected = { 'root.a': 1 };

    // Act
    const result = flattenForSerialization(input, prefix);

    // Assert
    expect(result).toEqual(expected);
  });

  it('7. should handle primitive values', () => {
    // Arrange
    const input = { str: 'hello', num: 42, bool: true };
    const expected = { str: 'hello', num: 42, bool: true };

    // Act
    const result = flattenForSerialization(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('8. should handle null values', () => {
    // Arrange
    const input = { a: null, b: { c: null } };
    const expected = { a: null, 'b.c': null };

    // Act
    const result = flattenForSerialization(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Edge cases
  it('9. should handle empty object', () => {
    // Arrange
    const input = { obj: {} };
    const expected = { obj: {} };

    // Act
    const result = flattenForSerialization(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('10. should handle empty array', () => {
    // Arrange
    const input = { items: [] };
    const expected = { items: [] };

    // Act
    const result = flattenForSerialization(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('11. should handle undefined values', () => {
    // Arrange
    const input = { a: undefined, b: { c: undefined } };
    const expected = { a: undefined, 'b.c': undefined };

    // Act
    const result = flattenForSerialization(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('12. should handle deeply nested structure', () => {
    // Arrange
    const input = { a: { b: { c: { d: { e: 'value' } } } } };
    const expected = { 'a.b.c.d.e': 'value' };

    // Act
    const result = flattenForSerialization(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('13. should handle single property', () => {
    // Arrange
    const input = { name: 'John' };
    const expected = { name: 'John' };

    // Act
    const result = flattenForSerialization(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Error cases
  it('14. should throw TypeError when obj is not an object', () => {
    // Arrange
    const input: any = 'not an object';
    const expectedMessage = 'obj must be an object, got string';

    // Act & Assert
    expect(() => flattenForSerialization(input)).toThrow(TypeError);
    expect(() => flattenForSerialization(input)).toThrow(expectedMessage);
  });

  it('15. should throw TypeError when obj is null', () => {
    // Arrange
    const input: any = null;
    const expectedMessage = 'obj must be an object, got object';

    // Act & Assert
    expect(() => flattenForSerialization(input)).toThrow(TypeError);
    expect(() => flattenForSerialization(input)).toThrow(expectedMessage);
  });
});
