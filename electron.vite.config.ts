import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@student': resolve('src/features/student/main'),
        '@frequentation': resolve('src/features/frequentation/main'),
        '@student-shared': resolve('src/features/student/shared'),
        '@frequentation-shared': resolve('src/features/frequentation/shared'),
        '@shared': resolve('src/shared'),
        '@lib': resolve('src/shared/lib'),
        '@types': resolve('src/shared/types')
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@shared': resolve('src/shared'),
        '@lib': resolve('src/shared/lib'),
        '@types': resolve('src/shared/types')
      }
    }
  },
  renderer: {
    resolve: {
      alias: {
        '@student': resolve('src/features/student/renderer'),
        '@frequentation': resolve('src/features/frequentation/renderer'),
        '@student-shared': resolve('src/features/student/shared'),
        '@frequentation-shared': resolve('src/features/frequentation/shared'),
        '@shared': resolve('src/shared'),
        '@ui': resolve('src/shared/ui'),
        '@lib': resolve('src/shared/lib'),
        '@types': resolve('src/shared/types')
      }
    },
    plugins: [
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler', { target: '19' }]]
        }
      })
    ]
  }
})
