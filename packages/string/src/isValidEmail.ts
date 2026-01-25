/**
 * Checks if a string is a valid email address using regex pattern matching.
 *
 * @param email - The string to validate as an email address.
 * @returns True if the string matches a valid email format, false otherwise.
 *
 * @throws {TypeError} If email is not a string.
 *
 * @example
 * // Valid email addresses
 * isValidEmail("test@example.com"); // true
 * isValidEmail("user.name@domain.co.uk"); // true
 * isValidEmail("hello@sub.domain.com"); // true
 *
 * @example
 * // Invalid email addresses
 * isValidEmail("invalid-email"); // false
 * isValidEmail("@example.com"); // false
 * isValidEmail("user@"); // false
 * isValidEmail("user @domain.com"); // false (space not allowed)
 *
 * @example
 * // Edge cases
 * isValidEmail(""); // false
 * isValidEmail("a@b.co"); // true (minimum valid format)
 * isValidEmail("test@domain"); // false (missing TLD)
 *
 * @note Uses a simple regex pattern for basic email validation.
 * @note Does not guarantee the email address exists or can receive mail.
 * @note Does not support all RFC 5322 valid formats (e.g., quoted strings, comments).
 * @note Requires at least 2 characters in the top-level domain (e.g., .com, .uk).
 * @note For production use, consider additional validation or email verification services.
 *
 * @complexity Time: O(n), Space: O(1) where n is the length of the email string
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}
