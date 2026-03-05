import { encodeBase64 } from '../src/encodeBase64';

describe('encodeBase64', () => {
  // Test case 1: Encode a simple string (standard base64 with = padding)
  it('1. should encode a simple string with standard base64 padding', () => {
    expect(encodeBase64('hello world')).toBe('aGVsbG8gd29ybGQ=');
  });

  // Test case 2: Encode an empty string
  it('2. should encode an empty string', () => {
    expect(encodeBase64('')).toBe('');
  });

  // Test case 3: Encode a string with special characters (standard with = padding)
  it('3. should encode a string with special characters', () => {
    expect(encodeBase64('?foo=bar')).toBe('P2Zvbz1iYXI=');
  });

  // Test case 4: Encode unicode characters (15 UTF-8 bytes, no padding needed)
  it('4. should encode unicode characters', () => {
    expect(encodeBase64('こんにちは')).toBe('44GT44KT44Gr44Gh44Gv');
  });

  // Test case 5: Encode emoji (4 UTF-8 bytes, standard with == padding)
  it('5. should encode string with emoji characters', () => {
    expect(encodeBase64('😀')).toBe('8J+YgA==');
  });

  // Test case 6: Encode a 13-byte string (standard with == padding)
  it('6. should encode a string with punctuation', () => {
    expect(encodeBase64('Hello, World!')).toBe('SGVsbG8sIFdvcmxkIQ==');
  });

  // Test case 7: Standard base64 preserves "/" (not replaced with "_")
  it('7. should preserve "/" character (standard base64, not URL-safe)', () => {
    // '???' → 3 bytes [0x3F, 0x3F, 0x3F] → Pz8/ in standard base64
    expect(encodeBase64('???')).toBe('Pz8/');
  });

  // Test case 8: Standard base64 preserves "+" (not replaced with "-")
  it('8. should preserve "+" character (standard base64, not URL-safe)', () => {
    // '>>>' → 3 bytes [0x3E, 0x3E, 0x3E] → Pj4+ in standard base64
    expect(encodeBase64('>>>')).toBe('Pj4+');
  });

  // Test case 9: Standard base64 preserves "=" padding
  it('9. should include "=" padding in output', () => {
    expect(encodeBase64('a')).toBe('YQ==');
  });

  // Test case 10: Round-trip consistency
  it('10. should be decodable by standard base64 decoder', () => {
    const { Buffer } = require('buffer');
    const input = 'TypeScript utility!';
    const encoded = encodeBase64(input);
    const decoded = Buffer.from(encoded, 'base64').toString('utf8');
    expect(decoded).toBe(input);
  });
});
