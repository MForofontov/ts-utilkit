/**
 * Represents a multi-map data structure where each key maps to an ordered array of values.
 *
 * @template K - The key type.
 * @template V - The value type.
 *
 * @example
 * ```typescript
 * const mm = createMultiMap<string, number>();
 * mm.set('a', 1).set('a', 2).set('b', 3);
 * mm.get('a'); // [1, 2]
 * mm.get('b'); // [3]
 * mm.size;     // 2
 * ```
 */
export interface MultiMap<K, V> {
  /**
   * Appends a value under the given key and returns `this` for chaining.
   *
   * @param key - The key to append the value to.
   * @param value - The value to append.
   */
  set(key: K, value: V): MultiMap<K, V>;

  /**
   * Appends all values in the given array under the given key and returns `this` for chaining.
   *
   * @param key - The key to append the values to.
   * @param values - The values to append.
   */
  setAll(key: K, values: V[]): MultiMap<K, V>;

  /**
   * Returns all values stored under `key`, or an empty array if the key does not exist.
   *
   * @param key - The key to look up.
   */
  get(key: K): V[];

  /**
   * Returns `true` if the key has at least one associated value.
   *
   * @param key - The key to check.
   */
  has(key: K): boolean;

  /**
   * Returns `true` if the given `value` exists under `key` (strict equality).
   *
   * @param key - The key to search within.
   * @param value - The value to find.
   */
  hasEntry(key: K, value: V): boolean;

  /**
   * Removes the key and all of its associated values.
   * Returns `true` if the key existed, `false` otherwise.
   *
   * @param key - The key to delete.
   */
  delete(key: K): boolean;

  /**
   * Removes a single occurrence of `value` under `key`.
   * If no more values remain for the key, the key itself is also removed.
   * Returns `true` if the entry was found and removed, `false` otherwise.
   *
   * @param key - The key to search within.
   * @param value - The value to remove (first occurrence, strict equality).
   */
  deleteEntry(key: K, value: V): boolean;

  /** Removes all keys and values. */
  clear(): void;

  /** Returns an iterator over all keys that have at least one value. */
  keys(): IterableIterator<K>;

  /** Returns an iterator of `[key, values[]]` pairs. */
  entries(): IterableIterator<[K, V[]]>;

  /** The number of distinct keys currently stored. */
  readonly size: number;

  /**
   * Returns a plain `Map<K, V[]>` snapshot of the current contents.
   * The returned Map and its value arrays are independent copies.
   */
  toMap(): Map<K, V[]>;
}

/**
 * Creates a new empty multi-map — a Map where each key holds an ordered array of values.
 * Supports method chaining and provides helpers for common multi-map operations.
 *
 * @template K - The key type.
 * @template V - The value type.
 * @returns A fresh {@link MultiMap} instance.
 *
 * @example
 * // Build incrementally with chaining
 * const mm = createMultiMap<string, number>();
 * mm.set('a', 1).set('a', 2).set('b', 3);
 * mm.get('a'); // [1, 2]
 * mm.get('b'); // [3]
 * mm.get('z'); // []
 *
 * @example
 * // Bulk insertion
 * const mm = createMultiMap<string, string>();
 * mm.setAll('fruits', ['apple', 'banana', 'cherry']);
 * mm.get('fruits'); // ['apple', 'banana', 'cherry']
 *
 * @example
 * // Removing entries
 * const mm = createMultiMap<string, number>();
 * mm.set('a', 1).set('a', 2).set('a', 1);
 * mm.deleteEntry('a', 1); // removes first occurrence → [2, 1]
 * mm.delete('a');         // removes the key entirely
 * mm.has('a');            // false
 *
 * @example
 * // Converting to a plain Map
 * const mm = createMultiMap<string, number>();
 * mm.set('x', 10).set('x', 20);
 * mm.toMap(); // Map { 'x' => [10, 20] }
 *
 * @note `set` and `setAll` append values — duplicate values are allowed.
 * @note `deleteEntry` removes only the first matching occurrence (strict equality).
 * @note `get` always returns a new array copy so mutations do not affect internal state.
 *
 * @complexity
 *   set / get / has / delete: O(1) amortised
 *   setAll(k, values): O(m) where m is values.length
 *   hasEntry / deleteEntry: O(n) where n is the number of values for the key
 *   toMap: O(total values)
 */
export function createMultiMap<K, V>(): MultiMap<K, V> {
  const store = new Map<K, V[]>();

  const multiMap: MultiMap<K, V> = {
    set(key: K, value: V): MultiMap<K, V> {
      const existing = store.get(key);
      if (existing !== undefined) {
        existing.push(value);
      } else {
        store.set(key, [value]);
      }

      return multiMap;
    },

    setAll(key: K, values: V[]): MultiMap<K, V> {
      const existing = store.get(key);
      if (existing !== undefined) {
        existing.push(...values);
      } else {
        store.set(key, [...values]);
      }

      return multiMap;
    },

    get(key: K): V[] {
      const values = store.get(key);
      return values !== undefined ? [...values] : [];
    },

    has(key: K): boolean {
      return store.has(key);
    },

    hasEntry(key: K, value: V): boolean {
      const values = store.get(key);
      return values !== undefined && values.includes(value);
    },

    delete(key: K): boolean {
      return store.delete(key);
    },

    deleteEntry(key: K, value: V): boolean {
      const values = store.get(key);
      if (values === undefined) {
        return false;
      }

      const index = values.indexOf(value);
      if (index === -1) {
        return false;
      }

      values.splice(index, 1);

      if (values.length === 0) {
        store.delete(key);
      }

      return true;
    },

    clear(): void {
      store.clear();
    },

    keys(): IterableIterator<K> {
      return store.keys();
    },

    entries(): IterableIterator<[K, V[]]> {
      return (function* () {
        for (const [key, values] of store.entries()) {
          yield [key, [...values]] as [K, V[]];
        }
      })();
    },

    get size(): number {
      return store.size;
    },

    toMap(): Map<K, V[]> {
      const result = new Map<K, V[]>();
      for (const [key, values] of store.entries()) {
        result.set(key, [...values]);
      }
      return result;
    },
  };

  return multiMap;
}
