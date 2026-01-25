/**
 * Validates if a string represents a valid UUID (Universally Unique Identifier).
 *
 * @param uuid - The UUID string to validate.
 * @param version - The UUID version to validate (1, 3, 4, or 5). If not specified, validates any version.
 * @returns True if the UUID is valid, false otherwise.
 *
 * @throws {TypeError} If uuid is not a string or version is not a number.
 * @throws {Error} If version is not 1, 3, 4, or 5.
 *
 * @example
 * // Valid UUIDs
 * isValidUUID("123e4567-e89b-12d3-a456-426614174000"); // true (v1)
 * isValidUUID("6ba7b810-9dad-11d1-80b4-00c04fd430c8"); // true (v1)
 * isValidUUID("6ba7b811-9dad-11d1-80b4-00c04fd430c8", 1); // true (v1 specific)
 * isValidUUID("550e8400-e29b-41d4-a716-446655440000", 4); // true (v4 specific)
 *
 * @example
 * // Invalid UUIDs
 * isValidUUID("invalid-uuid"); // false
 * isValidUUID("123e4567-e89b-12d3-a456-42661417400"); // false (wrong length)
 * isValidUUID("123e4567-e89b-12d3-a456-426614174000", 2); // false (unsupported version)
 *
 * @note Supports UUID versions 1, 3, 4, and 5. Version 2 is not commonly used.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function isValidUUID(uuid: string, version?: number): boolean {
  if (typeof uuid !== 'string') {
    throw new TypeError(`uuid must be a string, got ${typeof uuid}`);
  }

  if (version !== undefined) {
    if (typeof version !== 'number' || isNaN(version)) {
      throw new TypeError(`version must be a number, got ${typeof version}`);
    }

    if (![1, 3, 4, 5].includes(version)) {
      throw new Error('version must be 1, 3, 4, or 5');
    }
  }

  // UUID format: xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
  // where M is the version digit and N is the variant bits
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  if (!uuidRegex.test(uuid)) {
    return false;
  }

  // If version is specified, check the version digit
  if (version !== undefined) {
    const versionDigit = parseInt(uuid.charAt(14), 16);
    if (versionDigit !== version) {
      return false;
    }
  }

  // Check variant bits (first hex digit of 4th group should be 8, 9, A, or B)
  const variantDigit = uuid.charAt(19).toLowerCase();
  if (!['8', '9', 'a', 'b'].includes(variantDigit)) {
    return false;
  }

  return true;
}
