import { _parseURL } from './_parseURL';

/**
 * Sets or replaces the fragment (hash) of a URL and returns the updated URL string.
 * Pass an empty string to remove the fragment entirely.
 *
 * @param url - The URL string to modify.
 * @param fragment - The new fragment value. May optionally include the leading "#".
 *   Pass an empty string to clear the existing fragment.
 * @returns The updated URL string with the new fragment applied.
 *
 * @throws {TypeError} If url is not a string.
 * @throws {TypeError} If fragment is not a string.
 * @throws {Error} If url is not a valid absolute URL.
 *
 * @example
 * // Set a new fragment on a URL with none
 * setURLFragment('https://example.com/page', 'section');
 * // 'https://example.com/page#section'
 *
 * @example
 * // Replace an existing fragment
 * setURLFragment('https://example.com/page#old', 'new');
 * // 'https://example.com/page#new'
 *
 * @example
 * // Clear the fragment by passing an empty string
 * setURLFragment('https://example.com/page#section', '');
 * // 'https://example.com/page'
 *
 * @example
 * // Works with query strings present
 * setURLFragment('https://example.com?page=1', 'results');
 * // 'https://example.com/?page=1#results'
 *
 * @note The fragment value may be passed with or without a leading "#".
 * The URL constructor normalises the output, so the result always includes
 * the "#" prefix when a non-empty fragment is set.
 *
 * @complexity Time: O(n), Space: O(n)
 */
export function setURLFragment(url: string, fragment: string): string {
  if (typeof fragment !== 'string') {
    throw new TypeError(`fragment must be a string, got ${typeof fragment}`);
  }
  const urlObj = _parseURL(url);
  urlObj.hash = fragment;
  return urlObj.toString();
}
