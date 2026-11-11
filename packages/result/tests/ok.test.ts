import { ok } from '../src/ok';

describe('ok', () => {
  it('1. should create an Ok result with a value', () => {
    expect(ok(42)).toEqual({ ok: true, value: 42 });
  });

  it('2. should accept null and undefined values', () => {
    expect(ok(null)).toEqual({ ok: true, value: null });
    expect(ok(undefined)).toEqual({ ok: true, value: undefined });
  });
});
