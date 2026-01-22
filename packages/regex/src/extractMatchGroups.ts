/**
 * Represents a single match with its captured groups.
 */
export interface MatchGroup {
  /** The full matched string */
  match: string;
  /** Array of captured groups (numbered groups) */
  groups: string[];
  /** Named capture groups (if any) */
  namedGroups?: Record<string, string>;
  /** Starting index of the match */
  index: number;
}

/**
 * Extracts all matches with their capture groups from a string.
 *
 * @param text - The text to search in.
 * @param pattern - The regular expression pattern (string or RegExp).
 * @param flags - Optional flags for string patterns (default: 'g').
 * @returns Array of MatchGroup objects containing matches and groups.
 *
 * @throws {TypeError} If text is not a string.
 * @throws {TypeError} If pattern is not a string or RegExp.
 * @throws {TypeError} If flags is provided and not a string.
 * @throws {Error} If pattern is invalid.
 *
 * @example
 * // Extract email parts
 * const pattern = /(\w+)@(\w+)\.(\w+)/g;
 * extractMatchGroups("Contact: john@example.com", pattern);
 * // [{ match: "john@example.com", groups: ["john", "example", "com"], index: 9 }]
 *
 * @example
 * // Named capture groups
 * const pattern = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/g;
 * extractMatchGroups("Date: 2023-12-25", pattern);
 * // [{ match: "2023-12-25", groups: ["2023", "12", "25"],
 * //    namedGroups: { year: "2023", month: "12", day: "25" }, index: 6 }]
 *
 * @example
 * // Multiple matches
 * const pattern = /(\d+)\.(\d+)/g;
 * extractMatchGroups("Prices: 99.99 and 5.50", pattern);
 * // [{ match: "99.99", groups: ["99", "99"], index: 8 },
 * //  { match: "5.50", groups: ["5", "50"], index: 17 }]
 *
 * @complexity Time: O(n*m), Space: O(k*g) where n is text length, m is pattern complexity, k is matches, g is groups
 */
export function extractMatchGroups(
  text: string,
  pattern: string | RegExp,
  flags?: string,
): MatchGroup[] {
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

  const results: MatchGroup[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const matchGroup: MatchGroup = {
      match: match[0],
      groups: match.slice(1),
      index: match.index,
    };

    // Add named groups if they exist
    if (match.groups) {
      matchGroup.namedGroups = match.groups;
    }

    results.push(matchGroup);
  }

  return results;
}
