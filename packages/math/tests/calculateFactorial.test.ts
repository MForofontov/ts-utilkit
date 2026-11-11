import { calculateFactorial } from '../src/combinatoricsFunctions/calculateFactorial';

/**
 * Unit tests for the calculateFactorial function.
 */
describe('calculateFactorial', () => {
  // Test case 1: Factorial of a positive integer
  it('1. should return the correct factorial for a positive integer', () => {
    const input: number = 5;
    const expected: number = 120;
    const result: number = calculateFactorial(input);
    expect(result).toBe(expected);
  });

  // Test case 2: Factorial of zero
  it('2. should return 1 for the factorial of 0', () => {
    const input: number = 0;
    const expected: number = 1;
    const result: number = calculateFactorial(input);
    expect(result).toBe(expected);
  });

  // Test case 3: Factorial of a large positive integer
  it('3. should return the correct factorial for a large positive integer', () => {
    const input: number = 10;
    const expected: number = 3628800;
    const result: number = calculateFactorial(input);
    expect(result).toBe(expected);
  });

  // Test case 4: Factorial of a negative integer
  it('4. should throw an error for the factorial of a negative integer', () => {
    const input: number = -5;
    expect(() => calculateFactorial(input)).toThrow(
      'Input must be a non-negative integer',
    );
  });

  // Test case 5: Factorial of a floating-point number
  it('5. should throw an error for the factorial of a floating-point number', () => {
    const input: number = 5.5;
    expect(() => calculateFactorial(input)).toThrow('Input must be an integer');
  });

  // Test case 6: Exception handling for NaN input
  it('6. should throw an error for NaN input', () => {
    const input: number = NaN;
    expect(() => calculateFactorial(input)).toThrow('Input must be a number');
  });
});

it('retains the exact ascending-product rounding for every finite factorial and repeated calls', () => {
  const expected = [1];
  for (let n = 1; n <= 170; n++) expected[n] = expected[n - 1] * n;
  for (const n of [...expected.keys()].reverse())
    expect(calculateFactorial(n)).toBe(expected[n]);
  for (let n = 0; n <= 170; n++)
    expect(calculateFactorial(n)).toBe(expected[n]);
});
it.each([171, Number.MAX_SAFE_INTEGER, Number.MAX_VALUE])(
  'returns Infinity without unbounded work for %s',
  (n) => {
    expect(calculateFactorial(n)).toBe(Infinity);
  },
);
it.each([Infinity, -Infinity])('rejects non-finite input %s', (n) => {
  expect(() => calculateFactorial(n)).toThrow('integer');
});
