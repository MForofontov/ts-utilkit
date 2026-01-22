/**
 * Formats milliseconds into a human-readable duration string.
 * Supports various output formats and customizable units.
 *
 * @param milliseconds - The duration in milliseconds to format.
 * @param format - Output format: "short" (5m 30s), "long" (5 minutes 30 seconds), "compact" (5:30) (default: "short").
 * @returns A formatted duration string.
 *
 * @throws {TypeError} If milliseconds is not a number or is NaN.
 * @throws {TypeError} If format is not a string.
 * @throws {Error} If milliseconds is negative.
 * @throws {Error} If format is not a valid option.
 *
 * @example
 * // Basic usage
 * formatDuration(5000); // Returns "5s"
 *
 * @example
 * // Long format
 * formatDuration(65000, "long"); // Returns "1 minute 5 seconds"
 *
 * @example
 * // Compact format
 * formatDuration(3665000, "compact"); // Returns "1:01:05"
 *
 * @example
 * // Complex duration
 * formatDuration(90061000); // Returns "1d 1h 1m 1s"
 *
 * @example
 * // Zero duration
 * formatDuration(0); // Returns "0ms"
 *
 * @note Short format uses abbreviated units (d, h, m, s, ms).
 * Long format uses full unit names with proper pluralization.
 * Compact format uses HH:MM:SS or MM:SS style.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function formatDuration(
  milliseconds: number,
  format: 'short' | 'long' | 'compact' = 'short',
): string {
  // Input validation
  if (typeof milliseconds !== 'number' || isNaN(milliseconds)) {
    throw new TypeError(
      `milliseconds must be a number, got ${typeof milliseconds}`,
    );
  }
  if (typeof format !== 'string') {
    throw new TypeError(`format must be a string, got ${typeof format}`);
  }

  if (milliseconds < 0) {
    throw new Error(`milliseconds must be non-negative, got ${milliseconds}`);
  }

  const validFormats = ['short', 'long', 'compact'];
  if (!validFormats.includes(format)) {
    throw new Error(
      `Invalid format: "${format}" (valid options: short, long, compact)`,
    );
  }

  if (milliseconds === 0) {
    return format === 'long' ? '0 milliseconds' : format === 'compact' ? '0:00' : '0ms';
  }

  // Calculate time components
  const days = Math.floor(milliseconds / 86400000);
  const hours = Math.floor((milliseconds % 86400000) / 3600000);
  const minutes = Math.floor((milliseconds % 3600000) / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  const ms = milliseconds % 1000;

  if (format === 'compact') {
    // Compact format: HH:MM:SS or MM:SS
    if (days > 0 || hours > 0) {
      const totalHours = days * 24 + hours;
      return `${totalHours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    } else {
      return `${minutes}:${String(seconds).padStart(2, '0')}`;
    }
  }

  const parts: string[] = [];

  if (format === 'short') {
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (seconds > 0) parts.push(`${seconds}s`);
    if (ms > 0 && parts.length === 0) parts.push(`${ms}ms`);
  } else {
    // Long format with proper pluralization
    if (days > 0) parts.push(`${days} ${days === 1 ? 'day' : 'days'}`);
    if (hours > 0) parts.push(`${hours} ${hours === 1 ? 'hour' : 'hours'}`);
    if (minutes > 0)
      parts.push(`${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`);
    if (seconds > 0)
      parts.push(`${seconds} ${seconds === 1 ? 'second' : 'seconds'}`);
    if (ms > 0 && parts.length === 0)
      parts.push(`${ms} ${ms === 1 ? 'millisecond' : 'milliseconds'}`);
  }

  return parts.join(' ');
}
