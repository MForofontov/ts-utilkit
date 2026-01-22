import { parseEnvFile } from '../src/parseEnvFile';

/**
 * Unit tests for the parseEnvFile function.
 */
describe('parseEnvFile', () => {
  // Test case 1: Parse basic env file
  it('1. should parse basic env file', () => {
    // Arrange
    const input = 'NODE_ENV=production\nPORT=3000';
    const expected = { NODE_ENV: 'production', PORT: '3000' };

    // Act
    const result = parseEnvFile(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 2: Parse with double quotes
  it('2. should parse with double quotes', () => {
    // Arrange
    const input = 'DB_HOST="localhost"\nDB_NAME="mydb"';
    const expected = { DB_HOST: 'localhost', DB_NAME: 'mydb' };

    // Act
    const result = parseEnvFile(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 3: Parse with single quotes
  it('3. should parse with single quotes', () => {
    // Arrange
    const input = "DB_HOST='localhost'\nDB_NAME='mydb'";
    const expected = { DB_HOST: 'localhost', DB_NAME: 'mydb' };

    // Act
    const result = parseEnvFile(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 4: Parse with variable expansion
  it('4. should expand variables when enabled', () => {
    // Arrange
    const input = 'HOST=localhost\nURL=http://$HOST:3000';
    const expected = { HOST: 'localhost', URL: 'http://localhost:3000' };

    // Act
    const result = parseEnvFile(input, true);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 5: Parse with braced variable expansion
  it('5. should expand braced variables', () => {
    // Arrange
    const input = 'HOST=localhost\nURL=http://${HOST}:3000';
    const expected = { HOST: 'localhost', URL: 'http://localhost:3000' };

    // Act
    const result = parseEnvFile(input, true);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 6: Skip comments
  it('6. should skip comment lines', () => {
    // Arrange
    const input = '# Database config\nDB_HOST=localhost\n# End of config';
    const expected = { DB_HOST: 'localhost' };

    // Act
    const result = parseEnvFile(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 7: Skip empty lines
  it('7. should skip empty lines', () => {
    // Arrange
    const input = 'KEY1=value1\n\nKEY2=value2\n\n';
    const expected = { KEY1: 'value1', KEY2: 'value2' };

    // Act
    const result = parseEnvFile(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 8: Handle empty values
  it('8. should handle empty values', () => {
    // Arrange
    const input = 'KEY1=\nKEY2=value';
    const expected = { KEY1: '', KEY2: 'value' };

    // Act
    const result = parseEnvFile(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 9: Trim whitespace
  it('9. should trim whitespace', () => {
    // Arrange
    const input = '  KEY1  =  value1  \n  KEY2=value2';
    const expected = { KEY1: 'value1', KEY2: 'value2' };

    // Act
    const result = parseEnvFile(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 10: Handle undefined variables in expansion
  it('10. should handle undefined variables as empty string', () => {
    // Arrange
    const input = 'URL=http://$UNDEFINED:3000';
    const expected = { URL: 'http://:3000' };

    // Act
    const result = parseEnvFile(input, true);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 11: Throw TypeError for non-string input
  it('11. should throw TypeError when input is not a string', () => {
    // Arrange
    const input = 123 as unknown as string;

    // Act & Assert
    expect(() => parseEnvFile(input)).toThrow(TypeError);
    expect(() => parseEnvFile(input)).toThrow('input must be a string');
  });

  // Test case 12: Throw Error for empty input
  it('12. should throw Error when input is empty', () => {
    // Arrange
    const input = '';

    // Act & Assert
    expect(() => parseEnvFile(input)).toThrow(Error);
    expect(() => parseEnvFile(input)).toThrow('input string cannot be empty');
  });

  // Test case 13: Throw Error for missing equals sign
  it('13. should throw Error for missing equals sign', () => {
    // Arrange
    const input = 'INVALID_LINE';

    // Act & Assert
    expect(() => parseEnvFile(input)).toThrow(Error);
    expect(() => parseEnvFile(input)).toThrow('missing "="');
  });

  // Test case 14: Throw Error for empty key
  it('14. should throw Error for empty key', () => {
    // Arrange
    const input = '=value';

    // Act & Assert
    expect(() => parseEnvFile(input)).toThrow(Error);
    expect(() => parseEnvFile(input)).toThrow('Empty key');
  });

  // Test case 15: Throw Error for invalid key format
  it('15. should throw Error for invalid key format', () => {
    // Arrange
    const input = 'invalid-key=value';

    // Act & Assert
    expect(() => parseEnvFile(input)).toThrow(Error);
    expect(() => parseEnvFile(input)).toThrow('Invalid key format');
  });
});
