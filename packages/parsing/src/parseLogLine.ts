/**
 * Parses a common log format line into structured components.
 * Supports Apache Common Log Format and Combined Log Format.
 *
 * @param logLine - The log line string to parse.
 * @param format - Log format: "common" or "combined" (default: "common").
 * @returns An object containing parsed log components.
 *
 * @throws {TypeError} If logLine is not a string.
 * @throws {TypeError} If format is not a string.
 * @throws {Error} If logLine is empty.
 * @throws {Error} If format is not valid.
 * @throws {Error} If log line doesn't match expected format.
 *
 * @example
 * // Common format
 * const line = '127.0.0.1 - frank [10/Oct/2000:13:55:36 -0700] "GET /apache_pb.gif HTTP/1.0" 200 2326';
 * parseLogLine(line);
 * // Returns {
 * //   ip: "127.0.0.1",
 * //   identity: "-",
 * //   user: "frank",
 * //   timestamp: "10/Oct/2000:13:55:36 -0700",
 * //   method: "GET",
 * //   path: "/apache_pb.gif",
 * //   protocol: "HTTP/1.0",
 * //   status: 200,
 * //   size: 2326
 * // }
 *
 * @example
 * // Combined format (with referer and user-agent)
 * const line = '127.0.0.1 - - [10/Oct/2000:13:55:36 -0700] "GET / HTTP/1.0" 200 2326 "http://example.com" "Mozilla/5.0"';
 * parseLogLine(line, "combined");
 * // Returns parsed object with additional referer and userAgent fields
 *
 * @note Common format includes: IP, identity, user, timestamp, request, status, size.
 * Combined format adds: referer and user-agent.
 *
 * @complexity Time: O(n), Space: O(1) - Where n is the length of log line
 */
export function parseLogLine(
  logLine: string,
  format: 'common' | 'combined' = 'common',
): Record<string, string | number> {
  // Input validation
  if (typeof logLine !== 'string') {
    throw new TypeError(`logLine must be a string, got ${typeof logLine}`);
  }
  if (typeof format !== 'string') {
    throw new TypeError(`format must be a string, got ${typeof format}`);
  }

  if (logLine.length === 0) {
    throw new Error('logLine cannot be empty');
  }

  if (format !== 'common' && format !== 'combined') {
    throw new Error(
      `Invalid format: "${format}" (valid options: common, combined)`,
    );
  }

  // Common Log Format regex
  // IP identity user [timestamp] "method path protocol" status size
  const commonRegex =
    /^(\S+) (\S+) (\S+) \[([^\]]+)\] "(\S+) (\S+) (\S+)" (\d+) (\S+)/;

  // Combined Log Format regex (adds referer and user-agent)
  const combinedRegex =
    /^(\S+) (\S+) (\S+) \[([^\]]+)\] "(\S+) (\S+) (\S+)" (\d+) (\S+) "([^"]*)" "([^"]*)"/;

  const regex = format === 'combined' ? combinedRegex : commonRegex;
  const match = logLine.match(regex);

  if (!match) {
    throw new Error(
      `Log line doesn't match ${format} format: "${logLine.substring(0, 50)}..."`,
    );
  }

  const result: Record<string, string | number> = {
    ip: match[1],
    identity: match[2],
    user: match[3],
    timestamp: match[4],
    method: match[5],
    path: match[6],
    protocol: match[7],
    status: parseInt(match[8], 10),
    size: match[9] === '-' ? 0 : parseInt(match[9], 10),
  };

  if (format === 'combined') {
    result.referer = match[10] || '-';
    result.userAgent = match[11] || '-';
  }

  return result;
}
