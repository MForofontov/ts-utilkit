import { parseQueryString } from '../src/parseQueryString';

describe('parseQueryString', () => {
  // Test case 1: Parse a basic query string
  it('1. should parse a basic query string', () => {
    const queryString = '?name=John&age=30';
    const result = parseQueryString(queryString);
    const expected = { name: 'John', age: '30' };
    expect(result).toEqual(expected);
  });

  // Test case 2: Handle empty query string
  it('2. should return an empty object for an empty query string', () => {
    const queryString = '';
    const result = parseQueryString(queryString);
    expect(result).toEqual({});
  });

  // Test case 3: Handle query string with only a question mark
  it('3. should return an empty object for a question mark only', () => {
    const queryString = '?';
    const result = parseQueryString(queryString);
    expect(result).toEqual({});
  });

  // Test case 4: Treat plus signs as spaces
  it('4. should treat plus signs as spaces when decoding', () => {
    const queryString = '?name=John+Doe&city=New+York';
    const result = parseQueryString(queryString);
    const expected = { name: 'John Doe', city: 'New York' };
    expect(result).toEqual(expected);
  });

  // Test case 5: Parse query string without a leading question mark
  it('5. should parse a query string without a leading question mark', () => {
    const queryString = 'foo=bar&baz=qux';
    const result = parseQueryString(queryString);
    const expected = { foo: 'bar', baz: 'qux' };
    expect(result).toEqual(expected);
  });

  // Test case 6: Decode percent-encoded characters
  it('6. should decode percent-encoded characters', () => {
    const queryString = '?title=Hello%20World&symbol=%26';
    const result = parseQueryString(queryString);
    const expected = { title: 'Hello World', symbol: '&' };
    expect(result).toEqual(expected);
  });

  // Test case 7: Handle repeated parameters by keeping the last value
  it('7. should keep the last value for repeated parameters', () => {
    const queryString = '?a=1&a=2';
    const result = parseQueryString(queryString);
    const expected = { a: '2' };
    expect(result).toEqual(expected);
  });

  // Test case 8: Handle keys with empty values
  it('8. should parse keys with empty values', () => {
    const queryString = '?flag=';
    const result = parseQueryString(queryString);
    const expected = { flag: '' };
    expect(result).toEqual(expected);
  });

  // Test case 9: Ignore empty segments
  it('9. should ignore empty segments', () => {
    const queryString = 'name=John&&age=30';
    const result = parseQueryString(queryString);
    const expected = { name: 'John', age: '30' };
    expect(result).toEqual(expected);
  });

  // Test case 10: Decode plus sign when percent-encoded
  it('10. should decode a percent-encoded plus sign', () => {
    const queryString = '?a=%2B';
    const result = parseQueryString(queryString);
    const expected = { a: '+' };
    expect(result).toEqual(expected);
  });

  // Test case 11: Ignore parameters without keys
  it('11. should ignore parameters without keys', () => {
    const queryString = '?=value&name=John';
    const result = parseQueryString(queryString);
    const expected = { name: 'John' };
    expect(result).toEqual(expected);
  });

  // Test case 12: Preserve equals signs within parameter values
  it('12. should preserve equals signs within parameter values', () => {
    const queryString = '?token=abc=def=ghi&signature=XYZ%3D%3D';
    const result = parseQueryString(queryString);
    const expected = { token: 'abc=def=ghi', signature: 'XYZ==' };
    expect(result).toEqual(expected);
  });
});
