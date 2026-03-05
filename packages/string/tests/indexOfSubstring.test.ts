import { indexOfSubstring } from '../src/indexOfSubstring';

describe('indexOfSubstring', () => {
  it('1. should return the index of the first occurrence', () => {
    expect(indexOfSubstring('hello world', 'world')).toBe(6);
  });
  it('2. should return -1 when not found', () => {
    expect(indexOfSubstring('hello world', 'xyz')).toBe(-1);
  });
  it('3. should return 0 for empty search string', () => {
    expect(indexOfSubstring('hello', '')).toBe(0);
  });
  it('4. should return the index of the first match when multiple exist', () => {
    expect(indexOfSubstring('hello hello', 'hello')).toBe(0);
  });
  it('5. should be case-sensitive', () => {
    expect(indexOfSubstring('Hello World', 'world')).toBe(-1);
  });
});
