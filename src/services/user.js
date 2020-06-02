import request from '../utils/request'

const commonUrl = '/entrystaff/center'

/**
 * 通过原密码修改密码
 * @param {Object} params 参考接口文档
 */
function changePwdByOldPwd (params) {
  return request.post(`${commonUrl}/changePwdByOldPwd`, params)
}

/**
 * 发送短信验证码，用以修改原始密码
 * @param {Object} params 参考接口文档
 */
function sendIdentifyCodeChangePwd (params) {
  return request.get(`${commonUrl}/sendIdentifyCodeChangePwd`, {
    params: params
  })
}

/**
 * 通过手机号码修改密码
 * @param {Object} params 参考接口文档
 */
function changePwdByPhone (params) {
  return request.post(`${commonUrl}/changePwdByPhone`, params)
}

/**
 * 发送短信验证码，用以修改绑定的手机号码
 * @param {Object} params 参考接口文档
 */
function sendIdentifyCodeChangePhone (params) {
  return request.get(`${commonUrl}/sendIdentifyCodeChangePhone`, {
    params: params
  })
}

/**
 * 修改绑定的手机号码
 * @param {Object} params 参考接口文档
 */
function changeMobile (params) {
  return request.post(`${commonUrl}/changeMobile`, params)
}

export default {
  changePwdByOldPwd,
  sendIdentifyCodeChangePwd,
  changePwdByPhone,
  sendIdentifyCodeChangePhone,
  changeMobile
}
