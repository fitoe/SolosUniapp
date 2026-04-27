import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import IndexPage from '@/pages/index.vue'

describe('pages/index.vue', () => {
  beforeEach(() => {
    vi.mocked(uni.navigateTo).mockClear()
  })

  it('renders a single basic home page', () => {
    const wrapper = mount(IndexPage)

    expect(wrapper.text()).toContain('基础首页')
    expect(wrapper.text()).toContain('只保留一个基础首页用于 H5 与微信小程序开发。')
    expect(wrapper.text()).not.toContain('登录鉴权')
    expect(wrapper.text()).not.toContain('图表页')
    expect(wrapper.text()).not.toContain('我的')
  })

  it('does not expose navigation cards', () => {
    const wrapper = mount(IndexPage)

    expect(wrapper.find('.card').exists()).toBe(false)
    expect(wrapper.find('.hero').exists()).toBe(true)
    expect(uni.navigateTo).not.toHaveBeenCalled()
  })
})
