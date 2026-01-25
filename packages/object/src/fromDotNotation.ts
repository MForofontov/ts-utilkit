/**
 * Reconstructs a nested object structure from a flat object with dot or square bracket notation keys.
 * Handles arrays, nested objects, and escaped special characters.
 *
 * @param obj - The flat object with dot or square bracket notation keys.
 * @returns A nested object structure preserving the original hierarchy.
 *
 * @throws {TypeError} If obj is not an object or is null.
 *
 * @example
 * // Basic dot notation
 * fromDotNotation({ 'user.name': 'John', 'user.address.city': 'NY' });
 * // { user: { name: 'John', address: { city: 'NY' } } }
 *
 * @example
 * // Array indices with square brackets
 * fromDotNotation({ 'items[0].name': 'Laptop', 'items[1].name': 'Phone' });
 * // { items: [{ name: 'Laptop' }, { name: 'Phone' }] }
 *
 * @example
 * // Escaped dots in property names
 * fromDotNotation({ 'config\\.dev.port': 3000 });
 * // { 'config.dev': { port: 3000 } }
 *
 * @example
 * // Mixed arrays and objects
 * fromDotNotation({ 'users[0].name': 'Alice', 'users[0].age': 30, 'count': 1 });
 * // { users: [{ name: 'Alice', age: 30 }], count: 1 }
 *
 * @example
 * // Real-world: Reconstruct from flattened form data
 * const formData = {
 *   'profile.firstName': 'John',
 *   'profile.lastName': 'Doe',
 *   'addresses[0].street': '123 Main St',
 *   'addresses[0].city': 'NYC'
 * };
 * fromDotNotation(formData);
 * // {
 * //   profile: { firstName: 'John', lastName: 'Doe' },
 * //   addresses: [{ street: '123 Main St', city: 'NYC' }]
 * // }
 *
 * @note Array indices in square brackets create array elements at the specified positions.
 * @note Dots can be escaped with backslashes to represent literal dots in property names.
 * @note Opposite operation of flattenObject().
 * @note Automatically detects whether to create arrays or objects based on next key.
 * @note Useful for form data parsing and API request handling.
 *
 * @complexity Time: O(n * d), Space: O(n) - Where n is keys, d is average path depth
 */
export function fromDotNotation(
  obj: Record<string, unknown>,
): Record<string, unknown> {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('Input must be a non-null object');
  }

  const result: Record<string, unknown> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const parts = key
        .replace(/\\\./g, '\u0000') // Temporarily replace escaped dots
        .replace(/\[(\d+)\]/g, '.$1') // Convert array indices to dot notation
        .split('.')
        // eslint-disable-next-line no-control-regex -- Restoring escaped dots from placeholder
        .map((part) => part.replace(/\u0000/g, '.')); // Restore escaped dots

      let current = result;

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        const cleanPart = part.replace(/\\\\/g, '\\');
        const isLast = i === parts.length - 1;

        if (isLast) {
          current[cleanPart] = obj[key];
        } else {
          if (!current[cleanPart] || typeof current[cleanPart] !== 'object') {
            // Create an array if the next part is a numeric index
            current[cleanPart] = /^\d+$/.test(parts[i + 1]) ? [] : {};
          }
          current = current[cleanPart] as Record<string, unknown>;
        }
      }
    }
  }

  return result;
}
