/**
 * Checks if two strings are anagrams of each other (contain the same characters in different order).
 *
 * @param str1 - The first string to compare.
 * @param str2 - The second string to compare.
 * @returns True if the strings are anagrams, false otherwise.
 *
 * @throws {TypeError} If str1 or str2 is not a string.
 *
 * @example
 * // Basic usage
 * areAnagrams("listen", "silent"); // true
 * areAnagrams("hello", "world"); // false
 *
 * @example
 * // Case-insensitive comparison
 * areAnagrams("Listen", "Silent"); // true
 * areAnagrams("The Eyes", "They See"); // true
 *
 * @example
 * // Whitespace is ignored
 * areAnagrams("a gentleman", "elegant man"); // true
 * areAnagrams("conversation", "voices rant on"); // true
 *
 * @example
 * // Same strings
 * areAnagrams("hello", "hello"); // true
 * areAnagrams("", ""); // true
 *
 * @example
 * // Different lengths
 * areAnagrams("hello", "helloworld"); // false
 *
 * @note Comparison is case-insensitive (uppercase and lowercase are treated as equal).
 * @note Whitespace characters are ignored in the comparison.
 * @note Special characters and numbers are included in the comparison.
 * @note Uses character sorting for comparison, which is efficient for most use cases.
 *
 * @complexity Time: O(n log n), Space: O(n) where n is the length of the longer string
 */
export function areAnagrams(str1: string, str2: string): boolean {
  const normalize = (str: string) =>
    str.replace(/\s+/g, '').toLowerCase().split('').sort().join('');
  return normalize(str1) === normalize(str2);
}
