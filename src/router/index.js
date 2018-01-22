/**
    * author : bolin
    * icon : slider图标
    * hidden : 菜单隐藏
    * redirect : ‘noRedirect’ 面包屑链接配置
    * noDropdown : ’noDropdown:true‘ 下拉菜单
    * meta : ‘{ role: ['admin'] }‘ 权限
 **/

import Vue from 'vue';
import Router from 'vue-router';
import '../icons'
import Layout from '../views/layout/Layout';
const _import = require('./_import_' + process.env.NODE_ENV);

/* pages */
const Form = _import('page/form');
const Table = _import('table/index');

Vue.use(Router);

export const constantRouterMap = [
    { path: '/login', component: _import('login/index'), hidden: true },
    { path: '/404', component: _import('404'), hidden: true },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        name: 'Home',
        hidden: true,
        children: [{ path: 'dashboard', component: _import('dashboard/index') }]
    }
]

export default new Router({
    /*mode: 'history', //需要服务器配置路由 */
    scrollBehavior: () => ({ y: 0 }), //后退后页面位置
    routes: constantRouterMap
});

export const asyncRouterMap = [{
        path: '/eeop',
        component: Layout,
        redirect: 'noredirect',
        name: '运营管理',
        icon: 'dashboard',
        children: [
            { path: 'activityPage', component: _import('eeop/activety'), name: '精彩活动' },
            { path: 'interviewPage', component: _import('eeop/interview'), name: '麦友专访' },
            { path: 'advertisPage', component: _import('eeop/advertis'), name: '推广广告页' },
            { path: 'bannerPage', component: _import('eeop/banner'), name: '首页焦点图' }
        ]
    },
    {
        path: '/houseManage',
        component: Layout,
        redirect: '/houseManage/displayPage',
        name: '房源管理',
        icon: 'table',
        children: [
            { path: 'displayPage', component: _import('houseManage/promotionDisplay'), name: '推广展示' },
            { path: 'auditCenterPage', component: _import('houseManage/auditCenter'), name: '电子签章审核' },
            { path: 'queryCenterPage', component: _import('houseManage/queryCenter'), name: '查询中心' }
        ]
    },
    {
        path: '/userManage',
        component: Layout,
        redirect: '/userManage/feedbackPage',
        name: '用户管理',
        icon: 'peoples',
        children: [
            { path: 'userListPage', component: Table, name: '账号管理', meta: { role: ['admin'] }},
            { path: 'feedbackPage', component: Table, name: '意见反馈' },
            { path: 'userInfoPage', component: Table, name: '用户信息' }
        ]
    },
    { path: '*', redirect: '/404', hidden: true }
];