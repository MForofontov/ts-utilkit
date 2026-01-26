# Security Policy

## Supported Versions

We release patches for security vulnerabilities for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

The ts-utilkit team takes security vulnerabilities seriously. We appreciate your efforts to responsibly disclose your findings.

### How to Report

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please report security vulnerabilities by emailing:

**Email**: [Create an issue with "SECURITY" label or contact repository owner]

Please include the following information in your report:

- **Type of vulnerability** (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
- **Full paths of source file(s)** related to the vulnerability
- **Location of the affected source code** (tag/branch/commit or direct URL)
- **Step-by-step instructions** to reproduce the issue
- **Proof-of-concept or exploit code** (if possible)
- **Impact of the vulnerability**, including how an attacker might exploit it
- **Any possible mitigations** you've identified

### What to Expect

After you submit a report, you can expect:

1. **Confirmation of receipt** within 48 hours
2. **Initial assessment** within 5 business days
3. **Regular updates** on the progress of addressing the vulnerability
4. **Credit for the discovery** (unless you prefer to remain anonymous)

### Security Update Process

1. **Confirmation**: We confirm the vulnerability and determine its impact
2. **Fix Development**: We develop a fix in a private repository
3. **Release**: We release a patched version
4. **Disclosure**: We publish a security advisory with credit to the reporter (if desired)

## Security Best Practices for Contributors

When contributing to ts-utilkit, please follow these security guidelines:

### Cryptographic Functions

- **Always use Node.js built-in `crypto` module** - Never implement custom cryptography
- **Use timing-safe comparison** (`timingSafeEqual`) for comparing sensitive values (hashes, HMACs, tokens)
- **Validate all cryptographic inputs** strictly (key sizes, algorithm parameters, hex formats)
- **Document security implications** clearly in JSDoc comments
- **Mark legacy/weak algorithms** explicitly (e.g., MD5 should be marked as "legacy use only")

### Input Validation

- **Validate all user inputs** with proper type checking
- **Check for edge cases** that could lead to unexpected behavior
- **Sanitize inputs** when processing external data
- **Use safe comparison operations** to prevent timing attacks on sensitive data

### Dependencies

- **Keep dependencies up to date** to get security patches
- **Avoid dependencies with known vulnerabilities**
- **Use npm audit** regularly to check for security issues
- **Prefer well-maintained, battle-tested packages**

### Code Review

All code changes undergo security review as part of the PR process:

- Cryptographic operations are reviewed for proper usage
- Input validation is verified for completeness
- Error handling is checked for information leakage
- Dependencies are audited for known vulnerabilities

## Known Security Considerations

### Cryptographic Functions

- **MD5 is provided for legacy compatibility only** and should not be used for new security-sensitive applications
- **Password hashing** uses PBKDF2 with SHA-512 by default, with a minimum of 100,000 iterations
- **Timing-safe comparison** is used for all cryptographic value comparisons to prevent timing attacks
- **AES-256-GCM** is used for encryption with authenticated encryption

### Validation Functions

- **Regular expressions** are designed to avoid ReDoS (Regular Expression Denial of Service) vulnerabilities
- **Pattern validation** includes length checks to prevent excessive processing

### General

- This library runs in Node.js environments only (requires Node.js 20+)
- Functions that accept user input include proper validation and error handling
- No sensitive information (keys, passwords, salts) is ever logged or exposed in error messages

## Security Advisories

Security advisories will be published through:

- GitHub Security Advisories
- CHANGELOG.md with [SECURITY] tags
- NPM advisory database (when published to NPM)

## Acknowledgments

We appreciate the security research community's efforts in helping keep ts-utilkit secure. Security researchers who responsibly disclose vulnerabilities will be acknowledged in:

- The security advisory
- The CHANGELOG
- This SECURITY.md file (Hall of Fame section, coming soon)

Thank you for helping keep ts-utilkit and its users safe! 🔒
