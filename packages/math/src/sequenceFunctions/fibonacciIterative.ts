/**
 * Calculates the nth Fibonacci number using an iterative approach.
 *
 * @param n - The position in the Fibonacci sequence (0-indexed, must be non-negative integer).
 * @returns The nth Fibonacci number.
 *
 * @throws {Error} If n is not a non-negative integer.
 *
 * @example
 * // Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34...
 * fibonacciIterative(0); // 0
 * fibonacciIterative(1); // 1
 * fibonacciIterative(2); // 1
 * fibonacciIterative(6); // 8
 * fibonacciIterative(10); // 55
 *
 * @example
 * // Larger Fibonacci numbers
 * fibonacciIterative(15); // 610
 * fibonacciIterative(20); // 6765
 *
 * @example
 * // First few terms
 * fibonacciIterative(3); // 2
 * fibonacciIterative(4); // 3
 * fibonacciIterative(5); // 5
 *
 * @note The Fibonacci sequence is: F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2) for n≥2.
 * @note Uses an iterative approach which is more efficient than recursion.
 * @note Time complexity is O(n), much faster than naive recursive approach O(2^n).
 * @note Space complexity is O(1) as it uses only a few variables.
 * @note For very large n (>78), results may exceed JavaScript's Number.MAX_SAFE_INTEGER.
 * @note Common uses: algorithm analysis, nature patterns, golden ratio calculations.
 *
 * @complexity Time: O(n), Space: O(1)
 */
export function fibonacciIterative(n: number): number {
  if (isNaN(n)) {
    throw new Error('Input must be a number');
  }
  if (!Number.isInteger(n)) {
    throw new Error('Input must be an integer');
  }
  if (n < 0) {
    throw new Error('Input must be a non-negative integer');
  }
  let a = 0,
    b = 1,
    temp;
  for (let i = 1; i < n; i++) {
    temp = a;
    a = b;
    b = temp + b;
  }
  return n === 0 ? 0 : b;
}
