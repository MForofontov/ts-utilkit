import { removeWhitespace } from '../src/removeWhitespace';

/**
 * Unit tests for the removeWhitespace function.
 */
describe('removeWhitespace', () => {
  // Test case 1: Remove whitespace from a string with spaces
  it('1. should remove whitespace from a string with spaces', () => {
    const str: string = 'Hello World';
    const expected: string = 'HelloWorld';
    const result: string = removeWhitespace(str);
    expect(result).toBe(expected);
  });

  // Test case 2: Remove whitespace from a string with leading spaces
  it('2. should remove whitespace from a string with leading spaces', () => {
    const str: string = '   Hello World';
    const expected: string = 'HelloWorld';
    const result: string = removeWhitespace(str);
    expect(result).toBe(expected);
  });

  // Test case 3: Remove whitespace from a string with trailing spaces
  it('3. should remove whitespace from a string with trailing spaces', () => {
    const str: string = 'Hello World   ';
    const expected: string = 'HelloWorld';
    const result: string = removeWhitespace(str);
    expect(result).toBe(expected);
  });

  // Test case 4: Remove whitespace from a string with both leading and trailing spaces
  it('4. should remove whitespace from a string with both leading and trailing spaces', () => {
    const str: string = '   Hello World   ';
    const expected: string = 'HelloWorld';
    const result: string = removeWhitespace(str);
    expect(result).toBe(expected);
  });

  // Test case 5: Remove whitespace from a string with tabs
  it('5. should remove whitespace from a string with tabs', () => {
    const str: string = 'Hello\tWorld';
    const expected: string = 'HelloWorld';
    const result: string = removeWhitespace(str);
    expect(result).toBe(expected);
  });

  // Test case 6: Remove whitespace from a string with newlines
  it('6. should remove whitespace from a string with newlines', () => {
    const str: string = 'Hello\nWorld';
    const expected: string = 'HelloWorld';
    const result: string = removeWhitespace(str);
    expect(result).toBe(expected);
  });

  // Test case 7: Remove whitespace from a string with mixed whitespace characters
  it('7. should remove whitespace from a string with mixed whitespace characters', () => {
    const str: string = ' \t\n Hello \t\n World \t\n ';
    const expected: string = 'HelloWorld';
    const result: string = removeWhitespace(str);
    expect(result).toBe(expected);
  });

  // Test case 8: Remove whitespace from an empty string
  it('8. should return an empty string when removing whitespace from an empty string', () => {
    const str: string = '';
    const expected: string = '';
    const result: string = removeWhitespace(str);
    expect(result).toBe(expected);
  });

  // Test case 9: Remove whitespace from a string with only spaces
  it('9. should return an empty string when removing whitespace from a string with only spaces', () => {
    const str: string = '     ';
    const expected: string = '';
    const result: string = removeWhitespace(str);
    expect(result).toBe(expected);
  });

  // Test case 10: Remove whitespace from a string with only tabs
  it('10. should return an empty string when removing whitespace from a string with only tabs', () => {
    const str: string = '\t\t\t';
    const expected: string = '';
    const result: string = removeWhitespace(str);
    expect(result).toBe(expected);
  });

  // Test case 11: Remove whitespace from a string with only newlines
  it('11. should return an empty string when removing whitespace from a string with only newlines', () => {
    const str: string = '\n\n\n';
    const expected: string = '';
    const result: string = removeWhitespace(str);
    expect(result).toBe(expected);
  });

  // Test case 12: Remove whitespace from a string with special characters and spaces
  it('12. should remove whitespace from a string with special characters and spaces', () => {
    const str: string = ' @hello@ world@ ';
    const expected: string = '@hello@world@';
    const result: string = removeWhitespace(str);
    expect(result).toBe(expected);
  });

  // Test case 13: Remove whitespace from a string with numbers and spaces
  it('13. should remove whitespace from a string with numbers and spaces', () => {
    const str: string = ' 123 456 789 ';
    const expected: string = '123456789';
    const result: string = removeWhitespace(str);
    expect(result).toBe(expected);
  });

  // Test case 14: Remove whitespace from a string with mixed characters and spaces
  it('14. should remove whitespace from a string with mixed characters and spaces', () => {
    const str: string = ' a1@ b2# c3$ ';
    const expected: string = 'a1@b2#c3$';
    const result: string = removeWhitespace(str);
    expect(result).toBe(expected);
  });

  // Test case 15: Remove whitespace from a string with mixed characters and mixed whitespace
  it('15. should remove whitespace from a string with mixed characters and mixed whitespace', () => {
    const str: string = ' \t\n a1@ \t\n b2# \t\n c3$ \t\n ';
    const expected: string = 'a1@b2#c3$';
    const result: string = removeWhitespace(str);
    expect(result).toBe(expected);
  });
});
