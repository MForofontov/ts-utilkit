import { randomGaussian } from '../src/randomGaussian';

/**
 * Unit tests for the randomGaussian function.
 */
describe('randomGaussian', () => {
  // ── Output shape and distribution ─────────────────────────────────────────

  it('1. should return a number', () => {
    expect(typeof randomGaussian()).toBe('number');
  });

  it('2. should return a finite number', () => {
    expect(isFinite(randomGaussian())).toBe(true);
  });

  it('3. should use mean=0 and stdDev=1 as defaults', () => {
    // With 1000 samples the sample mean should be within ±0.3 of 0
    const samples = Array.from({ length: 1000 }, () => randomGaussian());
    const mean = samples.reduce((s, v) => s + v, 0) / samples.length;
    expect(mean).toBeGreaterThan(-0.3);
    expect(mean).toBeLessThan(0.3);
  });

  it('4. should produce a sample mean close to the specified mean', () => {
    const samples = Array.from({ length: 2000 }, () => randomGaussian(100, 15));
    const mean = samples.reduce((s, v) => s + v, 0) / samples.length;
    expect(mean).toBeGreaterThan(95);
    expect(mean).toBeLessThan(105);
  });

  it('5. should produce a sample standard deviation close to stdDev', () => {
    const n = 2000;
    const mu = 0;
    const sigma = 5;
    const samples = Array.from({ length: n }, () => randomGaussian(mu, sigma));
    const mean = samples.reduce((s, v) => s + v, 0) / n;
    const variance = samples.reduce((s, v) => s + (v - mean) ** 2, 0) / n;
    const sampleStdDev = Math.sqrt(variance);
    expect(sampleStdDev).toBeGreaterThan(4);
    expect(sampleStdDev).toBeLessThan(6);
  });

  it('6. should place ~68% of samples within ±1 stdDev of the mean', () => {
    const mean = 50;
    const stdDev = 10;
    const samples = Array.from({ length: 5000 }, () => randomGaussian(mean, stdDev));
    const within1Sigma = samples.filter(
      (v) => v >= mean - stdDev && v <= mean + stdDev,
    ).length;
    const ratio = within1Sigma / samples.length;
    // ~68.3% expected; allow ±5% margin
    expect(ratio).toBeGreaterThan(0.63);
    expect(ratio).toBeLessThan(0.73);
  });

  it('7. should work with a very small stdDev', () => {
    const result = randomGaussian(0, 0.0001);
    expect(isFinite(result)).toBe(true);
  });

  it('8. should work with a large stdDev', () => {
    const result = randomGaussian(0, 1e6);
    expect(isFinite(result)).toBe(true);
  });

  it('9. should work with a negative mean', () => {
    const samples = Array.from({ length: 1000 }, () => randomGaussian(-100, 1));
    const mean = samples.reduce((s, v) => s + v, 0) / samples.length;
    expect(mean).toBeGreaterThan(-101);
    expect(mean).toBeLessThan(-99);
  });

  it('10. should generate distinct values across calls', () => {
    const values = new Set(Array.from({ length: 100 }, () => randomGaussian()));
    expect(values.size).toBeGreaterThan(90);
  });

  // ── Error cases ───────────────────────────────────────────────────────────

  it('13. should throw Error when mean is NaN', () => {
    expect(() => randomGaussian(NaN)).toThrow(Error);
  });

  it('14. should throw Error when stdDev is NaN', () => {
    expect(() => randomGaussian(0, NaN)).toThrow(Error);
  });

  it('15. should throw Error when stdDev is 0', () => {
    expect(() => randomGaussian(0, 0)).toThrow(Error);
  });

  it('16. should throw Error when stdDev is negative', () => {
    expect(() => randomGaussian(0, -1)).toThrow(Error);
  });
});
