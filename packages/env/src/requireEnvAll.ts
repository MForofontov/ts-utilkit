/**
 * Requires that all of the specified environment variables are set to non-empty
 * values, throwing a single descriptive error that lists every missing variable.
 *
 * Unlike calling `requireEnv` in a loop — which throws on the first missing
 * variable and hides the rest — `requireEnvAll` collects every missing key and
 * reports them all at once. This gives developers a complete picture of what
 * needs to be configured instead of playing whack-a-mole with one variable at
 * a time on startup.
 *
 * @param keys - An array of environment variable names that must all be set.
 * @returns A record mapping each key to its (non-empty) string value.
 *
 * @throws {Error} If keys is empty.
 * @throws {Error} If any key is an empty string.
 * @throws {Error} If one or more variables are not set, reporting all missing keys.
 *
 * @example
 * // Ensure all required DB and auth vars are present at startup
 * const config = requireEnvAll(['DATABASE_URL', 'JWT_SECRET', 'API_KEY']);
 * // config.DATABASE_URL, config.JWT_SECRET, config.API_KEY are all strings
 *
 * @example
 * // Multiple missing vars reported together
 * // DATABASE_URL and JWT_SECRET are both unset
 * requireEnvAll(['DATABASE_URL', 'JWT_SECRET', 'PORT']);
 * // Throws: "Missing required environment variables: DATABASE_URL, JWT_SECRET"
 *
 * @example
 * // Single missing var
 * requireEnvAll(['PORT', 'HOST']);
 * // Throws: "Missing required environment variables: HOST"
 *
 * @note A variable set to an empty string is treated as missing.
 * @note The returned record is typed as `Record<string, string>` — every value
 *   is guaranteed to be a non-empty string.
 * @note Prefer this over calling `requireEnv` multiple times when you need all
 *   vars present before the application can start.
 *
 * @complexity Time: O(n), Space: O(n) where n is the number of keys
 */
export function requireEnvAll(keys: string[]): Record<string, string> {

  if (keys.length === 0) {
    throw new Error('keys array cannot be empty');
  }

  for (const key of keys) {
    if (key.length === 0) {
      throw new Error('keys array must not contain empty strings');
    }
  }

  const missing: string[] = [];
  const result: Record<string, string> = {};

  for (const key of keys) {
    const value = process.env[key];
    if (value === undefined || value === '') {
      missing.push(key);
    } else {
      result[key] = value;
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`,
    );
  }

  return result;
}
