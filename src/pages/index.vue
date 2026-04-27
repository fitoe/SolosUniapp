<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useHomePlaygroundStore } from '@/stores/home-playground'

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
  <view class="page px-4 py-6">
    <view class="hero rounded-4xl border border-white/70 bg-white/86 p-6 shadow-[0_24rpx_80rpx_rgba(38,76,168,0.12)] backdrop-blur-sm">
      <view class="flex flex-wrap items-center gap-3">
        <text class="hero-badge">Playground</text>
        <text class="rounded-full bg-sky-50 px-3 py-1 text-xs text-sky-700 font-semibold">H5 + mp-weixin</text>
        <text class="rounded-full bg-emerald-50 px-3 py-1 text-xs text-emerald-700 font-semibold">Smoke Test</text>
      </view>
      <text class="hero-title mt-4">SolosUniapp 能力面板</text>
      <text class="hero-desc mt-3">一个首页同时验证 UnoCSS、Iconify、Pinia 持久化和 Wot 组件是否正常可用。</text>
      <view class="hero-meta mt-5">
        <text class="hero-chip">Vue 3</text>
        <text class="hero-chip">UnoCSS</text>
        <text class="hero-chip">Pinia</text>
        <text class="hero-chip">Wot Design</text>
      </view>
    </view>

    <view class="grid gap-4 pt-5">
      <view class="panel">
        <view class="panel-head">
          <text class="panel-title">UnoCSS 样式验证</text>
          <text class="panel-tag">Utilities</text>
        </view>
        <view class="rounded-3xl from-sky-500 via-cyan-400 to-emerald-400 bg-gradient-to-r p-4 text-white shadow-lg">
          <text class="block text-sm opacity-90">渐变、阴影、圆角、间距、原子类布局都应正常生效。</text>
          <view class="mt-3 flex flex-wrap gap-2">
            <text class="rounded-full bg-white/20 px-3 py-1 text-xs font-medium">rounded-3xl</text>
            <text class="rounded-full bg-white/20 px-3 py-1 text-xs font-medium">shadow-lg</text>
            <text class="rounded-full bg-white/20 px-3 py-1 text-xs font-medium">bg-gradient-to-r</text>
          </view>
        </view>
      </view>

      <view class="panel">
        <view class="panel-head">
          <text class="panel-title">Iconify 图标验证</text>
          <text class="panel-tag">Icons</text>
        </view>
        <view class="flex flex-wrap gap-3">
          <view class="icon-card">
            <view class="i-carbon-color-palette icon-token text-sky-600" />
            <text class="icon-label">Carbon</text>
          </view>
          <view class="icon-card">
            <view class="i-carbon-cloud-service-management icon-token text-violet-600" />
            <text class="icon-label">Cloud</text>
          </view>
          <view class="icon-card">
            <view class="i-mdi-lightning-bolt-circle icon-token text-amber-500" />
            <text class="icon-label">MDI</text>
          </view>
          <view class="icon-card">
            <view class="i-mdi-check-decagram icon-token text-emerald-500" />
            <text class="icon-label">State</text>
          </view>
        </view>
      </view>

      <view class="panel">
        <view class="panel-head">
          <text class="panel-title">Pinia 状态验证</text>
          <text class="panel-tag">Persist</text>
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

.icon-card {
  display: flex;
  min-width: 140rpx;
  flex: 1 1 0%;
  flex-direction: column;
  align-items: center;
  gap: 14rpx;
  border-radius: 24rpx;
  background: #f8fbff;
  padding: 24rpx 18rpx;
}

.icon-token {
  font-size: 52rpx;
}

.icon-label {
  font-size: 24rpx;
  color: #415276;
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
