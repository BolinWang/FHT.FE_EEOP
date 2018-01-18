import fetch from '@/utils/fetch';

/* 获取表格数据 */
export function getGridApi(params) {
    return fetch({
        url: '/api/market/activity/',
        method: 'post',
        data: {
            method: 'queryActivityListByPage',
            params
        }
    });
}

/* 新增、编辑、排序、删除接口 */
export function saveDataApi(params) {
    return fetch({
        url: '/api/market/activity/',
        method: 'post',
        data: {
            method: 'saveActivity',
            params
        }
    });
}
