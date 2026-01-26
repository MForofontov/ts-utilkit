# @ts-utilkit/string

string  Functions - TypeScript utility functions for string operations.

## Installation

```bash
npm install @ts-utilkit/string
```

## Features

- 🚀 TypeScript-first with complete type definitions
- ✅ Comprehensive test coverage (>95%)
- 📦 Tree-shakeable ESM and CommonJS support
- 🔒 Type-safe with strict TypeScript configuration
- 📖 Extensive JSDoc documentation

## Available Functions (51)

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

## Usage Examples

```typescript
import { slugify, capitalizeEachWord, isPalindrome, toKebabCase } from '@ts-utilkit/string';

// Create URL-friendly slugs
const title = 'Hello World! This is TypeScript 2024';
const slug = slugify(title); // 'hello-world-this-is-typescript-2024'

// Capitalize words
const text = 'hello world';
const capitalized = capitalizeEachWord(text); // 'Hello World'

// Check palindromes
const word = 'racecar';
const isPalin = isPalindrome(word); // true

// Case conversions
const camelCase = 'myVariableName';
const kebab = toKebabCase(camelCase); // 'my-variable-name'
```

## API Documentation

For complete API documentation, please visit the [main repository](https://github.com/MForofontov/ts-utilkit).

## License

MIT © MForofontov

## Contributing

Contributions are welcome! Please see the [main repository](https://github.com/MForofontov/ts-utilkit) for contribution guidelines.
