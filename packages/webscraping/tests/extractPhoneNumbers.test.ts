import { extractPhoneNumbers } from '../src/extractPhoneNumbers';

/**
 * Unit tests for the extractPhoneNumbers function.
 */
describe('extractPhoneNumbers', () => {
  // Test case 1: Extract basic US phone numbers
  it('1. should extract basic US phone numbers', () => {
    // Arrange
    const html = '<p>Call us at (555) 123-4567 or 555-987-6543</p>';
    const expected = ['(555) 123-4567', '555-987-6543'];

    // Act
    const result = extractPhoneNumbers(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 2: Extract phone numbers from tel: links
  it('2. should extract phone numbers from tel: links', () => {
    // Arrange
    const html = '<a href="tel:+1-555-123-4567">Call Now</a>';
    const expected = ['+1-555-123-4567'];

    // Act
    const result = extractPhoneNumbers(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 3: Extract international phone numbers
  it('3. should extract international phone numbers', () => {
    // Arrange
    const html = '<p>Contact: +44 20 7946 0958 or +33 1 42 86 82 00</p>';
    const expected = ['+44 20 7946 0958', '+33 1 42 86'];

    // Act
    const result = extractPhoneNumbers(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 4: Extract phone numbers with extensions
  it('4. should extract phone numbers with extensions', () => {
    // Arrange
    const html = '<p>Call (555) 123-4567 ext. 890 or 555-987-6543 x123</p>';
    const expected = ['(555) 123-4567', '555-987-6543'];

    // Act
    const result = extractPhoneNumbers(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 5: Extract multiple phone numbers from complex HTML
  it('5. should extract multiple phone numbers from complex HTML', () => {
    // Arrange
    const html = `
      <div>
        <p>Office: (555) 123-4567</p>
        <a href="tel:+1-555-987-6543">Mobile</a>
        <footer>Fax: 555.111.2222</footer>
      </div>
    `;
    const expected = ['+1-555-987-6543', '(555) 123-4567', '555.111.2222'];

    // Act
    const result = extractPhoneNumbers(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 6: Extract unique phone numbers only
  it('6. should return unique phone numbers only', () => {
    // Arrange
    const html = `
      <p>Call (555) 123-4567</p>
      <p>Contact (555) 123-4567</p>
      <p>Phone (555) 123-4567</p>
    `;
    const expected = ['(555) 123-4567'];

    // Act
    const result = extractPhoneNumbers(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 7: Extract phone numbers with dots as separators
  it('7. should extract phone numbers with dots as separators', () => {
    // Arrange
    const html = '<p>Call 555.123.4567 or 800.555.0199</p>';
    const expected = ['555.123.4567', '800.555.0199'];

    // Act
    const result = extractPhoneNumbers(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 8: Extract phone numbers with spaces
  it('8. should extract phone numbers with spaces', () => {
    // Arrange
    const html = '<p>Contact 555 123 4567 or 800 555 0199</p>';
    const expected = ['555 123 4567', '800 555 0199'];

    // Act
    const result = extractPhoneNumbers(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 9: Extract phone numbers from text with parentheses
  it('9. should extract phone numbers with area codes in parentheses', () => {
    // Arrange
    const html = '<p>Call (800) 555-0199 or (555) 123-4567</p>';
    const expected = ['(800) 555-0199', '(555) 123-4567'];

    // Act
    const result = extractPhoneNumbers(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 10: Return empty array for HTML with no phone numbers
  it('10. should return empty array when no phone numbers found', () => {
    // Arrange
    const html = '<p>Contact us via email at info@example.com</p>';
    const expected: string[] = [];

    // Act
    const result = extractPhoneNumbers(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 11: Ignore phone numbers in script and style tags
  it('11. should ignore phone numbers in script and style tags', () => {
    // Arrange
    const html = `
      <script>var phone = "555-123-4567";</script>
      <style>.phone::before { content: "555-987-6543"; }</style>
      <p>Real phone: (555) 111-2222</p>
    `;
    const expected = ['(555) 111-2222'];

    // Act
    const result = extractPhoneNumbers(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 12: Extract phone numbers with country codes
  it('12. should extract phone numbers with country codes', () => {
    // Arrange
    const html = '<p>Call +1 (555) 123-4567 or +44 800 555 0199</p>';
    const expected = [
      '+1 (555) 123-4567',
      '+44 800 555 0199',
      '(555) 123-4567',
      '800 555 0199',
    ];

    // Act
    const result = extractPhoneNumbers(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 13: Handle empty string input
  it('13. should return empty array for empty HTML', () => {
    // Arrange
    const html = '';
    const expected: string[] = [];

    // Act
    const result = extractPhoneNumbers(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 14: Extract phone numbers from tel: links ignoring query parameters
  it('14. should extract phone numbers from tel: links ignoring query parameters', () => {
    // Arrange
    const html = '<a href="tel:+1-555-123-4567?subject=Call">Click to Call</a>';
    const expected = ['+1-555-123-4567?subject=Call'];

    // Act
    const result = extractPhoneNumbers(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 15: Handle malformed phone numbers gracefully
  it('15. should ignore malformed phone numbers', () => {
    // Arrange
    const html = '<p>Invalid: 123, Valid: (555) 123-4567, Invalid: 12-34</p>';
    const expected = ['(555) 123-4567'];

    // Act
    const result = extractPhoneNumbers(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 16: Throw TypeError when html is not a string
  it('16. should throw TypeError when html is not a string', () => {
    // Arrange
    const invalidInput = 12345 as unknown as string;
    const expectedMessage = 'html must be a string, got number';

    // Act & Assert
    expect(() => extractPhoneNumbers(invalidInput)).toThrow(TypeError);
    expect(() => extractPhoneNumbers(invalidInput)).toThrow(expectedMessage);
  });
});
