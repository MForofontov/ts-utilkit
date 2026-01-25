import { extractEmails } from '../src/extractEmails';

/**
 * Unit tests for the extractEmails function.
 */
describe('extractEmails', () => {
  // Normal usage tests
  it('1. should extract email from text', () => {
    // Arrange
    const html = '<p>Contact: test@example.com</p>';
    const expected = ['test@example.com'];

    // Act
    const result = extractEmails(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('2. should extract email from mailto link', () => {
    // Arrange
    const html = '<a href="mailto:support@example.com">Email us</a>';
    const expected = ['support@example.com'];

    // Act
    const result = extractEmails(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('3. should extract multiple emails', () => {
    // Arrange
    const html = '<p>Contact test@example.com or support@example.com</p>';

    // Act
    const result = extractEmails(html);

    // Assert
    expect(result).toHaveLength(2);
    expect(result).toContain('test@example.com');
    expect(result).toContain('support@example.com');
  });

  it('4. should return unique emails only', () => {
    // Arrange
    const html = `
      <a href="mailto:test@example.com">Email</a>
      <p>Contact test@example.com</p>
    `;
    const expected = ['test@example.com'];

    // Act
    const result = extractEmails(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('5. should handle emails with + and . characters', () => {
    // Arrange
    const html = '<p>Email: user.name+tag@example.com</p>';
    const expected = ['user.name+tag@example.com'];

    // Act
    const result = extractEmails(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('6. should handle emails with subdomain', () => {
    // Arrange
    const html = '<p>Contact: admin@mail.example.com</p>';
    const expected = ['admin@mail.example.com'];

    // Act
    const result = extractEmails(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('7. should convert emails to lowercase', () => {
    // Arrange
    const html = '<p>Contact: Test@Example.COM</p>';
    const expected = ['test@example.com'];

    // Act
    const result = extractEmails(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('8. should extract from mailto with query params', () => {
    // Arrange
    const html = '<a href="mailto:test@example.com?subject=Hello">Email</a>';
    const expected = ['test@example.com'];

    // Act
    const result = extractEmails(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('9. should ignore emails in script tags', () => {
    // Arrange
    const html = `
      <script>var email = "ignore@example.com";</script>
      <p>Contact: real@example.com</p>
    `;
    const expected = ['real@example.com'];

    // Act
    const result = extractEmails(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('10. should ignore emails in style tags', () => {
    // Arrange
    const html = `
      <style>/* email: ignore@example.com */</style>
      <p>Contact: real@example.com</p>
    `;
    const expected = ['real@example.com'];

    // Act
    const result = extractEmails(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Edge cases
  it('11. should return empty array when no emails found', () => {
    // Arrange
    const html = '<p>No emails here</p>';
    const expected: string[] = [];

    // Act
    const result = extractEmails(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('12. should handle empty HTML string', () => {
    // Arrange
    const html = '';
    const expected: string[] = [];

    // Act
    const result = extractEmails(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('13. should handle malformed email addresses', () => {
    // Arrange
    const html = '<p>Invalid: @example.com, user@, test@@example.com</p>';
    const expected: string[] = [];

    // Act
    const result = extractEmails(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('14. should extract emails from complex HTML', () => {
    // Arrange
    const html = `
      <div>
        <p>Support: <a href="mailto:support@example.com">support@example.com</a></p>
        <p>Sales: sales@example.com</p>
        <footer>Contact: info@example.com</footer>
      </div>
    `;

    // Act
    const result = extractEmails(html);

    // Assert
    expect(result).toHaveLength(3);
    expect(result).toContain('support@example.com');
    expect(result).toContain('sales@example.com');
    expect(result).toContain('info@example.com');
  });

  it('15. should handle emails with numbers', () => {
    // Arrange
    const html = '<p>Contact: user123@example456.com</p>';
    const expected = ['user123@example456.com'];

    // Act
    const result = extractEmails(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Error cases
  it('16. should throw TypeError when html is not a string', () => {
    // Arrange
    const html = 123 as unknown as string;
    const expectedMessage = 'html must be a string, got number';

    // Act & Assert
    expect(() => extractEmails(html)).toThrow(TypeError);
    expect(() => extractEmails(html)).toThrow(expectedMessage);
  });
});
