import { keysToCamelCase } from '../src/keysToCamelCase';

describe('keysToCamelCase', () => {
  // Test case 1: Convert keys of a simple object to camelCase
  it('1. should convert keys of a simple object to camelCase', () => {
    const obj = { first_name: 'John', last_name: 'Doe' };
    const result = keysToCamelCase(obj);
    const expected = { firstName: 'John', lastName: 'Doe' };
    expect(result).toEqual(expected);
  });

  // Test case 2: Convert keys of a nested object to camelCase
  it('2. should convert keys of a nested object to camelCase', () => {
    const obj = { user_info: { first_name: 'John', last_name: 'Doe' } };
    const result = keysToCamelCase(obj);
    const expected = { userInfo: { firstName: 'John', lastName: 'Doe' } };
    expect(result).toEqual(expected);
  });

  // Test case 3: Convert keys of an array of objects to camelCase
  it('3. should convert keys of an array of objects to camelCase', () => {
    const arr = [{ first_name: 'John' }, { last_name: 'Doe' }];
    const result = keysToCamelCase(arr);
    const expected = [{ firstName: 'John' }, { lastName: 'Doe' }];
    expect(result).toEqual(expected);
  });

  // Test case 4: Convert keys of an object with various data types to camelCase
  it('4. should convert keys of an object with various data types to camelCase', () => {
    const obj = {
      first_name: 'John',
      age_years: 30,
      is_active: true,
      address_info: { street_name: 'Main St' },
    };
    const result = keysToCamelCase(obj);
    const expected = {
      firstName: 'John',
      ageYears: 30,
      isActive: true,
      addressInfo: { streetName: 'Main St' },
    };
    expect(result).toEqual(expected);
  });

  // Test case 5: Convert keys of an object with nested arrays to camelCase
  it('5. should convert keys of an object with nested arrays to camelCase', () => {
    const obj = { user_list: [{ first_name: 'John' }, { last_name: 'Doe' }] };
    const result = keysToCamelCase(obj);
    const expected = { userList: [{ firstName: 'John' }, { lastName: 'Doe' }] };
    expect(result).toEqual(expected);
  });

  // Test case 6: Handle keys that are numbers
  it('6. should handle keys that are numbers', () => {
    const obj = { 1: 'one', 2: 'two' };
    const result = keysToCamelCase(obj);
    const expected = { 1: 'one', 2: 'two' };
    expect(result).toEqual(expected);
  });

  // Test case 7: Handle uppercase snake_case keys
  it('7. should convert uppercase snake_case keys to camelCase', () => {
    const obj = { USER_ID: 42, API_TOKEN: 'abc' };
    const result = keysToCamelCase(obj);
    const expected = { userId: 42, apiToken: 'abc' };
    expect(result).toEqual(expected);
  });

  // Test case 8: Handle non-object input (number)
  it('8. should throw a TypeError if input is a number', () => {
    expect(() =>
      keysToCamelCase(42 as unknown as Record<string, unknown> | unknown[]),
    ).toThrow(TypeError);
  });

  // Test case 9: Handle non-object input (string)
  it('9. should throw a TypeError if input is a string', () => {
    expect(() =>
      keysToCamelCase(
        'string' as unknown as Record<string, unknown> | unknown[],
      ),
    ).toThrow(TypeError);
  });

  // Test case 10: Handle non-object input (boolean)
  it('10. should throw a TypeError if input is a boolean', () => {
    expect(() =>
      keysToCamelCase(true as unknown as Record<string, unknown> | unknown[]),
    ).toThrow(TypeError);
  });

  // Test case 11: Handle non-object input (null)
  it('11. should throw a TypeError if input is null', () => {
    expect(() =>
      keysToCamelCase(null as unknown as Record<string, unknown> | unknown[]),
    ).toThrow(TypeError);
  });

  // Test case 12: Handle non-object input (undefined)
  it('12. should throw a TypeError if input is undefined', () => {
    expect(() =>
      keysToCamelCase(
        undefined as unknown as Record<string, unknown> | unknown[],
      ),
    ).toThrow(TypeError);
  });
});
