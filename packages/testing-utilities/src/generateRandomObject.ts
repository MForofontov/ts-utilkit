/**
 * Generates a random object with specified structure for testing.
 *
 * @template T - The type of object to generate.
 * @param schema - Schema defining the object structure and value generators.
 * @returns Random object matching the schema.
 *
 * @example
 * const user = generateRandomObject({
 *   id: () => Math.floor(Math.random() * 1000),
 *   name: () => `User${Math.random().toString(36).substring(7)}`,
 *   active: () => Math.random() > 0.5,
 * });
 * // Returns: { id: 742, name: "Userf3a2", active: true }
 *
 * @example
 * const product = generateRandomObject({
 *   id: () => Math.random().toString(36).substring(2),
 *   price: () => Number((Math.random() * 100).toFixed(2)),
 *   tags: () => ['new', 'featured'].filter(() => Math.random() > 0.5),
 * });
 *
 * @complexity Time: O(n) where n is number of properties, Space: O(n)
 */
export function generateRandomObject<
  T extends Record<string, unknown>,
>(schema: { [K in keyof T]: () => T[K] }): T {
  const result = {} as T;

  for (const key in schema) {
    if (Object.prototype.hasOwnProperty.call(schema, key)) {
      result[key] = schema[key]();
    }
  }

  return result;
}
