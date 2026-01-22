import { generateRandomEmail } from '../src/generateRandomEmail';

/**
 * Unit tests for the generateRandomEmail function.
 */
describe('generateRandomEmail', () => {
  // Test case 1: Generate email with default domain
  it('1. should generate email with random domain', () => {
    // Act
    const result = generateRandomEmail();

    // Assert
    expect(result).toMatch(/^[a-z0-9]+@(gmail|yahoo|outlook|example)\.com$/);
    expect(result.includes('@')).toBe(true);
  });

  // Test case 2: Generate email with custom domain
  it('2. should generate email with custom domain', () => {
    // Arrange
    const domain = 'test.com';

    // Act
    const result = generateRandomEmail(domain);

    // Assert
    expect(result).toContain(`@${domain}`);
    expect(result.endsWith(`@${domain}`)).toBe(true);
  });

  // Test case 3: Generated emails are different
  it('3. should generate different emails on each call', () => {
    // Act
    const email1 = generateRandomEmail();
    const email2 = generateRandomEmail();

    // Assert
    expect(email1).not.toBe(email2);
  });

  // Test case 4: Email format is valid
  it('4. should generate valid email format', () => {
    // Act
    const result = generateRandomEmail();

    // Assert
    expect(result).toMatch(/^[a-z0-9]+@[a-z.]+$/);
    const parts = result.split('@');
    expect(parts).toHaveLength(2);
    expect(parts[0].length).toBeGreaterThan(0);
    expect(parts[1].length).toBeGreaterThan(0);
  });

  // Test case 5: Custom domain with subdomain
  it('5. should work with subdomain in custom domain', () => {
    // Arrange
    const domain = 'mail.company.org';

    // Act
    const result = generateRandomEmail(domain);

    // Assert
    expect(result).toContain(`@${domain}`);
  });
});
