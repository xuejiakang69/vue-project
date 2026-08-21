<template>
  <div class="apply-container">
    <el-card class="apply-card">
      <div class="header">
        <h2>申请账号</h2>
        <p>填写以下信息提交申请，等待管理员审批</p>
      </div>

      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="100px"
        class="form"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名（登录使用）"
          />
        </el-form-item>

        <el-form-item label="真实姓名" prop="realName">
          <el-input
            v-model="form.realName"
            placeholder="请输入真实姓名"
          />
        </el-form-item>

        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="form.phone"
            placeholder="请输入手机号"
          />
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="form.email"
            placeholder="请输入邮箱"
          />
        </el-form-item>

        <el-form-item label="部门" prop="department">
          <el-input
            v-model="form.department"
            placeholder="请输入部门"
          />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            :loading="loading"
            @click="handleSubmit"
          >
            提交申请
          </el-button>
          <el-button @click="handleBack">
            返回登录
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
import { applyAccount } from '@/api/auth'

const router = useRouter()
const formRef = ref(null)
const loading = ref(false)

// 表单数据
const form = reactive({
  username: '',
  realName: '',
  phone: '',
  email: '',
  department: ''
})

// 表单验证规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度应在3-20位之间', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线', trigger: 'blur' }
  ],
  realName: [
    { required: true, message: '请输入真实姓名', trigger: 'blur' }
  ],
  phone: [
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  email: [
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ]
}

// 提交处理
async function handleSubmit() {
  // 表单验证
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return

  loading.value = true
  try {
    const res = await applyAccount({
      username: form.username,
      realName: form.realName,
      phone: form.phone,
      email: form.email,
      department: form.department
    })

    if (res.code === 200) {
      ElMessage.success('申请已提交，请等待管理员审批')
      // 跳转登录页
      router.push('/login')
    }
  } catch (error) {
    // 错误已在 request.js 中处理
    console.error('申请失败:', error)
  } finally {
    loading.value = false
  }
}

// 返回登录页
function handleBack() {
  router.push('/login')
}
</script>

<style scoped>
.apply-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.apply-card {
  width: 500px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h2 {
  font-size: 28px;
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
