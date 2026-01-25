import { fetchHTML } from '../src/fetchHTML';

// Mock global fetch
global.fetch = jest.fn();

/**
 * Unit tests for the fetchHTML function.
 */
describe('fetchHTML', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Normal usage tests
  it('1. should fetch HTML content successfully', async () => {
    // Arrange
    const url = 'https://example.com';
    const html = '<html><body>Test</body></html>';
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      text: jest.fn().mockResolvedValue(html),
    });

    // Act
    const result = await fetchHTML(url);

    // Assert
    expect(result).toBe(html);
    expect(global.fetch).toHaveBeenCalledWith(url, undefined);
  });

  it('2. should fetch HTML with custom options', async () => {
    // Arrange
    const url = 'https://api.example.com';
    const html = '<div>Content</div>';
    const options = {
      headers: { 'User-Agent': 'MyBot/1.0' },
    };
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      text: jest.fn().mockResolvedValue(html),
    });

    // Act
    const result = await fetchHTML(url, options);

    // Assert
    expect(result).toBe(html);
    expect(global.fetch).toHaveBeenCalledWith(url, options);
  });

  it('3. should handle HTTPS URLs', async () => {
    // Arrange
    const url = 'https://secure.example.com';
    const html = '<p>Secure content</p>';
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      text: jest.fn().mockResolvedValue(html),
    });

    // Act
    const result = await fetchHTML(url);

    // Assert
    expect(result).toBe(html);
  });

  it('4. should handle HTTP URLs', async () => {
    // Arrange
    const url = 'http://example.com';
    const html = '<span>Data</span>';
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      text: jest.fn().mockResolvedValue(html),
    });

    // Act
    const result = await fetchHTML(url);

    // Assert
    expect(result).toBe(html);
  });

  it('5. should fetch large HTML content', async () => {
    // Arrange
    const url = 'https://example.com/large-page';
    const html = '<html>' + 'a'.repeat(100000) + '</html>';
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      text: jest.fn().mockResolvedValue(html),
    });

    // Act
    const result = await fetchHTML(url);

    // Assert
    expect(result).toBe(html);
    expect(result.length).toBeGreaterThan(100000);
  });

  // Edge cases
  it('6. should handle empty HTML response', async () => {
    // Arrange
    const url = 'https://example.com/empty';
    const html = '';
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      text: jest.fn().mockResolvedValue(html),
    });

    // Act
    const result = await fetchHTML(url);

    // Assert
    expect(result).toBe('');
  });

  it('7. should handle URL with query parameters', async () => {
    // Arrange
    const url = 'https://example.com/page?id=123&category=test';
    const html = '<div>Query result</div>';
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      text: jest.fn().mockResolvedValue(html),
    });

    // Act
    const result = await fetchHTML(url);

    // Assert
    expect(result).toBe(html);
  });

  it('8. should handle URL with fragments', async () => {
    // Arrange
    const url = 'https://example.com/page#section';
    const html = '<section>Content</section>';
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      text: jest.fn().mockResolvedValue(html),
    });

    // Act
    const result = await fetchHTML(url);

    // Assert
    expect(result).toBe(html);
  });

  it('9. should throw error for 404 status', async () => {
    // Arrange
    const url = 'https://example.com/not-found';
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    // Act & Assert
    await expect(fetchHTML(url)).rejects.toThrow(
      'HTTP error! status: 404 Not Found',
    );
  });

  it('10. should throw error for 500 status', async () => {
    // Arrange
    const url = 'https://example.com/error';
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    // Act & Assert
    await expect(fetchHTML(url)).rejects.toThrow(
      'HTTP error! status: 500 Internal Server Error',
    );
  });

  it('11. should throw error for network failure', async () => {
    // Arrange
    const url = 'https://example.com/network-error';
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    // Act & Assert
    await expect(fetchHTML(url)).rejects.toThrow('Network error');
  });

  // Error cases
  it('12. should throw TypeError when url is not a string', async () => {
    // Arrange
    const url = 123 as unknown as string;
    const expectedMessage = 'url must be a string, got number';

    // Act & Assert
    await expect(fetchHTML(url)).rejects.toThrow(TypeError);
    await expect(fetchHTML(url)).rejects.toThrow(expectedMessage);
  });

  it('13. should throw Error when url is empty', async () => {
    // Arrange
    const url = '';
    const expectedMessage = 'url cannot be empty';

    // Act & Assert
    await expect(fetchHTML(url)).rejects.toThrow(Error);
    await expect(fetchHTML(url)).rejects.toThrow(expectedMessage);
  });

  it('14. should throw Error when url is whitespace only', async () => {
    // Arrange
    const url = '   ';
    const expectedMessage = 'url cannot be empty';

    // Act & Assert
    await expect(fetchHTML(url)).rejects.toThrow(Error);
    await expect(fetchHTML(url)).rejects.toThrow(expectedMessage);
  });
});
