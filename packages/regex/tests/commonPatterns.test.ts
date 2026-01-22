import {
  CommonPatterns,
  getCommonPattern,
  testCommonPattern,
} from '../src/commonPatterns';

/**
 * Unit tests for common patterns and helper functions.
 */
describe('CommonPatterns', () => {
  // Email pattern tests
  it('1. should validate email addresses', () => {
    expect(CommonPatterns.email.test('test@example.com')).toBe(true);
    expect(CommonPatterns.email.test('user.name@domain.co')).toBe(true);
    expect(CommonPatterns.email.test('invalid@')).toBe(false);
  });

  // URL pattern tests
  it('2. should validate URLs', () => {
    expect(CommonPatterns.url.test('https://example.com')).toBe(true);
    expect(CommonPatterns.url.test('http://test.org/path')).toBe(true);
    expect(CommonPatterns.url.test('not-a-url')).toBe(false);
  });

  // IPv4 pattern tests
  it('3. should validate IPv4 addresses', () => {
    expect(CommonPatterns.ipv4.test('192.168.1.1')).toBe(true);
    expect(CommonPatterns.ipv4.test('255.255.255.255')).toBe(true);
    expect(CommonPatterns.ipv4.test('256.1.1.1')).toBe(false);
  });

  // IPv6 pattern tests
  it('4. should validate IPv6 addresses', () => {
    expect(
      CommonPatterns.ipv6.test('2001:0db8:85a3:0000:0000:8a2e:0370:7334'),
    ).toBe(true);
    expect(CommonPatterns.ipv6.test('::1')).toBe(true);
    expect(CommonPatterns.ipv6.test('invalid')).toBe(false);
  });

  // UUID pattern tests
  it('5. should validate UUIDs', () => {
    expect(
      CommonPatterns.uuid.test('550e8400-e29b-41d4-a716-446655440000'),
    ).toBe(true);
    expect(CommonPatterns.uuid.test('invalid-uuid')).toBe(false);
  });

  // Hex color pattern tests
  it('6. should validate hex colors', () => {
    expect(CommonPatterns.hexColor.test('#fff')).toBe(true);
    expect(CommonPatterns.hexColor.test('#FFFFFF')).toBe(true);
    expect(CommonPatterns.hexColor.test('#12345G')).toBe(false);
  });

  // Credit card pattern tests
  it('7. should validate credit card numbers', () => {
    expect(CommonPatterns.creditCard.test('4532-1234-5678-9010')).toBe(true);
    expect(CommonPatterns.creditCard.test('4532123456789010')).toBe(true);
    expect(CommonPatterns.creditCard.test('123')).toBe(false);
  });

  // ZIP code pattern tests
  it('8. should validate US ZIP codes', () => {
    expect(CommonPatterns.zipCodeUS.test('12345')).toBe(true);
    expect(CommonPatterns.zipCodeUS.test('12345-6789')).toBe(true);
    expect(CommonPatterns.zipCodeUS.test('1234')).toBe(false);
  });

  // ISO date pattern tests
  it('9. should validate ISO dates', () => {
    expect(CommonPatterns.isoDate.test('2024-01-15')).toBe(true);
    expect(CommonPatterns.isoDate.test('2024-1-5')).toBe(false);
  });

  // ISO datetime pattern tests
  it('10. should validate ISO datetime', () => {
    expect(CommonPatterns.isoDateTime.test('2024-01-15T10:30:00Z')).toBe(true);
    expect(CommonPatterns.isoDateTime.test('2024-01-15T10:30:00')).toBe(true);
  });

  // Alphanumeric pattern tests
  it('11. should validate alphanumeric strings', () => {
    expect(CommonPatterns.alphanumeric.test('abc123')).toBe(true);
    expect(CommonPatterns.alphanumeric.test('test-value')).toBe(false);
  });

  // Username pattern tests
  it('12. should validate usernames', () => {
    expect(CommonPatterns.username.test('user_name123')).toBe(true);
    expect(CommonPatterns.username.test('user-name')).toBe(true);
    expect(CommonPatterns.username.test('us')).toBe(false); // Too short
  });

  // Strong password pattern tests
  it('13. should validate strong passwords', () => {
    expect(CommonPatterns.strongPassword.test('Password123!')).toBe(true);
    expect(CommonPatterns.strongPassword.test('weak')).toBe(false);
  });

  // HTML tag pattern tests
  it('14. should validate HTML tags', () => {
    expect(CommonPatterns.htmlTag.test('<div>')).toBe(true);
    expect(CommonPatterns.htmlTag.test("<img src='test.jpg'>")).toBe(true);
    expect(CommonPatterns.htmlTag.test('not a tag')).toBe(false);
  });

  // Slug pattern tests
  it('15. should validate slugs', () => {
    expect(CommonPatterns.slug.test('my-blog-post')).toBe(true);
    expect(CommonPatterns.slug.test('valid_slug_123')).toBe(true);
    expect(CommonPatterns.slug.test('Invalid Slug!')).toBe(false);
  });

  // MAC address pattern tests
  it('16. should validate MAC addresses', () => {
    expect(CommonPatterns.macAddress.test('00:1A:2B:3C:4D:5E')).toBe(true);
    expect(CommonPatterns.macAddress.test('00-1A-2B-3C-4D-5E')).toBe(true);
    expect(CommonPatterns.macAddress.test('invalid')).toBe(false);
  });

  // Semver pattern tests
  it('17. should validate semantic versions', () => {
    expect(CommonPatterns.semver.test('1.2.3')).toBe(true);
    expect(CommonPatterns.semver.test('10.20.30')).toBe(true);
    expect(CommonPatterns.semver.test('1.2')).toBe(false);
  });
});

