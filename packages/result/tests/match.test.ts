import { err } from '../src/err';
import { match } from '../src/match';
import { ok } from '../src/ok';

describe('match', () => {
  it('1. should call the ok handler for Ok', () => {
    expect(
      match(ok(2), {
        ok: (v) => v * 2,
        err: () => 0,
      }),
    ).toBe(4);
  });

  it('2. should call the err handler for Err', () => {
    expect(
      match(err('x'), {
        ok: () => 'ok',
        err: (e) => e,
      }),
    ).toBe('x');
  });
});
