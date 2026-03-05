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

  if (singular.length === 0) {
    throw new Error('singular cannot be empty');
  }

  const word = count === 1 ? singular : plural || `${singular}s`;

  return includeCount ? `${count} ${word}` : word;
}
