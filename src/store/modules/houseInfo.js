const houseInfo = {
  state: {
    picList: [],
    remark: '',
    desc: '',
    reviewStatus: '',
    accordPic: ''
  },

  mutations: {
    SET_DATA: (state, data) => {
      state.picList = data.picList || []
      state.remark = data.remark || ''
      state.desc = data.desc || ''
      state.reviewStatus = data.reviewStatus || ''
      state.accordPic = data.accordPic || ''
    }
  },

  actions: {
    UpdateHouseInfoData({ commit }, data) {
      commit('SET_DATA', data)
    }
  }
}

export default houseInfo
