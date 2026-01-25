import { keysToSnakeCase } from '../src/keysToSnakeCase';

describe('keysToSnakeCase', () => {
  // Test case 1: Convert keys of a simple object to snake_case
  it('1. should convert keys of a simple object to snake_case', () => {
    const obj = { firstName: 'John', lastName: 'Doe' };
    const result = keysToSnakeCase(obj);
    const expected = { first_name: 'John', last_name: 'Doe' };
    expect(result).toEqual(expected);
  });

  // Test case 2: Convert keys of a nested object to snake_case
  it('2. should convert keys of a nested object to snake_case', () => {
    const obj = { userInfo: { firstName: 'John', lastName: 'Doe' } };
    const result = keysToSnakeCase(obj);
    const expected = { user_info: { first_name: 'John', last_name: 'Doe' } };
    expect(result).toEqual(expected);
  });

  // Test case 3: Convert keys of an array of objects to snake_case
  it('3. should convert keys of an array of objects to snake_case', () => {
    const arr = [{ firstName: 'John' }, { lastName: 'Doe' }];
    const result = keysToSnakeCase(arr);
    const expected = [{ first_name: 'John' }, { last_name: 'Doe' }];
    expect(result).toEqual(expected);
  });

  // Test case 4: Convert keys of an object with various data types to snake_case
  it('4. should convert keys of an object with various data types to snake_case', () => {
    const obj = {
      firstName: 'John',
      ageYears: 30,
      isActive: true,
      addressInfo: { streetName: 'Main St' },
    };
    const result = keysToSnakeCase(obj);
    const expected = {
      first_name: 'John',
      age_years: 30,
      is_active: true,
      address_info: { street_name: 'Main St' },
    };
    expect(result).toEqual(expected);
  });

  // Test case 5: Convert keys of an object with nested arrays to snake_case
  it('5. should convert keys of an object with nested arrays to snake_case', () => {
    const obj = { userList: [{ firstName: 'John' }, { lastName: 'Doe' }] };
    const result = keysToSnakeCase(obj);
    const expected = {
      user_list: [{ first_name: 'John' }, { last_name: 'Doe' }],
    };
    expect(result).toEqual(expected);
  });

  // Test case 6: Handle keys that are numbers
  it('6. should handle keys that are numbers', () => {
    const obj = { 1: 'one', 2: 'two' };
    const result = keysToSnakeCase(obj);
    const expected = { 1: 'one', 2: 'two' };
    expect(result).toEqual(expected);
  });

  // Test case 7: Handle consecutive capital letters as one word
  it('7. should handle keys with consecutive capital letters as a single word', () => {
    const obj = { parseHTTPResponse: true, simpleXML: false };
    const result = keysToSnakeCase(obj);
    const expected = { parse_http_response: true, simple_xml: false };
    expect(result).toEqual(expected);
  });

  // Test case 8: Handle non-object input (number)
  it('8. should throw a TypeError if input is a number', () => {
    expect(() =>
      keysToSnakeCase(42 as unknown as Record<string, unknown> | unknown[]),
    ).toThrow(TypeError);
  });

  // Test case 9: Handle non-object input (string)
  it('9. should throw a TypeError if input is a string', () => {
    expect(() =>
      keysToSnakeCase(
        'string' as unknown as Record<string, unknown> | unknown[],
      ),
    ).toThrow(TypeError);
  });

  // Test case 10: Handle non-object input (boolean)
  it('10. should throw a TypeError if input is a boolean', () => {
    expect(() =>
      keysToSnakeCase(true as unknown as Record<string, unknown> | unknown[]),
    ).toThrow(TypeError);
  });

  // Test case 11: Handle non-object input (null)
  it('11. should throw a TypeError if input is null', () => {
    expect(() =>
      keysToSnakeCase(null as unknown as Record<string, unknown> | unknown[]),
    ).toThrow(TypeError);
  });

  // Test case 12: Handle non-object input (undefined)
  it('12. should throw a TypeError if input is undefined', () => {
    expect(() =>
      keysToSnakeCase(
        undefined as unknown as Record<string, unknown> | unknown[],
      ),
    ).toThrow(TypeError);
  });
});
