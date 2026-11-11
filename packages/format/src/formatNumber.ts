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
 * Large finite values are expanded to grouped decimal notation. NaN and
 * infinities use their standard string representations without decimal suffixes.
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

  if (!Number.isFinite(value)) return value.toFixed(decimals);

  // Handle sign
  const isNegative = value < 0;
  const absoluteValue = Math.abs(value);

  // Round to specified decimals
  const factor = Math.pow(10, decimals);
  // Numbers this large have no representable fractional component. Scaling
  // them can overflow even though the original number is finite.
  const rounded =
    absoluteValue >= 1e21
      ? absoluteValue
      : Math.round(absoluteValue * factor) / factor;

  // Split into integer and decimal parts
  const fixed = rounded.toFixed(decimals);
  const parts = fixed.split('.');
  let integerPart = parts[0];
  let decimalPart = parts[1];
  if (fixed.includes('e+')) {
    const [coefficient, exponent] = fixed.split('e+');
    const digits = coefficient.replace('.', '');
    integerPart = digits + '0'.repeat(Number(exponent) + 1 - digits.length);
    decimalPart = '0'.repeat(decimals);
  }

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
