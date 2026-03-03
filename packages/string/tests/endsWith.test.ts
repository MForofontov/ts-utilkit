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
});
