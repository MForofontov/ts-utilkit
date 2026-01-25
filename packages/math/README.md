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

### Arithmetic & Basic Operations (4)
- **`ceilValue`** - Round up to integer
- **`calculatePercentage`** - Calculate percentage
- **`roundToDecimals`** - Round to decimal places
- **`roundValue`** - Round to nearest integer

### Algebra (3)
- **`calculateCubeRoot`** - Calculate cube root
- **`calculateLogarithm`** - Calculate logarithm with custom base
- **`calculateSquareRoot`** - Calculate square root

### Geometry (25)
- **`calculateCircleArea`** - Calculate circle area
- **`calculateCircleCircumference`** - Calculate circle circumference
- **`calculateConeSurfaceArea`** - Calculate cone surface area
- **`calculateConeVolume`** - Calculate cone volume
- **`calculateCubeVolume`** - Calculate cube volume
- **`calculateCylinderSurfaceArea`** - Calculate cylinder surface area
- **`calculateCylinderVolume`** - Calculate cylinder volume
- **`calculateEllipseArea`** - Calculate ellipse area
- **`calculateHypotenuse`** - Calculate triangle hypotenuse
- **`calculateParallelogramArea`** - Calculate parallelogram area
- **`calculatePrismVolume`** - Calculate prism volume
- **`calculateRectangleArea`** - Calculate rectangle area
- **`calculateRectanglePerimeter`** - Calculate rectangle perimeter
- **`calculateSectorArea`** - Calculate sector area
- **`calculateSphereSurfaceArea`** - Calculate sphere surface area
- **`calculateSphereVolume`** - Calculate sphere volume
- **`calculateTrapezoidArea`** - Calculate trapezoid area
- **`calculateTriangleArea`** - Calculate triangle area
- **`coordinateDistance`** - Calculate distance between coordinates
- **`calculateHaversineDistance`** - Calculate geographic distance
- **`calculateCosine`** - Calculate cosine (degrees input)
- **`calculateSine`** - Calculate sine (degrees input)
- **`calculateTangent`** - Calculate tangent (degrees input)
- **`degreesToRadians`** - Convert degrees to radians
- **`radiansToDegrees`** - Convert radians to degrees

### Statistics (10)
- **`calculateAverage`** - Calculate arithmetic mean
- **`calculateGeometricMean`** - Calculate geometric mean
- **`calculateHarmonicMean`** - Calculate harmonic mean
- **`calculateInterquartileRange`** - Calculate IQR
- **`calculateMedian`** - Calculate median value
- **`calculateMode`** - Calculate mode (most frequent)
- **`calculateProduct`** - Calculate product of numbers
- **`calculateRange`** - Calculate range (max - min)
- **`calculateStandardDeviation`** - Calculate standard deviation
- **`calculateVariance`** - Calculate variance

### Number Theory (7)
- **`gcd`** - Calculate greatest common divisor
- **`isEven`** - Check if number is even
- **`isOdd`** - Check if number is odd
- **`isPerfectSquare`** - Check if perfect square
- **`isPrime`** - Check if prime number
- **`lcm`** - Calculate least common multiple
- **`oddOrEven`** - Return "even" or "odd"

### Combinatorics (4)
- **`calculateBinomialCoefficient`** - Calculate binomial coefficient
- **`calculateCombination`** - Calculate combinations (nCr)
- **`calculateFactorial`** - Calculate factorial
- **`calculatePermutation`** - Calculate permutations (nPr)

### Sequences (3)
- **`calculateTriangularNumber`** - Calculate triangular number
- **`fibonacciIterative`** - Calculate Fibonacci (iterative)
- **`fibonacciRecursive`** - Calculate Fibonacci (recursive)

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
