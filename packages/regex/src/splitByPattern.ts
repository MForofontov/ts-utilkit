/**
 * Splits a string by a pattern, optionally including the delimiters and capture groups.
 *
 * @param text - The text to split.
 * @param pattern - The regular expression pattern (string or RegExp).
 * @param options - Split options.
 * @param options.includeDelimiters - Whether to include matched delimiters in results (default: false).
 * @param options.limit - Maximum number of splits (default: no limit).
 * @param flags - Optional flags for string patterns.
 * @returns Array of string parts.
 *
 * @throws {TypeError} If text is not a string.
 * @throws {TypeError} If pattern is not a string or RegExp.
 * @throws {TypeError} If options is provided and not an object.
 * @throws {TypeError} If flags is provided and not a string.
 * @throws {Error} If pattern is invalid.
 *
 * @example
 * // Basic split
 * splitByPattern("a,b,c", /,/);
 * // ["a", "b", "c"]
 *
 * @example
 * // Include delimiters
 * splitByPattern("one-two-three", /-/, { includeDelimiters: true });
 * // ["one", "-", "two", "-", "three"]
 *
 * @example
 * // With capture groups
 * splitByPattern("a1b2c3", /(\d)/);
 * // ["a", "b", "c"]
 *
 * @example
 * // Include capture groups
 * splitByPattern("a1b2c3", /(\d)/, { includeDelimiters: true });
 * // ["a", "1", "b", "2", "c", "3"]
 *
 * @example
 * // With limit
 * splitByPattern("a,b,c,d,e", /,/, { limit: 3 });
 * // ["a", "b", "c,d,e"]
 *
 * @complexity Time: O(n*m), Space: O(k) where n is text length, m is pattern complexity, k is number of parts
 */
export function splitByPattern(
  text: string,
  pattern: string | RegExp,
  options?: {
    includeDelimiters?: boolean;
    limit?: number;
  },
  flags?: string,
): string[] {
  if (typeof text !== 'string') {
    throw new TypeError(`text must be a string, got ${typeof text}`);
  }

  if (typeof pattern !== 'string' && !(pattern instanceof RegExp)) {
    throw new TypeError(
      `pattern must be a string or RegExp, got ${typeof pattern}`,
    );
  }

  if (options !== undefined && typeof options !== 'object') {
    throw new TypeError(`options must be an object, got ${typeof options}`);
  }

  if (flags !== undefined && typeof flags !== 'string') {
    throw new TypeError(`flags must be a string, got ${typeof flags}`);
  }

  const includeDelimiters = options?.includeDelimiters ?? false;
  const limit = options?.limit;

  let regex: RegExp;

  try {
    if (typeof pattern === 'string') {
      regex = new RegExp(pattern, flags || '');
    } else {
      regex = pattern;
    }
  } catch (e) {
    throw new Error(
      `Invalid regular expression pattern: ${pattern instanceof RegExp ? pattern.source : pattern}`,
    );
  }

  // Native split handles capture groups
  const parts = text.split(regex);

  if (!includeDelimiters) {
    // Filter out captured delimiters (they appear as elements in the array)
    // When split has capture groups, they appear in odd indices
    if (limit !== undefined) {
      return parts.slice(0, limit);
    }
    return parts;
  }

  // If we want to include delimiters but have a limit
  if (limit !== undefined && limit > 0) {
    const result: string[] = [];
    let count = 0;

    for (let i = 0; i < parts.length && count < limit; i++) {
      result.push(parts[i]);
      count++;
    }

    // If there are remaining parts, join them
    if (count === limit && parts.length > limit) {
      const remaining = parts.slice(limit).join('');
      if (remaining) {
        result[result.length - 1] += remaining;
      }
    }

    return result;
  }

  return parts;
}
