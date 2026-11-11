import { parseHTTPHeaders } from '../src/parseHTTPHeaders';

it('preserves special HTTP header names as own data and keeps the last value', () => {
  const result = parseHTTPHeaders(
    '__proto__: first\r\nconstructor: value\r\n__proto__: last',
  );
  expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
  expect(Object.keys(result)).toEqual(['__proto__', 'constructor']);
  expect(result.__proto__).toBe('last');
  expect(result.constructor).toBe('value');
});
