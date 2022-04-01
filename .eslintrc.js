module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'arrow-body-style': ['error', 'always'],
    'func-names': 0,
    'no-multiple-empty-lines': ['error', {
      max: 2,
      maxEOF: 0,
    }],
  },
  overrides: [
    {
      files: [
        '**/*.test.js',
      ],
      env: {
        jest: true,
      },
      plugins: [
        'jest',
      ],
    },
  ],
};
