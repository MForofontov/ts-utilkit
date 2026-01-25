import { isValidIPv4 } from '../src/isValidIPv4';

/**
 * Unit tests for the isValidIPv4 function.
 */
describe('isValidIPv4', () => {
  // Test case 1: Valid IPv4 addresses
  it('1. should return true for valid IPv4 addresses', () => {
    // Arrange & Act & Assert
    expect(isValidIPv4('192.168.1.1')).toBe(true);
    expect(isValidIPv4('127.0.0.1')).toBe(true);
    expect(isValidIPv4('0.0.0.0')).toBe(true);
    expect(isValidIPv4('255.255.255.255')).toBe(true);
    expect(isValidIPv4('10.0.0.1')).toBe(true);
  });

  // Test case 2: Invalid IPv4 addresses
  it('2. should return false for invalid IPv4 addresses', () => {
    // Arrange & Act & Assert
    expect(isValidIPv4('256.1.1.1')).toBe(false); // Octet > 255
    expect(isValidIPv4('192.168.1')).toBe(false); // Too few octets
    expect(isValidIPv4('192.168.1.1.1')).toBe(false); // Too many octets
    expect(isValidIPv4('192.168.-1.1')).toBe(false); // Negative octet
    expect(isValidIPv4('192.168.01.1')).toBe(false); // Leading zero
    expect(isValidIPv4('192.168.1.abc')).toBe(false); // Non-numeric octet
    expect(isValidIPv4('')).toBe(false); // Empty string
  });

  // Test case 3: Edge cases with boundary values
  it('3. should handle boundary values correctly', () => {
    // Arrange & Act & Assert
    expect(isValidIPv4('0.0.0.0')).toBe(true); // Minimum values
    expect(isValidIPv4('255.255.255.255')).toBe(true); // Maximum values
    expect(isValidIPv4('1.2.3.4')).toBe(true); // Small values
    expect(isValidIPv4('0.0.0.1')).toBe(true); // Mixed min/small
  });

  // Test case 4: Leading zeros validation
  it('4. should reject IPv4 addresses with leading zeros', () => {
    // Arrange & Act & Assert
    expect(isValidIPv4('192.168.01.1')).toBe(false);
    expect(isValidIPv4('192.168.001.1')).toBe(false);
    expect(isValidIPv4('01.1.1.1')).toBe(false);
    expect(isValidIPv4('192.168.1.01')).toBe(false);

    // But single zero should be valid
    expect(isValidIPv4('192.168.0.1')).toBe(true);
    expect(isValidIPv4('0.0.0.0')).toBe(true);
  });

  // Test case 5: Performance with various IP addresses
  it('5. should validate IP addresses efficiently', () => {
    // Arrange
    const ipAddresses = [
      '192.168.1.1',
      '127.0.0.1',
      '255.255.255.255',
      '256.1.1.1',
      '192.168.01.1',
    ];

    // Act
    const startTime = performance.now();
    const results = ipAddresses.map((ip) => isValidIPv4(ip));
    const endTime = performance.now();

    // Assert
    expect(results).toEqual([true, true, true, false, false]);
    expect(endTime - startTime).toBeLessThan(10); // Should complete quickly
  });

  // Test case 6: TypeError for invalid input type
  it('6. should throw TypeError for non-string input', () => {
    // Arrange
    const invalidInputs: unknown[] = [null, undefined, 42, {}, [], true];

    // Act & Assert
    for (const input of invalidInputs) {
      expect(() => isValidIPv4(input as string)).toThrow(TypeError);
    }
  });
});
