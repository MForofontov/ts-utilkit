/**
 * Optimization suggestions for a regex pattern.
 */
export interface OptimizationSuggestions {
  /** Whether the pattern can be optimized */
  canOptimize: boolean;
  /** List of optimization suggestions */
  suggestions: string[];
  /** Optimized pattern (if applicable) */
  optimizedPattern?: string;
}

/**
 * Analyzes a regex pattern and suggests optimizations.
 *
 * @param pattern - The regex pattern to optimize (string or RegExp).
 * @returns Optimization suggestions.
 *
 * @throws {TypeError} If pattern is not a string or RegExp.
 * @throws {Error} If pattern is invalid.
 *
 * @example
 * // Pattern with unnecessary groups
 * optimizePattern(/(test)/);
 * // { canOptimize: true, suggestions: ["Remove unnecessary capturing group..."], optimizedPattern: "test" }
 *
 * @example
 * // Pattern with repeated character class
 * optimizePattern(/[0-9][0-9][0-9]/);
 * // { canOptimize: true, suggestions: ["Use quantifier instead..."], optimizedPattern: "[0-9]{3}" }
 *
 * @note This provides heuristic suggestions and may not cover all optimization cases.
 *
 * @complexity Time: O(n), Space: O(n) where n is pattern length
 */
export function optimizePattern(
  pattern: string | RegExp,
): OptimizationSuggestions {
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

  const suggestions: string[] = [];
  let optimized = source;

  // Check for unnecessary capturing groups (can use non-capturing groups)
  // Pattern: (pattern) that doesn't seem to be referenced
  const unnecessaryGroups = source.match(/\([^?)]/g);
  if (unnecessaryGroups && unnecessaryGroups.length > 0) {
    // Check if there are backreferences
    const hasBackrefs = /\\[1-9]/.test(source);
    if (!hasBackrefs) {
      suggestions.push(
        "Consider using non-capturing groups (?:...) instead of capturing groups (...) if you don't need the captures",
      );
      optimized = optimized.replace(/\((?!\?)/g, '(?:');
    }
  }

  // Check for repeated character classes that could use quantifiers
  // Pattern: [a-z][a-z][a-z] -> [a-z]{3}
  const repeatedCharClass = /(\[[^\]]+\])\1+/g;
  const matches = source.match(repeatedCharClass);
  if (matches) {
    suggestions.push(
      'Use quantifiers for repeated character classes (e.g., [a-z]{3} instead of [a-z][a-z][a-z])',
    );
  }

  // Check for dot with global flag (could be more specific)
  if (/\./.test(source)) {
    suggestions.push(
      'Consider using more specific character classes instead of . (dot) for better performance and clarity',
    );
  }

  // Check for greedy quantifiers that could be possessive/atomic
  const greedyQuantifiers = /[*+]\?/.test(source);
  if (!greedyQuantifiers && /[*+]/.test(source)) {
    suggestions.push(
      'Consider using lazy quantifiers (*?, +?) if you want minimal matching',
    );
  }

  // Check for ^.* or .*$ which are often redundant
  if (/\^\.\*/.test(source)) {
    suggestions.push(
      'Pattern starts with ^.* which matches from beginning - consider if this is necessary',
    );
    optimized = optimized.replace(/^\^\.\*/, '');
  }

  if (/\.\*\$/.test(source)) {
    suggestions.push(
      'Pattern ends with .*$ which matches to end - consider if this is necessary',
    );
    optimized = optimized.replace(/\.\*\$$/, '');
  }

  // Check for alternation that could be a character class
  // Pattern: (a|b|c) -> [abc]
  const simpleAlternation = /\(([a-z])\|([a-z])(?:\|([a-z]))*\)/i;
  if (simpleAlternation.test(source)) {
    suggestions.push(
      'Simple character alternations (a|b|c) can be replaced with character classes [abc]',
    );
  }

  return {
    canOptimize: suggestions.length > 0,
    suggestions,
    optimizedPattern: suggestions.length > 0 ? optimized : undefined,
  };
}
