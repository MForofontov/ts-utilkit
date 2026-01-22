import { bytesToSize } from '../src/bytesToSize';

/**
 * Unit tests for the bytesToSize function.
 */
describe('bytesToSize', () => {
  // Test case 1: Zero bytes
  it('1. should return "0 Bytes" for zero input', () => {
    expect(bytesToSize(0)).toBe('0 Bytes');
    expect(bytesToSize(0, true)).toBe('0 Bytes');
    expect(bytesToSize(0, false)).toBe('0 Bytes');
  });

  // Test case 2: Small byte values (under 1 KB/KiB)
  it('2. should format byte values smaller than 1 KB/KiB', () => {
    expect(bytesToSize(512)).toBe('512.00 Bytes');
    expect(bytesToSize(512, true)).toBe('512.00 Bytes');
    expect(bytesToSize(512, false)).toBe('512.00 Bytes');
    expect(bytesToSize(1023)).toBe('1023.00 Bytes');
  });

  // Test case 3: Binary system (base 1024) - KiB
  it('3. should convert to KiB using binary system', () => {
    expect(bytesToSize(1024)).toBe('1.00 KiB');
    expect(bytesToSize(1024, true)).toBe('1.00 KiB');
    expect(bytesToSize(1536, true)).toBe('1.50 KiB');
    expect(bytesToSize(2048, true)).toBe('2.00 KiB');
  });

  // Test case 4: Binary system - MiB
  it('4. should convert to MiB using binary system', () => {
    expect(bytesToSize(1048576)).toBe('1.00 MiB');
    expect(bytesToSize(1048576, true)).toBe('1.00 MiB');
    expect(bytesToSize(5242880, true)).toBe('5.00 MiB');
    expect(bytesToSize(1572864, true)).toBe('1.50 MiB');
  });

  // Test case 5: Binary system - GiB
  it('5. should convert to GiB using binary system', () => {
    expect(bytesToSize(1073741824)).toBe('1.00 GiB');
    expect(bytesToSize(1073741824, true)).toBe('1.00 GiB');
    expect(bytesToSize(5368709120, true)).toBe('5.00 GiB');
  });

  // Test case 6: Binary system - TiB
  it('6. should convert to TiB using binary system', () => {
    expect(bytesToSize(1099511627776, true)).toBe('1.00 TiB');
    expect(bytesToSize(2199023255552, true)).toBe('2.00 TiB');
  });

  // Test case 7: Binary system - PiB
  it('7. should convert to PiB using binary system', () => {
    expect(bytesToSize(1125899906842624, true)).toBe('1.00 PiB');
    expect(bytesToSize(2251799813685248, true)).toBe('2.00 PiB');
  });

  // Test case 8: Binary system - EiB
  it('8. should convert to EiB using binary system', () => {
    expect(bytesToSize(1152921504606846976, true)).toBe('1.00 EiB');
  });

  // Test case 9: Binary system - ZiB
  it('9. should convert to ZiB using binary system', () => {
    expect(bytesToSize(1180591620717411303424, true)).toBe('1.00 ZiB');
  });

  // Test case 10: Binary system - YiB (largest unit)
  it('10. should convert to YiB using binary system', () => {
    expect(bytesToSize(1208925819614629174706176, true)).toBe('1.00 YiB');
  });

  // Test case 11: Decimal system (base 1000) - KB
  it('11. should convert to KB using decimal system', () => {
    expect(bytesToSize(1000, false)).toBe('1.00 KB');
    expect(bytesToSize(1500, false)).toBe('1.50 KB');
    expect(bytesToSize(2000, false)).toBe('2.00 KB');
  });

  // Test case 12: Decimal system - MB
  it('12. should convert to MB using decimal system', () => {
    expect(bytesToSize(1000000, false)).toBe('1.00 MB');
    expect(bytesToSize(5000000, false)).toBe('5.00 MB');
    expect(bytesToSize(1500000, false)).toBe('1.50 MB');
  });

  // Test case 13: Decimal system - GB
  it('13. should convert to GB using decimal system', () => {
    expect(bytesToSize(1000000000, false)).toBe('1.00 GB');
    expect(bytesToSize(5000000000, false)).toBe('5.00 GB');
  });

  // Test case 14: Decimal system - TB
  it('14. should convert to TB using decimal system', () => {
    expect(bytesToSize(1000000000000, false)).toBe('1.00 TB');
    expect(bytesToSize(2000000000000, false)).toBe('2.00 TB');
  });

  // Test case 15: Decimal system - PB
  it('15. should convert to PB using decimal system', () => {
    expect(bytesToSize(1000000000000000, false)).toBe('1.00 PB');
    expect(bytesToSize(2000000000000000, false)).toBe('2.00 PB');
  });

  // Test case 16: Decimal system - EB
  it('16. should convert to EB using decimal system', () => {
    expect(bytesToSize(1000000000000000000, false)).toBe('1.00 EB');
  });

  // Test case 17: Decimal system - ZB
  it('17. should convert to ZB using decimal system', () => {
    expect(bytesToSize(1000000000000000000000, false)).toBe('1.00 ZB');
  });

  // Test case 18: Decimal system - YB (largest unit)
  it('18. should convert to YB using decimal system', () => {
    expect(bytesToSize(1000000000000000000000000, false)).toBe('1.00 YB');
  });

  // Test case 19: Comparison between binary and decimal systems
  it('19. should show difference between binary and decimal systems', () => {
    // Same input, different outputs
    expect(bytesToSize(1536, true)).toBe('1.50 KiB');
    expect(bytesToSize(1536, false)).toBe('1.54 KB');

    expect(bytesToSize(5242880, true)).toBe('5.00 MiB');
    expect(bytesToSize(5242880, false)).toBe('5.24 MB');
  });

  // Test case 20: Values beyond largest unit should use YiB/YB
  it('20. should handle values larger than largest unit', () => {
    // Extremely large values should still use the largest unit
    const hugeValue = 1208925819614629174706176 * 10; // 10 YiB
    expect(bytesToSize(hugeValue, true)).toBe('10.00 YiB');

    const hugeDecimal = 1000000000000000000000000 * 10; // 10 YB
    expect(bytesToSize(hugeDecimal, false)).toBe('10.00 YB');
  });

  // Test case 21: Fractional results are formatted to 2 decimals
  it('21. should format results to 2 decimal places', () => {
    expect(bytesToSize(1536, true)).toBe('1.50 KiB');
    expect(bytesToSize(1234567, true)).toBe('1.18 MiB');
    expect(bytesToSize(9876543210, true)).toBe('9.20 GiB');
  });

  // Test case 22: Real-world file sizes (binary)
  it('22. should handle typical file sizes with binary system', () => {
    expect(bytesToSize(2560000, true)).toBe('2.44 MiB'); // ~2.5 MB file
    expect(bytesToSize(4700000000, true)).toBe('4.38 GiB'); // DVD size
    expect(bytesToSize(8589934592, true)).toBe('8.00 GiB'); // 8GB RAM
  });

  // Test case 23: Real-world file sizes (decimal)
  it('23. should handle typical file sizes with decimal system', () => {
    expect(bytesToSize(2560000, false)).toBe('2.56 MB');
    expect(bytesToSize(4700000000, false)).toBe('4.70 GB'); // DVD size
    expect(bytesToSize(8589934592, false)).toBe('8.59 GB');
  });

  // Test case 24: Edge case - very small non-zero values
  it('24. should handle very small byte values', () => {
    expect(bytesToSize(1)).toBe('1.00 Bytes');
    expect(bytesToSize(10)).toBe('10.00 Bytes');
    expect(bytesToSize(100)).toBe('100.00 Bytes');
  });

  // Test case 25: Edge case - values just below unit boundaries
  it('25. should handle values just below unit boundaries', () => {
    expect(bytesToSize(1023, true)).toBe('1023.00 Bytes');
    expect(bytesToSize(1048575, true)).toBe('1024.00 KiB');
    expect(bytesToSize(1073741823, true)).toBe('1024.00 MiB');

    expect(bytesToSize(999, false)).toBe('999.00 Bytes');
    expect(bytesToSize(999999, false)).toBe('1000.00 KB');
    expect(bytesToSize(999999999, false)).toBe('1000.00 MB');
  });

  // Test case 26: Performance test with large numbers
  it('26. should handle large values efficiently', () => {
    const startTime = performance.now();

    for (let i = 0; i < 5000; i++) {
      bytesToSize(Math.random() * 1e15, true);
      bytesToSize(Math.random() * 1e15, false);
    }

    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThan(250); // Should complete within 250ms (10,000 operations)
  });

  // Test case 27: Should throw TypeError for invalid bytes type
  it('27. should throw TypeError when bytes is not a number', () => {
    const invalidInputs = ['1024', null, undefined, {}, [], true];

    invalidInputs.forEach((input) => {
      expect(() => bytesToSize(input as unknown as number)).toThrow(TypeError);
      expect(() => bytesToSize(input as unknown as number)).toThrow(
        'bytes must be a number, got',
      );
    });
  });

  // Test case 28: Should throw Error for NaN
  it('28. should throw Error when bytes is NaN', () => {
    expect(() => bytesToSize(NaN)).toThrow(Error);
    expect(() => bytesToSize(NaN)).toThrow(
      'bytes must be a valid number, not NaN',
    );
  });

  // Test case 29: Should throw Error for negative values
  it('29. should throw Error when bytes is negative', () => {
    expect(() => bytesToSize(-1)).toThrow(Error);
    expect(() => bytesToSize(-1)).toThrow('bytes must be non-negative, got -1');
    expect(() => bytesToSize(-1024)).toThrow(Error);
    expect(() => bytesToSize(-1024)).toThrow(
      'bytes must be non-negative, got -1024',
    );
  });

  // Test case 30: Should throw TypeError for invalid binary parameter
  it('30. should throw TypeError when binary is not a boolean', () => {
    // Note: undefined is excluded as it's a valid value (optional parameter)
    const invalidInputs = [1, 'true', null, {}, []];

    invalidInputs.forEach((input) => {
      expect(() => bytesToSize(1024, input as unknown as boolean)).toThrow(
        TypeError,
      );
      expect(() => bytesToSize(1024, input as unknown as boolean)).toThrow(
        'binary must be a boolean, got',
      );
    });
  });
});
