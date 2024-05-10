import js from '@eslint/js';
import babelParser from '@babel/eslint-parser';
import reactPlugin from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier';
import storybookPlugin from 'eslint-plugin-storybook';
import typeScriptEsLint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';

const pharosConfig = {
  ignores: [
    'node_modules/',
    'dist/',
    'lib/',
    '.storybook-static/',
    'packages/pharos/coverage/**/*.js',
    'packages/pharos/src/styles/**/*.ts',
    'packages/pharos-site/public/',
    'packages/pharos-site/.cache/',
    '**/*.css.ts',
  ],
  languageOptions: {
    parser: babelParser,
    globals: {
      ...globals.browser,
      ...globals.node,
    },
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      requireConfigFile: false,
      ecmaFeatures: {
        jsx: true,
      },
      babelOptions: {
        plugins: ['@babel/plugin-syntax-import-assertions'],
        presets: ['@babel/preset-react'],
      },
    },
  },
  plugins: {
    reactPlugin,
    prettierPlugin,
    storybookPlugin,
    typeScriptEsLint,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
};

const tsConfig = {
  files: ['*.ts'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './packages/**/tsconfig.json',
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:wc/recommended',
    'plugin:lit/recommended',
  ],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/consistent-type-imports': ['error'],
    '@typescript-eslint/no-unused-vars': ['error'],
    'lit/no-legacy-template-syntax': 'off',
  },
};

const tsxConfig = {
  files: ['*.tsx'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './packages/**/tsconfig.json',
  },
  extends: [
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/consistent-type-imports': ['error'],
    '@typescript-eslint/no-unused-vars': ['error'],
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};

const mdxConfig = {
  files: ['*.mdx'],
  extends: ['plugin:mdx/recommended', 'plugin:react/recommended'],
  settings: {
    'mdx/code-blocks': true,
  },
  rules: {
    'react/no-unescaped-entities': 'off',
    'react/jsx-no-undef': 'off',
  },
};

export default [js.configs.recommended, pharosConfig, tsConfig, tsxConfig, mdxConfig];
