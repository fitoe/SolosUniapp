<script setup lang="ts">
definePage({
  style: {
    navigationBarTitleText: '图表',
  },
})

const columnChartData = {
  categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  series: [
    {
      name: '访问量',
      data: [32, 68, 45, 80, 56],
    },
  ],
}

const lineChartData = {
  categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  series: [
    {
      name: '新增用户',
      data: [12, 21, 18, 26, 30, 22, 28],
    },
    {
      name: '活跃用户',
      data: [35, 40, 38, 45, 52, 49, 55],
    },
  ],
}

const pieChartData = {
  series: [
    {
      name: '微信',
      data: 45,
    },
    {
      name: '抖音',
      data: 25,
    },
    {
      name: '快手',
      data: 15,
    },
    {
      name: '小红书',
      data: 15,
    },
  ],
}
</script>

<template>
  <view class="page">
    <uni-section title="柱状图" type="line" />
    <view class="chart-wrap">
      <qiun-data-charts type="column" :chart-data="columnChartData" />
    </view>

    <uni-section title="折线图" type="line" />
    <view class="chart-wrap">
      <qiun-data-charts type="line" :chart-data="lineChartData" />
    </view>

    <uni-section title="饼图" type="line" />
    <view class="chart-wrap">
      <qiun-data-charts type="pie" :chart-data="pieChartData" />
    </view>

    <view class="tip">
      当前已接入 qiun-data-charts，可用于微信/抖音/快手/小红书等小程序端。
    </view>
  </view>
</template>

<style scoped lang="scss">
.page {
  padding: 24rpx;
}

.chart-wrap {
  width: 100%;
  height: 420rpx;
  margin-bottom: 12rpx;
  border-radius: 16rpx;
  background: #fff;
  border: 1rpx solid #ececec;
  overflow: hidden;
}

.tip {
  margin-top: 20rpx;
  color: #888;
  font-size: 24rpx;
}
</style>
