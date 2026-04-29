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
  }
})
