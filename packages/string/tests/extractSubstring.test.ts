import { extractSubstring } from '../src/extractSubstring';

describe('extractSubstring', () => {
  it('1. should extract from middle of string', () => {
    expect(extractSubstring('hello world', 6, 5)).toBe('world');
  });
  it('2. should extract from the start', () => {
    expect(extractSubstring('abcdef', 0, 3)).toBe('abc');
  });
  it('3. should extract a single character', () => {
    expect(extractSubstring('hello', 1, 1)).toBe('e');
  });
  it('4. should return empty string when length is 0', () => {
    expect(extractSubstring('hello', 0, 0)).toBe('');
  });
  it('5. should clamp to end of string when length exceeds remaining chars', () => {
    expect(extractSubstring('hello', 3, 100)).toBe('lo');
  });
  it('6. should throw RangeError for negative startIndex', () => {
    expect(() => extractSubstring('hello', -1, 2)).toThrow(RangeError);
    expect(() => extractSubstring('hello', -1, 2)).toThrow('startIndex must be non-negative');
  });
  it('7. should throw RangeError for negative length', () => {
    expect(() => extractSubstring('hello', 0, -1)).toThrow(RangeError);
    expect(() => extractSubstring('hello', 0, -1)).toThrow('length must be non-negative');
  });
});
