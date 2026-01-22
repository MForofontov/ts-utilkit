import { handleCircularReferences } from '../src/handleCircularReferences';

/**
 * Unit tests for the handleCircularReferences function.
 */
describe('handleCircularReferences', () => {
  // Normal/typical usage
  it('1. should replace circular reference with default marker', () => {
    // Arrange
    const input: any = { a: 1 };
    input.self = input;

    // Act
    const result = handleCircularReferences(input);

    // Assert
    expect(result.a).toBe(1);
    expect(result.self).toBe('[Circular]');
  });

  it('2. should use custom replacer for circular references', () => {
    // Arrange
    const input: any = { a: 1 };
    input.self = input;

    // Act
    const result = handleCircularReferences(input, null);

    // Assert
    expect(result.a).toBe(1);
    expect(result.self).toBeNull();
  });

  it('3. should handle nested circular reference', () => {
    // Arrange
    const input: any = { a: { b: { c: 1 } } };
    input.a.b.parent = input;

    // Act
    const result = handleCircularReferences(input);

    // Assert
    expect(result.a.b.c).toBe(1);
    expect(result.a.b.parent).toBe('[Circular]');
  });

  it('4. should handle array with circular reference', () => {
    // Arrange
    const input: any = { items: [1, 2, 3] };
    input.items.push(input);

    // Act
    const result = handleCircularReferences(input);

    // Assert
    expect(result.items[0]).toBe(1);
    expect(result.items[3]).toBe('[Circular]');
  });

  it('5. should handle same object at different branches', () => {
    // Arrange
    const shared = { value: 42 };
    const input = { a: shared, b: shared };

    // Act
    const result = handleCircularReferences(input);

    // Assert
    expect(result.a.value).toBe(42);
    expect(result.b.value).toBe(42);
  });

  it('6. should handle object without circular references', () => {
    // Arrange
    const input = { a: { b: { c: 1 } }, d: 2 };

    // Act
    const result = handleCircularReferences(input);

    // Assert
    expect(result).toEqual(input);
  });

  it('7. should handle array without circular references', () => {
    // Arrange
    const input = [1, 2, [3, 4], { a: 5 }];

    // Act
    const result = handleCircularReferences(input);

    // Assert
    expect(result).toEqual(input);
  });

  it('8. should handle null values', () => {
    // Arrange
    const input = { a: null, b: { c: null } };

    // Act
    const result = handleCircularReferences(input);

    // Assert
    expect(result).toEqual(input);
  });

  // Edge cases
  it('9. should handle empty object', () => {
    // Arrange
    const input = {};

    // Act
    const result = handleCircularReferences(input);

    // Assert
    expect(result).toEqual(input);
  });

  it('10. should handle empty array', () => {
    // Arrange
    const input: any[] = [];

    // Act
    const result = handleCircularReferences(input);

    // Assert
    expect(result).toEqual(input);
  });

  it('11. should handle deeply nested structure without circular refs', () => {
    // Arrange
    const input = { a: { b: { c: { d: { e: 'value' } } } } };

    // Act
    const result = handleCircularReferences(input);

    // Assert
    expect(result).toEqual(input);
  });

  it('12. should handle multiple circular references', () => {
    // Arrange
    const input: any = { a: {}, b: {} };
    input.a.ref = input;
    input.b.ref = input;

    // Act
    const result = handleCircularReferences(input);

    // Assert
    expect(result.a.ref).toBe('[Circular]');
    expect(result.b.ref).toBe('[Circular]');
  });

  it('13. should handle undefined values', () => {
    // Arrange
    const input = { a: undefined, b: { c: undefined } };

    // Act
    const result = handleCircularReferences(input);

    // Assert
    expect(result).toEqual(input);
  });

  it('14. should not modify original object', () => {
    // Arrange
    const input: any = { a: 1 };
    input.self = input;

    // Act
    handleCircularReferences(input);

    // Assert
    expect(input.self).toBe(input); // Original unchanged
  });

  // Error cases
  it('15. should throw TypeError when obj is not an object', () => {
    // Arrange
    const input: any = 'not an object';
    const expectedMessage = 'obj must be an object, got string';

    // Act & Assert
    expect(() => handleCircularReferences(input)).toThrow(TypeError);
    expect(() => handleCircularReferences(input)).toThrow(expectedMessage);
  });

  it('16. should throw TypeError when obj is null', () => {
    // Arrange
    const input: any = null;
    const expectedMessage = 'obj must be an object, got object';

    // Act & Assert
    expect(() => handleCircularReferences(input)).toThrow(TypeError);
    expect(() => handleCircularReferences(input)).toThrow(expectedMessage);
  });
});
