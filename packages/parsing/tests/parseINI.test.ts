import { parseINI } from '../src/parseINI';

/**
 * Unit tests for the parseINI function.
 */
describe('parseINI', () => {
  // Test case 1: Parse basic INI with sections
  it('1. should parse basic INI with sections', () => {
    // Arrange
    const input = `
[database]
host=localhost
port=5432
[server]
port=8080
    `.trim();
    const expected = {
      database: { host: 'localhost', port: '5432' },
      server: { port: '8080' },
    };

    // Act
    const result = parseINI(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 2: Parse with comments
  it('2. should parse with comments', () => {
    // Arrange
    const input = `
; This is a comment
[app]
name=MyApp
# Another comment
version=1.0
    `.trim();
    const expected = {
      app: { name: 'MyApp', version: '1.0' },
    };

    // Act
    const result = parseINI(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 3: Parse without sections (global)
  it('3. should parse without sections as global', () => {
    // Arrange
    const input = 'key=value\nfoo=bar';
    const expected = {
      _global: { key: 'value', foo: 'bar' },
    };

    // Act
    const result = parseINI(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 4: Parse with inline comments
  it('4. should parse with inline comments', () => {
    // Arrange
    const input = `
[app]
name=MyApp # This is the app name
version=1.0 ; Version number
    `.trim();
    const expected = {
      app: { name: 'MyApp', version: '1.0' },
    };

    // Act
    const result = parseINI(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 5: Parse with empty values
  it('5. should parse with empty values', () => {
    // Arrange
    const input = `
[section]
key1=
key2=value
    `.trim();
    const expected = {
      section: { key1: '', key2: 'value' },
    };

    // Act
    const result = parseINI(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 6: Trim whitespace
  it('6. should trim whitespace from keys and values', () => {
    // Arrange
    const input = `
[section]
key1  =  value1  
  key2=value2
    `.trim();
    const expected = {
      section: { key1: 'value1', key2: 'value2' },
    };

    // Act
    const result = parseINI(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 7: Skip empty lines
  it('7. should skip empty lines', () => {
    // Arrange
    const input = `
[section]
key1=value1

key2=value2
    `.trim();
    const expected = {
      section: { key1: 'value1', key2: 'value2' },
    };

    // Act
    const result = parseINI(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 8: Multiple sections
  it('8. should parse multiple sections', () => {
    // Arrange
    const input = `
[section1]
key1=value1
[section2]
key2=value2
[section3]
key3=value3
    `.trim();
    const expected = {
      section1: { key1: 'value1' },
      section2: { key2: 'value2' },
      section3: { key3: 'value3' },
    };

    // Act
    const result = parseINI(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 9: Throw TypeError for non-string input
  it('9. should throw TypeError when input is not a string', () => {
    // Arrange
    const input = 123 as unknown as string;

    // Act & Assert
    expect(() => parseINI(input)).toThrow(TypeError);
    expect(() => parseINI(input)).toThrow('input must be a string');
  });

  // Test case 10: Throw Error for empty input
  it('10. should throw Error when input is empty', () => {
    // Arrange
    const input = '';

    // Act & Assert
    expect(() => parseINI(input)).toThrow(Error);
    expect(() => parseINI(input)).toThrow('input string cannot be empty');
  });

  // Test case 11: Throw Error for invalid key-value pair
  it('11. should throw Error for invalid key-value pair', () => {
    // Arrange
    const input = `
[section]
invalidline
    `.trim();

    // Act & Assert
    expect(() => parseINI(input)).toThrow(Error);
    expect(() => parseINI(input)).toThrow('Invalid key-value pair');
  });

  // Test case 12: Throw Error for empty section name
  it('12. should throw Error for empty section name', () => {
    // Arrange
    const input = '[]\nkey=value';

    // Act & Assert
    expect(() => parseINI(input)).toThrow(Error);
    expect(() => parseINI(input)).toThrow('Empty section name');
  });

  // Test case 13: Throw Error for empty key
  it('13. should throw Error for empty key', () => {
    // Arrange
    const input = '[section]\n=value';

    // Act & Assert
    expect(() => parseINI(input)).toThrow(Error);
    expect(() => parseINI(input)).toThrow('Empty key');
  });
});
