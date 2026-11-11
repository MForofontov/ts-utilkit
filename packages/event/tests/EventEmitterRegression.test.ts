import { EventEmitter } from '../src/EventEmitter';

describe('EventEmitter lifecycle regressions', () => {
  it('1. removes a once listener before recursive emission', () => {
    const emitter = new EventEmitter();
    const listener = jest.fn(() => {
      if (listener.mock.calls.length === 1) emitter.emit('event');
    });
    emitter.once('event', listener);
    emitter.emit('event');
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('2. removes a once listener even when it throws', () => {
    const emitter = new EventEmitter();
    emitter.once('event', () => {
      throw new Error('listener failed');
    });
    expect(() => emitter.emit('event')).toThrow('listener failed');
    expect(emitter.listenerCount('event')).toBe(0);
  });

  it('3. clears an empty event name without clearing other events', () => {
    const emitter = new EventEmitter();
    emitter.on('', () => {});
    emitter.on('keep', () => {});
    emitter.removeAllListeners('');
    expect(emitter.eventNames()).toEqual(['keep']);
  });
});
