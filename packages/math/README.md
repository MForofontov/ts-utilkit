# @ts-utilkit/math

math  Functions - TypeScript utility functions for math operations.

## Installation

```bash
npm install @ts-utilkit/math
```

## Features

- 🚀 TypeScript-first with complete type definitions
- ✅ Comprehensive test coverage (>95%)
- 📦 Tree-shakeable ESM and CommonJS support
- 🔒 Type-safe with strict TypeScript configuration
- 📖 Extensive JSDoc documentation

## Available Functions (56)

- **`calculateAverage`** - Calculate arithmetic mean
- **`calculateBinomialCoefficient`** - Calculate binomial coefficient
- **`calculateCircleArea`** - Calculate circle area
- **`calculateCircleCircumference`** - Calculate circle circumference
- **`calculateCombination`** - Calculate combinations (nCr)
- **`calculateConeSurfaceArea`** - Calculate cone surface area
- **`calculateConeVolume`** - Calculate cone volume
- **`calculateCosine`** - Calculate cosine (degrees input)
- **`calculateCubeRoot`** - Calculate cube root
- **`calculateCubeVolume`** - Calculate cube volume
- **`calculateCylinderSurfaceArea`** - Calculate cylinder surface area
- **`calculateCylinderVolume`** - Calculate cylinder volume
- **`calculateEllipseArea`** - Calculate ellipse area
- **`calculateFactorial`** - Calculate factorial
- **`calculateGeometricMean`** - Calculate geometric mean
- **`calculateHarmonicMean`** - Calculate harmonic mean
- **`calculateHaversineDistance`** - Calculate geographic distance
- **`calculateHypotenuse`** - Calculate triangle hypotenuse
- **`calculateInterquartileRange`** - Calculate IQR
- **`calculateLogarithm`** - Calculate logarithm with custom base
- **`calculateMedian`** - Calculate median value
- **`calculateMode`** - Calculate mode (most frequent)
- **`calculateParallelogramArea`** - Calculate parallelogram area
- **`calculatePercentage`** - Calculate percentage
- **`calculatePermutation`** - Calculate permutations (nPr)
- **`calculatePrismVolume`** - Calculate prism volume
- **`calculateProduct`** - Calculate product of numbers
- **`calculateRange`** - Calculate range (max - min)
- **`calculateRectangleArea`** - Calculate rectangle area
- **`calculateRectanglePerimeter`** - Calculate rectangle perimeter
- **`calculateSectorArea`** - Calculate sector area
- **`calculateSine`** - Calculate sine (degrees input)
- **`calculateSphereSurfaceArea`** - Calculate sphere surface area
- **`calculateSphereVolume`** - Calculate sphere volume
- **`calculateSquareRoot`** - Calculate square root
- **`calculateStandardDeviation`** - Calculate standard deviation
- **`calculateTangent`** - Calculate tangent (degrees input)
- **`calculateTrapezoidArea`** - Calculate trapezoid area
- **`calculateTriangleArea`** - Calculate triangle area
- **`calculateTriangularNumber`** - Calculate triangular number
- **`calculateVariance`** - Calculate variance
- **`ceilValue`** - Round up to integer
- **`coordinateDistance`** - Calculate distance between coordinates
- **`degreesToRadians`** - Convert degrees to radians
- **`fibonacciIterative`** - Calculate Fibonacci (iterative)
- **`fibonacciRecursive`** - Calculate Fibonacci (recursive)
- **`gcd`** - Calculate greatest common divisor
- **`isEven`** - Check if number is even
- **`isOdd`** - Check if number is odd
- **`isPerfectSquare`** - Check if perfect square
- **`isPrime`** - Check if prime number
- **`lcm`** - Calculate least common multiple
- **`oddOrEven`** - Return "even" or "odd"
- **`radiansToDegrees`** - Convert radians to degrees
- **`roundToDecimals`** - Round to decimal places
- **`roundValue`** - Round to nearest integer

## Usage Examples

```typescript
import { 
  calculateStandardDeviation, 
  calculateHaversineDistance, 
  isPrime,
  calculateFactorial 
} from '@ts-utilkit/math';

// Statistical calculations
const data = [2, 4, 4, 4, 5, 5, 7, 9];
const stdDev = calculateStandardDeviation(data); // ~2.138

// Geographic distance calculation
const distance = calculateHaversineDistance(
  { lat: 40.7128, lng: -74.0060 }, // New York
  { lat: 34.0522, lng: -118.2437 }  // Los Angeles
); // ~3944.42 km

// Number theory
const primeCheck = isPrime(97); // true
const factorial = calculateFactorial(5); // 120
```

## API Documentation

For complete API documentation, please visit the [main repository](https://github.com/MForofontov/ts-utilkit).

## License

MIT © MForofontov

## Contributing

Contributions are welcome! Please see the [main repository](https://github.com/MForofontov/ts-utilkit) for contribution guidelines.
