<script setup lang="ts">
definePage({
  type: 'home',
  style: {
    navigationBarTitleText: '首页',
  },
})

const playground = useHomePlaygroundStore()
const { count, enabled, note } = storeToRefs(playground)

const statusText = computed(() => enabled.value ? '已开启' : '已暂停')
const noteSummary = computed(() => note.value.trim() || '尚未填写摘要')

function handleNoteInput(event: any) {
  const detailValue = event?.detail?.value
  const targetValue = event?.target?.value
  playground.setNote(detailValue ?? targetValue ?? '')
}
</script>

<template>
  <view class="page px-4 py-7">
    <view class="hero">
      <text class="hero-badge">Starter</text>
      <text class="hero-title">SolosUniapp 起步首页</text>
      <text class="hero-desc">保留基础能力验证，首页尽量轻，方便直接继续开发。</text>
      <view class="hero-meta">
        <text class="hero-chip">Vue 3</text>
        <text class="hero-chip">UnoCSS</text>
        <text class="hero-chip">Pinia</text>
        <text class="hero-chip">Wot Design</text>
      </view>
    </view>

    <view class="section-grid">
      <view class="panel">
        <view class="panel-head compact">
          <text class="panel-title">基础能力</text>
          <text class="panel-tag">Playground</text>
        </view>

        <view class="feature-grid">
          <view class="feature-card feature-card-brand">
            <view class="feature-icon i-carbon-color-palette" />
            <text class="feature-title">UnoCSS</text>
            <text class="feature-copy">渐变、圆角、间距与排版。</text>
          </view>
          <view class="feature-card feature-card-tint">
            <view class="feature-icon i-mdi-auto-fix text-violet-600" />
            <text class="feature-title">自动引入</text>
            <text class="feature-copy">常用 API 默认不手动导入。</text>
          </view>
          <view class="feature-card feature-card-tint">
            <view class="feature-icon i-mdi-database-sync text-emerald-600" />
            <text class="feature-title">Pinia</text>
            <text class="feature-copy">状态持久化与输入绑定。</text>
          </view>
          <view class="feature-card">
            <view class="feature-icon i-mdi-check-decagram text-amber-500" />
            <text class="feature-title">Wot</text>
            <text class="feature-copy">组件与 props 配置链路。</text>
          </view>
        </view>
      </view>

      <view class="panel">
        <view class="panel-head compact">
          <text class="panel-title">状态与交互</text>
          <text class="panel-tag">Persist</text>
        </view>

        <text class="panel-copy">刷新后，计数、状态和摘要应继续保留。</text>

        <view class="info-block">
          <view class="stats-grid">
            <view class="stat-card">
              <text class="stat-label">当前计数</text>
              <text class="stat-value" data-testid="count-value">{{ count }}</text>
            </view>
            <view class="stat-card">
              <text class="stat-label">开关状态</text>
              <text class="stat-value" data-testid="status-value">{{ statusText }}</text>
            </view>
          </view>

          <view class="wot-preview">
            <wd-tag type="primary">Wot 已加载</wd-tag>
            <wd-tag :type="enabled ? 'success' : 'warning'">{{ statusText }}</wd-tag>
            <wd-tag type="primary">Count {{ count }}</wd-tag>
          </view>
        </view>

        <view class="action-row action-row-primary">
          <wd-button type="primary" size="small" @click="playground.increment">+1 计数</wd-button>
          <wd-button size="small" plain @click="playground.decrement">-1 计数</wd-button>
          <wd-button type="success" size="small" @click="playground.toggleEnabled">切换状态</wd-button>
        </view>

        <view class="note-box">
          <text class="note-label">备注输入</text>
          <input
            class="note-input"
            :value="note"
            placeholder="输入一段说明，检查 Pinia 和输入绑定"
            @input="handleNoteInput"
          >
          <text class="note-summary" data-testid="note-summary">摘要：{{ noteSummary }}</text>
        </view>

        <view class="action-row action-row-secondary">
          <wd-button block type="warning" @click="playground.setNote('Wot button clicked')">Wot 设置摘要</wd-button>
          <wd-button hairline block @click="playground.reset">重置状态</wd-button>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  box-sizing: border-box;
  padding-bottom: 40rpx;
  background:
    radial-gradient(circle at top left, rgb(120 160 255 / 18%), transparent 38%),
    linear-gradient(180deg, #f8fbff 0%, #eef4ff 100%);
}

