import fetch from '@/utils/fetch'

/* 查询已有公寓城市列表 */
export function getCityListApi(params = {}) {
  return fetch({
    url: '/market/estate/',
    method: 'post',
    data: {
      method: 'hasCityList',
      params
    }
  })
}

/* 获取表格数据 */
export function getGridApi(params) {
  return fetch({
    url: '/market/estate/',
    method: 'post',
    data: {
      method: 'queryEstateListByPage',
      params
    }
  })
}

/* 下架、排序 */
export function saveDataApi(params) {
  return fetch({
    url: '/market/estate/',
    method: 'post',
    data: {
      method: 'saveEstate',
      params
    }
  })
}

/* 房源数据报表列表 */
export function marketOrgHouseReportListApi(params) {
  return fetch({
    url: '/market/report/',
    method: 'post',
    data: {
      method: 'marketOrgHouseReportList',
      params
    }
  })
}

/* 查询中心 城市公寓列表 */
export function marketCityAndSubdistrictListApi(params) {
  return fetch({
    url: '/market/center/',
    method: 'post',
    data: {
      method: 'marketCityAndSubdistrictList',
      params
    }
  })
}

/* 查询中心 房源列表 */
export function marketReviewCheckListByPageApi(params) {
  return fetch({
    url: '/market/center/',
    method: 'post',
    data: {
      method: 'marketReviewCheckListByPage',
      params
    }
  })
}

/* OTA账号绑定授权 */
export const authorizeApi = {
  defaultOptions: {
    requestUrl: '/market/account',
    method: 'list'
  },
  list(params) {
    return fetch({
      url: authorizeApi.defaultOptions.requestUrl,
      method: 'post',
      data: {
        method: authorizeApi.defaultOptions.method,
        params
      }
    })
  },
  bind(params) {
    return fetch({
      url: '/market/account',
      method: 'post',
      data: {
        method: 'binding',
        params
      }
    })
  },
  status(params) {
    return fetch({
      url: '/market/account',
      method: 'post',
      data: {
        method: 'binding/status',
        params
      }
    })
  },
  picture(params) {
    return fetch({
      url: '/market/account',
      method: 'post',
      data: {
        method: 'acquire/picture',
        params
      }
    })
  }
}

/* 合作账号绑定授权 */
export const houseAsyncApi = {
  defaultOptions: {
    requestUrl: '/market/rooms',
    method: 'list'
  },
  list(params) {
    return fetch({
      url: houseAsyncApi.defaultOptions.requestUrl,
      method: 'post',
      data: {
        method: houseAsyncApi.defaultOptions.method,
        params
      }
    })
  },
  bind(params) {
    return fetch({
      url: '/market/account',
      method: 'post',
      data: {
        method: 'binding',
        params
      }
    })
  },
  publish(params) {
    return fetch({
      url: '/market/rooms',
      method: 'post',
      data: {
        method: 'publish',
        params
      }
    })
  },
  offshlef(params) {
    return fetch({
      url: '/market/rooms',
      method: 'post',
      data: {
        method: 'offshelf',
        params
      }
    })
  }
}

/* 集中式楼层列表 */
export function estateRoomFloorApi(params) {
  return fetch({
    url: 'http://localhost:9528/api/market/fangyuan',
    method: 'post',
    data: {
      method: 'queryFloorListByEstateId',
      params
    }
  })
}
