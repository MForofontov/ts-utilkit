import { serializeToYAML } from '../src/serializeToYAML';

/**
 * Unit tests for the serializeToYAML function.
 */
describe('serializeToYAML', () => {
  // Normal/typical usage
  it('1. should serialize simple object to YAML', () => {
    // Arrange
    const input = { name: 'John', age: 30 };

    // Act
    const result = serializeToYAML(input);

    // Assert
    expect(result).toContain('name: John');
    expect(result).toContain('age: 30');
  });

  it('2. should serialize nested object', () => {
    // Arrange
    const input = { person: { name: 'John', age: 30 } };

    // Act
    const result = serializeToYAML(input);

    // Assert
    expect(result).toContain('person:');
    expect(result).toContain('name: John');
    expect(result).toContain('age: 30');
  });

  it('3. should serialize array', () => {
    // Arrange
    const input = { items: [1, 2, 3] };

    // Act
    const result = serializeToYAML(input);

    // Assert
    expect(result).toContain('items:');
    expect(result).toContain('- 1');
    expect(result).toContain('- 2');
    expect(result).toContain('- 3');
  });

  it('4. should use custom indentation', () => {
    // Arrange
    const input = { a: { b: 1 } };

    // Act
    const result = serializeToYAML(input, 4);

    // Assert
    expect(result).toContain('    '); // 4 spaces
  });

  it('5. should quote strings with special characters', () => {
    // Arrange
    const input = { text: 'Hello: World' };

    // Act
    const result = serializeToYAML(input);

    // Assert
    expect(result).toContain('"Hello: World"');
  });

  it('6. should quote strings with newlines', () => {
    // Arrange
    const input = { text: 'Hello\nWorld' };

    // Act
    const result = serializeToYAML(input);

    // Assert
    expect(result).toContain('"');
  });

  it('7. should serialize boolean values', () => {
    // Arrange
    const input = { active: true, deleted: false };

    // Act
    const result = serializeToYAML(input);

    // Assert
    expect(result).toContain('active: true');
    expect(result).toContain('deleted: false');
  });

  it('8. should serialize numbers', () => {
    // Arrange
    const input = { int: 42, float: 3.14, negative: -10 };

    // Act
    const result = serializeToYAML(input);

    // Assert
    expect(result).toContain('int: 42');
    expect(result).toContain('float: 3.14');
    expect(result).toContain('negative: -10');
  });

  // Edge cases
  it('9. should handle null value', () => {
    // Arrange
    const input = { value: null };

    // Act
    const result = serializeToYAML(input);

    // Assert
    expect(result).toContain('value: null');
  });

  it('10. should handle undefined value', () => {
    // Arrange
    const input = { value: undefined };

    // Act
    const result = serializeToYAML(input);

    // Assert
    expect(result).toContain('value: undefined');
  });

  it('11. should handle empty object', () => {
    // Arrange
    const input = { obj: {} };

    // Act
    const result = serializeToYAML(input);

    // Assert
    expect(result).toContain('obj:{}');
  });

  it('12. should handle empty array', () => {
    // Arrange
    const input = { items: [] };

    // Act
    const result = serializeToYAML(input);

    // Assert
    expect(result).toContain('items: []');
  });

  it('13. should handle array of objects', () => {
    // Arrange
    const input = { people: [{ name: 'John' }, { name: 'Jane' }] };

    // Act
    const result = serializeToYAML(input);

    // Assert
    expect(result).toContain('people:');
    expect(result).toContain('name: John');
    expect(result).toContain('name: Jane');
  });

  it('14. should handle deeply nested structure', () => {
    // Arrange
    const input = { a: { b: { c: { d: 'value' } } } };

    // Act
    const result = serializeToYAML(input);

    // Assert
    expect(result).toContain('a:');
    expect(result).toContain('b:');
    expect(result).toContain('c:');
    expect(result).toContain('d: value');
  });

  // Error cases
  it('15. should throw TypeError when indent is not a number', () => {
    // Arrange
    const input = { a: 1 };
    const invalidIndent: any = '2';
    const expectedMessage = 'indent must be a valid number, got string';

    // Act & Assert
    expect(() => serializeToYAML(input, invalidIndent)).toThrow(TypeError);
    expect(() => serializeToYAML(input, invalidIndent)).toThrow(
      expectedMessage,
    );
  });

  it('16. should throw TypeError when indent is NaN', () => {
    // Arrange
    const input = { a: 1 };
    const expectedMessage = 'indent must be a valid number, got number';

    // Act & Assert
    expect(() => serializeToYAML(input, NaN)).toThrow(TypeError);
    expect(() => serializeToYAML(input, NaN)).toThrow(expectedMessage);
  });
});
