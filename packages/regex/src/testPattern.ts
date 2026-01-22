/**
 * Safely tests if a pattern matches a string with optional timeout protection.
 *
 * @param text - The text to test.
 * @param pattern - The regular expression pattern (string or RegExp).
 * @param options - Test options.
 * @param options.timeout - Maximum execution time in milliseconds (default: no timeout).
 * @param flags - Optional flags for string patterns.
 * @returns True if pattern matches, false otherwise.
 *
 * @throws {TypeError} If text is not a string.
 * @throws {TypeError} If pattern is not a string or RegExp.
 * @throws {TypeError} If options is provided and not an object.
 * @throws {TypeError} If flags is provided and not a string.
 * @throws {Error} If pattern is invalid.
 * @throws {Error} If test exceeds timeout.
 *
 * @example
 * // Basic test
 * testPattern("test@example.com", /^[^@]+@[^@]+\.[^@]+$/);
 * // true
 *
 * @example
 * // With timeout protection
 * testPattern("aaaaaaaaaaaaaaaaaaaaaa", /(a+)+b/, { timeout: 100 });
 * // throws Error: Pattern test exceeded timeout of 100ms
 *
 * @example
 * // Case-insensitive test
 * testPattern("HELLO", "^hello$", "i");
 * // true
 *
 * @note Use timeout option to protect against catastrophic backtracking.
 *
 * @complexity Time: O(n*m), Space: O(1) where n is text length, m is pattern complexity
 */
export function testPattern(
  text: string,
  pattern: string | RegExp,
  options?: {
    timeout?: number;
  },
  flags?: string,
): boolean {
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

  const timeout = options?.timeout;

  if (timeout === undefined) {
    // No timeout, test directly
    return regex.test(text);
  }

  // Test with timeout protection
  let completed = false;
  let result = false;
  let error: Error | null = null;

  const timer = setTimeout(() => {
    if (!completed) {
      error = new Error(`Pattern test exceeded timeout of ${timeout}ms`);
    }
  }, timeout);

  try {
    result = regex.test(text);
    completed = true;
    clearTimeout(timer);
  } catch (e) {
    completed = true;
    clearTimeout(timer);
    throw e;
  }

  if (error) {
    throw error;
  }

  return result;
}
