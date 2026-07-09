<script setup>
import { ref } from 'vue'

const count = ref(0)
const name = ref('')
</script>

<template>
  <div class="container">
    <h1>Vue 3 + Vite + Element Plus</h1>
    <p>项目已成功创建！</p>

    <div class="demo-section">
      <h2>Element Plus 组件演示</h2>

      <!-- 按钮组件 -->
      <div class="demo-item">
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">危险按钮</el-button>
      </div>

      <!-- 输入框组件 -->
      <div class="demo-item">
        <el-input v-model="name" placeholder="请输入姓名" style="width: 300px" />
        <span v-if="name">你好, {{ name }}!</span>
      </div>

      <!-- 计数器组件 -->
      <div class="demo-item">
        <el-input-number v-model="count" :min="0" :max="10" />
        <span style="margin-left: 10px">计数: {{ count }}</span>
      </div>

      <!-- 消息提示 -->
      <div class="demo-item">
        <el-button @click="$message.success('操作成功！')">显示成功消息</el-button>
        <el-button @click="$message.info('这是一条消息')">显示普通消息</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.demo-section {
  margin-top: 30px;
}

.demo-item {
  margin: 20px 0;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
}
</style>
