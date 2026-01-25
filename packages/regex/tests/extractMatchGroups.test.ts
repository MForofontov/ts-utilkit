import { extractMatchGroups, type MatchGroup } from '../src/extractMatchGroups';

/**
 * Unit tests for the extractMatchGroups function.
 */
describe('extractMatchGroups', () => {
  // Normal usage tests
  it('1. should extract email parts with groups', () => {
    // Arrange
    const text = 'Contact: john@example.com';
    const pattern = /(\w+)@(\w+)\.(\w+)/g;
    const expected: MatchGroup[] = [
      {
        match: 'john@example.com',
        groups: ['john', 'example', 'com'],
        index: 9,
      },
    ];

    // Act
    const result = extractMatchGroups(text, pattern);

    // Assert
    expect(result).toEqual(expected);
  });

  it('2. should extract named capture groups', () => {
    // Arrange
    const text = 'Date: 2023-12-25';
    const pattern = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/g;

    // Act
    const result = extractMatchGroups(text, pattern);

    // Assert
    expect(result).toHaveLength(1);
    expect(result[0].match).toBe('2023-12-25');
    expect(result[0].groups).toEqual(['2023', '12', '25']);
    expect(result[0].namedGroups).toEqual({
      year: '2023',
      month: '12',
      day: '25',
    });
    expect(result[0].index).toBe(6);
  });

  it('3. should extract multiple matches with groups', () => {
    // Arrange
    const text = 'Prices: 99.99 and 5.50';
    const pattern = /(\d+)\.(\d+)/g;

    // Act
    const result = extractMatchGroups(text, pattern);

    // Assert
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      match: '99.99',
      groups: ['99', '99'],
      index: 8,
    });
    expect(result[1]).toEqual({
      match: '5.50',
      groups: ['5', '50'],
      index: 18,
    });
  });

  it('4. should handle phone number extraction', () => {
    // Arrange
    const text = 'Call (555) 123-4567 or (555) 987-6543';
    const pattern = /\((\d{3})\) (\d{3})-(\d{4})/g;

    // Act
    const result = extractMatchGroups(text, pattern);

    // Assert
    expect(result).toHaveLength(2);
    expect(result[0].groups).toEqual(['555', '123', '4567']);
    expect(result[1].groups).toEqual(['555', '987', '6543']);
  });

  it('5. should work with string pattern', () => {
    // Arrange
    const text = 'test123abc456';
    const pattern = '(\\w+?)(\\d+)';

    // Act
    const result = extractMatchGroups(text, pattern, 'g');

    // Assert
    expect(result).toHaveLength(2);
    expect(result[0].groups).toEqual(['test', '123']);
    expect(result[1].groups).toEqual(['abc', '456']);
  });

  it('6. should extract URL components', () => {
    // Arrange
    const text = 'Visit https://example.com:8080/path';
    const pattern = /(https?):\/\/([^:/]+):?(\d*)(\/.*)$/g;

    // Act
    const result = extractMatchGroups(text, pattern);

    // Assert
    expect(result).toHaveLength(1);
    expect(result[0].groups).toEqual(['https', 'example.com', '8080', '/path']);
  });

  it('7. should handle nested groups', () => {
    // Arrange
    const text = 'RGB(255, 128, 0)';
    const pattern = /RGB\((\d+), (\d+), (\d+)\)/g;

    // Act
    const result = extractMatchGroups(text, pattern);

    // Assert
    expect(result[0].groups).toEqual(['255', '128', '0']);
  });

  // Edge cases
  it('8. should return empty array when no matches', () => {
    // Arrange
    const text = 'No matches here';
    const pattern = /(\d+)-(\d+)/g;

    // Act
    const result = extractMatchGroups(text, pattern);

    // Assert
    expect(result).toEqual([]);
  });

  it('9. should handle empty groups', () => {
    // Arrange
    const text = 'test';
    const pattern = /(t)e(s)?t/g;

    // Act
    const result = extractMatchGroups(text, pattern);

    // Assert
    expect(result[0].groups).toEqual(['t', 's']);
  });

  it('10. should handle pattern with no groups', () => {
    // Arrange
    const text = 'test123';
    const pattern = /\d+/g;

    // Act
    const result = extractMatchGroups(text, pattern);

    // Assert
    expect(result[0].groups).toEqual([]);
  });

  it('11. should automatically add global flag', () => {
    // Arrange
    const text = 'a1 b2 c3';
    const pattern = /(\w)(\d)/; // No 'g' flag

    // Act
    const result = extractMatchGroups(text, pattern);

    // Assert
    expect(result).toHaveLength(3);
  });

  it('12. should handle empty string', () => {
    // Arrange
    const text = '';
    const pattern = /(\w+)/g;

    // Act
    const result = extractMatchGroups(text, pattern);

    // Assert
    expect(result).toEqual([]);
  });

  // Error cases
  it('13. should throw TypeError when text is not a string', () => {
    // Arrange
    const invalidText: any = 123;
    const pattern = /(\d+)/g;
    const expectedMessage = 'text must be a string, got number';

    // Act & Assert
    expect(() => extractMatchGroups(invalidText, pattern)).toThrow(TypeError);
    expect(() => extractMatchGroups(invalidText, pattern)).toThrow(
      expectedMessage,
    );
  });

  it('14. should throw TypeError when pattern is invalid type', () => {
    // Arrange
    const text = 'test';
    const invalidPattern: any = null;
    const expectedMessage = 'pattern must be a string or RegExp, got object';

    // Act & Assert
    expect(() => extractMatchGroups(text, invalidPattern)).toThrow(TypeError);
    expect(() => extractMatchGroups(text, invalidPattern)).toThrow(
      expectedMessage,
    );
  });

  it('15. should throw TypeError when flags is not a string', () => {
    // Arrange
    const text = 'test';
    const pattern = '(\\w+)';
    const invalidFlags: any = true;
    const expectedMessage = 'flags must be a string, got boolean';

    // Act & Assert
    expect(() => extractMatchGroups(text, pattern, invalidFlags)).toThrow(
      TypeError,
    );
    expect(() => extractMatchGroups(text, pattern, invalidFlags)).toThrow(
      expectedMessage,
    );
  });

  it('16. should throw Error when pattern is invalid', () => {
    // Arrange
    const text = 'test';
    const invalidPattern = '(unclosed';
    const expectedMessage = 'Invalid regular expression pattern: (unclosed';

    // Act & Assert
    expect(() => extractMatchGroups(text, invalidPattern, 'g')).toThrow(Error);
    expect(() => extractMatchGroups(text, invalidPattern, 'g')).toThrow(
      expectedMessage,
    );
  });
});
