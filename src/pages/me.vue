<script setup lang="ts">
import { useAuthStore } from '@/core/auth/store'

definePage({
  style: {
    navigationBarTitleText: '我的',
  },
})

const authStore = useAuthStore()

function logout() {
  authStore.logout()
  uni.showToast({ title: '已退出', icon: 'none' })
  setTimeout(() => {
    uni.navigateTo({ url: '/pages/login' })
  }, 300)
}
</script>

<template>
  <view class="page">
    <uni-section title="用户信息" type="line" />
    <view class="card">
      <text>登录状态：{{ authStore.isLoggedIn ? '已登录' : '未登录' }}</text>
      <text>用户ID：{{ authStore.userId || '-' }}</text>
      <text>Token：{{ authStore.token ? '已设置' : '未设置' }}</text>
    </view>
    <button class="logout-btn" @click="logout">退出登录</button>
  </view>
</template>

<style scoped lang="scss">
.page {
  padding: 24rpx;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  padding: 24rpx;
  border: 1rpx solid #ececec;
  border-radius: 16rpx;
  background: #fff;
}

.logout-btn {
  margin-top: 24rpx;
}
</style>
