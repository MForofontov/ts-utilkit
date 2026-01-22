import { generateRandomDate } from '../src/generateRandomDate';

/**
 * Unit tests for the generateRandomDate function.
 */
describe('generateRandomDate', () => {
  // Test case 1: Generate date with defaults
  it('1. should generate date between 2000 and now by default', () => {
    // Arrange
    const minDate = new Date('2000-01-01');
    const maxDate = new Date();

    // Act
    const result = generateRandomDate();

    // Assert
    expect(result).toBeInstanceOf(Date);
    expect(result.getTime()).toBeGreaterThanOrEqual(minDate.getTime());
    expect(result.getTime()).toBeLessThanOrEqual(maxDate.getTime());
  });

  // Test case 2: Generate date in custom range
  it('2. should generate date within custom range', () => {
    // Arrange
    const start = new Date('2020-01-01');
    const end = new Date('2021-01-01');

    // Act
    const result = generateRandomDate(start, end);

    // Assert
    expect(result.getTime()).toBeGreaterThanOrEqual(start.getTime());
    expect(result.getTime()).toBeLessThanOrEqual(end.getTime());
  });

  // Test case 3: Different calls produce different dates
  it('3. should generate different dates on different calls', () => {
    // Arrange
    const start = new Date('2020-01-01');
    const end = new Date('2023-12-31');

    // Act
    const dates = Array.from({ length: 10 }, () =>
      generateRandomDate(start, end),
    );

    // Assert
    const uniqueDates = new Set(dates.map((d) => d.getTime()));
    expect(uniqueDates.size).toBeGreaterThan(1);
  });

  // Test case 4: Future date range
  it('4. should generate future dates', () => {
    // Arrange
    const start = new Date();
    const end = new Date('2030-12-31');

    // Act
    const result = generateRandomDate(start, end);

    // Assert
    expect(result.getTime()).toBeGreaterThanOrEqual(start.getTime());
    expect(result.getTime()).toBeLessThanOrEqual(end.getTime());
  });

  // Test case 5: Same start and end date
  it('5. should return date equal to start/end when they are the same', () => {
    // Arrange
    const date = new Date('2023-06-15');

    // Act
    const result = generateRandomDate(date, date);

    // Assert
    expect(result.getTime()).toBe(date.getTime());
  });

  // Test case 6: Returns Date object
  it('6. should return a valid Date object', () => {
    // Act
    const result = generateRandomDate();

    // Assert
    expect(result).toBeInstanceOf(Date);
    expect(Number.isNaN(result.getTime())).toBe(false);
  });
});
