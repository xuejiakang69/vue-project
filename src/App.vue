<template>
  <div id="app">
    <!-- 登录页和申请页不显示导航栏 -->
    <nav v-if="showNav" class="nav">
      <router-link to="/">首页</router-link>
      <router-link to="/about">关于</router-link>
      <div class="nav-right">
        <span class="user-info">{{ userStore.realName || userStore.username }}</span>
        <el-button type="text" @click="handleLogout">退出</el-button>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

// 是否显示导航栏
const showNav = computed(() => {
  const hiddenPaths = ['/login', '/apply-account']
  return !hiddenPaths.includes(route.path)
})

// 退出登录
function handleLogout() {
  userStore.logout()
  ElMessage.success('已退出登录')
  router.push('/login')
}
</script>

<style scoped>
.nav {
  display: flex;
  gap: 20px;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  align-items: center;
}

.nav a {
  color: #333;
  text-decoration: none;
  padding: 5px 15px;
  border-radius: 4px;
  transition: background 0.3s;
}

.nav a:hover,
.nav a.router-link-active {
  background: #ecf5ff;
  color: #409eff;
}

.nav-right {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-info {
  color: #606266;
  font-size: 14px;
}
</style>
