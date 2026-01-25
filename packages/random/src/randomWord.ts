/**
 * Generates a random pronounceable word.
 *
 * @param length - Length of the word (default: 6). Must be between 1 and 20.
 * @returns A random pronounceable word with alternating consonants and vowels.
 *
 * @throws {TypeError} If length is not a number.
 * @throws {Error} If length is NaN.
 * @throws {Error} If length is not an integer.
 * @throws {Error} If length is less than 1 or greater than 20.
 *
 * @example
 * // Generate default 6-letter word
 * randomWord(); // 'tapole'
 *
 * @example
 * // Generate 4-letter word
 * randomWord(4); // 'buzo'
 *
 * @example
 * // Generate 10-letter word
 * randomWord(10); // 'fokirabemu'
 *
 * @note Uses Math.random() for non-cryptographic randomness.
 * @note Words are generated with alternating consonants and vowels for pronounceability.
 *
 * @complexity Time: O(n), Space: O(n) where n is length
 */
export function randomWord(length: number = 6): string {
  if (typeof length !== 'number') {
    throw new TypeError(`length must be a number, got ${typeof length}`);
  }
  if (isNaN(length)) {
    throw new Error('length must be a valid number, not NaN');
  }
  if (!Number.isInteger(length)) {
    throw new Error(`length must be an integer, got ${length}`);
  }
  if (length < 1 || length > 20) {
    throw new Error(`length must be between 1 and 20, got ${length}`);
  }

  const vowels = 'aeiou';
  const consonants = 'bcdfghjklmnprstvwxyz';
  let word = '';

  for (let i = 0; i < length; i++) {
    // Alternate between consonants and vowels
    const useConsonant = i % 2 === 0;
    const alphabet = useConsonant ? consonants : vowels;
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    word += alphabet[randomIndex];
  }

  return word;
}
