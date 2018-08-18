import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import houseInfoData from './modules/houseInfoData'
import estateDetailData from './modules/estateDetailData'
import fhdAuditData from './modules/fhdAuditData'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    tagsView,
    houseInfoData,
    estateDetailData,
    fhdAuditData
  },
  getters
})

export default store
