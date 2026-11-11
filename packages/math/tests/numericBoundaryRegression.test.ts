import { calculateHypotenuse } from '../src/geometricFunctions/calculateHypotenuse';
import { coordinateDistance } from '../src/geometricFunctions/coordinateDistance';
import { calculateFactorial } from '../src/combinatoricsFunctions/calculateFactorial';
import { calculateRange } from '../src/statisticsFunctions/dispersion/calculateRange';

describe('numeric boundaries', () => {
  it('1. avoids overflowing intermediate squares for representable distances', () => {
    expect(calculateHypotenuse(3e200, 4e200) / 1e200).toBeCloseTo(5);
    expect(coordinateDistance(0, 0, 3e200, 4e200) / 1e200).toBeCloseTo(5);
    expect(calculateHypotenuse(3e-200, 4e-200) / 1e-200).toBeCloseTo(5);
  });

  it('2. returns numeric overflow rather than overflowing the call stack', () => {
    expect(calculateFactorial(100_000)).toBe(Infinity);
    expect(Number.isFinite(calculateFactorial(170))).toBe(true);
    expect(calculateFactorial(0)).toBe(1);
  });

  it('3. computes ranges without a function argument limit', () => {
    expect(calculateRange(Array.from({ length: 200_000 }, (_, i) => i))).toBe(
      199_999,
    );
    expect(calculateRange([1, NaN, 2])).toBeNaN();
  });

  it.each([NaN, 1.5])('4. rejects invalid factorial arguments %s', (value) => {
    expect(() => calculateFactorial(value)).toThrow(Error);
  });
});
