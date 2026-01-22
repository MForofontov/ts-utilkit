import { generateRandomURL } from '../src/generateRandomURL';

/**
 * Unit tests for the generateRandomURL function.
 */
describe('generateRandomURL', () => {
  // Test case 1: Generate HTTPS URL by default
  it('1. should generate HTTPS URL by default', () => {
    // Act
    const result = generateRandomURL();

    // Assert
    expect(result).toMatch(/^https:\/\//);
  });

  // Test case 2: Generate HTTP URL when requested
  it('2. should generate HTTP URL when secure is false', () => {
    // Act
    const result = generateRandomURL(false);

    // Assert
    expect(result).toMatch(/^http:\/\//);
  });

  // Test case 3: URL has valid structure
  it('3. should have valid URL structure', () => {
    // Act
    const result = generateRandomURL();

    // Assert
    expect(result).toMatch(
      /^https?:\/\/[a-z0-9]+\.(com|org|net|io)\/[a-z0-9]+$/,
    );
  });

  // Test case 4: Contains valid domain
  it('4. should contain valid domain extension', () => {
    // Act
    const result = generateRandomURL();

    // Assert
    const validExtensions = ['.com', '.org', '.net', '.io'];
    const hasValidExtension = validExtensions.some((ext) =>
      result.includes(ext),
    );
    expect(hasValidExtension).toBe(true);
  });

  // Test case 5: Different calls produce different URLs
  it('5. should generate different URLs on each call', () => {
    // Act
    const url1 = generateRandomURL();
    const url2 = generateRandomURL();
    const url3 = generateRandomURL();

    // Assert
    expect(url1).not.toBe(url2);
    expect(url2).not.toBe(url3);
    expect(url1).not.toBe(url3);
  });

  // Test case 6: Has subdomain and path
  it('6. should have subdomain and path components', () => {
    // Act
    const result = generateRandomURL();

    // Assert
    const urlParts = result.replace(/^https?:\/\//, '').split('/');
    expect(urlParts.length).toBeGreaterThanOrEqual(2);
    expect(urlParts[0].includes('.')).toBe(true); // Has domain
    expect(urlParts[1].length).toBeGreaterThan(0); // Has path
  });

  // Test case 7: HTTPS URLs are secure
  it('7. should generate secure URLs with https', () => {
    // Act
    const result = generateRandomURL(true);

    // Assert
    expect(result.startsWith('https://')).toBe(true);
  });
});
