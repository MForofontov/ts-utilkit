import { loremIpsum } from '../src/loremIpsum';

/**
 * Unit tests for the loremIpsum function.
 */
describe('loremIpsum', () => {
  // Test case 1: Normal usage with default sentences
  it('1. should generate 3 sentences by default', () => {
    const result = loremIpsum();
    const sentences = result.split('. ');
    expect(sentences.length).toBe(3);
  });

  // Test case 2: Custom sentence count
  it('2. should generate specified number of sentences', () => {
    const result = loremIpsum(5);
    const sentences = result.split('. ');
    expect(sentences.length).toBe(5);
  });

  // Test case 3: Single sentence
  it('3. should generate single sentence', () => {
    const result = loremIpsum(1);
    expect(result).toMatch(/^Lorem ipsum dolor sit amet.+$/);
    expect(result.endsWith('.')).toBe(true);
  });

  // Test case 4: First sentence starts with Lorem ipsum
  it('4. should always start with "Lorem ipsum dolor sit amet"', () => {
    for (let i = 0; i < 10; i++) {
      const result = loremIpsum(3);
      expect(result).toMatch(/^Lorem ipsum dolor sit amet/);
    }
  });

  // Test case 5: Each sentence ends with period
  it('5. should end each sentence with a period', () => {
    const result = loremIpsum(5);
    const sentences = result.split('. ');

    sentences.forEach((sentence, index) => {
      if (index < sentences.length - 1) {
        expect(sentence).not.toMatch(/\.$/);
      } else {
        expect(sentence).toMatch(/\.$/);
      }
    });
  });

  // Test case 6: Contains only Latin words
  it('6. should contain only lowercase Latin words (except first letter)', () => {
    const result = loremIpsum(3);
    // Remove periods and check words
    const words = result.replace(/\./g, '').split(' ');

    words.forEach((word) => {
      expect(word).toMatch(/^[A-Z]?[a-z]+$/);
    });
  });

  // Test case 7: Randomness verification
  it('7. should produce different text over multiple calls', () => {
    const results = new Set<string>();

    for (let i = 0; i < 50; i++) {
      results.add(loremIpsum(2));
    }

    // Should have many unique results (except first sentence is always same)
    expect(results.size).toBeGreaterThan(40);
  });

  // Test case 8: Variable sentence length
  it('8. should generate sentences with variable length (5-15 words)', () => {
    const result = loremIpsum(10);
    const sentences = result.split('. ');

    sentences.forEach((sentence) => {
      const words = sentence.replace(/\.$/, '').split(' ');
      expect(words.length).toBeGreaterThanOrEqual(5);
      expect(words.length).toBeLessThanOrEqual(15);
    });
  });

  // Test case 9: Subsequent sentences start with capital letter
  it('9. should capitalize first letter of each sentence after first', () => {
    const result = loremIpsum(5);
    const sentences = result.split('. ');

    sentences.slice(1).forEach((sentence) => {
      const cleanSentence = sentence.replace(/\.$/, '');
      expect(cleanSentence[0]).toMatch(/[A-Z]/);
    });
  });

  // Test case 10: Long text generation
  it('10. should handle generating many sentences', () => {
    const result = loremIpsum(50);
    const sentences = result.split('. ');
    expect(sentences.length).toBe(50);
  });

  // Test case 11: Performance test
  it('11. should generate text efficiently', () => {
    const startTime = performance.now();
    for (let i = 0; i < 100; i++) {
      loremIpsum(10);
    }
    const endTime = performance.now();

    expect(endTime - startTime).toBeLessThan(100);
  });

  // Test case 12: Format check
  it('12. should have proper spacing between sentences', () => {
    const result = loremIpsum(3);
    // Should have '. ' between sentences (period + space)
    expect(result).toMatch(/\.\s/);
  });

  // Error Test case 13: TypeError for non-number sentences
  it('13. should throw TypeError when sentences is not a number', () => {
    expect(() => loremIpsum('3' as any)).toThrow(TypeError);
    expect(() => loremIpsum('3' as any)).toThrow(
      'sentences must be a number, got string',
    );
  });

  // Error Test case 14: Error for NaN sentences
  it('14. should throw Error when sentences is NaN', () => {
    expect(() => loremIpsum(NaN)).toThrow(Error);
    expect(() => loremIpsum(NaN)).toThrow(
      'sentences must be a valid number, not NaN',
    );
  });

  // Error Test case 15: Error for non-integer sentences
  it('15. should throw Error when sentences is not an integer', () => {
    expect(() => loremIpsum(3.5)).toThrow(Error);
    expect(() => loremIpsum(3.5)).toThrow('sentences must be an integer');
  });

  // Error Test case 16: Error for sentences < 1
  it('16. should throw Error when sentences is less than 1', () => {
    expect(() => loremIpsum(0)).toThrow(Error);
    expect(() => loremIpsum(0)).toThrow('sentences must be between 1 and 50');
  });

  // Error Test case 17: Error for sentences > 50
  it('17. should throw Error when sentences is greater than 50', () => {
    expect(() => loremIpsum(51)).toThrow(Error);
    expect(() => loremIpsum(51)).toThrow('sentences must be between 1 and 50');
  });
});
