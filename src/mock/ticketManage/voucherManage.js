/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-11-05 10:52:42
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-11-06 14:04:57
 */
const dataList = [{
  'exampleId': 63,
  'title': '1',
  'introduction': '1',
  'picUrl': 'https://fh-mjgy-test.oss-cn-hangzhou.aliyuncs.com/20180829095020309793',
  'linkUrl': 'https://wwwtest.mdguanjia.com/activities/act_ticket/index.html',
  'activityStatus': 3,
  'effectiveTime': '2018-08-29 09:51:06',
  'ineffectiveTime': '2018-09-01 09:49:54',
  'sortNum': 48,
  'isDelete': 0,
  'gmtCreateId': '1360',
  'gmtCreate': '2018-08-29 09:51:06',
  'gmtModifiedId': '1360',
  'gmtModified': '2018-08-29 09:51:06',
  'operateType': null
}]

const voucherManageApi = {
  list: (config) => {
    const { pageNo, pageSize } = JSON.parse(config.body).params
    const assignObj = {
      'totalPages': Math.ceil(dataList.length / pageSize),
      'totalElements': dataList.length,
      'size': pageSize
    }
    const resData = dataList.slice((pageNo - 1) * pageSize, pageNo * pageSize)
    return {
      code: '0',
      data: {
        content: resData,
        ...assignObj
      }
    }
  },
  createCouponRedeemCode: config => {
    return {
      'reqId': null,
      'code': '0',
      'message': '操作成功',
      'data': null
    }
  }
}
export default voucherManageApi
