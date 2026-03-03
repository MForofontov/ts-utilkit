import { formatTemperature } from '../src/formatTemperature';

/**
 * Unit tests for the formatTemperature function.
 */
describe('formatTemperature', () => {
  // ─── Celsius conversions ───────────────────────────────────────────────────

  // Test case 1: Celsius to Fahrenheit (boiling point of water)
  it('1. should convert 100°C to 212.00°F', () => {
    // Arrange & Act
    const result = formatTemperature(100, 'C', 'F');

    // Assert
    expect(result).toBe('212.00°F');
  });

  // Test case 2: Celsius to Kelvin (boiling point of water)
  it('2. should convert 100°C to 373.15K', () => {
    // Act
    const result = formatTemperature(100, 'C', 'K');

    // Assert
    expect(result).toBe('373.15K');
  });

  // Test case 3: Celsius to Celsius (identity)
  it('3. should return the same value for C→C conversion', () => {
    // Act
    const result = formatTemperature(37, 'C', 'C');

    // Assert
    expect(result).toBe('37.00°C');
  });

  // Test case 4: Freezing point C→F
  it('4. should convert 0°C to 32.00°F', () => {
    expect(formatTemperature(0, 'C', 'F')).toBe('32.00°F');
  });

  // Test case 5: Absolute zero C→K
  it('5. should convert -273.15°C to 0.00K', () => {
    expect(formatTemperature(-273.15, 'C', 'K')).toBe('0.00K');
  });

  // ─── Fahrenheit conversions ────────────────────────────────────────────────

  // Test case 6: Fahrenheit to Celsius (boiling point)
  it('6. should convert 212°F to 100.00°C', () => {
    expect(formatTemperature(212, 'F', 'C')).toBe('100.00°C');
  });

  // Test case 7: Fahrenheit to Kelvin
  it('7. should convert 32°F to 273.15K', () => {
    expect(formatTemperature(32, 'F', 'K')).toBe('273.15K');
  });

  // Test case 8: Fahrenheit to Fahrenheit (identity)
  it('8. should return the same value for F→F conversion', () => {
    expect(formatTemperature(98.6, 'F', 'F')).toBe('98.60°F');
  });

  // ─── Kelvin conversions ────────────────────────────────────────────────────

  // Test case 9: Kelvin to Celsius (absolute zero)
  it('9. should convert 0K to -273.15°C', () => {
    expect(formatTemperature(0, 'K', 'C')).toBe('-273.15°C');
  });

  // Test case 10: Kelvin to Fahrenheit
  it('10. should convert 373.15K to 212.00°F', () => {
    expect(formatTemperature(373.15, 'K', 'F')).toBe('212.00°F');
  });

  // Test case 11: Kelvin to Kelvin (identity)
  it('11. should return the same value for K→K conversion', () => {
    expect(formatTemperature(300, 'K', 'K')).toBe('300.00K');
  });

  // ─── Custom decimals ───────────────────────────────────────────────────────

  // Test case 12: Custom decimal places (4)
  it('12. should format with 4 decimal places when decimals=4', () => {
    expect(formatTemperature(100, 'C', 'K', 4)).toBe('373.1500K');
  });

  // Test case 13: Zero decimal places
  it('13. should format with 0 decimal places when decimals=0', () => {
    expect(formatTemperature(100, 'C', 'F', 0)).toBe('212°F');
  });

  // ─── Unit symbol formatting ────────────────────────────────────────────────

  // Test case 14: Kelvin output has no degree symbol
  it('14. should not include a degree symbol for Kelvin output', () => {
    const result = formatTemperature(273.15, 'K', 'K');
    expect(result).not.toContain('°');
    expect(result).toMatch(/K$/);
  });

  // Test case 15: Celsius output includes degree symbol
  it('15. should include "°C" symbol for Celsius output', () => {
    const result = formatTemperature(25, 'C', 'C');
    expect(result).toMatch(/°C$/);
  });

  // Test case 16: Fahrenheit output includes degree symbol
  it('16. should include "°F" symbol for Fahrenheit output', () => {
    const result = formatTemperature(77, 'C', 'F');
    expect(result).toMatch(/°F$/);
  });

  // ─── Error Cases ───────────────────────────────────────────────────────────

  // Test case 20: Throws Error if from is an invalid unit string
  it('20. should throw Error if from is an unrecognised unit', () => {
    expect(() =>
      formatTemperature(100, 'X' as unknown as 'C', 'F'),
    ).toThrow(Error);
    expect(() =>
      formatTemperature(100, 'X' as unknown as 'C', 'F'),
    ).toThrow('from must be "C", "F", or "K", got "X"');
  });

  // Test case 22: Throws Error if to is an invalid unit string
  it('22. should throw Error if to is an unrecognised unit', () => {
    expect(() =>
      formatTemperature(100, 'C', 'Z' as unknown as 'F'),
    ).toThrow(Error);
    expect(() =>
      formatTemperature(100, 'C', 'Z' as unknown as 'F'),
    ).toThrow('to must be "C", "F", or "K", got "Z"');
  });

  // Test case 23: Throws Error if decimals is negative
  it('23. should throw Error if decimals is negative', () => {
    expect(() => formatTemperature(100, 'C', 'F', -1)).toThrow(Error);
    expect(() => formatTemperature(100, 'C', 'F', -1)).toThrow(
      'decimals must be non-negative, got -1',
    );
  });

  // Test case 24: Throws Error for value below absolute zero in Kelvin
  it('24. should throw Error when Kelvin input is below absolute zero', () => {
    expect(() => formatTemperature(-1, 'K', 'C')).toThrow(Error);
    expect(() => formatTemperature(-1, 'K', 'C')).toThrow(
      'value in Kelvin cannot be below absolute zero, got -1K',
    );
  });

  // Test case 25: Throws Error for value below absolute zero in Celsius
  it('25. should throw Error when Celsius input is below absolute zero', () => {
    expect(() => formatTemperature(-300, 'C', 'F')).toThrow(Error);
    expect(() => formatTemperature(-300, 'C', 'F')).toThrow(
      'value in Celsius cannot be below absolute zero (-273.15°C), got -300°C',
    );
  });

  // Test case 26: Throws Error for value below absolute zero in Fahrenheit
  it('26. should throw Error when Fahrenheit input is below absolute zero', () => {
    expect(() => formatTemperature(-500, 'F', 'C')).toThrow(Error);
    expect(() => formatTemperature(-500, 'F', 'C')).toThrow(
      'value in Fahrenheit cannot be below absolute zero (-459.67°F), got -500°F',
    );
  });
});
