/**
 * Valid temperature unit identifiers.
 */
export type TemperatureUnit = 'C' | 'F' | 'K';

/**
 * Converts a temperature value between Celsius, Fahrenheit, and Kelvin and returns
 * a formatted string with the appropriate unit symbol.
 *
 * @param value - The numeric temperature value to convert.
 * @param from - The unit of the input value: "C" (Celsius), "F" (Fahrenheit), or "K" (Kelvin).
 * @param to - The unit to convert to: "C", "F", or "K".
 * @param decimals - Number of decimal places in the output (default: 2). Must be ≥ 0.
 * @returns A formatted temperature string, e.g. `"100.00°C"`, `"212.00°F"`, `"373.15K"`.
 *   Kelvin uses no degree symbol; Celsius and Fahrenheit use "°".
 *
 * @throws {Error} If from is not "C", "F", or "K".
 * @throws {Error} If to is not "C", "F", or "K".
 * @throws {Error} If decimals is negative.
 * @throws {Error} If the resulting temperature in Kelvin would be below absolute zero (< 0 K).
 *
 * @example
 * // Boiling point of water in Celsius to Fahrenheit
 * formatTemperature(100, 'C', 'F'); // Returns "212.00°F"
 *
 * @example
 * // Absolute zero in Kelvin to Celsius
 * formatTemperature(0, 'K', 'C'); // Returns "-273.15°C"
 *
 * @example
 * // Celsius to Kelvin with custom decimal places
 * formatTemperature(100, 'C', 'K', 4); // Returns "373.1500K"
 *
 * @example
 * // Same unit (no conversion, identity)
 * formatTemperature(37, 'C', 'C'); // Returns "37.00°C"
 *
 * @note Kelvin output uses no degree symbol (e.g. "373.15K").
 * Celsius and Fahrenheit output includes the "°" symbol (e.g. "100.00°C").
 * Absolute-zero validation applies to the input value when the input unit is Kelvin,
 * and to the converted result when converting to Kelvin.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function formatTemperature(
  value: number,
  from: TemperatureUnit,
  to: TemperatureUnit,
  decimals: number = 2,
): string {
  // Input validation

  const validUnits: TemperatureUnit[] = ['C', 'F', 'K'];
  if (!validUnits.includes(from as TemperatureUnit)) {
    throw new Error(`from must be "C", "F", or "K", got "${from}"`);
  }
  if (!validUnits.includes(to as TemperatureUnit)) {
    throw new Error(`to must be "C", "F", or "K", got "${to}"`);
  }
  if (decimals < 0) {
    throw new Error(`decimals must be non-negative, got ${decimals}`);
  }

  // Validate input is not below absolute zero in its own unit
  if (from === 'K' && value < 0) {
    throw new Error(
      `value in Kelvin cannot be below absolute zero, got ${value}K`,
    );
  }
  if (from === 'C' && value < -273.15) {
    throw new Error(
      `value in Celsius cannot be below absolute zero (-273.15°C), got ${value}°C`,
    );
  }
  if (from === 'F' && value < -459.67) {
    throw new Error(
      `value in Fahrenheit cannot be below absolute zero (-459.67°F), got ${value}°F`,
    );
  }

  // Convert to Celsius as intermediate unit
  let celsius: number;
  switch (from) {
    case 'C':
      celsius = value;
      break;
    case 'F':
      celsius = (value - 32) * (5 / 9);
      break;
    case 'K':
      celsius = value - 273.15;
      break;
  }

  // Convert from Celsius to target unit
  let result: number;
  switch (to) {
    case 'C':
      result = celsius;
      break;
    case 'F':
      result = celsius * (9 / 5) + 32;
      break;
    case 'K':
      result = celsius + 273.15;
      break;
  }

  // Format with unit symbol
  const symbol = to === 'K' ? 'K' : `°${to}`;
  return `${result.toFixed(decimals)}${symbol}`;
}
