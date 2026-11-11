import { err } from '../src/err';
import { isOk } from '../src/isOk';
import { ok } from '../src/ok';

describe('isOk', () => {
  it('1. should return true for Ok results', () => {
    expect(isOk(ok(1))).toBe(true);
  });

  it('2. should return false for Err results', () => {
    expect(isOk(err('x'))).toBe(false);
  });
});
