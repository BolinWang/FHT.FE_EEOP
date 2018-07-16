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
  list(params) {
    return fetch({
      url: '/market/ota/list',
      method: 'post',
      data: {
        params
      }
    })
  },
  bind(params) {
    return fetch({
      url: '/market/ota/account/binding',
      method: 'post',
      data: {
        params
      }
    })
  },
  status(params) {
    return fetch({
      url: '/market/account/binding/status',
      method: 'post',
      data: {
        params
      }
    })
  },
  picture(params) {
    return fetch({
      url: '/market/account/acquire/picture',
      method: 'post',
      data: {
        params
      }
    })
  }
}

/* 合作账号绑定授权 */
export const houseAsyncApi = {
  list(params) {
    return fetch({
      url: '/market/rooms',
      method: 'post',
      data: {
        params
      }
    })
  },
  bind(params) {
    return fetch({
      url: '/market/ota/account/binding',
      method: 'post',
      data: {
        params
      }
    })
  },
  switch(params) {
    return fetch({
      url: '/market/ota/account/switch',
      method: 'post',
      data: {
        params
      }
    })
  },
  publish(params) {
    return fetch({
      url: '/market/rooms/publish',
      method: 'post',
      data: {
        params
      }
    })
  },
  offshlef(params) {
    return fetch({
      url: '/market/rooms/offshlef',
      method: 'post',
      data: {
        params
      }
    })
  }
}
