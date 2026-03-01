import { generateRandomString } from '../src/generateRandomString';

describe('generateRandomString (testing-utilities - deprecated)', () => {
  it('1. should generate string of the requested length', () => {
    expect(generateRandomString(10)).toHaveLength(10);
  });
  it('2. should generate alphanumeric string by default', () => {
    expect(generateRandomString(20)).toMatch(/^[A-Za-z0-9]+$/);
  });
  it('3. should generate alpha-only string', () => {
    expect(generateRandomString(20, 'alpha')).toMatch(/^[A-Za-z]+$/);
  });
  it('4. should generate numeric-only string', () => {
    expect(generateRandomString(10, 'numeric')).toMatch(/^\d+$/);
  });
  it('5. should generate hex string', () => {
    expect(generateRandomString(16, 'hex')).toMatch(/^[0-9A-F]+$/);
  });
  it('6. should return empty string for length 0', () => {
    expect(generateRandomString(0)).toBe('');
  });
  it('7. should throw Error for negative length', () => {
    expect(() => generateRandomString(-1)).toThrow(Error);
    expect(() => generateRandomString(-1)).toThrow('length must be a non-negative number');
  });
  it('8. should throw Error when length is not a number', () => {
    expect(() => generateRandomString('x' as unknown as number)).toThrow(Error);
  });
});
