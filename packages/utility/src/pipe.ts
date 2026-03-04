/**
 * Composes functions left-to-right, returning a new function that passes its
 * argument through each function in sequence. The output of each function
 * becomes the input of the next.
 *
 * @param fn1 - First function to apply.
 * @returns A composed function applying all functions left-to-right.
 *
 * @throws {Error} If called with no arguments.
 *
 * @example
 * // Basic two-step pipeline
 * const process = pipe(
 *   (x: number) => x * 2,
 *   (x: number) => x + 1,
 * );
 * process(5); // (5 * 2) + 1 = 11
 *
 * @example
 * // String transformation pipeline
 * const transform = pipe(
 *   (s: string) => s.trim(),
 *   (s: string) => s.toLowerCase(),
 *   (s: string) => s.replace(/\s+/g, '-'),
 * );
 * transform('  Hello World  '); // 'hello-world'
 *
 * @example
 * // Single-function pipe is a no-op wrapper
 * const double = pipe((x: number) => x * 2);
 * double(3); // 6
 *
 * @note For right-to-left composition use `compose`.
 * @note For async pipelines use `asyncWaterfall` from `@ts-utilkit/async`.
 *
 * @complexity Time: O(n) where n is the number of functions, Space: O(1)
 */
export function pipe<A, B>(fn1: (a: A) => B): (a: A) => B;
export function pipe<A, B, C>(
  fn1: (a: A) => B,
  fn2: (b: B) => C,
): (a: A) => C;
export function pipe<A, B, C, D>(
  fn1: (a: A) => B,
  fn2: (b: B) => C,
  fn3: (c: C) => D,
): (a: A) => D;
export function pipe<A, B, C, D, E>(
  fn1: (a: A) => B,
  fn2: (b: B) => C,
  fn3: (c: C) => D,
  fn4: (d: D) => E,
): (a: A) => E;
export function pipe<A, B, C, D, E, F>(
  fn1: (a: A) => B,
  fn2: (b: B) => C,
  fn3: (c: C) => D,
  fn4: (d: D) => E,
  fn5: (e: E) => F,
): (a: A) => F;
export function pipe<A, B, C, D, E, F, G>(
  fn1: (a: A) => B,
  fn2: (b: B) => C,
  fn3: (c: C) => D,
  fn4: (d: D) => E,
  fn5: (e: E) => F,
  fn6: (f: F) => G,
): (a: A) => G;
export function pipe(
  ...fns: Array<(arg: unknown) => unknown>
): (arg: unknown) => unknown {
  if (fns.length === 0) {
    throw new Error('pipe requires at least one function');
  }
  return (arg: unknown) => fns.reduce((acc, fn) => fn(acc), arg);
}
