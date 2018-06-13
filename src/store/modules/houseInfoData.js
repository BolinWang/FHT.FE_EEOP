const houseInfoData = {
  state: {
    houseInfo: {
      picList: [],
      remark: '',
      desc: '',
      reviewStatus: '',
      accordPic: ''
    },
    estateInfo: {
      picList: [],
      remark: '',
      desc: '',
      reviewStatus: '',
      accordPic: ''
    }
  },

  mutations: {
    SET_INFODATA: (state, params) => {
      const typeStr = params.housingType === 2 ? 'houseInfo' : 'estateInfo'
      state[typeStr] = params.data
    }
  },

  actions: {
    UpdateInfoData({ commit }, params) {
      commit('SET_INFODATA', params)
    }
  }
}

export default houseInfoData
