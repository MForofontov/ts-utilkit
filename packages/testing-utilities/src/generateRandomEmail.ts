/**
 * Generates a random valid email address for testing.
 *
 * @param domain - Optional domain (default: random from common domains).
 * @returns Random valid email address.
 *
 * @example
 * const email = generateRandomEmail();
 * // Returns: "user8a3f@gmail.com"
 *
 * @example
 * const email = generateRandomEmail('company.com');
 * // Returns: "user4b2c@company.com"
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function generateRandomEmail(domain?: string): string {
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'example.com'];
  const selectedDomain =
    domain || domains[Math.floor(Math.random() * domains.length)];
  const username = Math.random().toString(36).substring(2, 10);
  return `${username}@${selectedDomain}`;
}
