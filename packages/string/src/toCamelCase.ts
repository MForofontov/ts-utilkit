/**
 * Converts a string to camelCase.
 * Handles space-separated, kebab-case, snake_case, PascalCase, and
 * mixed-delimiter inputs.
 *
 * @param str - The string to convert.
 * @returns The camelCase version of the string.
 *
 * @example
 * toCamelCase('hello world');   // 'helloWorld'
 * toCamelCase('foo-bar-baz');   // 'fooBarBaz'
 * toCamelCase('foo_bar_baz');   // 'fooBarBaz'
 * toCamelCase('FooBarBaz');     // 'fooBarBaz'
 *
 * @example
 * toCamelCase('  multiple   spaces  ');  // 'multipleSpaces'
 * toCamelCase('__snake__case__');        // 'snakeCase'
 *
 * @note Consecutive uppercase letters are treated as a single word component
 * (e.g. "XMLParser" → "xmlParser"). Numbers are preserved in place.
 *
 * @complexity Time: O(n), Space: O(n)
 */
export function toCamelCase(str: string): string {
  return str
    .trim()
    // Insert separator before uppercase letters following lowercase/digit
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    // Insert separator before sequences of uppercase followed by lowercase
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    // Split on whitespace, hyphens, underscores
    .split(/[\s\-_]+/)
    .filter((word) => word.length > 0)
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join('');
}
