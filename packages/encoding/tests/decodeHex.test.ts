import { decodeHex } from '../src/decodeHex';

describe('decodeHex', () => {
  it('1. should decode a simple hex string', () => {
    expect(decodeHex('68656c6c6f')).toBe('hello');
  });

  it('2. should decode an empty string to an empty string', () => {
    expect(decodeHex('')).toBe('');
  });

  it('3. should decode a single byte', () => {
    expect(decodeHex('41')).toBe('A');
    expect(decodeHex('61')).toBe('a');
  });

  it('4. should decode a null byte (00)', () => {
    expect(decodeHex('00')).toBe('\x00');
  });

  it('5. should accept uppercase hex digits', () => {
    expect(decodeHex('48656C6C6F')).toBe('Hello');
  });

  it('6. should accept mixed-case hex digits', () => {
    expect(decodeHex('68656C6c6F')).toBe('hello');
  });

  it('7. should decode a UTF-8 two-byte sequence ("é" = c3a9)', () => {
    expect(decodeHex('c3a9')).toBe('é');
  });

  it('8. should decode a UTF-8 three-byte sequence ("€" = e282ac)', () => {
    expect(decodeHex('e282ac')).toBe('€');
  });

  it('9. should decode a UTF-8 four-byte sequence ("😀" = f09f9880)', () => {
    expect(decodeHex('f09f9880')).toBe('😀');
  });

  it('10. should decode multiple bytes correctly', () => {
    expect(decodeHex('010203')).toBe('\x01\x02\x03');
  });

  it('11. should round-trip correctly with encodeHex', () => {
    const { encodeHex } = require('../src/encodeHex');
    const inputs = ['hello', '', 'Hi!', 'café', '😀'];
    for (const input of inputs) {
      expect(decodeHex(encodeHex(input))).toBe(input);
    }
  });

  it('12. should throw TypeError when str is not a string', () => {
    expect(() => decodeHex(42 as unknown as string)).toThrow(TypeError);
    expect(() => decodeHex(42 as unknown as string)).toThrow(
      'str must be a string, got number',
    );
  });

  it('13. should throw TypeError for null input', () => {
    expect(() => decodeHex(null as unknown as string)).toThrow(TypeError);
    expect(() => decodeHex(null as unknown as string)).toThrow(
      'str must be a string, got object',
    );
  });

  it('14. should throw Error for odd-length hex strings', () => {
    expect(() => decodeHex('abc')).toThrow(Error);
    expect(() => decodeHex('abc')).toThrow('Invalid hex string: length must be even');
  });

  it('15. should throw Error for strings with non-hex characters', () => {
    expect(() => decodeHex('xyz0')).toThrow(Error);
    expect(() => decodeHex('xyz0')).toThrow(
      'Invalid hex string: contains non-hex characters',
    );
  });

  it('16. should throw Error for even-length strings with non-hex characters', () => {
    expect(() => decodeHex('6z6f')).toThrow(Error);
    expect(() => decodeHex('6z6f')).toThrow(
      'Invalid hex string: contains non-hex characters',
    );
  });
});
