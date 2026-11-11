import { isLocalhost } from '../src/isLocalhost';

describe('localhost boundaries', () => {
  it('1. does not classify arbitrary IPv6 addresses as loopback', () => {
    expect(isLocalhost('[::2]')).toBe(false);
    expect(isLocalhost('http://[::ffff:192.0.2.1]/')).toBe(false);
    expect(isLocalhost('127.999.0.1')).toBe(false);
    expect(isLocalhost('[0:0:0:0:0:0:0:1]')).toBe(true);
  });
});
