/** Assigns data without invoking the inherited __proto__ setter. */
export function setOwn(obj: object, key: PropertyKey, value: unknown): void {
  if (!Object.hasOwn(obj, key)) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    (obj as Record<PropertyKey, unknown>)[key] = value;
  }
}
