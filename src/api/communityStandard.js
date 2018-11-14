/*
 * @Author: ghost
 * @Date: 2018-11-12 15:11:56
 * @Last Modified by: ghost
 * @Last Modified time: 2018-11-14 18:44:16
 */

import fetch from '@/utils/fetch'
const FLYMap = 'http://192.168.2.18:8080' + '/community'

// 小区列表
export function communityPagelistApi(params = {}) {
  return new Promise((resolve, reject) => {
    fetch({
      url: FLYMap + '/correct/queryList',
      method: 'post',
      data: {
        method: 'community',
        params
      }
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}
