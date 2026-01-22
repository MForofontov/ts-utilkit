/**
 * Validates if a regular expression pattern is valid and can be compiled.
 *
 * @param pattern - The regex pattern string to validate.
 * @param flags - Optional regex flags (e.g., 'i', 'g', 'im').
 * @returns True if the pattern is valid, false otherwise.
 *
 * @throws {TypeError} If pattern is not a string.
 * @throws {TypeError} If flags is provided and not a string.
 *
 * @example
 * // Valid patterns
 * isValidRegex("^[a-z]+$"); // true
 * isValidRegex("\\d{3}-\\d{4}"); // true
 * isValidRegex("[a-z]", "i"); // true
 *
 * @example
 * // Invalid patterns
 * isValidRegex("[unclosed"); // false
 * isValidRegex("(?<invalid"); // false
 * isValidRegex("(unmatched"); // false
 *
 * @example
 * // Invalid flags
 * isValidRegex("test", "xyz"); // false
 *
 * @note Common invalid patterns include unclosed brackets, unmatched parentheses, and invalid escape sequences.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function isValidRegex(pattern: string, flags?: string): boolean {
  if (typeof pattern !== 'string') {
    throw new TypeError(`pattern must be a string, got ${typeof pattern}`);
  }

  if (arguments.length > 1 && typeof flags !== 'string') {
    throw new TypeError(`flags must be a string, got ${typeof flags}`);
  }

  try {
    new RegExp(pattern, flags);
    return true;
  } catch (e) {
    return false;
  }
}
