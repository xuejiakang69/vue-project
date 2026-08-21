import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getUserInfo } from '@/api/auth'

/**
 * 用户状态管理
 */
export const useUserStore = defineStore('user', () => {
  // ========== 状态 ==========

  /**
   * JWT Token
   */
  const token = ref(localStorage.getItem('token') || '')

  /**
   * 用户信息
   */
  const userInfo = ref(null)

  // ========== 计算属性 ==========

  /**
   * 是否已登录
   */
  const isLoggedIn = computed(() => !!token.value)

  /**
   * 用户 ID
   */
  const userId = computed(() => userInfo.value?.userId || '')

  /**
   * 用户名
   */
  const username = computed(() => userInfo.value?.username || '')

  /**
   * 真实姓名
   */
  const realName = computed(() => userInfo.value?.realName || '')

  /**
   * 是否需要修改密码
   */
  const needChangePassword = computed(() => userInfo.value?.needChangePassword || false)

  // ========== 方法 ==========

  /**
   * 设置 Token
   * @param {string} newToken - JWT Token
   */
  function setToken(newToken) {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  /**
   * 获取 Token
   * @returns {string} JWT Token
   */
  function getToken() {
    return token.value
  }

  /**
   * 设置用户信息
   * @param {object} info - 用户信息
   */
  function setUserInfo(info) {
    userInfo.value = info
  }

  /**
   * 获取用户信息（从后端接口）
   * @returns {Promise<object>} 用户信息
   */
  async function fetchUserInfo() {
    try {
      const res = await getUserInfo()
      if (res.code === 200) {
        userInfo.value = res.data
        return res.data
      }
      throw new Error(res.message)
    } catch (error) {
      throw error
    }
  }

  /**
   * 退出登录
   */
  function logout() {
    token.value = ''
    userInfo.value = null
    localStorage.removeItem('token')
  }

  // ========== 返回 ==========
  return {
    // 状态
    token,
    userInfo,
    // 计算属性
    isLoggedIn,
    userId,
    username,
    realName,
    needChangePassword,
    // 方法
    setToken,
    getToken,
    setUserInfo,
    fetchUserInfo,
    logout
  }
})
