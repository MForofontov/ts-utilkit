/**
 * Analyzes a regex pattern and returns complexity metrics.
 */
export interface PatternComplexity {
  /** Number of capture groups */
  captureGroups: number;
  /** Number of character classes */
  characterClasses: number;
  /** Number of quantifiers (+, *, {n,m}) */
  quantifiers: number;
  /** Number of alternations (|) */
  alternations: number;
  /** Whether pattern uses lookaheads/lookbehinds */
  hasLookarounds: boolean;
  /** Whether pattern uses backreferences */
  hasBackreferences: boolean;
  /** Estimated complexity level: 'low', 'medium', 'high' */
  complexityLevel: 'low' | 'medium' | 'high';
  /** Total complexity score */
  score: number;
}

/**
 * Analyzes a regex pattern and returns complexity metrics.
 *
 * @param pattern - The regex pattern to analyze (string or RegExp).
 * @returns Complexity analysis object.
 *
 * @throws {TypeError} If pattern is not a string or RegExp.
 * @throws {Error} If pattern is invalid.
 *
 * @example
 * // Simple pattern
 * getPatternComplexity(/\d+/);
 * // { captureGroups: 0, quantifiers: 1, ..., complexityLevel: 'low', score: 1 }
 *
 * @example
 * // Complex pattern
 * getPatternComplexity(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/);
 * // { hasLookarounds: true, ..., complexityLevel: 'high', score: 15 }
 *
 * @note Higher scores indicate more complex patterns that may be slower to execute.
 *
 * @complexity Time: O(n), Space: O(1) where n is pattern length
 */
export function getPatternComplexity(
  pattern: string | RegExp,
): PatternComplexity {
  if (typeof pattern !== 'string' && !(pattern instanceof RegExp)) {
    throw new TypeError(
      `pattern must be a string or RegExp, got ${typeof pattern}`,
    );
  }

  let source: string;

  try {
    source = typeof pattern === 'string' ? pattern : pattern.source;
  } catch (e) {
    throw new Error(
      `Invalid regular expression pattern: ${pattern instanceof RegExp ? pattern.source : pattern}`,
    );
  }

  // Count various pattern elements
  const captureGroups = (source.match(/\([^?]/g) || []).length;
  const characterClasses = (source.match(/\[.*?\]/g) || []).length;
  const quantifiers = (source.match(/[*+?]|\{\d+,?\d*\}/g) || []).length;
  const alternations = (source.match(/\|/g) || []).length;
  // Count all lookaround assertions: (?=, (?!, (?<=, (?<!
  const lookaroundMatches = source.match(/\(\?[=!<]/g) || [];
  const hasLookarounds = lookaroundMatches.length > 0;
  const hasBackreferences = /\\[1-9]/.test(source);

  // Calculate complexity score
  let score = 0;
  score += captureGroups * 2;
  score += characterClasses * 1;
  score += quantifiers * 1;
  score += alternations * 2;
  score += hasLookarounds ? 5 : 0;
  score += hasBackreferences ? 3 : 0;

  // Determine complexity level
  let complexityLevel: 'low' | 'medium' | 'high';
  if (score <= 5) {
    complexityLevel = 'low';
  } else if (score <= 15) {
    complexityLevel = 'medium';
  } else {
    complexityLevel = 'high';
  }

  return {
    captureGroups,
    characterClasses,
    quantifiers,
    alternations,
    hasLookarounds,
    hasBackreferences,
    complexityLevel,
    score,
  };
}
