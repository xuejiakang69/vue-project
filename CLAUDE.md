# CLAUDE.md - 项目文档

> 本文档由 Claude 自动生成并维护。每次生成或修改代码时，应同步更新本文档。

## 项目概述

| 项目信息 | 详情 |
|----------|------|
| **项目名称** | vue-project |
| **技术栈** | Vue 3 + Vite 8 + Element Plus |
| **包管理器** | npm |
| **Node 版本** | >= 18.0.0 |

## 目录结构

```
vue-project/
├── public/                    # 静态资源（不经过构建处理）
│   ├── favicon.svg            # 网站图标
│   └── icons.svg              # 图标精灵图
├── src/
│   ├── assets/                # 静态资源（经过构建处理）
│   │   ├── hero.png           # 首页图片
│   │   ├── vite.svg           # Vite 图标
│   │   └── vue.svg            # Vue 图标
│   ├── components/            # 公共组件
│   │   └── HelloWorld.vue     # 示例组件
│   ├── composables/           # 组合式函数（Hooks）
│   │   └── (待添加)
│   ├── layouts/               # 布局组件
│   │   └── (待添加)
│   ├── router/                # 路由配置
│   │   └── index.js           # 路由入口
│   ├── stores/                # Pinia 状态管理
│   │   └── index.js           # Store 定义
│   ├── styles/                # 全局样式
│   │   └── (待添加)
│   ├── utils/                 # 工具函数
│   │   └── request.js         # Axios 封装
│   ├── views/                 # 页面级组件
│   │   ├── HomeView.vue       # 首页
│   │   └── AboutView.vue      # 关于页
│   ├── App.vue                # 根组件
│   ├── main.js                # 入口文件
│   └── style.css              # 全局样式
├── .env.development           # 开发环境变量
├── .env.test                  # 测试环境变量
├── .env.production            # 生产环境变量
├── .gitignore                 # Git 忽略配置
├── eslint.config.js           # ESLint 配置
├── index.html                 # HTML 入口
├── package.json               # 项目配置
└── vite.config.js             # Vite 配置
```

## 技术栈详情

### 核心依赖

| 包名 | 版本 | 用途 |
|------|------|------|
| `vue` | ^3.5.39 | 核心框架 |
| `vue-router` | ^4.6.4 | 路由管理 |
| `pinia` | ^3.0.4 | 状态管理 |
| `element-plus` | ^2.14.2 | UI 组件库 |
| `axios` | ^0.27.2 | HTTP 请求 |
| `sass` | ^1.101.0 | CSS 预处理器 |

### 开发依赖

| 包名 | 版本 | 用途 |
|------|------|------|
| `vite` | ^8.1.1 | 构建工具 |
| `@vitejs/plugin-vue` | ^6.0.7 | Vue 插件 |
| `eslint` | ^10.7.0 | 代码检查 |
| `eslint-plugin-vue` | ^10.9.2 | Vue ESLint 规则 |
| `@eslint/js` | ^10.0.1 | JS ESLint 规则 |
| `globals` | ^13.13.0 | 全局变量定义 |

## 脚本命令

```bash
# 开发
npm run dev              # 启动开发服务器

# 构建
npm run build            # 默认构建
npm run build:test       # 测试环境构建
npm run build:prod       # 生产环境构建

# 预览
npm run preview          # 预览构建结果

# 代码检查
npm run lint             # ESLint 自动修复
npm run lint:check       # ESLint 仅检查
```

## 环境变量

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `VITE_APP_ENV` | 当前环境 | `development` / `test` / `production` |
| `VITE_API_URL` | API 基础地址 | `https://api.xxx.me/api` |

## 路由配置

| 路径 | 名称 | 组件 | 说明 |
|------|------|------|------|
| `/` | Home | `HomeView.vue` | 首页 |
| `/about` | About | `AboutView.vue` | 关于页 |

## 状态管理 (Pinia)

### useAppStore

**位置**: `src/stores/index.js`

| 状态/方法 | 类型 | 说明 |
|-----------|------|------|
| `count` | `ref<number>` | 计数器 |
| `name` | `ref<string>` | 名称 |
| `increment()` | `function` | 计数 +1 |
| `decrement()` | `function` | 计数 -1 |
| `reset()` | `function` | 重置状态 |

## Axios 封装

**位置**: `src/utils/request.js`

### 配置

- **baseURL**: 从 `VITE_API_URL` 环境变量自动读取（如 `https://api.xxx.me/api`）
- **timeout**: 15000ms

### 拦截器

#### 请求拦截器
- 可在此添加 Token 等认证信息
- 注释中已预留 Token 添加逻辑

#### 响应拦截器
- 自动处理 HTTP 错误状态码（400/401/403/404/500）
- 自动显示 Element Plus 错误提示
- 支持自定义业务错误码判断（code === 0 或 200）

### 使用示例

```javascript
import request from '@/utils/request'

// GET 请求
const data = await request.get('/users')  // 实际请求: https://api.xxx.me/api/users

// POST 请求
const result = await request.post('/users', { name: '张三' })

// 带参数请求
const list = await request.get('/users', { params: { page: 1, size: 10 } })
```

## ESLint 规则

### Vue 规则
- `vue/multi-word-component-names`: 关闭
- `vue/no-unused-vars`: 错误

### JS 规则
- `no-unused-vars`: 警告（忽略 `_` 开头参数）
- `no-console`: 警告
- `no-debugger`: 警告
- `prefer-const`: 错误
- `no-var`: 错误

## 组件规范

### 文件命名
- **组件文件**: PascalCase（如 `HelloWorld.vue`）
- **页面文件**: `XxxView.vue`（如 `HomeView.vue`）
- **工具文件**: camelCase（如 `request.js`）

### 组件结构

```vue
<script setup>
// 1. 导入
// 2. 定义响应式状态
// 3. 定义方法
// 4. 定义计算属性
</script>

<template>
  <!-- 模板内容 -->
</template>

<style lang="scss" scoped>
/* 样式内容 */
</style>
```

## 待办事项

- [x] 配置路径别名 `@` 指向 `src`
- [ ] 添加 `src/composables/` 目录，存放组合式函数
- [ ] 添加 `src/layouts/` 目录，存放布局组件
- [ ] 添加 `src/styles/` 目录，存放全局样式
- [ ] 添加页面加载进度条
- [ ] 添加全局错误处理
- [ ] 添加权限路由守卫

## Vite 配置

### 路径别名

```javascript
'@' → './src'
```

使用方式：
```javascript
import xxx from '@/components/xxx.vue'
```

## 更新日志

| 日期 | 更新内容 |
|------|----------|
| 2026-07-13 | 初始化项目，创建基础结构；配置路径别名 `@`；deploy.yml 添加版本重复校验；封装 Axios |
