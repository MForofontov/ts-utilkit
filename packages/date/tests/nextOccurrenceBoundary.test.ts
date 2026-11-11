import { getNextOccurrence } from '../src/getNextOccurrence';

it.each([0.5, 2.5, 5.9])('rejects fractional weekday %s', (weekday) => {
  expect(() => getNextOccurrence(new Date(2026, 0, 1), weekday)).toThrow(
    'Invalid dayOfWeek value',
  );
});
