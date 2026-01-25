/**
 * Generates a random string matching a template pattern.
 *
 * @param template - Pattern template where:
 *                   - '#' represents a random digit (0-9)
 *                   - 'A' represents a random uppercase letter (A-Z)
 *                   - 'a' represents a random lowercase letter (a-z)
 *                   - Any other character is preserved as-is
 * @returns A random string matching the template pattern.
 *
 * @throws {TypeError} If template is not a string.
 * @throws {Error} If template is empty.
 * @throws {Error} If template is longer than 100 characters.
 *
 * @example
 * // Generate phone number pattern
 * randomPattern('###-###-####'); // '555-123-4567'
 *
 * @example
 * // Generate license plate pattern
 * randomPattern('AAA-###'); // 'XYZ-742'
 *
 * @example
 * // Generate product code
 * randomPattern('PROD-####-aaa'); // 'PROD-8472-xyz'
 *
 * @example
 * // Mixed pattern with preserved characters
 * randomPattern('ID: AAA-###-aaa'); // 'ID: KLM-389-def'
 *
 * @note Uses Math.random() for non-cryptographic randomness.
 * @note Pattern characters: '#' (digit), 'A' (uppercase), 'a' (lowercase).
 * @note All other characters in the template are preserved exactly.
 *
 * @complexity Time: O(n), Space: O(n) where n is template length
 */
export function randomPattern(template: string): string {
  if (typeof template !== 'string') {
    throw new TypeError(`template must be a string, got ${typeof template}`);
  }
  if (template.length === 0) {
    throw new Error('template cannot be empty');
  }
  if (template.length > 100) {
    throw new Error(
      `template length must be 100 or less, got ${template.length}`,
    );
  }

  const digits = '0123456789';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';

  let result = '';

  for (let i = 0; i < template.length; i++) {
    const char = template[i];

    if (char === '#') {
      const randomIndex = Math.floor(Math.random() * digits.length);
      result += digits[randomIndex];
    } else if (char === 'A') {
      const randomIndex = Math.floor(Math.random() * uppercase.length);
      result += uppercase[randomIndex];
    } else if (char === 'a') {
      const randomIndex = Math.floor(Math.random() * lowercase.length);
      result += lowercase[randomIndex];
    } else {
      // Preserve all other characters
      result += char;
    }
  }

  return result;
}
