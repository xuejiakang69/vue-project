# CLAUDE.md - 项目文档

> 本文档是项目核心索引。详细规范请查阅 `docs/` 目录下的模块文档。
> 每次生成或修改代码时，必须同步更新本文档和对应模块文档。

---

## 项目概述

| 项目信息 | 详情 |
|----------|------|
| **项目名称** | vue-project（中后台管理端） |
| **技术栈** | Vue 3 + Vite 8 + Element Plus |
| **包管理器** | npm |
| **认证方式** | 手机号 + 验证码，Token 24 小时 |
| **分支策略** | main（生产）+ test（测试） |

---

## 目录结构

```
vue-project/
├── public/                    # 静态资源
├── src/
│   ├── assets/                # 构建资源
│   ├── components/            # 公共组件
│   ├── composables/           # 组合式函数
│   ├── layouts/               # 布局组件
│   │   ├── AdminLayout.vue    # 主布局
│   │   └── components/        # Sidebar, Header, Breadcrumb
│   ├── router/                # 路由配置
│   ├── stores/                # 状态管理（按模块拆分目录）
│   ├── styles/                # 全局样式
│   ├── utils/                 # 工具函数
│   │   └── request.js         # Axios 封装
│   ├── views/                 # 页面组件
│   ├── App.vue                # 根组件
│   └── main.js                # 入口文件
├── docs/                      # 项目文档（见下方索引）
├── .env.development           # 开发环境变量
├── .env.test                  # 测试环境变量
├── .env.production            # 生产环境变量
├── VERSION                    # 版本号
└── vite.config.js             # Vite 配置
```

---

## 环境变量

| 变量 | 开发 | 测试 | 生产 |
|------|------|------|------|
| `VITE_APP_ENV` | development | test | production |
| `VITE_API_URL` | /api（代理） | https://test-api.xxx.me/api | https://api.xxx.me/api |

**代理配置**：开发环境 `/api` → `http://localhost:8080`

---

## 路由配置

| 路径 | 组件 | 说明 |
|------|------|------|
| `/` | `HomeView.vue` | 首页 |
| `/about` | `AboutView.vue` | 关于页 |

**待添加路由**：登录、仪表盘、用户管理、商品管理、订单管理、优惠券管理、内容管理、评价管理、数据统计、系统管理

**路由守卫**：除登录页外，所有页面必须登录才能访问

---

## 状态管理 (Pinia)

**目录结构**：`src/stores/{模块名}/index.js`

**命名规则**：`useXxxStore`（如 `useUserStore`、`useCartStore`）

**当前 Store**：`useAppStore`（示例）

---

## Axios 封装

**位置**：`src/utils/request.js`

**关键配置**：
- baseURL：从 `VITE_API_URL` 读取
- timeout：15000ms
- 错误码：`code === 0` 表示成功
- 提示方式：`ElMessage`，3 秒
- 401 处理：清除 Token，跳转登录页

---

## 技术栈依赖

| 包名 | 版本 | 用途 |
|------|------|------|
| vue | ^3.5.39 | 核心框架 |
| vue-router | ^4.6.4 | 路由管理 |
| pinia | ^3.0.4 | 状态管理 |
| element-plus | ^2.14.2 | UI 组件库 |
| axios | ^0.27.2 | HTTP 请求 |
| sass | ^1.101.0 | CSS 预处理器 |

---

## 脚本命令

```bash
npm run dev              # 启动开发服务器
npm run build            # 构建（默认）
npm run build:test       # 测试环境构建
npm run build:prod       # 生产环境构建
npm run lint             # ESLint 自动修复
```

---

## 文档索引

| 文档 | 路径 | 内容 |
|------|------|------|
| 代码生成规则 | `docs/code-rules.md` | 文件命名、组件结构、注释要求、文档同步规则 |
| 组件使用规范 | `docs/component-guide.md` | Element Plus 主题色、组件使用约定 |
| 状态管理规范 | `docs/store-guide.md` | Store 目录结构、命名规则、使用示例 |
| Git 提交规范 | `docs/git-guide.md` | Commit 格式、分支策略 |
| 错误处理规范 | `docs/error-guide.md` | 后端返回格式、错误提示方式 |
| 部署流程 | `docs/deploy-guide.md` | CI/CD 配置、版本管理 |
| API 接口文档 | `docs/api.md` | 所有后端接口清单 |
| 组件文档 | `docs/components.md` | 公共组件使用说明 |

---

## 待办事项

- [x] 配置路径别名 `@` 指向 `src`
- [ ] 添加 `src/composables/` 目录
- [ ] 添加 `src/layouts/` 目录
- [ ] 添加 `src/styles/` 目录
- [ ] 配置 Element Plus 按需引入
- [ ] 实现路由守卫和登录鉴权
- [ ] 创建登录页面
- [ ] 创建管理端布局组件

---

## 更新日志

| 日期 | 更新内容 |
|------|----------|
| 2026-08-20 | 模块化文档结构，拆分详细规范到 docs/ 目录 |
| 2026-07-13 | 初始化项目 |
