import { startsWith } from '../src/startsWith';

describe('startsWith', () => {
  it('1. should return true when string starts with the search string', () => {
    expect(startsWith('hello world', 'hello')).toBe(true);
  });
  it('2. should return false when string does not start with the search string', () => {
    expect(startsWith('hello world', 'world')).toBe(false);
  });
  it('3. should return true for empty search string', () => {
    expect(startsWith('hello', '')).toBe(true);
  });
  it('4. should return true when string equals the search string', () => {
    expect(startsWith('hello', 'hello')).toBe(true);
  });
  it('5. should be case-sensitive', () => {
    expect(startsWith('Hello', 'hello')).toBe(false);
  });
  it('6. should throw TypeError when str is not a string', () => {
    expect(() => startsWith(123 as unknown as string, 'x')).toThrow(TypeError);
    expect(() => startsWith(123 as unknown as string, 'x')).toThrow('str must be a string, got number');
  });
  it('7. should throw TypeError when searchString is not a string', () => {
    expect(() => startsWith('hello', 123 as unknown as string)).toThrow(TypeError);
    expect(() => startsWith('hello', 123 as unknown as string)).toThrow('searchString must be a string, got number');
  });
});
