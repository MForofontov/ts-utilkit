/**
 * Generates a random UUID v4 for testing.
 *
 * @returns Random UUID v4 string.
 *
 * @example
 * const uuid = generateRandomUUID();
 * // Returns: "f47ac10b-58cc-4372-a567-0e02b2c3d479"
 *
 * @note Generates a valid UUID v4 format for testing purposes.
 * @note Not cryptographically secure - use for testing only.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function generateRandomUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
