module.exports = {
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', '@typescript-eslint', 'no-smart-quotes'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'no-smart-quotes/no-smart-quotes': 'error',
  },
  overrides: [
    {
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
    },
    {
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
    },
    {
      files: ['*.mdx'],
      extends: ['plugin:mdx/recommended', 'plugin:react/recommended'],
      settings: {
        'mdx/code-blocks': true,
      },
      rules: {
        'react/no-unescaped-entities': 'off',
        'react/jsx-no-undef': 'off',
      },
    },
  ],
};
