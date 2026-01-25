import { queryStringToObject } from '../src/queryStringToObject';

describe('queryStringToObject', () => {
  // Test case 1: Convert a simple query string to an object
  it('1. should convert a simple query string to an object', () => {
    const queryString = 'name=John%20Doe&age=30';
    const result = queryStringToObject(queryString);
    const expected = { name: 'John Doe', age: '30' };
    expect(result).toEqual(expected);
  });

  // Test case 2: Convert a query string with special characters to an object
  it('2. should convert a query string with special characters to an object', () => {
    const queryString = 'name=John%20Doe&city=New%20York&special%26char=value';
    const result = queryStringToObject(queryString);
    const expected = {
      name: 'John Doe',
      city: 'New York',
      'special&char': 'value',
    };
    expect(result).toEqual(expected);
  });

  // Test case 3: Convert a query string with various data types to an object
  it('3. should convert a query string with various data types to an object', () => {
    const queryString =
      'name=John%20Doe&age=30&active=true&nullValue=null&undefinedValue=undefined';
    const result = queryStringToObject(queryString);
    const expected = {
      name: 'John Doe',
      age: '30',
      active: 'true',
      nullValue: 'null',
      undefinedValue: 'undefined',
    };
    expect(result).toEqual(expected);
  });

  // Test case 4: Convert an empty query string to an object
  it('4. should return an empty object for an empty query string', () => {
    const queryString = '';
    const result = queryStringToObject(queryString);
    const expected = {};
    expect(result).toEqual(expected);
  });

  it('4. should preserve additional equals signs in parameter values', () => {
    const queryString = 'token=a=b=c&empty=&flag';
    const result = queryStringToObject(queryString);
    expect(result).toEqual({ token: 'a=b=c', empty: '', flag: '' });
  });

  it('4. should decode encoded equals signs inside parameter values', () => {
    const queryString = 'note=foo%3Dbar%3Dbaz&data=hello%3Dworld';
    const result = queryStringToObject(queryString);
    expect(result).toEqual({ note: 'foo=bar=baz', data: 'hello=world' });
  });

  // Test case 5: Handle non-string input (number)
  it('5. should throw a TypeError if input is a number', () => {
    expect(() => queryStringToObject(42 as unknown as string)).toThrow(
      TypeError,
    );
  });

  // Test case 6: Handle non-string input (object)
  it('6. should throw a TypeError if input is an object', () => {
    expect(() => queryStringToObject({} as unknown as string)).toThrow(
      TypeError,
    );
  });

  // Test case 7: Handle non-string input (boolean)
  it('7. should throw a TypeError if input is a boolean', () => {
    expect(() => queryStringToObject(true as unknown as string)).toThrow(
      TypeError,
    );
  });

  // Test case 8: Handle non-string input (null)
  it('8. should throw a TypeError if input is null', () => {
    expect(() => queryStringToObject(null as unknown as string)).toThrow(
      TypeError,
    );
  });

  // Test case 9: Handle non-string input (undefined)
  it('9. should throw a TypeError if input is undefined', () => {
    expect(() => queryStringToObject(undefined as unknown as string)).toThrow(
      TypeError,
    );
  });
});
