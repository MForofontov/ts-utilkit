import { calculatePercentage } from '../src/arithmeticFunctions/calculatePercentage';

describe('calculatePercentage', () => {
  // Test case 1: Typical case
  it('1. should return the correct percentage for typical values', () => {
    const total: number = 200;
    const part: number = 50;
    const expected: number = 25;
    const result: number = calculatePercentage(total, part);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 2: Part is zero
  it('2. should return 0 when the part is zero', () => {
    const total: number = 200;
    const part: number = 0;
    const expected: number = 0;
    const result: number = calculatePercentage(total, part);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 3: Total is zero (should handle division by zero)
  it('3. should return Infinity when the total is zero', () => {
    const total: number = 0;
    const part: number = 50;
    const expected: number = Infinity;
    const result: number = calculatePercentage(total, part);
    expect(result).toBe(expected);
  });

  // Test case 4: Part is greater than total
  it('4. should return a percentage greater than 100 when the part is greater than the total', () => {
    const total: number = 100;
    const part: number = 150;
    const expected: number = 150;
    const result: number = calculatePercentage(total, part);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 5: Part is equal to total
  it('5. should return 100 when the part is equal to the total', () => {
    const total: number = 100;
    const part: number = 100;
    const expected: number = 100;
    const result: number = calculatePercentage(total, part);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 6: Total is negative
  it('6. should return a negative percentage when the total is negative', () => {
    const total: number = -200;
    const part: number = 50;
    const expected: number = -25;
    const result: number = calculatePercentage(total, part);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 7: Part is negative
  it('7. should return a negative percentage when the part is negative', () => {
    const total: number = 200;
    const part: number = -50;
    const expected: number = -25;
    const result: number = calculatePercentage(total, part);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 8: Both total and part are negative
  it('8. should return a positive percentage when both the total and part are negative', () => {
    const total: number = -200;
    const part: number = -50;
    const expected: number = 25;
    const result: number = calculatePercentage(total, part);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 9: Total is a very large number
  it('9. should return the correct percentage for a very large total', () => {
    const total: number = 1e10;
    const part: number = 1e9;
    const expected: number = 10;
    const result: number = calculatePercentage(total, part);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 10: Part is a very large number
  it('10. should return the correct percentage for a very large part', () => {
    const total: number = 1e9;
    const part: number = 1e10;
    const expected: number = 1000;
    const result: number = calculatePercentage(total, part);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 11: Total is a very small number
  it('11. should return the correct percentage for a very small total', () => {
    const total: number = 1e-10;
    const part: number = 1e-11;
    const expected: number = 10;
    const result: number = calculatePercentage(total, part);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 12: Part is a very small number
  it('12. should return the correct percentage for a very small part', () => {
    const total: number = 1e-9;
    const part: number = 1e-10;
    const expected: number = 10;
    const result: number = calculatePercentage(total, part);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 13: Both total and part are very large numbers
  it('13. should return the correct percentage for very large total and part', () => {
    const total: number = 1e20;
    const part: number = 1e19;
    const expected: number = 10;
    const result: number = calculatePercentage(total, part);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 14: Both total and part are very small numbers
  it('14. should return the correct percentage for very small total and part', () => {
    const total: number = 1e-20;
    const part: number = 1e-21;
    const expected: number = 10;
    const result: number = calculatePercentage(total, part);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 15: Total is NaN
  it('15. should return NaN when the total is NaN', () => {
    const total: number = NaN;
    const part: number = 50;
    const result: number = calculatePercentage(total, part);
    expect(result).toBeNaN();
  });

  // Test case 16: Part is NaN
  it('16. should return NaN when the part is NaN', () => {
    const total: number = 200;
    const part: number = NaN;
    const result: number = calculatePercentage(total, part);
    expect(result).toBeNaN();
  });

  // Test case 17: Both total and part are NaN
  it('17. should return NaN when both the total and part are NaN', () => {
    const total: number = NaN;
    const part: number = NaN;
    const result: number = calculatePercentage(total, part);
    expect(result).toBeNaN();
  });

  // Test case 18: Total is Infinity
  it('18. should return 0 when the total is Infinity', () => {
    const total: number = Infinity;
    const part: number = 50;
    const expected: number = 0;
    const result: number = calculatePercentage(total, part);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 19: Part is Infinity
  it('19. should return Infinity when the part is Infinity', () => {
    const total: number = 200;
    const part: number = Infinity;
    const expected: number = Infinity;
    const result: number = calculatePercentage(total, part);
    expect(result).toBe(expected);
  });

  // Test case 20: Both total and part are Infinity
  it('20. should return NaN when both the total and part are Infinity', () => {
    const total: number = Infinity;
    const part: number = Infinity;
    const result: number = calculatePercentage(total, part);
    expect(result).toBeNaN();
  });

  // Test case 21: Calculate percentage for floating-point total and part
  it('21. should return the correct percentage for floating-point total and part', () => {
    const total: number = 200.5;
    const part: number = 50.5;
    const expected: number = (50.5 / 200.5) * 100;
    const result: number = calculatePercentage(total, part);
    expect(result).toBeCloseTo(expected, 5);
  });
});
