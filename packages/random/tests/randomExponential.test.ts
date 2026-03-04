import { randomExponential } from '../src/randomExponential';

/**
 * Unit tests for the randomExponential function.
 */
describe('randomExponential', () => {
  // ── Output shape and distribution ─────────────────────────────────────────

  it('1. should return a number', () => {
    expect(typeof randomExponential(1)).toBe('number');
  });

  it('2. should return a non-negative value', () => {
    for (let i = 0; i < 100; i++) {
      expect(randomExponential(1)).toBeGreaterThanOrEqual(0);
    }
  });

  it('3. should return a finite value', () => {
    expect(isFinite(randomExponential(1))).toBe(true);
  });

  it('4. should produce a sample mean close to 1/lambda', () => {
    // Exponential(λ=0.5) → mean = 1/0.5 = 2
    const lambda = 0.5;
    const samples = Array.from({ length: 5000 }, () =>
      randomExponential(lambda),
    );
    const mean = samples.reduce((s, v) => s + v, 0) / samples.length;
    const expectedMean = 1 / lambda; // 2
    expect(mean).toBeGreaterThan(expectedMean * 0.9);
    expect(mean).toBeLessThan(expectedMean * 1.1);
  });

  it('5. should produce a sample mean close to 1/lambda for lambda=2', () => {
    const lambda = 2;
    const samples = Array.from({ length: 5000 }, () =>
      randomExponential(lambda),
    );
    const mean = samples.reduce((s, v) => s + v, 0) / samples.length;
    const expectedMean = 1 / lambda; // 0.5
    expect(mean).toBeGreaterThan(expectedMean * 0.9);
    expect(mean).toBeLessThan(expectedMean * 1.1);
  });

  it('6. should produce all non-negative samples', () => {
    const samples = Array.from({ length: 1000 }, () => randomExponential(1));
    expect(samples.every((v) => v >= 0)).toBe(true);
  });

  it('7. should produce smaller values on average with a larger lambda', () => {
    // Higher λ → shorter mean wait time
    const highRate = Array.from({ length: 1000 }, () => randomExponential(10));
    const lowRate = Array.from({ length: 1000 }, () => randomExponential(0.1));
    const highMean = highRate.reduce((s, v) => s + v, 0) / 1000;
    const lowMean = lowRate.reduce((s, v) => s + v, 0) / 1000;
    expect(highMean).toBeLessThan(lowMean);
  });

  it('8. should work with a very large lambda', () => {
    const result = randomExponential(1e6);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(isFinite(result)).toBe(true);
  });

  it('9. should work with a very small lambda', () => {
    const result = randomExponential(0.0001);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(isFinite(result)).toBe(true);
  });

  it('10. should generate distinct values across calls', () => {
    const values = new Set(
      Array.from({ length: 100 }, () => randomExponential(1)),
    );
    expect(values.size).toBeGreaterThan(90);
  });

  // ── Error cases ───────────────────────────────────────────────────────────

  it('13. should throw Error when lambda is NaN', () => {
    expect(() => randomExponential(NaN)).toThrow(Error);
  });

  it('14. should throw Error when lambda is 0', () => {
    expect(() => randomExponential(0)).toThrow(Error);
  });

  it('15. should throw Error when lambda is negative', () => {
    expect(() => randomExponential(-1)).toThrow(Error);
  });
});
