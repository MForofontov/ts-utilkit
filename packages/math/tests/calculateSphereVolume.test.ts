import { calculateSphereVolume } from '../src/geometricFunctions/calculateSphereVolume';

describe('calculateSphereVolume', () => {
  // Test case 1: Volume of a sphere with a positive integer radius
  it('1. should return the correct volume for a positive integer radius', () => {
    const radius: number = 5;
    const expected: number = (4 / 3) * Math.PI * Math.pow(radius, 3);
    const result: number = calculateSphereVolume(radius);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 2: Volume of a sphere with a positive floating-point radius
  it('2. should return the correct volume for a positive floating-point radius', () => {
    const radius: number = 5.5;
    const expected: number = (4 / 3) * Math.PI * Math.pow(radius, 3);
    const result: number = calculateSphereVolume(radius);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 3: Volume of a sphere with a radius of zero
  it('3. should return 0 for a radius of zero', () => {
    const radius: number = 0;
    const expected: number = 0;
    const result: number = calculateSphereVolume(radius);
    expect(result).toBe(expected);
  });

  // Test case 4: Volume of a sphere with a very small positive radius
  it('4. should return the correct volume for a very small positive radius', () => {
    const radius: number = 1e-10;
    const expected: number = (4 / 3) * Math.PI * Math.pow(radius, 3);
    const result: number = calculateSphereVolume(radius);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 5: Volume of a sphere with a very large positive radius
  it('5. should return the correct volume for a very large positive radius', () => {
    const radius: number = 1e10;
    const expected: number = (4 / 3) * Math.PI * Math.pow(radius, 3);
    const result: number = calculateSphereVolume(radius);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 6: Volume of a sphere with a negative radius (should throw an error)
  it('6. should throw an error for a negative radius', () => {
    const radius: number = -5;
    expect(() => calculateSphereVolume(radius)).toThrow(
      'Radius must be a non-negative number',
    );
  });

  // Test case 7: Volume of a sphere with NaN radius (should throw an error)
  it('7. should throw an error for NaN radius', () => {
    const radius: number = NaN;
    expect(() => calculateSphereVolume(radius)).toThrow(
      'Radius must be a number',
    );
  });
});
