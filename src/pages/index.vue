<script setup lang="ts">
definePage({
  type: 'home',
  style: {
    navigationBarTitleText: '首页',
  },
})

const cards = [
  { title: '登录鉴权', path: '/pages/login' },
  { title: '图表页', path: '/pages/chart/index' },
  { title: '我的', path: '/pages/me' },
]

function go(path: string) {
  uni.navigateTo({ url: path })
}
</script>

<template>
  <view class="page">
    <uni-section title="Uni Starter v1" sub-title="uni-ui + alova + auth + chart" type="line" />
    <view class="card-list">
      <view v-for="item in cards" :key="item.path" class="card" @click="go(item.path)">
        <text class="card-title">{{ item.title }}</text>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.page {
  padding: 24rpx;
}

.card-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.card {
  padding: 24rpx;
  border-radius: 16rpx;
  background: #fff;
  border: 1rpx solid #ececec;
}

.card-title {
  font-size: 30rpx;
  color: #222;
}
</style>
