<script setup lang="ts">
definePage({
  style: {
    navigationBarTitleText: '我的',
  },
})

const authStore = useAuthStore()
const displayName = computed(() => authStore.user?.nickname || '未登录用户')
const accountId = computed(() => authStore.userId || '-')

onShow(() => {
  if (!authStore.isLoggedIn) {
    uni.redirectTo({
      url: '/pages/login?redirect=%2Fpages%2Fmine',
    })
  }
})

function handleLogout() {
  authStore.logout()
  uni.redirectTo({
    url: '/pages/login',
  })
}
</script>

<template>
  <view class="page px-5 py-8">
    <view class="profile-panel">
      <view class="avatar">
        <text>{{ displayName.slice(0, 1) }}</text>
      </view>
      <view class="profile-main">
        <text class="name">{{ displayName }}</text>
        <text class="meta">账号：{{ accountId }}</text>
      </view>
    </view>

    <view class="section">
      <view class="row">
        <text class="row-label">登录状态</text>
        <wd-tag :type="authStore.isLoggedIn ? 'success' : 'warning'">
          {{ authStore.isLoggedIn ? '已登录' : '未登录' }}
        </wd-tag>
      </view>
      <view class="row">
        <text class="row-label">Token</text>
        <text class="row-value">{{ authStore.token || '-' }}</text>
      </view>
    </view>

    <wd-button block type="warning" @click="handleLogout">
      退出登录
    </wd-button>
  </view>
</template>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  box-sizing: border-box;
  background: #f7f8fa;
}

.profile-panel,
.section {
  margin-bottom: 24rpx;
  border-radius: 24rpx;
  background: #fff;
  padding: 30rpx;
}

.profile-panel {
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
  background: #2563eb;
  color: #fff;
  font-size: 42rpx;
  font-weight: 700;
}

.profile-main {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: 10rpx;
}

.name {
  color: #101828;
  font-size: 34rpx;
  font-weight: 700;
}

.meta,
.row-value {
  color: #667085;
  font-size: 24rpx;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 22rpx;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20rpx;
}

.row-label {
  color: #344054;
  font-size: 26rpx;
  font-weight: 600;
}

.row-value {
  min-width: 0;
  flex: 1;
  overflow: hidden;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
