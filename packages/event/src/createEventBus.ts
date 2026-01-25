import { EventEmitter } from './EventEmitter';

/**
 * Creates a simple event bus for loosely coupled communication between components.
 * An event bus provides a centralized event management system for publish-subscribe patterns.
 *
 * @returns An object with publish, subscribe, unsubscribe, and clear methods.
 *
 * @example
 * // Basic usage
 * const bus = createEventBus();
 *
 * bus.subscribe('user:login', (user) => {
 *   console.log('User logged in:', user.name);
 * });
 *
 * bus.publish('user:login', { name: 'Alice', id: 123 });
 *
 * @example
 * // Multiple subscribers
 * const bus = createEventBus();
 *
 * bus.subscribe('data:update', (data) => console.log('Handler 1:', data));
 * bus.subscribe('data:update', (data) => console.log('Handler 2:', data));
 *
 * bus.publish('data:update', { value: 42 });
 * // Logs both handlers
 *
 * @example
 * // Unsubscribing
 * const bus = createEventBus();
 * const handler = (data) => console.log(data);
 *
 * bus.subscribe('event', handler);
 * bus.unsubscribe('event', handler);
 * bus.publish('event', 'test'); // Nothing happens
 *
 * @note The event bus uses an EventEmitter internally for managing events.
 *
 * @complexity
 * - subscribe: O(1)
 * - unsubscribe: O(n) where n is number of subscribers
 * - publish: O(n) where n is number of subscribers
 * - clear: O(1)
 */
export function createEventBus(): {
  subscribe: <T = unknown>(
    eventName: string,
    handler: (data: T) => void,
  ) => void;
  unsubscribe: <T = unknown>(
    eventName: string,
    handler: (data: T) => void,
  ) => void;
  publish: <T = unknown>(eventName: string, data?: T) => void;
  clear: (eventName?: string) => void;
  getSubscriberCount: (eventName: string) => number;
} {
  const emitter = new EventEmitter();

  return {
    /**
     * Subscribes to an event with a handler function.
     *
     * @param eventName - The name of the event to subscribe to.
     * @param handler - The callback function to execute when event is published.
     */
    subscribe: <T = unknown>(
      eventName: string,
      handler: (data: T) => void,
    ): void => {
      emitter.on<T>(eventName, handler);
    },

    /**
     * Unsubscribes a handler from an event.
     *
     * @param eventName - The name of the event.
     * @param handler - The callback function to remove.
     */
    unsubscribe: <T = unknown>(
      eventName: string,
      handler: (data: T) => void,
    ): void => {
      emitter.off<T>(eventName, handler);
    },

    /**
     * Publishes an event with optional data to all subscribers.
     *
     * @param eventName - The name of the event to publish.
     * @param data - Optional data to pass to subscribers.
     */
    publish: <T = unknown>(eventName: string, data?: T): void => {
      emitter.emit<T>(eventName, data);
    },

    /**
     * Clears all subscribers for a specific event or all events.
     *
     * @param eventName - Optional event name. If not provided, clears all events.
     */
    clear: (eventName?: string): void => {
      emitter.removeAllListeners(eventName);
    },

    /**
     * Returns the number of subscribers for a specific event.
     *
     * @param eventName - The name of the event.
     * @returns The number of subscribers.
     */
    getSubscriberCount: (eventName: string): number => {
      return emitter.listenerCount(eventName);
    },
  };
}
