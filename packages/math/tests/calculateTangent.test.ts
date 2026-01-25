import { calculateTangent } from '../src/geometricFunctions/calculateTangent';
import { degreesToRadians } from '../src/geometricFunctions/degreesToRadians';

describe('calculateTangent', () => {
  // Test case 1: Tangent of 0 degrees
  it('1. should return 0 for 0 degrees', () => {
    const degrees: number = 0;
    const expected: number = 0;
    const result: number = calculateTangent(degrees);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 2: Tangent of 45 degrees
  it('2. should return 1 for 45 degrees', () => {
    const degrees: number = 45;
    const expected: number = 1;
    const result: number = calculateTangent(degrees);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 3: Tangent of 90 degrees (should return Infinity)
  it('3. should return Infinity for 90 degrees', () => {
    const degrees: number = 90;
    const expected: number = Infinity;
    const result: number = calculateTangent(degrees);
    expect(result).toBe(expected);
  });

  // Test case 4: Tangent of 180 degrees
  it('4. should return 0 for 180 degrees', () => {
    const degrees: number = 180;
    const expected: number = 0;
    const result: number = calculateTangent(degrees);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 5: Tangent of 270 degrees (should return -Infinity)
  it('5. should return -Infinity for 270 degrees', () => {
    const degrees: number = 270;
    const expected: number = -Infinity;
    const result: number = calculateTangent(degrees);
    expect(result).toBe(expected);
  });

  // Test case 6: Tangent of 360 degrees
  it('6. should return 0 for 360 degrees', () => {
    const degrees: number = 360;
    const expected: number = 0;
    const result: number = calculateTangent(degrees);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 7: Tangent of a negative angle
  it('7. should return the correct tangent for a negative angle', () => {
    const degrees: number = -45;
    const expected: number = -1;
    const result: number = calculateTangent(degrees);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 8: Tangent of an angle greater than 360 degrees
  it('8. should return the correct tangent for an angle greater than 360 degrees', () => {
    const degrees: number = 450;
    const expected: number = Infinity; // Tangent of 450 degrees is the same as tangent of 90 degrees
    const result: number = calculateTangent(degrees);
    expect(result).toBe(expected);
  });

  // Test case 9: Tangent of a very large angle
  it('9. should return the correct tangent for a very large angle', () => {
    const degrees: number = 1e6;
    const expected: number = Math.tan(degreesToRadians(degrees));
    const result: number = calculateTangent(degrees);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 10: Tangent of NaN (should throw an error)
  it('10. should throw an error for NaN input', () => {
    const degrees: number = NaN;
    expect(() => calculateTangent(degrees)).toThrow('Degrees must be a number');
  });
});
