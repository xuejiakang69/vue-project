# 组件使用规范

> Element Plus 组件使用约定和主题定制说明。

---

## 一、主题色覆盖

产品设计规范的主色与 Element Plus 默认色不同，通过 CSS 变量覆盖：

```scss
// src/styles/variables.scss
:root {
  // 品牌主色（产品规范：#007AFF）
  --el-color-primary: #007AFF;
  --el-color-primary-light-3: #3395FF;
  --el-color-primary-light-5: #66AEFF;
  --el-color-primary-light-7: #99C7FF;
  --el-color-primary-light-8: #B3D4FF;
  --el-color-primary-light-9: #E8F4FD;
  --el-color-primary-dark-2: #0056CC;
}
```

---

## 二、组件使用约定

### 按钮 (el-button)

| 场景 | 类型 | 示例 |
|------|------|------|
| 主要操作 | `type="primary"` | 提交、保存、确认 |
| 次要操作 | 默认 | 取消、返回 |
| 危险操作 | `type="danger"` | 删除、禁用 |
| 成功操作 | `type="success"` | 通过、启用 |

```vue
<el-button type="primary" @click="handleSubmit">提交</el-button>
<el-button @click="handleCancel">取消</el-button>
<el-button type="danger" @click="handleDelete">删除</el-button>
```

### 表格 (el-table)

必须设置 `stripe` 斑马纹：

```vue
<el-table :data="list" stripe>
  <el-table-column prop="name" label="名称" />
  <el-table-column prop="status" label="状态">
    <template #default="{ row }">
      <el-tag :type="row.status === 1 ? 'success' : 'danger'">
        {{ row.status === 1 ? '启用' : '禁用' }}
      </el-tag>
    </template>
  </el-table-column>
  <el-table-column label="操作" width="200">
    <template #default="{ row }">
      <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
      <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
    </template>
  </el-table-column>
</el-table>
```

### 表单 (el-form)

必须设置 `rules` 校验规则：

```vue
<el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
  <el-form-item label="名称" prop="name">
    <el-input v-model="form.name" placeholder="请输入名称" />
  </el-form-item>
</el-form>

<script setup>
const rules = {
  name: [
    { required: true, message: '请输入名称', trigger: 'blur' },
    { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
  ]
}
</script>
```

### 输入框 (el-input)

必须设置 `placeholder`：

```vue
<el-input v-model="keyword" placeholder="请输入关键词" clearable />
```

### 下拉选择 (el-select)

必须设置 `placeholder`：

```vue
<el-select v-model="status" placeholder="请选择状态" clearable>
  <el-option label="启用" :value="1" />
  <el-option label="禁用" :value="0" />
</el-select>
```

### 分页 (el-pagination)

统一使用完整布局：

```vue
<el-pagination
  v-model:current-page="page"
  v-model:page-size="size"
  :page-sizes="[10, 20, 50, 100]"
  :total="total"
  layout="total, sizes, prev, pager, next, jumper"
  @size-change="handleSizeChange"
  @current-change="handlePageChange"
/>
```

### 弹窗 (el-dialog)

使用 `v-model` 控制显示：

```vue
<el-dialog v-model="visible" title="标题" width="600px">
  <!-- 内容 -->
  <template #footer>
    <el-button @click="visible = false">取消</el-button>
    <el-button type="primary" @click="handleSubmit">确认</el-button>
  </template>
</el-dialog>
```

### 消息提示

```javascript
// 成功提示
ElMessage.success('操作成功')

// 错误提示（接口错误统一使用）
ElMessage.error('请求失败')

// 警告提示
ElMessage.warning('请先选择数据')

// 重要业务提示（使用 Notification）
ElNotification({
  title: '提示',
  message: '您有一笔新订单',
  type: 'info'
})
```

---

*文档创建时间：2026-08-20*
