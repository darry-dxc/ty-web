import request from '../utils/request'

/**
 * 列表查看条件查询接口
 * @param {Object} params 参照接口文档
 */
function getList (params) {
  return request.post('/doorKeeperManager/transportRecordConditionSearch', params)
}

/**
 * 运输记录详情查询接口
 * @param {Object} params 参照接口文档
 */
function getTransportDetail (params) {
  return request.post('/doorKeeperManager/getTransportDetail', params)
}

export default {
  getList,
  getTransportDetail
}
