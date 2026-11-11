# @ts-utilkit/math

math Functions - TypeScript utility functions for math operations.

## Installation

```bash
npm install @ts-utilkit/math
```

## Features

- 🚀 TypeScript-first with complete type definitions
- ✅ Comprehensive test coverage (>95%)
- 📦 CommonJS builds with import and require entry points
- 🔒 Type-safe with strict TypeScript configuration
- 📖 Extensive JSDoc documentation

## Available Functions (65)

- **`calculateCubeRoot`** - Calculate cube root
- **`calculateLogarithm`** - Calculate logarithm with custom base
- **`calculateSquareRoot`** - Calculate square root
- **`calculatePercentage`** - Calculate percentage
- **`ceilValue`** - Round up to integer
- **`clamp`** - Clamps a number within the inclusive range [min, max].
- **`lerp`** - Linearly interpolates between two values.
- **`mapRange`** - Maps a value from one numeric range to another.
- **`normalizeValue`** - Normalizes a value from an arbitrary range [min, max] to the unit interval [0, 1].
- **`roundToDecimals`** - Round to decimal places
- **`roundValue`** - Round to nearest integer
- **`calculateBinomialCoefficient`** - Calculate binomial coefficient
- **`calculateCombination`** - Calculate combinations (nCr)
- **`calculateFactorial`** - Calculate factorial
- **`calculatePermutation`** - Calculate permutations (nPr)
- **`calculateCircleArea`** - Calculate circle area
- **`calculateCircleCircumference`** - Calculate circle circumference
- **`calculateConeSurfaceArea`** - Calculate cone surface area
- **`calculateConeVolume`** - Calculate cone volume
- **`calculateCosine`** - Calculate cosine (degrees input)
- **`calculateCubeVolume`** - Calculate cube volume
- **`calculateCylinderSurfaceArea`** - Calculate cylinder surface area
- **`calculateCylinderVolume`** - Calculate cylinder volume
- **`calculateEllipseArea`** - Calculate ellipse area
- **`calculateHaversineDistance`** - Calculate geographic distance
- **`calculateHypotenuse`** - Calculate triangle hypotenuse
- **`calculateParallelogramArea`** - Calculate parallelogram area
- **`calculatePrismVolume`** - Calculate prism volume
- **`calculateRectangleArea`** - Calculate rectangle area
- **`calculateRectanglePerimeter`** - Calculate rectangle perimeter
- **`calculateSectorArea`** - Calculate sector area
- **`calculateSine`** - Calculate sine (degrees input)
- **`calculateSphereSurfaceArea`** - Calculate sphere surface area
- **`calculateSphereVolume`** - Calculate sphere volume
- **`calculateTangent`** - Calculate tangent (degrees input)
- **`calculateTrapezoidArea`** - Calculate trapezoid area
- **`calculateTriangleArea`** - Calculate triangle area
- **`coordinateDistance`** - Calculate distance between coordinates
- **`degreesToRadians`** - Convert degrees to radians
- **`radiansToDegrees`** - Convert radians to degrees
- **`gcd`** - Calculate greatest common divisor
- **`generatePrimes`** - Generates an array of all prime numbers up to a specified limit using the Sieve of Eratosthenes algorithm.
- **`isEven`** - Check if number is even
- **`isOdd`** - Check if number is odd
- **`isPerfectSquare`** - Check if perfect square
- **`isPrime`** - Check if prime number
- **`lcm`** - Calculate least common multiple
- **`oddOrEven`** - Return "even" or "odd"
- **`calculateTriangularNumber`** - Calculate triangular number
- **`fibonacciIterative`** - Calculate Fibonacci (iterative)
- **`fibonacciRecursive`** - Calculate Fibonacci (recursive)
- **`calculateAverage`** - Calculate arithmetic mean
- **`calculateGeometricMean`** - Calculate geometric mean
- **`calculateHarmonicMean`** - Calculate harmonic mean
- **`calculateMedian`** - Calculate median value
- **`calculateMode`** - Calculate mode (most frequent)
- **`calculateProduct`** - Calculate product of numbers
- **`calculateInterquartileRange`** - Calculate IQR
- **`calculatePercentile`** - Calculates the p-th percentile of a numeric array using linear interpolation.
- **`calculateRange`** - Calculate range (max - min)
- **`calculateStandardDeviation`** - Calculate standard deviation
- **`calculateVariance`** - Calculate variance
- **`calculateZScore`** - Calculates the standard score (z-score) of a single value.
- **`calculateCorrelation`** - Calculates the Pearson correlation coefficient of two numeric arrays.
- **`calculateCovariance`** - Calculates the population covariance of two numeric arrays.

## Quick Example

`lerp`, `normalizeValue`, and `mapRange` avoid intermediate overflow for finite
operands. Ordinary arithmetic and validation remain unchanged; results outside
the input range are still extrapolated rather than clamped.

```typescript
import {
  calculateAverage,
  isPrime,
  calculateFactorial,
  calculateCombination,
} from '@ts-utilkit/math';

calculateAverage([1, 2, 3, 4, 5]); // 3
isPrime(17); // true
calculateFactorial(5); // 120
calculateCombination(200, 2); // 19900
```

## License

MIT © [Mykyta Forofontov](https://github.com/MForofontov)

## Contributing

Contributions are welcome! Please see the [main repository](https://github.com/MForofontov/ts-utilkit) for contribution guidelines.
