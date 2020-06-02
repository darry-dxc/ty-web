import request from '../utils/request'
import qs from 'qs'

const commonUrl = '/systemAdmin/backup'
/**
 * 数据备份查询
 * @param {Object} params 参照接口文档
 */
function backupQuery (params) {
  return request.post(`${commonUrl}/select`, params)
}

/**
 * 数据备份删除
 * @param {Object} params 参照接口文档
 */
function backupDelete (params) {
  return request.post(`${commonUrl}/delete`, params)
}

/**
 * 数据备份
 * @param {Object} params 参照接口文档
 */
function backup (params) {
  return request.post(`${commonUrl}/backup`, params)
}

/**
 * 数据备份下载
 * @param {Object} params 参照接口文档
 */
function backupDownload (params) {
  return request.post(`${commonUrl}/download`, qs.stringify(params), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    timeout: 0,
    responseType: 'blob'
  })
}

export default {
  backupQuery,
  backupDelete,
  backup,
  backupDownload
}
