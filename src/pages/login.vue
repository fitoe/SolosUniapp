<script setup lang="ts">
import { loginWithDemoAccount } from '@/core/auth/service'

definePage({
  style: {
    navigationBarTitleText: '登录',
  },
})

const loading = ref(false)
const redirectUrl = ref('/pages/mine')

onLoad((query) => {
  const redirect = query?.redirect
  redirectUrl.value = typeof redirect === 'string' && redirect
    ? decodeURIComponent(redirect)
    : '/pages/mine'
})

async function handleLogin() {
  loading.value = true
  try {
    await loginWithDemoAccount()
    uni.redirectTo({
      url: redirectUrl.value,
    })
  }
  finally {
    loading.value = false
  }
}

function openMinePage() {
  uni.redirectTo({
    url: '/pages/mine',
  })
}
</script>

<template>
  <view class="page px-5 py-8">
    <view class="login-panel">
      <text class="eyebrow">Starter Auth</text>
      <text class="title">登录与鉴权闭环</text>
      <text class="desc">脚手架内置 H5/微信登录凭证封装、Pinia 登录态和受保护页面跳转。</text>

      <view class="action-list">
        <wd-button
          block
          type="primary"
          :loading="loading"
          @click="handleLogin"
        >
          一键体验登录
        </wd-button>
        <wd-button plain block @click="openMinePage">
          访问我的页
        </wd-button>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  box-sizing: border-box;
  background: #f7f8fa;
}

.login-panel {
  display: flex;
  flex-direction: column;
  gap: 22rpx;
  padding: 40rpx 32rpx;
  border-radius: 24rpx;
  background: #fff;
}

.eyebrow {
  color: #2563eb;
  font-size: 22rpx;
  font-weight: 600;
}

.title {
  color: #101828;
  font-size: 44rpx;
  font-weight: 700;
}

.desc {
  color: #667085;
  font-size: 26rpx;
  line-height: 1.7;
}

.action-list {
  display: flex;
  flex-direction: column;
  gap: 18rpx;
  padding-top: 18rpx;
}
</style>
