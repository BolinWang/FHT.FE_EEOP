/*
 * @Author: ghost
 * @Date: 2018-09-05 18:23:17
 * @Last Modified by: ghost
 * @Last Modified time: 2018-10-25 14:48:38
*/

import fetch from '@/utils/fetch'

//  部分飞虎队请求接口
const FLY = process.env.FLY_API + '/bop'
const FLYSUn = process.env.FLY_API + '/back'
/* 获取催租列表 */
export function getRentingListApi(params = {}) {
  return fetch({
    url: FLYSUn + '/bill/billList',
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
    url: FLYSUn + '/flying/leaseBill',
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
      url: FLYSUn + '/bill/updateOverReason',
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
      url: FLYSUn + '/bill/billFollowList',
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
      url: FLYSUn + '/bill/billFollow',
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
      url: FLYSUn + '/bill/rentMessage',
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
      url: FLYSUn + '/bill/cityManagerMessage',
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
// 租房预约列表
export function	getTenantBookingListApi(params = {}) {
  return new Promise((resolve, reject) => {
    fetch({
      url: FLYSUn + '/tenant/tenantBookingList',
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
// 忽略租房预约
export function	getTenantcloseApi(params = {}) {
  return new Promise((resolve, reject) => {
    fetch({
      url: FLYSUn + '/tenant/close',
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
// 客源渠道列表
// 客源跟进记录
export function	getcustomerFollowListApi(params = {}) {
  return new Promise((resolve, reject) => {
    fetch({
      url: FLYSUn + '/customerCenter/customerFollowList',
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
// 关闭客源
export function	customerCenterCloseApi(params = {}) {
  return new Promise((resolve, reject) => {
    fetch({
      url: FLYSUn + '/customerCenter/close',
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
// 新增客源
export function	customerCenterSaveApi(params = {}) {
  return new Promise((resolve, reject) => {
    fetch({
      url: FLYSUn + '/customerCenter/save',
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
// 查询区域板块

export function	getCheckZoneApi(params = {}) {
  return new Promise((resolve, reject) => {
    fetch({
      url: FLYSUn + '/customerCenter/checkZone',
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

// 客户来源列表
export function	getSourceListApi(params = {}) {
  return new Promise((resolve, reject) => {
    fetch({
      url: FLYSUn + '/customerCenter/sourceList',
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
// 查看客源详情接口

export function	getCustomerInfoApi(params = {}) {
  return new Promise((resolve, reject) => {
    fetch({
      url: FLYSUn + '/customerCenter/customerInfo',
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

// 租房预约消息通知
export function	getMessageCounApi(params = {}) {
  return new Promise((resolve, reject) => {
    fetch({
      url: FLY + '/orgManage/messageCount',
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
