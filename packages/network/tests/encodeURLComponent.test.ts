import { encodeURLComponent } from '../src/encodeURLComponent';

/**
 * Unit tests for the encodeURLComponent function.
 */
describe('encodeURLComponent', () => {
  // Test case 1: Encode a space-separated string
  it('1. should encode basic string', () => {
    const result = encodeURLComponent('hello world');
    expect(result).toBe('hello%20world');
  });

  // Test case 2: Encode punctuation characters
  it('2. should encode special characters', () => {
    const result = encodeURLComponent('hello!world');
    expect(result).toBe('hello%21world');
  });

  // Test case 3: Encode parentheses in the string
  it('3. should encode parentheses', () => {
    const result = encodeURLComponent('hello(world)');
    expect(result).toBe('hello%28world%29');
  });

  // Test case 4: Encode single quotes
  it('4. should encode single quotes', () => {
    const result = encodeURLComponent("hello'world");
    expect(result).toBe('hello%27world');
  });

  // Test case 5: Encode asterisks
  it('5. should encode asterisks', () => {
    const result = encodeURLComponent('hello*world');
    expect(result).toBe('hello%2Aworld');
  });

  // Test case 6: Preserve already safe characters
  it('6. should not encode safe characters', () => {
    const result = encodeURLComponent('hello-world_test.value~123');
    expect(result).toBe('hello-world_test.value~123');
  });

  // Test case 7: Encode multiple special characters together
  it('7. should encode multiple special characters', () => {
    const result = encodeURLComponent("hello world! (it's great)*");
    expect(result).toBe('hello%20world%21%20%28it%27s%20great%29%2A');
  });

  // Test case 8: Handle empty strings
  it('8. should handle empty string', () => {
    const result = encodeURLComponent('');
    expect(result).toBe('');
  });

  // Test case 9: Throw when non-string input is provided
  it('9. should throw TypeError for non-string input', () => {
    const input = 123 as unknown as string;
    expect(() => encodeURLComponent(input)).toThrow(TypeError);
    expect(() => encodeURLComponent(input)).toThrow('str must be a string');
  });

  // Test case 10: Encode strings containing query parameters
  it('10. should encode URL with query parameters', () => {
    const result = encodeURLComponent('search?query=test&filter=active');
    expect(result).toBe('search%3Fquery%3Dtest%26filter%3Dactive');
  });

  // Test case 11: Encode slashes in the string
  it('11. should encode slashes', () => {
    const result = encodeURLComponent('path/to/file');
    expect(result).toBe('path%2Fto%2Ffile');
  });

  // Test case 12: Encode equals signs
  it('12. should encode equals signs', () => {
    const result = encodeURLComponent('key=value');
    expect(result).toBe('key%3Dvalue');
  });

  // Test case 13: Encode ampersands
  it('13. should encode ampersands', () => {
    const result = encodeURLComponent('key1&key2');
    expect(result).toBe('key1%26key2');
  });

  // Test case 14: Encode Unicode characters
  it('14. should encode Unicode characters', () => {
    const result = encodeURLComponent('hello 世界');
    expect(result).toContain('%E4%B8%96%E7%95%8C');
  });

  // Test case 15: Encode emoji characters
  it('15. should encode emoji', () => {
    const result = encodeURLComponent('hello 😀');
    expect(result).toContain('%F0%9F%98%80');
  });

  // Test case 16: Encode percent symbols
  it('16. should encode percent signs', () => {
    const result = encodeURLComponent('100%');
    expect(result).toBe('100%25');
  });

  // Test case 17: Encode hash symbols
  it('17. should encode hash symbols', () => {
    const result = encodeURLComponent('#section');
    expect(result).toBe('%23section');
  });

  // Test case 18: Encode @ characters
  it('18. should encode at symbols', () => {
    const result = encodeURLComponent('user@domain');
    expect(result).toBe('user%40domain');
  });

  // Test case 19: Encode plus signs and equals together
  it('19. should encode plus signs', () => {
    const result = encodeURLComponent('1+1=2');
    expect(result).toBe('1%2B1%3D2');
  });

  // Test case 20: Preserve safe alphanumeric characters
  it('20. should handle string with only safe characters', () => {
    const result = encodeURLComponent('abcdefghijklmnopqrstuvwxyz0123456789');
    expect(result).toBe('abcdefghijklmnopqrstuvwxyz0123456789');
  });
});
