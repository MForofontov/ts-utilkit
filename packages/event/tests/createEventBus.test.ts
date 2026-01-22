import { createEventBus } from '../src/createEventBus';

/**
 * Unit tests for the createEventBus function.
 */
describe('createEventBus', () => {
  let bus: ReturnType<typeof createEventBus>;

  beforeEach(() => {
    bus = createEventBus();
  });

  // Test case 1: Basic subscribe and publish
  it('1. should subscribe and publish events', () => {
    // Arrange
    const handler = jest.fn();
    bus.subscribe('test', handler);

    // Act
    bus.publish('test', 'data');

    // Assert
    expect(handler).toHaveBeenCalledWith('data');
    expect(handler).toHaveBeenCalledTimes(1);
  });

  // Test case 2: Multiple subscribers
  it('2. should handle multiple subscribers for same event', () => {
    // Arrange
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    const handler3 = jest.fn();

    bus.subscribe('event', handler1);
    bus.subscribe('event', handler2);
    bus.subscribe('event', handler3);

    // Act
    bus.publish('event', 'test data');

    // Assert
    expect(handler1).toHaveBeenCalledWith('test data');
    expect(handler2).toHaveBeenCalledWith('test data');
    expect(handler3).toHaveBeenCalledWith('test data');
  });

  // Test case 3: Unsubscribe
  it('3. should unsubscribe handlers', () => {
    // Arrange
    const handler = jest.fn();
    bus.subscribe('event', handler);

    // Act
    bus.unsubscribe('event', handler);
    bus.publish('event', 'data');

    // Assert
    expect(handler).not.toHaveBeenCalled();
  });

  // Test case 4: Multiple events
  it('4. should handle multiple different events', () => {
    // Arrange
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    bus.subscribe('event1', handler1);
    bus.subscribe('event2', handler2);

    // Act
    bus.publish('event1', 'data1');
    bus.publish('event2', 'data2');

    // Assert
    expect(handler1).toHaveBeenCalledWith('data1');
    expect(handler2).toHaveBeenCalledWith('data2');
    expect(handler1).not.toHaveBeenCalledWith('data2');
    expect(handler2).not.toHaveBeenCalledWith('data1');
  });

  // Test case 5: Clear specific event
  it('5. should clear subscribers for specific event', () => {
    // Arrange
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    bus.subscribe('event1', handler1);
    bus.subscribe('event2', handler2);

    // Act
    bus.clear('event1');
    bus.publish('event1', 'data1');
    bus.publish('event2', 'data2');

    // Assert
    expect(handler1).not.toHaveBeenCalled();
    expect(handler2).toHaveBeenCalledWith('data2');
  });

  // Test case 6: Clear all events
  it('6. should clear all subscribers', () => {
    // Arrange
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    bus.subscribe('event1', handler1);
    bus.subscribe('event2', handler2);

    // Act
    bus.clear();
    bus.publish('event1', 'data1');
    bus.publish('event2', 'data2');

    // Assert
    expect(handler1).not.toHaveBeenCalled();
    expect(handler2).not.toHaveBeenCalled();
  });

  // Test case 7: GetSubscriberCount
  it('7. should return correct subscriber count', () => {
    // Arrange
    bus.subscribe('event', () => {});
    bus.subscribe('event', () => {});
    bus.subscribe('event', () => {});

    // Act
    const count = bus.getSubscriberCount('event');

    // Assert
    expect(count).toBe(3);
  });

  // Test case 8: GetSubscriberCount for nonexistent event
  it('8. should return 0 for nonexistent event', () => {
    // Act
    const count = bus.getSubscriberCount('nonexistent');

    // Assert
    expect(count).toBe(0);
  });

  // Test case 9: Publish without data
  it('9. should handle publish with no data', () => {
    // Arrange
    const handler = jest.fn();
    bus.subscribe('event', handler);

    // Act
    bus.publish('event');

    // Assert
    expect(handler).toHaveBeenCalledWith(undefined);
  });

  // Test case 10: Complex data types
  it('10. should handle complex data types', () => {
    // Arrange
    const handler = jest.fn();
    const complexData = {
      user: { id: 123, name: 'Alice' },
      items: [1, 2, 3],
      timestamp: new Date(),
      nested: { deep: { value: 'test' } },
    };

    bus.subscribe('event', handler);

    // Act
    bus.publish('event', complexData);

    // Assert
    expect(handler).toHaveBeenCalledWith(complexData);
  });

  // Test case 11: Multiple independent buses
  it('11. should create independent event buses', () => {
    // Arrange
    const bus1 = createEventBus();
    const bus2 = createEventBus();
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    bus1.subscribe('event', handler1);
    bus2.subscribe('event', handler2);

    // Act
    bus1.publish('event', 'bus1-data');

    // Assert
    expect(handler1).toHaveBeenCalledWith('bus1-data');
    expect(handler2).not.toHaveBeenCalled();
  });

  // Test case 12: Subscriber count after unsubscribe
  it('12. should update subscriber count after unsubscribe', () => {
    // Arrange
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    bus.subscribe('event', handler1);
    bus.subscribe('event', handler2);

    expect(bus.getSubscriberCount('event')).toBe(2);

    // Act
    bus.unsubscribe('event', handler1);

    // Assert
    expect(bus.getSubscriberCount('event')).toBe(1);
  });

  // Test case 13: Publish to event with no subscribers
  it('13. should safely handle publish to event with no subscribers', () => {
    // Act & Assert
    expect(() => bus.publish('nonexistent', 'data')).not.toThrow();
  });

  // Test case 14: Same handler subscribed multiple times
  it('14. should allow same handler subscribed multiple times', () => {
    // Arrange
    const handler = jest.fn();

    bus.subscribe('event', handler);
    bus.subscribe('event', handler);

    // Act
    bus.publish('event', 'data');

    // Assert
    expect(handler).toHaveBeenCalledTimes(2);
  });

  // Test case 15: Performance with many subscribers
  it('15. should handle many subscribers efficiently', () => {
    // Arrange
    const handlers = Array.from({ length: 1000 }, () => jest.fn());
    handlers.forEach((handler) => bus.subscribe('event', handler));

    // Act
    const startTime = performance.now();
    bus.publish('event', 'data');
    const endTime = performance.now();

    // Assert
    handlers.forEach((handler) => {
      expect(handler).toHaveBeenCalledWith('data');
    });
    expect(endTime - startTime).toBeLessThan(100);
  });

  // Test case 16: Type-safe event data
  it('16. should maintain type safety for event data', () => {
    // Arrange
    const handler = jest.fn((data: { id: number; name: string }) => {
      return data.id + data.name;
    });

    bus.subscribe<{ id: number; name: string }>('user', handler);

    // Act
    bus.publish('user', { id: 42, name: 'Alice' });

    // Assert
    expect(handler).toHaveBeenCalledWith({ id: 42, name: 'Alice' });
  });

  // Test case 17: Clear with no subscribers
  it('17. should safely clear event with no subscribers', () => {
    // Act & Assert
    expect(() => bus.clear('nonexistent')).not.toThrow();
  });

  // Test case 18: Subscriber count after clear
  it('18. should return 0 subscriber count after clear', () => {
    // Arrange
    bus.subscribe('event', () => {});
    bus.subscribe('event', () => {});

    // Act
    bus.clear('event');
    const count = bus.getSubscriberCount('event');

    // Assert
    expect(count).toBe(0);
  });
});
