import { calculateCircleArea } from '../src/geometricFunctions/calculateCircleArea';

describe('calculateCircleArea', () => {
  // Test case 1: Area of a circle with a positive integer radius
  it('1. should return the correct area for a positive integer radius', () => {
    const radius: number = 5;
    const expected: number = Math.PI * Math.pow(radius, 2);
    const result: number = calculateCircleArea(radius);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 2: Area of a circle with a positive floating-point radius
  it('2. should return the correct area for a positive floating-point radius', () => {
    const radius: number = 5.5;
    const expected: number = Math.PI * Math.pow(radius, 2);
    const result: number = calculateCircleArea(radius);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 3: Area of a circle with a radius of zero
  it('3. should return 0 for a radius of 0', () => {
    const radius: number = 0;
    const expected: number = 0;
    const result: number = calculateCircleArea(radius);
    expect(result).toBe(expected);
  });

  // Test case 4: Area of a circle with a very small positive radius
  it('4. should return the correct area for a very small positive radius', () => {
    const radius: number = 1e-10;
    const expected: number = Math.PI * Math.pow(radius, 2);
    const result: number = calculateCircleArea(radius);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 5: Area of a circle with a very large positive radius
  it('5. should return the correct area for a very large positive radius', () => {
    const radius: number = 1e10;
    const expected: number = Math.PI * Math.pow(radius, 2);
    const result: number = calculateCircleArea(radius);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 6: Area of a circle with a negative radius (should throw an error)
  it('6. should throw an error for a negative radius', () => {
    const radius: number = -5;
    expect(() => calculateCircleArea(radius)).toThrow(
      'Radius must be a non-negative number',
    );
  });

  // Test case 7: Area of a circle with NaN radius (should throw an error)
  it('7. should throw an error for NaN radius', () => {
    const radius: number = NaN;
    expect(() => calculateCircleArea(radius)).toThrow(
      'Radius must be a number',
    );
  });
});
