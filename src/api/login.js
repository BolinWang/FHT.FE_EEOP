import fetch from '@/utils/fetch';

export function login(email, password) {
    return fetch({
        url: '/user/login',
        method: 'post',
        data: {
            email,
            password
        }
    });
}

export function getInfo(token) {
    return fetch({
        url: 'https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin/user/info',
        method: 'get',
        params: { token }
    });
}

export function logout() {
    return fetch({
        url: '/user/logout',
        method: 'post'
    });
}