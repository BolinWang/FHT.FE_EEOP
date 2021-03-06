/**
 * author : bolin
 * icon : slider图标
 * hidden : 菜单隐藏
 * redirect : ‘noRedirect’ 面包屑链接配置
 * noDropdown : ’noDropdown:true‘ 下拉菜单
 * meta : ‘{ role: ['admin'] }‘ 权限
 **/

import Vue from 'vue'
import Router from 'vue-router'
import '../icons'
import Layout from '../views/layout/Layout'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

export const constantRouterMap = [{
  path: '/login',
  component: _import('login/index'),
  hidden: true
},
{
  path: '/404',
  component: _import('404'),
  hidden: true
},
{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  name: 'Home',
  hidden: true,
  children: [{
    path: 'dashboard',
    name: '首页',
    component: _import('dashboard/index')
  }]
}
]

export default new Router({
  // mode: 'history', //需要服务器配置路由
  scrollBehavior: () => ({
    y: 0
  }), // 后退后页面位置
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/eeop',
    component: Layout,
    redirect: 'noredirect',
    name: '运营管理',
    icon: 'icon_eeop',
    meta: {
      role: ['admin', 'global']
    },
    children: [{
      path: 'activityPage',
      component: _import('eeop/activety'),
      name: '精彩活动'
    },
    {
      path: 'interviewPage',
      component: _import('eeop/interview'),
      name: '麦友专访'
    },
    {
      path: 'advertisPage',
      component: _import('eeop/advertis'),
      name: '推广广告页'
    },
    {
      path: 'bannerPage',
      component: _import('eeop/banner'),
      name: '首页焦点图'
    },
    {
      path: 'appIcon',
      component: _import('eeop/appIcon'),
      name: 'icon展示'
    },
    {
      path: 'infomation',
      component: _import('eeop/infomation'),
      name: '大麦消息'
    },
    {
      path: 'hotRecommend',
      component: _import('eeop/hotRecommend'),
      name: '热门推荐'
    }
    ]
  },
  {
    path: '/houseManage',
    component: Layout,
    redirect: 'noredirect',
    name: '房源管理',
    icon: 'icon_house',
    meta: {
      role: ['admin', 'global']
    },
    children: [
      {
        path: '/houseManage/estatePage',
        component: _import('houseManage/estate'),
        noDropdown: true,
        children: [
          {
            path: 'estateList',
            name: '集中式房源',
            component: _import('houseManage/estate/estateList')
          },
          {
            path: 'estateRoomList',
            name: '集中式房间列表',
            component: _import('houseManage/estate/singleEstateRoom'),
            meta: {
              noTags: true,
              parentPath: '/houseManage/estatePage/estateList',
              parentName: '集中式房源',
              meta: {}
            }
          },
          {
            path: 'photoUpload',
            name: '上传图片',
            component: _import('houseManage/estate/photoUpload')
          }
        ]
      }, {
        path: 'hostingPage',
        component: _import('houseManage/hostingList'),
        name: '分散式房源'
      }, {
        path: 'authorize',
        component: _import('houseManage/authorize'),
        name: 'OTA账号授权'
      }, {
        path: 'houseSync',
        component: _import('houseManage/houseSync'),
        name: 'OTA房源发布'
      }, {
        path: 'displayPage',
        component: _import('houseManage/promotionDisplay'),
        name: '推广展示'
      }, {
        path: 'queryCenterPage',
        component: _import('houseManage/queryCenter'),
        name: '查询中心'
      }, {
        path: 'dataReportPage',
        component: _import('houseManage/dataReport'),
        name: '房源报表'
      }
    ]
  },
  {
    path: '/ticketManage',
    component: Layout,
    redirect: 'noredirect',
    name: '优惠券管理',
    icon: 'icon_tickets',
    meta: {
      role: ['admin', 'global']
    },
    children: [
      {
        path: '',
        component: _import('ticketManage/voucherManage'),
        name: '抵扣券管理'
      },
      {
        path: 'voucherRecord',
        component: _import('ticketManage/voucherRecord'),
        name: '抵扣券记录'
      }
    ]
  },
  {
    path: '/auditManage',
    component: Layout,
    redirect: 'noredirect',
    name: '审核中心',
    icon: 'icon_audit',
    meta: {
      role: ['admin', 'global']
    },
    children: [
      {
        path: 'auditFhd',
        component: _import('auditManage/auditFhd'),
        name: '飞虎队机构'
      },
      {
        path: 'auditSignatures',
        component: _import('auditManage/auditSignatures'),
        name: '电子签章审核'
      },
      {
        path: 'auditPublishList',
        component: _import('auditManage/auditPublishList'),
        name: '房源发布审核'
      },
      {
        path: 'publishedList',
        component: _import('auditManage/publishedList'),
        name: '已发布房源'
      }
    ]
  },
  {
    path: '/userManage',
    component: Layout,
    redirect: '/userManage/feedbackPage',
    name: '用户管理',
    icon: 'icon_user',
    meta: {
      role: ['admin', 'global']
    },
    children: [{
      path: 'userListPage',
      component: _import('userManage/userList'),
      name: '账号管理',
      meta: {
        role: ['admin']
      }
    },
    {
      path: 'feedbackPage',
      component: _import('userManage/feedback'),
      name: '意见反馈'
    },
    {
      path: 'applyRegister',
      component: _import('userManage/applyRegister'),
      name: '申请注册'
    },
    {
      path: 'initCustomerList',
      component: _import('userManage/initCustomerList'),
      name: '用户信息'
    },
    {
      path: 'customerSource',
      component: _import('userManage/customerSource'),
      name: '意向客源'
    },
    {
      path: 'initOrgList',
      component: _import('userManage/initOrgList'),
      name: '组织列表'
    }
    ]
  }, {
    path: '/fhdManage',
    component: Layout,
    name: '飞虎队项目',
    icon: 'excel',
    meta: {
      role: ['admin', 'global']
    },
    children: [{
      path: 'rentingABill',
      component: _import('fhdManage/rentingABill'),
      name: '催租账单'
    }, {
      path: 'organManagement',
      component: _import('fhdManage/organManagement'),
      name: '机构管理'
    }, {
      path: 'organBlack',
      component: _import('fhdManage/organBlack'),
      name: '黑名单机构'
    }, {
      path: 'customersCenter',
      component: _import('fhdManage/customersCenter'),
      name: '客源中心'
    }]
  },
  // {
  //   path: '/serviceManage',
  //   component: Layout,
  //   redirect: '/serviceManage/searchHouseSource',
  //   name: '管家看房',
  //   icon: 'wechat',
  //   meta: {
  //     role: ['admin', 'global', 'service']
  //   },
  //   children: [{
  //       path: 'searchHouseSource',
  //       component: _import('serviceManage/searchHouseSource'),
  //       name: '筛选房源分配'
  //     },
  //     {
  //       path: 'lookRecord',
  //       component: _import('serviceManage/lookRecord'),
  //       name: '房源带看记录'
  //     },
  //   ]
  // },
  // {
  //     path: '/fulfillmentCenter',
  //     component: Layout,
  //     redirect: '/fulfillmentCenter/coupon',
  //     name: '运营中心',
  //     icon: 'activity',
  //     meta: { role: ['admin', 'global'] },
  //     children: [
  //         { path: 'coupon', component: _import('fulfillmentCenter/coupon'), name: '优惠活动'},
  //         { path: 'statisticsQuery', component: _import('fulfillmentCenter/statisticsQuery'), name: '统计查询'},
  //     ]
  // },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
