import { unflattenFromSerialization } from '../src/unflattenFromSerialization';

/**
 * Unit tests for the unflattenFromSerialization function.
 */
describe('unflattenFromSerialization', () => {
  // Normal/typical usage
  it('1. should unflatten simple dot notation', () => {
    // Arrange
    const input = { 'a.b.c': 1 };
    const expected = { a: { b: { c: 1 } } };

    // Act
    const result = unflattenFromSerialization(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('2. should unflatten multiple properties', () => {
    // Arrange
    const input = { 'a.b': 1, 'a.c': 2, d: 3 };
    const expected = { a: { b: 1, c: 2 }, d: 3 };

    // Act
    const result = unflattenFromSerialization(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('3. should unflatten to array using numeric keys', () => {
    // Arrange
    const input = { 'items.0': 1, 'items.1': 2, 'items.2': 3 };
    const expected = { items: [1, 2, 3] };

    // Act
    const result = unflattenFromSerialization(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('4. should unflatten to array of objects', () => {
    // Arrange
    const input = { 'people.0.name': 'John', 'people.1.name': 'Jane' };
    const expected = { people: [{ name: 'John' }, { name: 'Jane' }] };

    // Act
    const result = unflattenFromSerialization(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('5. should handle mixed nested structures', () => {
    // Arrange
    const input = { 'a.b.0': 1, 'a.b.1.c': 2 };
    const expected = { a: { b: [1, { c: 2 }] } };

    // Act
    const result = unflattenFromSerialization(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('6. should handle primitive values', () => {
    // Arrange
    const input = { str: 'hello', num: 42, bool: true };
    const expected = { str: 'hello', num: 42, bool: true };

    // Act
    const result = unflattenFromSerialization(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('7. should handle null values', () => {
    // Arrange
    const input = { a: null, 'b.c': null };
    const expected = { a: null, b: { c: null } };

    // Act
    const result = unflattenFromSerialization(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('8. should handle undefined values', () => {
    // Arrange
    const input = { a: undefined, 'b.c': undefined };
    const expected = { a: undefined, b: { c: undefined } };

    // Act
    const result = unflattenFromSerialization(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Edge cases
  it('9. should handle empty object', () => {
    // Arrange
    const input = {};
    const expected = {};

    // Act
    const result = unflattenFromSerialization(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('10. should handle single property', () => {
    // Arrange
    const input = { name: 'John' };
    const expected = { name: 'John' };

    // Act
    const result = unflattenFromSerialization(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('11. should handle deeply nested structure', () => {
    // Arrange
    const input = { 'a.b.c.d.e': 'value' };
    const expected = { a: { b: { c: { d: { e: 'value' } } } } };

    // Act
    const result = unflattenFromSerialization(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('12. should handle numeric object keys', () => {
    // Arrange
    const input = { '0': 'a', '1': 'b' };
    const expected = { '0': 'a', '1': 'b' };

    // Act
    const result = unflattenFromSerialization(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('13. should handle empty string values', () => {
    // Arrange
    const input = { 'a.b': '' };
    const expected = { a: { b: '' } };

    // Act
    const result = unflattenFromSerialization(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Error cases
  it('14. should throw TypeError when flatObj is not an object', () => {
    // Arrange
    const input: any = 'not an object';
    const expectedMessage = 'flatObj must be an object, got string';

    // Act & Assert
    expect(() => unflattenFromSerialization(input)).toThrow(TypeError);
    expect(() => unflattenFromSerialization(input)).toThrow(expectedMessage);
  });

  it('15. should throw TypeError when flatObj is null', () => {
    // Arrange
    const input: any = null;
    const expectedMessage = 'flatObj must be an object, got object';

    // Act & Assert
    expect(() => unflattenFromSerialization(input)).toThrow(TypeError);
    expect(() => unflattenFromSerialization(input)).toThrow(expectedMessage);
  });

  it('16. should throw TypeError when flatObj is an array', () => {
    // Arrange
    const input: any = [1, 2, 3];
    const expectedMessage = 'flatObj must be an object, got array';

    // Act & Assert
    expect(() => unflattenFromSerialization(input)).toThrow(TypeError);
    expect(() => unflattenFromSerialization(input)).toThrow(expectedMessage);
  });
});
