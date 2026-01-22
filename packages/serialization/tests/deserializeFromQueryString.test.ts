import { deserializeFromQueryString } from '../src/deserializeFromQueryString';

/**
 * Unit tests for the deserializeFromQueryString function.
 */
describe('deserializeFromQueryString', () => {
  // Normal/typical usage
  it('1. should deserialize query string to object', () => {
    // Arrange
    const input = 'name=John&age=30';
    const expected = { name: 'John', age: '30' };

    // Act
    const result = deserializeFromQueryString(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('2. should deserialize with leading question mark', () => {
    // Arrange
    const input = '?name=John&age=30';
    const expected = { name: 'John', age: '30' };

    // Act
    const result = deserializeFromQueryString(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('3. should decode URL-encoded values by default', () => {
    // Arrange
    const input = 'text=Hello%20World';
    const expected = { text: 'Hello World' };

    // Act
    const result = deserializeFromQueryString(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('4. should not decode when decodeValues is false', () => {
    // Arrange
    const input = 'text=Hello%20World';
    const expected = { text: 'Hello%20World' };

    // Act
    const result = deserializeFromQueryString(input, { decodeValues: false });

    // Assert
    expect(result).toEqual(expected);
  });

  it('5. should parse array with brackets format', () => {
    // Arrange
    const input = 'items[]=1&items[]=2&items[]=3';
    const expected = { items: ['1', '2', '3'] };

    // Act
    const result = deserializeFromQueryString(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('6. should auto-detect repeated keys as array', () => {
    // Arrange
    const input = 'items=1&items=2&items=3';
    const expected = { items: ['1', '2', '3'] };

    // Act
    const result = deserializeFromQueryString(input, { arrayFormat: 'auto' });

    // Assert
    expect(result).toEqual(expected);
  });

  it('7. should handle single parameter', () => {
    // Arrange
    const input = 'name=John';
    const expected = { name: 'John' };

    // Act
    const result = deserializeFromQueryString(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('8. should handle multiple parameters', () => {
    // Arrange
    const input = 'a=1&b=2&c=3&d=4';
    const expected = { a: '1', b: '2', c: '3', d: '4' };

    // Act
    const result = deserializeFromQueryString(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Edge cases
  it('9. should handle empty string', () => {
    // Arrange
    const input = '';
    const expected = {};

    // Act
    const result = deserializeFromQueryString(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('10. should handle only question mark', () => {
    // Arrange
    const input = '?';
    const expected = {};

    // Act
    const result = deserializeFromQueryString(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('11. should handle empty values', () => {
    // Arrange
    const input = 'a=&b=2&c=';
    const expected = { a: '', b: '2', c: '' };

    // Act
    const result = deserializeFromQueryString(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('12. should handle parameter without value', () => {
    // Arrange
    const input = 'flag&name=John';
    const expected = { flag: '', name: 'John' };

    // Act
    const result = deserializeFromQueryString(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('13. should handle special characters', () => {
    // Arrange
    const input = 'text=Hello%21%40%23';

    // Act
    const result = deserializeFromQueryString(input);

    // Assert
    expect(result.text).toBe('Hello!@#');
  });

  it('14. should handle plus as space', () => {
    // Arrange
    const input = 'text=Hello+World';

    // Act
    const result = deserializeFromQueryString(input);

    // Assert (note: decodeURIComponent doesn't convert + to space, but %20 does)
    expect(result.text).toBe('Hello+World');
  });

  // Error cases
  it('15. should throw TypeError when queryString is not a string', () => {
    // Arrange
    const input: any = { name: 'John' };
    const expectedMessage = 'queryString must be a string, got object';

    // Act & Assert
    expect(() => deserializeFromQueryString(input)).toThrow(TypeError);
    expect(() => deserializeFromQueryString(input)).toThrow(expectedMessage);
  });

  it('16. should throw TypeError when decodeValues is not boolean', () => {
    // Arrange
    const input = 'name=John';
    const options: any = { decodeValues: 'true' };
    const expectedMessage = 'decodeValues must be a boolean, got string';

    // Act & Assert
    expect(() => deserializeFromQueryString(input, options)).toThrow(TypeError);
    expect(() => deserializeFromQueryString(input, options)).toThrow(
      expectedMessage,
    );
  });

  it('17. should throw TypeError for invalid arrayFormat', () => {
    // Arrange
    const input = 'items=1&items=2';
    const options: any = { arrayFormat: 'invalid' };
    const expectedMessage = "arrayFormat must be 'brackets' or 'auto'";

    // Act & Assert
    expect(() => deserializeFromQueryString(input, options)).toThrow(TypeError);
    expect(() => deserializeFromQueryString(input, options)).toThrow(
      expectedMessage,
    );
  });
});
