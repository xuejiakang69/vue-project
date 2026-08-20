# Vue 3 中后台管理端

基于 Vue 3 + Vite + Element Plus 的中后台管理系统。

## 技术栈

- **框架**: Vue 3.5 + Composition API
- **构建工具**: Vite 8
- **UI 组件库**: Element Plus
- **状态管理**: Pinia
- **HTTP 客户端**: Axios
- **CSS 预处理器**: Sass

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173

### 构建项目

```bash
# 默认构建
npm run build

# 测试环境
npm run build:test

# 生产环境
npm run build:prod
```

## 项目结构

```
vue-project/
├── public/                    # 静态资源
├── src/
│   ├── assets/                # 构建资源
│   ├── components/            # 公共组件
│   ├── composables/           # 组合式函数
│   ├── layouts/               # 布局组件
│   ├── router/                # 路由配置
│   ├── stores/                # 状态管理
│   ├── styles/                # 全局样式
│   ├── utils/                 # 工具函数
│   ├── views/                 # 页面组件
│   ├── App.vue                # 根组件
│   └── main.js                # 入口文件
├── docs/                      # 项目文档
├── .env.development           # 开发环境变量
├── .env.test                  # 测试环境变量
└── .env.production            # 生产环境变量
```

## 环境变量

| 变量 | 开发 | 测试 | 生产 |
|------|------|------|------|
| `VITE_APP_ENV` | development | test | production |
| `VITE_API_URL` | /api（代理） | https://test-api.xxx.me/api | https://api.xxx.me/api |

## 认证方式

- 手机号 + 验证码登录
- Token 有效期 24 小时

## 分支策略

- `main` - 生产环境
- `test` - 测试环境

## 文档

详细文档请查看 [docs/](./docs/) 目录。

## 许可证

私有项目
