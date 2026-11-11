// @ts-nocheck
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'eslint.config.mjs',
      'node_modules/**',
      '**/dist/**',
      '**/coverage/**',
      'local-testing/**',
      'scripts/**/*.js',
      '**/*.js',
      '**/*.cjs',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 2024,
      sourceType: 'module',
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      // Let Prettier handle all formatting
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          tabWidth: 2,
        },
      ],

      // Warn on use of console.log, console.error, etc.
      'no-console': 'warn',

      // Do not require explicit return types for functions (TypeScript will infer them)
      '@typescript-eslint/explicit-function-return-type': 'off',

      // Warn when the 'any' type is used (discourages unsafe typing)
      '@typescript-eslint/no-explicit-any': 'warn',

      // Warn on unused variables, but ignore arguments that start with '_'
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],

      // Warn if a Promise is created but not handled (avoids unhandled async bugs)
      '@typescript-eslint/no-floating-promises': 'warn',

      // Warn when passing values of unsafe types as arguments
      '@typescript-eslint/no-unsafe-argument': 'warn',

      // Error if an async function does not contain an await (avoids unnecessary async)
      '@typescript-eslint/require-await': 'error',

      // Warn on assignments from values with unsafe types (like 'any')
      '@typescript-eslint/no-unsafe-assignment': 'warn',

      // Warn on accessing properties on values with unsafe types
      '@typescript-eslint/no-unsafe-member-access': 'warn',

      // Warn on calling values with unsafe types as functions
      '@typescript-eslint/no-unsafe-call': 'warn',

      // Warn on returning values with unsafe types
      '@typescript-eslint/no-unsafe-return': 'warn',

      // Warn if a variable declaration shadows one from an outer scope
      '@typescript-eslint/no-shadow': 'warn',

      // Warn if the same module is imported more than once
      'no-duplicate-imports': 'warn',

      // Warn if a class constructor is unnecessary (does nothing)
      '@typescript-eslint/no-useless-constructor': 'warn',

      // Warn if object types are not defined using 'interface' (enforces interface over type)
      '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],

      // Error if 'require()' is used instead of ES module imports
      '@typescript-eslint/no-var-requires': 'error',

      // Warn if type-only imports are not consistently using 'import type'
      '@typescript-eslint/consistent-type-imports': 'warn',
    },
  },
);
