import { roundToDecimals } from '../src/arithmeticFunctions/roundToDecimals';

describe('roundToDecimals', () => {
  // Test case 1: Round to 2 decimal places
  it('1. should round to 2 decimal places', () => {
    const value: number = 5.6789;
    const decimals: number = 2;
    const expected: number = 5.68;
    const result: number = roundToDecimals(value, decimals);
    expect(result).toBe(expected);
  });

  // Test case 2: Round to 0 decimal places
  it('2. should round to 0 decimal places', () => {
    const value: number = 5.6789;
    const decimals: number = 0;
    const expected: number = 6;
    const result: number = roundToDecimals(value, decimals);
    expect(result).toBe(expected);
  });

  // Test case 3: Round a negative number to 2 decimal places
  it('3. should round a negative number to 2 decimal places', () => {
    const value: number = -5.6789;
    const decimals: number = 2;
    const expected: number = -5.68;
    const result: number = roundToDecimals(value, decimals);
    expect(result).toBe(expected);
  });

  // Test case 4: Round a number with fewer decimal places than specified
  it('4. should round a number with fewer decimal places than specified', () => {
    const value: number = 5.6;
    const decimals: number = 2;
    const expected: number = 5.6;
    const result: number = roundToDecimals(value, decimals);
    expect(result).toBe(expected);
  });

  // Test case 5: Round a number with more decimal places than specified
  it('5. should round a number with more decimal places than specified', () => {
    const value: number = 5.6789;
    const decimals: number = 3;
    const expected: number = 5.679;
    const result: number = roundToDecimals(value, decimals);
    expect(result).toBe(expected);
  });

  // Test case 6: Round NaN (should throw an error)
  it('6. should throw an error for NaN input', () => {
    const value: number = NaN;
    const decimals: number = 2;
    expect(() => roundToDecimals(value, decimals)).toThrow(
      'Both value and decimals must be numbers',
    );
  });

  // Test case 7: Round to a non-integer number of decimal places (should throw an error)
  it('7. should throw an error when rounding to a non-integer number of decimal places', () => {
    const value: number = 5.6789;
    const decimals: number = 2.5;
    expect(() => roundToDecimals(value, decimals)).toThrow(
      'Decimals must be an integer',
    );
  });

  // Test case 8: Round to a negative number of decimal places (should throw an error)
  it('8. should throw an error when rounding to a negative number of decimal places', () => {
    const value: number = 5.6789;
    const decimals: number = -2;
    expect(() => roundToDecimals(value, decimals)).toThrow(
      'Decimals must be a non-negative integer',
    );
  });
});
