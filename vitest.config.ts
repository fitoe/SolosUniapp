import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { uniuseAutoImports } from '@uni-helper/uni-use'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vitest/config'

const uniUseImports = Object.fromEntries(
  Object.entries(uniuseAutoImports()).map(([pkg, imports]) => [
    pkg,
    imports.filter(name => name !== 'useRequest'),
  ]),
)

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        'uni-app',
        uniUseImports,
        'pinia',
        {
          'alova/client': [
            'useRequest',
          ],
        },
      ],
      dts: false,
      dirsScanOptions: {
        types: true,
      },
      dirs: ['src/composables', 'src/composables/**', 'src/stores', 'src/stores/**', 'src/core', 'src/core/**'],
      vueTemplate: true,
    }),
  ],
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
