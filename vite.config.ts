import { fileURLToPath, URL } from 'node:url'
import Uni from '@uni-helper/plugin-uni'
import { uniuseAutoImports } from '@uni-helper/uni-use'
import Components from '@uni-helper/vite-plugin-uni-components'
import { WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig, loadEnv } from 'vite'
import uniPolyfill from 'vite-plugin-uni-polyfill'

function toVitePath(url: string) {
  return fileURLToPath(new URL(url, import.meta.url)).replace(/\\/g, '/')
}

export default ({ mode }: { mode: string }) => {
  const envDir = toVitePath('./env')
  const srcDir = toVitePath('./src')
  const wotDir = toVitePath('./node_modules/wot-design-uni')
  const env = {
    ...loadEnv(mode, envDir),
    ...loadEnv('wechat', envDir),
  }
  const uniUseImports = Object.fromEntries(
    Object.entries(uniuseAutoImports()).map(([pkg, imports]) => [
      pkg,
      imports.filter(name => name !== 'useRequest'),
    ]),
  )
  return defineConfig({
    envDir,
    resolve: {
      alias: {
        '~/': `${srcDir}/`,
        '@/': `${srcDir}/`,
        'wot-design-uni': wotDir,
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3500,
      strictPort: true,
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
      UniManifest(),
      UniPages({
        dts: 'src/uni-pages.d.ts',
      }),
      Components({
        dts: false,
        directoryAsNamespace: false,
        resolvers: [WotResolver()],
      }),
      Uni(),
      uniPolyfill(),
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
        dts: true,
        dirsScanOptions: {
          types: true,
        },
        dirs: ['src/composables', 'src/composables/**', 'src/stores', 'src/stores/**', 'src/core', 'src/core/**'],
        vueTemplate: true,
      }),
      UnoCSS(),
    ],
  })
}
