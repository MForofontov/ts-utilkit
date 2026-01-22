import { joinURLPaths } from '../src/joinURLPaths';

/**
 * Unit tests for the joinURLPaths function.
 */
describe('joinURLPaths', () => {
  // Test case 1: Join basic segments with leading slash
  it('1. should join basic path segments', () => {
    const result = joinURLPaths('/api', 'users', '123');
    expect(result).toBe('/api/users/123');
  });

  // Test case 2: Trim trailing slashes in segments
  it('2. should handle trailing slashes', () => {
    const result = joinURLPaths('/api/', 'users/', '123/');
    expect(result).toBe('/api/users/123');
  });

  // Test case 3: Trim leading slashes in subsequent segments
  it('3. should handle leading slashes', () => {
    const result = joinURLPaths('/api', '/users', '/123');
    expect(result).toBe('/api/users/123');
  });

  // Test case 4: Trim slashes at both ends of segments
  it('4. should handle both leading and trailing slashes', () => {
    const result = joinURLPaths('/api/', '/users/', '/123/');
    expect(result).toBe('/api/users/123');
  });

  // Test case 5: Work with relative paths
  it('5. should handle relative paths', () => {
    const result = joinURLPaths('api', 'users', '123');
    expect(result).toBe('api/users/123');
  });

  // Test case 6: Preserve leading slash from the first argument
  it('6. should preserve leading slash from first segment', () => {
    const result = joinURLPaths('/api', 'users');
    expect(result).toBe('/api/users');
  });

  // Test case 7: Avoid adding a slash to relative roots
  it('7. should not add leading slash if first segment is relative', () => {
    const result = joinURLPaths('api', 'users');
    expect(result).toBe('api/users');
  });

  // Test case 8: Handle single segment inputs
  it('8. should handle single segment', () => {
    const result = joinURLPaths('/api');
    expect(result).toBe('/api');
  });

  // Test case 9: Skip empty intermediate segments
  it('9. should handle empty strings in segments', () => {
    const result = joinURLPaths('/api', '', 'users');
    expect(result).toBe('/api/users');
  });

  // Test case 10: Throw when no segments are provided
  it('10. should throw Error when no segments provided', () => {
    expect(() => joinURLPaths()).toThrow(Error);
    expect(() => joinURLPaths()).toThrow(
      'At least one path segment is required',
    );
  });

  // Test case 11: Throw when a non-string segment is passed
  it('11. should throw TypeError for non-string segment', () => {
    const segment = 123 as unknown as string;
    expect(() => joinURLPaths('/api', segment, 'users')).toThrow(TypeError);
    expect(() => joinURLPaths('/api', segment, 'users')).toThrow(
      'All paths must be strings',
    );
  });

  // Test case 12: Collapse multiple consecutive slashes
  it('12. should handle multiple consecutive slashes', () => {
    const result = joinURLPaths('/api//', '//users//', '//123');
    expect(result).toBe('/api/users/123');
  });

  // Test case 13: Combine many nested segments
  it('13. should handle complex nested paths', () => {
    const result = joinURLPaths(
      '/api',
      'v2',
      'resources',
      'users',
      '123',
      'profile',
    );
    expect(result).toBe('/api/v2/resources/users/123/profile');
  });

  // Test case 14: Retain dots inside segments
  it('14. should handle path with dots', () => {
    const result = joinURLPaths('/api', 'v1.0', 'users');
    expect(result).toBe('/api/v1.0/users');
  });

  // Test case 15: Retain hyphenated and underscored names
  it('15. should handle path with dashes and underscores', () => {
    const result = joinURLPaths('/api', 'user-profile', 'get_data');
    expect(result).toBe('/api/user-profile/get_data');
  });

  // Test case 16: Support two-segment relative paths
  it('16. should handle two segments', () => {
    const result = joinURLPaths('api', 'users');
    expect(result).toBe('api/users');
  });

  // Test case 17: Ignore empty trailing segments
  it('17. should handle all empty segments except first', () => {
    const result = joinURLPaths('/api', '', '', '');
    expect(result).toBe('/api');
  });

  // Test case 18: Normalize mixed relative and absolute-like segments
  it('18. should handle mixed relative and absolute-like segments', () => {
    const result = joinURLPaths('api', '/users/', 'profile/');
    expect(result).toBe('api/users/profile');
  });

  // Test case 19: Join single-character segments
  it('19. should handle single character segments', () => {
    const result = joinURLPaths('/a', 'b', 'c');
    expect(result).toBe('/a/b/c');
  });

  // Test case 20: Allow special characters within segments
  it('20. should handle segments with special characters', () => {
    const result = joinURLPaths('/api', 'user-name', 'file.json');
    expect(result).toBe('/api/user-name/file.json');
  });
});
