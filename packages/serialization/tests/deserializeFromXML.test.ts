import { deserializeFromXML } from '../src/deserializeFromXML';

/**
 * Unit tests for the deserializeFromXML function.
 */
describe('deserializeFromXML', () => {
  // Normal/typical usage
  it('1. should deserialize simple XML to object', () => {
    // Arrange
    const input = '<person><name>John</name><age>30</age></person>';
    const expected = { person: { name: 'John', age: '30' } };

    // Act
    const result = deserializeFromXML(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('2. should deserialize nested XML', () => {
    // Arrange
    const input = '<root><user><name>John</name><age>30</age></user></root>';
    const expected = { root: { user: { name: 'John', age: '30' } } };

    // Act
    const result = deserializeFromXML(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('3. should deserialize repeated tags as array', () => {
    // Arrange
    const input = '<root><item>1</item><item>2</item><item>3</item></root>';
    const expected = { root: { item: ['1', '2', '3'] } };

    // Act
    const result = deserializeFromXML(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('4. should unescape XML entities', () => {
    // Arrange
    const input =
      '<root><text>&lt;tag&gt; &amp; &quot;quotes&quot; &amp; &apos;apostrophe&apos;</text></root>';
    const expected = { root: { text: '<tag> & "quotes" & \'apostrophe\'' } };

    // Act
    const result = deserializeFromXML(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('5. should handle self-closing tags', () => {
    // Arrange
    const input = '<root><value/></root>';
    const expected = { root: { value: null } };

    // Act
    const result = deserializeFromXML(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('6. should handle text content', () => {
    // Arrange
    const input = '<message>Hello World</message>';
    const expected = { message: 'Hello World' };

    // Act
    const result = deserializeFromXML(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('7. should handle multiple root-level tags', () => {
    // Arrange
    const input = '<root><a>1</a><b>2</b></root>';
    const expected = { root: { a: '1', b: '2' } };

    // Act
    const result = deserializeFromXML(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('8. should handle numbers in text', () => {
    // Arrange
    const input = '<root><int>42</int><float>3.14</float></root>';
    const expected = { root: { int: '42', float: '3.14' } };

    // Act
    const result = deserializeFromXML(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Edge cases
  it('9. should handle empty tags', () => {
    // Arrange
    const input = '<root><empty></empty></root>';

    // Act
    const result = deserializeFromXML(input);

    // Assert
    expect(result.root.empty).toBeDefined();
  });

  it('10. should handle whitespace in tags', () => {
    // Arrange
    const input = '<root>  <name>John</name>  </root>';

    // Act
    const result = deserializeFromXML(input);

    // Assert
    expect(result.root.name).toBe('John');
  });

  it('11. should handle deeply nested XML', () => {
    // Arrange
    const input = '<root><a><b><c><d>value</d></c></b></a></root>';

    // Act
    const result = deserializeFromXML(input);

    // Assert
    expect(result.root.a.b.c.d).toBe('value');
  });

  it('12. should handle mixed repeated and unique tags', () => {
    // Arrange
    const input = '<root><item>1</item><item>2</item><other>3</other></root>';

    // Act
    const result = deserializeFromXML(input);

    // Assert
    expect(result.root.item).toEqual(['1', '2']);
    expect(result.root.other).toBe('3');
  });

  // Error cases
  it('13. should throw TypeError when xmlString is not a string', () => {
    // Arrange
    const input: any = { root: 'value' };
    const expectedMessage = 'xmlString must be a string, got object';

    // Act & Assert
    expect(() => deserializeFromXML(input)).toThrow(TypeError);
    expect(() => deserializeFromXML(input)).toThrow(expectedMessage);
  });
});
