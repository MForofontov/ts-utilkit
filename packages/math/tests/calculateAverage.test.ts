import { sumArrayElements } from '@ts-utilkit/array';
import { calculateAverage } from '../src/statisticsFunctions/centralTendency/calculateAverage';

// Mock the sumArrayElements function
jest.mock('@ts-utilkit/array', () => ({
  sumArrayElements: jest.fn(),
}));

describe('calculateAverage', () => {
  // Test case 1: Average of all numbers in the array
  it('1. should return the average of all numbers in the array', () => {
    (sumArrayElements as jest.Mock).mockReturnValueOnce(10);
    expect(calculateAverage([1, 2, 3, 4])).toBe(2.5);
  });

  // Test case 2: Empty array
  it('2. should return NaN for an empty array', () => {
    (sumArrayElements as jest.Mock).mockReturnValueOnce(0);
    expect(calculateAverage([])).toBe(NaN);
  });

  // Test case 3: Arrays with negative numbers
  it('3. should handle arrays with negative numbers', () => {
    (sumArrayElements as jest.Mock).mockReturnValueOnce(-10);
    expect(calculateAverage([-1, -2, -3, -4])).toBe(-2.5);
  });

  // Test case 4: Arrays with a single element
  it('4. should handle arrays with a single element', () => {
    (sumArrayElements as jest.Mock).mockReturnValueOnce(5);
    expect(calculateAverage([5])).toBe(5);
  });

  // Test case 5: Arrays with mixed positive and negative numbers
  it('5. should handle arrays with mixed positive and negative numbers', () => {
    (sumArrayElements as jest.Mock).mockReturnValueOnce(0);
    expect(calculateAverage([-1, 1, -2, 2])).toBe(0);
  });

  // Test case 6: Arrays with floating point numbers
  it('6. should handle arrays with floating point numbers', () => {
    (sumArrayElements as jest.Mock).mockReturnValueOnce(10.5);
    expect(calculateAverage([2.5, 3.5, 4.5])).toBeCloseTo(3.5);
  });

  // Test case 7: Arrays with large numbers
  it('7. should handle arrays with large numbers', () => {
    (sumArrayElements as jest.Mock).mockReturnValueOnce(1000000000);
    expect(calculateAverage([1000000000])).toBe(1000000000);
  });

  // Test case 8: Arrays with very small numbers
  it('8. should handle arrays with very small numbers', () => {
    (sumArrayElements as jest.Mock).mockReturnValueOnce(0.0000001);
    expect(calculateAverage([0.0000001])).toBeCloseTo(0.0000001);
  });

  // Test case 9: Arrays with zero
  it('9. should handle arrays with zero', () => {
    (sumArrayElements as jest.Mock).mockReturnValueOnce(0);
    expect(calculateAverage([0, 0, 0])).toBe(0);
  });

  // Test case 10: Arrays with mixed integers and floating point numbers
  it('10. should handle arrays with mixed integers and floating point numbers', () => {
    (sumArrayElements as jest.Mock).mockReturnValueOnce(10.5);
    expect(calculateAverage([2, 3.5, 5])).toBeCloseTo(3.5);
  });

  // Test case 11: Arrays with repeated numbers
  it('11. should handle arrays with repeated numbers', () => {
    (sumArrayElements as jest.Mock).mockReturnValueOnce(15);
    expect(calculateAverage([5, 5, 5])).toBe(5);
  });

  // Test case 12: Arrays with NaN values
  it('12. should handle arrays with NaN values', () => {
    (sumArrayElements as jest.Mock).mockReturnValueOnce(NaN);
    expect(calculateAverage([NaN, NaN, NaN])).toBeNaN();
  });

  // Test case 13: Arrays with Infinity values
  it('13. should handle arrays with Infinity values', () => {
    (sumArrayElements as jest.Mock).mockReturnValueOnce(Infinity);
    expect(calculateAverage([Infinity, Infinity, Infinity])).toBe(Infinity);
  });

  // Test case 14: Arrays with -Infinity values
  it('14. should handle arrays with -Infinity values', () => {
    (sumArrayElements as jest.Mock).mockReturnValueOnce(-Infinity);
    expect(calculateAverage([-Infinity, -Infinity, -Infinity])).toBe(-Infinity);
  });

  // Test case 15: Arrays with mixed Infinity and finite numbers
  it('15. should handle arrays with mixed Infinity and finite numbers', () => {
    (sumArrayElements as jest.Mock).mockReturnValueOnce(Infinity);
    expect(calculateAverage([Infinity, 1, 2])).toBe(Infinity);
  });

  // Test case 16: Arrays with mixed -Infinity and finite numbers
  it('16. should handle arrays with mixed -Infinity and finite numbers', () => {
    (sumArrayElements as jest.Mock).mockReturnValueOnce(-Infinity);
    expect(calculateAverage([-Infinity, 1, 2])).toBe(-Infinity);
  });

  // Test case 17: Arrays with mixed NaN and finite numbers
  it('17. should handle arrays with mixed NaN and finite numbers', () => {
    (sumArrayElements as jest.Mock).mockReturnValueOnce(NaN);
    expect(calculateAverage([NaN, 1, 2])).toBeNaN();
  });

  // Test case 18: Arrays with mixed NaN and Infinity values
  it('18. should handle arrays with mixed NaN and Infinity values', () => {
    (sumArrayElements as jest.Mock).mockReturnValueOnce(NaN);
    expect(calculateAverage([NaN, Infinity, -Infinity])).toBeNaN();
  });

  // Test case 19: Arrays with very large and very small numbers
  it('19. should handle arrays with very large and very small numbers', () => {
    (sumArrayElements as jest.Mock).mockReturnValueOnce(1e10 + 1e-10);
    expect(calculateAverage([1e10, 1e-10])).toBeCloseTo(5e9);
  });

  // Test case 20: Arrays with mixed positive, negative, and zero numbers
  it('20. should handle arrays with mixed positive, negative, and zero numbers', () => {
    (sumArrayElements as jest.Mock).mockReturnValueOnce(0);
    expect(calculateAverage([1, -1, 0])).toBe(0);
  });
});
