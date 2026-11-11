/**
 * Joins multiple URL path segments into a single normalized path.
 * Handles leading/trailing slashes automatically.
 *
 * @param paths - Path segments to join.
 * @returns A normalized joined path.
 *
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
 * @note Collapses literal slash runs inside and between segments.
 * @note Preserves encoded slashes, dot segments, and the first segment's leading-slash choice.
 *
 * @complexity Time: O(n), Space: O(n)
 */
export function joinURLPaths(...paths: string[]): string {
  // Input validation
  if (paths.length === 0) {
    throw new Error('At least one path segment is required');
  }

  // Track if the original first path started with /
  const startsWithSlash = paths[0].startsWith('/');

  // Join and normalize
  const joined = paths
    .join('/')
    .replace(/\/+/g, '/')
    .replace(/^\/|\/$/g, '');

  // Restore leading slash if original had it
  return startsWithSlash ? `/${joined}` : joined;
}
