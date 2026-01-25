import { fibonacciRecursive } from '../src/sequenceFunctions/fibonacciRecursive';

describe('fibonacciRecursive', () => {
  // Test case 1: Fibonacci number for a positive integer
  it('1. should return the correct Fibonacci number for a positive integer', () => {
    const input: number = 5;
    const expected: number = 5;
    const result: number = fibonacciRecursive(input);
    expect(result).toBe(expected);
  });

  // Test case 2: Fibonacci number for zero
  it('2. should return 0 for the Fibonacci number of 0', () => {
    const input: number = 0;
    const expected: number = 0;
    const result: number = fibonacciRecursive(input);
    expect(result).toBe(expected);
  });

  // Test case 3: Fibonacci number for one
  it('3. should return 1 for the Fibonacci number of 1', () => {
    const input: number = 1;
    const expected: number = 1;
    const result: number = fibonacciRecursive(input);
    expect(result).toBe(expected);
  });

  // Test case 4: Fibonacci number for a negative integer
  it('4. should return the correct negafibonacci number for a negative integer', () => {
    const input: number = -5;
    const expected: number = 5;
    const result: number = fibonacciRecursive(input);
    expect(result).toBe(expected);
  });

  // Test case 5: Fibonacci number for a large integer
  it('5. should return the correct Fibonacci number for a large integer', () => {
    const input: number = 20;
    const expected: number = 6765;
    const result: number = fibonacciRecursive(input);
    expect(result).toBe(expected);
  });

  // Test case 6: Fibonacci number for a floating-point number (should throw an error)
  it('6. should throw an error for a floating-point number', () => {
    const input: number = 5.5;
    expect(() => fibonacciRecursive(input)).toThrow('Input must be an integer');
  });

  // Test case 7: Fibonacci number for NaN (should throw an error)
  it('7. should throw an error for NaN input', () => {
    const input: number = NaN;
    expect(() => fibonacciRecursive(input)).toThrow('Input must be a number');
  });
});
