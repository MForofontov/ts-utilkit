/**
 * Type definition for event listener functions.
 */
export type EventListener<T = unknown> = (data: T) => void;

/**
 * A simple event emitter class for managing event-driven programming patterns.
 * Provides methods to register, unregister, and emit events with type-safe listeners.
 *
 * @example
 * // Basic usage
 * const emitter = new EventEmitter();
 * emitter.on('data', (data) => console.log('Received:', data));
 * emitter.emit('data', { message: 'Hello' });
 *
 * @example
 * // One-time listeners
 * const emitter = new EventEmitter();
 * emitter.once('start', () => console.log('Started'));
 * emitter.emit('start'); // Logs 'Started'
 * emitter.emit('start'); // Nothing happens
 *
 * @example
 * // Removing listeners
 * const emitter = new EventEmitter();
 * const handler = (data) => console.log(data);
 * emitter.on('event', handler);
 * emitter.off('event', handler);
 * emitter.emit('event', 'test'); // Nothing happens
 *
 * @note All listeners are called synchronously in the order they were registered.
 *
 * @complexity
 * - on: O(1)
 * - off: O(n) where n is number of listeners for the event
 * - emit: O(n) where n is number of listeners for the event
 * - once: O(1)
 */
export class EventEmitter {
  private events: Map<string, EventListener[]>;

  /**
   * Creates a new EventEmitter instance.
   */
  constructor() {
    this.events = new Map();
  }

  /**
   * Registers an event listener for the specified event name.
   *
   * @param eventName - The name of the event to listen for.
   * @param listener - The callback function to execute when the event is emitted.
   * @returns The EventEmitter instance for method chaining.
   *
   * @throws {TypeError} If eventName is not a string.
   * @throws {TypeError} If listener is not a function.
   *
   * @example
   * const emitter = new EventEmitter();
   * emitter.on('update', (data) => console.log('Updated:', data));
   *
   * @complexity Time: O(1), Space: O(1)
   */
  on<T = unknown>(eventName: string, listener: EventListener<T>): this {
    if (typeof eventName !== 'string') {
      throw new TypeError(
        `eventName must be a string, got ${typeof eventName}`,
      );
    }
    if (typeof listener !== 'function') {
      throw new TypeError(
        `listener must be a function, got ${typeof listener}`,
      );
    }

    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }

    this.events.get(eventName)!.push(listener as EventListener);

