import { delay as delayFn } from '@ts-utilkit/utility';

/**
 * Processes an array of items in sequential batches by calling `batchFn` once
 * per batch, then concatenating the results in original item order.
 * An optional delay between batches enables basic rate-limiting.
 *
 * Unlike `asyncParallel` (which controls concurrent individual tasks),
 * `asyncBatch` groups items and lets the caller decide how to handle each group.
 *
 * @param items - The flat array of items to process.
 * @param batchFn - Async function called once per batch. Receives the batch
 * sub-array and must resolve with an array of results in the same positional
 * order as the input batch.
 * @param batchSize - Maximum number of items per batch. Must be a positive integer.
 * @param options - Optional configuration.
 * @param options.delayMs - Milliseconds to wait between successive batches.
 * Useful for rate-limiting external API calls. Defaults to 0 (no delay).
 * @returns Promise that resolves with the concatenated results of all batches
 * in the original item order.
 *
 * @throws {Error} If `batchSize` is not a positive integer.
 * @throws {Error} If `options.delayMs` is negative.
 *
 * @example
 * // Send emails in batches of 50 with a 1-second pause between batches
 * const receipts = await asyncBatch(
 *   emailAddresses,
 *   async (batch) => sendBulkEmail(batch),
 *   50,
 *   { delayMs: 1000 },
 * );
 *
 * @example
 * // Bulk-insert database rows in chunks
 * const insertedIds = await asyncBatch(
 *   rows,
 *   async (batch) => db.insertMany(batch),
 *   100,
 * );
 *
 * @example
 * // Empty items returns empty array immediately
 * const result = await asyncBatch([], async (b) => b, 10); // []
 *
 * @note The caller is responsible for ensuring `batchFn` returns an array of
 * the same length as the input batch when positional correspondence matters.
 * `asyncBatch` concatenates results without length validation.
 *
 * @complexity Time: O(n) where n is items length, Space: O(n)
 */
export function asyncBatch<T, R>(
  items: T[],
  batchFn: (batch: T[]) => Promise<R[]>,
  batchSize: number,
  options: { delayMs?: number } = {},
): Promise<R[]> {

  if (!Number.isInteger(batchSize) || batchSize <= 0) {
    throw new Error(`batchSize must be a positive integer, got ${batchSize}`);
  }

  const { delayMs = 0 } = options;

  if (delayMs < 0) {
    throw new Error(`delayMs must be non-negative, got ${delayMs}`);
  }

  return (async () => {
    if (items.length === 0) {
      return [];
    }

    const results: R[] = [];

    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      const batchResults = await batchFn(batch);
      results.push(...batchResults);

      // Apply inter-batch delay (skip after the final batch)
      if (delayMs > 0 && i + batchSize < items.length) {
        await delayFn(delayMs);
      }
    }

    return results;
  })();
}
