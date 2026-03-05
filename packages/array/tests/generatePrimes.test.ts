import { generatePrimes } from '../src/generatePrimes';

/**
 * Unit tests for the deprecated generatePrimes function in the array package.
 * @deprecated The canonical implementation is now in @ts-utilkit/math.
 */
describe('generatePrimes (array package - deprecated)', () => {
  it('1. should generate all prime numbers up to 10', () => {
    expect(generatePrimes(10)).toEqual([2, 3, 5, 7]);
  });
  it('2. should generate all prime numbers up to 20', () => {
    expect(generatePrimes(20)).toEqual([2, 3, 5, 7, 11, 13, 17, 19]);
  });
  it('3. should return empty array when limit is less than 2', () => {
    expect(generatePrimes(1)).toEqual([]);
    expect(generatePrimes(0)).toEqual([]);
  });
  it('4. should return [2] when limit is 2', () => {
    expect(generatePrimes(2)).toEqual([2]);
  });
  it('5. should return correct count for limit 100', () => {
    expect(generatePrimes(100).length).toBe(25);
  });
  it('6. should include limit when limit is prime', () => {
    expect(generatePrimes(13)).toContain(13);
  });
  it('7. should throw RangeError for non-integer limit', () => {
    expect(() => generatePrimes(10.5)).toThrow(RangeError);
  });
  it('8. should throw RangeError for NaN', () => {
    expect(() => generatePrimes(NaN)).toThrow(RangeError);
  });
});
