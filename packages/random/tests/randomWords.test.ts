import { randomWords } from '../src/randomWords';

/**
 * Unit tests for the randomWords function.
 */
describe('randomWords', () => {
  // Test case 1: Normal usage with defaults
  it('1. should generate 3 words of length 6 by default', () => {
    const result = randomWords();
    expect(result).toHaveLength(3);
    result.forEach((word) => {
      expect(word).toHaveLength(6);
      expect(word).toMatch(/^[a-z]+$/);
    });
  });

  // Test case 2: Custom count
  it('2. should generate specified number of words', () => {
    const result = randomWords(5);
    expect(result).toHaveLength(5);
    result.forEach((word) => expect(word).toMatch(/^[a-z]+$/));
  });

  // Test case 3: Custom word length
  it('3. should generate words of specified length', () => {
    const result = randomWords(3, 10);
    expect(result).toHaveLength(3);
    result.forEach((word) => expect(word).toHaveLength(10));
  });

  // Test case 4: Single word
  it('4. should generate single word when count is 1', () => {
    const result = randomWords(1, 8);
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveLength(8);
  });

  // Test case 5: Short words
  it('5. should generate short words', () => {
    const result = randomWords(4, 3);
    expect(result).toHaveLength(4);
    result.forEach((word) => expect(word).toHaveLength(3));
  });

  // Test case 6: Long words
  it('6. should generate long words', () => {
    const result = randomWords(2, 20);
    expect(result).toHaveLength(2);
    result.forEach((word) => expect(word).toHaveLength(20));
  });

  // Test case 7: Alternating consonants and vowels pattern
  it('7. should maintain CVCVCV pattern in all words', () => {
    const result = randomWords(5, 8);
    const vowels = 'aeiou';
    const consonants = 'bcdfghjklmnprstvwxyz';

    result.forEach((word) => {
      for (let i = 0; i < word.length; i++) {
        if (i % 2 === 0) {
          expect(consonants).toContain(word[i]);
        } else {
          expect(vowels).toContain(word[i]);
        }
      }
    });
  });

  // Test case 8: Randomness verification
  it('8. should produce different words over multiple calls', () => {
    const results = new Set<string>();

    for (let i = 0; i < 50; i++) {
      const words = randomWords(3, 6);
      results.add(words.join(','));
    }

    expect(results.size).toBeGreaterThan(45);
  });

  // Test case 9: Each word is unique within result
  it('9. should typically generate different words in same call', () => {
    // Over many iterations, words should differ
    let allSameCount = 0;

    for (let i = 0; i < 100; i++) {
      const words = randomWords(3, 6);
      const uniqueWords = new Set(words);
      if (uniqueWords.size === 1) {
        allSameCount++;
      }
    }

    // Very unlikely that all 3 words are the same frequently
    expect(allSameCount).toBeLessThan(5);
  });

  // Test case 10: Large count
  it('10. should handle generating many words', () => {
    const result = randomWords(100, 5);
    expect(result).toHaveLength(100);
    result.forEach((word) => expect(word).toHaveLength(5));
  });

  // Test case 11: Performance test
  it('11. should generate words efficiently', () => {
    const startTime = performance.now();
    randomWords(50, 10);
    const endTime = performance.now();

    expect(endTime - startTime).toBeLessThan(100);
  });

  // Error Test case 12: TypeError for non-number count
  it('12. should throw TypeError when count is not a number', () => {
    expect(() => randomWords('5' as any)).toThrow(TypeError);
    expect(() => randomWords('5' as any)).toThrow(
      'count must be a number, got string',
    );
  });

  // Error Test case 13: TypeError for non-number wordLength
  it('13. should throw TypeError when wordLength is not a number', () => {
    expect(() => randomWords(3, '6' as any)).toThrow(TypeError);
    expect(() => randomWords(3, '6' as any)).toThrow(
      'wordLength must be a number, got string',
    );
  });

  // Error Test case 14: Error for NaN count
  it('14. should throw Error when count is NaN', () => {
    expect(() => randomWords(NaN)).toThrow(Error);
    expect(() => randomWords(NaN)).toThrow(
      'count must be a valid number, not NaN',
    );
  });

  // Error Test case 15: Error for NaN wordLength
  it('15. should throw Error when wordLength is NaN', () => {
    expect(() => randomWords(3, NaN)).toThrow(Error);
    expect(() => randomWords(3, NaN)).toThrow(
      'wordLength must be a valid number, not NaN',
    );
  });

  // Error Test case 16: Error for non-integer count
  it('16. should throw Error when count is not an integer', () => {
    expect(() => randomWords(3.5)).toThrow(Error);
    expect(() => randomWords(3.5)).toThrow('count must be an integer');
  });

  // Error Test case 17: Error for non-integer wordLength
  it('17. should throw Error when wordLength is not an integer', () => {
    expect(() => randomWords(3, 6.5)).toThrow(Error);
    expect(() => randomWords(3, 6.5)).toThrow('wordLength must be an integer');
  });

  // Error Test case 18: Error for count < 1
  it('18. should throw Error when count is less than 1', () => {
    expect(() => randomWords(0)).toThrow(Error);
    expect(() => randomWords(0)).toThrow('count must be between 1 and 100');
  });

  // Error Test case 19: Error for count > 100
  it('19. should throw Error when count is greater than 100', () => {
    expect(() => randomWords(101)).toThrow(Error);
    expect(() => randomWords(101)).toThrow('count must be between 1 and 100');
  });

  // Error Test case 20: Error for wordLength < 1
  it('20. should throw Error when wordLength is less than 1', () => {
    expect(() => randomWords(3, 0)).toThrow(Error);
    expect(() => randomWords(3, 0)).toThrow(
      'wordLength must be between 1 and 20',
    );
  });

  // Error Test case 21: Error for wordLength > 20
  it('21. should throw Error when wordLength is greater than 20', () => {
    expect(() => randomWords(3, 21)).toThrow(Error);
    expect(() => randomWords(3, 21)).toThrow(
      'wordLength must be between 1 and 20',
    );
  });
});
