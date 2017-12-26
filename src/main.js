import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import 'normalize.css/normalize.css'
import IconSvg from '@/components/Icon-svg/index.vue'
import { getToken } from '@/utils/auth'
import * as filters from './filters'
import VuePreview from 'vue-preview'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VuePreview);
Vue.use(VueLazyload);
Vue.component('icon-svg', IconSvg)

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
});

const whiteList = ['/login'];
router.beforeEach((to, from, next) => {
    NProgress.start();
    if (getToken()) {
        if (to.path === '/login') {
            next({ path: '/' });
        } else {
            if (store.getters.roles.length === 0) {
                store.dispatch('GetInfo').then(res => {
                    const roles = res.data.role;
                    store.dispatch('GenerateRoutes', { roles }).then(() => {
                        router.addRoutes(store.getters.addRouters);
                        next({ ...to });
                    })
                })
            } else {
                next();
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login');
            NProgress.done();
        }
    }
});

router.afterEach(() => {
    NProgress.done();
});

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})