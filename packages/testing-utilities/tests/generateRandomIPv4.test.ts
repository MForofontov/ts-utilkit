import { generateRandomIPv4 } from '../src/generateRandomIPv4';

/**
 * Unit tests for the generateRandomIPv4 function.
 */
describe('generateRandomIPv4', () => {
  // Test case 1: Generate public IPv4 address
  it('1. should generate public IPv4 address by default', () => {
    // Act
    const result = generateRandomIPv4();

    // Assert
    expect(result).toMatch(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/);
  });

  // Test case 2: IPv4 has 4 octets
  it('2. should generate IPv4 with exactly 4 octets', () => {
    // Act
    const result = generateRandomIPv4();

    // Assert
    const octets = result.split('.');
    expect(octets).toHaveLength(4);
    octets.forEach((octet) => {
      const num = parseInt(octet, 10);
      expect(num).toBeGreaterThanOrEqual(0);
      expect(num).toBeLessThanOrEqual(255);
    });
  });

  // Test case 3: Generate private IPv4 address
  it('3. should generate private IPv4 address when requested', () => {
    // Act
    const result = generateRandomIPv4(true);

    // Assert
    expect(result).toMatch(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/);
    // Should be in private ranges: 192.168.x.x, 10.x.x.x, or 172.16-31.x.x
    const first = parseInt(result.split('.')[0], 10);
    const second = parseInt(result.split('.')[1], 10);
    const isPrivate =
      (first === 192 && second === 168) ||
      first === 10 ||
      (first === 172 && second >= 16 && second <= 31);
    expect(isPrivate).toBe(true);
  });

  // Test case 4: Different calls produce different IPs
  it('4. should generate different IPs on different calls', () => {
    // Act
    const ip1 = generateRandomIPv4();
    const ip2 = generateRandomIPv4();

    // Assert - statistically unlikely to be the same
    // Run multiple times to be more confident
    const ips = Array.from({ length: 10 }, () => generateRandomIPv4());
    const uniqueIps = new Set(ips);
    expect(uniqueIps.size).toBeGreaterThan(1);
  });

  // Test case 5: Public IP format
  it('5. should generate valid public IP format', () => {
    // Act
    const result = generateRandomIPv4(false);

    // Assert
    const octets = result.split('.').map((o) => parseInt(o, 10));
    expect(octets[0]).toBeGreaterThanOrEqual(1);
    expect(octets[0]).toBeLessThanOrEqual(223);
    expect(octets[3]).toBeGreaterThanOrEqual(1);
    expect(octets[3]).toBeLessThanOrEqual(254);
  });
});
