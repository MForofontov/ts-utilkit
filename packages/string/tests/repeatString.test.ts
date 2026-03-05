import { repeatString } from '../src/repeatString';

describe('repeatString', () => {
  it('1. should repeat a string the given number of times', () => {
    expect(repeatString('ab', 3)).toBe('ababab');
  });
  it('2. should return empty string when count is 0', () => {
    expect(repeatString('hello', 0)).toBe('');
  });
  it('3. should return the string once when count is 1', () => {
    expect(repeatString('hello', 1)).toBe('hello');
  });
  it('4. should handle empty string input', () => {
    expect(repeatString('', 5)).toBe('');
  });
  it('5. should throw RangeError for negative count', () => {
    expect(() => repeatString('x', -1)).toThrow(RangeError);
  });
  it('6. should throw RangeError for float count', () => {
    expect(() => repeatString('x', 2.5)).toThrow(RangeError);
  });
});
