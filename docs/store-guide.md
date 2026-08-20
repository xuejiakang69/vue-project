# 状态管理规范

> Pinia Store 的目录结构、命名规则和使用示例。

---

## 一、目录结构

```
src/stores/
├── index.js              # 汇总导出所有 Store
├── user/
│   ├── index.js          # 用户 Store
│   └── getters.js        # 用户相关计算属性（可选）
├── cart/
│   ├── index.js          # 购物车 Store
│   └── getters.js
├── product/
│   ├── index.js          # 商品 Store
│   └── getters.js
└── order/
    ├── index.js          # 订单 Store
    └── getters.js
```

---

## 二、命名规则

| 项目 | 规则 | 示例 |
|------|------|------|
| Store 名称 | `use` + 模块名 + `Store` | `useUserStore`、`useCartStore` |
| Store ID | 小写下划线或驼峰 | `'user'`、`'cart'` |
| 目录名 | 小写驼峰 | `user/`、`orderItem/` |

---

## 三、Store 模板

```javascript
// stores/user/index.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // ========== 状态 ==========
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref(null)
  const permissions = ref([])

  // ========== 计算属性 ==========
  const isLoggedIn = computed(() => !!token.value)
  const username = computed(() => userInfo.value?.name || '')

  // ========== 方法 ==========
  function setToken(newToken) {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  function setUserInfo(info) {
    userInfo.value = info
  }

  function hasPermission(perm) {
    return permissions.value.includes(perm)
  }

  function logout() {
    token.value = ''
    userInfo.value = null
    permissions.value = []
    localStorage.removeItem('token')
  }

  // ========== 返回 ==========
  return {
    // 状态
    token,
    userInfo,
    permissions,
    // 计算属性
    isLoggedIn,
    username,
    // 方法
    setToken,
    setUserInfo,
    hasPermission,
    logout
  }
})
```

---

## 四、汇总导出

```javascript
// stores/index.js
export { useUserStore } from './user'
export { useCartStore } from './cart'
export { useProductStore } from './product'
export { useOrderStore } from './order'
```

---

## 五、使用示例

```vue
<script setup>
import { useUserStore } from '@/stores'

const userStore = useUserStore()

// 读取状态
console.log(userStore.token)
console.log(userStore.isLoggedIn)

// 调用方法
userStore.setToken('xxx')
userStore.logout()
</script>
```

---

*文档创建时间：2026-08-20*
