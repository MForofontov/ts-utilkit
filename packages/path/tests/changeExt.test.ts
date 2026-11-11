import { changeExt } from '../src/changeExt';

describe('changeExt', () => {
  it('1. should replace an existing extension', () => {
    expect(changeExt('photo.jpg', '.png')).toBe('photo.png');
  });

  it('2. should append an extension when none exists', () => {
    expect(changeExt('archive', 'tar')).toBe('archive.tar');
  });

  it('3. should accept extensions without a leading dot', () => {
    expect(changeExt('a.txt', 'md')).toBe('a.md');
  });
});
