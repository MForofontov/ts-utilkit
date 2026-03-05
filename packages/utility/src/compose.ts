/**
 * Composes functions right-to-left, returning a new function that passes its
 * argument through each function in reverse sequence. The rightmost function
 * is applied first, and its output becomes the input of the next function to
 * the left.
 *
 * @param fn1 - The outermost (last applied) function.
 * @returns A composed function applying all functions right-to-left.
 *
 * @throws {Error} If called with no arguments.
 *
 * @example
 * // Right-to-left: add1 is applied first, then double
 * const process = compose(
 *   (x: number) => x * 2,
 *   (x: number) => x + 1,
 * );
 * process(5); // (5 + 1) * 2 = 12
 *
 * @example
 * // Equivalent to pipe with arguments reversed
 * const transform = compose(
 *   (s: string) => s.replace(/\s+/g, '-'),
 *   (s: string) => s.toLowerCase(),
 *   (s: string) => s.trim(),
 * );
 * transform('  Hello World  '); // 'hello-world'
 *
 * @example
 * // Single-function compose is a no-op wrapper
 * const double = compose((x: number) => x * 2);
 * double(3); // 6
 *
 * @note For left-to-right composition use `pipe`.
 * @note Mathematical function notation: compose(f, g)(x) = f(g(x)).
 *
 * @complexity Time: O(n) where n is the number of functions, Space: O(1)
 */
export function compose<A, B>(fn1: (a: A) => B): (a: A) => B;
export function compose<A, B, C>(
  fn2: (b: B) => C,
  fn1: (a: A) => B,
): (a: A) => C;
export function compose<A, B, C, D>(
  fn3: (c: C) => D,
  fn2: (b: B) => C,
  fn1: (a: A) => B,
): (a: A) => D;
export function compose<A, B, C, D, E>(
  fn4: (d: D) => E,
  fn3: (c: C) => D,
  fn2: (b: B) => C,
  fn1: (a: A) => B,
): (a: A) => E;
export function compose<A, B, C, D, E, F>(
  fn5: (e: E) => F,
  fn4: (d: D) => E,
  fn3: (c: C) => D,
  fn2: (b: B) => C,
  fn1: (a: A) => B,
): (a: A) => F;
export function compose<A, B, C, D, E, F, G>(
  fn6: (f: F) => G,
  fn5: (e: E) => F,
  fn4: (d: D) => E,
  fn3: (c: C) => D,
  fn2: (b: B) => C,
  fn1: (a: A) => B,
): (a: A) => G;
export function compose(
  ...fns: Array<(arg: unknown) => unknown>
): (arg: unknown) => unknown {
  if (fns.length === 0) {
    throw new Error('compose requires at least one function');
  }
  return (arg: unknown) => fns.reduceRight((acc, fn) => fn(acc), arg);
}
