import { groupBy } from '../src/groupBy';

/**
 * Tests for the deprecated groupBy re-export.
 * @deprecated Use groupByObject from @ts-utilkit/object directly.
 */
describe('groupBy (array package - deprecated)', () => {
  it('1. should group objects by a string property', () => {
    const input = [
      { category: 'a', value: 1 },
      { category: 'b', value: 2 },
      { category: 'a', value: 3 },
    ];
    const result = groupBy(input, 'category');
    expect(result['a']).toHaveLength(2);
    expect(result['b']).toHaveLength(1);
  });
  it('2. should return empty object for empty array', () => {
    expect(groupBy([], 'key')).toEqual({});
  });
  it('3. should handle single-element array', () => {
    const input = [{ type: 'x', val: 1 }];
    const result = groupBy(input, 'type');
    expect(result['x']).toHaveLength(1);
  });
});
