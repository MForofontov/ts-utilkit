/**
 * Fluent builder for constructing regular expression patterns safely.
 */
export class PatternBuilder {
  private parts: string[] = [];
  private regexFlags: string = '';

  /**
   * Adds a literal string to the pattern (escapes special characters).
   *
   * @param text - The literal text to match.
   * @returns The builder instance for chaining.
   */
  literal(text: string): this {
    if (typeof text !== 'string') {
      throw new TypeError(`text must be a string, got ${typeof text}`);
    }
    // Escape regex special characters
    const escaped = text.replace(/[.*+?^${}()|[\]\\/ ]/g, '\\$&');
    this.parts.push(escaped);
    return this;
  }

  /**
   * Adds a raw pattern fragment (not escaped).
   *
   * @param pattern - The raw regex pattern to add.
   * @returns The builder instance for chaining.
   */
  raw(pattern: string): this {
    if (typeof pattern !== 'string') {
      throw new TypeError(`pattern must be a string, got ${typeof pattern}`);
    }
    this.parts.push(pattern);
    return this;
  }

  /**
   * Adds a character class pattern.
   *
   * @param chars - Characters or ranges to include (e.g., 'a-z0-9').
   * @param negate - Whether to negate the character class (default: false).
   * @returns The builder instance for chaining.
   */
  charClass(chars: string, negate: boolean = false): this {
    if (typeof chars !== 'string') {
      throw new TypeError(`chars must be a string, got ${typeof chars}`);
    }
    if (typeof negate !== 'boolean') {
      throw new TypeError(`negate must be a boolean, got ${typeof negate}`);
    }
    this.parts.push(`[${negate ? '^' : ''}${chars}]`);
    return this;
  }

  /**
   * Makes the last added pattern optional.
   *
   * @returns The builder instance for chaining.
   */
  optional(): this {
    if (this.parts.length === 0) {
      throw new Error('Cannot make optional: no pattern parts added yet');
    }
    const last = this.parts[this.parts.length - 1];
    this.parts[this.parts.length - 1] = `(?:${last})?`;
    return this;
  }

  /**
   * Makes the last added pattern repeat with quantifier.
   *
   * @param min - Minimum repetitions.
   * @param max - Maximum repetitions (optional, infinite if not provided).
   * @returns The builder instance for chaining.
   */
  repeat(min: number, max?: number): this {
    if (this.parts.length === 0) {
      throw new Error('Cannot add repeat: no pattern parts added yet');
    }
    if (typeof min !== 'number' || min < 0) {
      throw new TypeError('min must be a non-negative number');
    }
    if (max !== undefined && (typeof max !== 'number' || max < min)) {
      throw new TypeError('max must be a number >= min');
    }

    const last = this.parts[this.parts.length - 1];
    const quantifier = max === undefined ? `{${min},}` : `{${min},${max}}`;
    this.parts[this.parts.length - 1] = `(?:${last})${quantifier}`;
    return this;
  }

  /**
   * Creates a capturing group from the current pattern.
   *
   * @param name - Optional name for named capture group.
   * @returns The builder instance for chaining.
   */
  group(name?: string): this {
    if (name !== undefined && typeof name !== 'string') {
      throw new TypeError(`name must be a string, got ${typeof name}`);
    }

    const pattern = this.parts.join('');
    this.parts = [];
    this.parts.push(name ? `(?<${name}>${pattern})` : `(${pattern})`);
    return this;
  }

  /**
   * Adds alternation (OR) between patterns.
   *
   * @param alternatives - Alternative patterns to match.
   * @returns The builder instance for chaining.
   */
  or(...alternatives: string[]): this {
    if (alternatives.length === 0) {
      throw new Error('At least one alternative is required');
    }
    const current = this.parts.join('');
    const allAlternatives = current ? [current, ...alternatives] : alternatives;
    const alternation = allAlternatives.join('|');
    this.parts = [`(?:${alternation})`];
    return this;
  }

  /**
   * Adds an anchor to the pattern.
   *
   * @param anchor - Anchor type: 'start' (^), 'end' ($), 'word' (\b).
   * @returns The builder instance for chaining.
   */
  anchor(anchor: 'start' | 'end' | 'word'): this {
    const anchors = {
      start: '^',
      end: '$',
      word: '\\b',
    };

    if (!(anchor in anchors)) {
      throw new Error(
        `Invalid anchor: ${anchor}. Must be 'start', 'end', or 'word'`,
      );
    }

    this.parts.push(anchors[anchor]);
    return this;
  }

  /**
   * Sets regex flags.
   *
   * @param flags - Regex flags (e.g., 'gi', 'im').
   * @returns The builder instance for chaining.
   */
  flags(flags: string): this {
    if (typeof flags !== 'string') {
      throw new TypeError(`flags must be a string, got ${typeof flags}`);
    }
    this.regexFlags = flags;
    return this;
  }

  /**
   * Builds and returns the final RegExp object.
   *
   * @returns The constructed RegExp.
   */
  build(): RegExp {
    const pattern = this.parts.join('');
    return new RegExp(pattern, this.regexFlags);
  }

  /**
   * Returns the pattern string without creating a RegExp.
   *
   * @returns The pattern string.
   */
  toString(): string {
    return this.parts.join('');
  }
}

/**
 * Creates a new pattern builder for fluent regex construction.
 *
 * @returns New PatternBuilder instance.
 *
 * @example
 * // Build email pattern
 * const emailPattern = buildPattern()
 *   .anchor('start')
 *   .raw('[^@]+')
 *   .literal('@')
 *   .raw('[^@]+')
 *   .literal('.')
 *   .raw('[^@]+')
 *   .anchor('end')
 *   .build();
 *
 * @example
 * // Build phone pattern with groups
 * const phonePattern = buildPattern()
 *   .literal('(')
 *   .charClass('0-9')
 *   .repeat(3)
 *   .literal(') ')
 *   .charClass('0-9')
 *   .repeat(3)
 *   .literal('-')
 *   .charClass('0-9')
 *   .repeat(4)
 *   .build();
 *
 * @complexity Time: O(n), Space: O(n) where n is the number of pattern parts
 */
export function buildPattern(): PatternBuilder {
  return new PatternBuilder();
}
