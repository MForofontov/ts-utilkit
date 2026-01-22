import { getFileExtension } from '../src/getFileExtension';

/**
 * Unit tests for the getFileExtension function.
 */
describe('getFileExtension', () => {
  // Test case 1: Get the file extension from a simple filename
  it('1. should get the file extension from a simple filename', () => {
    const filename: string = 'example.txt';
    const expected: string = 'txt';
    const result: string = getFileExtension(filename);
    expect(result).toBe(expected);
  });

  // Test case 2: Get the file extension from a filename with multiple dots
  it('2. should get the file extension from a filename with multiple dots', () => {
    const filename: string = 'archive.tar.gz';
    const expected: string = 'gz';
    const result: string = getFileExtension(filename);
    expect(result).toBe(expected);
  });

  // Test case 3: Get the file extension from a filename with no extension
  it('3. should return an empty string for a filename with no extension', () => {
    const filename: string = 'example';
    const expected: string = '';
    const result: string = getFileExtension(filename);
    expect(result).toBe(expected);
  });

  // Test case 4: Get the file extension from a filename with a dot at the end
  it('4. should return an empty string for a filename with a dot at the end', () => {
    const filename: string = 'example.';
    const expected: string = '';
    const result: string = getFileExtension(filename);
    expect(result).toBe(expected);
  });

  // Test case 5: Get the file extension from a hidden file (dotfile)
  it('5. should return an empty string for a hidden file (dotfile)', () => {
    const filename: string = '.hiddenfile';
    const expected: string = '';
    const result: string = getFileExtension(filename);
    expect(result).toBe(expected);
  });

  // Test case 6: Get the file extension from a hidden file with an extension
  it('6. should get the file extension from a hidden file with an extension', () => {
    const filename: string = '.hiddenfile.txt';
    const expected: string = 'txt';
    const result: string = getFileExtension(filename);
    expect(result).toBe(expected);
  });

  // Test case 7: Get the file extension from a filename with special characters
  it('7. should get the file extension from a filename with special characters', () => {
    const filename: string = 'example@file!.txt';
    const expected: string = 'txt';
    const result: string = getFileExtension(filename);
    expect(result).toBe(expected);
  });

  // Test case 8: Get the file extension from a filename with numbers
  it('8. should get the file extension from a filename with numbers', () => {
    const filename: string = 'file123.txt';
    const expected: string = 'txt';
    const result: string = getFileExtension(filename);
    expect(result).toBe(expected);
  });

  // Test case 9: Get the file extension from a filename with mixed case
  it('9. should get the file extension from a filename with mixed case', () => {
    const filename: string = 'example.File.TXT';
    const expected: string = 'TXT';
    const result: string = getFileExtension(filename);
    expect(result).toBe(expected);
  });

  // Test case 10: Get the file extension from an empty filename
  it('10. should return an empty string for an empty filename', () => {
    const filename: string = '';
    const expected: string = '';
    const result: string = getFileExtension(filename);
    expect(result).toBe(expected);
  });
});
