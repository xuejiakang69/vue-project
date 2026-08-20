# 错误处理规范

> 后端返回格式、前端错误提示方式和错误码约定。

---

## 一、后端返回格式

统一使用以下格式：

```json
{
  "code": 0,
  "data": {},
  "message": "success"
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| `code` | number | 状态码，`0` 表示成功 |
| `data` | any | 返回数据 |
| `message` | string | 提示信息 |

---

## 二、前端错误提示

### 提示方式

| 错误类型 | 提示方式 | 示例 |
|----------|----------|------|
| HTTP 错误（4xx/5xx） | `ElMessage.error()` | "请求资源不存在" |
| 业务错误（code !== 0） | `ElMessage.error()` | 后端返回的 message |
| 网络异常 | `ElMessage.error()` | "网络连接异常，请检查网络" |
| 表单校验错误 | 输入框下方红色提示 | "请输入用户名" |
| 操作成功 | `ElMessage.success()` | "操作成功" |

### 提示时长

统一 3 秒（Element Plus 默认值）

---

## 三、HTTP 状态码处理

```javascript
// src/utils/request.js 中已配置
const errorMessages = {
  400: '请求参数错误',
  401: '未授权，请重新登录',
  403: '拒绝访问',
  404: '请求资源不存在',
  500: '服务器内部错误'
}
```

### 401 特殊处理

```javascript
if (response.status === 401) {
  localStorage.removeItem('token')
  router.push('/login')
  ElMessage.error('登录已过期，请重新登录')
}
```

---

## 四、业务错误码

| code | 说明 | 处理方式 |
|------|------|----------|
| `0` | 成功 | 正常处理 |
| `1001` | 未登录 | 跳转登录页 |
| `1002` | Token 过期 | 跳转登录页 |
| `1003` | 无权限 | 提示无权限 |
| `2001` | 参数错误 | 显示错误信息 |
| `3001` | 业务异常 | 显示错误信息 |

> 注：以上为示例，具体错误码以后端实际定义为准。

---

## 五、使用示例

```javascript
import request from '@/utils/request'
import { ElMessage } from 'element-plus'

const fetchData = async () => {
  try {
    const res = await request.get('/api/data')
    // 成功处理
    list.value = res.data
  } catch (error) {
    // 错误已在拦截器中处理，此处可做额外操作
    console.error('请求失败:', error)
  }
}
```

---

*文档创建时间：2026-08-20*
