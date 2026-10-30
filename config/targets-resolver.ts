import type { BuildTarget } from './targets'
import process from 'node:process'
import { TARGETS } from './targets'

const SCRIPT_TO_TARGET: Record<string, BuildTarget> = {
  'dev:h5': 'h5',
  'build:h5': 'h5',
  'dev:mp-weixin': 'mp-weixin',
  'build:mp-weixin': 'mp-weixin',
  'build': 'mp-weixin',
}

export function resolveTargetFromLifecycle(lifecycleEvent: string) {
  const platform = process.env.UNI_PLATFORM
  const target = SCRIPT_TO_TARGET[lifecycleEvent]
    || (platform === 'h5' || platform === 'mp-weixin' ? platform : undefined)
  if (!target) {
    throw new Error(`Cannot determine build target for lifecycle "${lifecycleEvent}". Use a target-specific script or set UNI_PLATFORM.`)
  }
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
