/**
 * Validates if a string matches a custom regular expression pattern.
 *
 * @param input - The string to validate.
 * @param pattern - The regular expression pattern as a string.
 * @param flags - Regular expression flags (default: '').
 * @returns True if the string matches the pattern, false otherwise.
 *
 * @throws {Error} If the regular expression pattern is invalid.
 *
 * @example
 * // Basic pattern matching
 * isValidPattern("ABC123", "[A-Z]{3}[0-9]{3}"); // true
 * isValidPattern("abc123", "[A-Z]{3}[0-9]{3}"); // false
 * isValidPattern("abc123", "[A-Z]{3}[0-9]{3}", "i"); // true (case-insensitive)
 *
 * @example
 * // Email pattern
 * isValidPattern("test@example.com", "^[^@]+@[^@]+\\.[^@]+$"); // true
 * isValidPattern("invalid-email", "^[^@]+@[^@]+\\.[^@]+$"); // false
 *
 * @example
 * // Phone number pattern
 * isValidPattern("(555) 123-4567", "^\\([0-9]{3}\\) [0-9]{3}-[0-9]{4}$"); // true
 * isValidPattern("555-123-4567", "^\\([0-9]{3}\\) [0-9]{3}-[0-9]{4}$"); // false
 *
 * @note Use double backslashes in pattern strings to escape regex special characters.
 *
 * @complexity Time: O(n), Space: O(1)
 */
export function isValidPattern(
  input: string,
  pattern: string,
  flags?: string,
): boolean {
  // Check if flags is explicitly passed and not a string

  try {
    const regex = new RegExp(pattern, flags || '');
    return regex.test(input);
  } catch {
    throw new Error(`Invalid regular expression pattern: ${pattern}`);
  }
}
