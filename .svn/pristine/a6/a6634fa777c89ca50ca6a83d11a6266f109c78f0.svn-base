import request from '../utils/request'

const commonUrl = '/systemAdmin/user/'
/**
 * 信息录入员日志查询
 * @param {Object} params 参照接口文档
 */
function reporterLogs (params) {
  return request.post(`${commonUrl}staff/log`, params)
}

/**
 * 管理员日志查询
 * @param {Object} params 参照接口文档
 */
function adminLogs (params) {
  return request.post(`${commonUrl}manager/log`, params)
}

/**
 * 门卫日志查询
 * @param {Object} params 参照接口文档
 */
function guardLogs (params) {
  return request.post(`${commonUrl}doorkeeper/log`, params)
}

/**
 * 系统管理员日志查询
 * @param {Object} params 参照接口文档
 */
function sysAdminLogs (params) {
  return request.post(`${commonUrl}admin/log`, params)
}

/**
 * 信息录入员日志导出
 * @param {Object} params 参照接口文档
 */
function reporterLogsExport (params) {
  return request.post(`${commonUrl}staff/log/export`, params)
}

/**
 * 管理员日志导出
 * @param {Object} params 参照接口文档
 */
function adminLogsExport (params) {
  return request.post(`${commonUrl}manager/log/export`, params)
}

/**
 * 门卫日志导出
 * @param {Object} params 参照接口文档
 */
function guardLogsExport (params) {
  return request.post(`${commonUrl}doorkeeper/log/export`, params)
}

/**
 * 系统管理员日志导出
 * @param {Object} params 参照接口文档
 */
function sysAdminLogsExport (params) {
  return request.post(`${commonUrl}admin/log/export`, params)
}

export default {
  reporterLogs,
  adminLogs,
  guardLogs,
  sysAdminLogs,
  reporterLogsExport,
  adminLogsExport,
  guardLogsExport,
  sysAdminLogsExport
}
