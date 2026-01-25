import { calculateConeVolume } from '../src/geometricFunctions/calculateConeVolume';

describe('calculateConeVolume', () => {
  // Test case 1: Volume of a cone with positive radius and height
  it('1. should return the correct volume for positive radius and height', () => {
    const radius: number = 5;
    const height: number = 10;
    const expected: number = (1 / 3) * Math.PI * Math.pow(radius, 2) * height;
    const result: number = calculateConeVolume(radius, height);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 2: Volume of a cone with zero radius
  it('2. should return 0 for zero radius', () => {
    const radius: number = 0;
    const height: number = 10;
    const expected: number = 0;
    const result: number = calculateConeVolume(radius, height);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 3: Volume of a cone with zero height
  it('3. should return 0 for zero height', () => {
    const radius: number = 5;
    const height: number = 0;
    const expected: number = 0;
    const result: number = calculateConeVolume(radius, height);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 4: Volume of a cone with very small positive radius and height
  it('4. should return the correct volume for very small positive radius and height', () => {
    const radius: number = 1e-10;
    const height: number = 1e-10;
    const expected: number = (1 / 3) * Math.PI * Math.pow(radius, 2) * height;
    const result: number = calculateConeVolume(radius, height);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 5: Volume of a cone with very large positive radius and height
  it('5. should return the correct volume for very large positive radius and height', () => {
    const radius: number = 1e10;
    const height: number = 1e10;
    const expected: number = (1 / 3) * Math.PI * Math.pow(radius, 2) * height;
    const result: number = calculateConeVolume(radius, height);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 6: Volume of a cone with negative radius (should throw an error)
  it('6. should throw an error for negative radius', () => {
    const radius: number = -5;
    const height: number = 10;
    expect(() => calculateConeVolume(radius, height)).toThrow(
      'Radius must be a non-negative number',
    );
  });

  // Test case 7: Volume of a cone with negative height (should throw an error)
  it('7. should throw an error for negative height', () => {
    const radius: number = 5;
    const height: number = -10;
    expect(() => calculateConeVolume(radius, height)).toThrow(
      'Height must be a non-negative number',
    );
  });

  // Test case 8: Volume of a cone with NaN radius (should throw an error)
  it('8. should throw an error for NaN radius', () => {
    const radius: number = NaN;
    const height: number = 10;
    expect(() => calculateConeVolume(radius, height)).toThrow(
      'Radius and height must be numbers',
    );
  });

  // Test case 9: Volume of a cone with NaN height (should throw an error)
  it('9. should throw an error for NaN height', () => {
    const radius: number = 5;
    const height: number = NaN;
    expect(() => calculateConeVolume(radius, height)).toThrow(
      'Radius and height must be numbers',
    );
  });
});
