import { serializeToXML } from '../src/serializeToXML';

/**
 * Unit tests for the serializeToXML function.
 */
describe('serializeToXML', () => {
  // Normal/typical usage
  it('1. should serialize simple object to XML', () => {
    // Arrange
    const input = { name: 'John', age: 30 };

    // Act
    const result = serializeToXML(input, 'person');

    // Assert
    expect(result).toContain('<person>');
    expect(result).toContain('<name>John</name>');
    expect(result).toContain('<age>30</age>');
    expect(result).toContain('</person>');
  });

  it('2. should serialize with default root tag', () => {
    // Arrange
    const input = { a: 1 };

    // Act
    const result = serializeToXML(input);

    // Assert
    expect(result).toContain('<root>');
    expect(result).toContain('</root>');
  });

  it('3. should serialize with pretty formatting', () => {
    // Arrange
    const input = { name: 'John' };

    // Act
    const result = serializeToXML(input, 'person', true);

    // Assert
    expect(result).toContain('\n');
    expect(result).toContain('  '); // Indentation
  });

  it('4. should serialize nested object', () => {
    // Arrange
    const input = { user: { name: 'John', age: 30 } };

    // Act
    const result = serializeToXML(input, 'root');

    // Assert
    expect(result).toContain('<user>');
    expect(result).toContain('<name>John</name>');
    expect(result).toContain('</user>');
  });

  it('5. should serialize array with repeated tags', () => {
    // Arrange
    const input = { items: [1, 2, 3] };

    // Act
    const result = serializeToXML(input, 'root');

    // Assert
    expect(result).toContain('<items>1</items>');
    expect(result).toContain('<items>2</items>');
    expect(result).toContain('<items>3</items>');
  });

  it('6. should escape special XML characters', () => {
    // Arrange
    const input = { text: '<tag> & "quotes" & \'apostrophe\'' };

    // Act
    const result = serializeToXML(input, 'root');

    // Assert
    expect(result).toContain('&lt;tag&gt;');
    expect(result).toContain('&amp;');
    expect(result).toContain('&quot;');
    expect(result).toContain('&apos;');
  });

  it('7. should serialize boolean values', () => {
    // Arrange
    const input = { active: true, deleted: false };

    // Act
    const result = serializeToXML(input, 'root');

    // Assert
    expect(result).toContain('<active>true</active>');
    expect(result).toContain('<deleted>false</deleted>');
  });

  it('8. should serialize numbers', () => {
    // Arrange
    const input = { int: 42, float: 3.14, negative: -10 };

    // Act
    const result = serializeToXML(input, 'root');

    // Assert
    expect(result).toContain('<int>42</int>');
    expect(result).toContain('<float>3.14</float>');
    expect(result).toContain('<negative>-10</negative>');
  });

  // Edge cases
  it('9. should handle null value', () => {
    // Arrange
    const input = { value: null };

    // Act
    const result = serializeToXML(input, 'root');

    // Assert
    expect(result).toContain('<value/>');
  });

  it('10. should handle undefined value', () => {
    // Arrange
    const input = { value: undefined };

    // Act
    const result = serializeToXML(input, 'root');

    // Assert
    expect(result).toContain('<value/>');
  });

  it('11. should handle empty object', () => {
    // Arrange
    const input = { obj: {} };

    // Act
    const result = serializeToXML(input, 'root');

    // Assert
    expect(result).toContain('<obj>');
  });

  it('12. should handle empty array', () => {
    // Arrange
    const input = { items: [] };

    // Act
    const result = serializeToXML(input, 'root');

    // Assert
    expect(result).toContain('<root>');
  });

  it('13. should serialize deeply nested objects', () => {
    // Arrange
    const input = { a: { b: { c: { d: 'value' } } } };

    // Act
    const result = serializeToXML(input, 'root');

    // Assert
    expect(result).toContain('<d>value</d>');
  });

  // Error cases
  it('14. should throw TypeError when data is not an object', () => {
    // Arrange
    const input: any = 'not an object';
    const expectedMessage = 'data must be an object, got string';

    // Act & Assert
    expect(() => serializeToXML(input)).toThrow(TypeError);
    expect(() => serializeToXML(input)).toThrow(expectedMessage);
  });

  it('15. should throw TypeError when data is null', () => {
    // Arrange
    const input: any = null;
    const expectedMessage = 'data must be an object, got object';

    // Act & Assert
    expect(() => serializeToXML(input)).toThrow(TypeError);
    expect(() => serializeToXML(input)).toThrow(expectedMessage);
  });

  it('16. should throw TypeError when rootTag is not string', () => {
    // Arrange
    const input = { a: 1 };
    const invalidRootTag: any = 123;
    const expectedMessage = 'rootTag must be a string, got number';

    // Act & Assert
    expect(() => serializeToXML(input, invalidRootTag)).toThrow(TypeError);
    expect(() => serializeToXML(input, invalidRootTag)).toThrow(
      expectedMessage,
    );
  });

  it('17. should throw TypeError when pretty is not boolean', () => {
    // Arrange
    const input = { a: 1 };
    const invalidPretty: any = 'true';
    const expectedMessage = 'pretty must be a boolean, got string';

    // Act & Assert
    expect(() => serializeToXML(input, 'root', invalidPretty)).toThrow(
      TypeError,
    );
    expect(() => serializeToXML(input, 'root', invalidPretty)).toThrow(
      expectedMessage,
    );
  });

  it('18. should throw Error when rootTag is empty', () => {
    // Arrange
    const input = { a: 1 };
    const expectedMessage = 'rootTag cannot be empty';

    // Act & Assert
    expect(() => serializeToXML(input, '')).toThrow(Error);
    expect(() => serializeToXML(input, '')).toThrow(expectedMessage);
  });
});
