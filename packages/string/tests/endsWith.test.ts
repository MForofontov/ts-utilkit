import { endsWith } from '../src/endsWith';

describe('endsWith', () => {
  it('1. should return true when string ends with the search string', () => {
    expect(endsWith('hello world', 'world')).toBe(true);
  });
  it('2. should return false when string does not end with the search string', () => {
    expect(endsWith('hello world', 'hello')).toBe(false);
  });
  it('3. should return true for empty search string', () => {
    expect(endsWith('hello', '')).toBe(true);
  });
  it('4. should return true when string equals the search string', () => {
    expect(endsWith('hello', 'hello')).toBe(true);
  });
  it('5. should be case-sensitive', () => {
    expect(endsWith('Hello', 'hello')).toBe(false);
  });
  it('6. should throw TypeError when str is not a string', () => {
    expect(() => endsWith(123 as unknown as string, 'x')).toThrow(TypeError);
    expect(() => endsWith(123 as unknown as string, 'x')).toThrow('str must be a string, got number');
  });
  it('7. should throw TypeError when searchString is not a string', () => {
    expect(() => endsWith('hello', 123 as unknown as string)).toThrow(TypeError);
    expect(() => endsWith('hello', 123 as unknown as string)).toThrow('searchString must be a string, got number');
  });
});
