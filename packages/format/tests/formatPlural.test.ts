import { formatPlural } from '../src/formatPlural';

/**
 * Unit tests for the formatPlural function.
 */
describe('formatPlural', () => {
  // Test case 1: Basic singular
  it('1. should return singular form for count 1', () => {
    // Arrange
    const count = 1;
    const word = 'item';
    const expected = '1 item';

    // Act
    const result = formatPlural(count, word);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 2: Basic plural with 's'
  it('2. should add s for plural', () => {
    // Arrange
    const count = 2;
    const word = 'item';
    const expected = '2 items';

    // Act
    const result = formatPlural(count, word);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 3: Custom plural form
  it('3. should use custom plural form', () => {
    // Arrange
    const count = 3;
    const word = 'person';
    const pluralForm = 'people';
    const expected = '3 people';

    // Act
    const result = formatPlural(count, word, pluralForm);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 4: Singular without count
  it('4. should return singular without count', () => {
    // Arrange
    const count = 1;
    const word = 'item';
    const expected = 'item';

    // Act
    const result = formatPlural(count, word, undefined, false);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 5: Plural without count
  it('5. should return plural without count', () => {
    // Arrange
    const count = 5;
    const word = 'item';
    const expected = 'items';

    // Act
    const result = formatPlural(count, word, undefined, false);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 6: Zero count (plural)
  it('6. should return plural for zero count', () => {
    // Arrange
    const count = 0;
    const word = 'item';
    const expected = '0 items';

    // Act
    const result = formatPlural(count, word);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 7: Large count
  it('7. should handle large counts', () => {
    // Arrange
    const count = 1000;
    const word = 'item';
    const expected = '1000 items';

    // Act
    const result = formatPlural(count, word, undefined, true);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 8: Negative count
  it('8. should handle negative counts as plural', () => {
    // Arrange
    const count = -1;
    const word = 'item';
    const expected = '-1 items';

    // Act
    const result = formatPlural(count, word);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 9: Custom plural with count
  it('9. should use custom plural with count', () => {
    // Arrange
    const count = 3;
    const word = 'child';
    const pluralForm = 'children';
    const expected = '3 children';

    // Act
    const result = formatPlural(count, word, pluralForm, true);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 10: Throw Error for empty singular
  it('10. should throw Error for empty singular string', () => {
    // Arrange
    const count = 2;
    const word = '';

    // Act & Assert
    expect(() => formatPlural(count, word)).toThrow(Error);
    expect(() => formatPlural(count, word)).toThrow('singular cannot be empty');
  });

  // Test case 11: Throw TypeError for non-number count
  it('11. should throw TypeError when count is not a number', () => {
    // Arrange
    const count = 'two' as unknown as number;
    const word = 'item';

    // Act & Assert
    expect(() => formatPlural(count, word)).toThrow(TypeError);
    expect(() => formatPlural(count, word)).toThrow('count must be a number');
  });

  // Test case 12: Throw TypeError for NaN count
  it('12. should throw TypeError when count is NaN', () => {
    // Arrange
    const count = NaN;
    const word = 'item';

    // Act & Assert
    expect(() => formatPlural(count, word)).toThrow(TypeError);
    expect(() => formatPlural(count, word)).toThrow('count must be a number');
  });

  // Test case 13: Throw TypeError for non-string singular
  it('13. should throw TypeError when singular is not a string', () => {
    // Arrange
    const count = 2;
    const word = 123 as unknown as string;

    // Act & Assert
    expect(() => formatPlural(count, word)).toThrow(TypeError);
    expect(() => formatPlural(count, word)).toThrow(
      'singular must be a string',
    );
  });
});
