/**
 * Removes accent marks (diacritics) from characters in a string, converting
 * accented characters to their base ASCII equivalents. Uses Unicode
 * Normalization Form D (NFD) to decompose characters, then strips combining
 * diacritical marks.
 *
 * @param str - The string from which to remove accents.
 * @returns A new string with all diacritical marks removed.
 *
 * @example
 * // Remove accents from French characters
 * removeAccents('café');
 * // 'cafe'
 *
 * @example
 * // Remove accents from multiple languages
 * removeAccents('naïve résumé');
 * // 'naive resume'
 *
 * @example
 * // Handle strings without accents unchanged
 * removeAccents('hello world');
 * // 'hello world'
 *
 * @example
 * // Spanish and German characters
 * removeAccents('señor über');
 * // 'senor uber'
 *
 * @note This function differs from slugify, which lowercases and replaces spaces
 *   with hyphens. removeAccents preserves the original case and structure of the
 *   string while only stripping diacritics.
 * @note Characters without a base ASCII equivalent (e.g., ø, ł) may not be
 *   fully converted, as they are not simple precomposed forms.
 *
 * @complexity Time: O(n), Space: O(n)
 */
export function removeAccents(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
