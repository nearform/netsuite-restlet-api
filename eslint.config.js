import globals from 'globals'
import js from '@eslint/js'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import eslintPluginTs from '@typescript-eslint/eslint-plugin'
import eslintParserTs from '@typescript-eslint/parser'

export default [
  js.configs.recommended,
  prettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node
      },
      parser: eslintParserTs,
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    plugins: {
      '@typescript-eslint': eslintPluginTs
    },
    ignores: ['node_modules', 'dist'],
    files: ['src/**/*.ts', 'tests/**/*.ts']
  }
]
