import { memoize } from '../src/memoize';

/**
 * Unit tests for the memoize function.
 */
describe('memoize', () => {
  // ─── Normal usage ─────────────────────────────────────────────────────────

  it('1. should return the correct result on first call', () => {
    const square = memoize((n: number) => n * n);
    expect(square(4)).toBe(16);
  });

  it('2. should return cached result on subsequent calls with same arguments', () => {
    let callCount = 0;
    const fn = memoize((n: number) => {
      callCount++;
      return n * 2;
    });
    fn(5);
    fn(5);
    fn(5);
    expect(callCount).toBe(1);
  });

  it('3. should call the underlying function again for different arguments', () => {
    let callCount = 0;
    const fn = memoize((n: number) => {
      callCount++;
      return n * 2;
    });
    fn(1);
    fn(2);
    fn(3);
    expect(callCount).toBe(3);
  });

  it('4. should cache results per unique argument combination', () => {
    const add = memoize((a: number, b: number) => a + b);
    expect(add(1, 2)).toBe(3);
    expect(add(3, 4)).toBe(7);
    expect(add(1, 2)).toBe(3); // cached
    expect(add(3, 4)).toBe(7); // cached
  });

  it('5. should use a custom keyFn when provided', () => {
    let callCount = 0;
    const fn = memoize(
      (id: number, role: string) => {
        callCount++;
        return `${id}:${role}`;
      },
      (id, role) => `${id}-${role}`,
    );
    fn(1, 'admin');
    fn(1, 'admin');
    expect(callCount).toBe(1);
    fn(1, 'user');
    expect(callCount).toBe(2);
  });

  it('6. should cache distinct results when keyFn produces different keys', () => {
    const fn = memoize(
      (a: number, b: number) => a + b,
      (a, b) => `${a},${b}`,
    );
    expect(fn(2, 3)).toBe(5);
    expect(fn(3, 2)).toBe(5); // same result but different cache entry
  });

  it('7. should work with string arguments', () => {
    const greet = memoize((name: string) => `Hello, ${name}!`);
    expect(greet('Alice')).toBe('Hello, Alice!');
    expect(greet('Bob')).toBe('Hello, Bob!');
    expect(greet('Alice')).toBe('Hello, Alice!');
  });

  it('8. should work with object return values', () => {
    const factory = memoize((id: number) => ({ id, name: 'item' }));
    const a = factory(1);
    const b = factory(1);
    expect(a).toEqual({ id: 1, name: 'item' });
    // Same cached reference
    expect(a).toBe(b);
  });

  it('9. should isolate caches between separate memoized instances', () => {
    let calls1 = 0;
    let calls2 = 0;
    const fn1 = memoize(() => { calls1++; return 'a'; });
    const fn2 = memoize(() => { calls2++; return 'b'; });
    fn1();
    fn1();
    fn2();
    expect(calls1).toBe(1);
    expect(calls2).toBe(1);
  });

  it('10. should cache a function returning undefined', () => {
    let callCount = 0;
    const fn = memoize(() => { callCount++; return undefined; });
    fn();
    fn();
    expect(callCount).toBe(1);
  });

  it('11. should cache a function returning false', () => {
    let callCount = 0;
    const fn = memoize((n: number) => { callCount++; return n > 0; });
    fn(-1);
    fn(-1);
    expect(callCount).toBe(1);
    expect(fn(-1)).toBe(false);
  });

  it('12. should work with no arguments', () => {
    let callCount = 0;
    const fn = memoize(() => { callCount++; return 42; });
    expect(fn()).toBe(42);
    expect(fn()).toBe(42);
    expect(callCount).toBe(1);
  });

  // ─── Edge cases ────────────────────────────────────────────────────────────

  it('13. should handle null as an argument', () => {
    const fn = memoize((v: null | number) => v === null ? 0 : v);
    expect(fn(null)).toBe(0);
    expect(fn(null)).toBe(0);
  });

  it('14. should handle NaN as an argument (JSON.stringify maps it to null)', () => {
    const fn = memoize((v: number) => v);
    fn(NaN);
    fn(NaN); // second call — JSON.stringify(NaN) = 'null', cache hit
  });

  it('15. should not share cache when wrapping the same function twice', () => {
    let callCount = 0;
    const raw = (n: number) => { callCount++; return n; };
    const m1 = memoize(raw);
    const m2 = memoize(raw);
    m1(1);
    m2(1);
    expect(callCount).toBe(2);
  });

  // ─── Error cases ───────────────────────────────────────────────────────────

});
