import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * 应用状态管理（保留原有功能）
 */
export const useAppStore = defineStore('app', () => {
  const count = ref(0)
  const name = ref('')

  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }

  function reset() {
    count.value = 0
    name.value = ''
  }

  return { count, name, increment, decrement, reset }
})

// 导出用户状态管理
export { useUserStore } from './user/index.js'
