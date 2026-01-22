/**
 * Formats a number with thousands separators and optional decimal places.
 * Supports custom separators and localization options.
 *
 * @param value - The number to format.
 * @param decimals - Number of decimal places (default: 0).
 * @param thousandsSeparator - Character to use for thousands separator (default: ",").
 * @param decimalSeparator - Character to use for decimal separator (default: ".").
 * @returns A formatted number string.
 *
 * @throws {TypeError} If value is not a number or is NaN.
 * @throws {TypeError} If decimals is not a number or is NaN.
 * @throws {TypeError} If thousandsSeparator is not a string.
 * @throws {TypeError} If decimalSeparator is not a string.
 * @throws {Error} If decimals is negative.
 * @throws {Error} If thousandsSeparator or decimalSeparator is not exactly one character.
 *
 * @example
 * // Basic usage
 * formatNumber(1234567); // Returns "1,234,567"
 *
 * @example
 * // With decimals
 * formatNumber(1234.567, 2); // Returns "1,234.57"
 *
 * @example
 * // European format
 * formatNumber(1234567.89, 2, ".", ","); // Returns "1.234.567,89"
 *
 * @example
 * // Negative numbers
 * formatNumber(-1234.56, 2); // Returns "-1,234.56"
 *
 * @example
 * // Zero
 * formatNumber(0, 2); // Returns "0.00"
 *
 * @note The function rounds to the specified number of decimal places.
 * Supports negative numbers with proper sign placement.
 *
 * @complexity Time: O(n), Space: O(n) - Where n is the number of digits
 */
export function formatNumber(
  value: number,
  decimals: number = 0,
  thousandsSeparator: string = ',',
  decimalSeparator: string = '.',
): string {
  // Input validation
  if (typeof value !== 'number' || isNaN(value)) {
    throw new TypeError(`value must be a number, got ${typeof value}`);
  }
  if (typeof decimals !== 'number' || isNaN(decimals)) {
    throw new TypeError(`decimals must be a number, got ${typeof decimals}`);
  }
  if (typeof thousandsSeparator !== 'string') {
    throw new TypeError(
      `thousandsSeparator must be a string, got ${typeof thousandsSeparator}`,
    );
  }
  if (typeof decimalSeparator !== 'string') {
    throw new TypeError(
      `decimalSeparator must be a string, got ${typeof decimalSeparator}`,
    );
  }

  if (decimals < 0) {
    throw new Error(`decimals must be non-negative, got ${decimals}`);
  }
  if (thousandsSeparator.length !== 1) {
    throw new Error(
      `thousandsSeparator must be exactly one character, got "${thousandsSeparator}"`,
    );
  }
  if (decimalSeparator.length !== 1) {
    throw new Error(
      `decimalSeparator must be exactly one character, got "${decimalSeparator}"`,
    );
  }

  // Handle sign
  const isNegative = value < 0;
  const absoluteValue = Math.abs(value);

  // Round to specified decimals
  const factor = Math.pow(10, decimals);
  const rounded = Math.round(absoluteValue * factor) / factor;

  // Split into integer and decimal parts
  const parts = rounded.toFixed(decimals).split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1];

  // Add thousands separators
  const formattedInteger = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    thousandsSeparator,
  );

  // Combine parts
  let result = formattedInteger;
  if (decimals > 0) {
    result += decimalSeparator + decimalPart;
  }

  return isNegative ? `-${result}` : result;
}
