import { afterEach, describe, expect, it, vi } from 'vitest'
import { resolveTargetFromLifecycle } from '../../../config/targets-resolver'

describe('build target resolution', () => {
  afterEach(() => vi.unstubAllEnvs())

  it('uses the target-specific lifecycle', () => {
    expect(resolveTargetFromLifecycle('build:h5').target).toBe('h5')
    expect(resolveTargetFromLifecycle('build:mp-weixin').target).toBe('mp-weixin')
  })

  it('rejects unknown targets instead of silently building a mini-program', () => {
    vi.stubEnv('UNI_PLATFORM', '')
    expect(() => resolveTargetFromLifecycle('unknown')).toThrow('Cannot determine build target')
  })
})
