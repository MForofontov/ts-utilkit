import { extractListItems } from '../src/extractListItems';

/**
 * Unit tests for the extractListItems function.
 */
describe('extractListItems', () => {
  // Test case 1: Extract items from unordered list
  it('1. should extract items from unordered list', () => {
    // Arrange
    const html = `
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    `;
    const expected = [['Item 1', 'Item 2', 'Item 3']];

    // Act
    const result = extractListItems(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 2: Extract items from ordered list
  it('2. should extract items from ordered list', () => {
    // Arrange
    const html = `
      <ol>
        <li>First</li>
        <li>Second</li>
        <li>Third</li>
      </ol>
    `;
    const expected = [['First', 'Second', 'Third']];

    // Act
    const result = extractListItems(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 3: Extract items from multiple lists
  it('3. should extract items from multiple lists', () => {
    // Arrange
    const html = `
      <ul>
        <li>Alpha</li>
        <li>Beta</li>
      </ul>
      <ol>
        <li>One</li>
        <li>Two</li>
      </ol>
    `;
    const expected = [
      ['Alpha', 'Beta'],
      ['One', 'Two'],
    ];

    // Act
    const result = extractListItems(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 4: Flatten nested lists by default
  it('4. should flatten nested lists by default', () => {
    // Arrange
    const html = `
      <ul>
        <li>Item 1</li>
        <li>Item 2
          <ul>
            <li>Sub 1</li>
            <li>Sub 2</li>
          </ul>
        </li>
        <li>Item 3</li>
      </ul>
    `;
    const expected = [['Item 1', 'Item 2 Sub 1', 'Sub 2']];

    // Act
    const result = extractListItems(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 5: Preserve nested structure when requested
  it('5. should preserve nested structure when preserveNesting is true', () => {
    // Arrange
    const html = `
      <ul>
        <li>Item 1</li>
        <li>Item 2
          <ul>
            <li>Sub 1</li>
          </ul>
        </li>
      </ul>
    `;
    const expected = [['Item 1', 'Item 2 <ul> <li>Sub 1']];

    // Act
    const result = extractListItems(html, true);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 6: Handle list items with nested HTML tags
  it('6. should extract text from list items with nested tags', () => {
    // Arrange
    const html = `
      <ul>
        <li><strong>Bold</strong> text</li>
        <li>Link <a href="#">here</a></li>
      </ul>
    `;
    const expected = [['Bold text', 'Link here']];

    // Act
    const result = extractListItems(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 7: Handle empty list items
  it('7. should handle empty list items', () => {
    // Arrange
    const html = `
      <ul>
        <li>Item 1</li>
        <li></li>
        <li>Item 3</li>
      </ul>
    `;
    const expected = [['Item 1', 'Item 3']];

    // Act
    const result = extractListItems(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 8: Decode HTML entities in list items
  it('8. should decode HTML entities in list items', () => {
    // Arrange
    const html = `
      <ul>
        <li>Price: &pound;100</li>
        <li>Copyright &copy; 2024</li>
        <li>A &amp; B</li>
      </ul>
    `;
    const expected = [
      ['Price: &pound;100', 'Copyright &copy; 2024', 'A &amp; B'],
    ];

    // Act
    const result = extractListItems(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 9: Normalize whitespace in list items
  it('9. should normalize whitespace in list items', () => {
    // Arrange
    const html = `
      <ul>
        <li>   Item   with   spaces   </li>
        <li>Item
        with
        newlines</li>
      </ul>
    `;
    const expected = [['Item with spaces', 'Item with newlines']];

    // Act
    const result = extractListItems(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 10: Return empty array when no lists found
  it('10. should return empty array when no lists found', () => {
    // Arrange
    const html = '<div>No lists here</div>';
    const expected: string[][] = [];

    // Act
    const result = extractListItems(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 11: Handle deeply nested lists
  it('11. should handle deeply nested lists', () => {
    // Arrange
    const html = `
      <ul>
        <li>Level 1
          <ul>
            <li>Level 2
              <ul>
                <li>Level 3</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    `;
    const expected = [['Level 1 Level 2 Level 3']];

    // Act
    const result = extractListItems(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 12: Handle empty string input
  it('12. should return empty array for empty HTML', () => {
    // Arrange
    const html = '';
    const expected: string[][] = [];

    // Act
    const result = extractListItems(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 13: Extract from mixed ul and ol with nesting
  it('13. should extract from mixed ul and ol with nesting', () => {
    // Arrange
    const html = `
      <ul>
        <li>Unordered 1</li>
        <li>Unordered 2
          <ol>
            <li>Ordered A</li>
            <li>Ordered B</li>
          </ol>
        </li>
      </ul>
    `;
    const expected = [['Unordered 1', 'Unordered 2 Ordered A', 'Ordered B']];

    // Act
    const result = extractListItems(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 14: Throw TypeError when html is not a string
  it('14. should throw TypeError when html is not a string', () => {
    // Arrange
    const invalidInput = ['<ul><li>test</li></ul>'] as unknown as string;
    const expectedMessage = 'html must be a string, got object';

    // Act & Assert
    expect(() => extractListItems(invalidInput)).toThrow(TypeError);
    expect(() => extractListItems(invalidInput)).toThrow(expectedMessage);
  });

  // Test case 15: Throw TypeError when preserveNesting is not a boolean
  it('15. should throw TypeError when preserveNesting is not a boolean', () => {
    // Arrange
    const html = '<ul><li>test</li></ul>';
    const invalidPreserveNesting = 'true' as unknown as boolean;
    const expectedMessage = 'preserveNesting must be a boolean, got string';

    // Act & Assert
    expect(() => extractListItems(html, invalidPreserveNesting)).toThrow(
      TypeError,
    );
    expect(() => extractListItems(html, invalidPreserveNesting)).toThrow(
      expectedMessage,
    );
  });
});
