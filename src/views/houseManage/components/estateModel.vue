<template>
  <div class="estate-model-container">
    <el-form ref="estateModel" :model="estateModel" :rules="estateModelRules" label-width="110px" size="small">
      <el-collapse v-model="activeNames" accordion @change="checkSaveStatus">
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
                <area-select ref="areaSelect" v-model="estateModel.areaCode" :level="1" @input="searchZoneList"></area-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="所属板块" prop="zoneId">
                <el-select v-model="estateModel.zoneId" class="estate-model-select" :placeholder="zoneList.length ? '请选择' : '无'">
                  <el-option v-for="item in zoneList" :key="item.zoneId" :label="item.zoneName" :value="item.zoneId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="具体位置" prop="address">
                <el-select class="estate-model-select" ref="addressSelect" v-model="estateModel.address" filterable remote :clearable="true" placeholder="请输入关键词" :remote-method="remoteMethod" popper-class="detail-address-options" :loading="loading" @focus="checkAddressSelect" @clear="setAddress">
                  <el-option v-for="(item, index) in addressList" :key="index" v-html="item.displayText" :value="item.formatName" @click.native="setAddress(item)">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="看房电话" prop="contactName">
                <el-input v-model="estateModel.contactName" placeholder="联系人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label-width="0">
                <el-select v-model="estateModel.contactGender">
                  <el-option label="先生" :value="1"></el-option>
                  <el-option label="女士" :value="2"></el-option>
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
              <el-form-item label="房源管理权限" prop="orgId">
                <el-select class="estate-model-select" v-model="estateModel.orgId" filterable remote :clearable="true" placeholder="组织名称" :remote-method="searchOrgListByKeywords" :loading="loading" @clear="setOrg">
                  <el-option v-for="item in orgList" :key="item.ordId" :value="item.orgId" :label="item.orgName" @click.native="setOrg(item)">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label-width="0">
                <el-input placeholder="账号名" v-model="estateModel.accountName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4" v-if="type === '新建公寓'">
              <el-form-item label-width="0">
                <el-checkbox label="飞虎队" name="type" v-model="estateModel.tag"></el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="公寓/照片">
                <el-badge :value="estateModel.pictureList ? estateModel.pictureList.length : 0" class="estate-badge-btn">
                  <el-button type="primary" @click="addPics('estatePics', -1)">公寓照片</el-button>
                </el-badge>
                <el-button type="primary" @click="openDeviceModel" class="estate-badge-btn">房源基础设施</el-button>
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
              <el-form-item label="公寓楼层" label-width="110px" prop="floors">
                <draggable v-model="estateModel.floors">
                  <transition-group>
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
                      <el-col :span="2" class="estate-floor" v-if="estateModel.floors.length > 1">
                        <el-button class="delete-btn" type="text" icon="el-icon-delete" @click="deleteCurItem(1, index)"></el-button>
                      </el-col>
                    </el-row>
                  </transition-group>
                </draggable>
                <el-button type="primary" @click="addEstateFloor">添加楼层</el-button>
                <el-button type="primary" @click="sortEstateFloor">楼层排序</el-button>
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
            <el-col :span="24">
              <el-form-item label="房间类型" label-width="110px">
                <el-row :gutter="20" v-for="(item, index) in estateModel.roomTypeList" :key="item.id">
                  <el-col :span="8">
                    <el-input v-model="item.styleName"></el-input>
                  </el-col>
                  <el-col :span="8">
                    <el-badge :value="(item && item.pictureList) ? item.pictureList.length : 0" class="estate-badge-btn">
                      <el-button type="primary" size="small" @click="addPics('roomTypePics', index)">房型照片</el-button>
                    </el-badge>
                    <el-badge :value="(item && item.roomCodes) ? item.roomCodes.length : 0" class="estate-badge-btn" v-if="type === '编辑公寓'">
                      <el-button type="primary" size="small" @click="openBatchCopyModel(index)">应用到房间</el-button>
                    </el-badge>
                  </el-col>
                  <el-col :span="2" class="estate-floor" v-if="estateModel.roomTypeList.length > 1">
                    <el-button class="delete-btn" type="text" icon="el-icon-delete" @click="deleteCurItem(2, index)"></el-button>
                  </el-col>
                </el-row>
                <el-button v-if="type === '编辑公寓'" type="primary" size="small" @click="addEstateRoomType">添加房间类型</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-form>

    <el-dialog title="地图选择小区" :visible.sync="mapModelVisible" width="700px" :append-to-body="true">
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
                <p class="city-name">{{formLabelAlign.city}}</p>
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
          <a class="search-list-item" v-for="(o, i) in searchResult" :key="i" @click="setMapPosition(o.point, o)">
            <p class="title">{{o.title}}</p>
            <p class="address">{{o.address}}</p>
          </a>
        </el-card>
      </div>
      <div slot="footer">
        <el-button @click="closeMapModel('cancel')" size="small">取 消</el-button>
        <el-button type="primary" @click="closeMapModel('save')" size="small">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="curUploadPicsType === 'estatePics' ? '上传公寓照片' : '上传房间照片'" :visible.sync="uploadPicsModelVisible" width="600px" :append-to-body="true" custom-class="upload-pics-model">
      <div class="previewItems">
        <Preview :pic-list="curPicListIndex === -1 ? estateModel.pictureList : (estateModel.roomTypeList[this.curPicListIndex] ? estateModel.roomTypeList[this.curPicListIndex].pictureList : [])" :delete-icon="`delete`" :disabled="``" @emitDelete="emitDelete">
        </Preview>
        <label class="el-upload el-upload--picture-card uploadImage" for="uploadImages">
          <i class="el-icon-plus"></i>
          <input type="file" id="uploadImages" :accept="accept" multiple @change="uploadImg($event)">
        </label>
      </div>
      <p class="upload-pics-info">温馨提示： </p>
      <p class="upload-pics-info">1.请勿上传虚假、模糊、与房源信息无关、含有其他公司水印的照片； </p>
      <p class="upload-pics-info" v-show="curUploadPicsType === 'estatePics'">2.请上传相关体现公寓形象的照片； </p>
      <p class="upload-pics-info" v-show="curUploadPicsType === 'roomTypePics'">2.房间照片最佳组合：卧室2~6张、公共区域1~4张、厨房1~3张、卫生间1-4张； </p>
      <p class="upload-pics-info">3.目前最多支持15张，支持JPG/JPEG/PNG，可以拖动图片进行排序，支持批量上传。</p>
      <!-- 图片裁剪 -->
      <ImageCropper :cropperList="cropperList" @emitCropperList="emitCropperList" @emitCropperData="emitCropperData">
      </ImageCropper>
      <span slot="footer">
        <el-button @click="uploadPicsModelVisible = false" size="small" type="primary">关 闭</el-button>
      </span>
    </el-dialog>

    <el-dialog title="公共基础设施" :visible.sync="estateDeviceModelVisible" width="600px" :append-to-body="true" custom-class="estate-device-model">
      <estate-device-group ref="deviceModel" :deviceMap="deviceMap" :checkList="deviceList" :estateDeviceModelVisible="estateDeviceModelVisible"></estate-device-group>
      <span slot="footer">
        <el-button @click="saveDeviceData('save')" size="small" type="primary">确 定</el-button>
        <el-button @click="saveDeviceData('clear')" size="small">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog title="应用到房间" :visible.sync="batchCopyModelVisible" width="700px" :append-to-body="true">
      <room-list-selecter ref="batchCopyRoom" :roomList="batchCopyRoomList" :checkedList="estateModel.roomTypeList[this.curRoomTypeIndex].roomCodes" :visible="batchCopyModelVisible">
        <el-row type="flex" justify="center" class="model-head">
          <el-checkbox label="当前房间已是该类型" v-model="batchCopyOptions.isSelected" disabled></el-checkbox>
          <el-checkbox label="当前房间尚未选择该类型" v-model="batchCopyOptions.noSelected" disabled></el-checkbox>
          <el-checkbox label="当前房间正在选择该类型" v-model="batchCopyOptions.activeSelected" @change="batchCopyOptions.activeSelected = true"></el-checkbox>
        </el-row>
        <span slot="card-title">请选择要应用该房型的房间</span>
      </room-list-selecter>
      <span slot="footer">
        <el-button size="small" type="primary" @click="saveBatchCobyRoom">确 定</el-button>
        <el-button size="small" @click="batchCopyModelVisible = false">取 消</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
