/**
 * @jest-environment jsdom
 */
import { onceEvent } from '../src/onceEvent';

/**
 * Unit tests for the onceEvent function.
 */
describe('onceEvent', () => {
  // Test case 1: Basic once behavior
  it('1. should execute handler only once', () => {
    // Arrange
    const handler = jest.fn();
    const once = onceEvent(handler);

    // Act
    once();
    once();
    once();

    // Assert
    expect(handler).toHaveBeenCalledTimes(1);
  });

  // Test case 2: Return cached result
  it('2. should return the same result on subsequent calls', () => {
    // Arrange
    let callCount = 0;
    const handler = jest.fn(() => {
      callCount++;
      return `result-${callCount}`;
    });
    const once = onceEvent(handler);

    // Act
    const result1 = once();
    const result2 = once();
    const result3 = once();

    // Assert
    expect(result1).toBe('result-1');
    expect(result2).toBe('result-1'); // Same as first call
    expect(result3).toBe('result-1'); // Same as first call
    expect(handler).toHaveBeenCalledTimes(1);
  });

  // Test case 3: With arguments
  it('3. should pass arguments to handler on first call', () => {
    // Arrange
    const handler = jest.fn((a: number, b: string, c: boolean) => {
      return { a, b, c };
    });
    const once = onceEvent(handler);

    // Act
    const result1 = once(42, 'test', true);
    const result2 = once(99, 'different', false); // Different args ignored

    // Assert
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(42, 'test', true);
    expect(result1).toEqual({ a: 42, b: 'test', c: true });
    expect(result2).toEqual({ a: 42, b: 'test', c: true }); // Same result
  });

  // Test case 4: With promises
  it('4. should cache promise results', async () => {
    // Arrange
    let callCount = 0;
    const handler = jest.fn(() => {
      callCount++;
      return Promise.resolve(`async-result-${callCount}`);
    });
    const once = onceEvent(handler);

    // Act
    const promise1 = once();
    const promise2 = once();
    const promise3 = once();

    const result1 = await promise1;
    const result2 = await promise2;
    const result3 = await promise3;

    // Assert
    expect(handler).toHaveBeenCalledTimes(1);
    expect(result1).toBe('async-result-1');
    expect(result2).toBe('async-result-1'); // Same promise
    expect(result3).toBe('async-result-1'); // Same promise
    expect(promise1).toBe(promise2); // Same promise object
    expect(promise2).toBe(promise3);
  });

  // Test case 5: With objects
  it('5. should return the same object reference', () => {
    // Arrange
    const handler = jest.fn(() => ({ key: 'value', count: 42 }));
    const once = onceEvent(handler);

    // Act
    const obj1 = once();
    const obj2 = once();
    const obj3 = once();

    // Assert
    expect(obj1).toBe(obj2); // Same reference
    expect(obj2).toBe(obj3); // Same reference
    expect(handler).toHaveBeenCalledTimes(1);
  });

  // Test case 6: With arrays
  it('6. should return the same array reference', () => {
    // Arrange
    const handler = jest.fn(() => [1, 2, 3, 4, 5]);
    const once = onceEvent(handler);

    // Act
    const arr1 = once();
    const arr2 = once();

    // Assert
    expect(arr1).toBe(arr2); // Same reference
    expect(handler).toHaveBeenCalledTimes(1);
  });

  // Test case 7: Preserves undefined return value
  it('7. should preserve undefined return value', () => {
    // Arrange
    const handler = jest.fn<undefined, []>();
    const once = onceEvent(handler);

    // Act
    const result1 = once();
    const result2 = once();

    // Assert
    expect(result1).toBeUndefined();
    expect(result2).toBeUndefined();
    expect(handler).toHaveBeenCalledTimes(1);
  });

  // Test case 8: With null return
  it('8. should handle null return value', () => {
    // Arrange
    const handler = jest.fn(() => null);
    const once = onceEvent(handler);

    // Act
    const result1 = once();
    const result2 = once();

    // Assert
    expect(result1).toBeNull();
    expect(result2).toBeNull();
    expect(handler).toHaveBeenCalledTimes(1);
  });

  // Test case 9: With thrown error
  it('9. should throw error only on first call', () => {
    // Arrange
    const error = new Error('Test error');
    const handler = jest.fn(() => {
      throw error;
    });
    const once = onceEvent(handler);

    // Act & Assert
    expect(() => once()).toThrow('Test error');

    // Second call should not throw (returns undefined)
    const result = once();
    expect(result).toBeUndefined();
    expect(handler).toHaveBeenCalledTimes(1);
  });

  // Test case 10: No arguments
  it('10. should handle calls with no arguments', () => {
    // Arrange
    const handler = jest.fn(() => 'no-args-result');
    const once = onceEvent(handler);

    // Act
    const result1 = once();
    const result2 = once();

    // Assert
    expect(result1).toBe('no-args-result');
    expect(result2).toBe('no-args-result');
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith();
  });

  // Test case 11: Preserves this context
  it('11. should preserve this context', () => {
    // Arrange
    const context = { value: 42 };
    const handler = jest.fn(function (this: typeof context) {
      return this.value;
    });
    const once = onceEvent(handler);

    // Act
    const result1 = once.call(context);
    const result2 = once.call(context);

    // Assert
    expect(result1).toBe(42);
    expect(result2).toBe(42);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  // Test case 12: Multiple independent wrappers
  it('12. should create independent once wrappers', () => {
    // Arrange
    const handler = jest.fn((value: string) => `result-${value}`);
    const once1 = onceEvent(handler);
    const once2 = onceEvent(handler);

    // Act
    const result1a = once1('a');
    const result1b = once1('b');
    const result2a = once2('c');
    const result2b = once2('d');

    // Assert
    expect(result1a).toBe('result-a');
    expect(result1b).toBe('result-a'); // Cached
    expect(result2a).toBe('result-c');
    expect(result2b).toBe('result-c'); // Cached
    expect(handler).toHaveBeenCalledTimes(2); // Once for each wrapper
  });

  // Test case 13: Complex return types
  it('13. should handle complex return types', () => {
    // Arrange
    const complexResult = {
      nested: {
        deep: {
          value: 'test',
          array: [1, 2, 3],
          fn: () => 'inner',
        },
      },
      date: new Date(),
      regex: /test/,
    };
    const handler = jest.fn(() => complexResult);
    const once = onceEvent(handler);

    // Act
    const result1 = once();
    const result2 = once();

    // Assert
    expect(result1).toBe(result2); // Same reference
    expect(result1).toEqual(complexResult);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  // Test case 14: Performance with many calls
  it('14. should handle many calls efficiently', () => {
    // Arrange
    const handler = jest.fn(() => 'result');
    const once = onceEvent(handler);

    // Act
    const startTime = performance.now();
    for (let i = 0; i < 10000; i++) {
      once();
    }
    const endTime = performance.now();

    // Assert
    expect(handler).toHaveBeenCalledTimes(1);
    expect(endTime - startTime).toBeLessThan(100);
  });

  // Test case 15: With numeric return
  it('15. should handle numeric return values including zero', () => {
    // Arrange
    const handler = jest.fn(() => 0);
    const once = onceEvent(handler);

    // Act
    const result1 = once();
    const result2 = once();

    // Assert
    expect(result1).toBe(0);
    expect(result2).toBe(0);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  // Test case 16: With boolean return
  it('16. should handle boolean return values including false', () => {
    // Arrange
    const handler = jest.fn(() => false);
    const once = onceEvent(handler);

    // Act
    const result1 = once();
    const result2 = once();

    // Assert
    expect(result1).toBe(false);
    expect(result2).toBe(false);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  // Test case 17: DOM event - button click handler executes once
  it('17. should execute DOM click handler only once', () => {
    // Arrange
    const button = document.createElement('button');
    document.body.appendChild(button);
    const handler = jest.fn((event: Event) => {
      return (event.target as HTMLButtonElement).textContent;
    });
    const onceClick = onceEvent(handler);

    button.addEventListener('click', onceClick);
    button.textContent = 'Click me';

    // Act
    button.click();
    button.click();
    button.click();

    // Assert - handler should be called only once
    expect(handler).toHaveBeenCalledTimes(1);

    // Cleanup
    document.body.removeChild(button);
  });

  // Test case 18: DOM event - form submit once
  it('18. should handle DOM form submit once', () => {
    // Arrange
    const form = document.createElement('form');
    document.body.appendChild(form);
    const handler = jest.fn((event: Event) => {
      event.preventDefault();
      return 'submitted';
    });
    const onceSubmit = onceEvent(handler);

    form.addEventListener('submit', onceSubmit);

    // Act
    form.dispatchEvent(
      new Event('submit', { bubbles: true, cancelable: true }),
    );
    form.dispatchEvent(
      new Event('submit', { bubbles: true, cancelable: true }),
    );

    // Assert
    expect(handler).toHaveBeenCalledTimes(1);

    // Cleanup
    document.body.removeChild(form);
  });

  // Test case 19: DOM event - initialization function
  it('19. should execute DOM initialization once across multiple elements', () => {
    // Arrange
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    document.body.appendChild(div1);
    document.body.appendChild(div2);

    const initHandler = jest.fn(() => {
      return { initialized: true, timestamp: Date.now() };
    });
    const initOnce = onceEvent(initHandler);

    // Act
    const init1 = initOnce();
    const init2 = initOnce();

    // Assert
    expect(initHandler).toHaveBeenCalledTimes(1);
    expect(init1).toBe(init2); // Same reference

    // Cleanup
    document.body.removeChild(div1);
    document.body.removeChild(div2);
  });

  // Test case 20: TypeError for invalid handler
  it('20. should throw TypeError when handler is not a function', () => {
    // Arrange
    const invalidInputs = [123, 'string', null, undefined, [], {}, true];

    // Act & Assert
    invalidInputs.forEach((input) => {
      expect(() => onceEvent(input as unknown as () => void)).toThrow(
        TypeError,
      );
      expect(() => onceEvent(input as unknown as () => void)).toThrow(
        'handler must be a function',
      );
    });
  });
});
