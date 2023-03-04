module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'class-methods-use-this': 'off',
    'no-unused-vars': 'off',
    'no-shadow': 'off',
    'import/no-extraneous-dependencies': 'off',
    'consistent-return': 'off',
    'no-promise-executor-return': 'off',
    camelcase: 'off',
    quotes: 'off',
  },
};
