/**
 * Generates a random IPv4 address for testing.
 *
 * @param private_ - Whether to generate a private IP address (default: false).
 * @returns Random IPv4 address string.
 *
 * @example
 * const ip = generateRandomIPv4();
 * // Returns: "192.168.1.42"
 *
 * @example
 * const publicIp = generateRandomIPv4(false);
 * // Returns: "203.45.178.91"
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function generateRandomIPv4(private_: boolean = false): string {
  if (private_) {
    // Generate private IP (192.168.x.x, 10.x.x.x, or 172.16-31.x.x)
    const ranges = [
      () => `192.168.${rand(0, 255)}.${rand(0, 255)}`,
      () => `10.${rand(0, 255)}.${rand(0, 255)}.${rand(0, 255)}`,
      () => `172.${rand(16, 31)}.${rand(0, 255)}.${rand(0, 255)}`,
    ];
    return ranges[Math.floor(Math.random() * ranges.length)]();
  }

  // Generate public IP (avoid private ranges)
  return `${rand(1, 223)}.${rand(0, 255)}.${rand(0, 255)}.${rand(1, 254)}`;
}

function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
