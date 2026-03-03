import { encodeHex } from '../src/encodeHex';

describe('encodeHex', () => {
  it('1. should encode a simple ASCII string', () => {
    expect(encodeHex('hello')).toBe('68656c6c6f');
  });

  it('2. should encode an empty string to an empty string', () => {
    expect(encodeHex('')).toBe('');
  });

  it('3. should encode a single character', () => {
    expect(encodeHex('A')).toBe('41');
    expect(encodeHex('a')).toBe('61');
  });

  it('4. should encode a null byte (\\x00)', () => {
    expect(encodeHex('\x00')).toBe('00');
  });

  it('5. should encode control characters and high-byte ASCII', () => {
    expect(encodeHex('\x01\x02\x03')).toBe('010203');
  });

  it('6. should produce lowercase hex digits only', () => {
    const result = encodeHex('Hello World');
    expect(result).toBe(result.toLowerCase());
  });

  it('7. should encode a UTF-8 two-byte character (U+00E9 "é")', () => {
    // é is encoded as 0xC3 0xA9 in UTF-8
    expect(encodeHex('é')).toBe('c3a9');
  });

  it('8. should encode a UTF-8 three-byte character (U+20AC "€")', () => {
    // € is encoded as 0xE2 0x82 0xAC in UTF-8
    expect(encodeHex('€')).toBe('e282ac');
  });

  it('9. should encode an emoji (U+1F600 "😀", 4 UTF-8 bytes)', () => {
    // 😀 is 0xF0 0x9F 0x98 0x80 in UTF-8
    expect(encodeHex('😀')).toBe('f09f9880');
  });

  it('10. should produce output of exactly 2× the byte count', () => {
    // 'Hi' = 2 ASCII bytes → 4 hex chars
    expect(encodeHex('Hi')).toHaveLength(4);
    // 'é' = 2 UTF-8 bytes → 4 hex chars
    expect(encodeHex('é')).toHaveLength(4);
    // '€' = 3 UTF-8 bytes → 6 hex chars
    expect(encodeHex('€')).toHaveLength(6);
  });

  it('11. should round-trip correctly with decodeHex', () => {
    const { decodeHex } = require('../src/decodeHex');
    const inputs = ['hello', '', 'Hi!', 'café', '😀'];
    for (const input of inputs) {
      expect(decodeHex(encodeHex(input))).toBe(input);
    }
  });

});
