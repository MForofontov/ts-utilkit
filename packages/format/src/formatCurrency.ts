/**
 * Currency code to symbol mapping for common currencies.
 */
const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  CNY: '¥',
  INR: '₹',
  RUB: '₽',
  BRL: 'R$',
  KRW: '₩',
  AUD: '$',
  CAD: '$',
  CHF: '₣',
  SEK: 'kr',
  NZD: '$',
  MXN: '$',
  SGD: '$',
  HKD: '$',
  NOK: 'kr',
  TRY: '₺',
  ZAR: 'R',
  PLN: 'zł',
  THB: '฿',
  IDR: 'Rp',
  MYR: 'RM',
  PHP: '₱',
  DKK: 'kr',
  CZK: 'Kč',
  ILS: '₪',
  AED: 'د.إ',
  SAR: '﷼',
};

/**
 * Formats a number as currency with automatic symbol detection or custom formatting.
 * Supports currency codes (USD, EUR, etc.) which automatically add the appropriate symbol,
 * or direct symbol input for custom formatting.
 *
 * @param value - The numeric value to format.
 * @param currency - Currency code (USD, EUR, etc.) or custom symbol (default: "USD").
 * @param decimals - Number of decimal places (default: 2).
 * @param customSymbol - Optional custom symbol to use instead of auto-detected (default: undefined).
 * @returns A formatted currency string in standard format "$1,234.56" or "1,234.56 XXX" for unknown currencies.
 *
 * @throws {TypeError} If value is not a number or is NaN.
 * @throws {TypeError} If currency is not a string.
 * @throws {TypeError} If decimals is not a number or is NaN.
 * @throws {Error} If decimals is negative.
 *
 * @example
 * // Basic usage (USD)
 * formatCurrency(1234.56, "USD"); // Returns "$1,234.56"
 *
 * @example
 * // European currency
 * formatCurrency(1234.56, "EUR"); // Returns "€1,234.56"
 *
 * @example
 * // Japanese Yen (no decimals)
 * formatCurrency(1234, "JPY", 0); // Returns "¥1,234"
 *
 * @example
 * // Unknown currency (uses code)
 * formatCurrency(1234.56, "XXX"); // Returns "1,234.56 XXX"
 *
 * @example
 * // Custom symbol
 * formatCurrency(1234.56, "BTC", 2, "₿"); // Returns "₿1,234.56"
 *
 * @note Automatically detects currency symbols for 30+ major currencies.
 * Unknown currencies are displayed with code after amount.
 * Custom symbols can override auto-detection.
 *
 * @complexity Time: O(n) where n is number of digits, Space: O(n)
 */
export function formatCurrency(
  value: number,
  currency: string = 'USD',
  decimals: number = 2,
  customSymbol?: string,
): string {
  // Input validation
  if (typeof value !== 'number' || isNaN(value)) {
    throw new TypeError(`value must be a number, got ${typeof value}`);
  }
  if (typeof currency !== 'string') {
    throw new TypeError(`currency must be a string, got ${typeof currency}`);
  }
  if (typeof decimals !== 'number' || isNaN(decimals)) {
    throw new TypeError(`decimals must be a number, got ${typeof decimals}`);
  }
  if (customSymbol !== undefined && typeof customSymbol !== 'string') {
    throw new TypeError(
      `customSymbol must be a string, got ${typeof customSymbol}`,
    );
  }

  if (decimals < 0) {
    throw new Error(`decimals must be non-negative, got ${decimals}`);
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
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Combine parts
  let formattedNumber = formattedInteger;
  if (decimals > 0) {
    formattedNumber += '.' + decimalPart;
  }

  // Check if currency is a currency code
  const currencyUpper = currency.toUpperCase();
  const isCurrencyCode =
    currencyUpper.length === 3 && currencyUpper in CURRENCY_SYMBOLS;

  // Determine symbol
  const symbol = customSymbol || (isCurrencyCode ? CURRENCY_SYMBOLS[currencyUpper] : undefined);

  // Format with currency
  let result: string;
  if (symbol) {
    // Standard format: "$1,234.56"
    result = isNegative ? `-${symbol}${formattedNumber}` : `${symbol}${formattedNumber}`;
  } else {
    // Unknown currency format: "1,234.56 XXX"
    result = isNegative ? `-${formattedNumber} ${currencyUpper}` : `${formattedNumber} ${currencyUpper}`;
  }

  return result;
}
