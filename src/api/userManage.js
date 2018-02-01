import fetch from '@/utils/fetch';

/* 获取用户列表 */
export function getGridApi(params={}) {
    return fetch({
        url: '/user/',
        method: 'post',
        data: {
            method: 'loadUserList',
            params
        }
    });
}

/* 重置密码、删除、新增 */
export function saveDataApi(params={}) {
    return fetch({
        url: '/user/',
        method: 'post',
        data: {
            method: 'saveUser',
            params
        }
    });
}

/* 修改个人信息 */
export function saveSelfDetailApi(params={}) {
    return fetch({
        url: '/user/',
        method: 'post',
        data: {
            method: 'saveSelfDetail',
            params
        }
    });
}

/* 意见反馈获取列表数据 */
export function queryFeedbackByPageApi(params={}) {
    return fetch({
        url: '/market/feedback/',
        method: 'post',
        data: {
            method: 'queryFeedbackByPage',
            params
        }
    });
}

/* 意见反馈删除 */
export function saveFeedbackApi(params={}) {
    return fetch({
        url: '/market/feedback/',
        method: 'post',
        data: {
            method: 'saveFeedback',
            params
        }
    });
}

/* 申请注册获取列表数据 */
export function queryUserRequestByPageApi(params={}) {
    return fetch({
        url: '/market/apply/',
        method: 'post',
        data: {
            method: 'queryUserRequestByPage',
            params
        }
    });
}

/* 申请注册保存 */
export function saveUserRequestApi(params={}) {
    return fetch({
        url: '/market/apply/',
        method: 'post',
        data: {
            method: 'saveUserRequest',
            params
        }
    });
}


/* 申请注册注册账号 */
export function registeredUserApi(params={}) {
    return fetch({
        url: '/market/apply/',
        method: 'post',
        data: {
            method: 'registeredUser',
            params
        }
    });
}


