const estateDetailData = {
  state: {
    estateInfo: {
      estateName: '',
      provinceId: '',
      areaCode: [], // 省市区列表
      cityId: '',
      regionId: '',
      zoneId: '',
      address: '', // 详细地址
      subdistrictAddress: '',
      subdistrictName: '',
      regionAddressId: '',
      contactName: '',
      contactGender: '',
      contactMobile: '',
      houseDesc: '',
      orgId: '',
      orgName: '', // 组织名称
      accountName: '',
      adminUserId: '',
      tag: 0,
      estatePics: [], // 集中式公寓图片
      pictureList: [],
      pictureUploadList: [],
      services: '',
      storeServices: '',
      surroundings: '',
      floors: [],
      roomTypeList: [],
      roomTypePics: []
    },
    fangyuanCode: ''
  },

  mutations: {
    SET_ESTATEDATA: (state, params) => {
      state.estateInfo = {
        ...params
      }
    },
    SET_FANGYUANCODE: (state, code) => {
      state.fangyuanCode = code
    },
    CLEAR_ESTATEDATA: (state, params) => {
      state.estateInfo = {
        estateName: '',
        provinceId: '',
        areaCode: [], // 省市区列表
        cityId: '',
        regionId: '',
        zoneId: '',
        address: '', // 详细地址
        subdistrictAddress: '',
        subdistrictName: '',
        regionAddressId: '',
        contactName: '',
        contactGender: '1',
        contactMobile: '',
        houseDesc: '',
        orgId: '',
        orgName: '', // 组织名称
        accountName: '',
        adminUserId: '',
        tag: 0,
        estatePics: [], // 集中式公寓图片
        pictureList: [],
        pictureUploadList: [],
        services: '',
        storeServices: '',
        surroundings: '',
        floors: [],
        roomTypeList: [],
        roomTypePics: []
      }
    },
    UPDATE_ESTATE_DETAIL_DATA: (state, params) => {
      params.tag = params.tag ? 1 : 0
      state.estateInfo = Object.assign(state.estateInfo, params)
    }
  },

  actions: {
    UpdateInfoData({ commit }, params) {

    }
  },

  getters: {
    formatEstateDetailData: state => {
      const aaa = state.estateInfo
      aaa.areaCode = [aaa.provinceId, aaa.cityId, aaa.regionId]
      aaa.estatePics = aaa.pictureList
      aaa.roomTypePics = aaa.roomTypeList
      aaa.tag = aaa.tag === 1 ? true : false
      aaa.address = aaa.subdistrictName ? (aaa.subdistrictName + ' - ' + aaa.subdistrictAddress) : ''
      return aaa
    },
    estateDeviceCheckedList: state => {
      const aaa = {
        services: state.estateInfo.services ? state.estateInfo.services.split(',') : [],
        storeServices: state.estateInfo.storeServices ? state.estateInfo.storeServices.split(',') : [],
        surroundings: state.estateInfo.surroundings ? state.estateInfo.surroundings.split(',') : []
      }
      return aaa
    }
  }
}

export default estateDetailData
