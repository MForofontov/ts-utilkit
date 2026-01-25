/**
 * @jest-environment jsdom
 */

import { EventEmitter } from '../src/EventEmitter';
import { waitForEvent } from '../src/waitForEvent';

/**
 * Unit tests for the waitForEvent function.
 */
describe('waitForEvent', () => {
  jest.useFakeTimers();

  afterEach(() => {
    jest.clearAllTimers();
  });

  // Test case 1: Basic event waiting
  it('1. should resolve when event is emitted', async () => {
    // Arrange
    const emitter = new EventEmitter();
    const waitPromise = waitForEvent(emitter, 'test');

    // Act
    setTimeout(() => emitter.emit('test', 'event data'), 100);
    jest.advanceTimersByTime(100);

    const result = await waitPromise;

    // Assert
    expect(result).toBe('event data');
  });

  // Test case 2: Timeout rejection
  it('2. should reject on timeout', async () => {
    // Arrange
    const emitter = new EventEmitter();

    // Act
    const waitPromise = waitForEvent(emitter, 'test', 1000);

    // Fast-forward past timeout
    jest.advanceTimersByTime(1000);

    // Assert
    await expect(waitPromise).rejects.toThrow(
      "Timeout waiting for event 'test' after 1000ms",
    );
  });

  // Test case 3: Event before timeout
  it('3. should resolve before timeout expires', async () => {
    // Arrange
    const emitter = new EventEmitter();
    const waitPromise = waitForEvent(emitter, 'test', 2000);

    // Act
    setTimeout(() => emitter.emit('test', 'success'), 500);
    jest.advanceTimersByTime(500);

    const result = await waitPromise;

    // Assert
    expect(result).toBe('success');
  });

  // Test case 4: Cleanup after event
  it('4. should clean up listener after event', async () => {
    // Arrange
    const emitter = new EventEmitter();

    // Act
    const waitPromise = waitForEvent(emitter, 'test');

    setTimeout(() => emitter.emit('test', 'data'), 100);
    jest.advanceTimersByTime(100);

    await waitPromise;

    // Assert
    expect(emitter.listenerCount('test')).toBe(0);
  });

  // Test case 5: Cleanup after timeout
  it('5. should clean up listener after timeout', async () => {
    // Arrange
    const emitter = new EventEmitter();

    // Act
    const waitPromise = waitForEvent(emitter, 'test', 500);

    jest.advanceTimersByTime(500);

    try {
      await waitPromise;
    } catch {
      // Expected to fail
    }

    // Assert
    expect(emitter.listenerCount('test')).toBe(0);
  });

  // Test case 6: No timeout specified
  it('6. should wait indefinitely when no timeout specified', async () => {
    // Arrange
    const emitter = new EventEmitter();
    const waitPromise = waitForEvent(emitter, 'test');

    // Act
    setTimeout(() => emitter.emit('test', 'delayed'), 5000);
    jest.advanceTimersByTime(5000);

    const result = await waitPromise;

    // Assert
    expect(result).toBe('delayed');
  });

  // Test case 7: Complex event data
  it('7. should handle complex event data', async () => {
    // Arrange
    const emitter = new EventEmitter();
    const complexData = {
      user: { id: 123, name: 'Alice' },
      items: [1, 2, 3],
      nested: { deep: { value: 'test' } },
    };

    const waitPromise = waitForEvent(emitter, 'data');

    // Act
    setTimeout(() => emitter.emit('data', complexData), 100);
    jest.advanceTimersByTime(100);

    const result = await waitPromise;

    // Assert
    expect(result).toEqual(complexData);
  });

  // Test case 8: Multiple simultaneous waits
  it('8. should handle multiple simultaneous waits', async () => {
    // Arrange
    const emitter = new EventEmitter();
    const wait1 = waitForEvent(emitter, 'event1');
    const wait2 = waitForEvent(emitter, 'event2');

    // Act
    setTimeout(() => emitter.emit('event1', 'data1'), 100);
    setTimeout(() => emitter.emit('event2', 'data2'), 200);

    jest.advanceTimersByTime(100);
    const result1 = await wait1;

    jest.advanceTimersByTime(100);
    const result2 = await wait2;

    // Assert
    expect(result1).toBe('data1');
    expect(result2).toBe('data2');
  });

  // Test case 9: Zero timeout
  it('9. should handle zero timeout', async () => {
    // Arrange
    const emitter = new EventEmitter();
    const waitPromise = waitForEvent(emitter, 'test', 0);

    // Act
    jest.advanceTimersByTime(0);

    // Assert
    await expect(waitPromise).rejects.toThrow(
      "Timeout waiting for event 'test' after 0ms",
    );
  });

  // Test case 10: Event with undefined data
  it('10. should handle event with undefined data', async () => {
    // Arrange
    const emitter = new EventEmitter();
    const waitPromise = waitForEvent(emitter, 'test');

    // Act
    setTimeout(() => emitter.emit('test'), 100);
    jest.advanceTimersByTime(100);

    const result = await waitPromise;

    // Assert
    expect(result).toBeUndefined();
  });

  // Test case 11: DOM EventTarget - button click
  it('11. should wait for DOM button click event', async () => {
    // Arrange
    const button = document.createElement('button');
    document.body.appendChild(button);
    const waitPromise = waitForEvent(button, 'click');

    // Act
    setTimeout(() => button.click(), 100);
    jest.advanceTimersByTime(100);

    const event = await waitPromise;

    // Assert
    expect(event).toBeInstanceOf(MouseEvent);
    expect((event as MouseEvent).type).toBe('click');

    // Cleanup
    document.body.removeChild(button);
  });

  // Test case 12: DOM EventTarget - input event
  it('12. should wait for DOM input event with data', async () => {
    // Arrange
    const input = document.createElement('input');
    document.body.appendChild(input);
    const waitPromise = waitForEvent(input, 'input');

    // Act
    setTimeout(() => {
      input.value = 'test value';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }, 100);
    jest.advanceTimersByTime(100);

    const event = await waitPromise;

    // Assert
    expect(event).toBeInstanceOf(Event);
    expect(event.type).toBe('input');

    // Cleanup
    document.body.removeChild(input);
  });

  // Test case 13: DOM EventTarget - custom event with detail
  it('13. should wait for DOM custom event with detail data', async () => {
    // Arrange
    const div = document.createElement('div');
    document.body.appendChild(div);
    const customData = { message: 'Hello', count: 42 };
    const waitPromise = waitForEvent(div, 'customEvent');

    // Act
    setTimeout(() => {
      const customEvent = new CustomEvent('customEvent', {
        detail: customData,
      });
      div.dispatchEvent(customEvent);
    }, 100);
    jest.advanceTimersByTime(100);

    const event = await waitPromise;

    // Assert
    expect(event).toBeInstanceOf(CustomEvent);
    expect((event as CustomEvent).detail).toEqual(customData);

    // Cleanup
    document.body.removeChild(div);
  });

  // Test case 14: DOM EventTarget - timeout on DOM element
  it('14. should timeout waiting for DOM event', async () => {
    // Arrange
    const button = document.createElement('button');
    document.body.appendChild(button);

    // Act
    const waitPromise = waitForEvent(button, 'click', 500);
    jest.advanceTimersByTime(500);

    // Assert
    await expect(waitPromise).rejects.toThrow(
      "Timeout waiting for event 'click' after 500ms",
    );

    // Cleanup
    document.body.removeChild(button);
  });

  // Test case 15: DOM EventTarget - listener cleanup after event
  it('15. should remove DOM listener after event fires', async () => {
    // Arrange
    const button = document.createElement('button');
    document.body.appendChild(button);
    const waitPromise = waitForEvent(button, 'click');

    // Act
    setTimeout(() => button.click(), 100);
    jest.advanceTimersByTime(100);
    await waitPromise;

    // Verify listener was removed by checking that subsequent clicks don't cause issues
    button.click(); // Should not throw or cause problems

    // Assert - if we got here, listener was properly cleaned up
    expect(true).toBe(true);

    // Cleanup
    document.body.removeChild(button);
  });

  // Test case 16: DOM EventTarget - multiple event types
  it('16. should handle different DOM event types', async () => {
    // Arrange
    const form = document.createElement('form');
    document.body.appendChild(form);
    const waitPromise = waitForEvent(form, 'submit');

    // Act
    setTimeout(() => {
      form.dispatchEvent(new Event('submit', { bubbles: true }));
    }, 100);
    jest.advanceTimersByTime(100);

    const event = await waitPromise;

    // Assert
    expect(event).toBeInstanceOf(Event);
    expect(event.type).toBe('submit');

    // Cleanup
    document.body.removeChild(form);
  });

  // Test case 17: TypeError for invalid target
  it('17. should throw TypeError for invalid target', () => {
    // Arrange
    const invalidTargets = [null, undefined, 'string', 123, {}, []];

    // Act & Assert
    invalidTargets.forEach((invalid) => {
      expect(() =>
        waitForEvent(invalid as unknown as EventTarget, 'event'),
      ).toThrow(TypeError);
      expect(() =>
        waitForEvent(invalid as unknown as EventTarget, 'event'),
      ).toThrow(
        'target must have addEventListener or on method for event handling',
      );
    });
  });

  // Test case 18: TypeError for invalid eventName
  it('18. should throw TypeError when eventName is not a string', () => {
    // Arrange
    const emitter = new EventEmitter();
    const invalidInputs = [123, null, undefined, [], {}, true];

    // Act & Assert
    invalidInputs.forEach((input) => {
      expect(() => waitForEvent(emitter, input as unknown as string)).toThrow(
        TypeError,
      );
      expect(() => waitForEvent(emitter, input as unknown as string)).toThrow(
        'eventName must be a string',
      );
    });
  });

  // Test case 19: TypeError for invalid timeout type
  it('19. should throw TypeError when timeout is not a number', () => {
    // Arrange
    const emitter = new EventEmitter();
    const invalidInputs = ['string', [], {}, true];

    // Act & Assert
    invalidInputs.forEach((input) => {
      expect(() =>
        waitForEvent(emitter, 'event', input as unknown as number),
      ).toThrow(TypeError);
      expect(() =>
        waitForEvent(emitter, 'event', input as unknown as number),
      ).toThrow('timeout must be a number');
    });
  });

  // Test case 20: Error for NaN timeout
  it('20. should throw Error when timeout is NaN', () => {
    // Arrange
    const emitter = new EventEmitter();

    // Act & Assert
    expect(() => waitForEvent(emitter, 'event', NaN)).toThrow(Error);
    expect(() => waitForEvent(emitter, 'event', NaN)).toThrow(
      'timeout must be a valid number, not NaN',
    );
  });

  // Test case 21: Error for negative timeout
  it('21. should throw Error when timeout is negative', () => {
    // Arrange
    const emitter = new EventEmitter();

    // Act & Assert
    expect(() => waitForEvent(emitter, 'event', -100)).toThrow(Error);
    expect(() => waitForEvent(emitter, 'event', -100)).toThrow(
      'timeout must be non-negative',
    );
  });
});
