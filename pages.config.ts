import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  pages: [],
  easycom: {
    custom: {
      '^uni-(.*)': '@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue',
    },
  },
  globalStyle: {
    'navigationBarTitleText': 'Uni Starter',
    'navigationBarTextStyle': 'black',
    'navigationBarBackgroundColor': '#ffffff',
    'backgroundColor': '#f7f8fa',
    'backgroundTextStyle': 'dark',
    'backgroundColorTop': '#f7f8fa',
    'backgroundColorBottom': '#ffffff',
    'onReachBottomDistance': 200,
    'app-plus': {
      titleNView: false,
    },
  },
  tabBar: {
    color: '#8C8C8C',
    selectedColor: '#056EFF',
    backgroundColor: '#ffffff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index',
        text: '首页',
      },
      {
        pagePath: 'pages/chart/index',
        text: '图表',
      },
      {
        pagePath: 'pages/me',
        text: '我的',
      },
    ],
  },
  condition: {
    current: 0,
    list: [
      {
        name: '首页',
        path: '/pages/index',
      },
      {
        name: '图表',
        path: '/pages/chart/index',
      },
      {
        name: '登录',
        path: '/pages/login',
      },
    ],
  },
})
