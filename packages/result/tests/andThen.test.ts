import { andThen } from '../src/andThen';
import { err } from '../src/err';
import { ok } from '../src/ok';

describe('andThen', () => {
  it('1. should chain Ok results', () => {
    expect(andThen(ok(2), (n) => ok(n * 2))).toEqual(ok(4));
  });

  it('2. should propagate Err from the source', () => {
    expect(andThen(err('x'), (n: number) => ok(n * 2))).toEqual(err('x'));
  });

  it('3. should return Err from the chained function', () => {
    expect(andThen(ok(2), () => err('no'))).toEqual(err('no'));
  });
});
