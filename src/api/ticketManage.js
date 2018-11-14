/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-11-05 11:00:22
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-11-09 15:10:44
 */

import fetch from '@/utils/fetch'

// 抵扣券管理
export const voucherManageApi = {
  baseUrl: '/market/coupon',
  queryMethod: 'queryCouponListByPage',
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
  },
  grantingCoupon(params = {}) {
    return fetch({
      url: this.baseUrl,
      isMock: true,
      method: 'post',
      data: {
        method: 'grantingCoupon',
        params
      }
    })
  },
  editCouponStatus(params = {}) {
    return fetch({
      url: this.baseUrl,
      isMock: true,
      method: 'post',
      data: {
        method: 'editCouponStatus',
        params
      }
    })
  },
  queryOneCouponInfo(params = {}) {
    return fetch({
      url: this.baseUrl,
      isMock: true,
      method: 'post',
      data: {
        method: 'queryOneCouponInfo',
        params
      }
    })
  },
  saveCoupon(params = {}) {
    return fetch({
      url: this.baseUrl,
      isMock: true,
      method: 'post',
      data: {
        method: 'saveCoupon',
        params
      }
    })
  },
  queryRedeemCodeUsedInfo(params = {}) {
    return fetch({
      url: this.baseUrl,
      isMock: true,
      method: 'post',
      data: {
        method: 'queryRedeemCodeUsedInfo',
        params
      }
    })
  },
  queryRedeemCodeByCouponId(params = {}) {
    return fetch({
      url: this.baseUrl,
      isMock: true,
      method: 'post',
      data: {
        method: 'queryRedeemCodeByCouponId',
        params
      }
    })
  }
}

export const voucherRecordApi = {
  baseUrl: '/market/coupon',
  queryMethod: 'queryCouponUsedList',
  list(params = {}) {
    return fetch({
      url: this.baseUrl,
      isMock: true,
      method: 'post',
      data: {
        method: 'queryCouponUsedList',
        params
      }
    })
  }
}
