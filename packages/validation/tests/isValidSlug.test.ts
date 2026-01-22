import { isValidSlug } from '../src/isValidSlug';

/**
 * Unit tests for the isValidSlug function.
 */
describe('isValidSlug', () => {
  // Test case 1: Valid simple slugs
  it('1. should return true for valid simple slugs', () => {
    // Arrange & Act & Assert
    expect(isValidSlug('hello-world')).toBe(true);
    expect(isValidSlug('my-blog-post')).toBe(true);
    expect(isValidSlug('simple')).toBe(true);
    expect(isValidSlug('test')).toBe(true);
  });

  // Test case 2: Valid slugs with numbers
  it('2. should return true for slugs with numbers', () => {
    // Arrange & Act & Assert
    expect(isValidSlug('my-blog-post-123')).toBe(true);
    expect(isValidSlug('2024-update')).toBe(true);
    expect(isValidSlug('article-1')).toBe(true);
    expect(isValidSlug('123-test')).toBe(true);
  });

  // Test case 3: Valid slugs with multiple hyphens
  it('3. should return true for slugs with multiple single hyphens', () => {
    // Arrange & Act & Assert
    expect(isValidSlug('this-is-a-long-slug')).toBe(true);
    expect(isValidSlug('a-b-c-d-e-f')).toBe(true);
    expect(isValidSlug('one-two-three')).toBe(true);
  });

  // Test case 4: Valid single character slug
  it('4. should return true for single character slug', () => {
    // Arrange & Act & Assert
    expect(isValidSlug('a')).toBe(true);
    expect(isValidSlug('z')).toBe(true);
    expect(isValidSlug('5')).toBe(true);
  });

  // Test case 5: Valid all numbers
  it('5. should return true for all numeric slugs', () => {
    // Arrange & Act & Assert
    expect(isValidSlug('123')).toBe(true);
    expect(isValidSlug('2024')).toBe(true);
    expect(isValidSlug('123-456')).toBe(true);
  });

  // Test case 6: Invalid - uppercase letters
  it('6. should return false for uppercase letters', () => {
    // Arrange & Act & Assert
    expect(isValidSlug('Hello-World')).toBe(false);
    expect(isValidSlug('TEST')).toBe(false);
    expect(isValidSlug('My-Blog')).toBe(false);
  });

  // Test case 7: Invalid - underscores
  it('7. should return false for underscores', () => {
    // Arrange & Act & Assert
    expect(isValidSlug('hello_world')).toBe(false);
    expect(isValidSlug('test_slug')).toBe(false);
    expect(isValidSlug('my_blog_post')).toBe(false);
  });

  // Test case 8: Invalid - spaces
  it('8. should return false for spaces', () => {
    // Arrange & Act & Assert
    expect(isValidSlug('hello world')).toBe(false);
    expect(isValidSlug('my blog post')).toBe(false);
    expect(isValidSlug('test slug')).toBe(false);
  });

  // Test case 9: Invalid - starts with hyphen
  it('9. should return false for slugs starting with hyphen', () => {
    // Arrange & Act & Assert
    expect(isValidSlug('-hello')).toBe(false);
    expect(isValidSlug('-test-slug')).toBe(false);
    expect(isValidSlug('-123')).toBe(false);
  });

  // Test case 10: Invalid - ends with hyphen
  it('10. should return false for slugs ending with hyphen', () => {
    // Arrange & Act & Assert
    expect(isValidSlug('hello-')).toBe(false);
    expect(isValidSlug('test-slug-')).toBe(false);
    expect(isValidSlug('123-')).toBe(false);
  });

  // Test case 11: Invalid - consecutive hyphens
  it('11. should return false for consecutive hyphens', () => {
    // Arrange & Act & Assert
    expect(isValidSlug('hello--world')).toBe(false);
    expect(isValidSlug('test---slug')).toBe(false);
    expect(isValidSlug('my--blog--post')).toBe(false);
  });

  // Test case 12: Invalid - empty string
  it('12. should return false for empty string', () => {
    // Arrange
    const slug = '';

    // Act
    const result = isValidSlug(slug);

    // Assert
    expect(result).toBe(false);
  });

  // Test case 13: Invalid - special characters
  it('13. should return false for special characters', () => {
    // Arrange & Act & Assert
    expect(isValidSlug('hello@world')).toBe(false);
    expect(isValidSlug('test#slug')).toBe(false);
    expect(isValidSlug('my.blog.post')).toBe(false);
    expect(isValidSlug('slug!')).toBe(false);
  });

  // Test case 14: Invalid - only hyphen
  it('14. should return false for only hyphen', () => {
    // Arrange
    const slug = '-';

    // Act
    const result = isValidSlug(slug);

    // Assert
    expect(result).toBe(false);
  });

  // Test case 15: Valid long slug
  it('15. should return true for long valid slug', () => {
    // Arrange
    const slug = 'this-is-a-very-long-slug-with-many-words-and-numbers-123-456';

    // Act
    const result = isValidSlug(slug);

    // Assert
    expect(result).toBe(true);
  });

  // Test case 16: Invalid - mixed valid and invalid characters
  it('16. should return false for mixed valid and invalid characters', () => {
    // Arrange & Act & Assert
    expect(isValidSlug('hello-world!')).toBe(false);
    expect(isValidSlug('test_slug-123')).toBe(false);
    expect(isValidSlug('my-Blog-post')).toBe(false);
  });

  // Test case 17: Throw TypeError when slug is not a string
  it('17. should throw TypeError when slug is not a string', () => {
    // Arrange
    const invalidInput = 12345 as unknown as string;
    const expectedMessage = 'slug must be a string, got number';

    // Act & Assert
    expect(() => isValidSlug(invalidInput)).toThrow(TypeError);
    expect(() => isValidSlug(invalidInput)).toThrow(expectedMessage);
  });
});
