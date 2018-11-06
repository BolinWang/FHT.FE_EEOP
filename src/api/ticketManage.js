/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-11-05 11:00:22
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-11-06 13:57:17
 */

import fetch from '@/utils/fetch'

// 抵扣券管理
export const voucherManageApi = {
  baseUrl: '/market/coupon',
  queryMethod: 'list',
  list(params = {}) {
    return fetch({
      url: this.baseUrl,
      isMock: true,
      method: 'post',
      data: {
        method: this.queryMethod,
        params
      }
    })
  },
  createCouponRedeemCode(params = {}) {
    return fetch({
      url: this.baseUrl,
      isMock: true,
      method: 'post',
      data: {
        method: 'createCouponRedeemCode',
        params
      }
    })
  }
}
