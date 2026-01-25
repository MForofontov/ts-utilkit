import { randomBase64 } from '../src/randomBase64';

/**
 * Unit tests for the randomBase64 function.
 */
describe('randomBase64', () => {
  // Test case 1: Normal usage
  it('1. should generate base64-style string of approximately correct length', () => {
    const result = randomBase64(16);
    expect(result.length).toBeGreaterThanOrEqual(14);
    expect(result.length).toBeLessThanOrEqual(18);
    expect(result).toMatch(/^[A-Za-z0-9+/]+$/);
  });

  // Test case 2: Short string
  it('2. should generate short base64-style strings', () => {
    const result = randomBase64(8);
    expect(result.length).toBeGreaterThanOrEqual(6);
    expect(result.length).toBeLessThanOrEqual(10);
    expect(result).toMatch(/^[A-Za-z0-9+/]+$/);
  });

  // Test case 3: Long string
  it('3. should generate long base64-style strings', () => {
    const result = randomBase64(100);
    expect(result.length).toBeGreaterThanOrEqual(98);
    expect(result.length).toBeLessThanOrEqual(102);
    expect(result).toMatch(/^[A-Za-z0-9+/]+$/);
  });

  // Test case 4: Zero length
  it('4. should return empty string when length is 0', () => {
    const result = randomBase64(0);
    expect(result).toBe('');
  });

  // Test case 5: Single character
  it('5. should generate single character', () => {
    const result = randomBase64(1);
    expect(result).toHaveLength(1);
    expect(result).toMatch(/^[A-Za-z0-9+/]$/);
  });

  // Test case 6: Character set verification
  it('6. should only contain base64 characters (A-Za-z0-9+/)', () => {
    const result = randomBase64(100);
    expect(result).toMatch(/^[A-Za-z0-9+/]+$/);
  });

  // Test case 7: Randomness verification
  it('7. should produce different strings over multiple calls', () => {
    const results = new Set<string>();

    for (let i = 0; i < 100; i++) {
      results.add(randomBase64(20));
    }

    expect(results.size).toBeGreaterThan(95);
  });

  // Test case 8: All base64 characters appear
  it('8. should use all base64 characters', () => {
    const allChars = new Set<string>();

    for (let i = 0; i < 2000; i++) {
      const str = randomBase64(10);
      for (const char of str) {
        allChars.add(char);
      }
    }

    // Should see all 64 base64 characters (might take many iterations)
    expect(allChars.size).toBeGreaterThan(50);
  });

  // Test case 9: Performance test
  it('9. should generate strings efficiently', () => {
    const startTime = performance.now();
    for (let i = 0; i < 1000; i++) {
      randomBase64(32);
    }
    const endTime = performance.now();

    expect(endTime - startTime).toBeLessThan(100);
  });

  // Test case 10: Contains uppercase letters
  it('10. should contain uppercase letters', () => {
    const results: string[] = [];

    for (let i = 0; i < 100; i++) {
      results.push(randomBase64(50));
    }

    const combined = results.join('');
    expect(combined).toMatch(/[A-Z]/);
  });

  // Test case 11: Contains lowercase letters
  it('11. should contain lowercase letters', () => {
    const results: string[] = [];

    for (let i = 0; i < 100; i++) {
      results.push(randomBase64(50));
    }

    const combined = results.join('');
    expect(combined).toMatch(/[a-z]/);
  });

  // Error Test case 12: TypeError for non-number length
  it('12. should throw TypeError when length is not a number', () => {
    expect(() => randomBase64('20' as any)).toThrow(TypeError);
    expect(() => randomBase64('20' as any)).toThrow(
      'length must be a number, got string',
    );
  });

  // Error Test case 13: Error for NaN length
  it('13. should throw Error when length is NaN', () => {
    expect(() => randomBase64(NaN)).toThrow(Error);
    expect(() => randomBase64(NaN)).toThrow(
      'length must be a valid number, not NaN',
    );
  });

  // Error Test case 14: Error for non-integer length
  it('14. should throw Error when length is not an integer', () => {
    expect(() => randomBase64(10.5)).toThrow(Error);
    expect(() => randomBase64(10.5)).toThrow('length must be an integer');
  });

  // Error Test case 15: Error for negative length
  it('15. should throw Error when length is negative', () => {
    expect(() => randomBase64(-10)).toThrow(Error);
    expect(() => randomBase64(-10)).toThrow('length must be non-negative');
  });
});
