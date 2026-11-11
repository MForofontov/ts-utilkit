import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { runInNewContext } from 'node:vm';
import { ModuleKind, transpileModule } from 'typescript';
import { randomFromRange } from '../src';

const source = transpileModule(
  readFileSync(join(__dirname, '../src/randomFromRange.ts'), 'utf8'),
  {
    compilerOptions: { module: ModuleKind.CommonJS },
  },
).outputText;

function boundedRange(min: number, max: number, step = 1): number {
  try {
    runInNewContext(
      `${source}\nexports.randomFromRange(min, max, step)`,
      {
        exports: {},
        min,
        max,
        step,
        require: () => ({ randomChoice: (values: number[]) => values[0] }),
      },
      { timeout: 100 },
    );
  } catch (error) {
    if (String(error).includes('Script execution timed out')) throw error;
  }
  return randomFromRange(min, max, step);
}

describe('randomFromRange numeric boundaries', () => {
  afterEach(() => jest.restoreAllMocks());

  it('1. rejects additions that cannot advance', () => {
    expect(() => boundedRange(1e16, 1e16 + 4)).toThrow('advance');
  });
  it.each([Infinity, -Infinity])(
    '2. rejects infinite endpoints (%s)',
    (value) => {
      expect(() => boundedRange(value, 1)).toThrow('finite');
      expect(() => boundedRange(0, value)).toThrow('finite');
    },
  );
  it('3. terminates for a large singleton without requiring an increment', () => {
    expect(boundedRange(1e16, 1e16)).toBe(1e16);
  });
  it('4. preserves valid large steps and infinite-step finite ranges', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.75);
    expect(boundedRange(1e16, 1e16 + 4, 2)).toBe(1e16 + 4);
    expect(boundedRange(1, 5, Infinity)).toBe(1);
    expect(
      boundedRange(Number.MAX_VALUE / 2, Number.MAX_VALUE, Number.MAX_VALUE),
    ).toBe(Number.MAX_VALUE / 2);
  });
  it('5. retains repeated floating-point addition and selection boundaries', () => {
    const random = jest.spyOn(Math, 'random');
    for (const [sample, expected] of [
      [0, 0],
      [0.4, 0.1],
      [1 - Number.EPSILON, 0.2],
    ] as const) {
      random.mockReturnValue(sample);
      expect(randomFromRange(0, 0.3, 0.1)).toBe(expected);
    }
  });
});
