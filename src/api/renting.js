import fetch from '@/utils/fetch'

/* 获取催租列表 */
export function getRentingListApi(params = {}) {
  return fetch({
    url: '/flying/leaseBill',
    method: 'post',
    data: {
      method: 'billList',
      params
    }
  })
}
/* 导出excel */
export function exportExcelApi(params = {}) {
  return fetch({
    url: '/flying/leaseBill',
    method: 'post',
    data: {
      method: 'exportExcel',
      params
    }
  })
}
// 录入逾期原因
export function leaseBillApi(params = {}) {
  return new Promise((resolve, reject) => {
    fetch({
      url: '/flying/leaseBill',
      method: 'post',
      data: {
        method: 'updateOverReason',
        params
      }
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}
// 跟进结果列表
export function	billFollowListApi(params = {}) {
  return new Promise((resolve, reject) => {
    fetch({
      url: '/flying/leaseBill',
      method: 'post',
      data: {
        method: 'billFollowList',
        params
      }
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}
// 运营跟进催租记录
export function	billFollowApi(params = {}) {
  return new Promise((resolve, reject) => {
    fetch({
      url: '/flying/leaseBill',
      method: 'post',
      data: {
        method: 'billFollow',
        params
      }
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}
// 短信催租
export function	rentMessageApi(params = {}) {
  return new Promise((resolve, reject) => {
    fetch({
      url: '/flying/leaseBill',
      method: 'post',
      data: {
        method: 'rentMessage',
        params
      }
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}
// 管家提醒接口
export function	cityManagerMessageApi(params = {}) {
  return new Promise((resolve, reject) => {
    fetch({
      url: '/flying/leaseBill',
      method: 'post',
      data: {
        method: 'cityManagerMessage',
        params
      }
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}
