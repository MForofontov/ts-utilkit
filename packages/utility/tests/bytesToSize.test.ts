import { bytesToSize } from '../src/bytesToSize';

describe('bytesToSize', () => {
  // Binary mode (default)
  it('1. should format bytes in binary mode by default', () => {
    expect(bytesToSize(1024)).toBe('1.00 KiB');
  });
  it('2. should format megabytes in binary mode', () => {
    expect(bytesToSize(1048576)).toBe('1.00 MiB');
  });
  it('3. should format 0 bytes', () => {
    expect(bytesToSize(0)).toBe('0 Bytes');
  });
  // Decimal mode
  it('4. should format bytes in decimal mode', () => {
    expect(bytesToSize(1000, false)).toBe('1.00 KB');
  });
  it('5. should format megabytes in decimal mode', () => {
    expect(bytesToSize(1000000, false)).toBe('1.00 MB');
  });
  // Error cases
  it('6. should throw TypeError when bytes is not a number', () => {
    expect(() => bytesToSize('1024' as unknown as number)).toThrow(TypeError);
    expect(() => bytesToSize('1024' as unknown as number)).toThrow('bytes must be a number, got string');
  });
  it('7. should throw Error when bytes is NaN', () => {
    expect(() => bytesToSize(NaN)).toThrow(Error);
    expect(() => bytesToSize(NaN)).toThrow('bytes must be a valid number, not NaN');
  });
  it('8. should throw Error when bytes is negative', () => {
    expect(() => bytesToSize(-1)).toThrow(Error);
    expect(() => bytesToSize(-1)).toThrow('bytes must be non-negative');
  });
  it('9. should throw TypeError when binary is not a boolean', () => {
    expect(() => bytesToSize(1024, 'true' as unknown as boolean)).toThrow(TypeError);
    expect(() => bytesToSize(1024, 'true' as unknown as boolean)).toThrow('binary must be a boolean, got string');
  });
});
