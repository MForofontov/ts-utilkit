import { randomWord } from '../src/randomWord';

/**
 * Unit tests for the randomWord function.
 */
describe('randomWord', () => {
  // Test case 1: Normal usage with default length
  it('1. should generate word of default length 6', () => {
    const result = randomWord();
    expect(result).toHaveLength(6);
    expect(result).toMatch(/^[a-z]+$/);
  });

  // Test case 2: Custom length
  it('2. should generate word of specified length', () => {
    const result = randomWord(10);
    expect(result).toHaveLength(10);
    expect(result).toMatch(/^[a-z]+$/);
  });

  // Test case 3: Short word
  it('3. should generate short words', () => {
    const result = randomWord(3);
    expect(result).toHaveLength(3);
    expect(result).toMatch(/^[a-z]+$/);
  });

  // Test case 4: Long word
  it('4. should generate long words', () => {
    const result = randomWord(20);
    expect(result).toHaveLength(20);
    expect(result).toMatch(/^[a-z]+$/);
  });

  // Test case 5: Single letter word
  it('5. should generate single letter word', () => {
    const result = randomWord(1);
    expect(result).toHaveLength(1);
    expect(result).toMatch(/^[bcdfghjklmnprstvwxyz]$/); // First char is consonant
  });

  // Test case 6: Alternating consonants and vowels
  it('6. should alternate between consonants and vowels', () => {
    const result = randomWord(10);
    const vowels = 'aeiou';
    const consonants = 'bcdfghjklmnprstvwxyz';

    for (let i = 0; i < result.length; i++) {
      if (i % 2 === 0) {
        // Even positions should be consonants
        expect(consonants).toContain(result[i]);
      } else {
        // Odd positions should be vowels
        expect(vowels).toContain(result[i]);
      }
    }
  });

  // Test case 7: Randomness verification
  it('7. should produce different words over multiple calls', () => {
    const results = new Set<string>();

    for (let i = 0; i < 100; i++) {
      results.add(randomWord(8));
    }

    expect(results.size).toBeGreaterThan(90);
  });

  // Test case 8: Contains vowels and consonants
  it('8. should contain both vowels and consonants', () => {
    const word = randomWord(10);
    const hasVowel = /[aeiou]/.test(word);
    const hasConsonant = /[bcdfghjklmnprstvwxyz]/.test(word);

    expect(hasVowel).toBe(true);
    expect(hasConsonant).toBe(true);
  });

  // Test case 9: Performance test
  it('9. should generate words efficiently', () => {
    const startTime = performance.now();
    for (let i = 0; i < 1000; i++) {
      randomWord(10);
    }
    const endTime = performance.now();

    expect(endTime - startTime).toBeLessThan(100);
  });

  // Test case 10: Pattern consistency
  it('10. should maintain CVCVCV pattern (Consonant-Vowel)', () => {
    for (let i = 0; i < 50; i++) {
      const word = randomWord(12);
      const vowels = 'aeiou';

      // Check pattern: even indices = consonants, odd indices = vowels
      for (let j = 0; j < word.length; j++) {
        const isVowel = vowels.includes(word[j]);
        if (j % 2 === 0) {
          expect(isVowel).toBe(false); // Should be consonant
        } else {
          expect(isVowel).toBe(true); // Should be vowel
        }
      }
    }
  });

  // Error Test case 11: TypeError for non-number length
  it('11. should throw TypeError when length is not a number', () => {
    expect(() => randomWord('6' as any)).toThrow(TypeError);
    expect(() => randomWord('6' as any)).toThrow(
      'length must be a number, got string',
    );
  });

  // Error Test case 12: Error for NaN length
  it('12. should throw Error when length is NaN', () => {
    expect(() => randomWord(NaN)).toThrow(Error);
    expect(() => randomWord(NaN)).toThrow(
      'length must be a valid number, not NaN',
    );
  });

  // Error Test case 13: Error for non-integer length
  it('13. should throw Error when length is not an integer', () => {
    expect(() => randomWord(6.5)).toThrow(Error);
    expect(() => randomWord(6.5)).toThrow('length must be an integer');
  });

  // Error Test case 14: Error for length < 1
  it('14. should throw Error when length is less than 1', () => {
    expect(() => randomWord(0)).toThrow(Error);
    expect(() => randomWord(0)).toThrow('length must be between 1 and 20');
  });

  // Error Test case 15: Error for length > 20
  it('15. should throw Error when length is greater than 20', () => {
    expect(() => randomWord(21)).toThrow(Error);
    expect(() => randomWord(21)).toThrow('length must be between 1 and 20');
  });
});
