import { randomRGB, RGB } from '../src/randomRGB';

/**
 * Unit tests for the randomRGB function.
 */
describe('randomRGB', () => {
  // Test case 1: Normal usage
  it('1. should generate valid RGB object', () => {
    const result = randomRGB();
    expect(result).toHaveProperty('r');
    expect(result).toHaveProperty('g');
    expect(result).toHaveProperty('b');
    expect(typeof result.r).toBe('number');
    expect(typeof result.g).toBe('number');
    expect(typeof result.b).toBe('number');
  });

  // Test case 2: Red channel range
  it('2. should have red channel in range 0-255', () => {
    for (let i = 0; i < 100; i++) {
      const result = randomRGB();
      expect(result.r).toBeGreaterThanOrEqual(0);
      expect(result.r).toBeLessThanOrEqual(255);
      expect(Number.isInteger(result.r)).toBe(true);
    }
  });

  // Test case 3: Green channel range
  it('3. should have green channel in range 0-255', () => {
    for (let i = 0; i < 100; i++) {
      const result = randomRGB();
      expect(result.g).toBeGreaterThanOrEqual(0);
      expect(result.g).toBeLessThanOrEqual(255);
      expect(Number.isInteger(result.g)).toBe(true);
    }
  });

  // Test case 4: Blue channel range
  it('4. should have blue channel in range 0-255', () => {
    for (let i = 0; i < 100; i++) {
      const result = randomRGB();
      expect(result.b).toBeGreaterThanOrEqual(0);
      expect(result.b).toBeLessThanOrEqual(255);
      expect(Number.isInteger(result.b)).toBe(true);
    }
  });

  // Test case 5: Randomness verification
  it('5. should produce different RGB values over multiple calls', () => {
    const results = new Set<string>();

    for (let i = 0; i < 100; i++) {
      const rgb = randomRGB();
      results.add(`${rgb.r},${rgb.g},${rgb.b}`);
    }

    expect(results.size).toBeGreaterThan(90);
  });

  // Test case 6: All channels can be 0
  it('6. should occasionally generate 0 values', () => {
    const values = new Set<number>();

    for (let i = 0; i < 1000; i++) {
      const rgb = randomRGB();
      values.add(rgb.r);
      values.add(rgb.g);
      values.add(rgb.b);
    }

    expect(values.has(0)).toBe(true);
  });

  // Test case 7: All channels can be 255
  it('7. should occasionally generate 255 values', () => {
    const values = new Set<number>();

    for (let i = 0; i < 1000; i++) {
      const rgb = randomRGB();
      values.add(rgb.r);
      values.add(rgb.g);
      values.add(rgb.b);
    }

    expect(values.has(255)).toBe(true);
  });

  // Test case 8: Type check for RGB interface
  it('8. should match RGB interface type', () => {
    const result: RGB = randomRGB();
    expect(result).toBeDefined();
  });

  // Test case 9: Can be used with CSS rgb() function
  it('9. should be usable in CSS rgb() format', () => {
    const rgb = randomRGB();
    const cssString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    expect(cssString).toMatch(/^rgb\(\d+, \d+, \d+\)$/);
  });

  // Test case 10: Distribution check for red channel
  it('10. should have relatively even distribution across range', () => {
    let lowCount = 0;
    let highCount = 0;
    const iterations = 1000;

    for (let i = 0; i < iterations; i++) {
      const rgb = randomRGB();
      if (rgb.r < 128) {
        lowCount++;
      } else {
        highCount++;
      }
    }

    // Should be roughly 50/50 split (±15%)
    expect(lowCount).toBeGreaterThan(350);
    expect(lowCount).toBeLessThan(650);
  });

  // Test case 11: Performance test
  it('11. should generate RGB values efficiently', () => {
    const startTime = performance.now();
    for (let i = 0; i < 10000; i++) {
      randomRGB();
    }
    const endTime = performance.now();

    expect(endTime - startTime).toBeLessThan(100);
  });
});
