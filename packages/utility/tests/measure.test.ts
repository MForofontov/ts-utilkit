import { measure } from '../src/measure';

/**
 * Unit tests for the measure function.
 */
describe('measure', () => {
  // ─── Normal usage ─────────────────────────────────────────────────────────

  it('1. should return the correct result from the measured function', () => {
    const { result } = measure(() => 42);
    expect(result).toBe(42);
  });

  it('2. should return a non-negative durationMs', () => {
    const { durationMs } = measure(() => 1 + 1);
    expect(durationMs).toBeGreaterThanOrEqual(0);
  });

  it('3. should return a numeric durationMs', () => {
    const { durationMs } = measure(() => 'hello');
    expect(typeof durationMs).toBe('number');
    expect(Number.isNaN(durationMs)).toBe(false);
  });

  it('4. should include the label in the result when provided', () => {
    const { label } = measure(() => 1, 'my-label');
    expect(label).toBe('my-label');
  });

  it('5. should set label to undefined when not provided', () => {
    const { label } = measure(() => 1);
    expect(label).toBeUndefined();
  });

  it('6. should return a string result', () => {
    const { result } = measure(() => 'hello world');
    expect(result).toBe('hello world');
  });

  it('7. should return an object result', () => {
    const obj = { x: 1, y: 2 };
    const { result } = measure(() => obj);
    expect(result).toBe(obj);
  });

  it('8. should return an array result', () => {
    const { result } = measure(() => [1, 2, 3]);
    expect(result).toEqual([1, 2, 3]);
  });

  it('9. should measure a function that takes some time', () => {
    const { durationMs } = measure(() => {
      // Busy-wait for a tiny but measurable amount
      const end = Date.now() + 10;
      while (Date.now() < end) { /* spin */ }
    });
    expect(durationMs).toBeGreaterThan(0);
  });

  it('10. should return durationMs less than 100ms for a trivial function', () => {
    const { durationMs } = measure(() => 1 + 1);
    expect(durationMs).toBeLessThan(100);
  });

  it('11. should return all three fields in the result object', () => {
    const res = measure(() => 'ok', 'test-label');
    expect(res).toHaveProperty('result');
    expect(res).toHaveProperty('durationMs');
    expect(res).toHaveProperty('label');
  });

  it('12. should handle a function returning null', () => {
    const { result, error } = measure(() => null) as ReturnType<typeof measure> & { error?: unknown };
    expect(result).toBeNull();
    expect(error).toBeUndefined();
  });

  it('13. should handle a function returning false', () => {
    const { result } = measure(() => false);
    expect(result).toBe(false);
  });

  it('14. should handle a function returning zero', () => {
    const { result } = measure(() => 0);
    expect(result).toBe(0);
  });

  it('15. should measure an array sort in a reasonable time', () => {
    const arr = Array.from({ length: 10000 }, (_, i) => 10000 - i);
    const { result, durationMs } = measure(() => [...arr].sort((a, b) => a - b));
    expect(result[0]).toBe(1);
    expect(durationMs).toBeLessThan(100);
  });

  // ─── Edge cases ────────────────────────────────────────────────────────────

  it('16. should propagate errors thrown by fn', () => {
    expect(() =>
      measure(() => { throw new Error('fn error'); }),
    ).toThrow('fn error');
  });

  it('17. should handle an empty string label', () => {
    const { label } = measure(() => 1, '');
    expect(label).toBe('');
  });

  // ─── Error cases ───────────────────────────────────────────────────────────

});
