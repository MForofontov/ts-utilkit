# Changelog - @ts-utilkit/math

All notable changes to this package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Deprecated
- `oddOrEven`: redundant with `isEven` and `isOdd`; use those directly. Will be removed in the next major version.

### Fixed
- `isEven`: added NaN and non-integer input validation (throws `Error` for NaN; throws `Error` for floats) — consistent with sibling `isOdd` behaviour

### Added
- `generatePrimes`: Sieve of Eratosthenes implementation moved from `@ts-utilkit/array` — this is a number theory function and belongs in the math package

### Added
- Declare `@ts-utilkit/array` as an explicit package dependency (formalises existing cross-package import)
- `clamp(n, min, max)`: clamp a number to an inclusive range; throws for NaN inputs or min > max
- `lerp(a, b, t)`: linear interpolation between two values; t outside [0, 1] extrapolates
- `normalizeValue(value, min, max)`: scale a value to [0, 1] within a range; returns NaN for degenerate range (min === max)
- `mapRange(value, inMin, inMax, outMin, outMax)`: re-map a value from one range to another; returns NaN for degenerate input range
- `calculatePercentile(arr, p)`: p-th percentile using linear interpolation (PERCENTILE.INC); throws for p outside [0, 100]
- `calculateZScore(value, mean, stdDev)`: standard score (z-score); returns NaN for zero stdDev, throws for negative stdDev
- `calculateCovariance(x, y)`: population covariance of two arrays; throws for length mismatch
- `calculateCorrelation(x, y)`: Pearson correlation coefficient; returns NaN for degenerate distributions, throws for length mismatch

## [0.1.1] - 2026-01-26

### Added
- Initial release of @ts-utilkit/math with 48 functions
- Algebra: `cubeRoot`, `exponential`, `logarithm`, `naturalLog`, `power`, `squareRoot`, `cbrt`
- Arithmetic: `absoluteValue`, `ceiling`, `divide`, `floor`, `multiply`, `round`, `roundToNearest`, `subtract`, `sumNumbers`, `truncate`
- Combinatorics: `combinations`, `factorial`, `permutations`, `nthPermutation`
- Geometry: `calculateCircleArea`, `calculateCircleCircumference`, `calculateDistance`, `calculateEuclideanDistance`, `calculateHaversineDistance`, `calculateManhattanDistance`, `calculateRectangleArea`, `calculateRectanglePerimeter`, `calculateTriangleArea`, `convertDegreesToRadians`, `convertRadiansToDegrees`
- Number Theory: `gcd`, `lcm`, `isPrime`, `isDivisibleBy`, `getDivisors`, `isPowerOfTwo`, `nextPrime`, `primeFactors`, `sumOfDivisors`
- Sequences: `fibonacci`, `triangularNumber`
- Statistics: `calculateMean`, `calculateMedian`, `calculateMode`, `calculateRange`, `calculateStandardDeviation`
- TypeScript-first with complete type definitions
- Comprehensive test coverage (>95%)

---

## Workflow

As you make changes, immediately add them to the **[Unreleased]** section:
1. Add item under appropriate category (Added/Changed/Fixed/Deprecated/Removed/Security)
2. When releasing, rename [Unreleased] to version number with date
3. Create new empty [Unreleased] section at the top
