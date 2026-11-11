# @ts-utilkit/crypto

Version: [0.3.3](https://www.npmjs.com/package/@ts-utilkit/crypto/v/0.3.3). Requires Node.js 20 or later.

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

## Available Functions (11)

- **`compareHash`** - Timing-safe hash comparison
- **`decryptAES256`** - AES-256-GCM decryption
- **`encryptAES256`** - AES-256-GCM encryption
- **`generateHMAC`** - Generate HMAC for data integrity
- **`generateRandomBytes`** - Generate secure random bytes
- **`generateSalt`** - Generate cryptographic salt (32 hex chars)
- **`hashMD5`** - MD5 hashing (legacy support only)
- **`hashPassword`** - Secure password hashing with PBKDF2
- **`hashSHA256`** - SHA-256 hashing
- **`hashSHA512`** - SHA-512 hashing
- **`verifyHMAC`** - Timing-safe HMAC verification

## Quick Example

```typescript
import {
  hashPassword,
  generateSalt,
  generateRandomBytes,
  encryptAES256,
  generateHMAC,
} from '@ts-utilkit/crypto';

// Password hashing
const salt = generateSalt();
const hash = await hashPassword('password123', salt);

// Encryption uses a per-message derived key
const key = generateRandomBytes(32).toString('hex');
const encrypted = encryptAES256('secret', key);

// HMAC signatures
const data = 'request payload';
const secret = generateRandomBytes(32).toString('hex');
const signature = generateHMAC(data, secret, 'sha256');
```

## License

MIT © [Mykyta Forofontov](https://github.com/MForofontov)
