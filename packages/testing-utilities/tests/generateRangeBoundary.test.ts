import { runInNewContext } from 'node:vm';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { transpileModule, ModuleKind } from 'typescript';
import { generateRange } from '../src';

const source = transpileModule(
  readFileSync(join(__dirname, '../src/generateRange.ts'), 'utf8'),
  { compilerOptions: { module: ModuleKind.CommonJS } },
).outputText;

// A VM deadline keeps a regression to the old infinite loop from hanging Jest.
function boundedRange(start: number, end: number, step = 1): unknown {
  try {
    runInNewContext(
      `${source}\nexports.generateRange(start, end, step)`,
      { exports: {}, start, end, step },
      { timeout: 100 },
    );
  } catch (error) {
    if (String(error).includes('Script execution timed out')) throw error;
  }
  // Execute the instrumented implementation only after proving termination.
  return generateRange(start, end, step);
}

describe('generateRange numeric boundaries', () => {
  it('1. rejects steps that cannot advance at the current magnitude', () => {
    expect(() => boundedRange(1e16, 1e16 + 4, 1)).toThrow('advance');
    expect(() =>
      boundedRange(Number.MAX_SAFE_INTEGER - 1, Number.MAX_SAFE_INTEGER + 4, 1),
    ).toThrow('advance');
  });

  it.each([NaN, Infinity, -Infinity])(
    '2. rejects non-finite endpoint %s',
    (value) => {
      expect(() => boundedRange(value, 1)).toThrow('finite');
      expect(() => boundedRange(0, value)).toThrow('finite');
    },
  );

  it('3. retains representable large values, singleton endpoints, and infinite steps', () => {
    expect(generateRange(1e16, 1e16 + 4, 2)).toEqual([
      1e16,
      1e16 + 2,
      1e16 + 4,
    ]);
    expect(boundedRange(1e16, 1e16)).toEqual([1e16]);
    expect(generateRange(0, 1, Infinity)).toEqual([0]);
    expect(generateRange(2, 1)).toEqual([]);
  });

  it('4. preserves fractional accumulation and finite overflow termination', () => {
    expect(generateRange(0, 1, 0.25)).toEqual([0, 0.25, 0.5, 0.75, 1]);
    expect(
      generateRange(Number.MAX_VALUE / 2, Number.MAX_VALUE, Number.MAX_VALUE),
    ).toEqual([Number.MAX_VALUE / 2]);
  });
});
