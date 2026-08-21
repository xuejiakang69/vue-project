<template>
  <div class="change-password-container">
    <el-card class="change-password-card">
      <div class="header">
        <h2>修改密码</h2>
        <p>您的密码已过期，请修改密码后继续使用</p>
      </div>

      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="100px"
        class="form"
      >
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input
            v-model="form.oldPassword"
            type="password"
            placeholder="请输入旧密码"
            show-password
          />
        </el-form-item>

        <el-form-item label="新密码" prop="newPassword">
          <el-input
            v-model="form.newPassword"
            type="password"
            placeholder="请输入新密码（6-20位）"
            show-password
          />
        </el-form-item>

        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            v-model="form.confirmPassword"
            type="password"
            placeholder="请再次输入新密码"
            show-password
          />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            :loading="loading"
            @click="handleSubmit"
          >
            确认修改
          </el-button>
          <el-button @click="handleCancel">
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { changePassword } from '@/api/auth'
import { useUserStore } from '@/stores'

const router = useRouter()
const userStore = useUserStore()
const formRef = ref(null)
const loading = ref(false)

// 表单数据
const form = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 自定义验证：确认密码
const validateConfirmPassword = (rule, value, callback) => {
  if (value !== form.newPassword) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

// 自定义验证：新密码不能与旧密码相同
const validateNewPassword = (rule, value, callback) => {
  if (value === form.oldPassword) {
    callback(new Error('新密码不能与旧密码相同'))
  } else {
    callback()
  }
}

// 表单验证规则
const rules = {
  oldPassword: [
    { required: true, message: '请输入旧密码', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度应在6-20位之间', trigger: 'blur' },
    { validator: validateNewPassword, trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ]
}

// 提交处理
async function handleSubmit() {
  // 表单验证
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return

  loading.value = true
  try {
    const res = await changePassword({
      oldPassword: form.oldPassword,
      newPassword: form.newPassword
    })

    if (res.code === 200) {
      ElMessage.success('密码修改成功，请重新登录')
      // 退出登录
      userStore.logout()
      // 跳转登录页
      router.push('/login')
    }
  } catch (error) {
    // 错误已在 request.js 中处理
    console.error('修改密码失败:', error)
  } finally {
    loading.value = false
  }
}

// 取消处理
function handleCancel() {
  router.push('/')
}
</script>

<style scoped>
.change-password-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f7fa;
}

.change-password-card {
  width: 500px;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h2 {
  font-size: 24px;
  color: #303133;
  margin: 0 0 8px 0;
}

.header p {
  font-size: 14px;
  color: #909399;
  margin: 0;
}

.form {
  padding: 0 20px;
}
</style>
