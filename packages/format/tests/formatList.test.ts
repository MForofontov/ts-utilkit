import { formatList } from '../src/formatList';

/**
 * Unit tests for the formatList function.
 */
describe('formatList', () => {
  // ─── Normal / Happy Path ───────────────────────────────────────────────────

  // Test case 1: Three items with default "and" conjunction
  it('1. should format three items with default "and" conjunction', () => {
    // Arrange
    const items = ['Alice', 'Bob', 'Carol'];
    const expected = 'Alice, Bob, and Carol';

    // Act
    const result = formatList(items);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 2: Two items with default "and" conjunction
  it('2. should format two items with "and" conjunction', () => {
    // Arrange
    const items = ['Alice', 'Bob'];
    const expected = 'Alice and Bob';

    // Act
    const result = formatList(items);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 3: Single item returns as-is
  it('3. should return a single item unchanged', () => {
    // Arrange
    const items = ['only'];
    const expected = 'only';

    // Act
    const result = formatList(items);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 4: Two items with "or" conjunction
  it('4. should format two items with "or" conjunction', () => {
    // Arrange
    const items = ['Tea', 'Coffee'];
    const expected = 'Tea or Coffee';

    // Act
    const result = formatList(items, 'or');

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 5: Three items with "or" conjunction
  it('5. should format three items with "or" conjunction', () => {
    // Arrange
    const items = ['red', 'green', 'blue'];
    const expected = 'red, green, or blue';

    // Act
    const result = formatList(items, 'or');

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 6: Three items with "none" (comma-separated, no conjunction)
  it('6. should format items with "none" conjunction as comma-separated', () => {
    // Arrange
    const items = ['red', 'green', 'blue'];

    // Act
    const result = formatList(items, 'none');

    // Assert
    // "unit" type in Intl produces comma-separated without a final conjunction
    expect(result).toContain('red');
    expect(result).toContain('green');
    expect(result).toContain('blue');
    expect(result).not.toMatch(/\band\b/);
    expect(result).not.toMatch(/\bor\b/);
  });

  // Test case 7: Explicit "and" conjunction
  it('7. should format items with explicit "and" conjunction', () => {
    // Arrange
    const items = ['cats', 'dogs'];
    const expected = 'cats and dogs';

    // Act
    const result = formatList(items, 'and');

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 8: Custom locale
  it('8. should format list with a custom locale', () => {
    // Arrange
    const items = ['Alice', 'Bob', 'Carol'];

    // Act
    const result = formatList(items, 'and', 'en-US');

    // Assert
    expect(result).toBe('Alice, Bob, and Carol');
  });

  // Test case 9: Two items with "none" conjunction
  it('9. should format two items with "none" conjunction', () => {
    // Arrange
    const items = ['alpha', 'beta'];

    // Act
    const result = formatList(items, 'none');

    // Assert
    expect(result).toContain('alpha');
    expect(result).toContain('beta');
  });

  // Test case 10: Four items with "and" conjunction
  it('10. should format four items with "and" conjunction', () => {
    // Arrange
    const items = ['one', 'two', 'three', 'four'];

    // Act
    const result = formatList(items);

    // Assert
    expect(result).toBe('one, two, three, and four');
  });

  // ─── Edge Cases ────────────────────────────────────────────────────────────

  // Test case 11: Empty array returns empty string
  it('11. should return an empty string for an empty array', () => {
    // Arrange
    const items: string[] = [];

    // Act
    const result = formatList(items);

    // Assert
    expect(result).toBe('');
  });

  // Test case 12: Single item with "or" conjunction returns unchanged
  it('12. should return a single item unchanged with "or" conjunction', () => {
    // Arrange
    const items = ['solo'];

    // Act
    const result = formatList(items, 'or');

    // Assert
    expect(result).toBe('solo');
  });

  // Test case 13: Single item with "none" conjunction returns unchanged
  it('13. should return a single item unchanged with "none" conjunction', () => {
    // Arrange
    const items = ['solo'];

    // Act
    const result = formatList(items, 'none');

    // Assert
    expect(result).toBe('solo');
  });

  // Test case 14: Items with special characters
  it('14. should handle items containing special characters', () => {
    // Arrange
    const items = ['C++', 'C#', 'F#'];

    // Act
    const result = formatList(items, 'and');

    // Assert
    expect(result).toBe('C++, C#, and F#');
  });

  // ─── Error Cases ───────────────────────────────────────────────────────────

  // Test case 18: Throws Error if conjunction is an invalid string
  it('18. should throw Error if conjunction is an unrecognized value', () => {
    // Act & Assert
    expect(() => formatList(['a', 'b'], 'xor' as unknown as 'and')).toThrow(
      Error,
    );
    expect(() => formatList(['a', 'b'], 'xor' as unknown as 'and')).toThrow(
      'conjunction must be "and", "or", or "none", got "xor"',
    );
  });
});
