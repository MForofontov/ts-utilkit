import { parseLogLine } from '../src/parseLogLine';

/**
 * Unit tests for the parseLogLine function.
 */
describe('parseLogLine', () => {
  // Test case 1: Parse common log format
  it('1. should parse common log format', () => {
    // Arrange
    const input =
      '127.0.0.1 - frank [10/Oct/2000:13:55:36 -0700] "GET /apache_pb.gif HTTP/1.0" 200 2326';
    const expected = {
      ip: '127.0.0.1',
      identity: '-',
      user: 'frank',
      timestamp: '10/Oct/2000:13:55:36 -0700',
      method: 'GET',
      path: '/apache_pb.gif',
      protocol: 'HTTP/1.0',
      status: 200,
      size: 2326,
    };

    // Act
    const result = parseLogLine(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 2: Parse combined log format
  it('2. should parse combined log format', () => {
    // Arrange
    const input =
      '127.0.0.1 - - [10/Oct/2000:13:55:36 -0700] "GET / HTTP/1.0" 200 2326 "http://example.com" "Mozilla/5.0"';
    const expected = {
      ip: '127.0.0.1',
      identity: '-',
      user: '-',
      timestamp: '10/Oct/2000:13:55:36 -0700',
      method: 'GET',
      path: '/',
      protocol: 'HTTP/1.0',
      status: 200,
      size: 2326,
      referer: 'http://example.com',
      userAgent: 'Mozilla/5.0',
    };

    // Act
    const result = parseLogLine(input, 'combined');

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 3: Parse with POST method
  it('3. should parse POST request', () => {
    // Arrange
    const input =
      '192.168.1.1 - user [01/Jan/2000:12:00:00 +0000] "POST /api/data HTTP/1.1" 201 512';
    const expected = {
      ip: '192.168.1.1',
      identity: '-',
      user: 'user',
      timestamp: '01/Jan/2000:12:00:00 +0000',
      method: 'POST',
      path: '/api/data',
      protocol: 'HTTP/1.1',
      status: 201,
      size: 512,
    };

    // Act
    const result = parseLogLine(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 4: Parse with size as dash
  it('4. should parse with size as dash (0 bytes)', () => {
    // Arrange
    const input =
      '10.0.0.1 - - [15/Jun/2024:10:30:45 +0000] "GET /404 HTTP/1.1" 404 -';
    const expected = {
      ip: '10.0.0.1',
      identity: '-',
      user: '-',
      timestamp: '15/Jun/2024:10:30:45 +0000',
      method: 'GET',
      path: '/404',
      protocol: 'HTTP/1.1',
      status: 404,
      size: 0,
    };

    // Act
    const result = parseLogLine(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 5: Parse with empty referer in combined format
  it('5. should handle empty referer in combined format', () => {
    // Arrange
    const input =
      '127.0.0.1 - - [10/Oct/2000:13:55:36 -0700] "GET / HTTP/1.0" 200 2326 "-" "Mozilla/5.0"';
    const expected = {
      ip: '127.0.0.1',
      identity: '-',
      user: '-',
      timestamp: '10/Oct/2000:13:55:36 -0700',
      method: 'GET',
      path: '/',
      protocol: 'HTTP/1.0',
      status: 200,
      size: 2326,
      referer: '-',
      userAgent: 'Mozilla/5.0',
    };

    // Act
    const result = parseLogLine(input, 'combined');

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 6: Parse with query parameters
  it('6. should parse path with query parameters', () => {
    // Arrange
    const input =
      '127.0.0.1 - - [10/Oct/2000:13:55:36 -0700] "GET /search?q=test&page=1 HTTP/1.1" 200 1024';
    const expected = {
      ip: '127.0.0.1',
      identity: '-',
      user: '-',
      timestamp: '10/Oct/2000:13:55:36 -0700',
      method: 'GET',
      path: '/search?q=test&page=1',
      protocol: 'HTTP/1.1',
      status: 200,
      size: 1024,
    };

    // Act
    const result = parseLogLine(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 7: Throw TypeError for non-string input
  it('7. should throw TypeError when logLine is not a string', () => {
    // Arrange
    const input = 123 as unknown as string;

    // Act & Assert
    expect(() => parseLogLine(input)).toThrow(TypeError);
    expect(() => parseLogLine(input)).toThrow('logLine must be a string');
  });

  // Test case 8: Throw Error for empty input
  it('8. should throw Error when logLine is empty', () => {
    // Arrange
    const input = '';

    // Act & Assert
    expect(() => parseLogLine(input)).toThrow(Error);
    expect(() => parseLogLine(input)).toThrow('logLine cannot be empty');
  });

  // Test case 9: Throw Error for invalid format
  it('9. should throw Error for invalid log format', () => {
    // Arrange
    const input = 'invalid log line';

    // Act & Assert
    expect(() => parseLogLine(input)).toThrow(Error);
    expect(() => parseLogLine(input)).toThrow("doesn't match");
  });

  // Test case 10: Throw Error for invalid format type
  it('10. should throw Error for invalid format type', () => {
    // Arrange
    const input =
      '127.0.0.1 - - [10/Oct/2000:13:55:36 -0700] "GET / HTTP/1.0" 200 2326';
    const format = 'invalid' as 'common';

    // Act & Assert
    expect(() => parseLogLine(input, format)).toThrow(Error);
    expect(() => parseLogLine(input, format)).toThrow('Invalid format');
  });
});
