/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-11-05 10:52:42
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-11-08 18:10:19
 */
const dataList = [
  {
    'id': 1,
    'couponCode': '1',
    'couponActivityCode': 'MJGY20180906',
    'couponName': '麦邻租房抵扣券',
    'img': null,
    'discountAmount': 50,
    'billType': 1,
    'fullMoney': 1000,
    'useRange': '房租（上海市、杭州市）',
    'expireDays': 30,
    'couponDesc': ' 1、此优惠券仅限用于抵扣上海市、杭州市非金融房源在线支付租房订单首笔月租金\r\n 2、此优惠券使用期限自领取日开始30天内，过期自动失效\r\n 3、同一个账号，同一个租房订单仅限使用1次\r\n 4、优惠券不可叠加使用，不兑现金，消费抵扣后不予退还\r\n 5、本活动最终解释权归麦邻租房所有',
    'gmtCreateId': null,
    'gmtCreate': 1533089253000,
    'gmtModifiedId': null,
    'gmtModified': 1533089253000,
    'status': 1,
    'totalNum': 1000,
    'couponType': 1,
    'statusStr': '启用中',
    'createTimeStr': '2018-08-01 10:07:33'
  }
]

export const voucherManageApi = {
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
  },
  grantingCoupon: config => {
    return {
      'reqId': null,
      'code': '0',
      'message': '操作成功',
      'data': null
    }
  }
}

const recordList = [
  {
    'id': 11,
    'customerId': 751,
    'couponCode': '1',
    'billNo': null,
    'startTime': 1534921140000,
    'receiveSource': null,
    'endTime': 1534107210000,
    'status': 1,
    'createTime': 1534921181000,
    'sourceType': null,
    'redeemCode': null,
    'operateId': null,
    'receiveTime': null,
    'gmtModified': null,
    'couponName': '麦邻租房抵扣券',
    'discountAmount': 50,
    'userMobile': '13524933235',
    'operateName': '系统',
    'statusStr': '已使用',
    'createTimeStr': '2018-08-22 14:59:41',
    'gmtModifiedStr': null,
    'receiveSourceStr': '系统'
  }
]
export const voucherRecordApi = {
  list: (config) => {
    const { pageNo, pageSize } = JSON.parse(config.body).params
    const assignObj = {
      'totalPages': Math.ceil(recordList.length / pageSize),
      'totalElements': recordList.length,
      'size': pageSize
    }
    const resData = recordList.slice((pageNo - 1) * pageSize, pageNo * pageSize)
    return {
      code: '0',
      data: {
        content: resData,
        ...assignObj
      }
    }
  }
}
