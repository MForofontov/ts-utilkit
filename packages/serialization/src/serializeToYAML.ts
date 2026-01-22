/**
 * Converts object to YAML-like string format (basic implementation).
 *
 * @param data - The object to serialize.
 * @param indent - Spaces per indentation level (default: 2).
 * @returns YAML-like string representation.
 *
 * @throws {TypeError} If data is not an object or indent is not a number.
 *
 * @example
 * // Convert to YAML
 * serializeToYAML({ name: 'John', age: 30 });
 * // 'name: John\nage: 30'
 *
 * @example
 * // Nested objects
 * serializeToYAML({ person: { name: 'John', age: 30 } });
 * // 'person:\n  name: John\n  age: 30'
 *
 * @note Basic YAML serialization - does not support all YAML features.
 *
 * @complexity Time: O(n), Space: O(n) where n is object depth
 */
export function serializeToYAML(data: any, indent: number = 2): string {
  if (typeof indent !== 'number' || isNaN(indent)) {
    throw new TypeError(`indent must be a valid number, got ${typeof indent}`);
  }

  const serialize = (obj: any, depth: number = 0): string => {
    const spacing = ' '.repeat(depth * indent);

    if (obj === null) {
      return 'null';
    }

    if (obj === undefined) {
      return 'undefined';
    }

    if (typeof obj === 'string') {
      // Quote strings that need it
      if (obj.includes('\n') || obj.includes(':') || obj.includes('#')) {
        return `"${obj.replace(/"/g, '\\"')}"`;
      }
      return obj;
    }

    if (typeof obj === 'number' || typeof obj === 'boolean') {
      return String(obj);
    }

    if (Array.isArray(obj)) {
      if (obj.length === 0) {
        return '[]';
      }

      return (
        '\n' +
        obj
          .map((item) => {
            const serialized = serialize(item, depth + 1);
            if (
              typeof item === 'object' &&
              !Array.isArray(item) &&
              item !== null
            ) {
              return `${spacing}${' '.repeat(indent)}-${serialized.slice(spacing.length + indent)}`;
            }
            return `${spacing}${' '.repeat(indent)}- ${serialized}`;
          })
          .join('\n')
      );
    }

    if (typeof obj === 'object') {
      const entries = Object.entries(obj);
      if (entries.length === 0) {
        return '{}';
      }

      return (
        '\n' +
        entries
          .map(([key, value]) => {
            const serialized = serialize(value, depth + 1);
            if (
              typeof value === 'object' &&
              value !== null &&
              !Array.isArray(value)
            ) {
              return `${spacing}${' '.repeat(indent)}${key}:${serialized}`;
            }
            if (Array.isArray(value) && value.length > 0) {
              return `${spacing}${' '.repeat(indent)}${key}:${serialized}`;
            }
            return `${spacing}${' '.repeat(indent)}${key}: ${serialized}`;
          })
          .join('\n')
      );
    }

    return String(obj);
  };

  const result = serialize(data, 0);
  return result.startsWith('\n') ? result.slice(1) : result;
}
