export interface BusinessResponse<T> {
  code: number
  data: T
  message?: string
  msg?: string
}

export class BusinessError extends Error {
  constructor(
    public readonly code: number,
    message: string,
    public readonly data: unknown,
  ) {
    super(message)
    this.name = 'BusinessError'
  }
}

export function isBusinessSuccess(code: number) {
  return code === 0 || code === 200
}

export function unwrapBusinessResponse<T>(response: BusinessResponse<T>) {
  if (isBusinessSuccess(response.code)) {
    return response.data
  }

  throw new BusinessError(
    response.code,
    response.message || response.msg || `业务请求失败：${response.code}`,
    response.data,
  )
}
