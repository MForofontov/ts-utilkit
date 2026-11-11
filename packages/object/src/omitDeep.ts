interface OmitNode {
  remove: boolean;
  children: Map<string, OmitNode>;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== 'object') return false;
  const prototype: unknown = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Omits nested own properties from plain objects, copying only changed branches.
 * @param object - Plain object, including objects with a null prototype.
 * @param paths - Dot-notation paths; empty paths and missing properties are ignored.
 * @returns The original object if nothing changes, or a copy preserving own descriptors.
 * @throws {TypeError} If object is not plain, paths is not an array, or a path is not a string.
 * @throws {RangeError} If a path contains empty segments or square brackets.
 * @example omitDeep({ user: { name: 'A', token: 'secret' } }, ['user.token']);
 * // { user: { name: 'A' } }
 * @note Arrays, class instances, and accessor values are not traversed; their
 * containing property can still be omitted. Getters are never invoked. Inherited
 * properties are ignored. Untouched branches, including cyclic references, are shared.
 * @complexity Time/Space: O(p + v), where p is total path size and v is own
 * properties visited while copying changed branches.
 */
export function omitDeep<T extends Record<string, unknown>>(
  object: T,
  paths: string[],
): Partial<T> {
  if (!isPlainObject(object))
    throw new TypeError('object must be a plain object');
  if (!Array.isArray(paths)) throw new TypeError('paths must be an array');
  const tree: OmitNode = { remove: false, children: new Map() };
  for (const path of paths) {
    if (typeof path !== 'string')
      throw new TypeError('each path must be a string');
    if (path === '') continue;
    const parts = path.split('.');
    if (
      parts.some((part) => part === '') ||
      path.includes('[') ||
      path.includes(']')
    ) {
      throw new RangeError(
        'paths must use dot notation without empty segments or brackets',
      );
    }
    let node = tree;
    for (const part of parts) {
      if (node.remove) break;
      let child = node.children.get(part);
      if (!child) {
        child = { remove: false, children: new Map() };
        node.children.set(part, child);
      }
      node = child;
    }
    node.remove = true;
    node.children.clear();
  }

  const omit = (
    value: Record<string, unknown>,
    node: OmitNode,
  ): Record<string, unknown> => {
    const descriptors = Object.getOwnPropertyDescriptors(value);
    let changed = false;
    for (const [key, child] of node.children) {
      if (!Object.hasOwn(descriptors, key)) continue;
      const descriptor = descriptors[key];
      if (child.remove) {
        delete descriptors[key];
        changed = true;
      } else if ('value' in descriptor) {
        const nested: unknown = descriptor.value;
        if (isPlainObject(nested)) {
          const updated = omit(nested, child);
          if (updated !== nested) {
            descriptor.value = updated;
            changed = true;
          }
        }
      }
    }
    if (!changed) return value;
    const prototype = Object.getPrototypeOf(value) as object | null;
    return Object.create(prototype, descriptors) as Record<string, unknown>;
  };
  return omit(object, tree) as Partial<T>;
}
