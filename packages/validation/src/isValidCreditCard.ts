/**
 * Validates if a string is a valid credit card number using the Luhn algorithm.
 * Supports major card types: Visa, Mastercard, American Express, Discover, JCB, Diners Club.
 *
 * @param cardNumber - The credit card number to validate (digits only or with spaces/hyphens).
 * @returns True if valid credit card number, false otherwise.
 *
 * @throws {TypeError} If cardNumber is not a string.
 *
 * @example
 * // Valid credit card numbers (test numbers)
 * isValidCreditCard("4532015112830366"); // true (Visa)
 * isValidCreditCard("5425233430109903"); // true (Mastercard)
 * isValidCreditCard("374245455400126"); // true (American Express)
 *
 * @example
 * // With spaces or hyphens (automatically stripped)
 * isValidCreditCard("4532 0151 1283 0366"); // true
 * isValidCreditCard("4532-0151-1283-0366"); // true
 *
 * @example
 * // Invalid numbers
 * isValidCreditCard("1234567890123456"); // false (fails Luhn)
 * isValidCreditCard("4532015112830367"); // false (wrong check digit)
 * isValidCreditCard("123"); // false (too short)
 *
 * @note Uses Luhn algorithm (mod 10 checksum) for validation
 * @note Accepts 13-19 digit card numbers (industry standard)
 * @note Automatically strips spaces and hyphens
 *
 * @complexity Time: O(n) where n is number of digits, Space: O(n)
 */
export function isValidCreditCard(cardNumber: string): boolean {
  if (typeof cardNumber !== 'string') {
    throw new TypeError(
      `cardNumber must be a string, got ${typeof cardNumber}`,
    );
  }

  // Remove spaces and hyphens
  const cleaned = cardNumber.replace(/[\s-]/g, '');

  // Check if it contains only digits
  if (!/^\d+$/.test(cleaned)) {
    return false;
  }

  // Credit cards are typically 13-19 digits
  if (cleaned.length < 13 || cleaned.length > 19) {
    return false;
  }

  // Luhn algorithm (mod 10 checksum)
  let sum = 0;
  let isEven = false;

  // Process digits from right to left
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}
