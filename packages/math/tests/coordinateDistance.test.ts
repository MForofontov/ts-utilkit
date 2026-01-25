import { coordinateDistance } from '../src/geometricFunctions/coordinateDistance';

describe('coordinateDistance', () => {
  // Test case 1: Distance between two points with positive integer coordinates
  it('1. should return the correct distance for positive integer coordinates', () => {
    const x1: number = 0;
    const y1: number = 0;
    const x2: number = 3;
    const y2: number = 4;
    const expected: number = 5;
    const result: number = coordinateDistance(x1, y1, x2, y2);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 2: Distance between two points with positive floating-point coordinates
  it('2. should return the correct distance for positive floating-point coordinates', () => {
    const x1: number = 0.5;
    const y1: number = 0.5;
    const x2: number = 3.5;
    const y2: number = 4.5;
    const expected: number = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const result: number = coordinateDistance(x1, y1, x2, y2);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 3: Distance between two points with negative coordinates
  it('3. should return the correct distance for negative coordinates', () => {
    const x1: number = -1;
    const y1: number = -1;
    const x2: number = -4;
    const y2: number = -5;
    const expected: number = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const result: number = coordinateDistance(x1, y1, x2, y2);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 4: Distance between two identical points
  it('4. should return 0 for two identical points', () => {
    const x1: number = 2;
    const y1: number = 2;
    const x2: number = 2;
    const y2: number = 2;
    const expected: number = 0;
    const result: number = coordinateDistance(x1, y1, x2, y2);
    expect(result).toBe(expected);
  });

  // Test case 5: Distance between two points with very small positive coordinates
  it('5. should return the correct distance for very small positive coordinates', () => {
    const x1: number = 1e-10;
    const y1: number = 1e-10;
    const x2: number = 2e-10;
    const y2: number = 2e-10;
    const expected: number = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const result: number = coordinateDistance(x1, y1, x2, y2);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 6: Distance between two points with very large positive coordinates
  it('6. should return the correct distance for very large positive coordinates', () => {
    const x1: number = 1e10;
    const y1: number = 1e10;
    const x2: number = 2e10;
    const y2: number = 2e10;
    const expected: number = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const result: number = coordinateDistance(x1, y1, x2, y2);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 7: Distance between two points with NaN coordinates (should throw an error)
  it('7. should throw an error for NaN coordinates', () => {
    const x1: number = NaN;
    const y1: number = 0;
    const x2: number = 3;
    const y2: number = 4;
    expect(() => coordinateDistance(x1, y1, x2, y2)).toThrow(
      'All coordinates must be numbers',
    );
  });

  // Test case 8: Distance between two points with NaN coordinates (should throw an error)
  it('8. should throw an error for NaN coordinates', () => {
    const x1: number = 0;
    const y1: number = NaN;
    const x2: number = 3;
    const y2: number = 4;
    expect(() => coordinateDistance(x1, y1, x2, y2)).toThrow(
      'All coordinates must be numbers',
    );
  });

  // Test case 9: Distance between two points with NaN coordinates (should throw an error)
  it('9. should throw an error for NaN coordinates', () => {
    const x1: number = 0;
    const y1: number = 0;
    const x2: number = NaN;
    const y2: number = 4;
    expect(() => coordinateDistance(x1, y1, x2, y2)).toThrow(
      'All coordinates must be numbers',
    );
  });

  // Test case 10: Distance between two points with NaN coordinates (should throw an error)
  it('10. should throw an error for NaN coordinates', () => {
    const x1: number = 0;
    const y1: number = 0;
    const x2: number = 3;
    const y2: number = NaN;
    expect(() => coordinateDistance(x1, y1, x2, y2)).toThrow(
      'All coordinates must be numbers',
    );
  });
});
