import { toUpperCase } from '../src/toUpperCase';

describe('toUpperCase', () => {
  it('1. should convert lowercase to uppercase', () => {
    expect(toUpperCase('hello world')).toBe('HELLO WORLD');
  });
  it('2. should return already uppercase string unchanged', () => {
    expect(toUpperCase('HELLO')).toBe('HELLO');
  });
  it('3. should handle mixed case', () => {
    expect(toUpperCase('HeLLo WoRLd')).toBe('HELLO WORLD');
  });
  it('4. should handle empty string', () => {
    expect(toUpperCase('')).toBe('');
  });
  it('5. should leave non-letter characters unchanged', () => {
    expect(toUpperCase('abc123!@#')).toBe('ABC123!@#');
  });
  it('6. should throw TypeError when str is not a string', () => {
    expect(() => toUpperCase(123 as unknown as string)).toThrow(TypeError);
    expect(() => toUpperCase(123 as unknown as string)).toThrow('str must be a string, got number');
  });
});
