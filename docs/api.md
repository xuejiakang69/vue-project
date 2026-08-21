# API 接口文档

> 本文档记录所有后端 API 接口。每次新增或修改接口时，必须同步更新本文档。
>
> **Mock 状态说明：**
> - ✅ 已对接 - 接口已对接后端
> - 🔄 Mock 中 - 使用 Mock 数据
> - ⏳ 待开发 - 接口未开始开发

---

## 一、认证模块

### 1.1 登录认证

| 接口 | 方法 | 参数 | 返回值 | Mock 状态 | 说明 |
|------|------|------|--------|-----------|------|
| `/api/auth/login` | POST | `username`: string, `password`: string | `token`: string, `userInfo`: object, `needChangePassword`: boolean | ✅ 已对接 | 用户名+密码登录 |
| `/api/auth/change-password` | POST | `oldPassword`: string, `newPassword`: string | - | ✅ 已对接 | 修改密码 |
| `/api/auth/apply` | POST | `username`: string, `realName`: string, `phone`: string, `email`: string, `department`: string | - | ✅ 已对接 | 账号申请 |
| `/api/auth/userinfo` | GET | - | `userInfo`: object | ✅ 已对接 | 获取当前用户信息 |

### 1.2 用户审批

| 接口 | 方法 | 参数 | 返回值 | Mock 状态 | 说明 |
|------|------|------|--------|-----------|------|
| `/api/users/pending` | GET | - | `list`: array | ✅ 已对接 | 获取待审批用户列表 |
| `/api/users/approve/{userId}` | POST | `action`: string (APPROVE/REJECT) | `initialPassword`: string (通过时) | ✅ 已对接 | 审批账号 |

---

## 二、用户模块

### 2.1 用户管理

| 接口 | 方法 | 参数 | 返回值 | Mock 状态 | 说明 |
|------|------|------|--------|-----------|------|
| `/api/admin/user/list` | GET | `page`: number, `size`: number, `keyword`: string, `status`: number | `list`: array, `total`: number | ⏳ 待开发 | 用户列表（分页） |
| `/api/admin/user/detail` | GET | `id`: number | `userInfo`: object | ⏳ 待开发 | 用户详情 |
| `/api/admin/user/status` | PUT | `id`: number, `status`: number | `success`: boolean | ⏳ 待开发 | 更新用户状态（启用/禁用） |

---

## 三、商品模块

### 3.1 商品分类

| 接口 | 方法 | 参数 | 返回值 | Mock 状态 | 说明 |
|------|------|------|--------|-----------|------|
| `/api/admin/category/tree` | GET | - | `list`: array（树形结构） | ⏳ 待开发 | 获取分类树 |
| `/api/admin/category/add` | POST | `name`: string, `parentId`: number, `sort`: number | `success`: boolean | ⏳ 待开发 | 新增分类 |
| `/api/admin/category/update` | PUT | `id`: number, `name`: string, `sort`: number | `success`: boolean | ⏳ 待开发 | 更新分类 |
| `/api/admin/category/delete` | DELETE | `id`: number | `success`: boolean | ⏳ 待开发 | 删除分类 |

### 3.2 品牌管理

| 接口 | 方法 | 参数 | 返回值 | Mock 状态 | 说明 |
|------|------|------|--------|-----------|------|
| `/api/admin/brand/list` | GET | `page`: number, `size`: number | `list`: array, `total`: number | ⏳ 待开发 | 品牌列表 |
| `/api/admin/brand/add` | POST | `name`: string, `logo`: string | `success`: boolean | ⏳ 待开发 | 新增品牌 |
| `/api/admin/brand/update` | PUT | `id`: number, `name`: string, `logo`: string | `success`: boolean | ⏳ 待开发 | 更新品牌 |
| `/api/admin/brand/delete` | DELETE | `id`: number | `success`: boolean | ⏳ 待开发 | 删除品牌 |

### 3.3 SPU 管理

| 接口 | 方法 | 参数 | 返回值 | Mock 状态 | 说明 |
|------|------|------|--------|-----------|------|
| `/api/admin/spu/list` | GET | `page`: number, `size`: number, `keyword`: string, `categoryId`: number, `status`: number | `list`: array, `total`: number | ⏳ 待开发 | SPU 列表 |
| `/api/admin/spu/detail` | GET | `id`: number | `spu`: object（含 SKU 列表） | ⏳ 待开发 | SPU 详情 |
| `/api/admin/spu/add` | POST | `name`: string, `categoryId`: number, `brandId`: number, `description`: string, `images`: array, `skus`: array | `id`: number | ⏳ 待开发 | 新增 SPU |
| `/api/admin/spu/update` | PUT | `id`: number, ...（同 add） | `success`: boolean | ⏳ 待开发 | 更新 SPU |
| `/api/admin/spu/status` | PUT | `id`: number, `status`: number | `success`: boolean | ⏳ 待开发 | 上架/下架 |

