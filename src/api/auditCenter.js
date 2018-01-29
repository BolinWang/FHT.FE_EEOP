import fetch from '@/utils/fetch';

/* 获取房源审核列表 */
export function queryReviewCheckListByPageApi(params = {}) {
    return fetch({
        url: '/api/market/review/',
        method: 'post',
        data: {
            method: 'queryReviewCheckListByPage',
            params
        }
    });
}

/* 房源审核结果编辑 */
export function saveReviewStatusApi(params) {
    return fetch({
        url: '/api/market/review/',
        method: 'post',
        data: {
            method: 'saveReviewStatus',
            params
        }
    });
}


/* 签章审核 */
export function signaturesHandleApi(params) {
    return fetch({
        url: '/api/market/audit/',
        method: 'post',
        data: {
            method: 'handle',
            params
        }
    });
}

/* 签章审核列表 */
export function signaturesListsApi(params) {
    return fetch({
        url: '/api/market/audit/',
        method: 'post',
        data: {
            method: 'list',
            params
        }
    });
}

