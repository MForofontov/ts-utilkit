import { stringToBoolean } from '../src/stringToBoolean';

/**
 * Unit tests for the stringToBoolean function.
 */
describe('stringToBoolean', () => {
  // Test case 1: Convert "true" to boolean
  it('1. should convert "true" to true', () => {
    const str: string = 'true';
    const expected: boolean = true;
    const result: boolean = stringToBoolean(str);
    expect(result).toBe(expected);
  });

  // Test case 2: Convert "false" to boolean
  it('2. should convert "false" to false', () => {
    const str: string = 'false';
    const expected: boolean = false;
    const result: boolean = stringToBoolean(str);
    expect(result).toBe(expected);
  });

  // Test case 3: Convert "1" to boolean
  it('3. should convert "1" to true', () => {
    const str: string = '1';
    const expected: boolean = true;
    const result: boolean = stringToBoolean(str);
    expect(result).toBe(expected);
  });

  // Test case 4: Convert "0" to boolean
  it('4. should convert "0" to false', () => {
    const str: string = '0';
    const expected: boolean = false;
    const result: boolean = stringToBoolean(str);
    expect(result).toBe(expected);
  });

  // Test case 5: Convert "TRUE" to boolean (case insensitive)
  it('5. should convert "TRUE" to true (case insensitive)', () => {
    const str: string = 'TRUE';
    const expected: boolean = true;
    const result: boolean = stringToBoolean(str);
    expect(result).toBe(expected);
  });

  // Test case 6: Convert "FALSE" to boolean (case insensitive)
  it('6. should convert "FALSE" to false (case insensitive)', () => {
    const str: string = 'FALSE';
    const expected: boolean = false;
    const result: boolean = stringToBoolean(str);
    expect(result).toBe(expected);
  });

  // Test case 7: Convert "yes" to boolean
  it('7. should convert "yes" to false', () => {
    const str: string = 'yes';
    const expected: boolean = false;
    const result: boolean = stringToBoolean(str);
    expect(result).toBe(expected);
  });

  // Test case 8: Convert "no" to boolean
  it('8. should convert "no" to false', () => {
    const str: string = 'no';
    const expected: boolean = false;
    const result: boolean = stringToBoolean(str);
    expect(result).toBe(expected);
  });

  // Test case 9: Convert an empty string to boolean
  it('9. should convert an empty string to false', () => {
    const str: string = '';
    const expected: boolean = false;
    const result: boolean = stringToBoolean(str);
    expect(result).toBe(expected);
  });

  // Test case 10: Convert a string with leading/trailing spaces to boolean
  it('10. should convert a string with leading/trailing spaces to boolean', () => {
    const str: string = ' true ';
    const expected: boolean = true;
    const result: boolean = stringToBoolean(str);
    expect(result).toBe(expected);
  });

  // Test case 11: Convert a string with mixed case to boolean
  it('11. should convert a string with mixed case to boolean', () => {
    const str: string = 'TrUe';
    const expected: boolean = true;
    const result: boolean = stringToBoolean(str);
    expect(result).toBe(expected);
  });

  // Test case 12: Convert a string with special characters to boolean
  it('12. should convert a string with special characters to false', () => {
    const str: string = '@true!';
    const expected: boolean = false;
    const result: boolean = stringToBoolean(str);
    expect(result).toBe(expected);
  });

  // Test case 13: Convert a string with numbers to boolean
  it('13. should convert a string with numbers to false', () => {
    const str: string = '123';
    const expected: boolean = false;
    const result: boolean = stringToBoolean(str);
    expect(result).toBe(expected);
  });

  // Test case 14: Convert a string with mixed characters to boolean
  it('14. should convert a string with mixed characters to false', () => {
    const str: string = 'true123';
    const expected: boolean = false;
    const result: boolean = stringToBoolean(str);
    expect(result).toBe(expected);
  });

  // Test case 15: Convert a string with only whitespace to boolean
  it('15. should convert a string with only whitespace to false', () => {
    const str: string = '   ';
    const expected: boolean = false;
    const result: boolean = stringToBoolean(str);
    expect(result).toBe(expected);
  });
});
