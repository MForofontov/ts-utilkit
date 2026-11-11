/**
 * Shared value-type handling for serialization utilities.
 */

export function isPlainObject(value: object): boolean {
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

export function cloneDate(value: Date): Date {
  return new Date(value.getTime());
}

export function cloneRegExp(value: RegExp): RegExp {
  return new RegExp(value.source, value.flags);
}
