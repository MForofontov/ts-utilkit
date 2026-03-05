import { pipe } from '../src/pipe';

/**
 * Unit tests for the pipe function.
 */
describe('pipe', () => {
  // ─── Normal usage ─────────────────────────────────────────────────────────

  it('1. should apply a single function', () => {
    const double = pipe((x: number) => x * 2);
    expect(double(5)).toBe(10);
  });

  it('2. should apply two functions left-to-right', () => {
    const fn = pipe(
      (x: number) => x * 2,
      (x: number) => x + 1,
    );
    expect(fn(5)).toBe(11); // (5*2)+1
  });

  it('3. should apply three functions left-to-right', () => {
    const fn = pipe(
      (x: number) => x + 1, // 5 → 6
      (x: number) => x * 3, // 6 → 18
      (x: number) => x - 2, // 18 → 16
    );
    expect(fn(5)).toBe(16);
  });

  it('4. should apply four functions left-to-right', () => {
    const fn = pipe(
      (x: number) => x * 2, // 1 → 2
      (x: number) => x + 10, // 2 → 12
      (x: number) => x / 2, // 12 → 6
      (x: number) => x - 1, // 6 → 5
    );
    expect(fn(1)).toBe(5);
  });

  it('5. should work with string transformations', () => {
    const transform = pipe(
      (s: string) => s.trim(),
      (s: string) => s.toLowerCase(),
      (s: string) => s.replace(/\s+/g, '-'),
    );
    expect(transform('  Hello World  ')).toBe('hello-world');
  });

  it('6. should pass the result of each function to the next', () => {
    const calls: string[] = [];
    const fn = pipe(
      (x: number) => {
        calls.push('f1');
        return x + 1;
      },
      (x: number) => {
        calls.push('f2');
        return x * 2;
      },
    );
    fn(3);
    expect(calls).toEqual(['f1', 'f2']);
  });

  it('7. should produce a different result from compose with the same functions', () => {
    // pipe(f, g)(x) = g(f(x))   vs   compose(f, g)(x) = f(g(x))
    const addThenDouble = pipe(
      (x: number) => x + 1, // applied first
      (x: number) => x * 2, // applied second
    );
    expect(addThenDouble(4)).toBe(10); // (4+1)*2
  });

  it('8. should work with identity function', () => {
    const identity = pipe((x: number) => x);
    expect(identity(42)).toBe(42);
  });

  it('9. should pass through different value types across functions', () => {
    const fn = pipe(
      (n: number) => n.toString(),
      (s: string) => s + '!',
    );
    expect(fn(7)).toBe('7!');
  });

  it('10. should handle five functions', () => {
    const fn = pipe(
      (x: number) => x + 1,
      (x: number) => x + 1,
      (x: number) => x + 1,
      (x: number) => x + 1,
      (x: number) => x + 1,
    );
    expect(fn(0)).toBe(5);
  });

  it('11. should handle six functions', () => {
    const fn = pipe(
      (x: number) => x + 1,
      (x: number) => x + 1,
      (x: number) => x + 1,
      (x: number) => x + 1,
      (x: number) => x + 1,
      (x: number) => x + 1,
    );
    expect(fn(0)).toBe(6);
  });

  // ─── Edge cases ────────────────────────────────────────────────────────────

  it('12. should handle a function returning null', () => {
    const fn = pipe((_: number) => null);
    expect(fn(1)).toBeNull();
  });

  it('13. should handle a function returning zero (falsy)', () => {
    const fn = pipe((x: number) => x - x);
    expect(fn(5)).toBe(0);
  });

  it('14. should handle empty string values', () => {
    const fn = pipe(
      (s: string) => s.trim(),
      (s: string) => s.toUpperCase(),
    );
    expect(fn('')).toBe('');
  });

  // ─── Error cases ───────────────────────────────────────────────────────────

  it('15. should throw Error when called with no arguments', () => {
    expect(() => (pipe as unknown as (...a: unknown[]) => unknown)()).toThrow(
      Error,
    );
    expect(() => (pipe as unknown as (...a: unknown[]) => unknown)()).toThrow(
      'pipe requires at least one function',
    );
  });
});
