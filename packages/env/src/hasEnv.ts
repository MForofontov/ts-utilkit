/**
 * Checks whether an environment variable is set to a non-empty value.
 *
 * Unlike `getEnv` or `requireEnv`, this function never throws for a missing
 * variable — it simply returns `false`. This makes it safe to use in feature
 * flags, conditional configuration branches, and startup health checks where
 * absence is an expected and handled state.
 *
 * @param key - The environment variable name to check.
 * @returns `true` if the variable exists and its value is a non-empty string,
 *   `false` if the variable is absent or set to an empty string.
 *
 * @throws {Error} If key is an empty string.
 *
 * @example
 * // Feature flag check
 * if (hasEnv('ENABLE_FEATURE_X')) {
 *   enableFeatureX();
 * }
 *
 * @example
 * // Conditional configuration
 * const useTLS = hasEnv('TLS_CERT_PATH') && hasEnv('TLS_KEY_PATH');
 *
 * @example
 * // Returns false for unset or empty vars
 * // process.env.MISSING is undefined
 * hasEnv('MISSING'); // false
 * // process.env.EMPTY = ''
 * hasEnv('EMPTY'); // false
 * // process.env.SET = 'value'
 * hasEnv('SET'); // true
 *
 * @note A variable set to an empty string (`''`) is treated as absent.
 * @note This function is purely a boolean existence check — use `getEnv` to
 *   retrieve the actual value.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function hasEnv(key: string): boolean {
  if (key.length === 0) {
    throw new Error('key cannot be an empty string');
  }

  const value = process.env[key];
  return value !== undefined && value !== '';
}
