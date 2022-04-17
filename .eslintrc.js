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
    'func-names': 'off',
    'no-multiple-empty-lines': ['error', {
      max: 2,
      maxEOF: 0,
    }],
    'max-classes-per-file': 'off',
    'no-underscore-dangle': 'off',

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unused-vars.md
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-use-before-define.md
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
  },
  // 重写
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
    {
      files: [
        'scripts/**',
      ],
      env: {
        node: true,
      },
      rules: {
        'import/no-extraneous-dependencies': 0,
      },
    },
  ],
};
