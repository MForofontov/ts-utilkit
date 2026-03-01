import { isNil } from '../src/isNil';

describe('isNil', () => {
  it('1. should return true for null', () => {
    expect(isNil(null)).toBe(true);
  });
  it('2. should return true for undefined', () => {
    expect(isNil(undefined)).toBe(true);
  });
  it('3. should return false for 0', () => {
    expect(isNil(0)).toBe(false);
  });
  it('4. should return false for empty string', () => {
    expect(isNil('')).toBe(false);
  });
  it('5. should return false for false', () => {
    expect(isNil(false)).toBe(false);
  });
  it('6. should return false for NaN', () => {
    expect(isNil(NaN)).toBe(false);
  });
  it('7. should return false for objects', () => {
    expect(isNil({})).toBe(false);
  });
  it('8. should return false for non-empty string', () => {
    expect(isNil('hello')).toBe(false);
  });
});
