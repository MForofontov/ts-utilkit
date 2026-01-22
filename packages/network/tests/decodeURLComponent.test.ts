import { decodeURLComponent } from '../src/decodeURLComponent';

/**
 * Unit tests for the decodeURLComponent function.
 */
describe('decodeURLComponent', () => {
  // Test case 1: Decode a basic encoded string
  it('1. should decode basic encoded string', () => {
    const result = decodeURLComponent('hello%20world');
    expect(result).toBe('hello world');
  });

  // Test case 2: Decode punctuation characters
  it('2. should decode special characters', () => {
    const result = decodeURLComponent('hello%21world');
    expect(result).toBe('hello!world');
  });

  // Test case 3: Decode parentheses in the string
  it('3. should decode parentheses', () => {
    const result = decodeURLComponent('hello%28world%29');
    expect(result).toBe('hello(world)');
  });

  // Test case 4: Decode single quotes
  it('4. should decode single quotes', () => {
    const result = decodeURLComponent('hello%27world');
    expect(result).toBe("hello'world");
  });

  // Test case 5: Decode asterisks
  it('5. should decode asterisks', () => {
    const result = decodeURLComponent('hello%2Aworld');
    expect(result).toBe('hello*world');
  });

  // Test case 6: Leave unencoded strings untouched
  it('6. should not modify unencoded string', () => {
    const result = decodeURLComponent('hello-world_test.value~123');
    expect(result).toBe('hello-world_test.value~123');
  });

  // Test case 7: Decode multiple special characters together
  it('7. should decode multiple special characters', () => {
    const result = decodeURLComponent(
      'hello%20world%21%20%28it%27s%20great%29%2A',
    );
    expect(result).toBe("hello world! (it's great)*");
  });

  // Test case 8: Handle empty strings
  it('8. should handle empty string', () => {
    const result = decodeURLComponent('');
    expect(result).toBe('');
  });

  // Test case 9: Throw when non-string input is provided
  it('9. should throw TypeError for non-string input', () => {
    const input = 123 as unknown as string;
    expect(() => decodeURLComponent(input)).toThrow(TypeError);
    expect(() => decodeURLComponent(input)).toThrow('str must be a string');
  });

  // Test case 10: Decode encoded slashes
  it('10. should decode slashes', () => {
    const result = decodeURLComponent('path%2Fto%2Ffile');
    expect(result).toBe('path/to/file');
  });

  // Test case 11: Decode encoded equals signs
  it('11. should decode equals signs', () => {
    const result = decodeURLComponent('key%3Dvalue');
    expect(result).toBe('key=value');
  });

  // Test case 12: Decode encoded ampersands
  it('12. should decode ampersands', () => {
    const result = decodeURLComponent('key1%26key2');
    expect(result).toBe('key1&key2');
  });

  // Test case 13: Decode Unicode characters
  it('13. should decode Unicode characters', () => {
    const result = decodeURLComponent('hello%20%E4%B8%96%E7%95%8C');
    expect(result).toBe('hello 世界');
  });

  // Test case 14: Decode emoji characters
  it('14. should decode emoji', () => {
    const result = decodeURLComponent('hello%20%F0%9F%98%80');
    expect(result).toBe('hello 😀');
  });

  // Test case 15: Decode percent symbols
  it('15. should decode percent signs', () => {
    const result = decodeURLComponent('100%25');
    expect(result).toBe('100%');
  });

  // Test case 16: Decode hash symbols
  it('16. should decode hash symbols', () => {
    const result = decodeURLComponent('%23section');
    expect(result).toBe('#section');
  });

  // Test case 17: Decode @ characters
  it('17. should decode at symbols', () => {
    const result = decodeURLComponent('user%40domain');
    expect(result).toBe('user@domain');
  });

  // Test case 18: Decode plus signs and equals together
  it('18. should decode plus signs', () => {
    const result = decodeURLComponent('1%2B1%3D2');
    expect(result).toBe('1+1=2');
  });

  // Test case 19: Gracefully handle malformed encodings
  it('19. should handle malformed encoded string gracefully', () => {
    const result = decodeURLComponent('hello%world');
    expect(result).toBe('hello%world');
  });

  // Test case 20: Return the original input when decoding fails
  it('20. should return original string on decode error', () => {
    const malformed = 'test%E0%A4%A';
    const result = decodeURLComponent(malformed);
    expect(result).toBe(malformed);
  });
});
