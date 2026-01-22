/**
 * Represents a match with its position and content.
 */
export interface MatchInfo {
  /** The matched string */
  value: string;
  /** Starting index of the match */
  index: number;
  /** Ending index of the match (exclusive) */
  endIndex: number;
  /** Length of the match */
  length: number;
}

/**
 * Finds all matches of a pattern with their positions in the text.
 *
 * @param text - The text to search in.
 * @param pattern - The regular expression pattern (string or RegExp).
 * @param flags - Optional flags for string patterns (default: 'g').
 * @returns Array of MatchInfo objects with match details and positions.
 *
 * @throws {TypeError} If text is not a string.
 * @throws {TypeError} If pattern is not a string or RegExp.
 * @throws {TypeError} If flags is provided and not a string.
 * @throws {Error} If pattern is invalid.
 *
 * @example
 * // Find word positions
 * findAll("The quick brown fox", /\w+/g);
 * // [{ value: "The", index: 0, endIndex: 3, length: 3 },
 * //  { value: "quick", index: 4, endIndex: 9, length: 5 },
 * //  { value: "brown", index: 10, endIndex: 15, length: 5 },
 * //  { value: "fox", index: 16, endIndex: 19, length: 3 }]
 *
 * @example
 * // Find numbers with positions
 * findAll("Room 101 and Room 202", /\d+/g);
 * // [{ value: "101", index: 5, endIndex: 8, length: 3 },
 * //  { value: "202", index: 18, endIndex: 21, length: 3 }]
 *
 * @note Useful for highlighting, replacing specific occurrences, or analyzing text structure.
 *
 * @complexity Time: O(n*m), Space: O(k) where n is text length, m is pattern complexity, k is number of matches
 */
export function findAll(
  text: string,
  pattern: string | RegExp,
  flags?: string,
): MatchInfo[] {
  if (typeof text !== 'string') {
    throw new TypeError(`text must be a string, got ${typeof text}`);
  }

  if (typeof pattern !== 'string' && !(pattern instanceof RegExp)) {
    throw new TypeError(
      `pattern must be a string or RegExp, got ${typeof pattern}`,
    );
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

  const results: MatchInfo[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const matchValue = match[0];
    results.push({
      value: matchValue,
      index: match.index,
      endIndex: match.index + matchValue.length,
      length: matchValue.length,
    });
  }

  return results;
}
