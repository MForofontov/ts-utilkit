import { extractLinks } from '../src/extractLinks';
import { extractImages } from '../src/extractImages';

describe('scraped URL resolution', () => {
  it('1. resolves references against a page URL using URL semantics', () => {
    const base = 'https://example.com/articles/page.html';
    expect(
      extractLinks(
        '<a href="../about">A</a><a href="/root">B</a><a href="//cdn.example.com/x">C</a>',
        base,
      ),
    ).toEqual([
      'https://example.com/about',
      'https://example.com/root',
      'https://cdn.example.com/x',
    ]);
    expect(
      extractImages(
        '<img src="../a.png"><img src="/b.png"><img src="//cdn.example.com/c.png">',
        base,
      ),
    ).toEqual([
      'https://example.com/a.png',
      'https://example.com/b.png',
      'https://cdn.example.com/c.png',
    ]);
  });

  it('2. preserves absolute non-HTTP schemes and invalid-base fallback', () => {
    expect(
      extractLinks(
        '<a href="mailto:a@example.com">A</a>',
        'https://example.com',
      ),
    ).toEqual(['mailto:a@example.com']);
    expect(extractLinks('<a href="relative">A</a>', 'invalid')).toEqual([
      'relative',
    ]);
    expect(extractImages('<img src="relative">', 'invalid')).toEqual([
      'relative',
    ]);
  });
});
