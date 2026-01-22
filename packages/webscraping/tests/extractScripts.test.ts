import { extractScripts } from '../src/extractScripts';

/**
 * Unit tests for the extractScripts function.
 */
describe('extractScripts', () => {
  // Test case 1: Extract inline script
  it('1. should extract inline script content', () => {
    // Arrange
    const html = '<script>console.log("test");</script>';
    const expected = [
      {
        inline: 'console.log("test");',
        async: false,
        defer: false,
      },
    ];

    // Act
    const result = extractScripts(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 2: Extract external script with src
  it('2. should extract external script with src attribute', () => {
    // Arrange
    const html = '<script src="https://example.com/script.js"></script>';
    const expected = [
      {
        src: 'https://example.com/script.js',
        async: false,
        defer: false,
      },
    ];

    // Act
    const result = extractScripts(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 3: Extract script with type attribute
  it('3. should extract script with type attribute', () => {
    // Arrange
    const html = '<script type="module">import x from "y";</script>';
    const expected = [
      {
        inline: 'import x from "y";',
        type: 'module',
        async: false,
        defer: false,
      },
    ];

    // Act
    const result = extractScripts(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 4: Extract async script
  it('4. should extract async script', () => {
    // Arrange
    const html = '<script src="app.js" async></script>';
    const expected = [
      {
        src: 'app.js',
        async: true,
        defer: false,
      },
    ];

    // Act
    const result = extractScripts(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 5: Extract deferred script
  it('5. should extract deferred script', () => {
    // Arrange
    const html = '<script src="app.js" defer></script>';
    const expected = [
      {
        src: 'app.js',
        async: false,
        defer: true,
      },
    ];

    // Act
    const result = extractScripts(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 6: Extract script with all attributes
  it('6. should extract script with all attributes', () => {
    // Arrange
    const html = '<script src="main.js" type="module" async defer></script>';
    const expected = [
      {
        src: 'main.js',
        type: 'module',
        async: true,
        defer: true,
      },
    ];

    // Act
    const result = extractScripts(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 7: Extract multiple scripts
  it('7. should extract multiple scripts', () => {
    // Arrange
    const html = `
      <script>var x = 1;</script>
      <script src="lib.js"></script>
      <script type="module">import "./module.js";</script>
    `;
    const expected = [
      {
        inline: 'var x = 1;',
        async: false,
        defer: false,
      },
      { src: 'lib.js', async: false, defer: false },
      {
        inline: 'import "./module.js";',
        type: 'module',
        async: false,
        defer: false,
      },
    ];

    // Act
    const result = extractScripts(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 8: Handle empty script tags
  it('8. should handle empty script tags', () => {
    // Arrange
    const html = '<script></script>';
    const expected = [{ async: false, defer: false }];

    // Act
    const result = extractScripts(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 9: Extract JSON-LD script type
  it('9. should extract application/ld+json script type', () => {
    // Arrange
    const html =
      '<script type="application/ld+json">{"@type": "Person"}</script>';
    const expected = [
      {
        inline: '{"@type": "Person"}',
        type: 'application/ld+json',
        async: false,
        defer: false,
      },
    ];

    // Act
    const result = extractScripts(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 10: Return empty array when no scripts found
  it('10. should return empty array when no scripts found', () => {
    // Arrange
    const html = '<div>No scripts here</div>';
    const expected: ReturnType<typeof extractScripts> = [];

    // Act
    const result = extractScripts(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 11: Extract script with multiline content
  it('11. should extract script with multiline content', () => {
    // Arrange
    const html = `
      <script>
        function test() {
          return 42;
        }
      </script>
    `;
    const expected = [
      {
        inline: 'function test() {\n          return 42;\n        }',
        async: false,
        defer: false,
      },
    ];

    // Act
    const result = extractScripts(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 12: Handle empty string input
  it('12. should return empty array for empty HTML', () => {
    // Arrange
    const html = '';
    const expected: ReturnType<typeof extractScripts> = [];

    // Act
    const result = extractScripts(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 13: Extract script with relative src
  it('13. should extract script with relative src path', () => {
    // Arrange
    const html = '<script src="../js/app.js"></script>';
    const expected = [
      {
        src: '../js/app.js',
        async: false,
        defer: false,
      },
    ];

    // Act
    const result = extractScripts(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 14: Handle script with special characters in content
  it('14. should handle script with special characters in content', () => {
    // Arrange
    const html = '<script>var str = "<div>Test</div>";</script>';
    const expected = [
      {
        inline: 'var str = "<div>Test</div>";',
        async: false,
        defer: false,
      },
    ];

    // Act
    const result = extractScripts(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 15: Throw TypeError when html is not a string
  it('15. should throw TypeError when html is not a string', () => {
    // Arrange
    const invalidInput = { html: '<script></script>' } as unknown as string;
    const expectedMessage = 'html must be a string, got object';

    // Act & Assert
    expect(() => extractScripts(invalidInput)).toThrow(TypeError);
    expect(() => extractScripts(invalidInput)).toThrow(expectedMessage);
  });
});
