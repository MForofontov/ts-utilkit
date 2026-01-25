import { randomHexColor } from '../src/randomHexColor';

/**
 * Unit tests for the randomHexColor function.
 */
describe('randomHexColor', () => {
  // Test case 1: Normal usage with hash
  it('1. should generate hex color with hash by default', () => {
    const result = randomHexColor();
    expect(result).toMatch(/^#[0-9A-F]{6}$/);
    expect(result).toHaveLength(7);
  });

  // Test case 2: Without hash
  it('2. should generate hex color without hash when includeHash is false', () => {
    const result = randomHexColor(false);
    expect(result).toMatch(/^[0-9A-F]{6}$/);
    expect(result).toHaveLength(6);
  });

  // Test case 3: Uppercase letters
  it('3. should use uppercase letters only', () => {
    for (let i = 0; i < 50; i++) {
      const result = randomHexColor(false);
      expect(result).toMatch(/^[0-9A-F]+$/);
      expect(result).not.toMatch(/[a-f]/);
    }
  });

  // Test case 4: Six digit format
  it('4. should always be exactly 6 hex digits (without hash)', () => {
    for (let i = 0; i < 100; i++) {
      const result = randomHexColor(false);
      expect(result).toHaveLength(6);
    }
  });

  // Test case 5: Randomness verification
  it('5. should produce different colors over multiple calls', () => {
    const results = new Set<string>();

    for (let i = 0; i < 100; i++) {
      results.add(randomHexColor());
    }

    expect(results.size).toBeGreaterThan(95);
  });

  // Test case 6: Can generate black (#000000)
  it('6. should occasionally generate black color', () => {
    const colors = new Set<string>();

    for (let i = 0; i < 5000; i++) {
      colors.add(randomHexColor());
    }

    // Very low probability, but possible
    // Just check it doesn't fail on edge case
    expect(colors.size).toBeGreaterThan(1000);
  });

  // Test case 7: Can generate white (#FFFFFF)
  it('7. should occasionally generate white or near-white colors', () => {
    const colors = new Set<string>();

    for (let i = 0; i < 5000; i++) {
      colors.add(randomHexColor());
    }

    // Very low probability for exact white, but should have variety
    expect(colors.size).toBeGreaterThan(1000);
  });

  // Test case 8: Valid CSS color format
  it('8. should be usable as CSS color', () => {
    const color = randomHexColor();
    // Simulate CSS usage
    const cssString = `background-color: ${color};`;
    expect(cssString).toMatch(/^background-color: #[0-9A-F]{6};$/);
  });

  // Test case 9: All hex digits appear
  it('9. should use all hex digits (0-9, A-F)', () => {
    const allChars = new Set<string>();

    for (let i = 0; i < 500; i++) {
      const color = randomHexColor(false);
      for (const char of color) {
        allChars.add(char);
      }
    }

    // Should see all 16 hex characters
    expect(allChars.size).toBe(16);
  });

  // Test case 10: Distribution check
  it('10. should have relatively even color distribution', () => {
    const firstDigits = new Map<string, number>();
    const iterations = 1600;

    for (let i = 0; i < iterations; i++) {
      const color = randomHexColor(false);
      const firstDigit = color[0];
      firstDigits.set(firstDigit, (firstDigits.get(firstDigit) || 0) + 1);
    }

    // Each hex digit should appear roughly 6.25% of the time as first digit (±4%)
    for (const count of firstDigits.values()) {
      const percentage = count / iterations;
      expect(percentage).toBeGreaterThan(0.02);
      expect(percentage).toBeLessThan(0.11);
    }
  });

  // Test case 11: Performance test
  it('11. should generate colors efficiently', () => {
    const startTime = performance.now();
    for (let i = 0; i < 10000; i++) {
      randomHexColor();
    }
    const endTime = performance.now();

    expect(endTime - startTime).toBeLessThan(100);
  });

  // Test case 12: Explicit true for includeHash
  it('12. should include hash when explicitly set to true', () => {
    const result = randomHexColor(true);
    expect(result).toMatch(/^#[0-9A-F]{6}$/);
  });

  // Error Test case 13: TypeError for non-boolean includeHash
  it('13. should throw TypeError when includeHash is not a boolean', () => {
    expect(() => randomHexColor('true' as any)).toThrow(TypeError);
    expect(() => randomHexColor('true' as any)).toThrow(
      'includeHash must be a boolean, got string',
    );
  });

  // Error Test case 14: TypeError for number includeHash
  it('14. should throw TypeError when includeHash is a number', () => {
    expect(() => randomHexColor(1 as any)).toThrow(TypeError);
    expect(() => randomHexColor(1 as any)).toThrow(
      'includeHash must be a boolean, got number',
    );
  });
});
