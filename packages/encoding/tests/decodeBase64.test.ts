import { decodeBase64 } from '../src/decodeBase64';

describe('decodeBase64', () => {
  // Test case 1: Decode a basic base64 string
  it('1. should decode a basic base64 string', () => {
    expect(decodeBase64('aGVsbG8gd29ybGQ=')).toBe('hello world');
  });

  // Test case 2: Decode an empty string
  it('2. should decode an empty string', () => {
    expect(decodeBase64('')).toBe('');
  });

  // Test case 3: Decode URL-safe base64 string
  it('3. should decode a URL-safe base64 string', () => {
    expect(decodeBase64('YWE_')).toBe('aa?');
  });

  // Test case 4: Decode unicode characters
  it('4. should decode unicode characters', () => {
    const encoded = '44GT44KT44Gr44Gh44Gv';
    expect(decodeBase64(encoded)).toBe('こんにちは');
  });

  // Test case 5: Decode string without padding
  it('5. should decode a string without padding', () => {
    expect(decodeBase64('aGVsbG8gd29ybGQ')).toBe('hello world');
  });

  // Test case 6: Handle invalid base64 string
  it('6. should throw an error for invalid base64', () => {
    expect(() => decodeBase64('@@')).toThrow('Invalid base64 string');
  });

  // Test case 7: Reject base64 strings with whitespace
  it('7. should throw an error for base64 with whitespace', () => {
    expect(() => decodeBase64('aGVsbG8g d29ybGQ=')).toThrow(
      'Invalid base64 string',
    );
  });

  // Test case 8: Reject base64 strings with newlines
  it('8. should throw an error for base64 with newlines', () => {
    const encodedWithNewline = 'aGVsbG8gd29y\nbGQ=';
    expect(() => decodeBase64(encodedWithNewline)).toThrow(
      'Invalid base64 string',
    );
  });

  // Test case 9: Reject base64 strings with invalid length
  it('9. should throw an error for base64 with invalid length', () => {
    expect(() => decodeBase64('Y')).toThrow('Invalid base64 string');
  });
});
