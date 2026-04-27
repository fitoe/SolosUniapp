export type BuildTarget = 'h5' | 'mp-weixin'

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
}

export const MINI_TARGETS: BuildTarget[] = [
  'mp-weixin',
]
