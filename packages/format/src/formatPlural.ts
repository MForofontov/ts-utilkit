/**
 * Formats a word with proper pluralization based on count.
 * Supports custom plural forms and simple pluralization rules.
 *
 * @param count - The count to determine singular or plural.
 * @param singular - The singular form of the word.
 * @param plural - Optional custom plural form. If not provided, adds "s" to singular (default: undefined).
 * @param includeCount - Whether to include the count in the output (default: true).
 * @returns The formatted string with proper pluralization.
 *
 * @throws {TypeError} If count is not a number or is NaN.
 * @throws {TypeError} If singular is not a string.
 * @throws {TypeError} If plural is provided but not a string.
 * @throws {TypeError} If includeCount is not a boolean.
 * @throws {Error} If singular is empty.
 *
 * @example
 * // Basic usage
 * formatPlural(1, "item"); // Returns "1 item"
 * formatPlural(5, "item"); // Returns "5 items"
 *
 * @example
 * // Custom plural
 * formatPlural(2, "person", "people"); // Returns "2 people"
 * formatPlural(1, "child", "children"); // Returns "1 child"
 *
 * @example
 * // Without count
 * formatPlural(0, "item", undefined, false); // Returns "items"
 * formatPlural(1, "item", undefined, false); // Returns "item"
 *
 * @example
 * // Zero count
 * formatPlural(0, "item"); // Returns "0 items"
 *
 * @note By default, the function adds "s" to make the plural form.
 * Provide custom plural for irregular forms (person/people, child/children, etc.).
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function formatPlural(
  count: number,
  singular: string,
  plural?: string,
  includeCount: boolean = true,
): string {
  // Input validation
  if (typeof count !== 'number' || isNaN(count)) {
    throw new TypeError(`count must be a number, got ${typeof count}`);
  }
  if (typeof singular !== 'string') {
    throw new TypeError(`singular must be a string, got ${typeof singular}`);
  }
  if (plural !== undefined && typeof plural !== 'string') {
    throw new TypeError(`plural must be a string, got ${typeof plural}`);
  }
  if (typeof includeCount !== 'boolean') {
    throw new TypeError(
      `includeCount must be a boolean, got ${typeof includeCount}`,
    );
  }

  if (singular.length === 0) {
    throw new Error('singular cannot be empty');
  }

  const word = count === 1 ? singular : plural || `${singular}s`;

  return includeCount ? `${count} ${word}` : word;
}
