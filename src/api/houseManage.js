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

/* 集中式查询单个公寓详情 */
export function estateRoomDetailApi(params) {
  return fetch({
    url: '/market/fangyuan',
    method: 'post',
    data: {
      method: 'queryOneFangyuan',
      params
    }
  })
}

/* 集中式楼层列表 */
export function estateRoomFloorApi(params) {
  return fetch({
    url: '/market/fangyuan',
    method: 'post',
    data: {
      method: 'queryFloorListByEstateId',
      params
    }
  })
}

/* 集中式模糊查询具体位置 */
export function estateAddressByKeywordsApi(params) {
  return fetch({
    url: '/market/fangyuan',
    method: 'post',
    data: {
      method: 'searchAddressByKeyword',
      params
    }
  })
}

/* 集中式根据区id查询板块列表 */
export function estateZoneListByAreaIdApi(params) {
  return fetch({
    url: '/market/fangyuan',
    method: 'post',
    data: {
      method: 'queryZoneListByAreaId',
      params
    }
  })
}

/* 集中式查询房源基础设施列表 */
export function estateDeviceListApi(params) {
  return fetch({
    url: '/market/fangyuan',
    method: 'post',
    data: {
      method: 'queryBaseSupportList',
      params
    }
  })
}

/* 集中式查询房源组织列表 */
export function estateOrgListApi(params) {
  return fetch({
    url: '/market/fangyuan',
    method: 'post',
    data: {
      method: 'queryOrgListByName',
      params
    }
  })
}

/* 集中式查询单个公寓下面房间列表 */
export function estateBatchCopyRoomListApi(params) {
  return fetch({
    url: '/market/fangyuan',
    method: 'post',
    data: {
      method: 'allRoomByFangyuanCode',
      params
    }
  })
}

/* 集中式新建公寓保存 */
export function estateNewEstateSaveApi(params) {
  return fetch({
    url: '/market/fangyuan',
    method: 'post',
    data: {
      method: 'saveEstateInfo',
      params
    }
  })
}

/* 集中式删除公寓 */
export function estateDeleteEstateApi(params) {
  return fetch({
    url: '/market/fangyuan',
    method: 'post',
    data: {
      method: 'deleteHouse',
      params
    }
  })
}

/* 集中式新增小区 */
export function estateNewSubdistrictApi(params) {
  return fetch({
    url: '/market/fangyuan',
    method: 'post',
    data: {
      method: 'addSubdistrict',
      params
    }
  })
}

/* 集中式保存复制到数据 */
export function copyToOtherRoomApi(params) {
  return fetch({
    url: '/market/fangyuan',
    method: 'post',
    data: {
      method: 'copyToOtherRoom',
      params
    }
  })
}

/* 集中式获取交租方式列表 */
export function estateRoomRentPayWayApi(params) {
  return fetch({
    url: '/market/fangyuan',
    method: 'post',
    data: {
      method: 'queryEstateRoomRentType',
      params
    }
  })
}

/* 集中式获取交租方式列表 */
export function saveEstateRoomRentPayWayApi(params) {
  return fetch({
    url: '/market/fangyuan',
    method: 'post',
    data: {
      method: 'editEstateRoomRentType',
      params
    }
  })
}

/* 集中式查询单个房间详情 */
export function oneEstateRoomApi(params) {
  return fetch({
    url: '/market/fangyuan',
    method: 'post',
    data: {
      method: 'queryOneEstateRoom',
      params
    }
  })
}

/* 集中式保存单个房间详情 */
export function saveEstateRoomApi(params, type) {
  return fetch({
    url: '/market/fangyuan',
    method: 'post',
    data: {
      method: type === 1 ? 'saveEstateRoomInfo' : 'editEstateRoomInfo', // 1 新建 2 编辑
      params
    }
  })
}

/* 集中式编辑公寓基本信息 */
export function saveEstateBasicInfoApi(params) {
  return fetch({
    url: '/market/fangyuan',
    method: 'post',
    data: {
      method: 'editEstateBasicInfo',
      params
    }
  })
}

/* 集中式编辑公寓楼层信息 */
export function saveEstateFloorInfoApi(params) {
  return fetch({
    url: '/market/fangyuan',
    method: 'post',
    data: {
      method: 'editEstateFloorInfo',
      params
    }
  })
}

/* 集中式编辑公寓房型信息 */
export function saveEstateRoomTypeInfoApi(params) {
  return fetch({
    url: '/market/fangyuan',
    method: 'post',
    data: {
      method: 'editEstateRoomTypeInfo',
      params
    }
  })
}

/* 发布撤销房源 */
export function publishHouseApi(params, type) {
  return fetch({
    url: '/market/fangyuan',
    method: 'post',
    data: {
      method: type === 1 ? 'publish' : 'unpublish', // 1.发布 2.撤销
      params
    }
  })
}

/* 检查房间是否有智能设备 */
export function checkRoomHasDeviceApi(params) {
  return fetch({
    url: '/market/fangyuan',
    method: 'post',
    data: {
      method: 'checkRoomHasDevice',
      params
    }
  })
}

/* 集中式删除房间 */
export function deleteRoomApi(params) {
  return fetch({
    url: '/market/fangyuan',
    method: 'post',
    data: {
      method: 'deleteRoom',
      params
    }
  })
}

/* 集中式房态管理 */
export function changeRoomStatusApi(params) {
  return fetch({
    url: '/market/fangyuan',
    method: 'post',
    data: {
      method: 'batchChangeLeaseStatus',
      params
    }
  })
}

/* 分散式查询房源列表 */
export function hostingHouseListApi(params) {
  return fetch({
    url: '/market/fangyuan',
    method: 'post',
    data: {
      method: 'queryHostingHouseList',
      params
    }
  })
}

/* 分散式查询房间详情 */
export function hostingRoomDetailApi(params) {
  return fetch({
    url: '/market/fangyuan',
    method: 'post',
    data: {
      method: 'queryHostingHouseInfo',
      params
    }
  })
}

/* 分散式新增房间保存 */
export function hostingSaveHouseInfoApi(params) {
  return fetch({
    url: '/market/fangyuan',
    method: 'post',
    data: {
      method: 'saveHostingHouseInfo',
      params
    }
  })
}

/* 分散式编辑房间保存 */
export function hostingEditHouseInfoApi(params) {
  return fetch({
    url: '/market/fangyuan',
    method: 'post',
    data: {
      method: 'editHostingHouseInfo',
      params
    }
  })
}

/* 分散式查询交租方式 */
export function hostingRoomRentTypeApi(params) {
  return fetch({
    url: '/market/fangyuan',
    method: 'post',
    data: {
      method: 'queryHostingRoomRentType',
      params
    }
  })
}

/* 分散式查询复制到房源列表 */
export function hostingCopyItemsRoomsApi(params) {
  return fetch({
    url: '/market/fangyuan',
    method: 'post',
    data: {
      method: 'queryAllHostingHouse',
      params
    }
  })
}

/* 分散式保存复制到 */
export function hostingSaveCopyItemsApi(params) {
  return fetch({
    url: '/market/fangyuan',
    method: 'post',
    data: {
      method: 'hostingCopyTo',
      params
    }
  })
}

/* 上传小区环境图片 */
export function uploadHousesPicturesApi(params) {
  return fetch({
    url: '/market/fangyuan',
    method: 'post',
    data: {
      method: 'uploadHousesPictures',
      params
    }
  })
}
