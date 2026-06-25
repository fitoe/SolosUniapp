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
  <view class="page px-4 py-6">
    <view class="page-head">
      <text class="eyebrow">Charts</text>
      <text class="title">图表示例</text>
      <text class="desc">恢复 qiun-data-charts，保留柱状图、折线图和饼图的最小可运行样例。</text>
    </view>

    <view class="chart-list">
      <view class="chart-card">
        <view class="card-head">
          <text class="card-title">柱状图</text>
          <wd-tag type="primary">column</wd-tag>
        </view>
        <view class="chart-wrap" data-testid="column-chart">
          <qiun-data-charts type="column" :chart-data="columnChartData" />
        </view>
      </view>

      <view class="chart-card">
        <view class="card-head">
          <text class="card-title">折线图</text>
          <wd-tag type="success">line</wd-tag>
        </view>
        <view class="chart-wrap" data-testid="line-chart">
          <qiun-data-charts type="line" :chart-data="lineChartData" />
        </view>
      </view>

      <view class="chart-card">
        <view class="card-head">
          <text class="card-title">饼图</text>
          <wd-tag type="warning">pie</wd-tag>
        </view>
        <view class="chart-wrap" data-testid="pie-chart">
          <qiun-data-charts type="pie" :chart-data="pieChartData" />
        </view>
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

.page-head {
  display: flex;
  flex-direction: column;
  gap: 14rpx;
  margin-bottom: 24rpx;
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

.chart-list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.chart-card {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 28rpx;
  border: 1rpx solid rgb(16 24 40 / 6%);
  border-radius: 20rpx;
  background: #fff;
}

.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20rpx;
}

.card-title {
  color: #101828;
  font-size: 30rpx;
  font-weight: 600;
}

.chart-wrap {
  width: 100%;
  height: 420rpx;
  overflow: hidden;
  border: 1rpx solid #eaecf0;
  border-radius: 16rpx;
  background: #fff;
}
</style>
