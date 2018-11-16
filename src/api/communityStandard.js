/*
 * @Author: ghost
 * @Date: 2018-11-12 15:11:56
 * @Last Modified by: ghost
 * @Last Modified time: 2018-11-15 18:11:08
 */

import fetch from '@/utils/fetch'
const communityMap = 'http://dcomlib99.mdguanjia.com/community'
// 小区列表
export function communityPagelistApi(params = {}) {
  return new Promise((resolve, reject) => {
    fetch({
      url: communityMap + '/correct/queryList',
      method: 'post',
      isMock: true,
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
// 查询未处理小区数量
export function queryUntreatedNumtApi(params = {}) {
  return new Promise((resolve, reject) => {
    fetch({
      url: communityMap + '/correct/queryUntreatedNum',
      method: 'post',
      isMock: true,
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
// 忽略小区
export function saveIgnoreApi(params = {}) {
  return new Promise((resolve, reject) => {
    fetch({
      url: communityMap + '/correct/saveIgnore',
      method: 'post',
      isMock: true,
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
// 取消忽略

// 更正小区
