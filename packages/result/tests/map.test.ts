import { err } from '../src/err';
import { map } from '../src/map';
import { ok } from '../src/ok';

describe('map', () => {
  it('1. should transform Ok values', () => {
    expect(map(ok(2), (n) => n * 2)).toEqual(ok(4));
  });

  it('2. should leave Err unchanged', () => {
    expect(map(err('x'), (n: number) => n * 2)).toEqual(err('x'));
  });
});
