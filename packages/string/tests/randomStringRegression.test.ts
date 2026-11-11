import { generateRandomString } from '../src/generateRandomString';

describe('random string large charsets', () => {
  it('1. supports charsets longer than one-byte random values', () => {
    const charset = Array.from({ length: 300 }, (_, i) =>
      String.fromCharCode(256 + i),
    ).join('');
    const result = generateRandomString(100, charset);
    expect(result).toHaveLength(100);
    expect([...result].every((char) => charset.includes(char))).toBe(true);
  });
});
