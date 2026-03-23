import { vi } from 'vitest'

// Uni runtime stubs for unit tests.
Object.assign(globalThis, {
  definePage: () => {},
  uni: {
    navigateTo: vi.fn(),
    redirectTo: vi.fn(),
    reLaunch: vi.fn(),
    switchTab: vi.fn(),
    addInterceptor: vi.fn(),
    showToast: vi.fn(),
  },
})
