module.exports = {
  env: {
    node: true,
    browser: true,
    commonjs: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: 'eslint:recommended',
  plugins: ['jest'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    eqeqeq: 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': ['error', { before: true, after: true }],
  },
};