import areaSelect from '@/components/AreaSelect'
import { estateAddressByKeywordsApi, estateZoneListByAreaIdApi, estateDeviceListApi, estateOrgListApi, estateRoomDetailApi, estateBatchCopyRoomListApi, estateNewSubdistrictApi } from '@/api/houseManage'
import Preview from '@/components/Preview/Preview'
import ImageCropper from '@/components/ImageCropper/Cropper'
import RoomListSelecter from '@/components/RoomListSelecter'
import estateDeviceGroup from './estateDeviceGroup'
import { deepClone } from '@/utils'
import draggable from 'vuedraggable'
export default {
  name: 'estateModel',
  components: {
    areaSelect,
    Preview,
    ImageCropper,
    estateDeviceGroup,
    RoomListSelecter,
    draggable
  },
  props: [
    'showEstateModel',
    'type'
  ],
  data() {
    return {
      myArray: [{
        id: '1',
        name: 'nihao'
      },{
        id: '2',
        name: 'heihei'
      }],
      mapModelVisible: false,
      local: null,
      map: null,
      searchKeywords: '',
      searchResult: [],
      formLabelAlign: {},
      tempMapData: {},
      rules: {
      },
      // estateModel: {
      //   estateName: "",
      //   areaCode: [],
      //   zoneId: [],
      //   address: [],
      //   orgId: [],
      //   contactName: "",
      //   contactMobile: "",
      //   contactGender: "1",
      //   accountName: '',
      //   houseDesc: '',
      //   floors: [],
      //   estatePics: [],
      //   roomTypePics: [],
      //   checkedSupportingServices: [],
      //   checkedStoreServices: [],
      //   checkedSurroundingServices: [],
      //   tag: false
      // },
      estateModel: {},
      estateModelRules: {
        estateName: [
          { required: true, message: '请输入公寓名称', trigger: 'blur' }
        ],
        areaCode: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value[0] === '') {
                callback(new Error('请选择所在地区'))
              } else {
                callback()
              }
            },
            trigger: 'change'
          }
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
        contactName: [
          { required: true, message: '请输入联系人', trigger: 'change' }
        ],
        contactMobile: [
          { required: true, pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/, message: '请输入正确的手机号码', trigger: 'change' }
        ],
        orgId: [
          { required: true, message: '请选择一个组织，支持模糊查询', trigger: 'change' }
        ]
      },
      loading: false,
      zoneList: [],
      addressList: [],
      orgList: [],
      activeNames: ['1'],
      uploadPicsModelVisible: false,
      estateDeviceModelVisible: false,
      cropperList: [],
      accept: 'image/png, image/jpeg, image/jpg',
      checkAll: false,
      isIndeterminate: false,
      deviceMap: {},
      deviceList: {},
      curUploadPicsType: '',
      batchCopyModelVisible: false,
      batchCopyRoomList: [],
      curRoomTypeIndex: 0,
      batchCopyOptions: {
        isSelected: true,
        noSelected: false,
        activeSelected: true
      },
      curPicListIndex: -1,
      tempFormData: {},
      tempNames: ['1']
    }
  },
  computed: {
    // ...mapGetters({
    //   estateModel: 'formatEstateDetailData'
    // })
  },
  methods: {
    initBMap() {
      let self = this
      let selectAddrArr = this.$refs.areaSelect.$el.innerText.replace(/\s/g, '').split('/')

      let selectAddr = selectAddrArr[1] + selectAddrArr[2]
      this.formLabelAlign.city = selectAddrArr[1]
      self.map = new BMap.Map("bm-view"); // 创建地图实例
      self.map.centerAndZoom(selectAddr || '杭州市', 15);
      self.map.enableScrollWheelZoom(true);

      self.map.addEventListener("click", function (e) {
        self.setMapPosition(e.point)
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
    setMapPosition(position, o) {
      if (o) {
        this.$set(this, 'formLabelAlign', Object.assign(this.formLabelAlign, {
          baiduUid: o.uid,
          longitude: o.point.lng + '',
          latitude: o.point.lat + '',
          address: o.address
        }))
      }

      let point = new BMap.Point(position.lng, position.lat)
      let marker = new BMap.Marker(point)
      let geoc = new BMap.Geocoder()
      this.map.clearOverlays()
      this.map.addOverlay(marker)
      this.map.panTo(point)
      geoc.getLocation(point, rs => {
        if (o) {
          this.formLabelAlign.name = o.title
        } else {
          this.$set(this, 'formLabelAlign', Object.assign(this.formLabelAlign, {
            name: rs.surroundingPois[0] ? rs.surroundingPois[0].title : rs.address,
            address: rs.address,
            longitude: rs.point.lng + '',
            latitude: rs.point.lat + ''
          }))
        }
        this.formLabelAlign.region = rs.addressComponents.district
        this.tempMapData = deepClone(this.formLabelAlign)
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
          cityId: Number(this.estateModel.areaCode[1]) || 330100,
          keyword: query
        }).then((res) => {
          this.loading = false
          if (res.code === '0') {
            res.data.list.forEach((item, index) => {
              item.formatName = item.name.replace(/<span(.*?)>/g, '').replace(/<\/span>/g, '') + ' - ' + item.address
              item.displayText = item.name + ' - ' + item.address
            })
            this.addressList = res.data.list
            this.addressList.push({
              formatName: '',
              cityId: '-1',
              displayText: '<span style="color: red">找不到小区？点击这里添加小区</span>'
            })
          }
        })
      } else {
        this.addressList = []
      }
    },
    searchZoneList() {
      [this.estateModel.provinceId, this.estateModel.cityId, this.estateModel.regionId] = this.estateModel.areaCode
      if (this.estateModel.areaCode[2] !== undefined) {
        estateZoneListByAreaIdApi({
          regionId: this.estateModel.regionId
        }).then((res) => {
          this.zoneList = res.data.list
        })
      } else {
        this.zoneList = []
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
    addPics(type, index) {
      this.curUploadPicsType = type
      this.uploadPicsModelVisible = true
      this.curPicListIndex = index
    },
    openDeviceModel() {
      if (JSON.stringify(this.deviceMap) === '{}') {
        estateDeviceListApi().then((res) => {
          if (res.code === '0') {
            this.deviceMap = res.data
            this.$set(this, 'deviceList', {
              services: Object.keys(this.deviceMap.baseSupportMap),
              storeServices: Object.keys(this.deviceMap.storeMap),
              surroundings: Object.keys(this.deviceMap.surroundingMap)
            })
            this.estateDeviceModelVisible = true
          }
        })
      } else {
        this.estateDeviceModelVisible = true
      }
    },
    saveDeviceData(type) {
      this.$refs.deviceModel.saveDeviceData(type)
      this.estateModel.services = this.$store.state.estateDetailData.estateInfo.services
      this.estateModel.storeServices = this.$store.state.estateDetailData.estateInfo.storeServices
      this.estateModel.surroundings = this.$store.state.estateDetailData.estateInfo.surroundings
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
    sortEstateFloor() {

    },
    addEstateRoomType() {
      this.estateModel.roomTypeList.push({
        id: undefined,
        styleName: '',
        pictureList: [],
        roomCodes: []
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    checkAddressSelect(e) {
      if (!this.estateModel.areaCode[2]) {
        this.$message.error('请先选择所在地区')
        e.target.blur()
      }
    },
    setAddress(item) {
      if (item && item.cityId === '-1') {
        this.estateModel.address = ''
        this.mapModelVisible = true
        this.$set(this, 'formLabelAlign', {
          city: '',
          name: '',
          region: '',
          address: ''
        })
      } else {
        this.estateModel.regionAddressId = item ? item.regionAddressId : ''
      }
    },
    setOrg(item) {
      this.estateModel.accountName = item ? item.accountName : ''
      this.estateModel.adminUserId = item ? item.adminUserId : ''
    },
    closeMapModel(type) {
      if (type === 'save') {
        this.addEstateSubdistrict(0)
      } else {
        this.$set(this, 'formLabelAlign', {})
        this.mapModelVisible = false
      }
    },
    addEstateSubdistrict(status) {
      status = status || 0
      let source = 1
      if (status === 0) {
        Object.keys(this.formLabelAlign).forEach((key) => {
          if (this.formLabelAlign[key] != this.tempMapData[key]) {
            source = 5
          }
        })
      } else {
        source = 5
      }
      let formOptions = {
        provinceId: this.estateModel.areaCode[0],
        cityId: this.estateModel.areaCode[1],
        regionId: this.estateModel.areaCode[2],
        source: source,
        confirmStatus: status
      }
      estateNewSubdistrictApi({
        ...this.formLabelAlign,
        ...formOptions
      }).then((res) => {
        const data = res.data
        if (data.confirmStatus !== 1) {
          this.mapModelVisible = false
          this.estateModel.address = this.formLabelAlign.name + ' - ' + this.formLabelAlign.address
          this.estateModel.regionAddressId = data.regionAddressId
          this.$refs['estateModel'].validateField('address')
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
    initEstateData() {
      let estateInfo = this.$store.state.estateDetailData.estateInfo
      estateInfo.contactGender = 1
      estateInfo.areaCode = [estateInfo.provinceId, estateInfo.cityId, estateInfo.regionId]
      estateInfo.tag = estateInfo.tag === 1 ? true : false
      estateInfo.address = estateInfo.subdistrictName ? (estateInfo.subdistrictName + ' - ' + estateInfo.subdistrictAddress) : ''

      this.$set(this, 'estateModel', deepClone(estateInfo))
      this.activeNames = ['1']
      this.$set(this, 'tempFormData', this.estateModel)
      this.tempNames = ['1']
      if (this.type === '新建公寓') {
        this.addEstateFloor()
        this.addEstateRoomType()
      }
    },
    returnEstateData(type) {
      let estateData = false
      this.$refs.estateModel.validate((status) => {
        if (status) {
          estateData = this.estateModel
        } else {
          return false
        }
      })
      return estateData
      // return this.estateModel
    },
    checkSaveStatus(status) {
      if (this.type === '新建公寓') {
        return
      }
      let differentFlag = false
      Object.keys(this.tempFormData).forEach((key) => {
        if (JSON.stringify(this.tempFormData[key]) != JSON.stringify(this.estateModel[key])) {
          differentFlag = true
        }
      })

      if (differentFlag) {
        this.$message.error('请先将当前更改的内容保存之后再操作')
        this.activeNames = this.tempNames
      } else {
        switch (status) {
          case '1':
            this.$set(this, 'tempFormData', deepClone(this.estateModel))
            this.tempNames = ['1']
            break
          case '2':
            this.$set(this, 'tempFormData', {
              fangyuanCode: this.estateModel.fangyuanCode,
              floors: deepClone(this.estateModel.floors)
            })
            this.tempNames = ['2']
            break
          case '3':
            this.$set(this, 'tempFormData', {
              fangyuanCode: this.estateModel.fangyuanCode,
              roomTypeList: deepClone(this.estateModel.roomTypeList)
            })
            this.tempNames = ['3']
            break
        }
      }
    },
    openBatchCopyModel(index) {
      estateBatchCopyRoomListApi({
        fangyuanCode: this.$store.state.estateDetailData.fangyuanCode
      }).then((res) => {
        if (res.code === '0' && res.data) {
          this.batchCopyRoomList = res.data
          this.curRoomTypeIndex = index
          this.batchCopyModelVisible = true
        }
      })
    },
    saveBatchCobyRoom() {
      let checkedList = this.$refs.batchCopyRoom.returnCheckedList()
      this.batchCopyModelVisible = false
      this.estateModel.roomTypeList[this.curRoomTypeIndex].roomCodes = checkedList
    },
    deleteCurItem(type, index) {
      // type 1: 楼层  2: 房型
      if (type === 1) {
        if (this.estateModel.floors[index].roomNum > 0) {
          this.$message.error('当前楼层下面房间不为空，不能删除该楼层')
          return
        }
        this.estateModel.floors.splice(index, 1)
      } else {
        if (this.estateModel.roomTypeList[index].roomCodes.length > 0) {
          this.$message.error('已有应用该房型的房间，不能删除该楼层')
          return
        }
        this.estateModel.roomTypeList.splice(index, 1)
      }
    },
    // 删除图片
    emitDelete(val) {
      if (this.curPicListIndex === -1) {
        this.estateModel.pictureList = val
      } else {
        this.estateModel.roomTypeList[this.curPicListIndex].pictureList = val
      }
    },
    // 上传的图片列表
    emitCropperList(list = []) {
      this.cropperList = list
    },
    // 裁剪后图片列表
    emitCropperData(list = []) {
      list.forEach((v, i) => {
        v.type = 1,
          v.imageName = v.title,
          v.image = v.src
      })
      let picList = this.curPicListIndex === -1 ? this.estateModel.pictureList : this.estateModel.roomTypeList[this.curPicListIndex].pictureList
      if (this.curPicListIndex === -1) {
        this.estateModel.pictureList = [...this.estateModel.pictureList, ...list]
      } else {
        this.estateModel.roomTypeList[this.curPicListIndex].pictureList = [...this.estateModel.roomTypeList[this.curPicListIndex].pictureList, ...list]
      }
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
    mapModelVisible(val) {
      if (val) {
        this.$nextTick(() => {
          this.initBMap();
        })

      } else {
        this.searchKeywords = ''
        this.searchResult = []
        this.$refs.popover.doClose()
      }
    },
    showEstateModel: {
      immediate: true,
      handler: function (val) {
        if (val) {
          this.initEstateData()
          if (this.type === '编辑公寓') {

          } else {
            // this.$set(this, 'estateModel', deepClone(this.$store.state.estateDetailData.estateInfo))
          }
        } else {
          // this.$store.commit('CLEAR_ESTATEDATA')
          // this.activeNames = ['1']
          // this.resetForm('estateModel')
        }
      }
    },
    activeNames: {
      handler: function (val) {

      },
      deep: true
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
    .el-row {
      &:first-child {
        .el-col:first-child {
          margin-left: -10px;
        }
      }
      .el-col {
        &:last-child {
          .delete-btn {
            font-size: 18px;
            color: red;
          }
        }
      }
      margin-bottom: 10px;
    }
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
          .delete-btn {
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


