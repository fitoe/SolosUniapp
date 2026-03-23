import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import IndexPage from '@/pages/index.vue'

describe('pages/index.vue', () => {
  beforeEach(() => {
    vi.mocked(uni.navigateTo).mockClear()
  })

  it('renders starter title', () => {
    const wrapper = mount(IndexPage, {
      global: {
        components: {
          'uni-section': {
            template: '<section>{{ title }} {{ subTitle }}<slot /></section>',
            props: ['title', 'subTitle'],
          },
        },
      },
    })
    expect(wrapper.text()).toContain('登录鉴权')
    expect(wrapper.text()).toContain('图表页')
    expect(wrapper.text()).toContain('我的')
  })

  it('navigates when card is clicked', async () => {
    const wrapper = mount(IndexPage, {
      global: {
        components: {
          'uni-section': {
            template: '<section>{{ title }}<slot /></section>',
            props: ['title'],
          },
        },
      },
    })

    await wrapper.find('.card').trigger('click')
    expect(uni.navigateTo).toHaveBeenCalled()
  })
})
