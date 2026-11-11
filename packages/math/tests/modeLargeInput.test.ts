import { calculateMode } from '../src/statisticsFunctions/centralTendency/calculateMode';

it('handles more distinct mode values than the engine argument limit', () => {
  const input = Array.from({ length: 200_000 }, (_, index) => index);
  expect(calculateMode(input)).toEqual(input);
  input.push(199_999);
  expect(calculateMode(input)).toEqual([199_999]);
});
