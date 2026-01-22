import { isValidMACAddress } from '../src/isValidMACAddress';

/**
 * Unit tests for the isValidMACAddress function.
 */
describe('isValidMACAddress', () => {
  // Test case 1: Valid MAC addresses with default separator
  it('1. should return true for valid MAC addresses with colon separator', () => {
    // Arrange & Act & Assert
    expect(isValidMACAddress('00:1B:44:11:3A:B7')).toBe(true);
    expect(isValidMACAddress('FF:FF:FF:FF:FF:FF')).toBe(true);
    expect(isValidMACAddress('00:00:00:00:00:00')).toBe(true);
    expect(isValidMACAddress('AA:BB:CC:DD:EE:FF')).toBe(true);
    expect(isValidMACAddress('12:34:56:78:9A:BC')).toBe(true);
  });

  // Test case 2: Valid MAC addresses with different separators
  it('2. should return true for valid MAC addresses with different separators', () => {
    // Arrange & Act & Assert
    expect(isValidMACAddress('00-1B-44-11-3A-B7', '-')).toBe(true);
    expect(isValidMACAddress('001B44113AB7', '')).toBe(true); // No separator
    expect(isValidMACAddress('00.1B.44.11.3A.B7', '.')).toBe(true);
  });

  // Test case 3: Invalid MAC addresses
  it('3. should return false for invalid MAC addresses', () => {
    // Arrange & Act & Assert
    expect(isValidMACAddress('00:1B:44:11:3A')).toBe(false); // Too short
    expect(isValidMACAddress('00:1B:44:11:3A:B7:C8')).toBe(false); // Too long
    expect(isValidMACAddress('GG:1B:44:11:3A:B7')).toBe(false); // Invalid hex
    expect(isValidMACAddress('00:1B:44:11:3A:Z7')).toBe(false); // Invalid hex character
    expect(isValidMACAddress('')).toBe(false); // Empty string
    expect(isValidMACAddress('00:1B:44:11:3A:B')).toBe(false); // Incomplete last group
  });

  // Test case 4: Performance with various MAC addresses
  it('4. should validate MAC addresses efficiently', () => {
    // Arrange
    const macAddresses = [
      '00:1B:44:11:3A:B7',
      '00-1B-44-11-3A-B7',
      '001B44113AB7',
      'GG:1B:44:11:3A:B7',
      '00:1B:44:11:3A',
    ];
    const separators = [':', '-', '', ':', ':'];

    // Act
    const startTime = performance.now();
    const results = macAddresses.map((mac, index) =>
      isValidMACAddress(mac, separators[index]),
    );
    const endTime = performance.now();

    // Assert
    expect(results).toEqual([true, true, true, false, false]);
    expect(endTime - startTime).toBeLessThan(10); // Should complete quickly
  });

  // Test case 5: TypeError for invalid input types
  it('5. should throw TypeError for invalid input types', () => {
    // Arrange & Act & Assert
    expect(() => isValidMACAddress(123 as unknown as string)).toThrow(
      TypeError,
    );
    expect(() =>
      isValidMACAddress('00:1B:44:11:3A:B7', 123 as unknown as string),
    ).toThrow(TypeError);

    const expectedMacMessage = 'mac must be a string, got number';
    const expectedSeparatorMessage = 'separator must be a string, got number';

    expect(() => isValidMACAddress(123 as unknown as string)).toThrow(
      expectedMacMessage,
    );
    expect(() =>
      isValidMACAddress('00:1B:44:11:3A:B7', 123 as unknown as string),
    ).toThrow(expectedSeparatorMessage);
  });

  // Test case 6: Error for invalid separator length
  it('6. should throw Error for multi-character separator', () => {
    // Arrange
    const expectedMessage = 'separator must be a single character, got "ab"';

    // Act & Assert
    expect(() => isValidMACAddress('00:1B:44:11:3A:B7', 'ab')).toThrow(Error);
    expect(() => isValidMACAddress('00:1B:44:11:3A:B7', 'ab')).toThrow(
      expectedMessage,
    );
    expect(() => isValidMACAddress('00:1B:44:11:3A:B7', '::')).toThrow(Error);
  });
});
