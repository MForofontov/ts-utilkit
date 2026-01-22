import { calculateCubeVolume } from '../src/geometricFunctions/calculateCubeVolume';

describe('calculateCubeVolume', () => {
  // Test case 1: Volume of a cube with a positive integer side length
  it('1. should return the correct volume for a positive integer side length', () => {
    const side: number = 3;
    const expected: number = Math.pow(side, 3);
    const result: number = calculateCubeVolume(side);
    expect(result).toBe(expected);
  });

  // Test case 2: Volume of a cube with a positive floating-point side length
  it('2. should return the correct volume for a positive floating-point side length', () => {
    const side: number = 3.5;
    const expected: number = Math.pow(side, 3);
    const result: number = calculateCubeVolume(side);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 3: Volume of a cube with a side length of zero
  it('3. should return 0 for a side length of 0', () => {
    const side: number = 0;
    const expected: number = 0;
    const result: number = calculateCubeVolume(side);
    expect(result).toBe(expected);
  });

  // Test case 4: Volume of a cube with a very small positive side length
  it('4. should return the correct volume for a very small positive side length', () => {
    const side: number = 1e-10;
    const expected: number = Math.pow(side, 3);
    const result: number = calculateCubeVolume(side);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 5: Volume of a cube with a very large positive side length
  it('5. should return the correct volume for a very large positive side length', () => {
    const side: number = 1e10;
    const expected: number = Math.pow(side, 3);
    const result: number = calculateCubeVolume(side);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 6: Volume of a cube with a negative side length (should throw an error)
  it('6. should throw an error for a negative side length', () => {
    const side: number = -3;
    expect(() => calculateCubeVolume(side)).toThrow(
      'Side length must be a non-negative number',
    );
  });

  // Test case 7: Volume of a cube with NaN side length (should throw an error)
  it('7. should throw an error for NaN side length', () => {
    const side: number = NaN;
    expect(() => calculateCubeVolume(side)).toThrow(
      'Side length must be a number',
    );
  });
});
