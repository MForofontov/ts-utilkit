import { calculateCircleCircumference } from '../src/geometricFunctions/calculateCircleCircumference';

describe('calculateCircleCircumference', () => {
  // Test case 1: Circumference of a circle with a positive integer radius
  it('1. should return the correct circumference for a positive integer radius', () => {
    const radius: number = 5;
    const expected: number = 2 * Math.PI * radius;
    const result: number = calculateCircleCircumference(radius);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 2: Circumference of a circle with a positive floating-point radius
  it('2. should return the correct circumference for a positive floating-point radius', () => {
    const radius: number = 5.5;
    const expected: number = 2 * Math.PI * radius;
    const result: number = calculateCircleCircumference(radius);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 3: Circumference of a circle with a radius of zero
  it('3. should return 0 for a radius of 0', () => {
    const radius: number = 0;
    const expected: number = 0;
    const result: number = calculateCircleCircumference(radius);
    expect(result).toBe(expected);
  });

  // Test case 4: Circumference of a circle with a very small positive radius
  it('4. should return the correct circumference for a very small positive radius', () => {
    const radius: number = 1e-10;
    const expected: number = 2 * Math.PI * radius;
    const result: number = calculateCircleCircumference(radius);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 5: Circumference of a circle with a very large positive radius
  it('5. should return the correct circumference for a very large positive radius', () => {
    const radius: number = 1e10;
    const expected: number = 2 * Math.PI * radius;
    const result: number = calculateCircleCircumference(radius);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 6: Circumference of a circle with a negative radius (should throw an error)
  it('6. should throw an error for a negative radius', () => {
    const radius: number = -5;
    expect(() => calculateCircleCircumference(radius)).toThrow(
      'Radius must be a non-negative number',
    );
  });

  // Test case 7: Circumference of a circle with NaN radius (should throw an error)
  it('7. should throw an error for NaN radius', () => {
    const radius: number = NaN;
    expect(() => calculateCircleCircumference(radius)).toThrow(
      'Radius must be a number',
    );
  });
});
