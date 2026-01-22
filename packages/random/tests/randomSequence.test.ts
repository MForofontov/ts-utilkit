import { randomSequence } from '../src/randomSequence';

/**
 * Unit tests for the randomSequence function.
 */
describe('randomSequence', () => {
  // Test case 1: Default alphabet (alphanumeric)
  it('1. should generate sequence with default alphanumeric alphabet', () => {
    const result = randomSequence(10);
    expect(result).toHaveLength(10);
    expect(result).toMatch(/^[A-Za-z0-9]+$/);
  });

  // Test case 2: Custom alphabet
  it('2. should generate sequence with custom alphabet', () => {
    const result = randomSequence(8, 'ABC');
    expect(result).toHaveLength(8);
    expect(result).toMatch(/^[ABC]+$/);
  });

  // Test case 3: Single character alphabet
  it('3. should work with single character alphabet', () => {
    const result = randomSequence(5, 'X');
    expect(result).toBe('XXXXX');
  });

  // Test case 4: Zero length
  it('4. should return empty string when length is 0', () => {
    const result = randomSequence(0);
    expect(result).toBe('');
  });

  // Test case 5: Digits only alphabet
  it('5. should work with digits only alphabet', () => {
    const result = randomSequence(6, '0123456789');
    expect(result).toHaveLength(6);
    expect(result).toMatch(/^[0-9]+$/);
  });

  // Test case 6: Special characters alphabet
  it('6. should work with special characters alphabet', () => {
    const result = randomSequence(5, '!@#$%');
    expect(result).toHaveLength(5);
    expect(result).toMatch(/^[!@#$%]+$/);
  });

  // Test case 7: Randomness verification
  it('7. should produce different sequences over multiple calls', () => {
    const results = new Set<string>();

    for (let i = 0; i < 100; i++) {
      results.add(randomSequence(10));
    }

    // Should have many unique sequences
    expect(results.size).toBeGreaterThan(95);
  });

  // Test case 8: Long sequence
  it('8. should handle long sequences', () => {
    const result = randomSequence(1000);
    expect(result).toHaveLength(1000);
    expect(result).toMatch(/^[A-Za-z0-9]+$/);
  });

  // Test case 9: Binary alphabet
  it('9. should work with binary alphabet', () => {
    const result = randomSequence(20, '01');
    expect(result).toHaveLength(20);
    expect(result).toMatch(/^[01]+$/);
  });

  // Test case 10: Distribution check
  it('10. should have relatively even character distribution', () => {
    const alphabet = 'ABC';
    const counts = new Map<string, number>();
    const iterations = 3000;

    for (let i = 0; i < iterations; i++) {
      const char = randomSequence(1, alphabet);
      counts.set(char, (counts.get(char) || 0) + 1);
    }

    // Each character should appear roughly 33% of the time (±10%)
    for (const count of counts.values()) {
      const percentage = count / iterations;
      expect(percentage).toBeGreaterThan(0.23);
      expect(percentage).toBeLessThan(0.43);
    }
  });

  // Error Test case 11: TypeError for non-number length
  it('11. should throw TypeError when length is not a number', () => {
    expect(() => randomSequence('10' as any)).toThrow(TypeError);
    expect(() => randomSequence('10' as any)).toThrow(
      'length must be a number, got string',
    );
  });

  // Error Test case 12: TypeError for non-string alphabet
  it('12. should throw TypeError when alphabet is not a string', () => {
    expect(() => randomSequence(10, 123 as any)).toThrow(TypeError);
    expect(() => randomSequence(10, 123 as any)).toThrow(
      'alphabet must be a string, got number',
    );
  });

  // Error Test case 13: Error for NaN length
  it('13. should throw Error when length is NaN', () => {
    expect(() => randomSequence(NaN)).toThrow(Error);
    expect(() => randomSequence(NaN)).toThrow(
      'length must be a valid number, not NaN',
    );
  });

  // Error Test case 14: Error for non-integer length
  it('14. should throw Error when length is not an integer', () => {
    expect(() => randomSequence(5.5)).toThrow(Error);
    expect(() => randomSequence(5.5)).toThrow('length must be an integer');
  });

  // Error Test case 15: Error for negative length
  it('15. should throw Error when length is negative', () => {
    expect(() => randomSequence(-5)).toThrow(Error);
    expect(() => randomSequence(-5)).toThrow('length must be non-negative');
  });

  // Error Test case 16: Error for empty alphabet
  it('16. should throw Error when alphabet is empty', () => {
    expect(() => randomSequence(10, '')).toThrow(Error);
    expect(() => randomSequence(10, '')).toThrow('alphabet cannot be empty');
  });
});
