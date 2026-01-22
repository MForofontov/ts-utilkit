import { calculateSine } from '../src/geometricFunctions/calculateSine';

describe('sine', () => {
  // Test case 1: Sine of 0 degrees
  it('1. should return 0 for 0 degrees', () => {
    const degrees: number = 0;
    const expected: number = 0;
    const result: number = calculateSine(degrees);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 2: Sine of 30 degrees
  it('2. should return 0.5 for 30 degrees', () => {
    const degrees: number = 30;
    const expected: number = 0.5;
    const result: number = calculateSine(degrees);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 3: Sine of 90 degrees
  it('3. should return 1 for 90 degrees', () => {
    const degrees: number = 90;
    const expected: number = 1;
    const result: number = calculateSine(degrees);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 4: Sine of 180 degrees
  it('4. should return 0 for 180 degrees', () => {
    const degrees: number = 180;
    const expected: number = 0;
    const result: number = calculateSine(degrees);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 5: Sine of 270 degrees
  it('5. should return -1 for 270 degrees', () => {
    const degrees: number = 270;
    const expected: number = -1;
    const result: number = calculateSine(degrees);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 6: Sine of 360 degrees
  it('6. should return 0 for 360 degrees', () => {
    const degrees: number = 360;
    const expected: number = 0;
    const result: number = calculateSine(degrees);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 7: Sine of a negative angle
  it('7. should return the correct sine for a negative angle', () => {
    const degrees: number = -30;
    const expected: number = -0.5;
    const result: number = calculateSine(degrees);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 8: Sine of an angle greater than 360 degrees
  it('8. should return the correct sine for an angle greater than 360 degrees', () => {
    const degrees: number = 450;
    const expected: number = 1; // Sine of 450 degrees is the same as sine of 90 degrees
    const result: number = calculateSine(degrees);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 9: Sine of NaN (should throw an error)
  it('9. should throw an error for NaN input', () => {
    const degrees: number = NaN;
    expect(() => calculateSine(degrees)).toThrow('Degrees must be a number');
  });
});
