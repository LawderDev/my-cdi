import tseslint from '@electron-toolkit/eslint-config-ts'
import eslintConfigPrettier from '@electron-toolkit/eslint-config-prettier'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh'
import eslintPluginImport from 'eslint-plugin-import'

export default tseslint.config(
  { ignores: ['**/node_modules', '**/dist', '**/out', '**/drizzle'] },
  tseslint.configs.recommended,
  eslintPluginReact.configs.flat.recommended,
  eslintPluginReact.configs.flat['jsx-runtime'],
  {
    settings: {
      react: {
        version: '19.0'
      }
    }
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': eslintPluginReactHooks,
      'react-refresh': eslintPluginReactRefresh,
      import: eslintPluginImport
    },
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
      ...eslintPluginReactRefresh.configs.vite.rules,
      'react/prop-types': 'off'
    }
  },
  {
    files: ['**/*.mjs'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off'
    }
  },
  eslintConfigPrettier,
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      'no-magic-numbers': [
        'error',
        {
          ignore: [
            -1, 0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7, 7.5, 8, 9,
            10, 11, 12
          ],
          ignoreArrayIndexes: true,
          ignoreDefaultValues: true,
          enforceConst: true,
          detectObjects: true
        }
      ],
      curly: ['error', 'all'],
      'nonblock-statement-body-position': ['error', 'below'],
      'import/no-cycle': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector: "TSAsExpression > TSTypeReference[typeName.name!='const']",
          message: 'Type assertions (as Type) are forbidden. Use type guards or proper typing.'
        },
        {
          selector: 'TSAsExpression > TSArrayType',
          message: 'Type assertions to array types are forbidden. Type the source instead.'
        },
        {
          selector: 'TSAsExpression > TSUnknownKeyword',
          message: 'Casting to unknown via "as unknown" is forbidden.'
        },
        {
          selector: 'TSAsExpression > TSStringKeyword',
          message: 'Type assertions to primitives are forbidden.'
        },
        {
          selector: 'TSAsExpression > TSNumberKeyword',
          message: 'Type assertions to primitives are forbidden.'
        },
        {
          selector: 'TSAsExpression > TSBooleanKeyword',
          message: 'Type assertions to primitives are forbidden.'
        },
        {
          selector:
            "CallExpression[callee.name='invalidateQueries'] > ObjectExpression > Property[key.name='queryKey'] > ArrayExpression > Literal",
          message: 'Use query key factory constants, not inline string literals'
        }
      ]
    }
  }
)
