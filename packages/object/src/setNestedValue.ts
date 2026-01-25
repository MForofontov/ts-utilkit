/**
 * Sets a value at a specified nested path within an object, creating intermediate objects as needed.
 *
 * @param obj - The object to modify.
 * @param path - The dot-notation path where the value should be set (e.g., 'user.address.city').
 * @param value - The value to set at the specified path.
 *
 * @throws {TypeError} If obj is not an object or is null.
 *
 * @example
 * // Update existing nested value
 * const user = { a: { b: { c: 3 } } };
 * setNestedValue(user, 'a.b.c', 4);
 * // user is now: { a: { b: { c: 4 } } }
 *
 * @example
 * // Create missing intermediate objects
 * const data = {};
 * setNestedValue(data, 'user.profile.name', 'John');
 * // data is now: { user: { profile: { name: 'John' } } }
 *
 * @example
 * // Replace primitive with object
 * const config = { theme: 'dark' };
 * setNestedValue(config, 'theme.color', 'blue');
 * // config is now: { theme: { color: 'blue' } }
 *
 * @example
 * // Deep nesting
 * const app = {};
 * setNestedValue(app, 'settings.ui.theme.primary', '#3498db');
 * // app is now: { settings: { ui: { theme: { primary: '#3498db' } } } }
 *
 * @example
 * // Real-world: Update user preferences
 * const userState = { user: { id: 1, name: 'Alice' } };
 * setNestedValue(userState, 'user.preferences.notifications', true);
 * // userState.user.preferences.notifications is now true
 *
 * @note Modifies the original object directly without creating a copy.
 * @note Only supports dot notation and doesn't handle array indices.
 * @note Automatically creates missing intermediate objects in the path.
 * @note Will replace non-object values in the path with empty objects.
 * @note For immutable updates, clone the object first using deepClone().
 *
 * @complexity Time: O(d), Space: O(d) - Where d is the path depth
 */
export function setNestedValue(
  obj: Record<string, unknown>,
  path: string,
  value: unknown,
): void {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('Input must be a non-null object');
  }
  const keys = path.split('.');
  let current: Record<string, unknown> = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (typeof current[keys[i]] !== 'object' || current[keys[i]] === null) {
      current[keys[i]] = {};
    }
    current = current[keys[i]] as Record<string, unknown>;
  }
  current[keys[keys.length - 1]] = value;
}
