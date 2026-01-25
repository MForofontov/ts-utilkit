/**
 * @jest-environment jsdom
 */

import { debounceEvent } from '../src/debounceEvent';

/**
 * Unit tests for the debounceEvent function.
 */
describe('debounceEvent', () => {
  jest.useFakeTimers();

  afterEach(() => {
    jest.clearAllTimers();
  });

  // Test case 1: Basic debouncing behavior
  it('1. should debounce function calls', () => {
    // Arrange
    const handler = jest.fn();
    const debounced = debounceEvent(handler, 1000);

    // Act
    debounced('call1');
    debounced('call2');
    debounced('call3');

    // Assert - handler should not be called yet
    expect(handler).not.toHaveBeenCalled();

    // Fast-forward time
    jest.advanceTimersByTime(1000);

    // Assert - handler should be called once with last arguments
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith('call3');
  });

  // Test case 2: Immediate execution (leading edge)
  it('2. should execute immediately when immediate is true', () => {
    // Arrange
    const handler = jest.fn();
    const debounced = debounceEvent(handler, 1000, true);

    // Act
    debounced('immediate');

    // Assert - should be called immediately
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith('immediate');

    // Additional calls should not trigger handler
    debounced('second');
    expect(handler).toHaveBeenCalledTimes(1);

    // After delay, subsequent calls should work
    jest.advanceTimersByTime(1000);
    debounced('after-delay');
    expect(handler).toHaveBeenCalledTimes(2);
  });

  // Test case 3: Cancel method
  it('3. should cancel pending execution', () => {
    // Arrange
    const handler = jest.fn();
    const debounced = debounceEvent(handler, 1000);

    // Act
    debounced('call');
    debounced.cancel();

    // Fast-forward time
    jest.advanceTimersByTime(1000);

    // Assert - handler should not be called
    expect(handler).not.toHaveBeenCalled();
  });

  // Test case 4: Multiple arguments
  it('4. should pass multiple arguments to handler', () => {
    // Arrange
    const handler = jest.fn();
    const debounced = debounceEvent(handler, 500);

    // Act
    debounced(1, 2, 3, 'test', { key: 'value' });

    jest.advanceTimersByTime(500);

    // Assert
    expect(handler).toHaveBeenCalledWith(1, 2, 3, 'test', { key: 'value' });
  });

  // Test case 5: Delay of zero
  it('5. should handle zero delay', () => {
    // Arrange
    const handler = jest.fn();
    const debounced = debounceEvent(handler, 0);

    // Act
    debounced('test');

    jest.advanceTimersByTime(0);

    // Assert
    expect(handler).toHaveBeenCalledWith('test');
  });

  // Test case 6: Rapid successive calls
  it('6. should handle rapid successive calls correctly', () => {
    // Arrange
    const handler = jest.fn();
    const debounced = debounceEvent(handler, 500);

    // Act
    for (let i = 0; i < 100; i++) {
      debounced(i);
    }

    jest.advanceTimersByTime(500);

    // Assert - should be called once with last value
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(99);
  });

  // Test case 7: Multiple independent debounced functions
  it('7. should handle multiple independent debounced functions', () => {
    // Arrange
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    const debounced1 = debounceEvent(handler1, 500);
    const debounced2 = debounceEvent(handler2, 800);

    // Act
    debounced1('first');
    debounced2('second');

    jest.advanceTimersByTime(500);

    // Assert - first should be called
    expect(handler1).toHaveBeenCalledWith('first');
    expect(handler2).not.toHaveBeenCalled();

    jest.advanceTimersByTime(300);

    // Assert - second should now be called
    expect(handler2).toHaveBeenCalledWith('second');
  });

  // Test case 8: Cancel after immediate execution
  it('8. should handle cancel after immediate execution', () => {
    // Arrange
    const handler = jest.fn();
    const debounced = debounceEvent(handler, 1000, true);

    // Act
    debounced('immediate');
    debounced.cancel();

    // Assert
    expect(handler).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000);

    // Should not be called again
    expect(handler).toHaveBeenCalledTimes(1);
  });

  // Test case 9: Performance with large delay
  it('9. should handle large delay values efficiently', () => {
    // Arrange
    const handler = jest.fn();
    const debounced = debounceEvent(handler, 10000);

    // Act
    const startTime = performance.now();
    debounced('test');
    const endTime = performance.now();

    // Assert - should set up timer quickly
    expect(endTime - startTime).toBeLessThan(100);
    expect(handler).not.toHaveBeenCalled();

    jest.advanceTimersByTime(10000);
    expect(handler).toHaveBeenCalledWith('test');
  });

  // Test case 10: TypeScript generic type preservation
  it('10. should preserve argument types', () => {
    // Arrange
    const handler = jest.fn((a: number, b: string, c: boolean) => {
      return a + b + c;
    });
    const debounced = debounceEvent(handler, 500);

    // Act
    debounced(42, 'test', true);

    jest.advanceTimersByTime(500);

    // Assert
    expect(handler).toHaveBeenCalledWith(42, 'test', true);
  });

  // Test case 11: No arguments
  it('11. should handle calls with no arguments', () => {
    // Arrange
    const handler = jest.fn();
    const debounced = debounceEvent(handler, 500);

    // Act
    debounced();

    jest.advanceTimersByTime(500);

    // Assert
    expect(handler).toHaveBeenCalledWith();
    expect(handler).toHaveBeenCalledTimes(1);
  });

  // Test case 12: DOM event - debounced input handler
  it('12. should debounce DOM input events', () => {
    // Arrange
    const input = document.createElement('input');
    document.body.appendChild(input);
    const handler = jest.fn((event: Event) => {
      return (event.target as HTMLInputElement).value;
    });
    const debouncedHandler = debounceEvent(handler, 300);

    input.addEventListener('input', debouncedHandler);

    // Act - Simulate rapid typing
    input.value = 'h';
    input.dispatchEvent(new Event('input'));
    jest.advanceTimersByTime(100);

    input.value = 'he';
    input.dispatchEvent(new Event('input'));
    jest.advanceTimersByTime(100);

    input.value = 'hel';
    input.dispatchEvent(new Event('input'));
    jest.advanceTimersByTime(100);

    // Assert - handler should not be called yet
    expect(handler).not.toHaveBeenCalled();

    // Fast-forward past debounce delay
    jest.advanceTimersByTime(300);

    // Assert - handler should be called once with final value
    expect(handler).toHaveBeenCalledTimes(1);

    // Cleanup
    document.body.removeChild(input);
  });

  // Test case 13: DOM event - debounced button click
  it('13. should debounce DOM button clicks', () => {
    // Arrange
    const button = document.createElement('button');
    document.body.appendChild(button);
    const handler = jest.fn();
    const debouncedClick = debounceEvent(handler, 500);

    button.addEventListener('click', debouncedClick);

    // Act - Multiple rapid clicks
    button.click();
    button.click();
    button.click();

    // Assert - handler should not be called yet
    expect(handler).not.toHaveBeenCalled();

    // Fast-forward past debounce delay
    jest.advanceTimersByTime(500);

    // Assert - handler should be called once
    expect(handler).toHaveBeenCalledTimes(1);

    // Cleanup
    document.body.removeChild(button);
  });

  // Test case 14: DOM event - cancel debounced scroll
  it('14. should cancel debounced DOM scroll event', () => {
    // Arrange
    const div = document.createElement('div');
    document.body.appendChild(div);
    const handler = jest.fn();
    const debouncedScroll = debounceEvent(handler, 200);

    div.addEventListener('scroll', debouncedScroll);

    // Act - Trigger scroll then cancel
    div.dispatchEvent(new Event('scroll'));
    jest.advanceTimersByTime(100);

    debouncedScroll.cancel();

    // Fast-forward past original delay
    jest.advanceTimersByTime(200);

    // Assert - handler should not be called
    expect(handler).not.toHaveBeenCalled();

    // Cleanup
    document.body.removeChild(div);
  });

  // Test case 15: TypeError for invalid handler
  it('15. should throw TypeError when handler is not a function', () => {
    // Arrange
    const invalidInputs = [123, 'string', null, undefined, [], {}, true];

    // Act & Assert
    invalidInputs.forEach((input) => {
      expect(() => debounceEvent(input as unknown as () => void, 1000)).toThrow(
        TypeError,
      );
      expect(() => debounceEvent(input as unknown as () => void, 1000)).toThrow(
        'handler must be a function',
      );
    });
  });

  // Test case 16: TypeError for invalid delay type
  it('16. should throw TypeError when delay is not a number', () => {
    // Arrange
    const handler = jest.fn();
    const invalidInputs = ['string', null, undefined, [], {}, true];

    // Act & Assert
    invalidInputs.forEach((input) => {
      expect(() => debounceEvent(handler, input as unknown as number)).toThrow(
        TypeError,
      );
      expect(() => debounceEvent(handler, input as unknown as number)).toThrow(
        'delay must be a number',
      );
    });
  });

  // Test case 17: Error for NaN delay
  it('17. should throw Error when delay is NaN', () => {
    // Arrange
    const handler = jest.fn();

    // Act & Assert
    expect(() => debounceEvent(handler, NaN)).toThrow(Error);
    expect(() => debounceEvent(handler, NaN)).toThrow(
      'delay must be a valid number, not NaN',
    );
  });

  // Test case 18: Error for negative delay
  it('18. should throw Error when delay is negative', () => {
    // Arrange
    const handler = jest.fn();

    // Act & Assert
    expect(() => debounceEvent(handler, -100)).toThrow(Error);
    expect(() => debounceEvent(handler, -100)).toThrow(
      'delay must be non-negative',
    );
  });

  // Test case 19: TypeError for invalid immediate type
  it('19. should throw TypeError when immediate is not a boolean', () => {
    // Arrange
    const handler = jest.fn();
    const invalidInputs = [123, 'string', null, [], {}];

    // Act & Assert
    invalidInputs.forEach((input) => {
      expect(() =>
        debounceEvent(handler, 1000, input as unknown as boolean),
      ).toThrow(TypeError);
      expect(() =>
        debounceEvent(handler, 1000, input as unknown as boolean),
      ).toThrow('immediate must be a boolean');
    });
  });
});
