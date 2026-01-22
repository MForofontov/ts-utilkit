/**
 * Generates multiple random pronounceable words.
 *
 * @param count - Number of words to generate (default: 3). Must be between 1 and 100.
 * @param wordLength - Length of each word (default: 6). Must be between 1 and 20.
 * @returns An array of random pronounceable words.
 *
 * @throws {TypeError} If count or wordLength is not a number.
 * @throws {Error} If count or wordLength is NaN.
 * @throws {Error} If count or wordLength is not an integer.
 * @throws {Error} If count is less than 1 or greater than 100.
 * @throws {Error} If wordLength is less than 1 or greater than 20.
 *
 * @example
 * // Generate 3 words of default length
 * randomWords(); // ['tapole', 'kirano', 'bexuza']
 *
 * @example
 * // Generate 5 words of length 4
 * randomWords(5, 4); // ['buzo', 'keta', 'limo', 'paru', 'vexo']
 *
 * @example
 * // Generate 10 short words
 * randomWords(10, 3); // ['bat', 'leo', 'kiv', 'muz', 'par', ...]
 *
 * @note Uses Math.random() for non-cryptographic randomness.
 * @note Words are generated with alternating consonants and vowels for pronounceability.
 *
 * @complexity Time: O(n*m), Space: O(n*m) where n is count, m is wordLength
 */
export function randomWords(
  count: number = 3,
  wordLength: number = 6,
): string[] {
  if (typeof count !== 'number') {
    throw new TypeError(`count must be a number, got ${typeof count}`);
  }
  if (isNaN(count)) {
    throw new Error('count must be a valid number, not NaN');
  }
  if (!Number.isInteger(count)) {
    throw new Error(`count must be an integer, got ${count}`);
  }
  if (count < 1 || count > 100) {
    throw new Error(`count must be between 1 and 100, got ${count}`);
  }

  if (typeof wordLength !== 'number') {
    throw new TypeError(
      `wordLength must be a number, got ${typeof wordLength}`,
    );
  }
  if (isNaN(wordLength)) {
    throw new Error('wordLength must be a valid number, not NaN');
  }
  if (!Number.isInteger(wordLength)) {
    throw new Error(`wordLength must be an integer, got ${wordLength}`);
  }
  if (wordLength < 1 || wordLength > 20) {
    throw new Error(`wordLength must be between 1 and 20, got ${wordLength}`);
  }

  const vowels = 'aeiou';
  const consonants = 'bcdfghjklmnprstvwxyz';
  const words: string[] = [];

  for (let w = 0; w < count; w++) {
    let word = '';
    for (let i = 0; i < wordLength; i++) {
      const useConsonant = i % 2 === 0;
      const alphabet = useConsonant ? consonants : vowels;
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      word += alphabet[randomIndex];
    }
    words.push(word);
  }

  return words;
}
