import { describe, expect, it } from 'vitest'
import { BusinessError, unwrapBusinessResponse } from '@/core/request/business'

describe('request business response helpers', () => {
  it('returns data when the response code represents success', () => {
    const result = unwrapBusinessResponse({
      code: 0,
      data: { id: 'user-1' },
      message: 'ok',
    })

    expect(result).toEqual({ id: 'user-1' })
  })

  it('throws a typed business error for non-success codes', () => {
    expect(() =>
      unwrapBusinessResponse({
        code: 40101,
        data: { reason: 'expired' },
        message: '登录已过期',
      }),
    ).toThrow(BusinessError)

    try {
      unwrapBusinessResponse({
        code: 40101,
        data: { reason: 'expired' },
        message: '登录已过期',
      })
    }
    catch (error) {
      expect(error).toBeInstanceOf(BusinessError)
      expect((error as BusinessError).code).toBe(40101)
      expect((error as BusinessError).message).toBe('登录已过期')
      expect((error as BusinessError).data).toEqual({ reason: 'expired' })
    }
  })
})
