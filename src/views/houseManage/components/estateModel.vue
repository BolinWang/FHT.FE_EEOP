<template>
  <div class="estate-model-container">
    <el-form ref="estateModel" :model="estateModel" :rules="estateModelRules" label-width="100px" size="small">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1" class="estate-collapse-container">
          <template slot="title">
            <div class="model-panel-title">
              公寓
            </div>
          </template>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="品牌公寓" prop="estateName">
                <el-input v-model="estateModel.estateName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所在地区" prop="areaCode">
                <area-select v-model="estateModel.areaCode" :level="1" @input="searchZoneList"></area-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="所属板块" prop="zoneId">
                <el-select v-model="estateModel.zoneId" class="estate-model-select" placeholder="请输入">
                  <el-option v-for="item in zoneList" :key="item.zoneId" v-html="item.zoneName" :value="item.zoneName">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="具体位置" prop="address">
                <el-select class="estate-model-select" v-model="estateModel.address" filterable remote :clearable="true" placeholder="请输入关键词" :remote-method="remoteMethod" popper-class="detail-address-options" @change="showMap" :loading="loading">
                  <el-option v-for="item in addressList" :key="item.cityId" v-html="item.name" :value="item.address">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="看房电话">
                <el-input v-model="estateModel.contactName" placeholder="联系人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label-width="0">
                <el-select v-model="estateModel.contactGender">
                  <el-option label="先生" value="1"></el-option>
                  <el-option label="女士" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label-width="0" prop="contactMobile">
                <el-input v-model="estateModel.contactMobile" placeholder="联系电话"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="公寓简介" prop="houseDesc">
                <el-input type="textarea" v-model="estateModel.houseDesc" placeholder="最多可输入150个字" :rows="3"></el-input>
                <span class="estate-iontro-length-tips">{{estateModel.houseDesc.length}}/150</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="房源管理权限">
                <el-select class="estate-model-select" v-model="estateModel.orgId" filterable remote :clearable="true" placeholder="组织名称" :remote-method="searchOrgListByKeywords" :loading="loading">
                  <el-option v-for="item in orgList" :key="item.ordId" v-html="item.orgName" :value="item.orgId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label-width="0">
                <el-input placeholder="账号名" v-model="estateModel.accountName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label-width="0">
                <el-checkbox-group v-model="estateModel.tag">
                  <el-checkbox label="飞虎队" name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="公寓/照片">
                <el-badge :value="estateModel.estatePics.length" class="estate-badge-btn">
                  <el-button type="primary" @click="addEstatePics">公寓照片</el-button>
                </el-badge>
                <el-button type="primary" @click="chooseEstateDevice" class="estate-badge-btn">房源基础设施</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item name="2" class="estate-collapse-container">
          <template slot="title">
            <div class="model-panel-title">
              楼层
            </div>
          </template>
          <el-row :gutter="20" class="estate-floor-container">
            <el-col :span="24">
              <el-form-item label="公寓楼层" label-width="90px">
                <el-row :gutter="20" v-for="(item, index) in estateModel.floors" :key="index">
                  <el-col :span="7">
                    <el-form-item label-width="0">
                      <el-input type="text" v-model="item.floorName">
                        <template slot="prepend">楼层名称</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label-width="0">
                      <el-input type="text" v-model="item.roomNum">
                        <template slot="prepend">共</template>
                        <template slot="append">间</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label-width="0">
                      <el-input type="text" v-model="item.startNo">
                        <template slot="prepend">起始房号</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="2" class="estate-floor">
                    <el-button type="text" icon="el-icon-delete" @click="estateModel.floors.splice(index, 1)"></el-button>
                  </el-col>
                </el-row>
                <el-button type="primary" @click="addEstateFloor">添加楼层</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item name="3" class="estate-collapse-container">
          <template slot="title">
            <div class="model-panel-title">
              房型
            </div>
          </template>
          <el-row :gutter="20" class="estate-house-type-container">
            <el-col :span="12">
              <el-form-item label="房间类型">
                <el-input value=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-badge :value="estateModel.roomTypePics.length" class="estate-badge-btn">
                <el-button type="primary" size="small">房型照片</el-button>
              </el-badge>
              <el-badge :value="40" class="estate-badge-btn">
                <el-button type="primary" size="small">应用到房间</el-button>
              </el-badge>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-form>

    <el-dialog title="地图选择小区" :visible.sync="dialogTableVisible" width="700px" :append-to-body="true">
      <el-card class="map-selected-tips" :body-style="{padding: '10px'}">
        <p>1. 如果搜索的内容在右侧列表中小区名称不对（例如：天天超市），点击后可以自定义小区名称、具体位置、所在区域。</p>
        <p>2. 如果搜索的内容在右侧列表中查询不到，请通过鼠标手动定位房源位置，自定义小区名称、具体位置、所在区域。</p>
      </el-card>
      <div class="map-selected-container">
        <div class="bm-container" ref="bmContainer">
          <div id="bm-view" class="bm-view">

          </div>
          <el-input class="search-input" placeholder="请输入公寓地址" v-model="searchKeywords" clearable size="small" @keyup.native="searchPositionByKeywords">
          </el-input>
          <el-popover popper-class="selected-house-position" ref="popover" placement="right" width="360" trigger="manual">
            <el-form label-position="right" label-width="80px" :model="formLabelAlign" :rules="rules" size="mini" ref="ruleForm">
              <i class="el-icon-close close-icon" @click="$refs.popover.doClose()"></i>
              <el-form-item class="form-item">
                <div slot="label" class="city-label">当前城市</div>
                <p class="city-name">杭州市</p>
              </el-form-item>
              <el-form-item class="form-item" label="所在区域" prop="region">
                <el-input v-model="formLabelAlign.region"></el-input>
              </el-form-item>
              <el-form-item class="form-item" label="小区名称" prop="name">
                <el-input v-model="formLabelAlign.name"></el-input>
              </el-form-item>
              <el-form-item class="form-item" label="具体地址" prop="address">
                <el-input v-model="formLabelAlign.address"></el-input>
              </el-form-item>
            </el-form>
            <div class="selected-point" slot="reference"></div>
          </el-popover>
        </div>
        <el-card class="search-list" :body-style="{padding: '10px 0'}">
          <a class="search-list-item" v-for="(o, i) in searchResult" :key="i" @click="setMapPosition(o.point)">
            <p class="title">{{o.title}}</p>
            <p class="address">{{o.address}}</p>
          </a>
        </el-card>
      </div>
      <div slot="footer">
        <el-button @click="dialogTableVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible = false" size="small">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="上传公寓照片" :visible.sync="uploadPicsModelVisible" width="600px" :append-to-body="true" custom-class="upload-pics-model">
      <div class="previewItems">
        <Preview :pic-list="estateModel.estatePics" :delete-icon="`delete`" :disabled="``" @emitDelete="emitDelete">
        </Preview>
        <label class="el-upload el-upload--picture-card uploadImage" for="uploadImages">
          <i class="el-icon-plus"></i>
          <input type="file" id="uploadImages" :accept="accept" multiple @change="uploadImg($event)">
        </label>
      </div>
      <p class="upload-pics-info">温馨提示： </p>
      <p class="upload-pics-info">1.请勿上传虚假、模糊、与房源信息无关、含有其他公司水印的照片； </p>
      <p class="upload-pics-info">2.请上传相关体现公寓形象的照片； </p>
      <p class="upload-pics-info">3.目前最多支持15张，支持JPG/JPEG/PNG，可以拖动图片进行排序，支持批量上传。</p>
      <!-- 图片裁剪 -->
      <ImageCropper :cropperList="cropperList" @emitCropperList="emitCropperList" @emitCropperData="emitCropperData">
      </ImageCropper>
      <span slot="footer">
        <el-button @click="uploadPicsModelVisible = false" size="small" type="primary">关 闭</el-button>
      </span>
    </el-dialog>

    <el-dialog title="公共基础设施" :visible.sync="estateDeviceModelVisible" width="600px" :append-to-body="true" custom-class="estate-device-model">
      <el-tabs v-model="deviceActiveTab">
        <el-tab-pane label="配套服务" name="first">
          <estate-device-group :deviceMap="deviceMap" :checkList1="deviceList.supportingServices" :checkedList1="estateModel.checkedSupportingServices" :type="'baseSupportMap'" @modifyCheckedList="modifyCheckedList"></estate-device-group>
        </el-tab-pane>
        <el-tab-pane label="门店服务" name="second">
          <estate-device-group :deviceMap="deviceMap" :checkList1="deviceList.storeServices" :checkedList1="estateModel.checkedStoreServices" :type="'storeMap'" @modifyCheckedList="modifyCheckedList"></estate-device-group>
        </el-tab-pane>
        <el-tab-pane label="周边服务" name="third">
          <estate-device-group :deviceMap="deviceMap" :checkList1="deviceList.surroundingServices" :checkedList1="estateModel.checkedSurroundingServices" :type="'surroundingMap'" @modifyCheckedList="modifyCheckedList"></estate-device-group>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer">
        <el-button @click="saveDeviceData('save')" size="small" type="primary">确 定</el-button>
        <el-button @click="saveDeviceData('clear')" size="small">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import areaSelect from '@/components/AreaSelect'
