import fetch from '@/utils/fetch';

/* 获取表格数据 */
export function getGridApi(params, urlPathObj) {
  return fetch({
    url: '/market/' + urlPathObj.urlPath + '/',
    method: 'post',
    data: {
      method: urlPathObj.queryMethod,
      params
    }
  });
}

/* 新增、编辑、排序、删除接口 */
export function saveDataApi(params, urlPathObj) {
  return fetch({
    url: '/market/' + urlPathObj.urlPath + '/',
    method: 'post',
    data: {
      method: urlPathObj.saveMethod,
      params
    }
  });
}

/* APP icon */
export const appIconApi = {
  defaultOptions: {
    requestUrl: '/market/icon',
    method: 'list'
  },
  add(params) {
    return fetch({
      url: appIconApi.defaultOptions.requestUrl,
      method: 'post',
      data: {
        method: 'add',
        params
      }
    })
  },
  edit(params) {
    return fetch({
      url: appIconApi.defaultOptions.requestUrl,
      method: 'post',
      data: {
        method: 'edit',
        params
      }
    })
  },
  delete(params) {
    return fetch({
      url: appIconApi.defaultOptions.requestUrl,
      method: 'post',
      data: {
        method: 'delete',
        params
      }
    })
  },
  list(params) {
    return fetch({
      url: appIconApi.defaultOptions.requestUrl,
      method: 'post',
      data: {
        method: defaultOptions.method,
        params
      }
    })
  },
  cityList(params = {}) {
    return fetch({
      url: appIconApi.defaultOptions.requestUrl,
      method: 'post',
      data: {
        method: 'cityList',
        params
      }
    })
  },
  configList(params = {}) {
    return fetch({
      url: appIconApi.defaultOptions.requestUrl,
      method: 'post',
      data: {
        method: 'codeList',
        params
      }
    })
  },
  saveSort(params = {}) {
    return fetch({
      url: appIconApi.defaultOptions.requestUrl,
      method: 'post',
      data: {
        method: 'saveSort',
        params
      }
    })
  }
}

/* 大麦消息 */
export const infomationApi = {
  defaultOptions: {
    requestUrl: '/market/news',
    method: 'list'
  },
  add(params) {
    return fetch({
      url: infomationApi.defaultOptions.requestUrl,
      method: 'post',
      data: {
        method: 'addNews',
        params
      }
    })
  },
  edit(params) {
    return fetch({
      url: infomationApi.defaultOptions.requestUrl,
      method: 'post',
      data: {
        method: 'editNews',
        params
      }
    })
  },
  delete(params) {
    return fetch({
      url: infomationApi.defaultOptions.requestUrl,
      method: 'post',
      data: {
        method: 'deleteNews',
        params
      }
    })
  },
  list(params) {
    return fetch({
      url: infomationApi.defaultOptions.requestUrl,
      method: 'post',
      data: {
        method: defaultOptions.method,
        params
      }
    })
  }
}

/* 热门推荐 */
export const hotRecommendApi = {
  defaultOptions: {
    requestUrl: '/market/hotKeyword',
    method: 'list'
  },
  add(params) {
    return fetch({
      url: hotRecommendApi.defaultOptions.requestUrl,
      method: 'post',
      data: {
        method: 'add',
        params
      }
    })
  },
  set(params) {
    return fetch({
      url: hotRecommendApi.defaultOptions.requestUrl,
      method: 'post',
      data: {
        method: 'recommendAndCancel',
        params
      }
    })
  },
  list(params) {
    return fetch({
      url: hotRecommendApi.defaultOptions.requestUrl,
      method: 'post',
      data: {
        method: defaultOptions.method,
        params
      }
    })
  },
}

