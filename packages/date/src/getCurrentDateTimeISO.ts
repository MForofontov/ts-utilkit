/**
 * Gets the current date and time in ISO 8601 format (UTC timezone).
 *
 * @returns The current date and time as an ISO 8601 string in UTC timezone.
 *
 * @example
 * // Get current timestamp
 * getCurrentDateTimeISO(); // '2025-12-02T15:45:30.123Z'
 *
 * @example
 * // Use for logging
 * console.log(`Event at ${getCurrentDateTimeISO()}`);
 * // Output: "Event at 2025-12-02T15:45:30.123Z"
 *
 * @example
 * // Store in database
 * const record = {
 *   id: 1,
 *   createdAt: getCurrentDateTimeISO()
 * };
 *
 * @example
 * // Compare timestamps
 * const timestamp1 = getCurrentDateTimeISO();
 * // ... some operation ...
 * const timestamp2 = getCurrentDateTimeISO();
 * // timestamp2 > timestamp1
 *
 * @note Returns timestamp in UTC timezone (indicated by 'Z' suffix).
 * @note Format: YYYY-MM-DDTHH:mm:ss.sssZ (ISO 8601 standard).
 * @note Includes milliseconds for precision.
 * @note Ideal for logging, database storage, and API responses.
 * @note Timezone-independent; always returns UTC time.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function getCurrentDateTimeISO(): string {
  return new Date().toISOString();
}
