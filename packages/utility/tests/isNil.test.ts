import { isNil } from '../src/isNil';

describe('isNil', () => {
  // Test case 1: null value
  it('1. should return true for null', () => {
    expect(isNil(null)).toBe(true);
  });

  // Test case 2: undefined value
  it('2. should return true for undefined', () => {
    expect(isNil(undefined)).toBe(true);
  });

  // Test case 3: zero value
  it('3. should return false for zero', () => {
    expect(isNil(0)).toBe(false);
  });

  // Test case 4: empty string
  it('4. should return false for empty string', () => {
    expect(isNil('')).toBe(false);
  });

  // Test case 5: object value
  it('5. should return false for an object', () => {
    expect(isNil({})).toBe(false);
  });

  // Test case 6: NaN value
  it('6. should return false for NaN', () => {
    expect(isNil(NaN)).toBe(false);
  });

  // Test case 7: boolean false
  it('7. should return false for false', () => {
    expect(isNil(false)).toBe(false);
  });
});
