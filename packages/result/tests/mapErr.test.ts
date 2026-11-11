import { err } from '../src/err';
import { mapErr } from '../src/mapErr';
import { ok } from '../src/ok';

describe('mapErr', () => {
  it('1. should transform Err values', () => {
    expect(mapErr(err('fail'), (e) => e.toUpperCase())).toEqual(err('FAIL'));
  });

  it('2. should leave Ok unchanged', () => {
    expect(mapErr(ok(1), (e: string) => e.toUpperCase())).toEqual(ok(1));
  });
});
