import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(fileURLToPath(new URL('.', import.meta.url)), 'src'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['tests/setup/vitest.setup.ts'],
    include: ['tests/unit/**/*.spec.ts'],
    globals: false,
  },
})
