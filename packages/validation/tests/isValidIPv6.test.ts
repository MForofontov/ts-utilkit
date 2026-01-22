import { isValidIPv6 } from '../src/isValidIPv6';

/**
 * Unit tests for the isValidIPv6 function.
 */
describe('isValidIPv6', () => {
  // Test case 1: Valid IPv6 addresses
  it('1. should return true for valid IPv6 addresses', () => {
    // Arrange & Act & Assert
    expect(isValidIPv6('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(true);
    expect(isValidIPv6('2001:db8:85a3::8a2e:370:7334')).toBe(true);
    expect(isValidIPv6('::1')).toBe(true); // Loopback
    expect(isValidIPv6('::')).toBe(true); // All zeros
    expect(isValidIPv6('fe80::1')).toBe(true);
  });

  // Test case 2: Invalid IPv6 addresses
  it('2. should return false for invalid IPv6 addresses', () => {
    // Arrange & Act & Assert
    expect(isValidIPv6('2001:0db8:85a3::8a2e::7334')).toBe(false); // Double compression
    expect(isValidIPv6('2001:0db8:85a3:0000:0000:8a2e:0370:7334:1234')).toBe(
      false,
    ); // Too many groups
    expect(isValidIPv6('gggg::1')).toBe(false); // Invalid hex characters
    expect(isValidIPv6('2001:db8::12345')).toBe(false); // Group too long
    expect(isValidIPv6('2001:db8::1:')).toBe(false); // Trailing colon creates empty group
    expect(isValidIPv6(':2001:db8::1')).toBe(false); // Leading colon creates empty group
    expect(isValidIPv6('')).toBe(false); // Empty string
  });

  // Test case 3: IPv6 addresses with zone identifiers
  it('3. should handle zone identifiers correctly', () => {
    // Arrange & Act & Assert
    expect(isValidIPv6('fe80::1%lo0')).toBe(true);
    expect(isValidIPv6('2001:db8::1%eth0')).toBe(true);
    expect(isValidIPv6('::1%1')).toBe(true);
    expect(isValidIPv6('fe80::1%invalid::zone')).toBe(false); // Invalid zone
  });

  // Test case 4: Compression edge cases
  it('4. should handle compression edge cases correctly', () => {
    // Arrange & Act & Assert
    expect(isValidIPv6('2001:db8::')).toBe(true); // Compression at end
    expect(isValidIPv6('::2001:db8')).toBe(true); // Compression at start
    expect(isValidIPv6('2001::db8')).toBe(true); // Compression in middle
    expect(isValidIPv6('2001:db8:85a3:0:0:8a2e:370:7334')).toBe(true); // No compression needed

    // Invalid compression
    expect(isValidIPv6('2001:db8:::8a2e')).toBe(false); // Triple colon
    expect(isValidIPv6('2001::db8::1')).toBe(false); // Multiple compressions
  });

  // Test case 5: Performance with various IPv6 addresses
  it('5. should validate IPv6 addresses efficiently', () => {
    // Arrange
    const ipv6Addresses = [
      '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
      '2001:db8:85a3::8a2e:370:7334',
      '::1',
      'fe80::1%lo0',
      'invalid::ipv6::address',
    ];

    // Act
    const startTime = performance.now();
    const results = ipv6Addresses.map((ip) => isValidIPv6(ip));
    const endTime = performance.now();

    // Assert
    expect(results).toEqual([true, true, true, true, false]);
    expect(endTime - startTime).toBeLessThan(10); // Should complete quickly
  });

  // Test case 6: Group validation edge cases
  it('6. should validate IPv6 group constraints', () => {
    // Empty groups in non-compressed form
    expect(isValidIPv6('2001:db8::8a2e:370:')).toBe(false);
    expect(isValidIPv6(':2001:db8:8a2e:370:7334')).toBe(false);

    // Too many groups even with compression
    expect(isValidIPv6('1:2:3:4:5:6:7::8')).toBe(false);

    // Valid compressions at different positions
    expect(isValidIPv6('::1:2:3:4:5:6:7')).toBe(true);
    expect(isValidIPv6('1::2:3:4:5:6:7')).toBe(true);
  });

  // Test case 7: TypeError for invalid input type
  it('7. should throw TypeError for non-string input', () => {
    // Arrange
    const invalidInputs = [123, null, undefined, [], {}, true];
    const expectedMessage = 'ip must be a string, got';

    // Act & Assert
    invalidInputs.forEach((input) => {
      expect(() => isValidIPv6(input as unknown as string)).toThrow(TypeError);
      expect(() => isValidIPv6(input as unknown as string)).toThrow(
        expectedMessage,
      );
    });
  });
});
