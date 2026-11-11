import { createMultiMap } from '../src/createMultiMap';

it('appends large multi-map batches without exceeding the argument limit', () => {
  const value = { id: 1 };
  const batch = Array.from({ length: 200_000 }, () => value);
  const map = createMultiMap<string, typeof value>();
  map.set('items', value);
  expect(() => map.setAll('items', batch)).not.toThrow();
  const result = map.get('items');
  expect(result).toHaveLength(200_001);
  expect(result[200_000]).toBe(value);
  expect(batch).toHaveLength(200_000);
});
