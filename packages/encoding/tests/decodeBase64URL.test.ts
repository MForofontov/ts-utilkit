import { decodeBase64URL } from '../src/decodeBase64URL';

describe('decodeBase64URL', () => {
  it('1. should decode a simple Base64URL string', () => {
    expect(decodeBase64URL('aGVsbG8')).toBe('hello');
  });

  it('2. should decode a Base64URL string with a space', () => {
    expect(decodeBase64URL('aGVsbG8gd29ybGQ')).toBe('hello world');
  });

  it('3. should decode an empty string to an empty string', () => {
    expect(decodeBase64URL('')).toBe('');
  });

  it('4. should decode a JWT header', () => {
    expect(decodeBase64URL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')).toBe(
      '{"alg":"HS256","typ":"JWT"}',
    );
  });

  it('5. should decode UTF-8 multi-byte characters', () => {
    expect(decodeBase64URL('Y2Fmw6k')).toBe('café');
    expect(decodeBase64URL('SGVsbG8g5LiW55WM')).toBe('Hello 世界');
  });

  it('6. should decode emoji', () => {
    expect(decodeBase64URL('8J-YgA')).toBe('😀');
  });

  it('7. should accept optional "=" padding characters', () => {
    // Padded variants are valid
    expect(decodeBase64URL('aGVsbG8=')).toBe('hello');
    expect(decodeBase64URL('aGVsbG8gd29ybGQ=')).toBe('hello world');
  });

  it('8. should accept mixed-case input', () => {
    // Base64URL alphabet is case-sensitive (A≠a), but test a known lower-case segment
    expect(decodeBase64URL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')).toBe(
      '{"alg":"HS256","typ":"JWT"}',
    );
  });

  it('9. should decode a single-char encoded value', () => {
    expect(decodeBase64URL('QQ')).toBe('A');
  });

  it('10. should accept "-" and "_" and reject "+" and "/" characters', () => {
    // '---_' is a valid Base64URL string (- maps to +, _ maps to /)
    expect(() => decodeBase64URL('---_')).not.toThrow();

    // Strings containing standard Base64 '+' or '/' are invalid in Base64URL
    expect(() => decodeBase64URL('a+bc')).toThrow('Invalid Base64URL string');
    expect(() => decodeBase64URL('a/bc')).toThrow('Invalid Base64URL string');
  });

  it('11. should round-trip correctly with encodeBase64URL', () => {
    const { encodeBase64URL } = require('../src/encodeBase64URL');
    const inputs = ['hello world', '', 'café', '{"sub":"1234"}', '😀'];
    for (const input of inputs) {
      expect(decodeBase64URL(encodeBase64URL(input))).toBe(input);
    }
  });

  it('12. should throw TypeError when str is not a string', () => {
    expect(() => decodeBase64URL(42 as unknown as string)).toThrow(TypeError);
    expect(() => decodeBase64URL(42 as unknown as string)).toThrow(
      'str must be a string, got number',
    );
  });

  it('13. should throw TypeError for null input', () => {
    expect(() => decodeBase64URL(null as unknown as string)).toThrow(TypeError);
    expect(() => decodeBase64URL(null as unknown as string)).toThrow(
      'str must be a string, got object',
    );
  });

  it('14. should throw Error for strings with invalid characters', () => {
    expect(() => decodeBase64URL('hello world!')).toThrow(Error);
    expect(() => decodeBase64URL('hello world!')).toThrow('Invalid Base64URL string');
  });

  it('15. should throw Error for strings containing "+" or "/"', () => {
    // Standard Base64 characters are not valid Base64URL
    expect(() => decodeBase64URL('aGVsb+8')).toThrow('Invalid Base64URL string');
    expect(() => decodeBase64URL('aGVsb/8')).toThrow('Invalid Base64URL string');
  });
});
