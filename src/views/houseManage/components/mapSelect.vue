<template>
  <div>
    <el-tooltip :disabled="!specificAddress" class="item" effect="dark" :content="specificAddress" placement="top-start">
      <el-select class="map-address-select" v-model="specificAddress" filterable remote :clearable="true" placeholder="请输入关键词" :remote-method="fetchAddressList" :loading="loading" @focus="checkAddressSelect" @clear="clearAddress" :popper-append-to-body="false">
        <el-option v-for="(item, index) in addressList" :key="index" v-html="item.displayText" :value="item.formatName" @click.native="setAddress(item)">
        </el-option>
      </el-select>
    </el-tooltip>
    <el-dialog title="地图选择小区" :visible.sync="mapModelVisible" width="700px" :append-to-body="true">
      <el-card class="map-selected-tips" :body-style="{padding: '10px'}">
        <p>1. 如果搜索的内容在右侧列表中小区名称不对（例如：天天超市），点击后可以自定义小区名称、具体位置、所在区域。</p>
        <p>2. 如果搜索的内容在右侧列表中查询不到，请通过鼠标手动定位房源位置，自定义小区名称、具体位置、所在区域。</p>
      </el-card>
      <div class="map-selected-container">
        <div class="bm-container" ref="bmContainer">
          <div id="bm-view" class="bm-view">

          </div>
          <el-form-item class="search-input-form" label="" label-width="0">
            <el-input class="search-input" placeholder="请输入公寓地址" v-model="searchKeywords" clearable size="small" @keyup.native="searchPositionByKeywords">
            </el-input>
          </el-form-item>
          <el-popover popper-class="selected-house-position" ref="popover" placement="bottom" width="360" trigger="manual">
            <el-form label-position="right" label-width="80px" :model="mapSelectForm" :rules="mapSelectFormRules" size="mini" ref="mapSelectForm">
              <i class="el-icon-close close-icon" @click="$refs.popover.doClose()"></i>
              <el-form-item class="form-item">
                <div slot="label" class="city-label">当前城市</div>
                <p class="city-name">{{mapSelectForm.city}}</p>
              </el-form-item>
              <el-form-item class="form-item" label="所在区域" prop="region">
                <el-select v-model="mapSelectForm.region" style="width: 100%">
                  <el-option v-for="item in regionOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="form-item" label="小区名称" prop="name">
                <el-input v-model="mapSelectForm.name"></el-input>
              </el-form-item>
              <el-form-item class="form-item" label="具体地址" prop="address">
                <el-input v-model="mapSelectForm.address"></el-input>
              </el-form-item>
            </el-form>
            <div class="selected-point" slot="reference"></div>
          </el-popover>
        </div>
        <el-card class="search-list" :body-style="{padding: '10px 0'}">
          <a class="search-list-item" v-for="(o, i) in searchResult" :key="i" @click="setMapPosition(o.location, o)">
            <p class="title">{{o.name}}</p>
            <p class="address">{{o.address}}</p>
          </a>
        </el-card>
      </div>
      <div slot="footer">
        <el-button @click="closeMapModel" size="small">取 消</el-button>
        <el-button type="primary" @click="closeMapModel('save')" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { estateAddressByKeywordsApi, estateNewSubdistrictApi } from '@/api/houseManage'
