import request from '../utils/request'

const commonUrl = '/systemAdmin/setting'
/**
 * 信息录入员日志查询
 * @param {Object} params 参照接口文档
 */
function pushingSetting (params) {
  return request.post(`${commonUrl}/pushing`, params)
}

/**
 * 查询所有的公司
 * @param {Object} params 参照接口文档
 */
function getCompany (params) {
  return request.post(`${commonUrl}/getcompany`, params)
}

/**
 * 依据公司查询下属管理层用户
 * @param {Object} params 参照接口文档
 */
function getManager (params) {
  return request.post(`${commonUrl}/getmanager`, params)
}

export default {
  pushingSetting,
  getCompany,
  getManager
}
