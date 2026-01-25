/**
 * Validates if a string is a valid URL slug (URL-friendly string).
 * A valid slug contains only lowercase letters, numbers, and hyphens.
 * It cannot start or end with a hyphen.
 *
 * @param slug - The slug string to validate.
 * @returns True if valid slug, false otherwise.
 *
 * @throws {TypeError} If slug is not a string.
 *
 * @example
 * // Valid slugs
 * isValidSlug("hello-world"); // true
 * isValidSlug("my-blog-post-123"); // true
 * isValidSlug("2024-update"); // true
 * isValidSlug("simple"); // true
 *
 * @example
 * // Invalid slugs
 * isValidSlug("Hello-World"); // false (uppercase)
 * isValidSlug("hello_world"); // false (underscore)
 * isValidSlug("hello world"); // false (space)
 * isValidSlug("-hello"); // false (starts with hyphen)
 * isValidSlug("hello-"); // false (ends with hyphen)
 * isValidSlug("hello--world"); // false (consecutive hyphens)
 * isValidSlug(""); // false (empty)
 *
 * @note Slug format: lowercase letters (a-z), digits (0-9), single hyphens (-)
 * @note Cannot start or end with hyphen
 * @note Cannot contain consecutive hyphens
 * @note Minimum length: 1 character
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function isValidSlug(slug: string): boolean {
  if (typeof slug !== 'string') {
    throw new TypeError(`slug must be a string, got ${typeof slug}`);
  }

  // Empty string is not a valid slug
  if (slug.length === 0) {
    return false;
  }

  // Valid slug: lowercase letters, digits, single hyphens (not at start/end)
  // Cannot have consecutive hyphens
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

  return slugRegex.test(slug);
}
