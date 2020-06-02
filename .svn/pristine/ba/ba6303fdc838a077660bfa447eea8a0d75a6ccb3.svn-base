import request from '../utils/request'

const commonUrl = '/entrystaff' // 公共地址

/**
 * 分页条件查询新运单
 * @param { Object } params 参照接口文档
 */
function getNewByCriteria (params) {
  return request.post(`${commonUrl}/arrange/new/getByCriteria`, params)
}

/**
  * 根据驾驶员手机号码获取其资质信息
  * @param {string | string[]} driverPhone 驾驶员手机号码
*/
function getDriverByPhone (driverPhone) {
  return request.get(`${commonUrl}/qualification/driver/getByPhone`, {
    params: {
      driverPhone: driverPhone
    }
  })
}

/**
 * 根据车头车牌号获取车头信息
 * @param { String } plateNumber 车头车牌号
 */
function getHeadstockByPlateNumber (plateNumber) {
  return request.get(`${commonUrl}/qualification/headstock/getByPlateNumber`, {
    params: {
      plateNumber: plateNumber
    }
  })
}

/**
 * 信息录入员提交资质信息
 * @param { Object } params 参照接口文档
 */
function newEntry (params) {
  return request.post(`${commonUrl}/arrange/new/entry`, params)
}

/**
 * 分页条件查询已完成运单
 * @param { Object } params 参照接口文档
 */
function getEntryByCriteria (params) {
  return request.post(`${commonUrl}/arrange/entry/getByCriteria`, params)
}

/**
 * 分页条件查询已入厂运单
 * @param { Object } params 参照接口文档
 */
function getEnterByCriteria (params) {
  return request.post(`${commonUrl}/arrange/enter/getByCriteria`, params)
}

/**
 * 验证码方式登录之后看到的单子
 * @param { Object } params 参照接口文档
 */
function getTempRecordByState (params) {
  return request.get(`${commonUrl}/authorize/getTempRecordByState`, {
    params: params
  })
}

/**
 * 验证码方式登录之后看到的驾驶员信息
 * @param { Object } params 参照接口文档
 */
function getTempDriverInfo (params) {
  return request.get(`${commonUrl}/authorize/getTempDriverInfo`)
}

/**
 * 验证码方式登录之后看到的车头信息
 * @param { Object } params 参照接口文档
 */
function getTempHeadStock (params) {
  return request.get(`${commonUrl}/authorize/getTempHeadStock`)
}

/**
 * 验证码方式登录之后看到的车头信息
 * @param { Object } params 参照接口文档
 */
function recordDetail (params) {
  return request.get(`${commonUrl}/arrange/recordDetail`, {
    params: params
  })
}

/**
 * 根据押运证编号获取押运员资质信息
 * @param { Object } params 参照接口文档
 */
function getByLicenceNumber (params) {
  return request.get(`${commonUrl}/qualification/escort/getByLicenceNumber`, {
    params: params
  })
}

/**
 * 根据挂车车牌号获取挂车信息
 * @param { Object } params 参照接口文档
 */
function getByPlateNumber (params) {
  return request.get(`${commonUrl}/qualification/trailer/getByPlateNumber`, {
    params: params
  })
}

export default {
  getNewByCriteria,
  getDriverByPhone,
  getHeadstockByPlateNumber,
  newEntry,
  getEntryByCriteria,
  getEnterByCriteria,
  getTempRecordByState,
  getTempDriverInfo,
  getTempHeadStock,
  recordDetail,
  getByLicenceNumber,
  getByPlateNumber
}
