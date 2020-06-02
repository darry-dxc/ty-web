import request from '../utils/request'

const commonUrl = '/systemAdmin/user/'
/**
 * 信息录入员信息查询
 * @param {Object} params 参照接口文档
 */
function reporterAuthInfo (params) {
  return request.post(`${commonUrl}staff/info`, params)
}

/**
 * 管理员信息查询
 * @param {Object} params 参照接口文档
 */
function adminAuthInfo (params) {
  return request.post(`${commonUrl}manager/info`, params)
}

/**
 * 门卫信息查询
 * @param {Object} params 参照接口文档
 */
function guardAuthInfo (params) {
  return request.post(`${commonUrl}doorkeeper/info`, params)
}

/**
 * 启用停用管理员账户
 * @param {Object} params 参照接口文档
 */
function isReporterUse (params) {
  return request.post(`${commonUrl}staff/enable`, params)
}

/**
 * 启用停用管理员账户
 * @param {Object} params 参照接口文档
 */
function isAdminUse (params) {
  return request.post(`${commonUrl}manager/enable`, params)
}

/**
 * 启用停用管理员账户
 * @param {Object} params 参照接口文档
 */
function isGuardUse (params) {
  return request.post(`${commonUrl}doorkeeper/enable`, params)
}

/**
 * 查询用户授权情况
 * @param {Object} params 参照接口文档
 */
function permissionSelect (params) {
  return request.post(`${commonUrl}permission/select`, params)
}

/**
 * 授权用户某菜单页面
 * @param {Object} params 参照接口文档
 */
function permissionSetting (params) {
  return request.post(`${commonUrl}permission/setting`, params)
}

/**
 * 撤销授权用户某菜单页面
 * @param {Object} params 参照接口文档
 */
function permissionDelete (params) {
  return request.post(`${commonUrl}permission/delete`, params)
}

/**
 * 设置管理层用户可查看公司
 * @param {Object} params 参照接口文档
 */
function permissionManager (params) {
  return request.post(`${commonUrl}manager/enableSeeCompanys`, params)
}

export default {
  reporterAuthInfo,
  adminAuthInfo,
  guardAuthInfo,
  isReporterUse,
  isAdminUse,
  isGuardUse,
  permissionSelect,
  permissionSetting,
  permissionDelete,
  permissionManager
}
