/**
 * Generates a random percentage value between 0 and 100.
 *
 * @param decimals - Number of decimal places (default: 2, range: 0-10).
 * @returns A random percentage value.
 *
 * @throws {TypeError} If decimals is not a number.
 * @throws {Error} If decimals is not an integer or not in range 0-10.
 *
 * @example
 * randomPercentage(); // 73.42
 *
 * @example
 * randomPercentage(0); // 85
 *
 * @example
 * randomPercentage(4); // 23.7691
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function randomPercentage(decimals: number = 2): number {
  if (typeof decimals !== 'number') {
    throw new TypeError(`decimals must be a number, got ${typeof decimals}`);
  }
  if (!Number.isInteger(decimals)) {
    throw new Error('decimals must be an integer');
  }
  if (decimals < 0 || decimals > 10) {
    throw new Error('decimals must be between 0 and 10');
  }

  const multiplier = Math.pow(10, decimals);
  return Math.round(Math.random() * 100 * multiplier) / multiplier;
}
