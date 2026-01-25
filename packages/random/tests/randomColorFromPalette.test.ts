import { randomColorFromPalette } from '../src/randomColorFromPalette';

/**
 * Unit tests for the randomColorFromPalette function.
 */
describe('randomColorFromPalette', () => {
  // Test case 1: Normal usage with hex colors
  it('1. should return a color from the palette', () => {
    const palette = ['#FF0000', '#00FF00', '#0000FF'];
    const result = randomColorFromPalette(palette);
    expect(palette).toContain(result);
  });

  // Test case 2: Named colors
  it('2. should work with named colors', () => {
    const palette = ['red', 'green', 'blue', 'yellow'];
    const result = randomColorFromPalette(palette);
    expect(palette).toContain(result);
  });

  // Test case 3: RGB colors
  it('3. should work with rgb() format colors', () => {
    const palette = ['rgb(255,0,0)', 'rgb(0,255,0)', 'rgb(0,0,255)'];
    const result = randomColorFromPalette(palette);
    expect(palette).toContain(result);
  });

  // Test case 4: Single color palette
  it('4. should return the only color from single-color palette', () => {
    const palette = ['#FF5733'];
    const result = randomColorFromPalette(palette);
    expect(result).toBe('#FF5733');
  });

  // Test case 5: Mixed format colors
  it('5. should work with mixed format colors', () => {
    const palette = ['#FF0000', 'green', 'rgb(0,0,255)'];
    const result = randomColorFromPalette(palette);
    expect(palette).toContain(result);
  });

  // Test case 6: Randomness verification
  it('6. should produce different colors over multiple calls', () => {
    const palette = [
      '#FF0000',
      '#00FF00',
      '#0000FF',
      '#FFFF00',
      '#FF00FF',
      '#00FFFF',
    ];
    const results = new Set<string>();

    for (let i = 0; i < 100; i++) {
      results.add(randomColorFromPalette(palette));
    }

    // Should see at least 4 different colors
    expect(results.size).toBeGreaterThan(4);
  });

  // Test case 7: Material design palette
  it('7. should work with material design palette', () => {
    const palette = [
      '#F44336',
      '#E91E63',
      '#9C27B0',
      '#673AB7',
      '#3F51B5',
      '#2196F3',
      '#03A9F4',
      '#00BCD4',
    ];
    const result = randomColorFromPalette(palette);
    expect(palette).toContain(result);
  });

  // Test case 8: Distribution check
  it('8. should have relatively even distribution', () => {
    const palette = ['red', 'green', 'blue'];
    const counts = new Map<string, number>();
    const iterations = 3000;

    for (let i = 0; i < iterations; i++) {
      const color = randomColorFromPalette(palette);
      counts.set(color, (counts.get(color) || 0) + 1);
    }

    // Each color should appear roughly 33% of the time (±10%)
    for (const count of counts.values()) {
      const percentage = count / iterations;
      expect(percentage).toBeGreaterThan(0.23);
      expect(percentage).toBeLessThan(0.43);
    }
  });

  // Test case 9: Large palette
  it('9. should handle large palettes efficiently', () => {
    const palette = Array.from(
      { length: 100 },
      (_, i) => `#${i.toString(16).padStart(6, '0')}`,
    );

    const startTime = performance.now();
    for (let i = 0; i < 1000; i++) {
      randomColorFromPalette(palette);
    }
    const endTime = performance.now();

    expect(endTime - startTime).toBeLessThan(100);
  });

  // Test case 10: Palette with duplicates
  it('10. should work with palettes containing duplicates', () => {
    const palette = ['red', 'red', 'blue'];
    const result = randomColorFromPalette(palette);
    expect(['red', 'blue']).toContain(result);
  });

  // Error Test case 11: TypeError for non-array palette
  it('11. should throw TypeError when palette is not an array', () => {
    expect(() => randomColorFromPalette('red' as any)).toThrow(TypeError);
    expect(() => randomColorFromPalette('red' as any)).toThrow(
      'palette must be an array, got string',
    );
  });

  // Error Test case 12: TypeError for null palette
  it('12. should throw TypeError when palette is null', () => {
    expect(() => randomColorFromPalette(null as any)).toThrow(TypeError);
    expect(() => randomColorFromPalette(null as any)).toThrow(
      'palette must be an array, got object',
    );
  });

  // Error Test case 13: Error for empty palette
  it('13. should throw Error when palette is empty', () => {
    expect(() => randomColorFromPalette([])).toThrow(Error);
    expect(() => randomColorFromPalette([])).toThrow('palette cannot be empty');
  });

  // Error Test case 14: Error for non-string palette items
  it('14. should throw Error when palette contains non-string items', () => {
    expect(() => randomColorFromPalette(['red', 123 as any, 'blue'])).toThrow(
      Error,
    );
    expect(() => randomColorFromPalette(['red', 123 as any, 'blue'])).toThrow(
      'All palette items must be strings, got number at index 1',
    );
  });

  // Error Test case 15: Error for object in palette
  it('15. should throw Error when palette contains object', () => {
    expect(() =>
      randomColorFromPalette(['red', { color: 'blue' } as any]),
    ).toThrow(Error);
    expect(() =>
      randomColorFromPalette(['red', { color: 'blue' } as any]),
    ).toThrow('All palette items must be strings, got object at index 1');
  });
});
