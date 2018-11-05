import fetch from '@/utils/fetch'
const FLY = process.env.FLY_API + '/bop'
/* 获取房源审核列表 */
export function queryReviewCheckListByPageApi(params = {}) {
  return fetch({
    url: '/market/review/',
    method: 'post',
    data: {
      method: 'queryReviewCheckListByPage',
      params
    }
  })
}

/**
 * 房源神审核编辑
 * @description 分散式
 * @function saveReviewStatusApi
 * @description 集中式
 * @function saveEstatePublishStatusApi
 */
export function saveReviewStatusApi(params) {
  return fetch({
    url: '/market/review/',
    method: 'post',
    data: {
      method: 'saveReviewStatus',
      params
    }
  })
}
export function saveEstatePublishStatusApi(params) {
  return fetch({
    url: '/market/review/',
    method: 'post',
    data: {
      method: 'saveEstatePublishStatus',
      params
    }
  })
}

/* 房源详情查看 */
export function queryReviewCheckRoomDetailApi(params) {
  return fetch({
    url: '/market/review/',
    method: 'post',
    data: {
      method: 'queryReviewCheckRoomDetail',
      params
    }
  })
}

/* 签章审核 */
export function signaturesHandleApi(params) {
  return fetch({
    url: '/market/audit/',
    method: 'post',
    data: {
      method: 'handle',
      params
    }
  })
}

/* 签章审核列表 */
export function signaturesListsApi(params) {
  return fetch({
    url: '/market/audit/',
    method: 'post',
    data: {
      method: 'list',
      params
    }
  })
}

/* 实名认证 */
export function upgradeRealNameApi(params) {
  return fetch({
    url: '/market/audit/',
    method: 'post',
    data: {
      method: 'upgradeRealName',
      params
    }
  })
}

/* 已发布房源列表 */
export function queryPublishRoomListByPageApi(params) {
  return fetch({
    url: '/market/review/',
    method: 'post',
    data: {
      method: 'queryPublishRoomListByPage',
      params
    }
  })
}

/* 已发布房源详情 */
export function queryPublishRoomDetailApi(params) {
  return fetch({
    url: '/market/review/',
    method: 'post',
    data: {
      method: 'queryPublishRoomDetail',
      params
    }
  })
}

/* 已发布房源下架 */
export function savePublishStatusApi(params) {
  return fetch({
    url: '/market/review/',
    method: 'post',
    data: {
      method: 'savePublishStatus',
      params
    }
  })
}

/* 已发布房源图片删除 */
export function batchRemoveRoomPictureApi(params) {
  return fetch({
    url: '/market/review/',
    method: 'post',
    data: {
      method: 'batchRemoveRoomPicture',
      params
    }
  })
}

/* 飞虎队机构列表 */
export const fhdAuditList = {
  defaultOptions: {
    requestUrl: FLY + '/orgManage/auditRecordList',
    method: 'auditRecordList'
  }
}
/**
 * 飞虎队机构详情
 */
export function fhdAuditDetailApi(params) {
  return fetch({
    url: FLY + '/orgManage/queryAuditRecordDetail ',
    method: 'post',
    data: {
      method: 'post',
      params
    }
  })
}
/**
 * 飞虎队机构审核
 */
export const fhdAuditorgManageApi = {
  personal(params) {
    return fetch({
      url: FLY + '/orgManage/auditPersonal',
      method: 'post',
      data: {
        params
      }
    })
  },
  business(params) {
    return fetch({
      url: FLY + '/orgManage/auditBusiness',
      method: 'post',
      data: {
        params
      }
    })
  }
}
/**
 * 飞虎队机构查询城市管家
 */
export function fhdAuditQueryCityManagerApi(params) {
  return fetch({
    url: FLY + '/orgManage/queryCityManager',
    method: 'post',
    data: {
      method: 'post',
      params
    }
  })
}
/**
 * 飞虎队标记
 * */
export function fhdAuditMarkFlyingApi(params) {
  return fetch({
    url: FLY + '/orgManage/markFlying',
    method: 'post',
    data: {
      method: 'post',
      params
    }
  })
}

export const fhdAuditApi = {
  queryByMobile(params) {
    return fetch({
      url: FLY + '/orgManage/queryBankInfoByMobile',
      method: 'post',
      data: {
        method: 'queryByMobile',
        params
      }
    })
  },
  updateBankCard(params) {
    return fetch({
      url: FLY + '/orgManage/updateBankCard ',
      method: 'post',
      data: {
        params
      }
    })
  }
}
