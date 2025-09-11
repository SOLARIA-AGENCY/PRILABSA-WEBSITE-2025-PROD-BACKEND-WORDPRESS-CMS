import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { 
    ignores: [
      'dist', 
      'coverage', 
      'src/types/globals.d.ts', 
      'scripts/**/*.js',
      'scripts/equipos-converted.ts',
      'scripts/eq002-insert.ts',
      'scripts/quimicos-output.ts',
      'scripts/hardcoded-products-system.ts',
      'scripts/godaddy-optimization-config.ts',
      'PRODUCTOS-PRILABSA/**/*',
      'PRILABSA-ENTREGA-CLIENTE/**/*'
    ] 
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      // Allow legacy patterns in some hooks utilities without blocking CI
      'prefer-rest-params': 'off'
    },
  },
  // Special rules for JavaScript files in scripts directory
  {
    files: ['scripts/**/*.js'],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off'
    }
  },
  // Architectural rule: Components/Pages must not import raw product-translations
  {
    files: ['src/components/**/*.{ts,tsx}', 'src/pages/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '../data/products/product-translations',
                '../../data/products/product-translations',
                '../../../data/products/product-translations',
                '**/data/products/product-translations',
                'src/data/products/product-translations',
              ],
              message:
                'Usa ProductTranslationService (src/services/ProductTranslationService.ts) con fallback; no importes directamente product-translations en componentes o páginas.'
            }
          ]
        }
      ]
    }
  }
  ,
  // Extend the restriction to other common UI folders
  {
    files: [
      'src/sections/**/*.{ts,tsx}',
      'src/widgets/**/*.{ts,tsx}',
      'src/features/**/*.{ts,tsx}',
      'src/modules/**/*.{ts,tsx}',
      'src/layouts/**/*.{ts,tsx}'
    ],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '../data/products/product-translations',
                '../../data/products/product-translations',
                '../../../data/products/product-translations',
                '**/data/products/product-translations',
                'src/data/products/product-translations',
              ],
              message:
                'Usa ProductTranslationService (src/services/ProductTranslationService.ts) con fallback; no importes directamente product-translations.'
            }
          ]
        }
      ]
    }
  }
)
