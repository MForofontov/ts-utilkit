import { joinStrings } from '../src/joinStrings';

describe('joinStrings', () => {
  // Test case 1: Normal array of strings
  it('1. should join a normal array of strings with a space separator', () => {
    const arr: string[] = ['hello', 'world'];
    const separator: string = ' ';
    expect(joinStrings(arr, separator)).toBe('hello world');
  });

  // Test case 2: Empty array
  it('2. should return an empty string when the array is empty', () => {
    const arr: string[] = [];
    const separator: string = ' ';
    expect(joinStrings(arr, separator)).toBe('');
  });

  // Test case 3: Array containing a single string
  it('3. should return the single string when the array contains one string', () => {
    const arr: string[] = ['hello'];
    const separator: string = ' ';
    expect(joinStrings(arr, separator)).toBe('hello');
  });

  // Test case 4: Array containing multiple empty strings
  it('4. should join an array containing multiple empty strings with a space separator', () => {
    const arr: string[] = ['', '', ''];
    const separator: string = ' ';
    expect(joinStrings(arr, separator)).toBe('  ');
  });

  // Test case 5: Array containing strings with special characters
  it('5. should join an array containing strings with special characters with a comma separator', () => {
    const arr: string[] = ['hello@', '#world', '$money'];
    const separator: string = ',';
    expect(joinStrings(arr, separator)).toBe('hello@,#world,$money');
  });

  // Test case 6: Array containing strings with spaces
  it('6. should join an array containing strings with spaces with a dash separator', () => {
    const arr: string[] = ['hello world', 'foo bar'];
    const separator: string = '-';
    expect(joinStrings(arr, separator)).toBe('hello world-foo bar');
  });

  // Test case 7: Array containing strings with numbers
  it('7. should join an array containing strings with numbers with a space separator', () => {
    const arr: string[] = ['hello1', 'world2'];
    const separator: string = ' ';
    expect(joinStrings(arr, separator)).toBe('hello1 world2');
  });

  // Test case 8: Array containing strings with mixed case
  it('8. should join an array containing strings with mixed case with a space separator', () => {
    const arr: string[] = ['Hello', 'WORLD'];
    const separator: string = ' ';
    expect(joinStrings(arr, separator)).toBe('Hello WORLD');
  });

  // Test case 9: Different separators
  it('9. should join an array of strings with different separators', () => {
    const arr: string[] = ['hello', 'world'];
    expect(joinStrings(arr, ' ')).toBe('hello world');
    expect(joinStrings(arr, ',')).toBe('hello,world');
    expect(joinStrings(arr, '')).toBe('helloworld');
    expect(joinStrings(arr, '-')).toBe('hello-world');
  });

  // Test case 10: Large array of strings
  it('10. should join a large array of strings with a comma separator', () => {
    const arr: string[] = Array.from({ length: 1000 }, (_, i) => `string${i}`);
    const separator: string = ',';
    const expected: string = arr.join(separator);
    expect(joinStrings(arr, separator)).toBe(expected);
  });

  // Test case 11: Array containing null and undefined
  it('11. should handle an array containing null and undefined', () => {
    const arr: (string | null | undefined)[] = [
      'hello',
      null,
      'world',
      undefined,
    ];
    const separator: string = ' ';
    const stringArr: string[] = arr.map(String);
    expect(joinStrings(stringArr, separator)).toBe(
      'hello null world undefined',
    );
  });

  // Test case 12: Array containing NaN
  it('12. should handle an array containing NaN', () => {
    const arr: (string | number)[] = ['hello', NaN, 'world'];
    const separator: string = ' ';
    const stringArr: string[] = arr.map(String);
    expect(joinStrings(stringArr, separator)).toBe('hello NaN world');
  });

  // Test case 13: Array containing objects
  it('13. should handle an array containing objects', () => {
    const arr: (string | object)[] = ['hello', { key: 'value' }, 'world'];
    const separator: string = ' ';
    const stringArr: string[] = arr.map(String);
    expect(joinStrings(stringArr, separator)).toBe(
      'hello [object Object] world',
    );
  });

  // Test case 14: Array with functions
  it('14. should handle an array containing functions', () => {
    const func1 = () => 'func1';
    const func2 = () => 'func2';
    expect(joinStrings(['hello', func1, 'world', func2], ' ')).toBe(
      'hello func1 world func2',
    );
  });

  // Test case 15: Array containing symbols
  it('15. should handle an array containing symbols', () => {
    const sym1: symbol = Symbol('sym1');
    const sym2: symbol = Symbol('sym2');
    const arr: (string | symbol)[] = ['hello', sym1, 'world', sym2];
    const separator: string = ' ';
    const stringArr: string[] = arr.map(String);
    expect(joinStrings(stringArr, separator)).toBe(
      `hello ${String(sym1)} world ${String(sym2)}`,
    );
  });

  // Test case 16: Array containing dates
  it('16. should handle an array containing dates', () => {
    const date1: Date = new Date(2020, 0, 1);
    const date2: Date = new Date(2021, 0, 1);
    const arr: (string | Date)[] = ['hello', date1, 'world', date2];
    const separator: string = ' ';
    const stringArr: string[] = arr.map(String);
    expect(joinStrings(stringArr, separator)).toBe(
      `hello ${date1.toString()} world ${date2.toString()}`,
    );
  });

  // Test case 17: Array containing regex
  it('17. should handle an array containing regex', () => {
    const regex1: RegExp = /abc/;
    const regex2: RegExp = /def/;
    const arr: (string | RegExp)[] = ['hello', regex1, 'world', regex2];
    const separator: string = ' ';
    const stringArr: string[] = arr.map(String);
    expect(joinStrings(stringArr, separator)).toBe(
      `hello ${regex1.toString()} world ${regex2.toString()}`,
    );
  });
});
