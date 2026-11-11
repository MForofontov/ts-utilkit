import { decodeBase32 } from '../src/decodeBase32';
import { decodeBase64 } from '../src/decodeBase64';
import { decodeBase64URL } from '../src/decodeBase64URL';

describe('canonical encoding boundaries', () => {
  it.each(['A', 'AAA', 'AAAAAA', '=', 'MY=', 'MY======='])(
    '1. rejects invalid Base32 length or padding: %s',
    (input) => {
      expect(() => decodeBase32(input)).toThrow('Invalid Base32 string');
    },
  );

  it.each(['=', 'Zg=', 'Zm8==', 'Zm9v=', 'Zg===', 'Zh'])(
    '2. rejects noncanonical Base64 padding: %s',
    (input) => {
      expect(() => decodeBase64(input)).toThrow('Invalid base64 string');
      expect(() => decodeBase64URL(input)).toThrow('Invalid Base64URL string');
    },
  );
});
