import { replaceWithCallback } from '../src/replaceWithCallback';

/**
 * Unit tests for the replaceWithCallback function.
 */
describe('replaceWithCallback', () => {
  // Normal usage tests
  it('1. should uppercase all words', () => {
    // Arrange
    const text = 'hello world';
    const pattern = /\w+/g;
    const callback = (match: string) => match.toUpperCase();
    const expected = 'HELLO WORLD';

    // Act
    const result = replaceWithCallback(text, pattern, callback);

    // Assert
    expect(result).toBe(expected);
  });

  it('2. should use capture groups', () => {
    // Arrange
    const text = 'Price: 99.99';
    const pattern = /(\d+)\.(\d+)/g;
    const callback = (match: string, ...args: (string | number)[]) => {
      const [dollars, cents] = args;
      return `$${dollars} and ${cents} cents`;
    };
    const expected = 'Price: $99 and 99 cents';

    // Act
    const result = replaceWithCallback(text, pattern, callback);

    // Assert
    expect(result).toBe(expected);
  });

  it('3. should transform dates', () => {
    // Arrange
    const text = 'Date: 2023-12-25';
    const pattern = /(\d{4})-(\d{2})-(\d{2})/g;
    const callback = (match: string, ...args: (string | number)[]) => {
      const [year, month, day] = args;
      return `${month}/${day}/${year}`;
    };
    const expected = 'Date: 12/25/2023';

    // Act
    const result = replaceWithCallback(text, pattern, callback);

    // Assert
    expect(result).toBe(expected);
  });

  it('4. should work with string pattern', () => {
    // Arrange
    const text = 'test test test';
    const pattern = 'test';
    const callback = () => 'REPLACED';

    // Act
    const result = replaceWithCallback(text, pattern, callback, 'g');

    // Assert
    expect(result).toBe('REPLACED REPLACED REPLACED');
  });

  it('5. should receive index and full string in callback', () => {
    // Arrange
    const text = 'a b c';
    const pattern = /\w/g;
    let indices: number[] = [];
    const callback = (match: string, ...args: any[]) => {
      const index = args[args.length - 2]; // Second to last arg is index
      indices.push(index);
      return match;
    };

    // Act
    replaceWithCallback(text, pattern, callback);

    // Assert
    expect(indices).toEqual([0, 2, 4]);
  });

  it('6. should double numbers', () => {
    // Arrange
    const text = 'a1b2c3';
    const pattern = /\d/g;
    const callback = (match: string) => String(Number(match) * 2);
    const expected = 'a2b4c6';

    // Act
    const result = replaceWithCallback(text, pattern, callback);

    // Assert
    expect(result).toBe(expected);
  });

  it('7. should wrap matches in tags', () => {
    // Arrange
    const text = 'Hello World';
    const pattern = /\w+/g;
    const callback = (match: string) => `<b>${match}</b>`;
    const expected = '<b>Hello</b> <b>World</b>';

    // Act
    const result = replaceWithCallback(text, pattern, callback);

    // Assert
    expect(result).toBe(expected);
  });

  it('8. should automatically add global flag', () => {
    // Arrange
    const text = 'a a a';
    const pattern = /a/; // No 'g' flag
    const callback = () => 'b';

    // Act
    const result = replaceWithCallback(text, pattern, callback);

    // Assert
    expect(result).toBe('b b b');
  });

  // Edge cases
  it('9. should handle no matches', () => {
    // Arrange
    const text = 'No numbers here';
    const pattern = /\d+/g;
    const callback = () => 'REPLACED';

    // Act
    const result = replaceWithCallback(text, pattern, callback);

    // Assert
    expect(result).toBe(text);
  });

  it('10. should handle empty string', () => {
    // Arrange
    const text = '';
    const pattern = /\w+/g;
    const callback = () => 'REPLACED';

    // Act
    const result = replaceWithCallback(text, pattern, callback);

    // Assert
    expect(result).toBe('');
  });

  it('11. should handle callback returning empty string', () => {
    // Arrange
    const text = 'remove123these456numbers';
    const pattern = /\d+/g;
    const callback = () => '';
    const expected = 'removethesenumbers';

    // Act
    const result = replaceWithCallback(text, pattern, callback);

    // Assert
    expect(result).toBe(expected);
  });

  // Error cases
  it('12. should throw TypeError when text is not a string', () => {
    // Arrange
    const invalidText: any = 123;
    const pattern = /\w+/g;
    const callback = (m: string) => m;
    const expectedMessage = 'text must be a string, got number';

    // Act & Assert
    expect(() => replaceWithCallback(invalidText, pattern, callback)).toThrow(
      TypeError,
    );
    expect(() => replaceWithCallback(invalidText, pattern, callback)).toThrow(
      expectedMessage,
    );
  });

  it('13. should throw TypeError when pattern is invalid type', () => {
    // Arrange
    const text = 'test';
    const invalidPattern: any = 123;
    const callback = (m: string) => m;
    const expectedMessage = 'pattern must be a string or RegExp, got number';

    // Act & Assert
    expect(() => replaceWithCallback(text, invalidPattern, callback)).toThrow(
      TypeError,
    );
    expect(() => replaceWithCallback(text, invalidPattern, callback)).toThrow(
      expectedMessage,
    );
  });

  it('14. should throw TypeError when callback is not a function', () => {
    // Arrange
    const text = 'test';
    const pattern = /\w+/g;
    const invalidCallback: any = 'not a function';
    const expectedMessage = 'callback must be a function, got string';

    // Act & Assert
    expect(() => replaceWithCallback(text, pattern, invalidCallback)).toThrow(
      TypeError,
    );
    expect(() => replaceWithCallback(text, pattern, invalidCallback)).toThrow(
      expectedMessage,
    );
  });

  it('15. should throw TypeError when flags is not a string', () => {
    // Arrange
    const text = 'test';
    const pattern = 'test';
    const callback = (m: string) => m;
    const invalidFlags: any = 123;
    const expectedMessage = 'flags must be a string, got number';

    // Act & Assert
    expect(() =>
      replaceWithCallback(text, pattern, callback, invalidFlags),
    ).toThrow(TypeError);
    expect(() =>
      replaceWithCallback(text, pattern, callback, invalidFlags),
    ).toThrow(expectedMessage);
  });

  it('16. should throw Error when pattern is invalid', () => {
    // Arrange
    const text = 'test';
    const invalidPattern = '[unclosed';
    const callback = (m: string) => m;
    const expectedMessage = 'Invalid regular expression pattern: [unclosed';

    // Act & Assert
    expect(() =>
      replaceWithCallback(text, invalidPattern, callback, 'g'),
    ).toThrow(Error);
    expect(() =>
      replaceWithCallback(text, invalidPattern, callback, 'g'),
    ).toThrow(expectedMessage);
  });
});
