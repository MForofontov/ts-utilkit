import { calculateSectorArea } from '../src/geometricFunctions/calculateSectorArea';

describe('calculateSectorArea', () => {
  // Test case 1: Area of a sector with positive integer radius and angle
  it('1. should return the correct area for positive integer radius and angle', () => {
    const radius: number = 5;
    const angle: number = 90;
    const expected: number = (angle / 360) * Math.PI * Math.pow(radius, 2);
    const result: number = calculateSectorArea(radius, angle);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 2: Area of a sector with positive floating-point radius and angle
  it('2. should return the correct area for positive floating-point radius and angle', () => {
    const radius: number = 5.5;
    const angle: number = 45.5;
    const expected: number = (angle / 360) * Math.PI * Math.pow(radius, 2);
    const result: number = calculateSectorArea(radius, angle);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 3: Area of a sector with a radius of zero
  it('3. should return 0 for a radius of zero', () => {
    const radius: number = 0;
    const angle: number = 90;
    const expected: number = 0;
    const result: number = calculateSectorArea(radius, angle);
    expect(result).toBe(expected);
  });

  // Test case 4: Area of a sector with an angle of zero
  it('4. should return 0 for an angle of zero', () => {
    const radius: number = 5;
    const angle: number = 0;
    const expected: number = 0;
    const result: number = calculateSectorArea(radius, angle);
    expect(result).toBe(expected);
  });

  // Test case 5: Area of a sector with very small positive radius and angle
  it('5. should return the correct area for very small positive radius and angle', () => {
    const radius: number = 1e-10;
    const angle: number = 1e-10;
    const expected: number = (angle / 360) * Math.PI * Math.pow(radius, 2);
    const result: number = calculateSectorArea(radius, angle);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 6: Area of a sector with large positive radius and realistic angle
  it('6. should return the correct area for large positive radius and realistic angle', () => {
    const radius: number = 1e5;
    const angle: number = 180;
    const expected: number = (angle / 360) * Math.PI * Math.pow(radius, 2);
    const result: number = calculateSectorArea(radius, angle);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 7: Area of a sector with negative radius (should throw an error)
  it('7. should throw an error for negative radius', () => {
    const radius: number = -5;
    const angle: number = 90;
    expect(() => calculateSectorArea(radius, angle)).toThrow(
      'Radius and angle must be non-negative numbers',
    );
  });

  // Test case 8: Area of a sector with negative angle (should throw an error)
  it('8. should throw an error for negative angle', () => {
    const radius: number = 5;
    const angle: number = -90;
    expect(() => calculateSectorArea(radius, angle)).toThrow(
      'Radius and angle must be non-negative numbers',
    );
  });

  // Test case 9: Area of a sector with NaN radius (should throw an error)
  it('9. should throw an error for NaN radius', () => {
    const radius: number = NaN;
    const angle: number = 90;
    expect(() => calculateSectorArea(radius, angle)).toThrow(
      'Radius and angle must be numbers',
    );
  });

  // Test case 10: Area of a sector with NaN angle (should throw an error)
  it('10. should throw an error for NaN angle', () => {
    const radius: number = 5;
    const angle: number = NaN;
    expect(() => calculateSectorArea(radius, angle)).toThrow(
      'Radius and angle must be numbers',
    );
  });
});
