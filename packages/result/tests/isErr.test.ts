import { err } from '../src/err';
import { isErr } from '../src/isErr';
import { ok } from '../src/ok';

describe('isErr', () => {
  it('1. should return true for Err results', () => {
    expect(isErr(err('x'))).toBe(true);
  });

  it('2. should return false for Ok results', () => {
    expect(isErr(ok(1))).toBe(false);
  });
});
