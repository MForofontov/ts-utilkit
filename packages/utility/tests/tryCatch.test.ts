import { tryCatch } from '../src/tryCatch';

/**
 * Unit tests for the tryCatch function.
 */
describe('tryCatch', () => {
  // ─── Normal usage ─────────────────────────────────────────────────────────

  it('1. should return the value and undefined error on success', () => {
    const { value, error } = tryCatch(() => 42);
    expect(value).toBe(42);
    expect(error).toBeUndefined();
  });

  it('2. should return undefined value and an Error on failure', () => {
    const { value, error } = tryCatch(() => {
      throw new Error('boom');
    });
    expect(value).toBeUndefined();
    expect(error).toBeInstanceOf(Error);
    expect(error?.message).toBe('boom');
  });

  it('3. should parse valid JSON successfully', () => {
    const { value, error } = tryCatch(() => JSON.parse('{"ok":true}'));
    expect(value).toEqual({ ok: true });
    expect(error).toBeUndefined();
  });

  it('4. should catch a SyntaxError from JSON.parse', () => {
    const { value, error } = tryCatch(() => JSON.parse('not json'));
    expect(value).toBeUndefined();
    expect(error).toBeInstanceOf(SyntaxError);
  });

  it('5. should return fallback value from onError callback', () => {
    const { value } = tryCatch(
      () => { throw new Error('fail'); },
      () => 'fallback',
    );
    expect(value).toBe('fallback');
  });

  it('6. should still populate error when onError provides a fallback', () => {
    const { value, error } = tryCatch(
      () => { throw new Error('oops'); },
      () => 99,
    );
    expect(value).toBe(99);
    expect(error).toBeInstanceOf(Error);
    expect(error?.message).toBe('oops');
  });

  it('7. should pass the caught error to the onError callback', () => {
    let receivedError: Error | undefined;
    tryCatch(
      () => { throw new Error('original'); },
      (err) => { receivedError = err; return null; },
    );
    expect(receivedError?.message).toBe('original');
  });

  it('8. should handle string return value', () => {
    const { value, error } = tryCatch(() => 'hello');
    expect(value).toBe('hello');
    expect(error).toBeUndefined();
  });

  it('9. should handle boolean return value', () => {
    const { value } = tryCatch(() => false);
    expect(value).toBe(false);
  });

  it('10. should handle object return value', () => {
    const obj = { x: 1 };
    const { value } = tryCatch(() => obj);
    expect(value).toBe(obj);
  });

  it('11. should handle a function that returns undefined', () => {
    const { value, error } = tryCatch(() => undefined);
    expect(value).toBeUndefined();
    expect(error).toBeUndefined();
  });

  it('12. should wrap a non-Error throw in an Error', () => {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    const { error } = tryCatch(() => { throw 'string error'; });
    expect(error).toBeInstanceOf(Error);
    expect(error?.message).toBe('string error');
  });

  it('13. should wrap a thrown number in an Error', () => {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    const { error } = tryCatch(() => { throw 42; });
    expect(error).toBeInstanceOf(Error);
    expect(error?.message).toBe('42');
  });

  it('14. should handle nested tryCatch safely', () => {
    const outer = tryCatch(() =>
      tryCatch(() => { throw new Error('inner'); }),
    );
    // Outer succeeds (inner tryCatch never throws)
    expect(outer.error).toBeUndefined();
    expect(outer.value?.error?.message).toBe('inner');
  });

  // ─── Edge cases ────────────────────────────────────────────────────────────

  it('15. should work with a function returning null', () => {
    const { value, error } = tryCatch(() => null);
    expect(value).toBeNull();
    expect(error).toBeUndefined();
  });

  it('16. should work with a function returning zero', () => {
    const { value, error } = tryCatch(() => 0);
    expect(value).toBe(0);
    expect(error).toBeUndefined();
  });

  it('17. should work with a function returning an empty array', () => {
    const { value } = tryCatch(() => []);
    expect(value).toEqual([]);
  });

  // ─── Error cases ───────────────────────────────────────────────────────────

  it('18. should throw TypeError when fn is not a function', () => {
    expect(() => tryCatch(42 as unknown as () => number)).toThrow(TypeError);
    expect(() => tryCatch(42 as unknown as () => number)).toThrow(
      'fn must be a function, got number',
    );
  });

  it('19. should throw TypeError when fn is null', () => {
    expect(() => tryCatch(null as unknown as () => number)).toThrow(TypeError);
    expect(() => tryCatch(null as unknown as () => number)).toThrow(
      'fn must be a function, got object',
    );
  });

  it('20. should throw TypeError when onError is provided but not a function', () => {
    expect(() =>
      tryCatch(() => 1, 'not-a-fn' as unknown as (e: Error) => number),
    ).toThrow(TypeError);
    expect(() =>
      tryCatch(() => 1, 'not-a-fn' as unknown as (e: Error) => number),
    ).toThrow('onError must be a function, got string');
  });
});
