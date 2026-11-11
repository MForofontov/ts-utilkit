/**
 * Successful result variant.
 */
export interface Ok<T> {
  readonly ok: true;
  readonly value: T;
}

/**
 * Failed result variant.
 */
export interface Err<E> {
  readonly ok: false;
  readonly error: E;
}

/**
 * Discriminated union representing either success (`Ok`) or failure (`Err`).
 */
export type Result<T, E = Error> = Ok<T> | Err<E>;
