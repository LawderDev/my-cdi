import tseslint from '@electron-toolkit/eslint-config-ts'
import eslintConfigPrettier from '@electron-toolkit/eslint-config-prettier'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh'
import eslintPluginImport from 'eslint-plugin-import'

export default tseslint.config(
  { ignores: ['**/node_modules', '**/dist', '**/out'] },
  tseslint.configs.recommended,
  eslintPluginReact.configs.flat.recommended,
  eslintPluginReact.configs.flat['jsx-runtime'],
  {
    settings: {
      react: {
        version: 'detect'
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
      'react/prop-types': 'off',
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            // Forbid cross-feature imports
            {
              target: './src/renderer/src/features/journal',
              from: './src/renderer/src/features',
              except: ['./journal']
            },
            {
              target: './src/renderer/src/features/students',
              from: './src/renderer/src/features',
              except: ['./students']
            },
            // Enforce unidirectional
            {
              target: './src/renderer/src/features',
              from: './src/renderer/src/app'
            },
            {
              target: [
                './src/renderer/src/components',
                './src/renderer/src/hooks',
                './src/renderer/src/lib',
                './src/renderer/src/types',
                './src/renderer/src/utils'
              ],
              from: ['./src/renderer/src/features', './src/renderer/src/app']
            }
          ]
        }
      ]
    }
  },
  eslintConfigPrettier
)
