import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import IndexPage from '@/pages/index.vue'
import { useHomePlaygroundStore } from '@/stores/home-playground'

function mountIndexPage() {
  const pinia = createPinia()
  const wrapper = mount(IndexPage, {
    global: {
      plugins: [pinia],
      stubs: {
        'wd-button': {
          emits: ['click'],
          template: '<button @click="$emit(\'click\')"><slot /></button>',
        },
        'wd-tag': {
          template: '<span><slot /></span>',
        },
      },
    },
  })

  return {
    wrapper,
    store: useHomePlaygroundStore(pinia),
  }
}

describe('pages/index.vue', () => {
  beforeEach(() => {
    vi.mocked(uni.navigateTo).mockClear()
  })

  it('renders the smoke playground sections', () => {
    const { wrapper } = mountIndexPage()

    expect(wrapper.text()).toContain('SolosUniapp 能力面板')
    expect(wrapper.text()).toContain('UnoCSS 样式验证')
    expect(wrapper.text()).toContain('Iconify 图标验证')
    expect(wrapper.text()).toContain('Pinia 状态验证')
    expect(wrapper.text()).toContain('Wot 组件验证')
    expect(wrapper.text()).toContain('当前计数')
    expect(wrapper.text()).toContain('2')
    expect(wrapper.text()).toContain('已开启')
    expect(wrapper.text()).toContain('摘要：Smoke test ready')
  })

  it('updates pinia state through page interactions', async () => {
    const { wrapper, store } = mountIndexPage()
    const buttons = wrapper.findAll('button')

    await buttons[0].trigger('click')
    await buttons[2].trigger('click')
    await wrapper.get('input').setValue('Pinia note updated')

    expect(store.count).toBe(3)
    expect(store.enabled).toBe(false)
    expect(store.note).toBe('Pinia note updated')
    expect(wrapper.text()).toContain('已暂停')
    expect(wrapper.text()).toContain('摘要：Pinia note updated')
  })
})
