import request from '../utils/request'

const commonUrl = '/entrystaff/qualification' // 公共地址
/**
 * 新增驾驶员资质
 * @param { Object } params 参照接口文档
 */
function newDriver (params) {
  return request.post(`${commonUrl}/driver/insert`, params)
}

/**
 * 新增押运员资质
 * @param { Object } params 参照接口文档
 */
function newEscort (params) {
  return request.post(`${commonUrl}/escort/insert`, params)
}

/**
 * 新增车头资质
 * @param { Object } params 参照接口文档
 */
function newHeadstock (params) {
  return request.post(`${commonUrl}/headstock/insert`, params)
}

/**
 * 新增挂车资质
 * @param { Object } params 参照接口文档
 */
function newTrailer (params) {
  return request.post(`${commonUrl}/trailer/insert`, params)
}

/**
 * 根据id获取驾驶员资质信息
 * @param { String } id 驾驶员id
 */
function getDriverById (id) {
  return request.get(`${commonUrl}/driver/getById`, {
    params: {
      driverId: id
    }
  })
}

/**
 * 根据id获取押运员资质信息
 * @param { String } id 驾驶员id
 */
function getEscortById (id) {
  return request.get(`${commonUrl}/escort/getById`, {
    params: {
      escortId: id
    }
  })
}

/**
 * 根据id获取车头资质信息
 * @param { String } id 驾驶员id
 */
function getHeadstockById (id) {
  return request.get(`${commonUrl}/headstock/getById`, {
    params: {
      headStockId: id
    }
  })
}

/**
 * 根据id获取挂车资质信息
 * @param { String } id 驾驶员id
 */
function getTrailerById (id) {
  return request.get(`${commonUrl}/trailer/getById`, {
    params: {
      trailerId: id
    }
  })
}

/**
 * 分页条件查询驾驶员资质信息
 * @param { Object } params 参照接口文档
 */
function getDriverByCriteria (params) {
  return request.post(`${commonUrl}/driver/getByCriteria`, params)
}

/**
 * 分页条件查询押运员资质信息
 * @param { Object } params 参照接口文档
 */
function getEscortByCriteria (params) {
  return request.post(`${commonUrl}/escort/getByCriteria`, params)
}

/**
 * 分页条件查询车头信息
 * @param { Object } params 参照接口文档
 */
function getHeadstockByCriteria (params) {
  return request.post(`${commonUrl}/headstock/getByCriteria`, params)
}

/**
 * 分页条件查询挂车信息
 * @param { Object } params 参照接口文档
 */
function getTrailerCriteria (params) {
  return request.post(`${commonUrl}/trailer/getByCriteria`, params)
}

/**
 * 更新驾驶员资质
 * @param {Object} params 参照接口文档
 */
function updateDriver (params) {
  return request.post(`${commonUrl}/driver/update`, params)
}

/**
 * 更新押运员资质
 * @param {Object} params 参照接口文档
 */
function updateEscort (params) {
  return request.post(`${commonUrl}/escort/update`, params)
}

/**
 * 更新车头资质
 * @param {Object} params 参照接口文档
 */
function updateHeadstock (params) {
  return request.post(`${commonUrl}/headstock/update`, params)
}

/**
 * 更新挂车资质
 * @param {Object} params 参照接口文档
 */
function updateTrailer (params) {
  return request.post(`${commonUrl}/trailer/update`, params)
}

/**
 * 分页条件查询资质修改记录
 * @param {Object} params 参照接口文档
 */
function getHistory (params) {
  return request.post(`${commonUrl}/modify/getByCriteria`, params)
}

/**
 * 更新挂车资质
 * @param {Object} params 参照接口文档
 */
function getAbnormal (params) {
  return request.post(`/entrystaff/abnormal/getByCriteria`, params)
}

/**
 * 资质补充-分页条件查询需补充的驾驶员资质
 * @param { Object } params 参照接口文档
 */
function getDriverByCriteria2 (params) {
  return request.post(`${commonUrl}/driver/getByCriteria2`, params)
}

/**
 * 资质补充-分页条件查询需补充的押运员资质
 * @param { Object } params 参照接口文档
 */
function getEscortByCriteria2 (params) {
  return request.post(`${commonUrl}/escort/getByCriteria2`, params)
}

/**
 * 资质补充-分页条件查询需补充的车头资质
 * @param { Object } params 参照接口文档
 */
function getHeadstockByCriteria2 (params) {
  return request.post(`${commonUrl}/headstock/getByCriteria2`, params)
}

/**
 * 资质补充-分页条件查询需补充的驾驶员资质
 * @param { Object } params 参照接口文档
 */
function getTrailerByCriteria2 (params) {
  return request.post(`${commonUrl}/trailer/getByCriteria2`, params)
}


export default {
  newDriver,
  newEscort,
  newHeadstock,
  newTrailer,
  getDriverById,
  getEscortById,
  getHeadstockById,
  getTrailerById,
  getDriverByCriteria,
  getEscortByCriteria,
  getHeadstockByCriteria,
  getTrailerCriteria,
  updateDriver,
  updateEscort,
  updateHeadstock,
  updateTrailer,
  getHistory,
  getAbnormal,
  getDriverByCriteria2,
  getEscortByCriteria2,
  getHeadstockByCriteria2,
  getTrailerByCriteria2
}
