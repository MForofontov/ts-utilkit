import { reverseString } from '../src/reverseString';

describe('reverseString', () => {
  it('1. should reverse a simple string', () => {
    expect(reverseString('hello')).toBe('olleh');
  });
  it('2. should reverse a palindrome back to itself', () => {
    expect(reverseString('racecar')).toBe('racecar');
  });
  it('3. should handle empty string', () => {
    expect(reverseString('')).toBe('');
  });
  it('4. should handle single character', () => {
    expect(reverseString('a')).toBe('a');
  });
  it('5. should reverse string with spaces', () => {
    expect(reverseString('hello world')).toBe('dlrow olleh');
  });
  it('6. should throw TypeError when str is not a string', () => {
    expect(() => reverseString(123 as unknown as string)).toThrow(TypeError);
    expect(() => reverseString(123 as unknown as string)).toThrow('str must be a string, got number');
  });
});
