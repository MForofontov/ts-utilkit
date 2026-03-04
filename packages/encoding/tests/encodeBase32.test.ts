import { encodeBase32 } from '../src/encodeBase32';

describe('encodeBase32', () => {
  it('1. should encode "hello" to the known Base32 vector', () => {
    // Well-known test vector: 'hello' → 'NBSWY3DP'
    expect(encodeBase32('hello')).toBe('NBSWY3DP');
  });

  it('2. should encode an empty string to an empty string', () => {
    expect(encodeBase32('')).toBe('');
  });

  it('3. should encode a single character with 6 padding characters', () => {
    // 1 byte → 2 Base32 chars + 6 '=' padding
    expect(encodeBase32('f')).toBe('MY======');
  });

  it('4. should encode two characters with 4 padding characters', () => {
    // 2 bytes → 4 Base32 chars + 4 '=' padding
    expect(encodeBase32('fo')).toBe('MZXQ====');
  });

  it('5. should encode three characters with 3 padding characters', () => {
    // 3 bytes → 5 Base32 chars + 3 '=' padding
    expect(encodeBase32('foo')).toBe('MZXW6===');
  });

  it('6. should encode four characters with 1 padding character', () => {
    // 4 bytes → 7 Base32 chars + 1 '=' padding
    expect(encodeBase32('foob')).toBe('MZXW6YQ=');
  });

  it('7. should encode five characters with no padding', () => {
    // 5 bytes → 8 Base32 chars, no padding
    expect(encodeBase32('fooba')).toBe('MZXW6YTB');
  });

  it('8. should encode the TOTP test vector (RFC 6238 reference)', () => {
    // Well-known TOTP reference key used in RFC 6238 appendix
    expect(encodeBase32('12345678901234567890')).toBe(
      'GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ',
    );
  });

  it('9. should produce only uppercase A–Z and 2–7 characters (plus padding)', () => {
    const result = encodeBase32('Hello World!');
    // Strip padding and check alphabet
    const chars = result.replace(/=+$/, '');
    expect(/^[A-Z2-7]+$/.test(chars)).toBe(true);
  });

  it('10. should produce output whose length is a multiple of 8', () => {
    const inputs = [
      'a',
      'ab',
      'abc',
      'abcd',
      'abcde',
      'abcdef',
      'abcdefg',
      'abcdefgh',
    ];
    for (const input of inputs) {
      expect(encodeBase32(input).length % 8).toBe(0);
    }
  });

  it('11. should encode UTF-8 multi-byte characters', () => {
    // Round-trip is the validation; exact value tested in decodeBase32
    const { decodeBase32 } = require('../src/decodeBase32');
    expect(decodeBase32(encodeBase32('café'))).toBe('café');
  });

  it('12. should round-trip correctly with decodeBase32', () => {
    const { decodeBase32 } = require('../src/decodeBase32');
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
});
