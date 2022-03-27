module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: 'tsconfig.json',
      },
    },
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/naming-convention': 'warn',
    '@typescript-eslint/semi': 'warn',
    curly: 'warn',
    eqeqeq: 'warn',
    'no-throw-literal': 'warn',
    semi: 'off',
    '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
    'max-len': ['error', { code: 123 }],
    'prefer-template': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    '@typescript-eslint/prefer-readonly': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
  },
  ignorePatterns: ['out', 'dist', '**/*.d.ts'],
};
