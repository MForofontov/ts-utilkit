import { encodeBase64URL } from '../src/encodeBase64URL';

describe('encodeBase64URL', () => {
  it('1. should encode a simple ASCII string', () => {
    expect(encodeBase64URL('hello')).toBe('aGVsbG8');
  });

  it('2. should encode a string with a space', () => {
    expect(encodeBase64URL('hello world')).toBe('aGVsbG8gd29ybGQ');
  });

  it('3. should encode an empty string to an empty string', () => {
    expect(encodeBase64URL('')).toBe('');
  });

  it('4. should produce no "+" characters in the output', () => {
    // Strings that produce '+' in standard Base64 but '-' in Base64URL
    const result = encodeBase64URL('\xfb');
    expect(result).not.toContain('+');
  });

  it('5. should produce no "/" characters in the output', () => {
    const result = encodeBase64URL('\xff');
    expect(result).not.toContain('/');
  });

  it('6. should produce no "=" padding characters in the output', () => {
    // 'f' and 'fo' produce padding in standard Base64
    expect(encodeBase64URL('f')).not.toContain('=');
    expect(encodeBase64URL('fo')).not.toContain('=');
  });

  it('7. should encode the JWT header correctly', () => {
    // Standard JWT header encoding (well-known vector)
    expect(encodeBase64URL('{"alg":"HS256","typ":"JWT"}')).toBe(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    );
  });

  it('8. should encode UTF-8 multi-byte characters', () => {
    expect(encodeBase64URL('café')).toBe('Y2Fmw6k');
    expect(encodeBase64URL('Hello 世界')).toBe('SGVsbG8g5LiW55WM');
  });

  it('9. should encode emoji (4-byte UTF-8 sequence)', () => {
    expect(encodeBase64URL('😀')).toBe('8J-YgA');
  });

  it('10. should handle a single character', () => {
    expect(encodeBase64URL('A')).toBe('QQ');
  });

  it('11. should encode a URL string without breaking it', () => {
    const result = encodeBase64URL('https://example.com?foo=bar&baz=qux');
    expect(result).not.toContain('+');
    expect(result).not.toContain('/');
    expect(result).not.toContain('=');
  });

  it('12. should round-trip correctly with decodeBase64URL', () => {
    const { decodeBase64URL } = require('../src/decodeBase64URL');
    const inputs = ['hello world', '', 'café', '{"alg":"HS256"}', 'abc123!@#'];
    for (const input of inputs) {
      expect(decodeBase64URL(encodeBase64URL(input))).toBe(input);
    }
  });
});
