import { calculateCylinderSurfaceArea } from '../src/geometricFunctions/calculateCylinderSurfaceArea';

describe('calculateCylinderSurfaceArea', () => {
  // Test case 1: Surface area of a cylinder with positive radius and height
  it('1. should return the correct surface area for positive radius and height', () => {
    const radius: number = 5;
    const height: number = 10;
    const expected: number = 2 * Math.PI * radius * (radius + height);
    const result: number = calculateCylinderSurfaceArea(radius, height);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 2: Surface area of a cylinder with zero radius
  it('2. should return the correct surface area for zero radius', () => {
    const radius: number = 0;
    const height: number = 10;
    const expected: number = 0;
    const result: number = calculateCylinderSurfaceArea(radius, height);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 3: Surface area of a cylinder with zero height
  it('3. should return the correct surface area for zero height', () => {
    const radius: number = 5;
    const height: number = 0;
    const expected: number = 2 * Math.PI * Math.pow(radius, 2);
    const result: number = calculateCylinderSurfaceArea(radius, height);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 4: Surface area of a cylinder with very small positive radius and height
  it('4. should return the correct surface area for very small positive radius and height', () => {
    const radius: number = 1e-10;
    const height: number = 1e-10;
    const expected: number = 2 * Math.PI * radius * (radius + height);
    const result: number = calculateCylinderSurfaceArea(radius, height);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 5: Surface area of a cylinder with very large positive radius and height
  it('5. should return the correct surface area for very large positive radius and height', () => {
    const radius: number = 1e10;
    const height: number = 1e10;
    const expected: number = 2 * Math.PI * radius * (radius + height);
    const result: number = calculateCylinderSurfaceArea(radius, height);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 6: Surface area of a cylinder with negative radius (should throw an error)
  it('6. should throw an error for negative radius', () => {
    const radius: number = -5;
    const height: number = 10;
    expect(() => calculateCylinderSurfaceArea(radius, height)).toThrow(
      'Radius must be a non-negative number',
    );
  });

  // Test case 7: Surface area of a cylinder with negative height (should throw an error)
  it('7. should throw an error for negative height', () => {
    const radius: number = 5;
    const height: number = -10;
    expect(() => calculateCylinderSurfaceArea(radius, height)).toThrow(
      'Height must be a non-negative number',
    );
  });

  // Test case 8: Surface area of a cylinder with NaN radius (should throw an error)
  it('8. should throw an error for NaN radius', () => {
    const radius: number = NaN;
    const height: number = 10;
    expect(() => calculateCylinderSurfaceArea(radius, height)).toThrow(
      'Radius and height must be numbers',
    );
  });

  // Test case 9: Surface area of a cylinder with NaN height (should throw an error)
  it('9. should throw an error for NaN height', () => {
    const radius: number = 5;
    const height: number = NaN;
    expect(() => calculateCylinderSurfaceArea(radius, height)).toThrow(
      'Radius and height must be numbers',
    );
  });
});
