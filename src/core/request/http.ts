import { alovaInstance, uploadAlovaInstance } from './alova'

type HttpPayload = Record<string, unknown>

const baseConfig = {
  enableHttp2: true,
  sslVerify: true,
}

export const http = {
  get<T>(url: string, params?: Record<string, unknown>) {
    return alovaInstance.Get<T>(url, { params, ...baseConfig })
  },
  post<T>(url: string, data?: HttpPayload) {
    return alovaInstance.Post<T>(url, data, baseConfig)
  },
  put<T>(url: string, data?: HttpPayload) {
    return alovaInstance.Put<T>(url, data, baseConfig)
  },
  delete<T>(url: string, data?: HttpPayload) {
    return alovaInstance.Delete<T>(url, data, baseConfig)
  },
  upload<T>(data?: HttpPayload) {
    return uploadAlovaInstance.Post<T>('', data, baseConfig)
  },
}
