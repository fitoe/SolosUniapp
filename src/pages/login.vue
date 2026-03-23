<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/core/auth/store'

definePage({
  style: {
    navigationBarTitleText: '登录',
  },
})

const authStore = useAuthStore()
const form = ref({
  username: '',
  password: '',
})

function submit() {
  if (!form.value.username || !form.value.password) {
    uni.showToast({ title: '请输入账号和密码', icon: 'none' })
    return
  }
  authStore.setUserId(form.value.username)
  authStore.setToken(`token_${Date.now()}`)
  uni.showToast({ title: '登录成功', icon: 'success' })
  setTimeout(() => {
    uni.switchTab({ url: '/pages/me' })
  }, 300)
}
</script>

<template>
  <view class="page">
    <uni-section title="账号登录" type="line" />
    <view class="form-item">
      <input v-model="form.username" class="input" placeholder="用户名">
    </view>
    <view class="form-item">
      <input v-model="form.password" class="input" :password="true" placeholder="密码">
    </view>
    <button class="submit-btn" @click="submit">登录</button>
  </view>
</template>

<style scoped lang="scss">
.page {
  padding: 24rpx;
}

.form-item {
  margin-bottom: 20rpx;
}

.input {
  width: 100%;
  box-sizing: border-box;
  padding: 20rpx;
  border-radius: 12rpx;
  border: 1rpx solid #ddd;
  background: #fff;
}

.submit-btn {
  margin-top: 24rpx;
  background: #056eff;
  color: #fff;
}
</style>
