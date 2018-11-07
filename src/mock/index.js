import Mock from 'mockjs'
import { voucherManageApi, voucherRecordApi } from './ticketManage/voucherManage'

/**
 * 优惠券管理
 * -抵扣券管理
 */
Mock.mock(/\/market\/coupon\/queryCouponListByPage/, 'post', voucherManageApi.list)
Mock.mock(/\/market\/coupon\/grantingCoupon/, 'post', voucherManageApi.grantingCoupon)
Mock.mock(/\/market\/coupon\/createCouponRedeemCode/, 'post', voucherManageApi.createCouponRedeemCode)
Mock.mock(/\/market\/coupon\/queryCouponUsedList/, 'post', voucherRecordApi.list)

export default Mock
