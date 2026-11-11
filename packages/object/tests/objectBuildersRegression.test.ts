import { deepCloneWith } from '../src/deepCloneWith';
import { differenceBy } from '../src/differenceBy';
import { flipObject } from '../src/flipObject';
import { getObjectDifference } from '../src/getObjectDifference';
import { invertObject } from '../src/invertObject';
import { objectMap } from '../src/objectMap';
import { queryStringToObject } from '../src/queryStringToObject';
import { renameKey } from '../src/renameKey';
import { flattenObject } from '../src/flattenObject';

describe('object builder property safety', () => {
  it('1. retains __proto__ as ordinary data across object transformations', () => {
    const source = Object.fromEntries([['__proto__', { value: 1 }]]);
    const outputs: object[] = [
      deepCloneWith(source, (value) => value),
      differenceBy(source, {}, () => false),
      flipObject({ key: '__proto__' }),
      getObjectDifference({}, source),
      invertObject({ key: '__proto__' }),
      objectMap(source, (value) => value),
      queryStringToObject('__proto__=value'),
      renameKey({ key: 1 }, 'key', '__proto__'),
      flattenObject(Object.fromEntries([['__proto__', 'value']])),
    ];
    for (const result of outputs) {
      expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
      expect(Object.hasOwn(result, '__proto__')).toBe(true);
    }
  });
});
