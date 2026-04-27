import process from 'node:process'
import { defineManifestConfig } from '@uni-helper/vite-plugin-uni-manifest'
import { resolveTargetFromLifecycle } from './config/targets-resolver'
import pkg from './package.json'

const targetInfo = resolveTargetFromLifecycle(process.env.npm_lifecycle_event || '')
const appid = targetInfo.appid
const projectName = targetInfo.projectName

export default defineManifestConfig({
  'name': projectName,
  appid,
  'description': 'uni-app application starter',
  'versionName': pkg.version,
  'versionCode': '100',
  'transformPx': false,
  'mp-weixin': {
    appid,
    projectname: projectName,
    setting: {
      urlCheck: false,
      es6: true,
      minified: true,
      bigPackageSizeSupport: true,
    },
    mergeVirtualHostAttributes: true,
    usingComponents: true,
    darkmode: false,
    lazyCodeLoading: 'requiredComponents',
  },
  'h5': {
    router: {
      mode: 'hash',
      base: './',
    },
    publicPath: './',
  },
  'uniStatistics': {
    enable: false,
  },
  'vueVersion': '3',
})
