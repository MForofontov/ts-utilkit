import { decodeBase32 } from '../src/decodeBase32';

describe('decodeBase32', () => {
  it('1. should decode the known Base32 vector for "hello"', () => {
    expect(decodeBase32('NBSWY3DP')).toBe('hello');
  });

  it('2. should decode an empty string to an empty string', () => {
    expect(decodeBase32('')).toBe('');
  });

  it('3. should decode a single encoded byte', () => {
    expect(decodeBase32('MY======')).toBe('f');
  });

  it('4. should decode two encoded bytes', () => {
    expect(decodeBase32('MZXQ====')).toBe('fo');
  });

  it('5. should decode three encoded bytes', () => {
    expect(decodeBase32('MZXW6===')).toBe('foo');
  });

  it('6. should decode four encoded bytes', () => {
    expect(decodeBase32('MZXW6YQ=')).toBe('foob');
  });

  it('7. should decode five encoded bytes (no padding)', () => {
    expect(decodeBase32('MZXW6YTB')).toBe('fooba');
  });

  it('8. should decode the TOTP test vector (RFC 6238 reference)', () => {
    expect(decodeBase32('GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ')).toBe(
      '12345678901234567890',
    );
  });

  it('9. should be case-insensitive', () => {
    expect(decodeBase32('nbswy3dp')).toBe('hello');
    expect(decodeBase32('Nbswy3dp')).toBe('hello');
  });

  it('10. should accept input without trailing padding', () => {
    // Padding-free variants of known vectors
    expect(decodeBase32('NBSWY3DP')).toBe('hello'); // already no padding
    expect(decodeBase32('MY')).toBe('f');
    expect(decodeBase32('MZXQ')).toBe('fo');
  });

  it('11. should decode UTF-8 multi-byte encoded strings', () => {
    const { encodeBase32 } = require('../src/encodeBase32');
    expect(decodeBase32(encodeBase32('café'))).toBe('café');
    expect(decodeBase32(encodeBase32('😀'))).toBe('😀');
  });

  it('12. should round-trip correctly with encodeBase32', () => {
    const { encodeBase32 } = require('../src/encodeBase32');
    const inputs = [
      'hello',
      'f',
      'fo',
      'foo',
      'foob',
      'fooba',
      'foobar',
      '12345678901234567890',
    ];
    for (const input of inputs) {
      expect(decodeBase32(encodeBase32(input))).toBe(input);
    }
  });

  it('15. should throw Error for characters outside the Base32 alphabet', () => {
    // '!' is not in A–Z or 2–7
    expect(() => decodeBase32('NBSWY3DP!')).toThrow(Error);
    expect(() => decodeBase32('NBSWY3DP!')).toThrow('Invalid Base32 string');
  });

  it('16. should throw Error for digits not in the Base32 alphabet (0, 1, 8, 9)', () => {
    expect(() => decodeBase32('NBSWY0DP')).toThrow('Invalid Base32 string');
    expect(() => decodeBase32('NBSWY1DP')).toThrow('Invalid Base32 string');
    expect(() => decodeBase32('NBSWY8DP')).toThrow('Invalid Base32 string');
    expect(() => decodeBase32('NBSWY9DP')).toThrow('Invalid Base32 string');
  });
});
