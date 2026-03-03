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
});
