const fhdAuditData = {
  state: {
    personal: {},
    business: {}
  },

  mutations: {
    SET_FHDDATA: (state, params) => {
      const typeStr = params.rowData.type === 1 ? 'personal' : 'business'
      state[typeStr] = {
        ...params.rowData,
        ...params.data
      }
    }
  },

  actions: {
    UpdateFhdData({ commit }, params) {
      commit('SET_FHDDATA', params)
    }
  }
}

export default fhdAuditData
