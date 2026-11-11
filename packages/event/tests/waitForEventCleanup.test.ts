import { waitForEvent } from '../src/waitForEvent';

it('does not leave a timeout when subscription delivers the event synchronously', async () => {
  jest.useFakeTimers();
  try {
    const target = {
      addEventListener: jest.fn(
        (_name: string, listener: (data: string) => void) => listener('ready'),
      ),
      removeEventListener: jest.fn(),
    };
    await expect(waitForEvent<string>(target, 'ready', 60_000)).resolves.toBe(
      'ready',
    );
    expect(target.removeEventListener).toHaveBeenCalledTimes(1);
    expect(jest.getTimerCount()).toBe(0);
  } finally {
    jest.useRealTimers();
  }
});
