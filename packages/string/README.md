# @ts-utilkit/string

Version: [0.2.2](https://www.npmjs.com/package/@ts-utilkit/string/v/0.2.2). Requires Node.js 20 or later.

string Functions - TypeScript utility functions for string operations.

## Installation

```bash
npm install @ts-utilkit/string
```

## Features

- 🚀 TypeScript-first with complete type definitions
- ✅ Repository tests with >95% global coverage
- 📦 CommonJS builds with import and require entry points
- 🔒 Type-safe with strict TypeScript configuration
- 📖 Extensive JSDoc documentation

## Available Functions (59)

- **`areAnagrams`** - Check if two strings are anagrams
- **`capitalizeEachWord`** - Capitalize first letter of each word
- **`capitalizeFirstLetter`** - Capitalize first letter of string
- **`capitalizeNthLetter`** - Capitalize specific letter at index n
- **`countCharacterOccurrences`** - Count occurrences of a character
- **`countConsonants`** - Count consonants in string
- **`countSubstring`** - Count substring occurrences
- **`countVowels`** - Count vowels in string
- **`countWords`** - Count words in string
- **`endsWith`** - Check if string ends with substring
- **`escapeRegex`** - Escape special regex characters
- **`extractSubstring`** - Extract substring by indices
- **`findLongestWord`** - Find longest word in string
- **`firstNonRepeatingCharacter`** - Find first non-repeating character
- **`generateRandomAlphanumeric`** - Generate random alphanumeric string
- **`generateRandomString`** - Generate random string
- **`getFileExtension`** - Get file extension from filename
- **`hasLowercase`** - Check if string has lowercase letters
- **`hasUppercase`** - Check if string has uppercase letters
- **`indexOfSubstring`** - Find index of substring
- **`isAlpha`** - Check if string contains only letters
- **`isAlphanumeric`** - Check if string is alphanumeric
- **`isNumeric`** - Check if string is numeric
- **`isPalindrome`** - Check if string is palindrome
- **`isValidEmail`** - Validate email format
- **`isWhitespace`** - Check if string is whitespace only
- **`lastIndexOfSubstring`** - Find last index of substring
- **`padString`** - Pad string to specified length
- **`removeWhitespace`** - Remove all whitespace
- **`repeatString`** - Repeat string n times
- **`repeatUntilLength`** - Repeat string until reaches length
- **`replaceFirst`** - Replace first occurrence
- **`replaceMultiple`** - Replace multiple substrings at once
- **`replaceSubstring`** - Replace substring with another
- **`reverseString`** - Reverse string
- **`reverseWords`** - Reverse word order
- **`slugify`** - Convert string to URL-friendly slug
- **`splitString`** - Split string by delimiter
- **`startsWith`** - Check if string starts with substring
- **`stringToBoolean`** - Convert string to boolean
- **`stringToNumber`** - Convert string to number
- **`stringToWords`** - Split string into words array
- **`stripHtmlTags`** - Remove HTML tags from string
- **`toKebabCase`** - Convert to kebab-case
- **`toLowerCase`** - Convert to lowercase
- **`toSnakeCase`** - Convert to snake_case
- **`toUpperCase`** - Convert to uppercase
- **`trimWhitespace`** - Trim leading/trailing whitespace
- **`truncateString`** - Truncate string to max length
- **`uniqueCharacters`** - Get unique characters as array
- **`wordsToSentence`** - Join words into sentence

## Additional exports

- **`extractNumbers`** — Extracts all numeric values (integers and decimals) from a string, returning them as an array of JavaScript numbers. Supports positive and negative numbers, as well as decimal numbers.
- **`normalizeWhitespace`** — Normalizes whitespace in a string by trimming leading and trailing whitespace and collapsing all internal sequences of whitespace characters (spaces, tabs, newlines, etc.) into a single space.
- **`maskString`** — Masks a portion of a string, replacing characters between `start` and `end` indices with a mask character. Useful for obscuring sensitive data such as credit card numbers, phone numbers, and email addresses.
- **`removeAccents`** — Removes accent marks (diacritics) from characters in a string, converting accented characters to their base ASCII equivalents. Uses Unicode Normalization Form D (NFD) to decompose characters, then strips combining diacritical marks.
- **`toCamelCase`** — Converts a string to camelCase. Handles space-separated, kebab-case, snake_case, PascalCase, and mixed-delimiter inputs.
- **`toPascalCase`** — Converts a string to PascalCase (also known as UpperCamelCase). Handles space-separated, kebab-case, snake_case, camelCase, and mixed-delimiter inputs.
- **`truncateWords`** — Truncates a string to a specified number of words, appending a suffix if the string was truncated. Useful for creating text previews, summaries, and multi-line ellipsis effects where whole words should be preserved.
- **`wrapText`** — Wraps a string to a specified maximum line width, inserting newline characters at word boundaries. Long single words that exceed the maximum width are placed on their own line without breaking.

## Quick Example

```typescript
import {
  slugify,
  capitalizeFirstLetter,
  isPalindrome,
  truncateString,
} from '@ts-utilkit/string';

slugify('Hello World!'); // 'hello-world'
capitalizeFirstLetter('hello'); // 'Hello'
isPalindrome('racecar'); // true
truncateString('Long text...', 10); // 'Long te...'
```

## License

MIT © [Mykyta Forofontov](https://github.com/MForofontov)

## Contributing

Contributions are welcome! Please see the [main repository](https://github.com/MForofontov/ts-utilkit) for contribution guidelines.
