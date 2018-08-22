const estateDetailData = {
  state: {
    estateInfo: {
      estateName: '',
      provinceId: '',
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
      pictureList: [],
      pictureUploadList: [],
      services: '',
      storeServices: '',
      surroundings: '',
      floors: [],
      roomTypeList: [],
      sourceInfo: ''
    },
    fangyuanCode: '',
    estateRoomInfo: {
      'bedCount': null,
      'boardCount': null,
      'chamberCount': null,
      'decorationDegree': null,
      'endNo': null,
      'fangyuanCode': '',
      'floorId': null,
      'maxPerson': null,
      'roomArea': null,
      'roomDirection': null,
      'roomTypeId': null,
      'skipNo': '',
      'startNo': null,
      'toiletCount': null
    }
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
        // areaCode: [], // 省市区列表
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
        // estatePics: [], // 集中式公寓图片
        pictureList: [],
        pictureUploadList: [],
        services: '',
        storeServices: '',
        surroundings: '',
        floors: [],
        roomTypeList: []
        // roomTypePics: []
      }
    },
    UPDATE_ESTATE_DETAIL_DATA: (state, params) => {
      params.tag = params.tag ? 1 : 0
      state.estateInfo = Object.assign(state.estateInfo, params)
    },
    SET_ESTATEROOMDATA: (state, params) => {
      state.estateRoomInfo = {
        ...params
      }
    }
  },

  actions: {
    UpdateInfoData({ commit }, params) {

    }
  }

}

export default estateDetailData
