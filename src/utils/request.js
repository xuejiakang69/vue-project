import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 自动读取 .env 中的 API 前缀
  timeout: 15000,
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 从 localStorage 获取 token
    const token = localStorage.getItem('token')
    if (token) {
      // 将 token 添加到请求头
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data

    // 根据后端约定的 code 判断请求是否成功
    if (res.code !== undefined && res.code !== 200) {
      ElMessage.error(res.message || '请求失败')
      return Promise.reject(new Error(res.message || '请求失败'))
    }

    return res
  },
  (error) => {
    const { response } = error

    if (response) {
      const errorMessages = {
        400: '请求参数错误',
        401: '未授权，请重新登录',
        403: '拒绝访问',
        404: '请求资源不存在',
        500: '服务器内部错误',
      }
      const message = errorMessages[response.status] || `连接错误 ${response.status}`
      ElMessage.error(message)

      // 401 清除 token 并跳转登录页
      if (response.status === 401) {
        localStorage.removeItem('token')
        router.push('/login')
      }
    } else {
      ElMessage.error('网络连接异常，请检查网络')
    }

    return Promise.reject(error)
  }
)

export default service
