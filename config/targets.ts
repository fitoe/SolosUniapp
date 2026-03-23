export type BuildTarget = 'h5' | 'mp-weixin' | 'mp-toutiao' | 'mp-kuaishou' | 'mp-xhs'

export interface TargetConfig {
  target: BuildTarget
  appidEnvKey?: string
  projectNameEnvKey?: string
  mode: string
  platform: string
  outputDir?: string
}

export const TARGETS: Record<BuildTarget, TargetConfig> = {
  'h5': {
    target: 'h5',
    mode: 'development',
    platform: 'h5',
  },
  'mp-weixin': {
    target: 'mp-weixin',
    appidEnvKey: 'VITE_APPID_WEIXIN',
    projectNameEnvKey: 'VITE_PROJECT_NAME_WEIXIN',
    mode: 'wechat',
    platform: 'mp-weixin',
  },
  'mp-toutiao': {
    target: 'mp-toutiao',
    appidEnvKey: 'VITE_APPID_TOUTIAO',
    projectNameEnvKey: 'VITE_PROJECT_NAME_TOUTIAO',
    mode: 'wechat',
    platform: 'mp-toutiao',
  },
  'mp-kuaishou': {
    target: 'mp-kuaishou',
    appidEnvKey: 'VITE_APPID_KUAISHOU',
    projectNameEnvKey: 'VITE_PROJECT_NAME_KUAISHOU',
    mode: 'wechat',
    platform: 'mp-kuaishou',
  },
  'mp-xhs': {
    target: 'mp-xhs',
    appidEnvKey: 'VITE_APPID_XHS',
    projectNameEnvKey: 'VITE_PROJECT_NAME_XHS',
    mode: 'wechat',
    platform: 'mp-xhs',
  },
}

export const MINI_TARGETS: BuildTarget[] = [
  'mp-weixin',
  'mp-toutiao',
  'mp-kuaishou',
  'mp-xhs',
]
