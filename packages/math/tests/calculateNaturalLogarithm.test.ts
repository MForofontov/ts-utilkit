import { calculateNaturalLogarithm } from '../src/algebraFunctions/calculateNaturalLogarithm';

describe('calculateNaturalLogarithm', () => {
  // Test case 1: Natural logarithm of a positive number
  it('1. should return the correct natural logarithm for a positive number', () => {
    const input: number = Math.E;
    const expected: number = 1;
    const result: number = calculateNaturalLogarithm(input);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 2: Natural logarithm of 1
  it('2. should return 0 for the natural logarithm of 1', () => {
    const input: number = 1;
    const expected: number = 0;
    const result: number = calculateNaturalLogarithm(input);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 3: Natural logarithm of a number less than 1
  it('3. should return the correct natural logarithm for a number less than 1', () => {
    const input: number = 0.1;
    const expected: number = Math.log(0.1);
    const result: number = calculateNaturalLogarithm(input);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 4: Natural logarithm of a negative number (should return NaN)
  it('4. should return NaN for the natural logarithm of a negative number', () => {
    const input: number = -10;
    const result: number = calculateNaturalLogarithm(input);
    expect(result).toBeNaN();
  });

  // Test case 5: Natural logarithm of zero (should return -Infinity)
  it('5. should return -Infinity for the natural logarithm of zero', () => {
    const input: number = 0;
    const expected: number = -Infinity;
    const result: number = calculateNaturalLogarithm(input);
    expect(result).toBe(expected);
  });

  // Test case 6: Natural logarithm of a large positive number
  it('6. should return the correct natural logarithm for a large positive number', () => {
    const input: number = 1000000;
    const expected: number = Math.log(1000000);
    const result: number = calculateNaturalLogarithm(input);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 7: Natural logarithm of a small positive number
  it('7. should return the correct natural logarithm for a small positive number', () => {
    const input: number = 0.0001;
    const expected: number = Math.log(0.0001);
    const result: number = calculateNaturalLogarithm(input);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 8: Natural logarithm of NaN
  it('8. should return NaN for the natural logarithm of NaN', () => {
    const input: number = NaN;
    const result: number = calculateNaturalLogarithm(input);
    expect(result).toBeNaN();
  });

  // Test case 9: Natural logarithm of Infinity
  it('9. should return Infinity for the natural logarithm of Infinity', () => {
    const input: number = Infinity;
    const expected: number = Infinity;
    const result: number = calculateNaturalLogarithm(input);
    expect(result).toBe(expected);
  });

  // Test case 10: Natural logarithm of a very small positive number
  it('10. should return the correct natural logarithm for a very small positive number', () => {
    const input: number = 1e-10;
    const expected: number = Math.log(1e-10);
    const result: number = calculateNaturalLogarithm(input);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 11: Natural logarithm of a large positive number
  it('11. should return the correct natural logarithm for a large positive number', () => {
    const input: number = 1e10;
    const expected: number = Math.log(1e10);
    const result: number = calculateNaturalLogarithm(input);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 12: Natural logarithm of a very large positive number
  it('12. should return the correct natural logarithm for a very large positive number', () => {
    const input: number = 1e100;
    const expected: number = Math.log(1e100);
    const result: number = calculateNaturalLogarithm(input);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 13: Natural logarithm of a very small positive number
  it('13. should return the correct natural logarithm for a very small positive number', () => {
    const input: number = 1e-100;
    const expected: number = Math.log(1e-100);
    const result: number = calculateNaturalLogarithm(input);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 14: Natural logarithm of a fractional number
  it('14. should return the correct natural logarithm for a fractional number', () => {
    const input: number = 0.5;
    const expected: number = Math.log(0.5);
    const result: number = calculateNaturalLogarithm(input);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 15: Natural logarithm of a large fractional number
  it('15. should return the correct natural logarithm for a large fractional number', () => {
    const input: number = 1.5;
    const expected: number = Math.log(1.5);
    const result: number = calculateNaturalLogarithm(input);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 16: Natural logarithm of a very large fractional number
  it('16. should return the correct natural logarithm for a very large fractional number', () => {
    const input: number = 1.0000000001;
    const expected: number = Math.log(1.0000000001);
    const result: number = calculateNaturalLogarithm(input);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 17: Natural logarithm of a very small fractional number
  it('17. should return the correct natural logarithm for a very small fractional number', () => {
    const input: number = 0.0000000001;
    const expected: number = Math.log(0.0000000001);
    const result: number = calculateNaturalLogarithm(input);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 18: Natural logarithm of a number close to 1
  it('18. should return the correct natural logarithm for a number close to 1', () => {
    const input: number = 1.0000000001;
    const expected: number = Math.log(1.0000000001);
    const result: number = calculateNaturalLogarithm(input);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 19: Natural logarithm of a number close to 0
  it('19. should return the correct natural logarithm for a number close to 0', () => {
    const input: number = 0.0000000001;
    const expected: number = Math.log(0.0000000001);
    const result: number = calculateNaturalLogarithm(input);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 20: Natural logarithm of a number close to Infinity
  it('20. should return the correct natural logarithm for a number close to Infinity', () => {
    const input: number = 1e100;
    const expected: number = Math.log(1e100);
    const result: number = calculateNaturalLogarithm(input);
    expect(result).toBeCloseTo(expected, 5);
  });
});
