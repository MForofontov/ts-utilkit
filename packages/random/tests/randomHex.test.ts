import { randomHex } from '../src/randomHex';

/**
 * Unit tests for the randomHex function.
 */
describe('randomHex', () => {
  // Test case 1: Normal usage
  it('1. should generate hex string of correct length', () => {
    const result = randomHex(10);
    expect(result).toHaveLength(10);
    expect(result).toMatch(/^[0-9a-f]+$/);
  });

  // Test case 2: Short hex string
  it('2. should generate short hex strings', () => {
    const result = randomHex(4);
    expect(result).toHaveLength(4);
    expect(result).toMatch(/^[0-9a-f]+$/);
  });

  // Test case 3: Long hex string
  it('3. should generate long hex strings', () => {
    const result = randomHex(64);
    expect(result).toHaveLength(64);
    expect(result).toMatch(/^[0-9a-f]+$/);
  });

  // Test case 4: Zero length
  it('4. should return empty string when length is 0', () => {
    const result = randomHex(0);
    expect(result).toBe('');
  });

  // Test case 5: Single character
  it('5. should generate single hex character', () => {
    const result = randomHex(1);
    expect(result).toHaveLength(1);
    expect(result).toMatch(/^[0-9a-f]$/);
  });

  // Test case 6: Lowercase verification
  it('6. should only contain lowercase hex characters', () => {
    const result = randomHex(100);
    expect(result).toMatch(/^[0-9a-f]+$/);
    expect(result).not.toMatch(/[A-F]/);
  });

  // Test case 7: Randomness verification
  it('7. should produce different hex strings over multiple calls', () => {
    const results = new Set<string>();

    for (let i = 0; i < 100; i++) {
      results.add(randomHex(16));
    }

    expect(results.size).toBeGreaterThan(95);
  });

  // Test case 8: All hex characters appear
  it('8. should use all hex characters (0-9, a-f)', () => {
    const allChars = new Set<string>();

    for (let i = 0; i < 1000; i++) {
      const hex = randomHex(10);
      for (const char of hex) {
        allChars.add(char);
      }
    }

    // Should see all 16 hex characters
    expect(allChars.size).toBe(16);
  });

  // Test case 9: Performance test
  it('9. should generate long hex strings efficiently', () => {
    const startTime = performance.now();
    for (let i = 0; i < 1000; i++) {
      randomHex(32);
    }
    const endTime = performance.now();

    expect(endTime - startTime).toBeLessThan(100);
  });

  // Test case 10: Distribution check
  it('10. should have relatively even character distribution', () => {
    const counts = new Map<string, number>();
    const iterations = 16000;

    for (let i = 0; i < iterations; i++) {
      const char = randomHex(1);
      counts.set(char, (counts.get(char) || 0) + 1);
    }

    // Each of 16 hex chars should appear roughly 6.25% of the time (±3%)
    for (const count of counts.values()) {
      const percentage = count / iterations;
      expect(percentage).toBeGreaterThan(0.03);
      expect(percentage).toBeLessThan(0.1);
    }
  });

  // Error Test case 11: TypeError for non-number length
  it('11. should throw TypeError when length is not a number', () => {
    expect(() => randomHex('16' as any)).toThrow(TypeError);
    expect(() => randomHex('16' as any)).toThrow(
      'length must be a number, got string',
    );
  });

  // Error Test case 12: Error for NaN length
  it('12. should throw Error when length is NaN', () => {
    expect(() => randomHex(NaN)).toThrow(Error);
    expect(() => randomHex(NaN)).toThrow(
      'length must be a valid number, not NaN',
    );
  });

  // Error Test case 13: Error for non-integer length
  it('13. should throw Error when length is not an integer', () => {
    expect(() => randomHex(10.5)).toThrow(Error);
    expect(() => randomHex(10.5)).toThrow('length must be an integer');
  });

  // Error Test case 14: Error for negative length
  it('14. should throw Error when length is negative', () => {
    expect(() => randomHex(-10)).toThrow(Error);
    expect(() => randomHex(-10)).toThrow('length must be non-negative');
  });
});
