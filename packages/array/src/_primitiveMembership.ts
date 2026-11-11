/**
 * Builds native membership for larger data-only arrays. Accessors and inherited
 * elements retain lazy nested comparison so reads cannot change observable order.
 * Object comparisons retain deep equality. Genuine holes are never inserted.
 */
export function primitiveMembership<T>(
  source: T[],
  comparison: T[],
): Set<T> | undefined {
  if (source.length < 32 || comparison.length < 32) return undefined;
  const keys = new Set<T>();
  for (let index = 0; index < comparison.length; index++) {
    const descriptor = Object.getOwnPropertyDescriptor(comparison, index);
    if (descriptor === undefined) {
      if (index in comparison) return undefined;
      continue;
    }
    if (!Object.hasOwn(descriptor, 'value')) return undefined;
    const item: unknown = descriptor.value;
    if (item !== null && typeof item === 'object') return undefined;
    keys.add(item as T);
  }
  for (let index = 0; index < source.length; index++) {
    const descriptor = Object.getOwnPropertyDescriptor(source, index);
    if (descriptor === undefined) {
      if (index in source) return undefined;
    } else if (!Object.hasOwn(descriptor, 'value')) {
      return undefined;
    }
  }
  return keys;
}
