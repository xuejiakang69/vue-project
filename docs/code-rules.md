# 代码生成规则

> Claude 生成或修改代码时必须遵循以下规则。

---

## 一、文件命名规范

| 类型 | 命名规则 | 示例 |
|------|----------|------|
| 页面组件 | PascalCase + View 后缀 | `HomeView.vue`、`UserListView.vue` |
| 公共组件 | PascalCase | `ProductCard.vue`、`SearchBar.vue` |
| 布局组件 | PascalCase + Layout 后缀 | `AdminLayout.vue` |
| Store | camelCase + 目录结构 | `stores/user/index.js` |
| 工具函数 | camelCase | `request.js`、`formatDate.js` |
| 组合式函数 | camelCase + use 前缀 | `useAuth.js`、`useCart.js` |
| API 接口 | camelCase | `user.js`、`product.js` |

---

## 二、Vue 组件结构顺序

```vue
<script setup>
// 1. 导入
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

// 2. 组合式函数
const router = useRouter()

// 3. Props / Emits
const props = defineProps({...})
const emit = defineEmits([...])

// 4. 响应式状态
const loading = ref(false)
const list = ref([])

// 5. 计算属性
const filteredList = computed(() => ...)

// 6. 方法
const fetchData = async () => {...}

// 7. 生命周期
onMounted(() => {
  fetchData()
})
</script>

<template>
  <!-- 模板内容 -->
</template>

<style lang="scss" scoped>
/* 样式内容 */
</style>
```

---

## 三、代码注释要求

| 场景 | 要求 | 示例 |
|------|------|------|
| 复杂逻辑 | 必须添加注释说明意图 | `// 分页计算：当前页从1开始，偏移量需要减1` |
| 魔法数字 | 必须用常量或注释说明含义 | `const MAX_RETRY = 3 // 最大重试次数` |
| 待处理项 | 使用 TODO/FIXME 标记 | `// TODO: 对接后端接口` |
| 函数说明 | 复杂函数添加 JSDoc | `/** 获取用户列表 @param {number} page 页码 */` |

---

## 四、文档同步规则

每次生成或修改代码后，必须检查并更新对应文档：

| 触发条件 | 更新文档 | 更新内容 |
|----------|----------|----------|
| 新增/修改 API 接口 | `docs/api.md` | 添加接口记录（方法、参数、返回值、Mock 状态） |
| 新增公共组件 | `docs/components.md` | 添加组件使用说明 |
| 修改项目结构 | `CLAUDE.md` | 更新目录结构 |
| 修改路由配置 | `CLAUDE.md` | 更新路由表 |
| 修改技术栈/依赖 | `CLAUDE.md` | 更新技术栈详情 |
| 修改 Store 结构 | `docs/store-guide.md` | 更新状态管理说明 |
| 修改部署配置 | `docs/deploy-guide.md` | 更新部署流程说明 |
| 完成待办事项 | `CLAUDE.md` | 勾选已完成项 |

**文件缺失处理：** 如果需要更新的文档不存在，自动创建该文件。

---

*文档创建时间：2026-08-20*