    return this;
  }

  /**
   * Removes an event listener for the specified event name.
   *
   * @param eventName - The name of the event.
   * @param listener - The callback function to remove.
   * @returns The EventEmitter instance for method chaining.
   *
   * @throws {TypeError} If eventName is not a string.
   * @throws {TypeError} If listener is not a function.
   *
   * @example
   * const emitter = new EventEmitter();
   * const handler = (data) => console.log(data);
   * emitter.on('event', handler);
   * emitter.off('event', handler);
   *
   * @complexity Time: O(n) where n is number of listeners, Space: O(1)
   */
  off<T = unknown>(eventName: string, listener: EventListener<T>): this {
    if (typeof eventName !== 'string') {
      throw new TypeError(
        `eventName must be a string, got ${typeof eventName}`,
      );
    }
    if (typeof listener !== 'function') {
      throw new TypeError(
        `listener must be a function, got ${typeof listener}`,
      );
    }

    const listeners = this.events.get(eventName);
    if (!listeners) {
      return this;
    }

    const index = listeners.indexOf(listener as EventListener);
    if (index !== -1) {
      listeners.splice(index, 1);
    }

    // Clean up empty event arrays
    if (listeners.length === 0) {
      this.events.delete(eventName);
    }

    return this;
  }

  /**
   * Emits an event, calling all registered listeners with the provided data.
   *
   * @param eventName - The name of the event to emit.
   * @param data - Optional data to pass to the listeners.
   * @returns True if listeners were called, false if no listeners exist.
   *
   * @throws {TypeError} If eventName is not a string.
   *
   * @example
   * const emitter = new EventEmitter();
   * emitter.on('message', (msg) => console.log(msg));
   * emitter.emit('message', 'Hello World'); // Logs 'Hello World'
   *
   * @complexity Time: O(n) where n is number of listeners, Space: O(1)
   */
  emit<T = unknown>(eventName: string, data?: T): boolean {
    if (typeof eventName !== 'string') {
      throw new TypeError(
        `eventName must be a string, got ${typeof eventName}`,
      );
    }

    const listeners = this.events.get(eventName);
    if (!listeners || listeners.length === 0) {
      return false;
    }

    // Create a copy to avoid issues if listeners modify the array
    const listenersCopy = [...listeners];
    for (const listener of listenersCopy) {
      listener(data);
    }

    return true;
  }

  /**
   * Registers a one-time event listener that is automatically removed after being called once.
   *
   * @param eventName - The name of the event to listen for.
   * @param listener - The callback function to execute once when the event is emitted.
   * @returns The EventEmitter instance for method chaining.
   *
   * @throws {TypeError} If eventName is not a string.
   * @throws {TypeError} If listener is not a function.
   *
   * @example
   * const emitter = new EventEmitter();
   * emitter.once('init', () => console.log('Initialized'));
   * emitter.emit('init'); // Logs 'Initialized'
   * emitter.emit('init'); // Nothing happens
   *
   * @complexity Time: O(1), Space: O(1)
   */
  once<T = unknown>(eventName: string, listener: EventListener<T>): this {
    if (typeof eventName !== 'string') {
      throw new TypeError(
        `eventName must be a string, got ${typeof eventName}`,
      );
    }
    if (typeof listener !== 'function') {
      throw new TypeError(
        `listener must be a function, got ${typeof listener}`,
      );
    }

    const onceWrapper: EventListener<T> = (data: T) => {
      listener(data);
      this.off(eventName, onceWrapper);
    };

    this.on(eventName, onceWrapper);

    return this;
  }

  /**
   * Removes all listeners for a specific event, or all listeners for all events.
   *
   * @param eventName - Optional event name. If not provided, removes all listeners for all events.
   * @returns The EventEmitter instance for method chaining.
   *
   * @throws {TypeError} If eventName is provided but not a string.
   *
   * @example
   * const emitter = new EventEmitter();
   * emitter.on('event1', () => {});
   * emitter.on('event2', () => {});
   * emitter.removeAllListeners('event1'); // Removes only event1 listeners
   * emitter.removeAllListeners(); // Removes all listeners
   *
   * @complexity Time: O(1) for specific event, O(n) for all events, Space: O(1)
   */
  removeAllListeners(eventName?: string): this {
    if (eventName !== undefined && typeof eventName !== 'string') {
      throw new TypeError(
        `eventName must be a string, got ${typeof eventName}`,
      );
    }

    if (eventName) {
      this.events.delete(eventName);
    } else {
      this.events.clear();
    }

    return this;
  }

  /**
   * Returns the number of listeners for a specific event.
   *
   * @param eventName - The name of the event.
   * @returns The number of listeners registered for the event.
   *
   * @throws {TypeError} If eventName is not a string.
   *
   * @example
   * const emitter = new EventEmitter();
   * emitter.on('event', () => {});
   * emitter.on('event', () => {});
   * emitter.listenerCount('event'); // Returns 2
   *
   * @complexity Time: O(1), Space: O(1)
   */
  listenerCount(eventName: string): number {
    if (typeof eventName !== 'string') {
      throw new TypeError(
        `eventName must be a string, got ${typeof eventName}`,
      );
    }

    const listeners = this.events.get(eventName);
    return listeners ? listeners.length : 0;
  }

  /**
   * Returns an array of event names that have registered listeners.
   *
   * @returns Array of event names.
   *
   * @example
   * const emitter = new EventEmitter();
   * emitter.on('event1', () => {});
   * emitter.on('event2', () => {});
   * emitter.eventNames(); // Returns ['event1', 'event2']
   *
   * @complexity Time: O(n) where n is number of unique events, Space: O(n)
   */
  eventNames(): string[] {
    return Array.from(this.events.keys());
  }
}
