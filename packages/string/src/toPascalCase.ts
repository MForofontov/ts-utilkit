/**
 * Converts a string to PascalCase (also known as UpperCamelCase).
 * Handles space-separated, kebab-case, snake_case, camelCase, and
 * mixed-delimiter inputs.
 *
 * @param str - The string to convert.
 * @returns The PascalCase version of the string.
 *
 * @example
 * toPascalCase('hello world');   // 'HelloWorld'
 * toPascalCase('foo-bar-baz');   // 'FooBarBaz'
 * toPascalCase('foo_bar_baz');   // 'FooBarBaz'
 * toPascalCase('fooBarBaz');     // 'FooBarBaz'
 *
 * @example
 * toPascalCase('  multiple   spaces  ');  // 'MultipleSpaces'
 * toPascalCase('__snake__case__');        // 'SnakeCase'
 *
 * @note Useful for generating class names, React component names, and TypeScript
 * interface names from identifier strings.
 *
 * @complexity Time: O(n), Space: O(n)
 */
export function toPascalCase(str: string): string {
  return (
    str
      .trim()
      // Insert separator before uppercase letters following lowercase/digit
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      // Insert separator before sequences of uppercase followed by lowercase
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
      // Split on whitespace, hyphens, underscores
      .split(/[\s\-_]+/)
      .filter((word) => word.length > 0)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('')
  );
}
