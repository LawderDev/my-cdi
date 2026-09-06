import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/shared/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    alias: [
      { find: '@student-shared', replacement: resolve('src/features/student/shared') },
      { find: '@frequentation-shared', replacement: resolve('src/features/frequentation/shared') },
      { find: '@statistics-shared', replacement: resolve('src/features/statistics/shared') },
      { find: '@settings-shared', replacement: resolve('src/features/settings/shared') },
      {
        find: /^@student\/(types|helpers|api|validations|pages|components|presenters|hooks|containers|routes)(.*)$/,
        replacement: resolve('src/features/student/renderer') + '/$1$2'
      },
      {
        find: /^@frequentation\/(types|helpers|api|validations|pages|components|presenters|hooks|containers|routes)(.*)$/,
        replacement: resolve('src/features/frequentation/renderer') + '/$1$2'
      },
      {
        find: /^@statistics\/(types|helpers|api|validations|pages|components|presenters|hooks|containers|routes)(.*)$/,
        replacement: resolve('src/features/statistics/renderer') + '/$1$2'
      },
      {
        find: /^@settings\/(types|helpers|api|validations|pages|components|presenters|hooks|containers|routes)(.*)$/,
        replacement: resolve('src/features/settings/renderer') + '/$1$2'
      },
      { find: /^@student(\/.*)?$/, replacement: resolve('src/features/student/main') + '$1' },
      {
        find: /^@frequentation(\/.*)?$/,
        replacement: resolve('src/features/frequentation/main') + '$1'
      },
      {
        find: /^@statistics(\/.*)?$/,
        replacement: resolve('src/features/statistics/main') + '$1'
      },
      {
        find: /^@settings(\/.*)?$/,
        replacement: resolve('src/features/settings/main') + '$1'
      },
      { find: '@ui', replacement: resolve('src/shared/ui') },
      { find: '@lib', replacement: resolve('src/shared/lib') },
      { find: '@types', replacement: resolve('src/shared/types') },
      { find: '@shared', replacement: resolve('src/shared') }
    ]
  }
})
