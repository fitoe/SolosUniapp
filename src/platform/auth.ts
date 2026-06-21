export interface PlatformLoginResult {
  provider: 'h5' | 'weixin'
  code: string
}

export function getCurrentAuthProvider(): PlatformLoginResult['provider'] {
  // #ifdef MP-WEIXIN
  return 'weixin'
  // #endif
  return 'h5'
}

export function loginByProvider(): Promise<PlatformLoginResult> {
  const provider = getCurrentAuthProvider()

  if (provider === 'weixin') {
    return new Promise((resolve, reject) => {
      uni.login({
        provider: 'weixin',
        success: (result) => {
          resolve({
            provider,
            code: result.code || '',
          })
        },
        fail: reject,
      })
    })
  }

  return Promise.resolve({
    provider,
    code: `h5-demo-${Date.now()}`,
  })
}