import { estateAddressByKeywordsApi, estateZoneListByAreaIdApi, estateDeviceListApi, estateOrgListApi } from '@/api/houseManage'
import Preview from '@/components/Preview/Preview'
import ImageCropper from '@/components/ImageCropper/Cropper'
import estateDeviceGroup from './estateDeviceGroup'
export default {
  name: 'estateModel',
  components: {
    areaSelect,
    Preview,
    ImageCropper,
    estateDeviceGroup
  },
  props: [
    'showModel',
    'changeModelStatus'
  ],
  data() {
    return {
      dialogTableVisible: false,
      local: null,
      map: null,
      showPositionInfoModel: false,
      searchKeywords: "",
      searchResult: [],
      formLabelAlign: {
        name: "",
        region: "",
        address: ""
      },
      rules: {
      },
      estateModel: {
        estateName: "",
        areaCode: [],
        zoneId: [],
        address: [],
        orgId: [],
        contactName: "",
        contactMobile: "",
        contactGender: "1",
        accountName: '',
        houseDesc: '',
        floors: [],
        estatePics: [],
        roomTypePics: [],
        checkedSupportingServices: [],
        checkedStoreServices: [],
        checkedSurroundingServices: []
      },
      estateModelRules: {
        estateName: [
          { required: true, message: '请输入公寓名称', trigger: 'blur' }
        ],
        areaCode: [
          { required: true, message: '请选择所在地区', trigger: 'change' }
        ],
        zoneId: [
          { required: true, message: '请选择所属板块', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请选择具体位置', trigger: 'change' }
        ],
        houseDesc: [
          { max: 150, message: '长度不能超过150个字符', trigger: 'change' }
        ],
        contactMobile: [
          { pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/, message: '请输入正确的手机号码', trigger: 'change' }
        ]
      },
      loading: false,
      zoneList: [],
      addressList: [],
      orgList: [],
      activeNames: ['2'],
      uploadPicsModelVisible: false,
      estateDeviceModelVisible: false,
      cropperList: [],
      accept: 'image/png, image/jpeg, image/jpg',
      deviceActiveTab: 'first',
      checkAll: false,
      isIndeterminate: false,
      deviceMap: {
      },
      deviceList: {
        supportingServices: [],
        storeServices: [],
        surroundingServices: []
      }
    }
  },
  computed: {

  },
  methods: {
    initBMap() {
      let self = this;
      self.map = new BMap.Map("bm-view"); // 创建地图实例
      self.map.centerAndZoom("杭州", 15);
      self.map.enableScrollWheelZoom(true);

      self.map.addEventListener("click", function (e) {
        self.setMapPosition(e.point);
      });
      let options = {
        onSearchComplete: function (results) {
          // 判断状态是否正确
          if (self.local.getStatus() == BMAP_STATUS_SUCCESS) {
            self.searchResult = [];
            for (var i = 0; i < results.getCurrentNumPois(); i++) {
              self.searchResult.push(results.getPoi(i));
            }
          }
        }
      };
      self.local = new BMap.LocalSearch(self.map, options);
    },
    setMapPosition(position) {
      let point = new BMap.Point(position.lng, position.lat);
      let marker = new BMap.Marker(point);
      let geoc = new BMap.Geocoder();
      this.map.clearOverlays();
      this.map.addOverlay(marker);
      this.map.panTo(point);
      geoc.getLocation(point, rs => {
        this.formLabelAlign.address = rs.address;
        this.formLabelAlign.region = rs.addressComponents.district;
      });
      this.$refs.popover.doShow();
    },
    searchPositionByKeywords() {
      this.local.search(this.searchKeywords)
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        estateAddressByKeywordsApi({
          cityId: '330100',
          keyword: query
        }).then((res) => {
          this.loading = false
          if (res.code === '0') {
            this.addressList = res.data.list
            this.addressList.push({
              address: 'noSelect',
              cityId: '-1',
              name: '<span style="color: red">找不到小区？点击这里添加小区</span>'
            })
          }
        })
      } else {
        this.addressList = []
      }
    },
    searchZoneList() {
      if (this.estateModel.areaCode[2] !== undefined) {
        estateZoneListByAreaIdApi({
          areaId: this.estateModel.areaCode[2]
        }).then((res) => {
          this.zoneList = res.data.list
        })
      } else {
        this.zoneList = []
      }
    },
    showMap(val) {
      if (val === 'noSelect') {
        this.estateModel.address = ''
        this.dialogTableVisible = true
      }
    },
    searchOrgListByKeywords(query) {
      if (query !== '') {
        this.loading = true;
        estateOrgListApi({
          orgName: query
        }).then((res) => {
          this.loading = false
          if (res.code === '0') {
            this.orgList = res.data.list
          }
        })
      } else {
        this.orgList = []
      }
    },
    addEstatePics() {
      this.uploadPicsModelVisible = true
    },
    chooseEstateDevice() {
      this.estateDeviceModelVisible = true
    },
    handleCheckAllChange(val) {
      this.estateModel.checkedSupportingServices = val ? this.deviceList.supportingServices : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.deviceList.supportingServices.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.deviceList.supportingServices.length
    },
    modifyCheckedList(type, val) {
      let checkGroupType = ''
      switch (type) {
        case 'baseSupportMap':
          checkGroupType = 'checkedSupportingServices'
          break
        case 'storeMap':
          checkGroupType = 'checkedStoreServices'
          break
        case 'surroundingMap':
          checkGroupType = 'checkedSurroundingServices'
          break
      }
      this.estateModel[type] = val
    },
    saveDeviceData(type) {
      if (type === 'clear') {
        this.estateModel.checkedSupportingServices = []
        this.estateModel.checkedStoreServices = []
        this.estateModel.checkedSurroundingServices = []
      } else {

      }

      this.estateDeviceModelVisible = false
    },
    addEstateFloor() {
      this.estateModel.floors.push({
        floorSort: '',
        floorName: '',
        roomNum: '',
        startNo: ''
      })
    },
    // 删除图片
    emitDelete(val) {
      this.estateModel.estatePics = val
    },
    // 上传的图片列表
    emitCropperList(list = []) {
      this.cropperList = list
    },
    // 裁剪后图片列表
    emitCropperData(list = []) {
      list.forEach((v, i) => {
        v.type = 1
      })
      let picList = [...this.estateModel.estatePics, ...list]
      this.$set(this.estateModel, 'estatePics', picList)
    },
    /* 选择图片 */
    async uploadImg(e) {
      if (!e.target.value) {
        console.log('取消上传...')
        return false
      }
      const uploadList = []
      const readFileAsync = file => new Promise(resolve => {
        let reader = new FileReader()
        reader.onerror = function (e) {
          console.log('读取异常....')
        }
        reader.onload = e => {
          const img = (typeof e.target.result === 'object')
            // 把Array Buffer转化为blob 如果是base64不需要
            ? window.URL.createObjectURL(new Blob([e.target.result]))
            : e.target.result
          let imageName = ''
          let type = 1
          if (!file.name) {
            imageName = ''
          } else {
            imageName = file.name.split('.')[0].length <= 30
              ? file.name.split('.')[0]
              : file.name.split('.')[0].substr(0, 30)
          }
          resolve({
            img,
            imageName,
            type
          })
        }
        // 转化为base64
        // reader.readAsDataURL(file)
        // 转化为blob
        reader.readAsArrayBuffer(file)
      })

      const files = e.target.files
      for (let i = 0; i < files.length; i++) {
        if (!this.accept.includes(files[i].type)) {
          this.$message.error(`请上传${this.accept.replace(/image\//gi, '')}的图片`)
          e.target.value = null
          return false
        }
        uploadList.push(await readFileAsync(files[i]))
      }

      this.cropperList = uploadList.map((item, kindex) => {
        return {
          img: item.img,
          imageName: item.imageName,
          type: item.type
        }
      })
      this.layer_cropper = true
      e.target.value = null
    }
  },
  watch: {
    dialogTableVisible(val) {
      if (val) {
        this.$nextTick(() => {
          this.initBMap();
        })
      } else {
        this.$refs.popover.doClose()
      }
    },
    estateDeviceModelVisible(val) {
      if (val && JSON.stringify(this.deviceMap) === '{}') {
        estateDeviceListApi().then((res) => {
          if (res.code === '0') {
            this.deviceMap = res.data.dataObject
            this.deviceList = {
              supportingServices: Object.keys(this.deviceMap.baseSupportMap),
              storeServices: Object.keys(this.deviceMap.storeMap),
              surroundingServices: Object.keys(this.deviceMap.surroundingMap)
            }
          }
        })
      }
    },
    checkedSupportingServices(val) {
      // console.log(val)
    }
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
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
      background-color: #ff0000;
    }
    .search-input {
      position: absolute;
      top: 10px;
      left: 10px;
      width: 340px;
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
.map-selected-tips {
  margin-top: -20px;
  margin-bottom: 10px;
  p {
    font-size: 12px;
    margin: 0;
    color: red;
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
.detail-address-options {
  li:last-child {
    color: red;
  }
}
.estate-model-container {
  .model-panel-title {
    font-size: 16px;
  }
  .estate-model-select {
    width: 100%;
  }
  .estate-badge-btn {
    margin-right: 20px;
    button {
      vertical-align: top;
    }
  }
  .estate-collapse-container {
    .el-row {
      .estate-iontro-length-tips {
        position: absolute;
        bottom: 0px;
        right: 10px;
      }
      .el-form-item {
        margin-bottom: 15px;
      }
      &:last-child {
        .el-form-item {
          margin-bottom: 0;
        }
      }
    }
  }
  .estate-house-type-container {
    padding-top: 10px;
  }
  .estate-floor-container {
    .el-row {
      &:first-child {
        .el-col:first-child {
          margin-left: -10px;
        }
      }
      .el-col {
        &:last-child {
          text-align: center;
          button {
            font-size: 18px;
            color: red;
          }
        }
      }
      margin-bottom: 10px;
    }
  }
}
.upload-pics-model {
  .previewItems {
    margin-bottom: 10px;
    .el-upload--picture-card.uploadImage {
      width: 122px;
      height: 92px;
      line-height: 98px;
    }
  }
  .upload-pics-info {
    margin: 0 0 5px;
  }
}
</style>


