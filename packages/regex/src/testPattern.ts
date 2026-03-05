import vm from 'vm';

/**
 * Safely tests if a pattern matches a string with optional timeout protection.
 *
 * When `timeout` is provided the regex test runs inside a `vm.runInContext`
 * sandbox so that V8 can interrupt catastrophic backtracking via its built-in
 * script execution timer — this is a genuine, synchronous timeout that works
 * for runaway regexes, not just a post-hoc check.
 *
 * @param text - The text to test.
 * @param pattern - The regular expression pattern (string or RegExp).
 * @param options - Test options.
 * @param options.timeout - Maximum execution time in milliseconds (default: no timeout).
 * @param flags - Optional flags for string patterns.
 * @returns True if pattern matches, false otherwise.
 *
 * @throws {Error} If pattern is invalid.
 * @throws {Error} If test exceeds timeout (catastrophic backtracking guard).
 *
 * @example
 * // Basic test
 * testPattern("test@example.com", /^[^@]+@[^@]+\.[^@]+$/);
 * // true
 *
 * @example
 * // With timeout protection against catastrophic backtracking
 * testPattern("aaaaaaaaaaaaaaaaaaaaaa!", /(a+)+b/, { timeout: 100 });
 * // throws Error: Pattern test exceeded timeout of 100ms
 *
 * @example
 * // Case-insensitive test
 * testPattern("HELLO", "^hello$", "i");
 * // true
 *
 * @note The timeout option uses Node.js vm.runInContext with V8's script execution
 *       timer to truly interrupt long-running regex evaluation (including catastrophic
 *       backtracking). Without a timeout, the test runs directly via regex.test().
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
  let regex: RegExp;

  try {
    if (typeof pattern === 'string') {
      regex = new RegExp(pattern, flags || '');
    } else {
      regex = pattern;
    }
  } catch {
    throw new Error(
      `Invalid regular expression pattern: ${pattern instanceof RegExp ? pattern.source : pattern}`,
    );
  }

  const timeout = options?.timeout;

  if (timeout === undefined) {
    // No timeout — run directly
    return regex.test(text);
  }

  // Run inside a vm sandbox so V8 can hard-interrupt on timeout.
  // The context exposes only the three values the inline script needs;
  // the regex source/flags are reconstructed inside so they are local to V8.
  const ctx = vm.createContext({
    text,
    src: regex.source,
    flags: regex.flags,
    result: false,
  });

  try {
    vm.runInContext('result = new RegExp(src, flags).test(text);', ctx, {
      timeout,
    });
  } catch {
    // Any error from vm execution at this point means the script was
    // interrupted by the timeout guard (the regex itself is already valid).
    throw new Error(`Pattern test exceeded timeout of ${timeout}ms`);
  }

  return ctx['result'] as boolean;
}