import cityData from '@/components/AreaSelect/cityData'
import { deepClone } from '@/utils'
export default {
  name: 'map-select',
  props: {
    areaCode: {
      type: Array,
      default: []
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      specificAddress: '',
      loading: false,
      addressList: [],
      mapModelVisible: false,
      searchKeywords: '',
      searchResult: [],
      map: null,
      local: null,
      mapSelectForm: {},
      mapSelectFormRules: {
        region: [
          { required: true, message: '请选择所在区域', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入小区名称', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入具体地址', trigger: 'blur' }
        ]
      },
      tempAreaCode: [],
      tempMapData: {},
      regionOptions: [],
      geocoder: null
    }
  },
  methods: {
    fetchAddressList(query) { // 模糊查询公寓/小区列表
      if (query !== '') {
        this.loading = true
        estateAddressByKeywordsApi({
          cityId: Number(this.areaCode[1]) || 330100,
          keyword: query
        }).then((res) => {
          this.loading = false
          this.addressList = []
          if (res.code === '0' && res.data.list) {
            res.data.list.forEach((item, index) => {
              item.formatName = item.name.replace(/<span(.*?)>/g, '').replace(/<\/span>/g, '') + ' - ' + item.address
              item.displayText = item.name + ' - ' + item.address
            })
            this.addressList = res.data.list
          }
          this.addressList.push({
            formatName: '',
            cityId: '-1',
            displayText: '<span style="color: red">找不到小区？点击这里添加小区</span>'
          })
        })
      } else {
        this.addressList = []
      }
    },
    checkAddressSelect(e) {
      if (!this.areaCode[2]) {
        this.$message.error('请先选择所在地区')
        e.target.blur()
      }
    },
    setAddress(item) { // 选中公寓/小区，没有的话打开地图选择小区模态框
      if (item) {
        if (item.cityId === '-1') {
          this.specificAddress = ''
          this.mapModelVisible = true
          this.$set(this, 'mapSelectForm', {
            city: '',
            name: '',
            region: '',
            address: ''
          })
        } else {
          if (item.areaId !== this.areaCode[2]) {
            this.$emit('addressChange', {
              zoneId: '',
              areaCode: [item.provinceId, item.cityId, item.areaId],
              address: item.formatName,
              regionAddressId: item.regionAddressId || ''
            })
          } else {
            this.$emit('addressChange', {
              address: item.formatName,
              regionAddressId: item.regionAddressId || ''
            })
          }
        }
        this.addressList = []
      }
    },
    initBMap() { // 初始化百度地图
      /* global AMap */
      const self = this
      let selectAddr = ''
      let marker
      const cityArr = cityData.filter((n) => n.value === this.tempAreaCode[0])
      if (cityArr[0] && cityArr[0].children) {
        selectAddr = cityArr[0].label
        this.mapSelectForm.city = selectAddr
        this.regionOptions = cityArr[0].children.filter((n) => n.value === this.tempAreaCode[1])[0].children
      }
      const selectRegion = this.regionOptions.filter((n) => n.value === this.tempAreaCode[2])
      if (selectRegion[0]) {
        selectAddr += selectRegion[0].label
      }

      self.map = new AMap.Map('bm-view', { zooms: [13, 19], resizeEnable: true }) // 创建地图实例

      if (!this.geocoder) {
        this.geocoder = new AMap.Geocoder()
      }
      console.log(selectAddr)
      this.geocoder.getLocation(selectAddr || '杭州市', (status, result) => {
        if (status === 'complete' && result.geocodes.length) {
          console.log(result)
          const lnglat = result.geocodes[0].location
          if (!marker) {
            marker = new AMap.Marker()
            self.map.add(marker)
          }
          marker.setPosition(lnglat)
          self.map.setZoomAndCenter(15, [lnglat.getLng(), lnglat.getLat()])
        } else {
          alert(JSON.stringify(result))
        }
      })

      self.map.on('click', (e) => {
        self.setMapPosition(e.lnglat)
      })
    },
    searchPositionByKeywords() { // 关键字搜索小区列表
      if (!this.searchKeywords) {
        return
      }
      AMap.plugin('AMap.PlaceSearch', () => {
        var autoOptions = {
          city: this.mapSelectForm.city || '杭州市'
        }
        var placeSearch = new AMap.PlaceSearch(autoOptions)
        placeSearch.search(this.searchKeywords, (status, result) => {
          console.log(result)
          if (status === 'complete' && result.poiList.pois) {
            this.searchResult = result.poiList.pois
          } else {
            this.searchResult = []
          }
        })
      })
    },
    setMapPosition(position, o) { // 设置地图中心位置
      const point = [position.lng, position.lat]
      const marker = new AMap.Marker({
        icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
        position: point
      })
      this.map.clearMap()
      this.map.add(marker)
      this.map.setZoomAndCenter(15, point)
      this.geocoder.getAddress(point, (status, result) => {
        if (status === 'complete' && result.regeocode) {
          console.log(result)
          const addressInfo = result.regeocode.addressComponent
          if ((addressInfo.city || addressInfo.province) !== this.mapSelectForm.city) {
            this.mapSelectForm.city = (addressInfo.city || addressInfo.province)
            const provinceArr = cityData.filter((item) => item.label === addressInfo.province)
            if (provinceArr[0] && provinceArr[0].children) {
              this.tempAreaCode[0] = provinceArr[0].value
              const cityArr = provinceArr[0].children.filter((n) => n.label === (addressInfo.city || addressInfo.province))
              if (cityArr[0] && cityArr[0].children) {
                this.tempAreaCode[1] = cityArr[0].value
                this.regionOptions = cityArr[0].children
              }
            }
          }
          this.regionOptions.forEach((item) => {
            if (item.label === addressInfo.district) {
              this.mapSelectForm.region = item.value
            }
          })
          if (!o) {
            addressInfo.address = addressInfo.building || addressInfo.neighborhood
            if (!addressInfo.address) {
              addressInfo.address = addressInfo.township ? result.regeocode.formattedAddress.split(addressInfo.township)[1] : result.regeocode.formattedAddress
            }
          } else {
            addressInfo.address = o.name
          }
          this.$set(this, 'mapSelectForm', Object.assign(this.mapSelectForm, {
            name: addressInfo.address,
            address: addressInfo.province + addressInfo.city + addressInfo.district + addressInfo.street + addressInfo.streetNumber,
            longitude: point[0] + '',
            latitude: point[1] + ''
          }))
          this.tempMapData = deepClone(this.mapSelectForm)
        }
      })
      this.$refs.popover.doShow()
    },
    closeMapModel(type) { // 关闭地图模态框
      if (type === 'save') {
        this.$refs.mapSelectForm.validate((status) => {
          if (status) {
            this.addEstateSubdistrict(0)
          } else {
            console.log(status)
            this.$message.error('您还有必填信息未填写完全，请全部填写好后再保存')
            return false
          }
        })
      } else {
        this.mapModelVisible = false
      }
    },
    addEstateSubdistrict(status) { // 新增小区
      status = status || 0
      let source = 6
      if (status === 0) {
        Object.keys(this.mapSelectForm).forEach((key) => {
          if (this.mapSelectForm[key] !== this.tempMapData[key]) {
            source = 5
          }
        })
      } else {
        source = 5
      }
      const formOptions = {
        provinceId: this.tempAreaCode[0],
        cityId: this.tempAreaCode[1],
        regionId: this.tempAreaCode[2],
        source: source,
        confirmStatus: status
      }
      estateNewSubdistrictApi({
        ...this.mapSelectForm,
        ...formOptions
      }).then((res) => {
        const data = res.data
        if (data.confirmStatus !== 1) {
          this.mapModelVisible = false
          if (this.tempAreaCode[2] !== this.areaCode[2]) {
            this.$emit('addressChange', {
              areaCode: this.tempAreaCode,
              address: this.mapSelectForm.name + ' - ' + this.mapSelectForm.address,
              regionAddressId: data.regionAddressId,
              zoneId: ''
            })
          } else {
            this.$emit('addressChange', {
              address: this.mapSelectForm.name + ' - ' + this.mapSelectForm.address,
              regionAddressId: data.regionAddressId
            })
          }
        } else {
          this.$confirm('新选择的小区名称、区域、具体地址和历史录入的一致，<span style="color:red">但经纬度坐标不一致</span>，是否使用新坐标并覆盖？', '再次确定', {
            dangerouslyUseHTMLString: true,
            distinguishCancelAndClose: true,
            confirmButtonText: '使用新地址',
            cancelButtonText: '使用原地址'
          }).then(() => {
            this.addEstateSubdistrict(2)
          }).catch((action) => {
            if (action === 'cancel') {
              this.addEstateSubdistrict(3)
            }
          })
        }
      })
    },
    clearAddress() {
      this.$emit('addressChange', {
        address: '',
        regionAddressId: ''
      })
    }
  },
  mounted() {
    // this.setAddress({
    //   cityId: '-1'
    // })
  },
  watch: {
    mapModelVisible(val) {
      if (val) {
        this.$nextTick(() => {
          this.tempAreaCode = deepClone(this.areaCode)
          this.initBMap()
        })
      } else {
        this.$set(this, 'mapSelectForm', {})
        this.searchKeywords = ''
        this.searchResult = []
        this.$refs.popover.doClose()
      }
    },
    value: {
      immediate: true,
      handler: function(val) {
        this.specificAddress = val
      }
    },
    'mapSelectForm.region': function(val, oldVal) {
      if (val !== oldVal && val) {
        this.tempAreaCode[2] = val
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.map-address-select {
  width: 100%;
}
.map-selected-container {
  position: relative;
  width: 660px;
  height: 400px;
  display: flex;
  justify-content: space-between;
  .bm-container {
    width: 400px;
    height: 400px;
    .bm-view {
      width: 400px;
      height: 400px;
      background-color: #fff;
    }
    .search-input-form {
      position: absolute;
      top: 10px;
      left: 10px;
      .search-input {
        width: 340px;
      }
    }
  }
  .search-list {
    width: 250px;
    height: 400px;
    overflow-x: hidden;
    overflow-y: scroll;
    .search-list-item {
      display: block;
      line-height: 1;
      padding: 8px 15px;
      &:hover {
        background-color: rgba(240, 240, 240, 0.8);
      }
    }
    .address {
      margin: 0;
      color: #999;
      font-size: 12px;
    }
    .title {
      margin: 0 0 5px;
      font-size: 14px;
      color: #333;
    }
  }
  .selected-point {
    position: absolute;
    top: 200px;
    left: 200px;
    width: 0;
    height: 0;
    visibility: hidden;
  }
}
.selected-house-position {
  .form-item {
    position: relative;
    margin-bottom: 10px;
    .city-label {
      &::before {
        content: "*";
        color: #f56c6c;
        margin-right: 4px;
      }
    }
  }
  .city-name {
    margin: 0;
  }
  .close-icon {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 10;
    cursor: pointer;
    font-size: 18px;
    transition: transform 0.3s;
    &:hover {
      transform: rotate(90deg);
    }
  }
}
.map-selected-tips {
  margin-top: -20px;
  margin-bottom: 10px;
  p {
    font-size: 12px;
    margin: 0;
    color: red;
  }
}
</style>

