import request from '@/utils/request'

/**
 * 用户登录
 * @param {object} data - 登录参数
 * @param {string} data.username - 用户名
 * @param {string} data.password - 密码
 * @returns {Promise} 登录结果
 */
export function login(data) {
  return request({
    url: '/api/auth/login',
    method: 'post',
    data
  })
}

/**
 * 修改密码
 * @param {object} data - 修改密码参数
 * @param {string} data.oldPassword - 旧密码
 * @param {string} data.newPassword - 新密码
 * @returns {Promise} 修改结果
 */
export function changePassword(data) {
  return request({
    url: '/api/auth/change-password',
    method: 'post',
    data
  })
}

/**
 * 账号申请
 * @param {object} data - 申请参数
 * @param {string} data.username - 用户名
 * @param {string} data.realName - 真实姓名
 * @param {string} data.phone - 手机号
 * @param {string} data.email - 邮箱
 * @param {string} data.department - 部门
 * @returns {Promise} 申请结果
 */
export function applyAccount(data) {
  return request({
    url: '/api/auth/apply',
    method: 'post',
    data
  })
}

/**
 * 获取当前用户信息
 * @returns {Promise} 用户信息
 */
export function getUserInfo() {
  return request({
    url: '/api/auth/userinfo',
    method: 'get'
  })
}

/**
 * 获取待审批用户列表
 * @returns {Promise} 待审批用户列表
 */
export function getPendingUsers() {
  return request({
    url: '/api/users/pending',
    method: 'get'
  })
}

/**
 * 审批账号
 * @param {string} userId - 用户唯一标识
 * @param {string} action - 审批动作：APPROVE-通过，REJECT-拒绝
 * @returns {Promise} 审批结果
 */
export function approveAccount(userId, action) {
  return request({
    url: `/api/users/approve/${userId}`,
    method: 'post',
    data: { action }
  })
}
