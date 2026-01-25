import { degreesToRadians } from '../src/geometricFunctions/degreesToRadians';

describe('degreesToRadians', () => {
  // Test case 1: Convert 0 degrees to radians
  it('1. should return 0 for 0 degrees', () => {
    const degrees: number = 0;
    const expected: number = 0;
    const result: number = degreesToRadians(degrees);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 2: Convert 90 degrees to radians
  it('2. should return π/2 for 90 degrees', () => {
    const degrees: number = 90;
    const expected: number = Math.PI / 2;
    const result: number = degreesToRadians(degrees);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 3: Convert 180 degrees to radians
  it('3. should return π for 180 degrees', () => {
    const degrees: number = 180;
    const expected: number = Math.PI;
    const result: number = degreesToRadians(degrees);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 4: Convert 270 degrees to radians
  it('4. should return 3π/2 for 270 degrees', () => {
    const degrees: number = 270;
    const expected: number = (3 * Math.PI) / 2;
    const result: number = degreesToRadians(degrees);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 5: Convert 360 degrees to radians
  it('5. should return 2π for 360 degrees', () => {
    const degrees: number = 360;
    const expected: number = 2 * Math.PI;
    const result: number = degreesToRadians(degrees);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 6: Convert a negative angle to radians
  it('6. should return the correct radians for a negative angle', () => {
    const degrees: number = -45;
    const expected: number = -Math.PI / 4;
    const result: number = degreesToRadians(degrees);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 7: Convert an angle greater than 360 degrees to radians
  it('7. should return the correct radians for an angle greater than 360 degrees', () => {
    const degrees: number = 450;
    const expected: number = 2.5 * Math.PI; // 450 degrees is equivalent to 90 degrees
    const result: number = degreesToRadians(degrees);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 8: Convert a very small angle to radians
  it('8. should return the correct radians for a very small angle', () => {
    const degrees: number = 1e-10;
    const expected: number = degrees * (Math.PI / 180);
    const result: number = degreesToRadians(degrees);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 9: Convert a very large angle to radians
  it('9. should return the correct radians for a very large angle', () => {
    const degrees: number = 1e10;
    const expected: number = degrees * (Math.PI / 180);
    const result: number = degreesToRadians(degrees);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 10: Convert NaN to radians (should throw an error)
  it('10. should throw an error for NaN input', () => {
    const degrees: number = NaN;
    expect(() => degreesToRadians(degrees)).toThrow('Degrees must be a number');
  });
});
