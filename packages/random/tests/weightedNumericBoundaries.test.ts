import { randomElement, randomWeighted } from '../src';

describe('weighted selection numeric boundaries', () => {
  afterEach(() => jest.restoreAllMocks());

  it.each([0, 0.25, 0.5, 0.75, 1 - Number.EPSILON])(
    '1. preserves relative probabilities when finite totals overflow (%s)',
    (sample) => {
      jest.spyOn(Math, 'random').mockReturnValue(sample);
      const expected = sample < 0.5 ? 'first' : 'second';
      expect(
        randomWeighted(
          ['first', 'second', 'zero'],
          [Number.MAX_VALUE, Number.MAX_VALUE, 0],
        ),
      ).toBe(expected);
      const elements = [
        { value: 'first', weight: Number.MAX_VALUE },
        { value: 'second', weight: Number.MAX_VALUE },
        { value: 'zero', weight: 0 },
      ];
      expect(randomElement(elements)).toBe(elements[sample < 0.5 ? 0 : 1]);
    },
  );

  it.each([0, 0.5, 0.75, 1 - Number.EPSILON])(
    '2. never falls back to zero-weight entries for subnormal weights (%s)',
    (sample) => {
      jest.spyOn(Math, 'random').mockReturnValue(sample);
      expect(
        randomWeighted(
          ['zero', 'positive', 'trailing zero'],
          [0, Number.MIN_VALUE, 0],
        ),
      ).toBe('positive');
      const elements = [
        { value: 'positive', weight: Number.MIN_VALUE },
        { value: 'zero', weight: 0 },
      ];
      expect(randomElement(elements)).toBe(elements[0]);
    },
  );

  it('3. retains unequal overflowing ratios, item references, and immutable inputs', () => {
    const first = { id: 1 };
    const second = { id: 2 };
    const items = [first, second];
    const weights = [Number.MAX_VALUE, Number.MAX_VALUE / 2];
    Object.freeze(items);
    Object.freeze(weights);
    const random = jest.spyOn(Math, 'random').mockReturnValue(0.6);
    expect(randomWeighted(items, weights)).toBe(first);
    random.mockReturnValue(0.8);
    expect(randomWeighted(items, weights)).toBe(second);
    expect(weights).toEqual([Number.MAX_VALUE, Number.MAX_VALUE / 2]);
  });

  it('4. preserves ordinary cumulative boundaries', () => {
    const random = jest.spyOn(Math, 'random');
    for (const [sample, expected] of [
      [0, 'a'],
      [0.249, 'a'],
      [0.25, 'b'],
      [0.749, 'b'],
      [0.75, 'c'],
    ] as const) {
      random.mockReturnValue(sample);
      expect(randomWeighted(['a', 'b', 'c', 'zero'], [1, 2, 1, 0])).toBe(
        expected,
      );
    }
  });

  it('5. preserves unequal subnormal ratios', () => {
    const random = jest.spyOn(Math, 'random');
    for (const [sample, expected] of [
      [0.25, 'first'],
      [0.5, 'second'],
      [0.75, 'second'],
    ] as const) {
      random.mockReturnValue(sample);
      expect(
        randomWeighted(
          ['first', 'second'],
          [Number.MIN_VALUE, Number.MIN_VALUE * 2],
        ),
      ).toBe(expected);
    }
  });

  it('6. uses a positive-weight fallback after fractional rounding', () => {
    jest.spyOn(Math, 'random').mockReturnValue(1 - Number.EPSILON);
    expect(randomWeighted(['a', 'b', 'c', 'zero'], [0.1, 0.2, 0.3, 0])).toBe(
      'c',
    );
  });
});
