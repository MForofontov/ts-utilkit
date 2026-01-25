/**
 * Reconstructs a nested object from a flat object with dot-notation keys.
 *
 * @param obj - The flat object with dot-notation keys.
 * @returns A nested object structure representing the original hierarchy.
 *
 * @throws {TypeError} If obj is not an object or is null.
 *
 * @example
 * // Basic dot notation
 * unflattenObject({ 'a.b.c': 1, 'a.b.d': 2, 'e': 3 });
 * // { a: { b: { c: 1, d: 2 } }, e: 3 }
 *
 * @example
 * // With nested paths
 * unflattenObject({ 'user.profile.name': 'John', 'user.profile.age': 30, 'user.active': true });
 * // { user: { profile: { name: 'John', age: 30 }, active: true } }
 *
 * @example
 * // Array indices in square brackets
 * unflattenObject({ 'items[0]': 'A', 'items[1]': 'B', 'items[2]': 'C' });
 * // { items: ['A', 'B', 'C'] }
 *
 * @example
 * // Mixed arrays and objects
 * unflattenObject({ 'users[0].name': 'Alice', 'users[1].name': 'Bob', 'count': 2 });
 * // { users: [{ name: 'Alice' }, { name: 'Bob' }], count: 2 }
 *
 * @example
 * // Real-world: Parse flattened database query result
 * const flatResult = {
 *   'order.id': 123,
 *   'order.customer.name': 'John Doe',
 *   'order.items[0].product': 'Laptop',
 *   'order.items[0].quantity': 1
 * };
 * unflattenObject(flatResult);
 * // {
 * //   order: {
 * //     id: 123,
 * //     customer: { name: 'John Doe' },
 * //     items: [{ product: 'Laptop', quantity: 1 }]
 * //   }
 * // }
 *
 * @note Only handles simple dot notation and supports array indices in square brackets.
 * @note If properties conflict during reconstruction, the last one processed will override previous values.
 * @note Doesn't handle escaped dots in property names.
 * @note Similar to fromDotNotation but simpler implementation.
 * @note Useful for expanding query results and configuration data.
 *
 * @complexity Time: O(n * d), Space: O(n) - Where n is keys, d is average depth
 */
export function unflattenObject(
  obj: Record<string, unknown>,
): Record<string, unknown> {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('Input must be a non-null object');
  }

  const result: Record<string, unknown> = {};

  for (const [flatKey, value] of Object.entries(obj)) {
    const parts = flatKey.replace(/\[(\d+)\]/g, '.$1').split('.');
    let current: Record<string, unknown> | unknown[] = result;

    parts.forEach((part, idx) => {
      const isLast = idx === parts.length - 1;
      const nextIsIndex = /^\d+$/.test(parts[idx + 1]);
      const isIndex = /^\d+$/.test(part);

      if (isLast) {
        if (isIndex) {
          if (!Array.isArray(current)) {
            current = [];
          }
          current[Number(part)] = value;
        } else {
          (current as Record<string, unknown>)[part] = value;
        }
      } else if (isIndex) {
        if (!Array.isArray(current)) {
          current = [];
        }
        const arr = current;
        if (!arr[Number(part)] || typeof arr[Number(part)] !== 'object') {
          arr[Number(part)] = nextIsIndex ? [] : {};
        }
        current = arr[Number(part)] as Record<string, unknown> | unknown[];
      } else {
        const objRef = current as Record<string, unknown>;
        if (!objRef[part] || typeof objRef[part] !== 'object') {
          objRef[part] = nextIsIndex ? [] : {};
        }
        current = objRef[part] as Record<string, unknown> | unknown[];
      }
    });
  }

  return result;
}
