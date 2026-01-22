import { cloneViaSerialization } from '../src/cloneViaSerialization';

/**
 * Unit tests for the cloneViaSerialization function.
 */
describe('cloneViaSerialization', () => {
  // Normal/typical usage
  it('1. should clone simple object', () => {
    // Arrange
    const original = { name: 'John', age: 30 };

    // Act
    const clone = cloneViaSerialization(original);

    // Assert
    expect(clone).toEqual(original);
    expect(clone).not.toBe(original);
  });

  it('2. should clone nested object', () => {
    // Arrange
    const original = { user: { name: 'John', info: { age: 30 } } };

    // Act
    const clone = cloneViaSerialization(original);
    clone.user.info.age = 31;

    // Assert
    expect(original.user.info.age).toBe(30);
    expect(clone.user.info.age).toBe(31);
  });

  it('3. should clone array', () => {
    // Arrange
    const original = [1, 2, 3, 4, 5];

    // Act
    const clone = cloneViaSerialization(original);
    clone[0] = 99;

    // Assert
    expect(original[0]).toBe(1);
    expect(clone[0]).toBe(99);
  });

  it('4. should clone array of objects', () => {
    // Arrange
    const original = [{ a: 1 }, { b: 2 }];

    // Act
    const clone = cloneViaSerialization(original);
    clone[0].a = 99;

    // Assert
    expect(original[0].a).toBe(1);
    expect(clone[0].a).toBe(99);
  });

  it('5. should clone object with array', () => {
    // Arrange
    const original = { items: [1, 2, { c: 3 }] };

    // Act
    const clone = cloneViaSerialization(original);
    (clone.items[2] as any).c = 99;

    // Assert
    expect((original.items[2] as any).c).toBe(3);
    expect((clone.items[2] as any).c).toBe(99);
  });

  it('6. should clone boolean values', () => {
    // Arrange
    const original = { active: true, deleted: false };

    // Act
    const clone = cloneViaSerialization(original);

    // Assert
    expect(clone).toEqual(original);
    expect(clone).not.toBe(original);
  });

  it('7. should clone null', () => {
    // Arrange
    const original = null;

    // Act
    const clone = cloneViaSerialization(original);

    // Assert
    expect(clone).toBeNull();
  });

  it('8. should clone numbers', () => {
    // Arrange
    const original = { int: 42, float: 3.14, negative: -10 };

    // Act
    const clone = cloneViaSerialization(original);

    // Assert
    expect(clone).toEqual(original);
    expect(clone).not.toBe(original);
  });

  // Edge cases
  it('9. should handle empty object', () => {
    // Arrange
    const original = {};

    // Act
    const clone = cloneViaSerialization(original);

    // Assert
    expect(clone).toEqual(original);
    expect(clone).not.toBe(original);
  });

  it('10. should handle empty array', () => {
    // Arrange
    const original: any[] = [];

    // Act
    const clone = cloneViaSerialization(original);

    // Assert
    expect(clone).toEqual(original);
    expect(clone).not.toBe(original);
  });

  it('11. should remove undefined values', () => {
    // Arrange
    const original = { a: 1, b: undefined, c: 2 };

    // Act
    const clone = cloneViaSerialization(original);

    // Assert
    expect(clone).toEqual({ a: 1, c: 2 });
    expect(clone.b).toBeUndefined();
  });

  it('12. should remove functions', () => {
    // Arrange
    const original = { a: 1, b: () => {}, c: 2 };

    // Act
    const clone = cloneViaSerialization(original);

    // Assert
    expect(clone).toEqual({ a: 1, c: 2 });
  });

  it('13. should clone deeply nested structure', () => {
    // Arrange
    const original = { a: { b: { c: { d: { e: 'value' } } } } };

    // Act
    const clone = cloneViaSerialization(original);
    clone.a.b.c.d.e = 'changed';

    // Assert
    expect(original.a.b.c.d.e).toBe('value');
    expect(clone.a.b.c.d.e).toBe('changed');
  });

  // Error cases
  it('14. should throw Error for circular references', () => {
    // Arrange
    const original: any = { a: 1 };
    original.self = original;

    // Act & Assert
    expect(() => cloneViaSerialization(original)).toThrow(Error);
    expect(() => cloneViaSerialization(original)).toThrow(
      'Failed to clone via serialization',
    );
  });
});
