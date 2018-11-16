/*
 * @Author: ghost
 * @Date: 2018-11-14 19:47:32
 * @Last Modified by: ghost
 * @Last Modified time: 2018-11-14 20:17:13
 */

const dataCommunityList = [
  {
    'name': '恭亲王府',
    'address': '杭州市西城区前海西街17号-2号附近',
    'gaodeLongitude': '116.386543',
    'gaodeLatitude': '39.935715',
    'gaodeUid': null,
    'countryId': null,
    'provinceId': 110000,
    'cityId': 110100
  }
]
export const communityPagelistApi = (config) => {
  const { pageNo, pageSize } = JSON.parse(config.body).params
  const assignObj = {
    'totalPages': Math.ceil(dataCommunityList.length / pageSize),
    'totalElements': dataCommunityList.length,
    'size': pageSize
  }
  const resData = dataCommunityList.slice((pageNo - 1) * pageSize, pageNo * pageSize)
  return {
    code: '0',
    data: {
      content: resData,
      ...assignObj
    }
  }
}
