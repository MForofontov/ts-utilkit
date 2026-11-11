import { err } from '../src/err';
import { ok } from '../src/ok';
import { unwrapOr } from '../src/unwrapOr';

describe('unwrapOr', () => {
  it('1. should return the Ok value', () => {
    expect(unwrapOr(ok(1), 0)).toBe(1);
  });

  it('2. should return the default for Err', () => {
    expect(unwrapOr(err('x'), 0)).toBe(0);
  });
});