### 3.4 SKU 管理

| 接口 | 方法 | 参数 | 返回值 | Mock 状态 | 说明 |
|------|------|------|--------|-----------|------|
| `/api/admin/sku/list` | GET | `spuId`: number | `list`: array | ⏳ 待开发 | SKU 列表 |
| `/api/admin/sku/update` | PUT | `id`: number, `price`: number, `stock`: number | `success`: boolean | ⏳ 待开发 | 更新 SKU 价格/库存 |

---

## 四、订单模块

### 4.1 订单管理

| 接口 | 方法 | 参数 | 返回值 | Mock 状态 | 说明 |
|------|------|------|--------|-----------|------|
| `/api/admin/order/list` | GET | `page`: number, `size`: number, `status`: number, `keyword`: string, `startDate`: string, `endDate`: string | `list`: array, `total`: number | ⏳ 待开发 | 订单列表 |
| `/api/admin/order/detail` | GET | `id`: number | `order`: object | ⏳ 待开发 | 订单详情 |
| `/api/admin/order/ship` | POST | `id`: number, `logisticsCompany`: string, `logisticsNo`: string | `success`: boolean | ⏳ 待开发 | 发货 |
| `/api/admin/order/refund/approve` | POST | `id`: number | `success`: boolean | ⏳ 待开发 | 同意退款 |
| `/api/admin/order/refund/reject` | POST | `id`: number, `reason`: string | `success`: boolean | ⏳ 待开发 | 拒绝退款 |
| `/api/admin/order/export` | GET | `status`: number, `startDate`: string, `endDate`: string | `url`: string | ⏳ 待开发 | 导出订单 |

---

## 五、优惠券模块

| 接口 | 方法 | 参数 | 返回值 | Mock 状态 | 说明 |
|------|------|------|--------|-----------|------|
| `/api/admin/coupon/list` | GET | `page`: number, `size`: number | `list`: array, `total`: number | ⏳ 待开发 | 优惠券列表 |
| `/api/admin/coupon/add` | POST | `name`: string, `type`: number, `threshold`: number, `amount`: number, `validDays`: number, `total`: number | `id`: number | ⏳ 待开发 | 创建优惠券 |
| `/api/admin/coupon/update` | PUT | `id`: number, ...（同 add） | `success`: boolean | ⏳ 待开发 | 更新优惠券 |
| `/api/admin/coupon/status` | PUT | `id`: number, `status`: number | `success`: boolean | ⏳ 待开发 | 启用/禁用优惠券 |
| `/api/admin/coupon/stats` | GET | `id`: number | `stats`: object | ⏳ 待开发 | 优惠券统计 |

---

## 六、内容管理模块

### 6.1 Banner 管理

| 接口 | 方法 | 参数 | 返回值 | Mock 状态 | 说明 |
|------|------|------|--------|-----------|------|
| `/api/admin/banner/list` | GET | - | `list`: array | ⏳ 待开发 | Banner 列表 |
| `/api/admin/banner/add` | POST | `image`: string, `link`: string, `linkType`: number, `sort`: number | `id`: number | ⏳ 待开发 | 新增 Banner |
| `/api/admin/banner/update` | PUT | `id`: number, ...（同 add） | `success`: boolean | ⏳ 待开发 | 更新 Banner |
| `/api/admin/banner/delete` | DELETE | `id`: number | `success`: boolean | ⏳ 待开发 | 删除 Banner |
| `/api/admin/banner/status` | PUT | `id`: number, `status`: number | `success`: boolean | ⏳ 待开发 | 上架/下架 |

### 6.2 推荐位管理

| 接口 | 方法 | 参数 | 返回值 | Mock 状态 | 说明 |
|------|------|------|--------|-----------|------|
| `/api/admin/recommend/list` | GET | - | `list`: array | ⏳ 待开发 | 推荐位列表 |
| `/api/admin/recommend/update` | PUT | `id`: number, `productIds`: array | `success`: boolean | ⏳ 待开发 | 更新推荐商品 |
| `/api/admin/recommend/sort` | PUT | `id`: number, `sort`: number | `success`: boolean | ⏳ 待开发 | 更新排序 |

