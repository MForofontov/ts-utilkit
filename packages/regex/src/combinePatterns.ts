/**
 * Combines multiple regex patterns with logical operators.
 *
 * @param patterns - Array of patterns (strings or RegExp) to combine.
 * @param operator - How to combine: 'and' (all must match), 'or' (any must match).
 * @param flags - Optional flags for the resulting pattern.
 * @returns Combined RegExp object.
 *
 * @throws {TypeError} If patterns is not an array.
 * @throws {TypeError} If operator is not a valid string.
 * @throws {TypeError} If flags is provided and not a string.
 * @throws {Error} If patterns array is empty.
 * @throws {Error} If any pattern is invalid.
 *
 * @example
 * // OR combination (match any)
 * const pattern = combinePatterns([/cat/, /dog/, /bird/], 'or');
 * pattern.test("I have a cat"); // true
 * pattern.test("I have a fish"); // false
 *
 * @example
 * // AND combination using lookahead
 * const pattern = combinePatterns([/password/, /\d+/], 'and');
 * pattern.test("password123"); // true
 * pattern.test("password"); // false
 *
 * @example
 * // Combine string patterns
 * const pattern = combinePatterns(['hello', 'world'], 'or', 'i');
 * pattern.test("HELLO there"); // true
 *
 * @note 'and' operator uses positive lookaheads, which checks all patterns match somewhere in the string.
 *
 * @complexity Time: O(n), Space: O(n) where n is the number of patterns
 */
export function combinePatterns(
  patterns: (string | RegExp)[],
  operator: 'and' | 'or',
  flags?: string,
): RegExp {
  if (!Array.isArray(patterns)) {
    throw new TypeError(`patterns must be an array, got ${typeof patterns}`);
  }

  if (patterns.length === 0) {
    throw new Error('patterns array cannot be empty');
  }

  if (operator !== 'and' && operator !== 'or') {
    throw new TypeError(`operator must be 'and' or 'or', got ${operator}`);
  }

  if (flags !== undefined && typeof flags !== 'string') {
    throw new TypeError(`flags must be a string, got ${typeof flags}`);
  }

  // Extract pattern sources
  const sources: string[] = [];

  for (const pattern of patterns) {
    if (typeof pattern === 'string') {
      sources.push(pattern);
    } else if (pattern instanceof RegExp) {
      sources.push(pattern.source);
    } else {
      throw new TypeError(
        `Each pattern must be a string or RegExp, got ${typeof pattern}`,
      );
    }
  }

  let combinedPattern: string;

  if (operator === 'or') {
    // OR: (pattern1|pattern2|pattern3)
    combinedPattern = sources.map((s) => `(?:${s})`).join('|');
  } else {
    // AND: (?=.*pattern1)(?=.*pattern2)(?=.*pattern3).*
    // Uses positive lookaheads to ensure all patterns match
    combinedPattern = sources.map((s) => `(?=.*(?:${s}))`).join('') + '.*';
  }

  try {
    return new RegExp(combinedPattern, flags || '');
  } catch (e) {
    throw new Error(
      `Failed to create combined pattern: ${e instanceof Error ? e.message : 'Unknown error'}`,
    );
  }
}
