import { err } from '../src/err';

describe('err', () => {
  it('1. should create an Err result with an error', () => {
    expect(err('fail')).toEqual({ ok: false, error: 'fail' });
  });

  it('2. should accept Error instances', () => {
    const error = new Error('boom');
    expect(err(error)).toEqual({ ok: false, error });
  });
});
