/**
 * @jest-environment jsdom
 */

import { delegateEvent } from '../src/delegateEvent';

/**
 * Unit tests for the delegateEvent function.
 */
describe('delegateEvent', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    // Create a fresh container for each test
    container = document.createElement('div');
    container.innerHTML = `
      <div class="parent">
        <button class="btn" data-id="1">Button 1</button>
        <button class="btn" data-id="2">Button 2</button>
        <div class="nested">
          <button class="btn" data-id="3">Button 3</button>
        </div>
      </div>
    `;
    document.body.appendChild(container);
  });

  afterEach(() => {
    // Clean up
    document.body.removeChild(container);
  });

  // Test case 1: Normal/happy path - basic delegation
  it('1. should handle delegated click events on matching elements', () => {
    // Arrange
    const handler = jest.fn();
    const parent = container.querySelector('.parent')!;

    // Act
    delegateEvent(parent, 'click', '.btn', handler);
    const button = container.querySelector(
      '[data-id="1"]',
    ) as HTMLButtonElement;
    button.click();

    // Assert
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(expect.any(MouseEvent), button);
  });

  // Test case 2: Delegation with nested elements
  it('2. should handle events on nested matching elements', () => {
    // Arrange
    const handler = jest.fn();
    const parent = container.querySelector('.parent')!;

    // Act
    delegateEvent(parent, 'click', '.btn', handler);
    const nestedButton = container.querySelector(
      '[data-id="3"]',
    ) as HTMLButtonElement;
    nestedButton.click();

    // Assert
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(expect.any(MouseEvent), nestedButton);
  });

  // Test case 3: Multiple matching elements
  it('3. should handle events on multiple matching elements separately', () => {
    // Arrange
    const handler = jest.fn();
    const parent = container.querySelector('.parent')!;

    // Act
    delegateEvent(parent, 'click', '.btn', handler);
    const button1 = container.querySelector(
      '[data-id="1"]',
    ) as HTMLButtonElement;
    const button2 = container.querySelector(
      '[data-id="2"]',
    ) as HTMLButtonElement;
    button1.click();
    button2.click();

    // Assert
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler).toHaveBeenNthCalledWith(1, expect.any(MouseEvent), button1);
    expect(handler).toHaveBeenNthCalledWith(2, expect.any(MouseEvent), button2);
  });

  // Test case 4: Cleanup function
  it('4. should remove event listener when cleanup function is called', () => {
    // Arrange
    const handler = jest.fn();
    const parent = container.querySelector('.parent')!;

    // Act
    const cleanup = delegateEvent(parent, 'click', '.btn', handler);
    const button = container.querySelector(
      '[data-id="1"]',
    ) as HTMLButtonElement;
    button.click();
    cleanup();
    button.click();

    // Assert
    expect(handler).toHaveBeenCalledTimes(1); // Only first click counted
  });

  // Test case 5: Non-matching elements should not trigger handler
  it('5. should not trigger handler for non-matching elements', () => {
    // Arrange
    const handler = jest.fn();
    const parent = container.querySelector('.parent')!;

    // Act
    delegateEvent(parent, 'click', '.btn', handler);
    const nested = container.querySelector('.nested') as HTMLDivElement;
    nested.click();

    // Assert
    expect(handler).not.toHaveBeenCalled();
  });

  // Test case 6: Dynamically added elements
  it('6. should handle events on dynamically added elements', () => {
    // Arrange
    const handler = jest.fn();
    const parent = container.querySelector('.parent')!;
    delegateEvent(parent, 'click', '.btn', handler);

    // Act - Add new button dynamically
    const newButton = document.createElement('button');
    newButton.className = 'btn';
    newButton.setAttribute('data-id', '4');
    parent.appendChild(newButton);
    newButton.click();

    // Assert
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(expect.any(MouseEvent), newButton);
  });

  // Test case 7: Different event types
  it('7. should handle different event types (change, input)', () => {
    // Arrange
    container.innerHTML = '<form><input type="text" class="field" /></form>';
    const handler = jest.fn();
    const form = container.querySelector('form')!;

    // Act
    delegateEvent(form, 'input', '.field', handler);
    const input = container.querySelector('.field') as HTMLInputElement;
    input.value = 'test';
    input.dispatchEvent(new Event('input', { bubbles: true }));

    // Assert
    expect(handler).toHaveBeenCalledTimes(1);
  });

  // Test case 8: Complex selectors
  it('8. should handle complex CSS selectors', () => {
    // Arrange
    container.innerHTML = `
      <div class="parent">
        <button class="btn primary">Primary</button>
        <button class="btn secondary">Secondary</button>
      </div>
    `;
    const handler = jest.fn();
    const parent = container.querySelector('.parent')!;

    // Act
    delegateEvent(parent, 'click', '.btn.primary', handler);
    const primaryBtn = container.querySelector(
      '.btn.primary',
    ) as HTMLButtonElement;
    const secondaryBtn = container.querySelector(
      '.btn.secondary',
    ) as HTMLButtonElement;
    primaryBtn.click();
    secondaryBtn.click();

    // Assert
    expect(handler).toHaveBeenCalledTimes(1); // Only primary button
  });

  // Test case 9: Event bubbling through multiple levels
  it('9. should handle events that bubble through multiple nested levels', () => {
    // Arrange
    container.innerHTML = `
      <div class="parent">
        <div class="level1">
          <div class="level2">
            <button class="target">Click me</button>
          </div>
        </div>
      </div>
    `;
    const handler = jest.fn();
    const parent = container.querySelector('.parent')!;

    // Act
    delegateEvent(parent, 'click', '.target', handler);
    const button = container.querySelector('.target') as HTMLButtonElement;
    button.click();

    // Assert
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(expect.any(MouseEvent), button);
  });

  // Test case 10: Handler receives correct event object
  it('10. should pass correct event object to handler', () => {
    // Arrange
    const handler = jest.fn();
    const parent = container.querySelector('.parent')!;

    // Act
    delegateEvent(parent, 'click', '.btn', handler);
    const button = container.querySelector(
      '[data-id="1"]',
    ) as HTMLButtonElement;
    button.click();

    // Assert
    const [event, target] = handler.mock.calls[0] as [MouseEvent, Element];
    expect(event).toBeInstanceOf(MouseEvent);
    expect(event.type).toBe('click');
    expect(target).toBe(button);
  });

  // Test case 11: Multiple delegations on same parent
  it('11. should support multiple delegations on the same parent', () => {
    // Arrange
    container.innerHTML = `
      <div class="parent">
        <button class="btn">Button</button>
        <a href="#" class="link">Link</a>
      </div>
    `;
    const btnHandler = jest.fn();
    const linkHandler = jest.fn();
    const parent = container.querySelector('.parent')!;

    // Act
    delegateEvent(parent, 'click', '.btn', btnHandler);
    delegateEvent(parent, 'click', '.link', linkHandler);
    const button = container.querySelector('.btn') as HTMLButtonElement;
    const link = container.querySelector('.link') as HTMLAnchorElement;
    button.click();
    link.click();

    // Assert
    expect(btnHandler).toHaveBeenCalledTimes(1);
    expect(linkHandler).toHaveBeenCalledTimes(1);
  });

  // Test case 12: Handler with event.target vs matched element
  it('12. should match closest selector when event target is child of matching element', () => {
    // Arrange
    container.innerHTML = `
      <div class="parent">
        <button class="btn">
          <span class="icon">Icon</span>
          Text
        </button>
      </div>
    `;
    const handler = jest.fn();
    const parent = container.querySelector('.parent')!;

    // Act
    delegateEvent(parent, 'click', '.btn', handler);
    const icon = container.querySelector('.icon') as HTMLSpanElement;
    icon.click(); // Click on child span

    // Assert
    expect(handler).toHaveBeenCalledTimes(1);
    const [, target] = handler.mock.calls[0] as [MouseEvent, Element];
    expect(target).toBe(container.querySelector('.btn'));
  });

  // Test case 13: Performance with many elements
  it('13. should handle many elements efficiently', () => {
    // Arrange
    const parent = document.createElement('div');
    for (let i = 0; i < 1000; i++) {
      const btn = document.createElement('button');
      btn.className = 'btn';
      btn.setAttribute('data-id', String(i));
      parent.appendChild(btn);
    }
    document.body.appendChild(parent);
    const handler = jest.fn();

    // Act
    const startTime = performance.now();
    delegateEvent(parent, 'click', '.btn', handler);
    const button = parent.querySelector('[data-id="500"]') as HTMLButtonElement;
    button.click();
    const endTime = performance.now();

    // Assert
    expect(handler).toHaveBeenCalledTimes(1);
    expect(endTime - startTime).toBeLessThan(100);

    // Cleanup
    document.body.removeChild(parent);
  });

  // Test case 14: TypeError for invalid parent
  it('14. should throw TypeError when parent is not an Element', () => {
    // Arrange
    const handler = jest.fn();
    const invalidParents = [null, undefined, 'string', 123, {}, []];

    // Act & Assert
    invalidParents.forEach((invalid) => {
      expect(() =>
        delegateEvent(invalid as unknown as Element, 'click', '.btn', handler),
      ).toThrow(TypeError);
      expect(() =>
        delegateEvent(invalid as unknown as Element, 'click', '.btn', handler),
      ).toThrow('parent must be an Element');
    });
  });

  // Test case 15: TypeError for invalid eventType
  it('15. should throw TypeError when eventType is not a string', () => {
    // Arrange
    const parent = container.querySelector('.parent')!;
    const handler = jest.fn();
    const invalidTypes = [null, undefined, 123, {}, []];

    // Act & Assert
    invalidTypes.forEach((invalid) => {
      expect(() =>
        delegateEvent(
          parent,
          invalid as unknown as keyof HTMLElementEventMap,
          '.btn',
          handler,
        ),
      ).toThrow(TypeError);
      expect(() =>
        delegateEvent(
          parent,
          invalid as unknown as keyof HTMLElementEventMap,
          '.btn',
          handler,
        ),
      ).toThrow('eventType must be a string');
    });
  });

  // Test case 16: TypeError for invalid selector
  it('16. should throw TypeError when selector is not a string', () => {
    // Arrange
    const parent = container.querySelector('.parent')!;
    const handler = jest.fn();
    const invalidSelectors = [null, undefined, 123, {}, []];

    // Act & Assert
    invalidSelectors.forEach((invalid) => {
      expect(() =>
        delegateEvent(parent, 'click', invalid as unknown as string, handler),
      ).toThrow(TypeError);
      expect(() =>
        delegateEvent(parent, 'click', invalid as unknown as string, handler),
      ).toThrow('selector must be a string');
    });
  });

  // Test case 17: TypeError for invalid handler
  it('17. should throw TypeError when handler is not a function', () => {
    // Arrange
    const parent = container.querySelector('.parent')!;
    const invalidHandlers = [null, undefined, 'string', 123, {}, []];

    // Act & Assert
    invalidHandlers.forEach((invalid) => {
      expect(() =>
        delegateEvent(
          parent,
          'click',
          '.btn',
          invalid as unknown as (event: MouseEvent, target: Element) => void,
        ),
      ).toThrow(TypeError);
      expect(() =>
        delegateEvent(
          parent,
          'click',
          '.btn',
          invalid as unknown as (event: MouseEvent, target: Element) => void,
        ),
      ).toThrow('handler must be a function');
    });
  });
});
