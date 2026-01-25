import { calculateTrapezoidArea } from '../src/geometricFunctions/calculateTrapezoidArea';

describe('calculateTrapezoidArea', () => {
  // Test case 1: Area of a trapezoid with positive integer bases and height
  it('1. should return the correct area for positive integer bases and height', () => {
    const base1: number = 5;
    const base2: number = 7;
    const height: number = 3;
    const expected: number = 0.5 * (base1 + base2) * height;
    const result: number = calculateTrapezoidArea(base1, base2, height);
    expect(result).toBe(expected);
  });

  // Test case 2: Area of a trapezoid with positive floating-point bases and height
  it('2. should return the correct area for positive floating-point bases and height', () => {
    const base1: number = 5.5;
    const base2: number = 7.5;
    const height: number = 3.5;
    const expected: number = 0.5 * (base1 + base2) * height;
    const result: number = calculateTrapezoidArea(base1, base2, height);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 3: Area of a trapezoid with a base1 of zero
  it('3. should return the correct area for a base1 of zero', () => {
    const base1: number = 0;
    const base2: number = 7;
    const height: number = 3;
    const expected: number = 0.5 * (base1 + base2) * height;
    const result: number = calculateTrapezoidArea(base1, base2, height);
    expect(result).toBe(expected);
  });

  // Test case 4: Area of a trapezoid with a base2 of zero
  it('4. should return the correct area for a base2 of zero', () => {
    const base1: number = 5;
    const base2: number = 0;
    const height: number = 3;
    const expected: number = 0.5 * (base1 + base2) * height;
    const result: number = calculateTrapezoidArea(base1, base2, height);
    expect(result).toBe(expected);
  });

  // Test case 5: Area of a trapezoid with a height of zero
  it('5. should return 0 for a height of zero', () => {
    const base1: number = 5;
    const base2: number = 7;
    const height: number = 0;
    const expected: number = 0;
    const result: number = calculateTrapezoidArea(base1, base2, height);
    expect(result).toBe(expected);
  });

  // Test case 6: Area of a trapezoid with very small positive bases and height
  it('6. should return the correct area for very small positive bases and height', () => {
    const base1: number = 1e-10;
    const base2: number = 1e-10;
    const height: number = 1e-10;
    const expected: number = 0.5 * (base1 + base2) * height;
    const result: number = calculateTrapezoidArea(base1, base2, height);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 7: Area of a trapezoid with very large positive bases and height
  it('7. should return the correct area for very large positive bases and height', () => {
    const base1: number = 1e10;
    const base2: number = 1e10;
    const height: number = 1e10;
    const expected: number = 0.5 * (base1 + base2) * height;
    const result: number = calculateTrapezoidArea(base1, base2, height);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 8: Area of a trapezoid with negative base1 (should throw an error)
  it('8. should throw an error for negative base1', () => {
    const base1: number = -5;
    const base2: number = 7;
    const height: number = 3;
    expect(() => calculateTrapezoidArea(base1, base2, height)).toThrow(
      'Base1, base2, and height must be non-negative numbers',
    );
  });

  // Test case 9: Area of a trapezoid with negative base2 (should throw an error)
  it('9. should throw an error for negative base2', () => {
    const base1: number = 5;
    const base2: number = -7;
    const height: number = 3;
    expect(() => calculateTrapezoidArea(base1, base2, height)).toThrow(
      'Base1, base2, and height must be non-negative numbers',
    );
  });

  // Test case 10: Area of a trapezoid with negative height (should throw an error)
  it('10. should throw an error for negative height', () => {
    const base1: number = 5;
    const base2: number = 7;
    const height: number = -3;
    expect(() => calculateTrapezoidArea(base1, base2, height)).toThrow(
      'Base1, base2, and height must be non-negative numbers',
    );
  });

  // Test case 11: Area of a trapezoid with NaN base1 (should throw an error)
  it('11. should throw an error for NaN base1', () => {
    const base1: number = NaN;
    const base2: number = 7;
    const height: number = 3;
    expect(() => calculateTrapezoidArea(base1, base2, height)).toThrow(
      'Base1, base2, and height must be numbers',
    );
  });

  // Test case 12: Area of a trapezoid with NaN base2 (should throw an error)
  it('12. should throw an error for NaN base2', () => {
    const base1: number = 5;
    const base2: number = NaN;
    const height: number = 3;
    expect(() => calculateTrapezoidArea(base1, base2, height)).toThrow(
      'Base1, base2, and height must be numbers',
    );
  });

  // Test case 13: Area of a trapezoid with NaN height (should throw an error)
  it('13. should throw an error for NaN height', () => {
    const base1: number = 5;
    const base2: number = 7;
    const height: number = NaN;
    expect(() => calculateTrapezoidArea(base1, base2, height)).toThrow(
      'Base1, base2, and height must be numbers',
    );
  });
});