describe('getCommonPattern', () => {
  it('18. should return pattern by name', () => {
    const pattern = getCommonPattern('email');
    expect(pattern).toBe(CommonPatterns.email);
  });

  it('19. should throw Error for unknown pattern name', () => {
    expect(() => getCommonPattern('unknown' as any)).toThrow(Error);
    expect(() => getCommonPattern('unknown' as any)).toThrow(
      'Unknown pattern name: unknown',
    );
  });

  it('20. should throw TypeError when name is not a string', () => {
    expect(() => getCommonPattern(123 as any)).toThrow(TypeError);
    expect(() => getCommonPattern(123 as any)).toThrow('name must be a string');
  });
});

describe('testCommonPattern', () => {
  it('22. should test text against common pattern', () => {
    expect(testCommonPattern('test@example.com', 'email')).toBe(true);
    expect(testCommonPattern('invalid', 'email')).toBe(false);
  });

  it('22. should work with all pattern names', () => {
    expect(testCommonPattern('https://example.com', 'url')).toBe(true);
    expect(testCommonPattern('192.168.1.1', 'ipv4')).toBe(true);
    expect(testCommonPattern('#fff', 'hexColor')).toBe(true);
  });

  it('23. should throw TypeError when text is not a string', () => {
    expect(() => testCommonPattern(123 as any, 'email')).toThrow(TypeError);
    expect(() => testCommonPattern(123 as any, 'email')).toThrow(
      'text must be a string',
    );
  });

  it('24. should throw TypeError when name is not a string', () => {
    expect(() => testCommonPattern('test', 123 as any)).toThrow(TypeError);
    expect(() => testCommonPattern('test', 123 as any)).toThrow(
      'name must be a string',
    );
  });

  it('25. should throw Error for unknown pattern name', () => {
    expect(() => testCommonPattern('test', 'unknown' as any)).toThrow(Error);
    expect(() => testCommonPattern('test', 'unknown' as any)).toThrow(
      'Unknown pattern name: unknown',
    );
  });
});
