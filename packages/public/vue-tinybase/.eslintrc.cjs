module.exports = {
  extends: ['@local/vue-tinybase'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json', './scripts/tsconfig.json'],
    parser: '@typescript-eslint/parser',
  },
  rules: {
    'vue/prefer-import-from-vue': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prevent-abbreviations': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts'],
      },
      typescript: {
        alwaysTryTypes: true,
        project: ['./tsconfig.json', './scripts/tsconfig.json'],
      },
    },
  },
}
