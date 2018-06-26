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
  }), //后退后页面位置
  routes: constantRouterMap
});

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
    children: [{
        path: 'displayPage',
        component: _import('houseManage/promotionDisplay'),
        name: '推广展示'
      },
      {
        path: 'queryCenterPage',
        component: _import('houseManage/queryCenter'),
        name: '查询中心'
      },
      {
        path: 'dataReportPage',
        component: _import('houseManage/dataReport'),
        name: '房源报表'
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
    //  {
    //     path: 'auditFhd',
    //     component: _import('auditManage/auditFhd'),
    //     name: '飞虎队机构'
    //   },
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
        path: 'initOrgList',
        component: _import('userManage/initOrgList'),
        name: '组织列表'
      }
    ]
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
