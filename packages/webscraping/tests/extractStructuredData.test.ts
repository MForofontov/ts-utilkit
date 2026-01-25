import { extractStructuredData } from '../src/extractStructuredData';

/**
 * Unit tests for the extractStructuredData function.
 */
describe('extractStructuredData', () => {
  // Test case 1: Extract single JSON-LD block
  it('1. should extract single JSON-LD structured data', () => {
    // Arrange
    const html = `
      <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "John Doe"
      }
      </script>
    `;
    const expected = [
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'John Doe',
      },
    ];

    // Act
    const result = extractStructuredData(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 2: Extract multiple JSON-LD blocks
  it('2. should extract multiple JSON-LD blocks', () => {
    // Arrange
    const html = `
      <script type="application/ld+json">
      {"@type": "Person", "name": "Alice"}
      </script>
      <script type="application/ld+json">
      {"@type": "Organization", "name": "ACME Corp"}
      </script>
    `;
    const expected = [
      { '@type': 'Person', name: 'Alice' },
      { '@type': 'Organization', name: 'ACME Corp' },
    ];

    // Act
    const result = extractStructuredData(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 3: Extract complex nested JSON-LD
  it('3. should extract complex nested JSON-LD data', () => {
    // Arrange
    const html = `
      <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Widget",
        "offers": {
          "@type": "Offer",
          "price": "19.99",
          "priceCurrency": "USD"
        }
      }
      </script>
    `;
    const expected = [
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Widget',
        offers: {
          '@type': 'Offer',
          price: '19.99',
          priceCurrency: 'USD',
        },
      },
    ];

    // Act
    const result = extractStructuredData(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 4: Ignore invalid JSON in script tags
  it('4. should ignore invalid JSON in script tags', () => {
    // Arrange
    const html = `
      <script type="application/ld+json">
      { invalid json here }
      </script>
      <script type="application/ld+json">
      {"@type": "Person", "name": "Valid"}
      </script>
    `;
    const expected = [{ '@type': 'Person', name: 'Valid' }];

    // Act
    const result = extractStructuredData(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 5: Return empty array when no JSON-LD found
  it('5. should return empty array when no JSON-LD found', () => {
    // Arrange
    const html = '<div>No structured data here</div>';
    const expected: unknown[] = [];

    // Act
    const result = extractStructuredData(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 6: Ignore regular script tags
  it('6. should ignore regular script tags (non-JSON-LD)', () => {
    // Arrange
    const html = `
      <script>var x = 123;</script>
      <script type="text/javascript">console.log("test");</script>
      <script type="application/ld+json">
      {"@type": "Event", "name": "Conference"}
      </script>
    `;
    const expected = [{ '@type': 'Event', name: 'Conference' }];

    // Act
    const result = extractStructuredData(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 7: Handle empty script tags
  it('7. should handle empty JSON-LD script tags', () => {
    // Arrange
    const html = `
      <script type="application/ld+json"></script>
      <script type="application/ld+json">{"@type": "Person"}</script>
    `;
    const expected = [{ '@type': 'Person' }];

    // Act
    const result = extractStructuredData(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 8: Extract JSON-LD with arrays
  it('8. should extract JSON-LD containing arrays', () => {
    // Arrange
    const html = `
      <script type="application/ld+json">
      {
        "@type": "ItemList",
        "itemListElement": [
          {"@type": "ListItem", "position": 1},
          {"@type": "ListItem", "position": 2}
        ]
      }
      </script>
    `;
    const expected = [
      {
        '@type': 'ItemList',
        itemListElement: [
          { '@type': 'ListItem', position: 1 },
          { '@type': 'ListItem', position: 2 },
        ],
      },
    ];

    // Act
    const result = extractStructuredData(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 9: Handle HTML with whitespace and formatting
  it('9. should handle JSON-LD with whitespace and formatting', () => {
    // Arrange
    const html = `
      <script type="application/ld+json">
        {
          "@type": "Article",
          "headline": "Test Article"
        }
      </script>
    `;
    const expected = [
      {
        '@type': 'Article',
        headline: 'Test Article',
      },
    ];

    // Act
    const result = extractStructuredData(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 10: Handle empty string input
  it('10. should return empty array for empty HTML', () => {
    // Arrange
    const html = '';
    const expected: unknown[] = [];

    // Act
    const result = extractStructuredData(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 11: Extract JSON-LD with special characters
  it('11. should extract JSON-LD with special characters', () => {
    // Arrange
    const html = `
      <script type="application/ld+json">
      {"@type": "Article", "headline": "Testing \\u0026 Quotes"}
      </script>
    `;
    const expected = [
      {
        '@type': 'Article',
        headline: 'Testing & Quotes',
      },
    ];

    // Act
    const result = extractStructuredData(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 12: Handle JSON-LD with boolean and number values
  it('12. should handle JSON-LD with boolean and number values', () => {
    // Arrange
    const html = `
      <script type="application/ld+json">
      {
        "@type": "Product",
        "inStock": true,
        "price": 29.99,
        "quantity": 100
      }
      </script>
    `;
    const expected = [
      {
        '@type': 'Product',
        inStock: true,
        price: 29.99,
        quantity: 100,
      },
    ];

    // Act
    const result = extractStructuredData(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 13: Handle malformed JSON gracefully
  it('13. should skip malformed JSON and continue processing', () => {
    // Arrange
    const html = `
      <script type="application/ld+json">{ bad json }</script>
      <script type="application/ld+json">{"@type": "Valid"}</script>
      <script type="application/ld+json">{ another bad one }</script>
    `;
    const expected = [{ '@type': 'Valid' }];

    // Act
    const result = extractStructuredData(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 14: Throw TypeError when html is not a string
  it('14. should throw TypeError when html is not a string', () => {
    // Arrange
    const invalidInput = { data: 'test' } as unknown as string;
    const expectedMessage = 'html must be a string, got object';

    // Act & Assert
    expect(() => extractStructuredData(invalidInput)).toThrow(TypeError);
    expect(() => extractStructuredData(invalidInput)).toThrow(expectedMessage);
  });
});
