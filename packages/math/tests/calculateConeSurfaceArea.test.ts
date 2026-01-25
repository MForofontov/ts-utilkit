import { calculateConeSurfaceArea } from '../src/geometricFunctions/calculateConeSurfaceArea';

describe('calculateConeSurfaceArea', () => {
  // Test case 1: Surface area of a cone with positive radius and slant height
  it('1. should return the correct surface area for positive radius and slant height', () => {
    const radius: number = 5;
    const slantHeight: number = 10;
    const expected: number =
      Math.PI * Math.pow(radius, 2) + Math.PI * radius * slantHeight;
    const result: number = calculateConeSurfaceArea(radius, slantHeight);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 2: Surface area of a cone with zero radius
  it('2. should return the correct surface area for zero radius', () => {
    const radius: number = 0;
    const slantHeight: number = 10;
    const expected: number = 0;
    const result: number = calculateConeSurfaceArea(radius, slantHeight);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 3: Surface area of a cone with zero slant height
  it('3. should return the correct surface area for zero slant height', () => {
    const radius: number = 5;
    const slantHeight: number = 0;
    const expected: number = Math.PI * Math.pow(radius, 2);
    const result: number = calculateConeSurfaceArea(radius, slantHeight);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 4: Surface area of a cone with very small positive radius and slant height
  it('4. should return the correct surface area for very small positive radius and slant height', () => {
    const radius: number = 1e-10;
    const slantHeight: number = 1e-10;
    const expected: number =
      Math.PI * Math.pow(radius, 2) + Math.PI * radius * slantHeight;
    const result: number = calculateConeSurfaceArea(radius, slantHeight);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 5: Surface area of a cone with very large positive radius and slant height
  it('5. should return the correct surface area for very large positive radius and slant height', () => {
    const radius: number = 1e10;
    const slantHeight: number = 1e10;
    const expected: number =
      Math.PI * Math.pow(radius, 2) + Math.PI * radius * slantHeight;
    const result: number = calculateConeSurfaceArea(radius, slantHeight);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 6: Surface area of a cone with negative radius (should throw an error)
  it('6. should throw an error for negative radius', () => {
    const radius: number = -5;
    const slantHeight: number = 10;
    expect(() => calculateConeSurfaceArea(radius, slantHeight)).toThrow(
      'Radius must be a non-negative number',
    );
  });

  // Test case 7: Surface area of a cone with negative slant height (should throw an error)
  it('7. should throw an error for negative slant height', () => {
    const radius: number = 5;
    const slantHeight: number = -10;
    expect(() => calculateConeSurfaceArea(radius, slantHeight)).toThrow(
      'Slant height must be a non-negative number',
    );
  });

  // Test case 8: Surface area of a cone with NaN radius (should throw an error)
  it('8. should throw an error for NaN radius', () => {
    const radius: number = NaN;
    const slantHeight: number = 10;
    expect(() => calculateConeSurfaceArea(radius, slantHeight)).toThrow(
      'Radius and slant height must be numbers',
    );
  });

  // Test case 9: Surface area of a cone with NaN slant height (should throw an error)
  it('9. should throw an error for NaN slant height', () => {
    const radius: number = 5;
    const slantHeight: number = NaN;
    expect(() => calculateConeSurfaceArea(radius, slantHeight)).toThrow(
      'Radius and slant height must be numbers',
    );
  });
});
