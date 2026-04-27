import type { BuildTarget } from './targets'
import process from 'node:process'
import { TARGETS } from './targets'

const SCRIPT_TO_TARGET: Record<string, BuildTarget> = {
  'dev:h5': 'h5',
  'build:h5': 'h5',
  'dev:mp-weixin': 'mp-weixin',
  'build:mp-weixin': 'mp-weixin',
}

export function resolveTargetFromLifecycle(lifecycleEvent: string) {
  const target = SCRIPT_TO_TARGET[lifecycleEvent] || 'mp-weixin'
  const config = TARGETS[target]
  const appid = config.appidEnvKey ? process.env[config.appidEnvKey] || '__UNI_APP__' : '__UNI_APP__'
  const projectName = config.projectNameEnvKey ? process.env[config.projectNameEnvKey] || 'SolosUniapp' : 'SolosUniapp'
  return {
    target,
    appid,
    projectName,
    config,
  }
}
