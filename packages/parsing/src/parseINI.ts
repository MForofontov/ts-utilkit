/**
 * Parses an INI file string into a structured object.
 * Supports sections, key-value pairs, and comments.
 *
 * @param input - The INI file content as a string.
 * @returns An object with sections as keys, each containing key-value pairs.
 *
 * @throws {TypeError} If input is not a string.
 * @throws {Error} If input is empty.
 * @throws {Error} If a key-value pair is invalid.
 *
 * @example
 * // Basic usage
 * const ini = `
 * [database]
 * host=localhost
 * port=5432
 * [server]
 * port=8080
 * `;
 * parseINI(ini);
 * // Returns {
 * //   database: { host: "localhost", port: "5432" },
 * //   server: { port: "8080" }
 * // }
 *
 * @example
 * // With comments
 * const ini = `
 * ; This is a comment
 * [app]
 * name=MyApp # Inline comment
 * `;
 * parseINI(ini);
 * // Returns { app: { name: "MyApp" } }
 *
 * @example
 * // Without sections (global section)
 * parseINI("key=value\nfoo=bar");
 * // Returns { _global: { key: "value", foo: "bar" } }
 *
 * @note Comments start with `;` or `#`.
 * Section names are enclosed in square brackets `[section]`.
 * Keys before any section are placed in a `_global` section.
 * Whitespace around keys, values, and section names is trimmed.
 *
 * @complexity Time: O(n), Space: O(n) - Where n is the length of input string
 */
export function parseINI(
  input: string,
): Record<string, Record<string, string>> {
  // Input validation
  if (typeof input !== 'string') {
    throw new TypeError(`input must be a string, got ${typeof input}`);
  }

  if (input.length === 0) {
    throw new Error('input string cannot be empty');
  }

  const result: Record<string, Record<string, string>> = {};
  let currentSection = '_global';
  result[currentSection] = {};

  const lines = input.split(/\r?\n/);

  for (let lineNum = 0; lineNum < lines.length; lineNum++) {
    let line = lines[lineNum].trim();

    // Skip empty lines
    if (line.length === 0) {
      continue;
    }

    // Skip comment lines
    if (line.startsWith(';') || line.startsWith('#')) {
      continue;
    }

    // Remove inline comments
    const commentIndex = line.search(/[;#]/);
    if (commentIndex !== -1) {
      line = line.substring(0, commentIndex).trim();
    }

    // Check for section header
    if (line.startsWith('[') && line.endsWith(']')) {
      currentSection = line.substring(1, line.length - 1).trim();
      if (currentSection.length === 0) {
        throw new Error(`Empty section name at line ${lineNum + 1}`);
      }
      if (!result[currentSection]) {
        result[currentSection] = {};
      }
      continue;
    }

    // Parse key-value pair
    const equalIndex = line.indexOf('=');
    if (equalIndex === -1) {
      throw new Error(
        `Invalid key-value pair at line ${lineNum + 1}: "${line}" (missing "=")`,
      );
    }

    const key = line.substring(0, equalIndex).trim();
    const value = line.substring(equalIndex + 1).trim();

    if (key.length === 0) {
      throw new Error(`Empty key at line ${lineNum + 1}`);
    }

    result[currentSection][key] = value;
  }

  // Remove _global section if empty
  if (Object.keys(result._global).length === 0) {
    delete result._global;
  }

  return result;
}
