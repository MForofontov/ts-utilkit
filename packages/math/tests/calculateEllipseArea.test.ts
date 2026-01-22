import { calculateEllipseArea } from '../src/geometricFunctions/calculateEllipseArea';

describe('calculateEllipseArea', () => {
  // Test case 1: Area of an ellipse with positive semi-major and semi-minor axes
  it('1. should return the correct area for positive semi-major and semi-minor axes', () => {
    const semiMajor: number = 5;
    const semiMinor: number = 3;
    const expected: number = Math.PI * semiMajor * semiMinor;
    const result: number = calculateEllipseArea(semiMajor, semiMinor);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 2: Area of an ellipse with zero semi-major axis
  it('2. should return 0 for zero semi-major axis', () => {
    const semiMajor: number = 0;
    const semiMinor: number = 3;
    const expected: number = 0;
    const result: number = calculateEllipseArea(semiMajor, semiMinor);
    expect(result).toBe(expected);
  });

  // Test case 3: Area of an ellipse with zero semi-minor axis
  it('3. should return 0 for zero semi-minor axis', () => {
    const semiMajor: number = 5;
    const semiMinor: number = 0;
    const expected: number = 0;
    const result: number = calculateEllipseArea(semiMajor, semiMinor);
    expect(result).toBe(expected);
  });

  // Test case 4: Area of an ellipse with very small positive semi-major and semi-minor axes
  it('4. should return the correct area for very small positive semi-major and semi-minor axes', () => {
    const semiMajor: number = 1e-10;
    const semiMinor: number = 1e-10;
    const expected: number = Math.PI * semiMajor * semiMinor;
    const result: number = calculateEllipseArea(semiMajor, semiMinor);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 5: Area of an ellipse with very large positive semi-major and semi-minor axes
  it('5. should return the correct area for very large positive semi-major and semi-minor axes', () => {
    const semiMajor: number = 1e10;
    const semiMinor: number = 1e10;
    const expected: number = Math.PI * semiMajor * semiMinor;
    const result: number = calculateEllipseArea(semiMajor, semiMinor);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 6: Area of an ellipse with negative semi-major axis (should throw an error)
  it('6. should throw an error for negative semi-major axis', () => {
    const semiMajor: number = -5;
    const semiMinor: number = 3;
    expect(() => calculateEllipseArea(semiMajor, semiMinor)).toThrow(
      'Semi-major axis must be a non-negative number',
    );
  });

  // Test case 7: Area of an ellipse with negative semi-minor axis (should throw an error)
  it('7. should throw an error for negative semi-minor axis', () => {
    const semiMajor: number = 5;
    const semiMinor: number = -3;
    expect(() => calculateEllipseArea(semiMajor, semiMinor)).toThrow(
      'Semi-minor axis must be a non-negative number',
    );
  });

  // Test case 8: Area of an ellipse with NaN semi-major axis (should throw an error)
  it('8. should throw an error for NaN semi-major axis', () => {
    const semiMajor: number = NaN;
    const semiMinor: number = 3;
    expect(() => calculateEllipseArea(semiMajor, semiMinor)).toThrow(
      'Semi-major and semi-minor axes must be numbers',
    );
  });

  // Test case 9: Area of an ellipse with NaN semi-minor axis (should throw an error)
  it('9. should throw an error for NaN semi-minor axis', () => {
    const semiMajor: number = 5;
    const semiMinor: number = NaN;
    expect(() => calculateEllipseArea(semiMajor, semiMinor)).toThrow(
      'Semi-major and semi-minor axes must be numbers',
    );
  });
});
