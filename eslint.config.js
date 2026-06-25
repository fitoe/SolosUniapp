import uniHelper from '@uni-helper/eslint-config'
import unocss from '@unocss/eslint-config/flat'

export default uniHelper({
  unocss,
}, {
  rules: {
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
  },
}).prepend({
  ignores: [
    'src/components/qiun-data-charts/**',
    'src/components/qiun-error/**',
    'src/components/qiun-loading/**',
  ],
})
