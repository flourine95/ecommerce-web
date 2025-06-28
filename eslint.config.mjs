import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/dist/**',
      '**/public/**',
      '**/coverage/**',
      '**/temp.js',
      'config/*',
      '**/.*',
    ],
  },

  ...compat.config({
    extends: [
      'next',
      'next/core-web-vitals',
      'next/typescript',
      'plugin:jsx-a11y/recommended',
      'prettier',
    ],
    plugins: ['jsx-a11y'],
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  }),
];

export default eslintConfig;
