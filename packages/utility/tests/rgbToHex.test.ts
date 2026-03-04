import { rgbToHex } from '../src/rgbToHex';

/**
 * Unit tests for the rgbToHex function.
 */
describe('rgbToHex', () => {
  // Test case 1: Convert a standard RGB colour
  it('1. should convert {255, 87, 51} to #ff5733', () => {
    expect(rgbToHex({ r: 255, g: 87, b: 51 })).toBe('#ff5733');
  });

  // Test case 2: Convert black
  it('2. should convert {0, 0, 0} to #000000', () => {
    expect(rgbToHex({ r: 0, g: 0, b: 0 })).toBe('#000000');
  });

  // Test case 3: Preserve zero-padded bytes
  it('3. should convert {1, 2, 3} to #010203', () => {
    expect(rgbToHex({ r: 1, g: 2, b: 3 })).toBe('#010203');
  });

  // Test case 4: Handle mid-range component values
  it('4. should convert {16, 32, 48} to #102030', () => {
    expect(rgbToHex({ r: 16, g: 32, b: 48 })).toBe('#102030');
  });

  // Test case 5: Convert white
  it('5. should convert {255, 255, 255} to #ffffff', () => {
    expect(rgbToHex({ r: 255, g: 255, b: 255 })).toBe('#ffffff');
  });

  // Test case 6: Clamp negative component values
  it('6. should clamp negative channel values to zero', () => {
    expect(rgbToHex({ r: -1, g: -20, b: -300 })).toBe('#000000');
  });

  // Test case 7: Clamp values above 255
  it('7. should clamp channel values above 255 to 255', () => {
    expect(rgbToHex({ r: 256, g: 300, b: 999 })).toBe('#ffffff');
  });

  // Test case 8: Round fractional channel values
  it('8. should round fractional channel values before conversion', () => {
    expect(rgbToHex({ r: 10.4, g: 20.5, b: 30.6 })).toBe('#0a151f');
  });

  // Test case 9: Document behaviour when channels are missing
  it('9. should return #ffNaNNaN when green and blue channels are missing', () => {
    const incomplete = { r: 255 } as unknown as {
      r: number;
      g: number;
      b: number;
    };
    expect(rgbToHex(incomplete)).toBe('#ffNaNNaN');
  });

  // Test case 10: Document behaviour for NaN channels
  it('10. should return #ffNaN00 when a channel is NaN', () => {
    expect(rgbToHex({ r: 255, g: Number.NaN, b: 0 })).toBe('#ffNaN00');
  });
});
