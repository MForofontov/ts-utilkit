import { encodeBase64 } from '../src/encodeBase64';

describe('encodeBase64', () => {
  // Test case 1: Encode a simple string
  it('1. should encode a simple string', () => {
    expect(encodeBase64('hello world')).toBe('aGVsbG8gd29ybGQ');
  });

  // Test case 2: Encode an empty string
  it('2. should encode an empty string', () => {
    expect(encodeBase64('')).toBe('');
  });

  // Test case 3: Encode a string with special characters
  it('3. should encode a string with special characters', () => {
    expect(encodeBase64('?foo=bar')).toBe('P2Zvbz1iYXI');
  });

  // Test case 4: Encode unicode characters
  it('4. should encode unicode characters', () => {
    expect(encodeBase64('こんにちは')).toBe('44GT44KT44Gr44Gh44Gv');
  });

  // Test case 5: Encode string with emoji characters
  it('5. should encode string with emoji characters', () => {
    expect(encodeBase64('😀')).toBe('8J-YgA');
  });

  // Test case 6: Encode a string with punctuation
  it('6. should encode a string with punctuation', () => {
    expect(encodeBase64('Hello, World!')).toBe('SGVsbG8sIFdvcmxkIQ');
  });

  // Test case 7: Replace "/" with "_" and remove padding
  it('7. should replace "/" with "_" and remove padding', () => {
    expect(encodeBase64('aa?')).toBe('YWE_');
  });

  // Test case 8: Replace "+" with "-" and remove padding
  it('8. should replace "+" with "-" and remove padding', () => {
    expect(encodeBase64(String.fromCharCode(0xf8))).toBe('-A');
  });

  // Test case 9: Remove all trailing "=" characters
  it('9. should remove all trailing "=" characters', () => {
    expect(encodeBase64('a')).toBe('YQ');
  });
});
