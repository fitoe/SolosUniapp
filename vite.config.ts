import { resolve } from 'node:path'
import process from 'node:process'
import Uni from '@dcloudio/vite-plugin-uni'
import { uniuseAutoImports } from '@uni-helper/uni-use'
import Components from '@uni-helper/vite-plugin-uni-components'
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig, loadEnv } from 'vite'
import uniPolyfill from 'vite-plugin-uni-polyfill'

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd())
  const uniMaybe = Uni as unknown as (() => unknown) | { default: () => unknown }
  const createUniPlugin: () => any = typeof uniMaybe === 'function' ? uniMaybe : uniMaybe.default
  return defineConfig({
    resolve: {
      alias: {
        '~/': `${resolve(__dirname, 'src')}/`,
        '@/': `${resolve(__dirname, 'src')}/`,
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      proxy: {
        '/api': {
          target: env.VITE_API_HOST,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
        '/upload': {
          target: env.VITE_UPLOAD_HOST,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/upload/, ''),
        },
      },
    },
    optimizeDeps: {
      exclude: ['vue-demi'],
    },
    publicDir: 'public',
    build: {
      target: 'es6',
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
    plugins: [
      uniPolyfill(),
      UniManifest(),
      UniPages({
        homePage: 'pages/index',
        subPackages: ['src/subpages'],
      }),
      UniLayouts(),
      UnoCSS(),
      AutoImport({
        imports: [
          'vue',
          'uni-app',
          uniuseAutoImports(),
          'pinia',
          { 'alova/client': ['useRequest', 'usePagination', 'useAutoRequest', 'useWatcher'] },
        ],
        dts: true,
        dirs: ['src/composables', 'src/stores', 'src/core'],
        vueTemplate: true,
      }),
      Components({
        dts: 'src/components.d.ts',
        directoryAsNamespace: false,
        resolvers: [],
      }),
      createUniPlugin(),
    ],
  })
}
