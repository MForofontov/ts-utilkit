import { hexToRgb } from '../src/hexToRgb';

describe('hexToRgb', () => {
  // Test case 1: Convert hex with hash prefix
  it('1. should convert hex with hash prefix', () => {
    expect(hexToRgb('#ff5733')).toEqual({ r: 255, g: 87, b: 51 });
  });

  // Test case 2: Convert hex without hash
  it('2. should convert hex without hash', () => {
    expect(hexToRgb('ff5733')).toEqual({ r: 255, g: 87, b: 51 });
  });

  // Test case 3: Convert black hex value
  it('3. should convert black hex value', () => {
    expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
  });

  // Test case 4: Convert mixed hex value
  it('4. should convert mixed hex value', () => {
    expect(hexToRgb('#00ff0f')).toEqual({ r: 0, g: 255, b: 15 });
  });

  // Test case 5: Convert uppercase hex value
  it('5. should convert uppercase hex value', () => {
    expect(hexToRgb('#ABCDEF')).toEqual({ r: 171, g: 205, b: 239 });
  });

  // Test case 6: Return null for invalid hex
  it('6. should return null for invalid hex', () => {
    expect(hexToRgb('#123')).toBeNull();
  });

  // Test case 7: Return null for invalid hex characters
  it('7. should return null for invalid hex characters', () => {
    expect(hexToRgb('#zzzzzz')).toBeNull();
  });

  // Test case 8: Return null for hex string longer than 6 digits
  it('8. should return null for hex string longer than 6 digits', () => {
    expect(hexToRgb('#1234567')).toBeNull();
  });
});
