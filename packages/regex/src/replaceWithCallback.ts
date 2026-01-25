/**
 * Callback function type for advanced replacement.
 */
export type ReplaceCallback = (
  match: string,
  ...args: (string | number)[]
) => string;

/**
 * Replaces pattern matches using a callback function for advanced transformations.
 *
 * @param text - The text to perform replacements on.
 * @param pattern - The regular expression pattern (string or RegExp).
 * @param callback - Function that receives match and groups, returns replacement string.
 * @param flags - Optional flags for string patterns (default: 'g').
 * @returns String with replacements applied.
 *
 * @throws {TypeError} If text is not a string.
 * @throws {TypeError} If pattern is not a string or RegExp.
 * @throws {TypeError} If callback is not a function.
 * @throws {TypeError} If flags is provided and not a string.
 * @throws {Error} If pattern is invalid.
 *
 * @example
 * // Uppercase all words
 * replaceWithCallback("hello world", /\w+/g, (match) => match.toUpperCase());
 * // "HELLO WORLD"
 *
 * @example
 * // Use capture groups
 * const pattern = /(\d+)\.(\d+)/g;
 * replaceWithCallback("Price: 99.99", pattern, (match, dollars, cents) => {
 *   return `$${dollars} and ${cents} cents`;
 * });
 * // "Price: $99 and 99 cents"
 *
 * @example
 * // Transform dates
 * const datePattern = /(\d{4})-(\d{2})-(\d{2})/g;
 * replaceWithCallback("Date: 2023-12-25", datePattern, (match, year, month, day) => {
 *   return `${month}/${day}/${year}`;
 * });
 * // "Date: 12/25/2023"
 *
 * @note The callback receives: (fullMatch, captureGroup1, captureGroup2, ..., index, fullString)
 *
 * @complexity Time: O(n*m), Space: O(n) where n is text length, m is pattern complexity
 */
export function replaceWithCallback(
  text: string,
  pattern: string | RegExp,
  callback: ReplaceCallback,
  flags?: string,
): string {
  if (typeof text !== 'string') {
    throw new TypeError(`text must be a string, got ${typeof text}`);
  }

  if (typeof pattern !== 'string' && !(pattern instanceof RegExp)) {
    throw new TypeError(
      `pattern must be a string or RegExp, got ${typeof pattern}`,
    );
  }

  if (typeof callback !== 'function') {
    throw new TypeError(`callback must be a function, got ${typeof callback}`);
  }

  if (flags !== undefined && typeof flags !== 'string') {
    throw new TypeError(`flags must be a string, got ${typeof flags}`);
  }

  let regex: RegExp;

  try {
    if (typeof pattern === 'string') {
      const effectiveFlags = flags || 'g';
      const hasGlobalFlag = effectiveFlags.includes('g');
      const finalFlags = hasGlobalFlag ? effectiveFlags : effectiveFlags + 'g';
      regex = new RegExp(pattern, finalFlags);
    } else {
      if (!pattern.global) {
        const currentFlags = pattern.flags;
        regex = new RegExp(pattern.source, currentFlags + 'g');
      } else {
        regex = pattern;
      }
    }
  } catch (e) {
    throw new Error(
      `Invalid regular expression pattern: ${pattern instanceof RegExp ? pattern.source : pattern}`,
    );
  }

  // Use native replace with callback
  return text.replace(regex, (match, ...args) => {
    return callback(match, ...args);
  });
}
