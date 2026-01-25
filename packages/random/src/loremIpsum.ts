/**
 * Generates Lorem Ipsum placeholder text.
 *
 * @param sentences - Number of sentences to generate (default: 3). Must be between 1 and 50.
 * @returns A string of Lorem Ipsum text.
 *
 * @throws {TypeError} If sentences is not a number.
 * @throws {Error} If sentences is NaN.
 * @throws {Error} If sentences is not an integer.
 * @throws {Error} If sentences is less than 1 or greater than 50.
 *
 * @example
 * // Generate default 3 sentences
 * loremIpsum();
 * // 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor...'
 *
 * @example
 * // Generate 1 sentence
 * loremIpsum(1); // 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
 *
 * @example
 * // Generate 5 sentences
 * loremIpsum(5); // Long Lorem Ipsum text with 5 sentences
 *
 * @note Uses Math.random() for non-cryptographic randomness.
 * @note First sentence always starts with "Lorem ipsum dolor sit amet".
 * @note Sentences have variable length (5-15 words) for natural appearance.
 *
 * @complexity Time: O(n*m), Space: O(n*m) where n is sentences, m is avg words per sentence
 */
export function loremIpsum(sentences: number = 3): string {
  if (typeof sentences !== 'number') {
    throw new TypeError(`sentences must be a number, got ${typeof sentences}`);
  }
  if (isNaN(sentences)) {
    throw new Error('sentences must be a valid number, not NaN');
  }
  if (!Number.isInteger(sentences)) {
    throw new Error(`sentences must be an integer, got ${sentences}`);
  }
  if (sentences < 1 || sentences > 50) {
    throw new Error(`sentences must be between 1 and 50, got ${sentences}`);
  }

  const words = [
    'lorem',
    'ipsum',
    'dolor',
    'sit',
    'amet',
    'consectetur',
    'adipiscing',
    'elit',
    'sed',
    'do',
    'eiusmod',
    'tempor',
    'incididunt',
    'ut',
    'labore',
    'et',
    'dolore',
    'magna',
    'aliqua',
    'enim',
    'ad',
    'minim',
    'veniam',
    'quis',
    'nostrud',
    'exercitation',
    'ullamco',
    'laboris',
    'nisi',
    'aliquip',
    'ex',
    'ea',
    'commodo',
    'consequat',
    'duis',
    'aute',
    'irure',
    'in',
    'reprehenderit',
    'voluptate',
    'velit',
    'esse',
    'cillum',
    'fugiat',
    'nulla',
    'pariatur',
    'excepteur',
    'sint',
    'occaecat',
    'cupidatat',
    'non',
    'proident',
    'sunt',
    'culpa',
    'qui',
    'officia',
    'deserunt',
    'mollit',
    'anim',
    'id',
    'est',
    'laborum',
  ];

  const result: string[] = [];

  for (let s = 0; s < sentences; s++) {
    const sentenceLength = Math.floor(Math.random() * 11) + 5; // 5-15 words
    const sentenceWords: string[] = [];

    // First sentence always starts with "Lorem ipsum dolor sit amet"
    if (s === 0) {
      sentenceWords.push('Lorem', 'ipsum', 'dolor', 'sit', 'amet');
      for (let w = 5; w < sentenceLength; w++) {
        const randomIndex = Math.floor(Math.random() * words.length);
        sentenceWords.push(words[randomIndex]);
      }
    } else {
      for (let w = 0; w < sentenceLength; w++) {
        const randomIndex = Math.floor(Math.random() * words.length);
        const word = words[randomIndex];
        // Capitalize first word of sentence
        sentenceWords.push(
          w === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word,
        );
      }
    }

    result.push(sentenceWords.join(' ') + '.');
  }

  return result.join(' ');
}
