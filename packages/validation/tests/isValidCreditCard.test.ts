import { isValidCreditCard } from '../src/isValidCreditCard';

/**
 * Unit tests for the isValidCreditCard function.
 */
describe('isValidCreditCard', () => {
  // Test case 1: Valid Visa card numbers
  it('1. should return true for valid Visa card numbers', () => {
    // Arrange & Act & Assert
    expect(isValidCreditCard('4532015112830366')).toBe(true); // 16 digits
    expect(isValidCreditCard('4556737586899855')).toBe(true);
    expect(isValidCreditCard('4532015112830')).toBe(true); // 13 digits
  });

  // Test case 2: Valid Mastercard numbers
  it('2. should return true for valid Mastercard numbers', () => {
    // Arrange & Act & Assert
    expect(isValidCreditCard('5425233430109903')).toBe(true);
    expect(isValidCreditCard('5555555555554444')).toBe(true);
    expect(isValidCreditCard('5105105105105100')).toBe(true);
  });

  // Test case 3: Valid American Express numbers
  it('3. should return true for valid American Express numbers', () => {
    // Arrange & Act & Assert
    expect(isValidCreditCard('374245455400126')).toBe(true); // 15 digits
    expect(isValidCreditCard('378282246310005')).toBe(true);
  });

  // Test case 4: Valid Discover card numbers
  it('4. should return true for valid Discover card numbers', () => {
    // Arrange & Act & Assert
    expect(isValidCreditCard('6011111111111117')).toBe(true);
    expect(isValidCreditCard('6011000990139424')).toBe(true);
  });

  // Test case 5: Valid with spaces
  it('5. should accept card numbers with spaces', () => {
    // Arrange & Act & Assert
    expect(isValidCreditCard('4532 0151 1283 0366')).toBe(true);
    expect(isValidCreditCard('5425 2334 3010 9903')).toBe(true);
    expect(isValidCreditCard('3742 454554 00126')).toBe(true);
  });

  // Test case 6: Valid with hyphens
  it('6. should accept card numbers with hyphens', () => {
    // Arrange & Act & Assert
    expect(isValidCreditCard('4532-0151-1283-0366')).toBe(true);
    expect(isValidCreditCard('5425-2334-3010-9903')).toBe(true);
  });

  // Test case 7: Invalid - fails Luhn algorithm
  it('7. should return false for numbers that fail Luhn check', () => {
    // Arrange & Act & Assert
    expect(isValidCreditCard('1234567890123456')).toBe(false);
    expect(isValidCreditCard('4532015112830367')).toBe(false); // Wrong last digit
    expect(isValidCreditCard('5425233430109904')).toBe(false);
  });

  // Test case 8: Invalid - too short
  it('8. should return false for too short numbers', () => {
    // Arrange & Act & Assert
    expect(isValidCreditCard('123')).toBe(false);
    expect(isValidCreditCard('123456789012')).toBe(false); // 12 digits
  });

  // Test case 9: Invalid - too long
  it('9. should return false for too long numbers', () => {
    // Arrange & Act & Assert
    expect(isValidCreditCard('12345678901234567890')).toBe(false); // 20 digits
    expect(isValidCreditCard('123456789012345678901')).toBe(false);
  });

  // Test case 10: Invalid - contains letters
  it('10. should return false for numbers containing letters', () => {
    // Arrange & Act & Assert
    expect(isValidCreditCard('4532A15112830366')).toBe(false);
    expect(isValidCreditCard('ABCD1234EFGH5678')).toBe(false);
  });

  // Test case 11: Invalid - special characters
  it('11. should return false for numbers with special characters', () => {
    // Arrange & Act & Assert
    expect(isValidCreditCard('4532@0151#1283$0366')).toBe(false);
    expect(isValidCreditCard('5425.2334.3010.9903')).toBe(false);
  });

  // Test case 12: Invalid - empty string
  it('12. should return false for empty string', () => {
    // Arrange
    const cardNumber = '';

    // Act
    const result = isValidCreditCard(cardNumber);

    // Assert
    expect(result).toBe(false);
  });

  // Test case 13: Valid JCB card numbers
  it('13. should return true for valid JCB card numbers', () => {
    // Arrange & Act & Assert
    expect(isValidCreditCard('3530111333300000')).toBe(true);
    expect(isValidCreditCard('3566002020360505')).toBe(true);
  });

  // Test case 14: Valid Diners Club numbers
  it('14. should return true for valid Diners Club numbers', () => {
    // Arrange & Act & Assert
    expect(isValidCreditCard('30569309025904')).toBe(true); // 14 digits
    expect(isValidCreditCard('38520000023237')).toBe(true);
  });

  // Test case 15: Valid 19-digit card numbers
  it('15. should return true for valid 19-digit card numbers', () => {
    // Arrange
    // 6304000000000000000 has valid Luhn checksum (19 digits)
    const cardNumber = '6304000000000000000';

    // Act
    const result = isValidCreditCard(cardNumber);

    // Assert
    expect(result).toBe(true);
  });

  // Test case 16: Mixed spaces and hyphens
  it('16. should handle mixed spaces and hyphens', () => {
    // Arrange & Act & Assert
    expect(isValidCreditCard('4532 0151-1283 0366')).toBe(true);
  });

  // Test case 17: All zeros (actually passes Luhn but invalid in practice)
  it('17. should return true for all zeros (valid Luhn checksum)', () => {
    // Arrange & Act & Assert
    // Note: 0000000000000000 technically passes Luhn (sum=0, 0%10=0)
    // but would be rejected by payment processors
    expect(isValidCreditCard('0000000000000000')).toBe(true);
  });

  // Test case 18: Throw TypeError when cardNumber is not a string
  it('18. should throw TypeError when cardNumber is not a string', () => {
    // Arrange
    const invalidInput = 4532015112830366 as unknown as string;
    const expectedMessage = 'cardNumber must be a string, got number';

    // Act & Assert
    expect(() => isValidCreditCard(invalidInput)).toThrow(TypeError);
    expect(() => isValidCreditCard(invalidInput)).toThrow(expectedMessage);
  });
});
