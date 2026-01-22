import { EventEmitter } from '../src/EventEmitter';

/**
 * Unit tests for the EventEmitter class.
 */
describe('EventEmitter', () => {
  let emitter: EventEmitter;

  beforeEach(() => {
    emitter = new EventEmitter();
  });

  // Test case 1: Basic event registration and emission
  it('1. should register and emit events', () => {
    // Arrange
    const mockHandler = jest.fn();
    emitter.on('test', mockHandler);

    // Act
    emitter.emit('test', 'data');

    // Assert
    expect(mockHandler).toHaveBeenCalledWith('data');
    expect(mockHandler).toHaveBeenCalledTimes(1);
  });

  // Test case 2: Multiple listeners for same event
  it('2. should call multiple listeners for the same event', () => {
    // Arrange
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    const handler3 = jest.fn();

    emitter.on('event', handler1);
    emitter.on('event', handler2);
    emitter.on('event', handler3);

    // Act
    emitter.emit('event', 'test data');

    // Assert
    expect(handler1).toHaveBeenCalledWith('test data');
    expect(handler2).toHaveBeenCalledWith('test data');
    expect(handler3).toHaveBeenCalledWith('test data');
    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler2).toHaveBeenCalledTimes(1);
    expect(handler3).toHaveBeenCalledTimes(1);
  });

  // Test case 3: Multiple events
  it('3. should handle multiple different events', () => {
    // Arrange
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    emitter.on('event1', handler1);
    emitter.on('event2', handler2);

    // Act
    emitter.emit('event1', 'data1');
    emitter.emit('event2', 'data2');

    // Assert
    expect(handler1).toHaveBeenCalledWith('data1');
    expect(handler2).toHaveBeenCalledWith('data2');
    expect(handler1).not.toHaveBeenCalledWith('data2');
    expect(handler2).not.toHaveBeenCalledWith('data1');
  });

  // Test case 4: Removing listeners
  it('4. should remove event listeners', () => {
    // Arrange
    const handler = jest.fn();
    emitter.on('event', handler);

    // Act
    emitter.off('event', handler);
    emitter.emit('event', 'data');

    // Assert
    expect(handler).not.toHaveBeenCalled();
  });

  // Test case 5: Once method
  it('5. should execute once listeners only once', () => {
    // Arrange
    const handler = jest.fn();
    emitter.once('event', handler);

    // Act
    emitter.emit('event', 'data1');
    emitter.emit('event', 'data2');
    emitter.emit('event', 'data3');

    // Assert
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith('data1');
  });

  // Test case 6: Method chaining
  it('6. should support method chaining', () => {
    // Arrange
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    // Act
    const result = emitter
      .on('event1', handler1)
      .on('event2', handler2)
      .emit('event1', 'data');

    // Assert
    expect(result).toBe(true);
    expect(handler1).toHaveBeenCalled();
  });

  // Test case 7: Emit returns false for no listeners
  it('7. should return false when emitting event with no listeners', () => {
    // Act
    const result = emitter.emit('nonexistent', 'data');

    // Assert
    expect(result).toBe(false);
  });

  // Test case 8: Emit returns true when listeners exist
  it('8. should return true when emitting event with listeners', () => {
    // Arrange
    emitter.on('event', () => {});

    // Act
    const result = emitter.emit('event', 'data');

    // Assert
    expect(result).toBe(true);
  });

  // Test case 9: RemoveAllListeners for specific event
  it('9. should remove all listeners for a specific event', () => {
    // Arrange
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    const handler3 = jest.fn();

    emitter.on('event1', handler1);
    emitter.on('event1', handler2);
    emitter.on('event2', handler3);

    // Act
    emitter.removeAllListeners('event1');
    emitter.emit('event1', 'data1');
    emitter.emit('event2', 'data2');

    // Assert
    expect(handler1).not.toHaveBeenCalled();
    expect(handler2).not.toHaveBeenCalled();
    expect(handler3).toHaveBeenCalledWith('data2');
  });

  // Test case 10: RemoveAllListeners for all events
  it('10. should remove all listeners for all events', () => {
    // Arrange
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    emitter.on('event1', handler1);
    emitter.on('event2', handler2);

    // Act
    emitter.removeAllListeners();
    emitter.emit('event1', 'data1');
    emitter.emit('event2', 'data2');

    // Assert
    expect(handler1).not.toHaveBeenCalled();
    expect(handler2).not.toHaveBeenCalled();
  });

  // Test case 11: ListenerCount
  it('11. should return correct listener count', () => {
    // Arrange
    emitter.on('event', () => {});
    emitter.on('event', () => {});
    emitter.on('event', () => {});

    // Act
    const count = emitter.listenerCount('event');

    // Assert
    expect(count).toBe(3);
  });

  // Test case 12: ListenerCount for nonexistent event
  it('12. should return 0 for nonexistent event', () => {
    // Act
    const count = emitter.listenerCount('nonexistent');

    // Assert
    expect(count).toBe(0);
  });

  // Test case 13: EventNames
  it('13. should return array of event names', () => {
    // Arrange
    emitter.on('event1', () => {});
    emitter.on('event2', () => {});
    emitter.on('event3', () => {});

    // Act
    const names = emitter.eventNames();

    // Assert
    expect(names).toEqual(
      expect.arrayContaining(['event1', 'event2', 'event3']),
    );
    expect(names).toHaveLength(3);
  });

  // Test case 14: EventNames for empty emitter
  it('14. should return empty array when no events are registered', () => {
    // Act
    const names = emitter.eventNames();

    // Assert
    expect(names).toEqual([]);
  });

  // Test case 15: Emit with no data
  it('15. should handle emit with no data parameter', () => {
    // Arrange
    const handler = jest.fn();
    emitter.on('event', handler);

    // Act
    emitter.emit('event');

    // Assert
    expect(handler).toHaveBeenCalledWith(undefined);
  });

  // Test case 16: Multiple off calls
  it('16. should handle multiple off calls for the same listener', () => {
    // Arrange
    const handler = jest.fn();
    emitter.on('event', handler);

    // Act
    emitter.off('event', handler);
    emitter.off('event', handler); // Second call should be safe
    emitter.emit('event', 'data');

    // Assert
    expect(handler).not.toHaveBeenCalled();
  });

  // Test case 17: Off for nonexistent event
  it('17. should safely handle off for nonexistent event', () => {
    // Arrange
    const handler = jest.fn();

    // Act & Assert
    expect(() => emitter.off('nonexistent', handler)).not.toThrow();
  });

  // Test case 18: Listener modification during emit
  it('18. should handle listener array modification during emit', () => {
    // Arrange
    const handler1 = jest.fn();
    const handler2 = jest.fn(() => {
      emitter.off('event', handler3);
    });
    const handler3 = jest.fn();

    emitter.on('event', handler1);
    emitter.on('event', handler2);
    emitter.on('event', handler3);

    // Act
    emitter.emit('event', 'data');

    // Assert - all three should be called because we iterate over a copy
    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler2).toHaveBeenCalledTimes(1);
    expect(handler3).toHaveBeenCalledTimes(1);

    // Second emit should not call handler3
    handler1.mockClear();
    handler2.mockClear();
    handler3.mockClear();
    emitter.emit('event', 'data');

    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler2).toHaveBeenCalledTimes(1);
    expect(handler3).not.toHaveBeenCalled();
  });

  // Test case 19: Once with multiple emits
  it('19. should handle once with multiple rapid emits', () => {
    // Arrange
    const handler = jest.fn();
    emitter.once('event', handler);

    // Act
    emitter.emit('event', 'data1');
    emitter.emit('event', 'data2');
    emitter.emit('event', 'data3');

    // Assert
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith('data1');
  });

  // Test case 20: Large number of listeners
  it('20. should handle large number of listeners efficiently', () => {
    // Arrange
    const handlers = Array.from({ length: 1000 }, () => jest.fn());
    handlers.forEach((handler) => emitter.on('event', handler));

    // Act
    const startTime = performance.now();
    emitter.emit('event', 'data');
    const endTime = performance.now();

    // Assert
    handlers.forEach((handler) => {
      expect(handler).toHaveBeenCalledWith('data');
    });
    expect(endTime - startTime).toBeLessThan(100);
  });

  // Test case 21: TypeError for invalid eventName in on
  it('21. should throw TypeError when eventName is not a string in on', () => {
    // Arrange
    const invalidInputs = [123, null, undefined, [], {}, true];

    // Act & Assert
    invalidInputs.forEach((input) => {
      expect(() => emitter.on(input as unknown as string, () => {})).toThrow(
        TypeError,
      );
      expect(() => emitter.on(input as unknown as string, () => {})).toThrow(
        'eventName must be a string',
      );
    });
  });

  // Test case 22: TypeError for invalid listener in on
  it('22. should throw TypeError when listener is not a function in on', () => {
    // Arrange
    const invalidInputs = [123, 'string', null, undefined, [], {}, true];

    // Act & Assert
    invalidInputs.forEach((input) => {
      expect(() => emitter.on('event', input as unknown as () => void)).toThrow(
        TypeError,
      );
      expect(() => emitter.on('event', input as unknown as () => void)).toThrow(
        'listener must be a function',
      );
    });
  });

  // Test case 23: TypeError for invalid eventName in off
  it('23. should throw TypeError when eventName is not a string in off', () => {
    // Arrange
    const invalidInputs = [123, null, undefined, [], {}, true];

    // Act & Assert
    invalidInputs.forEach((input) => {
      expect(() => emitter.off(input as unknown as string, () => {})).toThrow(
        TypeError,
      );
      expect(() => emitter.off(input as unknown as string, () => {})).toThrow(
        'eventName must be a string',
      );
    });
  });

  // Test case 24: TypeError for invalid listener in off
  it('24. should throw TypeError when listener is not a function in off', () => {
    // Arrange
    const invalidInputs = [123, 'string', null, undefined, [], {}, true];

    // Act & Assert
    invalidInputs.forEach((input) => {
      expect(() =>
        emitter.off('event', input as unknown as () => void),
      ).toThrow(TypeError);
      expect(() =>
        emitter.off('event', input as unknown as () => void),
      ).toThrow('listener must be a function');
    });
  });

  // Test case 25: TypeError for invalid eventName in emit
  it('25. should throw TypeError when eventName is not a string in emit', () => {
    // Arrange
    const invalidInputs = [123, null, undefined, [], {}, true];

    // Act & Assert
    invalidInputs.forEach((input) => {
      expect(() => emitter.emit(input as unknown as string)).toThrow(TypeError);
      expect(() => emitter.emit(input as unknown as string)).toThrow(
        'eventName must be a string',
      );
    });
  });

  // Test case 26: TypeError for invalid eventName in once
  it('26. should throw TypeError when eventName is not a string in once', () => {
    // Arrange
    const invalidInputs = [123, null, undefined, [], {}, true];

    // Act & Assert
    invalidInputs.forEach((input) => {
      expect(() => emitter.once(input as unknown as string, () => {})).toThrow(
        TypeError,
      );
      expect(() => emitter.once(input as unknown as string, () => {})).toThrow(
        'eventName must be a string',
      );
    });
  });

  // Test case 27: TypeError for invalid listener in once
  it('27. should throw TypeError when listener is not a function in once', () => {
    // Arrange
    const invalidInputs = [123, 'string', null, undefined, [], {}, true];

    // Act & Assert
    invalidInputs.forEach((input) => {
      expect(() =>
        emitter.once('event', input as unknown as () => void),
      ).toThrow(TypeError);
      expect(() =>
        emitter.once('event', input as unknown as () => void),
      ).toThrow('listener must be a function');
    });
  });

  // Test case 28: TypeError for invalid eventName in removeAllListeners
  it('28. should throw TypeError when eventName is invalid in removeAllListeners', () => {
    // Arrange
    const invalidInputs = [123, [], {}, true];

    // Act & Assert
    invalidInputs.forEach((input) => {
      expect(() =>
        emitter.removeAllListeners(input as unknown as string),
      ).toThrow(TypeError);
      expect(() =>
        emitter.removeAllListeners(input as unknown as string),
      ).toThrow('eventName must be a string');
    });
  });

  // Test case 29: TypeError for invalid eventName in listenerCount
  it('29. should throw TypeError when eventName is not a string in listenerCount', () => {
    // Arrange
    const invalidInputs = [123, null, undefined, [], {}, true];

    // Act & Assert
    invalidInputs.forEach((input) => {
      expect(() => emitter.listenerCount(input as unknown as string)).toThrow(
        TypeError,
      );
      expect(() => emitter.listenerCount(input as unknown as string)).toThrow(
        'eventName must be a string',
      );
    });
  });
});
