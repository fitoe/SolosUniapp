<script setup lang="ts">
import type { ExampleItem } from '@/features/example-items/service'
import { getExampleItem } from '@/features/example-items/service'

definePage({ style: { navigationBarTitleText: '详情示例' } })

const item = ref<ExampleItem>()
const loading = ref(true)
const error = ref('')
let itemId = ''

async function loadItem() {
  loading.value = true
  error.value = ''
  try {
    item.value = await getExampleItem(itemId)
  }
  catch {
    error.value = '加载失败，请重试'
  }
  finally {
    loading.value = false
  }
}

onLoad((query) => {
  itemId = typeof query?.id === 'string' ? query.id : ''
  void loadItem()
})
</script>

<template>
  <view class="p-4">
    <view v-if="loading">加载中…</view>
    <view v-else-if="error">
      <text>{{ error }}</text>
      <button @click="loadItem">重试</button>
    </view>
    <view v-else-if="!item">未找到该事项</view>
    <view v-else>
      <view>{{ item.name }}</view>
      <text>{{ item.description }}</text>
    </view>
  </view>
</template>
