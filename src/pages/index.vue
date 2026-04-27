<script setup lang="ts">
definePage({
  type: 'home',
  style: {
    navigationBarTitleText: '首页',
  },
})
</script>

<template>
  <view class="page">
    <view class="hero">
      <text class="hero-badge">Starter</text>
      <text class="hero-title">基础首页</text>
      <text class="hero-desc">只保留一个基础首页用于 H5 与微信小程序开发。</text>
      <view class="hero-meta">
        <text class="hero-chip">Vue 3</text>
        <text class="hero-chip">uni-app</text>
        <text class="hero-chip">TypeScript</text>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  padding: 32rpx;
  box-sizing: border-box;
  background:
    radial-gradient(circle at top left, rgb(120 160 255 / 18%), transparent 38%),
    linear-gradient(180deg, #f8fbff 0%, #eef4ff 100%);
}

.hero {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 40rpx 32rpx;
  border: 1rpx solid rgb(5 110 255 / 10%);
  border-radius: 28rpx;
  background: rgb(255 255 255 / 88%);
  box-shadow: 0 24rpx 60rpx rgb(38 76 168 / 10%);
}

.hero-badge {
  align-self: flex-start;
  padding: 10rpx 18rpx;
  border-radius: 999rpx;
  background: #056eff;
  color: #fff;
  font-size: 22rpx;
  letter-spacing: 2rpx;
}

.hero-title {
  font-size: 56rpx;
  font-weight: 700;
  color: #102347;
}

.hero-desc {
  font-size: 28rpx;
  line-height: 1.7;
  color: #4d5f85;
}

.hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.hero-chip {
  padding: 10rpx 18rpx;
  border-radius: 999rpx;
  background: #edf3ff;
  color: #3158a6;
  font-size: 24rpx;
}
</style>
