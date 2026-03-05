import { compose } from '../src/compose';

/**
 * Unit tests for the compose function.
 */
describe('compose', () => {
  // ─── Normal usage ─────────────────────────────────────────────────────────

  it('1. should apply a single function', () => {
    const double = compose((x: number) => x * 2);
    expect(double(5)).toBe(10);
  });

  it('2. should apply two functions right-to-left', () => {
    const fn = compose(
      (x: number) => x * 2, // applied second
      (x: number) => x + 1, // applied first
    );
    expect(fn(5)).toBe(12); // (5+1)*2
  });

  it('3. should apply three functions right-to-left', () => {
    const fn = compose(
      (x: number) => x - 2, // applied third
      (x: number) => x * 3, // applied second
      (x: number) => x + 1, // applied first
    );
    expect(fn(5)).toBe(16); // ((5+1)*3)-2
  });

  it('4. should apply four functions right-to-left', () => {
    const fn = compose(
      (x: number) => x - 1, // applied fourth
      (x: number) => x / 2, // applied third
      (x: number) => x + 10, // applied second
      (x: number) => x * 2, // applied first
    );
    expect(fn(1)).toBe(5); // ((1*2)+10)/2-1
  });

  it('5. should work with string transformations', () => {
    const transform = compose(
      (s: string) => s.replace(/\s+/g, '-'), // applied third
      (s: string) => s.toLowerCase(), // applied second
      (s: string) => s.trim(), // applied first
    );
    expect(transform('  Hello World  ')).toBe('hello-world');
  });

  it('6. should call functions in reverse order', () => {
    const calls: string[] = [];
    const fn = compose(
      (x: number) => {
        calls.push('f1');
        return x * 2;
      },
      (x: number) => {
        calls.push('f2');
        return x + 1;
      },
    );
    fn(3);
    expect(calls).toEqual(['f2', 'f1']); // f2 (rightmost) first
  });

  it('7. should produce the opposite result from pipe with the same functions', () => {
    // compose(f, g)(x) = f(g(x)) — g applied first
    const doubleThenAdd = compose(
      (x: number) => x + 1, // applied second
      (x: number) => x * 2, // applied first
    );
    expect(doubleThenAdd(4)).toBe(9); // (4*2)+1
  });

  it('8. should work with identity function', () => {
    const identity = compose((x: number) => x);
    expect(identity(42)).toBe(42);
  });

  it('9. should handle type transformation across functions', () => {
    const fn = compose(
      (s: string) => s + '!',
      (n: number) => n.toString(),
    );
    expect(fn(7)).toBe('7!');
  });

  it('10. should handle five functions', () => {
    const fn = compose(
      (x: number) => x + 1,
      (x: number) => x + 1,
      (x: number) => x + 1,
      (x: number) => x + 1,
      (x: number) => x + 1,
    );
    expect(fn(0)).toBe(5);
  });

  it('11. should handle six functions', () => {
    const fn = compose(
      (x: number) => x + 1,
      (x: number) => x + 1,
      (x: number) => x + 1,
      (x: number) => x + 1,
      (x: number) => x + 1,
      (x: number) => x + 1,
    );
    expect(fn(0)).toBe(6);
  });

  it('12. should be equivalent to pipe with reversed arguments', () => {
    const f = (x: number) => x + 1;
    const g = (x: number) => x * 3;
    const composed = compose(g, f); // f first, then g
    expect(composed(4)).toBe(15); // (4+1)*3
  });

  // ─── Edge cases ────────────────────────────────────────────────────────────

  it('13. should handle a function returning null', () => {
    const fn = compose((_: number) => null);
    expect(fn(1)).toBeNull();
  });

  it('14. should handle a function returning zero (falsy)', () => {
    const fn = compose((x: number) => x - x);
    expect(fn(5)).toBe(0);
  });

  it('15. should handle empty string values', () => {
    const fn = compose(
      (s: string) => s.toUpperCase(),
      (s: string) => s.trim(),
    );
    expect(fn('')).toBe('');
  });

  // ─── Error cases ───────────────────────────────────────────────────────────

  it('16. should throw Error when called with no arguments', () => {
    expect(() =>
      (compose as unknown as (...a: unknown[]) => unknown)(),
    ).toThrow(Error);
    expect(() =>
      (compose as unknown as (...a: unknown[]) => unknown)(),
    ).toThrow('compose requires at least one function');
  });
});
