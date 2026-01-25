/**
 * Generates a random hexadecimal color code.
 *
 * @param includeHash - Whether to include '#' prefix (default: true).
 * @returns A random hex color code (e.g., '#A3F9C2' or 'A3F9C2').
 *
 * @throws {TypeError} If includeHash is provided and not a boolean.
 *
 * @example
 * // Generate hex color with hash
 * randomHexColor(); // '#8E44DB'
 *
 * @example
 * // Generate hex color without hash
 * randomHexColor(false); // '8E44DB'
 *
 * @example
 * // Use in CSS
 * const color = randomHexColor();
 * element.style.backgroundColor = color;
 *
 * @note Uses Math.random() for non-cryptographic randomness.
 * @note Always generates 6-digit hex colors (no shorthand).
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function randomHexColor(includeHash: boolean = true): string {
  if (typeof includeHash !== 'boolean') {
    throw new TypeError(
      `includeHash must be a boolean, got ${typeof includeHash}`,
    );
  }

  const hex = Math.floor(Math.random() * 16777216)
    .toString(16)
    .padStart(6, '0')
    .toUpperCase();

  return includeHash ? `#${hex}` : hex;
}
