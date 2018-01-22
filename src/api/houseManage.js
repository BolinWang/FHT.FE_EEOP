import fetch from '@/utils/fetch';

/* 查询已有公寓城市列表 */
export function getCityListApi(params = {}) {
    return fetch({
        url: '/api/market/estate/',
        method: 'post',
        data: {
            method: 'hasCityList',
            params
        }
    });
}

/* 获取表格数据 */
export function getGridApi(params) {
    return fetch({
        url: '/api/market/estate/',
        method: 'post',
        data: {
            method: 'queryEstateListByPage',
            params
        }
    });
}

/* 下架、排序 */
export function saveDataApi(params) {
    return fetch({
        url: '/api/market/estate/',
        method: 'post',
        data: {
            method: 'saveEstate',
            params
        }
    });
}

