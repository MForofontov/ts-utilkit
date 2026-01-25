/**
 * Interface for weighted elements with metadata.
 */
export interface WeightedElement<T> {
  /** The value of the element */
  value: T;
  /** The weight/probability for selection (must be positive) */
  weight: number;
  /** Optional metadata about the element */
  metadata?: Record<string, any>;
}

/**
 * Picks a random element from an array of weighted elements with metadata.
 *
 * @template T - The type of element values.
 * @param elements - Array of weighted elements.
 * @returns The selected weighted element.
 *
 * @throws {TypeError} If elements is not an array.
 * @throws {Error} If elements is empty, has invalid structure, or invalid weights.
 *
 * @example
 * const items = [
 *   { value: 'common', weight: 70, metadata: { rarity: 'common' } },
 *   { value: 'rare', weight: 25, metadata: { rarity: 'rare' } },
 *   { value: 'legendary', weight: 5, metadata: { rarity: 'legendary' } }
 * ];
 * randomElement(items); // { value: 'common', weight: 70, metadata: {...} }
 *
 * @complexity Time: O(n), Space: O(1) where n is number of elements
 */
export function randomElement<T>(
  elements: WeightedElement<T>[],
): WeightedElement<T> {
  if (!Array.isArray(elements)) {
    throw new TypeError(`elements must be an array, got ${typeof elements}`);
  }
  if (elements.length === 0) {
    throw new Error('elements array cannot be empty');
  }

  // Validate all elements have required structure
  for (let i = 0; i < elements.length; i++) {
    const elem = elements[i];
    if (typeof elem !== 'object' || elem === null) {
      throw new Error(`Element at index ${i} must be an object`);
    }
    if (!('value' in elem)) {
      throw new Error(`Element at index ${i} must have a 'value' property`);
    }
    if (!('weight' in elem)) {
      throw new Error(`Element at index ${i} must have a 'weight' property`);
    }
    if (typeof elem.weight !== 'number') {
      throw new Error(
        `Weight at index ${i} must be a number, got ${typeof elem.weight}`,
      );
    }
    if (isNaN(elem.weight)) {
      throw new Error(`Weight at index ${i} is NaN`);
    }
    if (elem.weight < 0) {
      throw new Error('All weights must be non-negative');
    }
  }

  // Calculate total weight
  const totalWeight = elements.reduce((sum, elem) => sum + elem.weight, 0);

  if (totalWeight === 0) {
    throw new Error('Sum of weights must be greater than zero');
  }

  // Select random element
  let random = Math.random() * totalWeight;

  for (let i = 0; i < elements.length; i++) {
    random -= elements[i].weight;
    if (random <= 0) {
      return elements[i];
    }
  }

  // Fallback
  return elements[elements.length - 1];
}
