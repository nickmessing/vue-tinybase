module.exports = {
  extends: ['@local/vue-tinybase'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json', './tsconfig.app.json', './tsconfig.node.json'],
    parser: '@typescript-eslint/parser',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts'],
      },
      typescript: {
        alwaysTryTypes: true,
        project: ['./tsconfig.json', './tsconfig.app.json', './tsconfig.node.json'],
      },
    },
  },
}
