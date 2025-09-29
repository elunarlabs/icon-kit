// Flat ESLint config for @elunar/icon-kit (ESM)
// Requires Node >=18 and type: module in package.json
import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import * as tseslint from 'typescript-eslint';
import storybook from 'eslint-plugin-storybook';

export default [
  { ignores: ['dist', 'node_modules'] },
  js.configs.recommended,
  // Grab only the first config objects from typescript-eslint recommended (array of configs)
  ...tseslint.configs.recommended,
  ...storybook.configs['flat/recommended'],
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { ecmaVersion: 2022, sourceType: 'module', ecmaFeatures: { jsx: true } }
    },
    plugins: { react: reactPlugin, 'react-hooks': reactHooks },
    settings: { react: { version: 'detect' } },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
];
