import { err } from '../src/err';
import { ok } from '../src/ok';
import { unwrap } from '../src/unwrap';

describe('unwrap', () => {
  it('1. should return the Ok value', () => {
    expect(unwrap(ok(7))).toBe(7);
  });

  it('2. should throw Error instances from Err', () => {
    expect(() => unwrap(err(new Error('boom')))).toThrow('boom');
  });

  it('3. should wrap non-Error Err values', () => {
    expect(() => unwrap(err('fail'))).toThrow('fail');
  });
});
