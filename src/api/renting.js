/*
 * @Author: ghost
 * @Date: 2018-09-05 18:23:17
 * @Last Modified by:
 * @Last Modified time: 2018-09-13 10:57:51
*/

import fetch from '@/utils/fetch'

//  部分飞虎队请求接口
const FLY = process.env.FLY_API + '/bop'

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

// 机构管理列表接口
export function	orgManageListApi(params = {}) {
  return new Promise((resolve, reject) => {
    fetch({
      url: FLY + '/orgManage/list',
      method: 'post',
      data: {
        params
      }
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

// 机构备注列表
export function	orgRemarkListApi(params = {}) {
  return new Promise((resolve, reject) => {
    fetch({
      url: FLY + '/orgRemark/list',
      method: 'post',
      data: {
        params
      }
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

// 机构备注保存
export function	orgRemarkSaveApi(params = {}) {
  return new Promise((resolve, reject) => {
    fetch({
      url: FLY + '/orgRemark/save',
      method: 'post',
      data: {
        params
      }
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

// 获取单条机构文件
export function	orgManagequeryByIdApi(params = {}) {
  return new Promise((resolve, reject) => {
    fetch({
      url: FLY + '/orgManage/queryById',
      method: 'post',
      data: {
        params
      }
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

// 机构黑名单列表
export function	orgManageblackListApi(params = {}) {
  return new Promise((resolve, reject) => {
    fetch({
      url: FLY + '/orgManage/blackList',
      method: 'post',
      data: {
        params
      }
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

// 机构恢复
export function	orgManageRecoverApi(params = {}) {
  return new Promise((resolve, reject) => {
    fetch({
      url: FLY + '/orgManage/recover',
      method: 'post',
      data: {
        params
      }
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

// 黑名单机构查询单条
export function	orgManagequeryByMobileApi(params = {}) {
  return new Promise((resolve, reject) => {
    fetch({
      url: FLY + '/orgManage/queryByMobile',
      method: 'post',
      data: {
        params
      }
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

// 机构解除
export function	orgManageRelieveApi(params = {}) {
  return new Promise((resolve, reject) => {
    fetch({
      url: FLY + '/orgManage/relieve',
      method: 'post',
      data: {
        params
      }
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

// 保存机构
export function	orgManageSave(params = {}) {
  return new Promise((resolve, reject) => {
    fetch({
      url: FLY + '/orgManage/save',
      method: 'post',
      data: {
        params
      }
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}
