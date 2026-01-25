# @ts-utilkit/crypto

Cryptographic utilities for hashing, encryption, HMAC, and secure password management using Node.js built-in crypto module.

## Installation

```bash
npm install @ts-utilkit/crypto
```

## Features

- 🔒 Secure cryptographic operations using Node.js crypto
- 🔐 Multiple hashing algorithms (SHA-256, SHA-512, MD5)
- 🛡️ AES-256-GCM encryption/decryption
- ✅ HMAC generation and verification
- 🔑 Secure password hashing with PBKDF2
- ⚡ Timing-safe comparisons to prevent timing attacks
- 📖 Comprehensive documentation and examples

## Functions

### Hashing
- **hashSHA256** - SHA-256 hashing
- **hashSHA512** - SHA-512 hashing
- **hashMD5** - MD5 hashing (legacy support only)
- **hashPassword** - Secure password hashing with PBKDF2
- **compareHash** - Timing-safe hash comparison

### Encryption/Decryption
- **encryptAES256** - AES-256-GCM encryption
- **decryptAES256** - AES-256-GCM decryption

### HMAC
- **generateHMAC** - Generate HMAC for data integrity
- **verifyHMAC** - Timing-safe HMAC verification

### Utilities
- **generateSalt** - Generate cryptographic salt (32 hex chars)
- **generateRandomBytes** - Generate secure random bytes

## Usage Examples

### Password Hashing

```typescript
import { hashPassword, generateSalt, compareHash } from '@ts-utilkit/crypto';

// Register user
const salt = generateSalt();
const hashedPassword = hashPassword('userPassword123', salt);
// Store: { salt, hashedPassword } in database

// Login verification
const loginHash = hashPassword(inputPassword, storedSalt);
const isValid = compareHash(loginHash, storedHashedPassword);
```

### Data Hashing

```typescript
import { hashSHA256, hashSHA512 } from '@ts-utilkit/crypto';

// Hash data
const hash256 = hashSHA256('sensitive data');
const hash512 = hashSHA512('sensitive data');

// Hash file content
const fileContent = fs.readFileSync('document.pdf');
const fileHash = hashSHA256(fileContent);
```

### Encryption/Decryption

```typescript
import { encryptAES256, decryptAES256 } from '@ts-utilkit/crypto';

// Generate a 256-bit key (64 hex characters)
const key = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';

// Encrypt sensitive data
const encrypted = encryptAES256('Secret message', key);
// Result includes IV and auth tag: "iv:authTag:encryptedData"

// Decrypt data
const decrypted = decryptAES256(encrypted, key);
// Result: "Secret message"
```

### HMAC for API Signatures

```typescript
import { generateHMAC, verifyHMAC } from '@ts-utilkit/crypto';

// Client: Sign API request
const secretKey = 'shared-secret-key';
const requestData = JSON.stringify({ user: 'alice', action: 'transfer' });
const signature = generateHMAC(requestData, secretKey, 'sha256');

// Send: { data: requestData, signature }

// Server: Verify signature
const isValid = verifyHMAC(
  receivedData,
  receivedSignature,
  secretKey,
  'sha256'
);

if (isValid) {
  // Process request
} else {
  // Reject - data was tampered with
}
```

### Generate Random Data

```typescript
import { generateSalt, generateRandomBytes } from '@ts-utilkit/crypto';

// Generate salt for password hashing
const salt = generateSalt();
// Result: 32 hex characters

// Generate random bytes
const randomHex = generateRandomBytes(16);
// Result: 32 hex characters (16 bytes)
```

## Security Notes

### ⚠️ Important Guidelines

1. **Never use MD5 for security** - Only for legacy compatibility
2. **Use SHA-256 or SHA-512** for hashing
3. **Store passwords with PBKDF2** (hashPassword function)
4. **Use timing-safe comparisons** (compareHash, verifyHMAC)
5. **Generate strong keys** - Use cryptographically secure random values
6. **Protect your keys** - Never commit keys to version control
7. **AES-256-GCM provides** authenticated encryption (prevents tampering)

### Algorithm Support

**Hashing**: sha256, sha512, md5  
**HMAC**: sha256, sha512, sha1, md5  
**Encryption**: AES-256-GCM (most secure AES mode)

## API Documentation

All functions include:
- Strict input validation
- Descriptive error messages
- Timing-attack resistance where applicable
- Complete TypeScript types
- Comprehensive examples

For detailed API documentation, visit the [main repository](https://github.com/MForofontov/ts-utilkit).

## License

MIT © MForofontov
