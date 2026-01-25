/**
 * Generates a random UUID v4 (universally unique identifier).
 *
 * @returns A random UUID v4 string in the format xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx.
 *
 * @example
 * randomUUID(); // '550e8400-e29b-41d4-a716-446655440000'
 *
 * @example
 * // Generate multiple UUIDs
 * const ids = Array.from({ length: 5 }, () => randomUUID());
 *
 * @note Uses Math.random() for generation (not cryptographically secure).
 * For cryptographic purposes, use Node.js crypto.randomUUID() instead.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function randomUUID(): string {
  // Generate random hex digits
  const hex = () => Math.floor(Math.random() * 16).toString(16);

  // UUID v4 format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
  // where y is one of 8, 9, A, or B
  const template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

  return template.replace(/[xy]/g, (char) => {
    if (char === 'x') {
      return hex();
    } else {
      // y must be one of 8, 9, a, or b
      const value = Math.floor(Math.random() * 4) + 8;
      return value.toString(16);
    }
  });
}
