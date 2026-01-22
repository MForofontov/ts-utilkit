import { radiansToDegrees } from '../src/geometricFunctions/radiansToDegrees';

describe('radiansToDegrees', () => {
  // Test case 1: Convert 0 radians to degrees
  it('1. should return 0 for 0 radians', () => {
    const radians: number = 0;
    const expected: number = 0;
    const result: number = radiansToDegrees(radians);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 2: Convert π/2 radians to degrees
  it('2. should return 90 for π/2 radians', () => {
    const radians: number = Math.PI / 2;
    const expected: number = 90;
    const result: number = radiansToDegrees(radians);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 3: Convert π radians to degrees
  it('3. should return 180 for π radians', () => {
    const radians: number = Math.PI;
    const expected: number = 180;
    const result: number = radiansToDegrees(radians);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 4: Convert 3π/2 radians to degrees
  it('4. should return 270 for 3π/2 radians', () => {
    const radians: number = (3 * Math.PI) / 2;
    const expected: number = 270;
    const result: number = radiansToDegrees(radians);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 5: Convert 2π radians to degrees
  it('5. should return 360 for 2π radians', () => {
    const radians: number = 2 * Math.PI;
    const expected: number = 360;
    const result: number = radiansToDegrees(radians);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 6: Convert a negative angle to degrees
  it('6. should return the correct degrees for a negative angle', () => {
    const radians: number = -Math.PI / 4;
    const expected: number = -45;
    const result: number = radiansToDegrees(radians);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 7: Convert an angle greater than 2π radians to degrees
  it('7. should return the correct degrees for an angle greater than 2π radians', () => {
    const radians: number = 2.5 * Math.PI;
    const expected: number = 450; // 2.5π radians is equivalent to 450 degrees
    const result: number = radiansToDegrees(radians);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 8: Convert a very small angle to degrees
  it('8. should return the correct degrees for a very small angle', () => {
    const radians: number = 1e-10;
    const expected: number = radians * (180 / Math.PI);
    const result: number = radiansToDegrees(radians);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 9: Convert a very large angle to degrees
  it('9. should return the correct degrees for a very large angle', () => {
    const radians: number = 1e10;
    const expected: number = radians * (180 / Math.PI);
    const result: number = radiansToDegrees(radians);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 10: Convert NaN to degrees (should throw an error)
  it('10. should throw an error for NaN input', () => {
    const radians: number = NaN;
    expect(() => radiansToDegrees(radians)).toThrow('Radians must be a number');
  });
});
