/**
 * Joins multiple URL path segments into a single normalized path.
 * Handles leading/trailing slashes automatically.
 *
 * @param paths - Path segments to join.
 * @returns A normalized joined path.
 *
 * @throws {TypeError} If any path segment is not a string.
 * @throws {Error} If no path segments are provided.
 *
 * @example
 * // Basic joining
 * joinURLPaths('/api', 'users', '123');
 * // Returns: '/api/users/123'
 *
 * @example
 * // Handle extra slashes
 * joinURLPaths('/api/', '/users/', '/123/');
 * // Returns: '/api/users/123'
 *
 * @example
 * // Relative paths
 * joinURLPaths('api', 'users');
 * // Returns: 'api/users'
 *
 * @note Removes duplicate slashes and normalizes the path.
 *
 * @complexity Time: O(n), Space: O(n)
 */
export function joinURLPaths(...paths: string[]): string {
  // Input validation
  if (paths.length === 0) {
    throw new Error('At least one path segment is required');
  }

  for (const path of paths) {
    if (typeof path !== 'string') {
      throw new TypeError(`All paths must be strings, got ${typeof path}`);
    }
  }

  // Track if the original first path started with /
  const startsWithSlash = paths[0].startsWith('/');

  // Join and normalize
  const joined = paths
    .map((path) => path.replace(/^\/+|\/+$/g, '')) // Remove leading/trailing slashes
    .filter((path) => path.length > 0) // Remove empty segments
    .join('/');

  // Restore leading slash if original had it
  return startsWithSlash ? `/${joined}` : joined;
}
