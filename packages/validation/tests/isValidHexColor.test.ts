import { isValidHexColor } from '../src/isValidHexColor';

/**
 * Unit tests for the isValidHexColor function.
 */
describe('isValidHexColor', () => {
  // Test case 1: Valid 6-digit hex colors
  it('1. should return true for valid 6-digit hex colors', () => {
    // Arrange & Act & Assert
    expect(isValidHexColor('#FF5733')).toBe(true);
    expect(isValidHexColor('#000000')).toBe(true);
    expect(isValidHexColor('#FFFFFF')).toBe(true);
    expect(isValidHexColor('#123456')).toBe(true);
  });

  // Test case 2: Valid 3-digit hex colors
  it('2. should return true for valid 3-digit hex colors', () => {
    // Arrange & Act & Assert
    expect(isValidHexColor('#F00')).toBe(true);
    expect(isValidHexColor('#0F0')).toBe(true);
    expect(isValidHexColor('#00F')).toBe(true);
    expect(isValidHexColor('#abc')).toBe(true);
  });

  // Test case 3: Valid 8-digit hex colors with alpha
  it('3. should return true for valid 8-digit hex colors with alpha', () => {
    // Arrange & Act & Assert
    expect(isValidHexColor('#FF5733AA')).toBe(true);
    expect(isValidHexColor('#00000000')).toBe(true);
    expect(isValidHexColor('#FFFFFFFF')).toBe(true);
    expect(isValidHexColor('#12345678')).toBe(true);
  });

  // Test case 4: Valid 4-digit hex colors with alpha
  it('4. should return true for valid 4-digit hex colors with alpha', () => {
    // Arrange & Act & Assert
    expect(isValidHexColor('#F00F')).toBe(true);
    expect(isValidHexColor('#0000')).toBe(true);
    expect(isValidHexColor('#FFFF')).toBe(true);
    expect(isValidHexColor('#abcd')).toBe(true);
  });

  // Test case 5: Case insensitive
  it('5. should accept both uppercase and lowercase', () => {
    // Arrange & Act & Assert
    expect(isValidHexColor('#ff5733')).toBe(true);
    expect(isValidHexColor('#FF5733')).toBe(true);
    expect(isValidHexColor('#aAbBcC')).toBe(true);
    expect(isValidHexColor('#AbCdEf')).toBe(true);
  });

  // Test case 6: Invalid - missing hash
  it('6. should return false when missing # prefix', () => {
    // Arrange & Act & Assert
    expect(isValidHexColor('FF5733')).toBe(false);
    expect(isValidHexColor('000000')).toBe(false);
    expect(isValidHexColor('F00')).toBe(false);
  });

  // Test case 7: Invalid - wrong length
  it('7. should return false for invalid lengths', () => {
    // Arrange & Act & Assert
    expect(isValidHexColor('#F')).toBe(false);
    expect(isValidHexColor('#FF')).toBe(false);
    expect(isValidHexColor('#12345')).toBe(false);
    expect(isValidHexColor('#1234567')).toBe(false);
    expect(isValidHexColor('#123456789')).toBe(false);
  });

  // Test case 8: Invalid - non-hex characters
  it('8. should return false for non-hex characters', () => {
    // Arrange & Act & Assert
    expect(isValidHexColor('#GGGGGG')).toBe(false);
    expect(isValidHexColor('#12345Z')).toBe(false);
    expect(isValidHexColor('#XYZABC')).toBe(false);
    expect(isValidHexColor('#FFF@FFF')).toBe(false);
  });

  // Test case 9: Invalid - empty string
  it('9. should return false for empty string', () => {
    // Arrange
    const color = '';

    // Act
    const result = isValidHexColor(color);

    // Assert
    expect(result).toBe(false);
  });

  // Test case 10: Invalid - only hash
  it('10. should return false for only hash symbol', () => {
    // Arrange
    const color = '#';

    // Act
    const result = isValidHexColor(color);

    // Assert
    expect(result).toBe(false);
  });

  // Test case 11: Invalid - spaces
  it('11. should return false for colors with spaces', () => {
    // Arrange & Act & Assert
    expect(isValidHexColor('# FF5733')).toBe(false);
    expect(isValidHexColor('#FF 5733')).toBe(false);
    expect(isValidHexColor('#FF5733 ')).toBe(false);
  });

  // Test case 12: Invalid - special characters
  it('12. should return false for colors with special characters', () => {
    // Arrange & Act & Assert
    expect(isValidHexColor('#FF-5733')).toBe(false);
    expect(isValidHexColor('#FF_5733')).toBe(false);
    expect(isValidHexColor('#FF.5733')).toBe(false);
  });

  // Test case 13: Valid edge case colors
  it('13. should handle edge case valid colors', () => {
    // Arrange & Act & Assert
    expect(isValidHexColor('#000')).toBe(true);
    expect(isValidHexColor('#fff')).toBe(true);
    expect(isValidHexColor('#FFF')).toBe(true);
    expect(isValidHexColor('#000000')).toBe(true);
  });

  // Test case 14: Invalid - multiple hashes
  it('14. should return false for multiple hash symbols', () => {
    // Arrange & Act & Assert
    expect(isValidHexColor('##FF5733')).toBe(false);
    expect(isValidHexColor('#FF#5733')).toBe(false);
  });

  // Test case 15: Throw TypeError when color is not a string
  it('15. should throw TypeError when color is not a string', () => {
    // Arrange
    const invalidInput = 0xff5733 as unknown as string;
    const expectedMessage = 'color must be a string, got number';

    // Act & Assert
    expect(() => isValidHexColor(invalidInput)).toThrow(TypeError);
    expect(() => isValidHexColor(invalidInput)).toThrow(expectedMessage);
  });
});
