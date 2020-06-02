import request from '../utils/request'

function login (params) {
  return request.post('/loginRegister/login', params)
}

function logout () {
  return request.get('/loginRegister/logout')
}

function codeLogin (params) {
  return request.post('/loginRegister/codeLogin', params)
}

function getForgetPswPhoneCode (params) {
  return request.get('/loginRegister/getForgetPswPhoneCode', {
    params: params
  })
}

function forgetPswUpdatePsw (params) {
  return request.post('/loginRegister/forgetPswUpdatePsw', params)
}

function oaLogin () {
  return request.post('/loginRegister/getTheUserInfo')
}

export default { login, logout, codeLogin, getForgetPswPhoneCode, forgetPswUpdatePsw, oaLogin }
