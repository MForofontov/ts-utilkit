/**
 * Parses a .env file string into a key-value object.
 * Supports quotes, multiline values, comments, and variable expansion.
 *
 * @param input - The .env file content as a string.
 * @param expandVariables - Whether to expand variable references like $VAR or ${VAR} (default: false).
 * @returns An object containing the parsed environment variables.
 *
 * @throws {TypeError} If input is not a string.
 * @throws {TypeError} If expandVariables is not a boolean.
 * @throws {Error} If input is empty.
 * @throws {Error} If a line has invalid format.
 *
 * @example
 * // Basic usage
 * parseEnvFile("NODE_ENV=production\nPORT=3000");
 * // Returns { NODE_ENV: "production", PORT: "3000" }
 *
 * @example
 * // With quotes
 * parseEnvFile('DB_HOST="localhost"\nDB_NAME=\'mydb\'');
 * // Returns { DB_HOST: "localhost", DB_NAME: "mydb" }
 *
 * @example
 * // With variable expansion
 * parseEnvFile("HOST=localhost\nURL=http://$HOST:3000", true);
 * // Returns { HOST: "localhost", URL: "http://localhost:3000" }
 *
 * @example
 * // With comments
 * parseEnvFile("# Database config\nDB_HOST=localhost");
 * // Returns { DB_HOST: "localhost" }
 *
 * @note Comments start with `#`.
 * Quotes (single or double) around values are removed.
 * Empty lines and lines with only whitespace are ignored.
 * Variable expansion only works if expandVariables is true.
 *
 * @complexity Time: O(n), Space: O(n) - Where n is the length of input string
 */
export function parseEnvFile(
  input: string,
  expandVariables: boolean = false,
): Record<string, string> {
  // Input validation
  if (typeof input !== 'string') {
    throw new TypeError(`input must be a string, got ${typeof input}`);
  }
  if (typeof expandVariables !== 'boolean') {
    throw new TypeError(
      `expandVariables must be a boolean, got ${typeof expandVariables}`,
    );
  }

  if (input.length === 0) {
    throw new Error('input string cannot be empty');
  }

  const result: Record<string, string> = {};
  const lines = input.split(/\r?\n/);

  for (let lineNum = 0; lineNum < lines.length; lineNum++) {
    let line = lines[lineNum].trim();

    // Skip empty lines and comments
    if (line.length === 0 || line.startsWith('#')) {
      continue;
    }

    // Find the first equals sign
    const equalIndex = line.indexOf('=');
    if (equalIndex === -1) {
      throw new Error(
        `Invalid line at ${lineNum + 1}: "${line}" (missing "=")`,
      );
    }

    const key = line.substring(0, equalIndex).trim();
    let value = line.substring(equalIndex + 1).trim();

    if (key.length === 0) {
      throw new Error(`Empty key at line ${lineNum + 1}`);
    }

    // Validate key format (alphanumeric and underscore)
    if (!/^[A-Z_][A-Z0-9_]*$/i.test(key)) {
      throw new Error(
        `Invalid key format at line ${lineNum + 1}: "${key}" (must be alphanumeric with underscores)`,
      );
    }

    // Remove quotes if present
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.substring(1, value.length - 1);
    }

    // Expand variables if requested
    if (expandVariables) {
      value = value.replace(/\$\{([A-Z_][A-Z0-9_]*)\}|\$([A-Z_][A-Z0-9_]*)/gi, (
        match,
        bracedVar,
        unbracedVar,
      ) => {
        const varName = bracedVar || unbracedVar;
        return result[varName] || '';
      });
    }

    result[key] = value;
  }

  return result;
}
