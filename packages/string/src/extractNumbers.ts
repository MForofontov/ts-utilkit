/**
 * Extracts all numeric values (integers and decimals) from a string, returning
 * them as an array of JavaScript numbers. Supports positive and negative numbers,
 * as well as decimal numbers.
 *
 * @param str - The string from which to extract numbers.
 * @returns An array of numbers found in the string, in the order they appear.
 *   Returns an empty array if no numbers are found.
 *
 * @example
 * // Extract integers and decimals from a sentence
 * extractNumbers('I have 3 cats and 1.5 dogs');
 * // [3, 1.5]
 *
 * @example
 * // Extract negative numbers
 * extractNumbers('Temperature is -12.5 degrees and humidity is 80');
 * // [-12.5, 80]
 *
 * @example
 * // No numbers returns empty array
 * extractNumbers('no numbers here');
 * // []
 *
 * @example
 * // Numbers embedded in text
 * extractNumbers('item1 costs $4.99 and item2 costs $12.00');
 * // [1, 4.99, 2, 12]
 *
 * @note The function uses a regex that matches optional leading sign, one or
 *   more digits, and an optional decimal part. Signs (+/-) are only recognised
 *   as part of a number when immediately adjacent to the first digit with no
 *   surrounding word characters.
 * @note Exponential notation (e.g. 1e10) and hex literals are not extracted.
 *
 * @complexity Time: O(n), Space: O(k) where k is the number of matches
 */
export function extractNumbers(str: string): number[] {

  const matches = str.match(/[+-]?\d+(\.\d+)?/g);

  if (!matches) {
    return [];
  }

  return matches.map((m) => parseFloat(m));
}
