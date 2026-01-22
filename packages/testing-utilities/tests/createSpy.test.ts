import { createSpy } from '../src/createSpy';

/**
 * Unit tests for the createSpy function.
 */
describe('createSpy', () => {
  // Test case 1: Basic spy creation
  it('1. should create a spy function that tracks calls', () => {
    // Arrange
    const spy = createSpy();

    // Act
    spy('arg1', 'arg2');

    // Assert
    expect(spy.calls).toHaveLength(1);
    expect(spy.calls[0].args).toEqual(['arg1', 'arg2']);
  });

  // Test case 2: Track multiple calls
  it('2. should track multiple function calls', () => {
    // Arrange
    const spy = createSpy();

    // Act
    spy(1);
    spy(2, 3);
    spy();

    // Assert
    expect(spy.calls).toHaveLength(3);
    expect(spy.calls[0].args).toEqual([1]);
    expect(spy.calls[1].args).toEqual([2, 3]);
    expect(spy.calls[2].args).toEqual([]);
  });

  // Test case 3: Track return values
  it('3. should track return values from implementation', () => {
    // Arrange
    const implementation = (a: unknown, b: unknown) => Number(a) + Number(b);
    const spy = createSpy(implementation);

    // Act
    const result1 = spy(2, 3);
    const result2 = spy(5, 7);

    // Assert
    expect(result1).toBe(5);
    expect(result2).toBe(12);
    expect(spy.calls[0].result).toBe(5);
    expect(spy.calls[1].result).toBe(12);
  });

  // Test case 4: Spy without implementation
  it('4. should return undefined when no implementation provided', () => {
    // Arrange
    const spy = createSpy();

    // Act
    const result = spy('test');

    // Assert
    expect(result).toBeUndefined();
    expect(spy.calls[0].result).toBeUndefined();
  });

  // Test case 5: Reset spy calls
  it('5. should reset call history', () => {
    // Arrange
    const spy = createSpy();
    spy(1);
    spy(2);

    // Act
    spy.reset();

    // Assert
    expect(spy.calls).toHaveLength(0);
    expect(spy.callCount).toBe(0);
  });

  // Test case 6: Track call count
  it('6. should provide accurate call count', () => {
    // Arrange
    const spy = createSpy();

    // Act & Assert
    expect(spy.callCount).toBe(0);
    spy();
    expect(spy.callCount).toBe(1);
    spy();
    spy();
    expect(spy.callCount).toBe(3);
  });

  // Test case 7: Spy with object implementation
  it('7. should work with implementation returning objects', () => {
    // Arrange
    const implementation = (name: unknown) => ({
      name,
      timestamp: Date.now(),
    });
    const spy = createSpy(implementation);

    // Act
    const result = spy('test');

    // Assert
    expect(result).toHaveProperty('name', 'test');
    expect(result).toHaveProperty('timestamp');
    expect(spy.calls[0].result).toBe(result);
  });

  // Test case 8: Spy with different argument types
  it('8. should work with different argument types', () => {
    // Arrange
    const spy = createSpy();

    // Act
    spy(null, undefined, true, 42, 'string', {}, []);

    // Assert
    expect(spy.calls[0].args).toEqual([
      null,
      undefined,
      true,
      42,
      'string',
      {},
      [],
    ]);
  });

  // Test case 9: Implementation with error
  it('9. should track implementation that throws errors', () => {
    // Arrange
    const implementation = () => {
      throw new Error('test error');
    };
    const spy = createSpy(implementation);

    // Act & Assert
    expect(() => spy()).toThrow('test error');
    expect(spy.calls).toHaveLength(1);
    expect(spy.calls[0].error).toBeInstanceOf(Error);
  });

  // Test case 10: Multiple spies are independent
  it('10. should maintain independent state for multiple spies', () => {
    // Arrange
    const spy1 = createSpy();
    const spy2 = createSpy();

    // Act
    spy1('call1');
    spy2('call2');

    // Assert
    expect(spy1.calls).toHaveLength(1);
    expect(spy2.calls).toHaveLength(1);
    expect(spy1.calls[0].args).toEqual(['call1']);
    expect(spy2.calls[0].args).toEqual(['call2']);
  });

  // Test case 11: Reset after multiple calls
  it('11. should reset and start fresh count', () => {
    // Arrange
    const spy = createSpy();
    spy(1);
    spy(2);
    spy(3);

    // Act
    spy.reset();
    spy(4);

    // Assert
    expect(spy.callCount).toBe(1);
    expect(spy.calls[0].args).toEqual([4]);
  });
});
