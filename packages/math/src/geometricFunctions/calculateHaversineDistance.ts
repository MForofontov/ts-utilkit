import { degreesToRadians } from './degreesToRadians';

/**
 * Calculates the distance between two geographical points given their latitude and longitude using the Haversine formula.
 *
 * @param lat1 - Latitude of the first point in degrees.
 * @param lon1 - Longitude of the first point in degrees.
 * @param lat2 - Latitude of the second point in degrees.
 * @param lon2 - Longitude of the second point in degrees.
 * @returns The distance between the two points in kilometers.
 *
 * @throws {Error} If any input is NaN.
 * @throws {Error} If latitude values are outside the range -90 to 90 degrees.
 * @throws {Error} If longitude values are outside the range -180 to 180 degrees.
 *
 * @example
 * // Basic usage - London to Paris
 * calculateHaversineDistance(51.5074, -0.1278, 48.8566, 2.3522); // ~343.56 km
 *
 * @example
 * // New York to Los Angeles
 * calculateHaversineDistance(40.7128, -74.0060, 34.0522, -118.2437); // ~3935.75 km
 *
 * @example
 * // Same location (zero distance)
 * calculateHaversineDistance(0, 0, 0, 0); // 0
 *
 * @example
 * // Equator crossing
 * calculateHaversineDistance(0, 0, 0, 90); // ~10007.54 km (1/4 Earth circumference)
 *
 * @example
 * // Real-world: Calculate delivery distance
 * const warehouseLat = 37.7749, warehouseLon = -122.4194; // San Francisco
 * const customerLat = 37.3541, customerLon = -121.9552; // San Jose
 * const distance = calculateHaversineDistance(warehouseLat, warehouseLon, customerLat, customerLon);
 * // ~67.23 km
 *
 * @note Uses the Haversine formula: assumes Earth is a perfect sphere with radius 6371.0088 km.
 * @note For very precise calculations, consider using more complex models (e.g., Vincenty formula).
 * @note The result is in kilometers; multiply by 0.621371 to convert to miles.
 * @note Great-circle distance (shortest path on sphere surface), not actual travel distance.
 * @note Valid latitude range: -90° (South Pole) to +90° (North Pole).
 * @note Valid longitude range: -180° (west) to +180° (east).
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  // Validate inputs
  if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) {
    throw new Error('All inputs must be numbers');
  }
  if (lat1 < -90 || lat1 > 90 || lat2 < -90 || lat2 > 90) {
    throw new Error('Latitude values must be between -90 and 90 degrees');
  }
  if (lon1 < -180 || lon1 > 180 || lon2 < -180 || lon2 > 180) {
    throw new Error('Longitude values must be between -180 and 180 degrees');
  }

  const R = 6371.0088; // Radius of the Earth in kilometers

  // Convert latitude and longitude differences from degrees to radians
  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);

  // Apply the Haversine formula
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(degreesToRadians(lat1)) *
      Math.cos(degreesToRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Calculate the distance
  return R * c;
}

// Example usage:
// calculateHaversineDistance(52.5200, 13.4050, 48.8566, 2.3522); // Distance between Berlin and Paris