---

## 七、评价管理模块

| 接口 | 方法 | 参数 | 返回值 | Mock 状态 | 说明 |
|------|------|------|--------|-----------|------|
| `/api/admin/review/list` | GET | `page`: number, `size`: number, `status`: number, `keyword`: string | `list`: array, `total`: number | ⏳ 待开发 | 评价列表 |
| `/api/admin/review/approve` | POST | `id`: number | `success`: boolean | ⏳ 待开发 | 审核通过 |
| `/api/admin/review/reject` | POST | `id`: number, `reason`: string | `success`: boolean | ⏳ 待开发 | 审核拒绝 |

---

## 八、数据统计模块

| 接口 | 方法 | 参数 | 返回值 | Mock 状态 | 说明 |
|------|------|------|--------|-----------|------|
| `/api/admin/statistics/overview` | GET | - | `todaySales`: number, `todayOrders`: number, `todayUsers`: number, `pendingOrders`: number | ⏳ 待开发 | 仪表盘概览 |
| `/api/admin/statistics/sales` | GET | `startDate`: string, `endDate`: string | `list`: array（日期+金额） | ⏳ 待开发 | 销售趋势 |
| `/api/admin/statistics/products` | GET | `type`: string, `limit`: number | `list`: array | ⏳ 待开发 | 商品排行 |
| `/api/admin/statistics/users` | GET | `startDate`: string, `endDate`: string | `list`: array | ⏳ 待开发 | 用户增长 |
| `/api/admin/statistics/export` | GET | `type`: string, `startDate`: string, `endDate`: string | `url`: string | ⏳ 待开发 | 导出报表 |

---

## 九、系统管理模块

### 9.1 角色管理

| 接口 | 方法 | 参数 | 返回值 | Mock 状态 | 说明 |
|------|------|------|--------|-----------|------|
| `/api/admin/role/list` | GET | - | `list`: array | ⏳ 待开发 | 角色列表 |
| `/api/admin/role/add` | POST | `name`: string, `description`: string, `menuIds`: array | `id`: number | ⏳ 待开发 | 新增角色 |
| `/api/admin/role/update` | PUT | `id`: number, ...（同 add） | `success`: boolean | ⏳ 待开发 | 更新角色 |
| `/api/admin/role/delete` | DELETE | `id`: number | `success`: boolean | ⏳ 待开发 | 删除角色 |

### 9.2 菜单管理

| 接口 | 方法 | 参数 | 返回值 | Mock 状态 | 说明 |
|------|------|------|--------|-----------|------|
| `/api/admin/menu/tree` | GET | - | `list`: array（树形结构） | ⏳ 待开发 | 菜单树 |
| `/api/admin/menu/add` | POST | `name`: string, `path`: string, `icon`: string, `parentId`: number, `sort`: number | `id`: number | ⏳ 待开发 | 新增菜单 |
| `/api/admin/menu/update` | PUT | `id`: number, ...（同 add） | `success`: boolean | ⏳ 待开发 | 更新菜单 |
| `/api/admin/menu/delete` | DELETE | `id`: number | `success`: boolean | ⏳ 待开发 | 删除菜单 |

### 9.3 操作日志

| 接口 | 方法 | 参数 | 返回值 | Mock 状态 | 说明 |
|------|------|------|--------|-----------|------|
| `/api/admin/log/list` | GET | `page`: number, `size`: number, `module`: string, `startDate`: string, `endDate`: string | `list`: array, `total`: number | ⏳ 待开发 | 操作日志列表 |
| `/api/admin/log/export` | GET | `startDate`: string, `endDate`: string | `url`: string | ⏳ 待开发 | 导出日志 |

---

## 十、文件上传

| 接口 | 方法 | 参数 | 返回值 | Mock 状态 | 说明 |
|------|------|------|--------|-----------|------|
| `/api/upload/image` | POST | `file`: File | `url`: string | ⏳ 待开发 | 上传图片 |

---

## 十一、接口统计

| 状态 | 数量 |
|------|------|
| ✅ 已对接 | 6 |
| 🔄 Mock 中 | 0 |
| ⏳ 待开发 | 54 |
| **总计** | **60** |

---

*文档创建时间：2026-08-20*
*最后更新：2026-08-21*
