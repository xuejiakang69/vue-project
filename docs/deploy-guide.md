# 部署流程文档

> CI/CD 配置、部署规则和版本管理说明。

---

## 一、部署方式

使用 GitHub Actions 自动部署，配置文件：`.github/workflows/deploy.yml`

---

## 二、部署规则

| 触发条件 | 部署环境 | 部署路径 |
|----------|----------|----------|
| push 到 `main` | 生产环境 | `/www/wwwroot/vue/vue-prod/` |
| push 到 `test` | 测试环境 | `/www/wwwroot/vue/vue-test/` |

---

## 三、部署流程

```
1. 拉取代码 (actions/checkout)
2. 安装依赖 (npm ci)
3. 构建项目 (npm run build)
4. 读取 VERSION 文件
5. 测试环境：校验版本号 > 生产版本
6. 上传 dist 目录到服务器 (SCP)
7. 生产环境：切换 current 软链接
8. 清理旧版本（保留最近 3 个）
```

---

## 四、版本管理

### 版本号格式

存储在项目根目录 `VERSION` 文件中，格式：`x.y.z`（语义化版本）

### 版本校验规则

- 测试环境部署前会校验：**测试版本号必须大于生产版本号**
- 版本号由用户手动管理，Claude 不参与

### 版本保留策略

- 生产环境保留最近 **3 个版本**
- 自动清理更早的版本

---

## 五、服务器配置

### 环境要求

- Node.js 22
- npm（使用阿里云镜像源）

### 目录结构

```
/www/wwwroot/vue/
├── vue-prod/              # 生产环境
│   ├── current/           # 当前版本（软链接）
│   └── releases/          # 历史版本
│       ├── v1.0.4/
│       ├── v1.0.5/
│       └── v1.0.6/
└── vue-test/              # 测试环境
    └── dist/
```

---

## 六、Secrets 配置

需要在 GitHub 仓库设置以下 Secrets：

| 名称 | 说明 |
|------|------|
| `SERVER_HOST` | 服务器 IP 地址 |
| `SERVER_PASSWORD` | 服务器登录密码 |
| `NPM_TOKEN` | 阿里云 npm 镜像 Token |

---

*文档创建时间：2026-08-20*
