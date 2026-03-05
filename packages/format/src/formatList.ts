/**
 * Formats an array of strings into a human-readable list using locale-aware conjunction rules.
 * Wraps `Intl.ListFormat` to produce natural-language list strings like "Alice, Bob, and Carol".
 *
 * @param items - The array of strings to format into a list.
 * @param conjunction - The conjunction type to use: "and" (default), "or", or "none" (comma-separated, no conjunction).
 * @param locale - BCP 47 locale string used for formatting (default: "en").
 * @returns A formatted list string. Returns an empty string for an empty array.
 *
 * @throws {Error} If conjunction is not one of "and", "or", or "none".
 * @example
 * // Three items with default "and" conjunction
 * formatList(['Alice', 'Bob', 'Carol']); // Returns "Alice, Bob, and Carol"
 *
 * @example
 * // Two items with "or" conjunction
 * formatList(['Tea', 'Coffee'], 'or'); // Returns "Tea or Coffee"
 *
 * @example
 * // Comma-separated with no conjunction
 * formatList(['red', 'green', 'blue'], 'none'); // Returns "red, green, blue"
 *
 * @example
 * // Single item returns as-is
 * formatList(['only']); // Returns "only"
 *
 * @note Uses `Intl.ListFormat` internally. The "none" conjunction maps to Intl type "unit"
 * which produces comma-separated output without a final conjunction word.
 * For an empty array, an empty string is returned without error.
 *
 * @complexity Time: O(n), Space: O(n)
 */
export function formatList(
  items: string[],
  conjunction: 'and' | 'or' | 'none' = 'and',
  locale: string = 'en',
): string {
  // Input validation
  if (!['and', 'or', 'none'].includes(conjunction)) {
    throw new Error(
      `conjunction must be "and", "or", or "none", got "${conjunction}"`,
    );
  }

  // Return early for empty array
  if (items.length === 0) {
    return '';
  }

  // Map conjunction option to Intl.ListFormat type
  const intlType: Intl.ListFormatType =
    conjunction === 'and'
      ? 'conjunction'
      : conjunction === 'or'
        ? 'disjunction'
        : 'unit';

  const formatter = new Intl.ListFormat(locale, {
    style: 'long',
    type: intlType,
  });

  return formatter.format(items);
}
