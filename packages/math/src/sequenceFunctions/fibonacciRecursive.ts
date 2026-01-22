/**
 * Calculates the nth Fibonacci number using a recursive approach.
 *
 * @param n - The position in the Fibonacci sequence (0-indexed, can be negative).
 * @returns The nth Fibonacci number.
 *
 * @throws {Error} If n is not an integer.
 *
 * @example
 * // Basic Fibonacci sequence
 * fibonacciRecursive(0); // 0
 * fibonacciRecursive(1); // 1
 * fibonacciRecursive(6); // 8
 * fibonacciRecursive(10); // 55
 *
 * @example
 * // First several Fibonacci numbers
 * fibonacciRecursive(2); // 1
 * fibonacciRecursive(3); // 2
 * fibonacciRecursive(4); // 3
 * fibonacciRecursive(5); // 5
 *
 * @example
 * // Negative indices (extended Fibonacci)
 * fibonacciRecursive(-1); // 1
 * fibonacciRecursive(-2); // -1
 * fibonacciRecursive(-6); // -8
 *
 * @example
 * // Large values (slow due to recursion)
 * fibonacciRecursive(20); // 6765 (noticeable delay)
 *
 * @example
 * // Real-world: Golden ratio approximation
 * const fib20 = fibonacciRecursive(20);
 * const fib19 = fibonacciRecursive(19);
 * const goldenRatio = fib20 / fib19; // ≈ 1.618 (phi)
 *
 * @note This implementation is simple but VERY SLOW for large n (exponential time complexity).
 * @note For n > 30, this function becomes impractically slow due to redundant calculations.
 * @note Use fibonacciIterative() for better performance with large values.
 * @note Supports negative indices using the extended Fibonacci sequence formula.
 * @note The sequence starts: F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2) for n≥2.
 * @note Consider memoization or dynamic programming for production use.
 *
 * @complexity Time: O(2^n) - Exponential due to redundant recursive calls, Space: O(n) - Call stack depth
 */
export function fibonacciRecursive(n: number): number {
  if (isNaN(n)) {
    throw new Error('Input must be a number');
  }
  if (!Number.isInteger(n)) {
    throw new Error('Input must be an integer');
  }
  if (n < 0) {
    return Math.pow(-1, n + 1) * fibonacciRecursive(-n);
  }
  if (n <= 1) {
    return n;
  }
  return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}
