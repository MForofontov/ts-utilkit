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

  it('15. should preserve Date values', () => {
    const date = new Date('2020-01-01T00:00:00.000Z');
    const result = handleCircularReferences({ d: date });
    expect(result.d).toEqual(date);
    expect(result.d).not.toBe(date);
  });

  it('16. should preserve Map values', () => {
    const map = new Map([['a', 1]]);
    const result = handleCircularReferences({ m: map });
    expect(result.m).toEqual(map);
    expect(result.m).not.toBe(map);
  });
});

it('preserves repeated atomic class instances across branches and collections', () => {
  class Value {
    readonly id = 1;
  }
  const value = new Value();
  const input = {
    first: value,
    second: value,
    list: [value],
    map: new Map([[value, value]]),
    set: new Set([value]),
  };
  const result = handleCircularReferences(input) as typeof input;
  expect(result.first).toBe(value);
  expect(result.second).toBe(value);
  expect(result.list[0]).toBe(value);
  expect(result.map.get(value)).toBe(value);
  expect(result.set.has(value)).toBe(true);
});

it('clones regular expressions without mutating the input', () => {
  const value = /hello/giu;
  value.lastIndex = 3;
  const result = handleCircularReferences({ value }) as { value: RegExp };
  expect(result.value).not.toBe(value);
  expect(result.value.source).toBe(value.source);
  expect(result.value.flags).toBe(value.flags);
  expect(value.lastIndex).toBe(3);
});
