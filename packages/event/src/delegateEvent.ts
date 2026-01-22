/**
 * Creates a delegated event listener that handles events from child elements
 * matching a selector, providing efficient event handling for dynamic content.
 *
 * @param parent - The parent element to attach the listener to.
 * @param eventType - The type of event to listen for (e.g., 'click', 'change').
 * @param selector - CSS selector to match target elements.
 * @param handler - The callback function to execute when matching elements trigger the event.
 * @returns A function to remove the delegated event listener.
 *
 * @throws {TypeError} If parent is not an Element.
 * @throws {TypeError} If eventType is not a string.
 * @throws {TypeError} If selector is not a string.
 * @throws {TypeError} If handler is not a function.
 *
 * @example
 * // Basic usage - handle clicks on dynamically added buttons
 * const cleanup = delegateEvent(
 *   document.body,
 *   'click',
 *   '.delete-btn',
 *   (event, target) => {
 *     console.log('Delete button clicked:', target);
 *     target.closest('.item')?.remove();
 *   }
 * );
 *
 * // Later: cleanup(); // Removes the delegated listener
 *
 * @example
 * // Form input delegation
 * delegateEvent(
 *   document.getElementById('form'),
 *   'input',
 *   'input[type="text"]',
 *   (event, target) => {
 *     console.log('Input changed:', target.value);
 *   }
 * );
 *
 * @example
 * // List item delegation
 * const removeListener = delegateEvent(
 *   document.querySelector('ul'),
 *   'click',
 *   'li',
 *   (event, target) => {
 *     target.classList.toggle('selected');
 *   }
 * );
 *
 * @note Uses event bubbling to handle events on child elements efficiently.
 * @note More efficient than attaching individual listeners to many elements.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function delegateEvent<K extends keyof HTMLElementEventMap>(
  parent: Element,
  eventType: K,
  selector: string,
  handler: (event: HTMLElementEventMap[K], target: Element) => void,
): () => void {
  if (!(parent instanceof Element)) {
    throw new TypeError(`parent must be an Element, got ${typeof parent}`);
  }
  if (typeof eventType !== 'string') {
    throw new TypeError(`eventType must be a string, got ${typeof eventType}`);
  }
  if (typeof selector !== 'string') {
    throw new TypeError(`selector must be a string, got ${typeof selector}`);
  }
  if (typeof handler !== 'function') {
    throw new TypeError(`handler must be a function, got ${typeof handler}`);
  }

  const listener = (event: Event): void => {
    // Find the target element that matches the selector
    let target = event.target as Element | null;

    while (target && target !== parent) {
      if (target.matches(selector)) {
        handler(event as HTMLElementEventMap[K], target);
        return;
      }
      target = target.parentElement;
    }
  };

  parent.addEventListener(eventType, listener as EventListener);

  // Return cleanup function
  return (): void => {
    parent.removeEventListener(eventType, listener as EventListener);
  };
}
