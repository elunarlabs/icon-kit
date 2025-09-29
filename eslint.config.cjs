// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
const storybook = require('eslint-plugin-storybook');

// Flat ESLint config (CommonJS form) for @elunar/icon-kit
// ESLint v9 flat config with require()
const js = require('@eslint/js');
const reactPlugin = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const tseslint = require('typescript-eslint');
const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({ baseDirectory: __dirname });

module.exports = [
  { ignores: ['dist', 'node_modules'] },
  js.configs.recommended,
  // typescript-eslint recommended returns array(s); take first (stylistic not needed here)
  tseslint.configs.recommended[0],
  ...compat.extends('plugin:react/recommended'),
  storybook.configs['flat/recommended'],
  {
    files: ['**/*.{ts,tsx,jsx,js}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { ecmaVersion: 2022, sourceType: 'module', ecmaFeatures: { jsx: true } }
    },
    plugins: { react: reactPlugin, 'react-hooks': reactHooks },
    settings: { react: { version: 'detect' } },
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'react/prop-types': 'off'
    }
  }
];
