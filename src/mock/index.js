import Mock from 'mockjs'
import voucherManageApi from './ticketManage/voucherManage'

/**
 * 优惠券管理
 * -抵扣券管理
 */
Mock.mock(/\/market\/coupon\/list/, 'post', voucherManageApi.list)
Mock.mock(/\/market\/coupon\/createCouponRedeemCode/, 'post', voucherManageApi.createCouponRedeemCode)

export default Mock
