import { normalizeURL } from '../src/normalizeURL';
import { getQueryParams } from '../src/getQueryParams';

describe('normalizeURL repeated parameters', () => {
  it('2. retains empty repeated values and prototype-like query keys', () => {
    const result = getQueryParams(
      'https://example.com/?a=&a=2&__proto__=one&__proto__=two&constructor=ok',
    );
    expect(result.a).toEqual(['', '2']);
    expect(Object.hasOwn(result, '__proto__')).toBe(true);
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
    expect(result.__proto__).toEqual(['one', 'two']);
    expect(result.constructor).toBe('ok');
  });
  it('1. sorts names without multiplying repeated values', () => {
    const result = normalizeURL('https://example.com/?b=3&a=1&a=2');
    expect(result).toBe('https://example.com/?a=1&a=2&b=3');
    expect(normalizeURL(result)).toBe(result);
  });
});
