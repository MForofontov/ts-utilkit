/**
 * Shuffles an array using the Fisher-Yates (also known as Knuth) algorithm.
 * Creates a new array with the same elements in a random order.
 *
 * @param arr - The array to shuffle.
 * @returns A new array containing the same elements in a randomized order.
 *
 * @example
 * // Basic usage
 * const numbers = [1, 2, 3, 4, 5];
 * shuffleArray(numbers); // Returns a random permutation like [3, 1, 4, 5, 2]
 *
 * @example
 * // Original array is not modified
 * const original = ['a', 'b', 'c'];
 * const shuffled = shuffleArray(original);
 * // original still equals ['a', 'b', 'c']
 *
 * @example
 * // Empty array
 * shuffleArray([]); // Returns []
 *
 * @example
 * // Single element
 * shuffleArray([42]); // Returns [42] (only one possible arrangement)
 *
 * @example
 * // Real-world: Randomize quiz questions
 * const questions = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'];
 * const randomized = shuffleArray(questions);
 * // Present questions in random order to each user
 *
 * @note This implementation uses the Fisher-Yates algorithm which produces an unbiased
 * permutation (all possible arrangements are equally likely). The function creates a
 * new array and does not modify the original.
 * @note Uses Math.random() which is not cryptographically secure.
 * @note Useful for randomizing data, creating random samples, and shuffling decks.
 * @note Also known as the Knuth shuffle.
 *
 * @complexity Time: O(n), Space: O(n) - Where n is array length
 */
export function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
