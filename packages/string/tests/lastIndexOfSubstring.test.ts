import { lastIndexOfSubstring } from '../src/lastIndexOfSubstring';

describe('lastIndexOfSubstring', () => {
  it('1. should return the index of the last occurrence', () => {
    expect(lastIndexOfSubstring('hello hello', 'hello')).toBe(6);
  });
  it('2. should return -1 when not found', () => {
    expect(lastIndexOfSubstring('hello world', 'xyz')).toBe(-1);
  });
  it('3. should return the correct index for a single occurrence', () => {
    expect(lastIndexOfSubstring('hello world', 'world')).toBe(6);
  });
  it('4. should return 0 when empty search string', () => {
    expect(lastIndexOfSubstring('hello', '')).toBe(5);
  });
  it('5. should be case-sensitive', () => {
    expect(lastIndexOfSubstring('Hello World', 'world')).toBe(-1);
  });
  it('6. should throw TypeError when str is not a string', () => {
    expect(() => lastIndexOfSubstring(123 as unknown as string, 'x')).toThrow(TypeError);
    expect(() => lastIndexOfSubstring(123 as unknown as string, 'x')).toThrow('str must be a string, got number');
  });
  it('7. should throw TypeError when searchString is not a string', () => {
    expect(() => lastIndexOfSubstring('hello', 123 as unknown as string)).toThrow(TypeError);
    expect(() => lastIndexOfSubstring('hello', 123 as unknown as string)).toThrow('searchString must be a string, got number');
  });
});
