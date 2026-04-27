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

const capabilityCards = [
  {
    title: 'UnoCSS',
    tag: 'Style',
    description: '布局、间距、排版和常见视觉修饰优先走内置 utility，保持页面开发节奏。',
  },
  {
    title: '自动引入',
    tag: 'DX',
    description: '页面和组件开发时，大多数常用 API 与组件都不需要手动补 import。',
  },
  {
    title: 'Pinia 持久化',
    tag: 'State',
    description: '首页状态可以直接验证持久化效果，方便确认基础状态管理链路可用。',
  },
  {
    title: 'Wot 组件',
    tag: 'UI',
    description: '组件外观优先通过 props 配置，适合在真实业务页面中直接继续扩展。',
  },
] as const

function handleNoteInput(event: any) {
  const detailValue = event?.detail?.value
  const targetValue = event?.target?.value
  playground.setNote(detailValue ?? targetValue ?? '')
}
</script>

<template>
  <view class="page px-4 py-6">
    <view class="hero rounded-4xl border border-white/70 bg-white/86 p-6 backdrop-blur-sm">
      <view class="hero-top">
        <text class="hero-badge">Starter</text>
        <text class="hero-platform">H5 + mp-weixin</text>
      </view>

      <text class="hero-title mt-4">SolosUniapp 起步首页</text>
      <text class="hero-desc mt-3">
        一个更适合继续开发的起步页：保留基础工程能力展示，同时把首页结构收敛成更清晰的业务骨架。
      </text>

      <view class="hero-meta mt-5">
        <text class="hero-chip">Vue 3</text>
        <text class="hero-chip">UnoCSS</text>
        <text class="hero-chip">Pinia</text>
        <text class="hero-chip">Wot Design</text>
      </view>
    </view>

    <view class="section-grid pt-5">
      <view class="panel">
        <view class="panel-head">
          <text class="panel-title">开箱能力</text>
          <text class="panel-tag">Overview</text>
        </view>

        <view class="capability-grid">
          <view
            v-for="card in capabilityCards"
            :key="card.title"
            class="capability-card"
          >
            <view class="capability-head">
              <text class="capability-title">{{ card.title }}</text>
              <text class="capability-tag">{{ card.tag }}</text>
            </view>
            <text class="capability-copy">{{ card.description }}</text>
          </view>
        </view>
      </view>

      <view class="panel">
        <view class="panel-head">
          <text class="panel-title">样式与图标</text>
          <text class="panel-tag">UI</text>
        </view>

        <view class="showcase-card">
          <text class="showcase-copy">
            这里同时验证 UnoCSS 的渐变、阴影、圆角、排版，以及 Iconify 图标渲染是否正常。
          </text>

          <view class="showcase-icons">
            <view class="icon-card">
              <view class="icon-token i-carbon-color-palette text-sky-600" />
              <text class="icon-label">Palette</text>
            </view>
            <view class="icon-card">
              <view class="icon-token i-carbon-cloud-service-management text-violet-600" />
              <text class="icon-label">Cloud</text>
            </view>
            <view class="icon-card">
              <view class="icon-token i-mdi-lightning-bolt-circle text-amber-500" />
              <text class="icon-label">Action</text>
            </view>
            <view class="icon-card">
              <view class="icon-token i-mdi-check-decagram text-emerald-500" />
              <text class="icon-label">Ready</text>
            </view>
          </view>
        </view>
      </view>

      <view class="panel">
        <view class="panel-head">
          <text class="panel-title">状态与交互</text>
          <text class="panel-tag">Pinia</text>
        </view>

        <text class="panel-copy">刷新 H5 页面后，计数、状态和备注应继续保留。</text>

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

        <view class="action-row">
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
      </view>

      <view class="panel">
        <view class="panel-head">
          <text class="panel-title">Wot 组件验证</text>
          <text class="panel-tag">wot-design-uni</text>
        </view>

        <view class="wot-preview">
          <wd-tag type="primary">Wot 已加载</wd-tag>
          <wd-tag :type="enabled ? 'success' : 'warning'">{{ statusText }}</wd-tag>
          <wd-tag type="primary">Count {{ count }}</wd-tag>
        </view>

        <view class="action-row">
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
  background:
    radial-gradient(circle at top left, rgb(120 160 255 / 18%), transparent 38%),
    linear-gradient(180deg, #f8fbff 0%, #eef4ff 100%);
}

.hero {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  box-shadow: 0 24rpx 80rpx rgb(38 76 168 / 12%);
}

.hero-top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14rpx;
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

.hero-platform {
  padding: 10rpx 18rpx;
  border-radius: 999rpx;
  background: #edf5ff;
  color: #1d4ed8;
  font-size: 22rpx;
  font-weight: 600;
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

.section-grid {
  display: grid;
  gap: 32rpx;
}

.panel {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 28rpx;
  border: 1rpx solid rgb(15 23 42 / 6%);
  border-radius: 28rpx;
  background: rgb(255 255 255 / 92%);
  box-shadow: 0 18rpx 48rpx rgb(15 23 42 / 8%);
}

.panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20rpx;
}

.panel-title {
  font-size: 32rpx;
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

.capability-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20rpx;
}

.capability-card {
  display: flex;
  flex-direction: column;
  gap: 14rpx;
  border-radius: 24rpx;
  background: #f8fbff;
  padding: 24rpx;
}

.capability-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16rpx;
}

.capability-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #102347;
}

.capability-tag {
  padding: 8rpx 16rpx;
  border-radius: 999rpx;
  background: #e6f1ff;
  color: #3158a6;
  font-size: 20rpx;
}

.capability-copy {
  font-size: 24rpx;
  line-height: 1.6;
  color: #586987;
}

.showcase-card {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  border-radius: 24rpx;
  background: linear-gradient(90deg, #0ea5e9 0%, #22d3ee 50%, #34d399 100%);
  padding: 24rpx;
  color: #fff;
  box-shadow: 0 16rpx 40rpx rgb(14 165 233 / 20%);
}

.showcase-copy {
  font-size: 26rpx;
  line-height: 1.7;
  opacity: 0.94;
}

.showcase-icons {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.icon-card {
  display: flex;
  min-width: 140rpx;
  flex: 1 1 0%;
  flex-direction: column;
  align-items: center;
  gap: 14rpx;
  border-radius: 24rpx;
  background: rgb(255 255 255 / 16%);
  padding: 24rpx 18rpx;
}

.icon-token {
  font-size: 52rpx;
}

.icon-label {
  font-size: 24rpx;
  color: #fff;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20rpx;
}

.stat-card {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
  border-radius: 24rpx;
  background: #f8fbff;
  padding: 24rpx;
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

.note-box {
  display: flex;
  flex-direction: column;
  gap: 14rpx;
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
  gap: 16rpx;
}
</style>
