import { isValidEmail } from '../src/isValidEmail';

/**
 * Unit tests for the isValidEmail function.
 */
describe('isValidEmail', () => {
  // Test case 1: Check if a valid email address returns true
  it('1. should return true for a valid email address', () => {
    const email: string = 'test@example.com';
    const expected: boolean = true;
    const result: boolean = isValidEmail(email);
    expect(result).toBe(expected);
  });

  // Test case 2: Check if an email address without "@" returns false
  it('2. should return false for an email address without "@"', () => {
    const email: string = 'testexample.com';
    const expected: boolean = false;
    const result: boolean = isValidEmail(email);
    expect(result).toBe(expected);
  });

  // Test case 3: Check if an email address without domain returns false
  it('3. should return false for an email address without domain', () => {
    const email: string = 'test@';
    const expected: boolean = false;
    const result: boolean = isValidEmail(email);
    expect(result).toBe(expected);
  });

  // Test case 4: Check if an email address without username returns false
  it('4. should return false for an email address without username', () => {
    const email: string = '@example.com';
    const expected: boolean = false;
    const result: boolean = isValidEmail(email);
    expect(result).toBe(expected);
  });

  // Test case 5: Check if an email address with spaces returns false
  it('5. should return false for an email address with spaces', () => {
    const email: string = 'test @example.com';
    const expected: boolean = false;
    const result: boolean = isValidEmail(email);
    expect(result).toBe(expected);
  });

  // Test case 6: Check if an email address with special characters in domain returns false
  it('6. should return false for an email address with special characters in domain', () => {
    const email: string = 'test@exa!mple.com';
    const expected: boolean = false;
    const result: boolean = isValidEmail(email);
    expect(result).toBe(expected);
  });

  // Test case 7: Check if an email address with special characters in username returns true
  it('7. should return true for an email address with special characters in username', () => {
    const email: string = 'test+123@example.com';
    const expected: boolean = true;
    const result: boolean = isValidEmail(email);
    expect(result).toBe(expected);
  });

  // Test case 8: Check if an email address with subdomain returns true
  it('8. should return true for an email address with subdomain', () => {
    const email: string = 'test@mail.example.com';
    const expected: boolean = true;
    const result: boolean = isValidEmail(email);
    expect(result).toBe(expected);
  });

  // Test case 9: Check if an email address with numeric domain returns true
  it('9. should return true for an email address with numeric domain', () => {
    const email: string = 'test@123.com';
    const expected: boolean = true;
    const result: boolean = isValidEmail(email);
    expect(result).toBe(expected);
  });

  // Test case 10: Check if an email address with numeric username returns true
  it('10. should return true for an email address with numeric username', () => {
    const email: string = '123@example.com';
    const expected: boolean = true;
    const result: boolean = isValidEmail(email);
    expect(result).toBe(expected);
  });

  // Test case 11: Check if an email address with hyphen in domain returns true
  it('11. should return true for an email address with hyphen in domain', () => {
    const email: string = 'test@example-domain.com';
    const expected: boolean = true;
    const result: boolean = isValidEmail(email);
    expect(result).toBe(expected);
  });

  // Test case 12: Check if an email address with underscore in username returns true
  it('12. should return true for an email address with underscore in username', () => {
    const email: string = 'test_user@example.com';
    const expected: boolean = true;
    const result: boolean = isValidEmail(email);
    expect(result).toBe(expected);
  });

  // Test case 13: Check if an email address with multiple dots in domain returns true
  it('13. should return true for an email address with multiple dots in domain', () => {
    const email: string = 'test@example.co.uk';
    const expected: boolean = true;
    const result: boolean = isValidEmail(email);
    expect(result).toBe(expected);
  });

  // Test case 14: Check if an email address with multiple dots in username returns true
  it('14. should return true for an email address with multiple dots in username', () => {
    const email: string = 'test.user@example.com';
    const expected: boolean = true;
    const result: boolean = isValidEmail(email);
    expect(result).toBe(expected);
  });

  // Test case 15: Check if an email address with a long domain returns true
  it('15. should return true for an email address with a long domain', () => {
    const email: string = 'test@subdomain.example.com';
    const expected: boolean = true;
    const result: boolean = isValidEmail(email);
    expect(result).toBe(expected);
  });
});
