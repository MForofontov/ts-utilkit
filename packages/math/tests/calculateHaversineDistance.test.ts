import { calculateHaversineDistance } from '../src/geometricFunctions/calculateHaversineDistance';

describe('calculateHaversineDistance', () => {
  // Test case 1: Distance between two points with positive coordinates
  it('1. should return the correct distance between two points with positive coordinates', () => {
    const lat1: number = 52.52;
    const lon1: number = 13.405;
    const lat2: number = 48.8566;
    const lon2: number = 2.3522;
    const expected: number = 877.46; // Approximate distance between Berlin and Paris in kilometers
    const result: number = calculateHaversineDistance(lat1, lon1, lat2, lon2);
    expect(result).toBeCloseTo(expected, 1); // Adjusted precision to 1
  });

  // Test case 2: Distance between two points with negative coordinates
  it('2. should return the correct distance between two points with negative coordinates', () => {
    const lat1: number = -33.8688;
    const lon1: number = 151.2093;
    const lat2: number = -37.8136;
    const lon2: number = 144.9631;
    const expected: number = 713.43; // More precise distance between Sydney and Melbourne in kilometers
    const result: number = calculateHaversineDistance(lat1, lon1, lat2, lon2);
    expect(result).toBeCloseTo(expected, 1); // Adjusted precision to 1
  });

  // Test case 3: Distance between two points with mixed coordinates
  it('3. should return the correct distance between two points with mixed coordinates', () => {
    const lat1: number = 40.7128;
    const lon1: number = -74.006;
    const lat2: number = -34.6037;
    const lon2: number = -58.3816;
    const expected: number = 8526.21; // More precise distance between New York and Buenos Aires in kilometers
    const result: number = calculateHaversineDistance(lat1, lon1, lat2, lon2);
    expect(result).toBeCloseTo(expected, 1); // Adjusted precision to 1
  });

  // Test case 4: Distance between two identical points
  it('4. should return 0 for two identical points', () => {
    const lat1: number = 51.5074;
    const lon1: number = -0.1278;
    const lat2: number = 51.5074;
    const lon2: number = -0.1278;
    const expected: number = 0;
    const result: number = calculateHaversineDistance(lat1, lon1, lat2, lon2);
    expect(result).toBe(expected);
  });

  // Test case 5: Distance between two points with very small differences in coordinates
  it('5. should return the correct distance for very small differences in coordinates', () => {
    const lat1: number = 51.5074;
    const lon1: number = -0.1278;
    const lat2: number = 51.5075;
    const lon2: number = -0.1279;
    const expected: number = 0.013; // Approximate distance in kilometers
    const result: number = calculateHaversineDistance(lat1, lon1, lat2, lon2);
    expect(result).toBeCloseTo(expected, 3);
  });

  // Test case 6: Distance between two points with very large coordinates
  it('6. should return the correct distance for very large coordinates', () => {
    const lat1: number = 89.9999;
    const lon1: number = 179.9999;
    const lat2: number = -89.9999;
    const lon2: number = -179.9999;
    const expected: number = 20015.09; // Approximate distance in kilometers (half the Earth's circumference)
    const result: number = calculateHaversineDistance(lat1, lon1, lat2, lon2);
    expect(result).toBeCloseTo(expected, 1); // Adjusted precision to 1
  });

  // Test cases for NaN inputs

  // Test case 7: Distance between two points with NaN latitude of the first point (should throw an error)
  it('7. should throw an error for NaN latitude of the first point', () => {
    const lat1: number = NaN;
    const lon1: number = 13.405;
    const lat2: number = 48.8566;
    const lon2: number = 2.3522;
    expect(() => calculateHaversineDistance(lat1, lon1, lat2, lon2)).toThrow(
      'All inputs must be numbers',
    );
  });

  // Test case 8: Distance between two points with NaN longitude of the first point (should throw an error)
  it('8. should throw an error for NaN longitude of the first point', () => {
    const lat1: number = 52.52;
    const lon1: number = NaN;
    const lat2: number = 48.8566;
    const lon2: number = 2.3522;
    expect(() => calculateHaversineDistance(lat1, lon1, lat2, lon2)).toThrow(
      'All inputs must be numbers',
    );
  });

  // Test case 9: Distance between two points with NaN latitude of the second point (should throw an error)
  it('9. should throw an error for NaN latitude of the second point', () => {
    const lat1: number = 52.52;
    const lon1: number = 13.405;
    const lat2: number = NaN;
    const lon2: number = 2.3522;
    expect(() => calculateHaversineDistance(lat1, lon1, lat2, lon2)).toThrow(
      'All inputs must be numbers',
    );
  });

  // Test case 10: Distance between two points with NaN longitude of the second point (should throw an error)
  it('10. should throw an error for NaN longitude of the second point', () => {
    const lat1: number = 52.52;
    const lon1: number = 13.405;
    const lat2: number = 48.8566;
    const lon2: number = NaN;
    expect(() => calculateHaversineDistance(lat1, lon1, lat2, lon2)).toThrow(
      'All inputs must be numbers',
    );
  });

  // Test case 11: Distance between two points with out-of-range latitude (should throw an error)
  it('11. should throw an error for out-of-range latitude', () => {
    const lat1: number = 100;
    const lon1: number = 13.405;
    const lat2: number = 48.8566;
    const lon2: number = 2.3522;
    expect(() => calculateHaversineDistance(lat1, lon1, lat2, lon2)).toThrow(
      'Latitude values must be between -90 and 90 degrees',
    );
  });

  // Test case 12: Distance between two points with out-of-range longitude (should throw an error)
  it('12. should throw an error for out-of-range longitude', () => {
    const lat1: number = 52.52;
    const lon1: number = 200;
    const lat2: number = 48.8566;
    const lon2: number = 2.3522;
    expect(() => calculateHaversineDistance(lat1, lon1, lat2, lon2)).toThrow(
      'Longitude values must be between -180 and 180 degrees',
    );
  });
});
