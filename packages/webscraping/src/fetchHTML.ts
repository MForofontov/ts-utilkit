/**
 * Fetches HTML content from a URL.
 *
 * @param url - The URL to fetch HTML from.
 * @param options - Optional fetch options (headers, timeout, etc.).
 * @returns Promise resolving to the HTML content as a string.
 *
 * @throws {TypeError} If url is not a string.
 * @throws {Error} If url is empty or invalid.
 * @throws {Error} If fetch fails or returns non-OK status.
 *
 * @example
 * const html = await fetchHTML('https://example.com');
 * console.log(html); // Full HTML content
 *
 * @example
 * // With custom headers
 * const html = await fetchHTML('https://api.example.com', {
 *   headers: { 'User-Agent': 'MyBot/1.0' }
 * });
 *
 * @complexity Time: O(n) where n is response size, Space: O(n)
 */
export async function fetchHTML(
  url: string,
  options?: RequestInit,
): Promise<string> {
  if (typeof url !== 'string') {
    throw new TypeError(`url must be a string, got ${typeof url}`);
  }
  if (url.trim() === '') {
    throw new Error('url cannot be empty');
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} ${response.statusText}`,
      );
    }

    return await response.text();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Failed to fetch HTML: ${String(error)}`);
  }
}
