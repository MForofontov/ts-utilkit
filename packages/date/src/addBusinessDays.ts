/**
 * Adds signed Monday–Friday business days, preserving local time and the input.
 * @param date - Valid starting date.
 * @param amount - Signed safe integer business-day count; zero returns a copy.
 * @returns A new date; a weekend starting day does not count toward the amount.
 * @throws {TypeError} If date is not a Date or amount is not a number.
 * @throws {RangeError} If date/amount is invalid or the result exceeds Date's range.
 * @example addBusinessDays(new Date(2026, 9, 23), 1); // Monday, October 26
 * @note Holidays are not excluded. Local DST rules apply to nonexistent target times.
 * @complexity Time: O(1), Space: O(1); whole weeks are skipped in one operation.
 */
export function addBusinessDays(date: Date, amount: number): Date {
  if (!(date instanceof Date)) throw new TypeError('date must be a Date');
  if (typeof amount !== 'number')
    throw new TypeError('amount must be a number');
  if (Number.isNaN(date.getTime()))
    throw new RangeError('date must be a valid Date');
  if (!Number.isSafeInteger(amount))
    throw new RangeError('amount must be a safe integer');
  const result = new Date(date);
  if (amount === 0) return result;
  const direction = amount > 0 ? 1 : -1;
  let remaining = Math.abs(amount);
  while (result.getDay() === 0 || result.getDay() === 6) {
    result.setDate(result.getDate() + direction);
    if (result.getDay() !== 0 && result.getDay() !== 6) remaining--;
  }
  result.setDate(result.getDate() + Math.floor(remaining / 5) * 7 * direction);
  remaining %= 5;
  while (remaining > 0) {
    result.setDate(result.getDate() + direction);
    if (result.getDay() !== 0 && result.getDay() !== 6) remaining--;
  }
  result.setHours(
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds(),
  );
  if (Number.isNaN(result.getTime()))
    throw new RangeError('result exceeds the supported Date range');
  return result;
}
