import { lerp, mapRange, normalizeValue } from '../src';

const largest = Number.MAX_VALUE;

describe('finite interpolation boundaries', () => {
  it.each([0, 0.25, 0.5, 0.75, 1])(
    '1. interpolates overflowing finite spans at %s',
    (position) => {
      const expected = (1 - position) * -largest + position * largest;
      expect(lerp(-largest, largest, position)).toBe(expected);
      expect(lerp(largest, -largest, position)).toBe(
        (1 - position) * largest + position * -largest,
      );
    },
  );

  it.each([-largest, -largest / 2, 0, largest / 2, largest])(
    '2. normalizes finite values in overflowing spans (%s)',
    (value) => {
      const expected = (value / 2 + largest / 2) / largest;
      expect(normalizeValue(value, -largest, largest)).toBe(expected);
      expect(normalizeValue(value, largest, -largest)).toBeCloseTo(
        1 - expected,
      );
    },
  );

  it('3. maps overflowing input and output spans, including endpoints', () => {
    expect(mapRange(0, -largest, largest, 0, 10)).toBe(5);
    expect(mapRange(-largest, -largest, largest, 0, 10)).toBe(0);
    expect(mapRange(largest, -largest, largest, 0, 10)).toBe(10);
    expect(mapRange(0.5, 0, 1, -largest, largest)).toBe(0);
    expect(mapRange(0, 0, 1, -largest, largest)).toBe(-largest);
    expect(mapRange(1, 0, 1, -largest, largest)).toBe(largest);
    expect(mapRange(0, -largest, largest, largest, -largest)).toBe(0);
  });

  it('4. retains ordinary arithmetic and extrapolation', () => {
    for (const position of [-1, 0, 0.1, 0.5, 1, 2]) {
      expect(lerp(0.1, 0.3, position)).toBe(0.1 + (0.3 - 0.1) * position);
      expect(normalizeValue(position, 0.1, 0.3)).toBe(
        (position - 0.1) / (0.3 - 0.1),
      );
      expect(mapRange(position, 0.1, 0.3, 4, 9)).toBe(
        4 + ((position - 0.1) / (0.3 - 0.1)) * (9 - 4),
      );
    }
    expect(lerp(-largest, largest, 2)).toBe(Infinity);
    expect(normalizeValue(Infinity, -largest, largest)).toBeNaN();
    expect(mapRange(Infinity, -Infinity, Infinity, 0, 1)).toBeNaN();
    expect(mapRange(5, 3, 3, 0, 10)).toBeNaN();
  });

  it('5. extrapolates finite results when an intermediate difference overflows', () => {
    expect(normalizeValue(largest, -largest, -largest / 2)).toBeCloseTo(4);
    expect(mapRange(largest, -largest, -largest / 2, 0, 1)).toBeCloseTo(4);
    const expected = (1 - 1.1) * -largest + 1.1 * (largest / 2);
    expect(lerp(-largest, largest / 2, 1.1)).toBe(expected);
    expect(Number.isFinite(expected)).toBe(true);
  });
});
