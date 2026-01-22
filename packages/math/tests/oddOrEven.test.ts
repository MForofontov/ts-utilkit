import { oddOrEven } from '../src/numberTheoryFunctions/oddOrEven';

describe('oddOrEven', () => {
  // Test case 1: Positive odd number
  it('1. should return "odd" for a positive odd number', () => {
    const input: number = 3;
    const expected: string = 'odd';
    const result: string = oddOrEven(input);
    expect(result).toBe(expected);
  });

  // Test case 2: Positive even number
  it('2. should return "even" for a positive even number', () => {
    const input: number = 4;
    const expected: string = 'even';
    const result: string = oddOrEven(input);
    expect(result).toBe(expected);
  });

  // Test case 3: Negative odd number
  it('3. should return "odd" for a negative odd number', () => {
    const input: number = -3;
    const expected: string = 'odd';
    const result: string = oddOrEven(input);
    expect(result).toBe(expected);
  });

  // Test case 4: Negative even number
  it('4. should return "even" for a negative even number', () => {
    const input: number = -4;
    const expected: string = 'even';
    const result: string = oddOrEven(input);
    expect(result).toBe(expected);
  });

  // Test case 5: Zero
  it('5. should return "even" for zero', () => {
    const input: number = 0;
    const expected: string = 'even';
    const result: string = oddOrEven(input);
    expect(result).toBe(expected);
  });

  // Test case 6: NaN input (should throw an error)
  it('6. should throw an error for NaN input', () => {
    const input: number = NaN;
    expect(() => oddOrEven(input)).toThrow('Input must be a number');
  });

  // Test case 7: Floating-point input (should throw an error)
  it('7. should throw an error for a floating-point input', () => {
    const input: number = 3.5;
    expect(() => oddOrEven(input)).toThrow('Input must be an integer');
  });
});