.hero {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  padding: 44rpx 36rpx;
  border: 1rpx solid rgb(5 110 255 / 10%);
  border-radius: 28rpx;
  background: rgb(255 255 255 / 88%);
  box-shadow: 0 24rpx 80rpx rgb(38 76 168 / 12%);
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
  max-width: 720rpx;
  font-size: 28rpx;
  line-height: 1.7;
  color: #4d5f85;
}

.hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 18rpx;
}

.hero-chip {
  padding: 10rpx 18rpx;
  border-radius: 999rpx;
  background: #edf3ff;
  color: #3158a6;
  font-size: 24rpx;
}

.section-grid {
  display: grid;
  gap: 28rpx;
  padding-top: 28rpx;
}

.panel {
  display: flex;
  flex-direction: column;
  gap: 22rpx;
  padding: 30rpx;
  border: 1rpx solid rgb(15 23 42 / 6%);
  border-radius: 24rpx;
  background: rgb(255 255 255 / 92%);
  box-shadow: 0 16rpx 42rpx rgb(15 23 42 / 8%);
}

.panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16rpx;
}

.panel-head.compact {
  align-items: flex-start;
}

.panel-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #102347;
}

.panel-tag {
  padding: 8rpx 18rpx;
  border-radius: 999rpx;
  background: #eff6ff;
  color: #1d4ed8;
  font-size: 22rpx;
}

.panel-copy {
  font-size: 26rpx;
  line-height: 1.6;
  color: #5b6785;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20rpx;
}

.feature-card {
  display: flex;
  flex-direction: column;
  gap: 14rpx;
  border-radius: 20rpx;
  background: #f8fbff;
  padding: 24rpx 22rpx;
}

.feature-card-brand {
  background: linear-gradient(135deg, #0ea5e9 0%, #22d3ee 55%, #34d399 100%);
  color: #fff;
}

.feature-card-tint {
  background: linear-gradient(180deg, #fbfdff 0%, #f1f6ff 100%);
  border: 1rpx solid rgb(49 88 166 / 8%);
}

.feature-icon {
  font-size: 44rpx;
  color: #0f5fd7;
}

.feature-card-brand .feature-icon,
.feature-card-brand .feature-title,
.feature-card-brand .feature-copy {
  color: #fff;
}

.feature-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #102347;
}

.feature-copy {
  font-size: 23rpx;
  line-height: 1.55;
  color: #5b6785;
}

.info-block {
  display: flex;
  flex-direction: column;
  gap: 18rpx;
  border-radius: 20rpx;
  background: #f8fbff;
  padding: 22rpx;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16rpx;
}

.stat-card {
  display: flex;
  flex-direction: column;
  gap: 14rpx;
  border-radius: 20rpx;
  background: #fff;
  padding: 22rpx;
}

.stat-label {
  font-size: 22rpx;
  color: #6b7a99;
}

.stat-value {
  font-size: 44rpx;
  font-weight: 700;
  color: #102347;
}

.action-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.action-row-primary {
  padding-top: 4rpx;
}

.action-row-secondary {
  padding-top: 8rpx;
  border-top: 1rpx solid rgb(15 23 42 / 6%);
}

.note-box {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.note-label {
  font-size: 24rpx;
  font-weight: 600;
  color: #213356;
}

.note-input {
  min-height: 84rpx;
  border: 1rpx solid #d8e3ff;
  border-radius: 22rpx;
  background: #fff;
  padding: 0 24rpx;
  font-size: 26rpx;
  color: #102347;
}

.note-summary {
  font-size: 24rpx;
  color: #52627f;
}

.wot-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 14rpx;
}
</style>
