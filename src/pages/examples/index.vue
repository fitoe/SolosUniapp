<script setup lang="ts">
import type { ExampleItem } from '@/features/example-items/service'
import { listExampleItems } from '@/features/example-items/service'

definePage({ style: { navigationBarTitleText: '列表示例' } })

const items = ref<ExampleItem[]>([])
const loading = ref(false)
const error = ref('')

async function loadItems() {
  loading.value = true
  error.value = ''
  try {
    items.value = await listExampleItems()
  }
  catch {
    error.value = '加载失败，请重试'
  }
  finally {
    loading.value = false
  }
}

onLoad(loadItems)
</script>

<template>
  <view class="p-4">
    <text>本地演示数据，请按业务替换。</text>
    <view v-if="loading">加载中…</view>
    <view v-else-if="error">
      <text>{{ error }}</text>
      <button @click="loadItems">重试</button>
    </view>
    <view v-else-if="!items.length">暂无数据</view>
    <navigator v-for="item in items" v-else :key="item.id" :url="`/pages/examples/detail?id=${encodeURIComponent(item.id)}`" class="py-3">
      {{ item.name }}
    </navigator>
  </view>
</template>
