<template>
  <div class="login-container">
    <el-card class="login-card">
      <div class="login-header">
        <h2>商城管理系统</h2>
        <p>中后台管理平台</p>
      </div>

      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        class="login-form"
        @keyup.enter="handleLogin"
      >
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
            prefix-icon="User"
            size="large"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            size="large"
            show-password
          />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            size="large"
            class="login-btn"
            :loading="loading"
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>

        <div class="login-footer">
          <router-link to="/apply-account" class="apply-link">
            申请账号
          </router-link>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { login } from '@/api/auth'
import { useUserStore } from '@/stores'

const router = useRouter()
const userStore = useUserStore()
const formRef = ref(null)
const loading = ref(false)

// 表单数据
const form = reactive({
  username: '',
  password: ''
})

// 表单验证规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
}

// 登录处理
async function handleLogin() {
  // 表单验证
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return

  loading.value = true
  try {
    const res = await login({
      username: form.username,
      password: form.password
    })

    if (res.code === 200) {
      // 保存 token
      userStore.setToken(res.data.token)
      // 保存用户信息
      userStore.setUserInfo(res.data.userInfo)

      ElMessage.success('登录成功')

      // 检查是否需要修改密码
      if (res.data.needChangePassword) {
        router.push('/change-password')
      } else {
        router.push('/')
      }
    }
  } catch (error) {
    // 错误已在 request.js 中处理
    console.error('登录失败:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  width: 400px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h2 {
  font-size: 28px;
  color: #303133;
  margin: 0 0 8px 0;
}

.login-header p {
  font-size: 14px;
  color: #909399;
  margin: 0;
}

.login-form {
  padding: 0 10px;
}

.login-btn {
  width: 100%;
}

.login-footer {
  text-align: center;
  margin-top: 16px;
}

.apply-link {
  color: #409eff;
  text-decoration: none;
  font-size: 14px;
}

.apply-link:hover {
  text-decoration: underline;
}
</style>
