<template>
  <el-form ref="hostingRoomDetail" :model="hostingRoomDetail" :rules="hostingRoomDetailRules" label-width="90px" size="small"  class="room-detail-container hosting-room-detail">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="所在地区" prop="areaCode">
          <area-select ref="areaSelect" v-model="hostingRoomDetail.areaCode" :level="1" @input="searchZoneList(false)"></area-select>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label="所属板块">
          <el-select v-model="hostingRoomDetail.zoneId" class="room-detail-select" :placeholder="zoneList.length ? '请选择' : '无'">
            <el-option v-for="item in zoneList" :key="item.zoneId" :label="item.zoneName" :value="item.zoneId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="9">
        <el-form-item label="公寓/小区" prop="address">
          <el-select class="room-detail-select" ref="addressSelect" v-model="hostingRoomDetail.address" filterable remote :clearable="true" placeholder="请搜索" :remote-method="fetchAddressList" popper-class="detail-address-options" :loading="loading" @focus="checkAddressSelect" @clear="setAddress">
            <el-option v-for="(item, index) in addressList" :key="index" v-html="item.displayText" :value="item.formatName" @click.native="setAddress(item)">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="楼幢" prop="buildingName">
          <el-input v-model="hostingRoomDetail.buildingName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label="单元">
          <el-input v-model="hostingRoomDetail.unitCode"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="室" prop="roomNo">
          <el-input v-model="hostingRoomDetail.roomNo"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="10">
        <el-form-item label="户型" class="room-count" prop="chamberCount" :show-message="false">
          <el-row :gutter="10">
            <el-col :span="4">
              <el-form-item label="" prop="chamberCount" class="room-item-count">
                <el-input type="number" v-model="hostingRoomDetail.chamberCount"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" class="room-count-text">
              室
            </el-col>
            <el-col :span="4">
              <el-form-item label="" prop="boardCount" class="room-item-count">
                <el-input type="number" v-model="hostingRoomDetail.boardCount"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" class="room-count-text">
              厅
            </el-col>
            <el-col :span="4">
              <el-form-item label="" prop="toiletCount" class="room-item-count">
                <el-input type="number" v-model="hostingRoomDetail.toiletCount"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" class="room-count-text">
              卫
            </el-col>
            <el-col :span="4">
              <el-form-item label="" prop="houseArea" class="room-item-count">
                <el-input type="number" v-model="hostingRoomDetail.houseArea"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" class="room-count-text">
              m
              <sup>2</sup>
            </el-col>
          </el-row>
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item label-width="0" prop="roomDirection">
          <el-select class="room-detail-select" v-model="hostingRoomDetail.roomDirection" placeholder="朝向">
            <el-option v-for="item in roomDirectionList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item label-width="0" prop="decorationDegree">
          <el-select class="room-detail-select" v-model="hostingRoomDetail.decorationDegree" placeholder="装修程度">
            <el-option v-for="item in decorationDegreeList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8" class="room-detail-floor-container">
        <el-form-item label="层高" label-width="50px" prop="floorName">
          <el-input type="number" v-model="hostingRoomDetail.floorName" class="room-detail-floor-input">
            <template slot="prepend">所在层</template>
          </el-input>
        </el-form-item>
        <el-form-item label-width="0" prop="floorAmount">
          <el-input type="number" v-model="hostingRoomDetail.floorAmount" class="room-detail-floor-input">
            <template slot="prepend">总楼层</template>
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="看房电话">
          <el-input v-model="hostingRoomDetail.contactName" placeholder="联系人"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item label-width="0">
          <el-select v-model="hostingRoomDetail.contactGender">
            <el-option label="先生" :value="1"></el-option>
            <el-option label="女士" :value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label-width="0">
          <el-input v-model="hostingRoomDetail.contactMobile" placeholder="联系电话"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item v-if="dialogType === 2" label="房间照片">
          <el-badge :value="hostingRoomDetail.pictures ? hostingRoomDetail.pictures.length : 0">
            <el-button type="primary" size="mini" @click="openPicModel(-1)">上传照片</el-button>
          </el-badge>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="13">
        <el-form-item :label="dialogType === 1 ? '公区设施' : '房间设施'">
          <el-select class="room-detail-select" v-model="hostingRoomDetail.facilityItems" multiple placeholder="请选择">
            <el-option-group v-for="group in facilityGroup" :key="group.label" :label="group.label">
              <el-option v-for="item in group.facilitys" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="房源描述" prop="houseDesc">
          <el-input type="textarea" v-model="hostingRoomDetail.houseDesc" placeholder="最多可输入150个字" :rows="2"></el-input>
          <span class="estate-iontro-length-tips">{{hostingRoomDetail.houseDesc ? hostingRoomDetail.houseDesc.length : 0}}/150</span>
        </el-form-item>
      </el-col>
    </el-row>

    <template>
      <el-tabs class="sub-room-info-list" v-model="activeRoomName" type="border-card" editable @edit="handleTabsEdit">
        <el-tab-pane :key="item.roomName" v-for="(item, index) in hostingRoomDetail.hostingRooms" :label="item.roomName" :name="index.toString()">
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label-width="0" class="room-count">
                <el-row>
                  <el-col :span="19">
                    <el-form-item label="房间面积" :prop="'hostingRooms.' + index + '.roomArea'" :rules="hostingRoomDetailRules.roomDetail.roomArea" class="room-item-count">
                      <el-input v-model="hostingRoomDetail.hostingRooms[index].roomArea" type="number"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5" class="room-count-text">
                    m
                    <sup>2</sup>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label-width="0" :prop="'hostingRooms.' + index + '.roomDirection'" :rules="hostingRoomDetailRules.roomDetail.roomDirection">
                <el-select class="room-detail-select" v-model="hostingRoomDetail.hostingRooms[index].roomDirection" placeholder="房间朝向">
                  <el-option v-for="item in roomDirectionList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="房间照片" prop="">
                <el-badge :value="hostingRoomDetail.hostingRooms[index].pictures ? hostingRoomDetail.hostingRooms[index].pictures.length : 0">
                  <el-button type="primary" size="mini" @click="openPicModel(index)">上传照片</el-button>
                </el-badge>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label-width="0" prop="">
                <el-checkbox-group v-model="hostingRoomDetail.hostingRooms[index].roomAttributes">
                  <el-checkbox label="独立卫生间" class="room-attributes"></el-checkbox>
                  <el-checkbox label="独立阳台" class="room-attributes"></el-checkbox>
                  <el-checkbox label="独立厨房" class="room-attributes"></el-checkbox>
                  <el-checkbox label="飘窗" class="room-attributes"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="13">
              <el-form-item label="房间设施" prop="">
                <el-select class="room-detail-select" v-model="hostingRoomDetail.hostingRooms[index].facilityItems" multiple placeholder="请选择">
                  <el-option-group v-for="group in roomFacilityGroup" :key="group.label" :label="group.label">
                    <el-option v-for="item in group.facilitys" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-option-group>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </template>

    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label-width="110px" label="房源管理权限" prop="orgId">
          <el-select class="estate-model-select" v-model="hostingRoomDetail.orgId" filterable remote :clearable="true" placeholder="组织名称" :remote-method="searchOrgListByKeywords" :loading="loading" @clear="setOrg">
            <el-option v-for="item in orgList" :key="item.ordId" :value="item.orgId" :label="item.orgName" @click.native="setOrg(item)">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label-width="0">
          <el-input placeholder="账号名" v-model="hostingRoomDetail.accountName" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item label-width="30px" prop="tag">
          <el-checkbox label="飞虎队" name="type" v-model="hostingRoomDetail.tag"></el-checkbox>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item v-if="hostingRoomDetail.tag" label-width="0" prop="sourceInfo" >
          <el-select
            v-model="hostingRoomDetail.sourceInfo"
            filterable remote
            placeholder="房源提供者"
            :remote-method="fetchFlyTigerList"
            :loading="loading"
            :clearable="true"
            size="small"
            style="width: 100%">
            <el-option v-for="item in filterManagerList" :key="item.id"
              :label="item.name"
              :value="item.id">
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.mobile }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <!-- 上传图片模态框 -->
    <el-dialog
      title="上传房间照片"
      :visible.sync="uploadPicsModelVisible"
      :append-to-body="true"
      @close="uploadModelClose"
      custom-class="upload-pics-model"
      width="600px" >
      <div class="previewItems">
        <Preview
          :pic-list="currentPicList"
          :delete-icon="`delete`"
          :disabled="``"
          @emitDelete="emitDelete">
        </Preview>
        <label class="el-upload el-upload--picture-card uploadImage" for="uploadImages">
          <i class="el-icon-plus"></i>
          <input type="file" id="uploadImages" :accept="accept" multiple @change="uploadImg($event)">
        </label>
      </div>
      <p class="upload-pics-info">温馨提示： </p>
      <p class="upload-pics-info">1.请勿上传虚假、模糊、与房源信息无关、含有其他公司水印的照片； </p>
      <p class="upload-pics-info">2.房间照片最佳组合：卧室2~6张、公共区域1~4张、厨房1~3张、卫生间1-4张； </p>
      <p class="upload-pics-info">3.目前最多支持15张，支持JPG/JPEG/PNG，可以拖动图片进行排序，支持批量上传。</p>
      <!-- 图片裁剪 -->
      <ImageCropper :cropperList="cropperList" @emitCropperList="emitCropperList" @emitCropperData="emitCropperData">
      </ImageCropper>
      <span slot="footer">
        <el-button @click="uploadPicsModelVisible = false" size="small" type="primary">关 闭</el-button>
      </span>
    </el-dialog>
  </el-form>
</template>

<script>
import areaSelect from '@/components/AreaSelect'
import { } from '@/api/houseManage'
import Preview from '@/components/Preview/Preview'
import ImageCropper from '@/components/ImageCropper/Cropper'
export default {
  components: {
    areaSelect,
    Preview,
    ImageCropper
  },
  data() {
    return {
      dialogType: 1, // 1: 合租 2: 整租
      hostingRoomDetail: {
        areaCode: ['', '', ''],
        tag: false,
        hostingRooms: [{
          roomArea: '',
          roomAttributes: [],
          roomName: '房间A',
          name: '0',
          pictures: []
        }],
        pictures: []
      },
      hostingRoomDetailRules: {
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
        address: [
          { required: true, message: '请输入公寓/小区', trigger: 'change' }
        ],
        buildingName: [
          { required: true, message: '请输入楼幢名', trigger: 'blur' }
        ],
        roomNo: [
          { required: true, message: '请输入房间号', trigger: 'blur' }
        ],
        chamberCount: [
          { required: true, message: '请输入室', trigger: 'blur' }
        ],
        boardCount: [
          { required: true, message: '请输入厅', trigger: 'blur' }
        ],
        toiletCount: [
          { required: true, message: '请输入卫', trigger: 'blur' }
        ],
        houseArea: [
          { required: true, message: '请输入面积', trigger: 'blur' }
        ],
        roomDirection: [
          { required: true, message: '请选择房屋朝向', trigger: 'change' }
        ],
        decorationDegree: [
          { required: true, message: '请选择装修程度', trigger: 'change' }
        ],
        floorName: [
          { required: true, message: '请输入房源所在层', trigger: 'blur' }
        ],
        floorAmount: [
          { required: true, message: '请输入总楼层数', trigger: 'blur' }
        ],
        sourceInfo: [
          { required: true, message: '请选择一个房源提供者', trigger: 'change' }
        ],
        roomDetail: {
          roomArea: [
            { required: true, message: '请输入房间面积', trigger: 'blur' }
          ],
          roomDirection: [
            { required: true, message: '请选择房间朝向', trigger: 'change' }
          ]
        },
        tag: [
          { required: true, message: '', trigger: 'change' }
        ]
      },
      zoneList: [],
      addressList: [],
      orgList: [],
      loading: false,
      decorationDegreeList: [
        {
          label: '毛坯',
          value: 1
        },
        {
          label: '简装',
          value: 2
        },
        {
          label: '精装修',
          value: 3
        },
        {
          label: '豪华装',
          value: 4
        }
      ],
      roomDirectionList: [
        {
          label: '朝南',
          value: 1
        },
        {
          label: '朝北',
          value: 2
        },
        {
          label: '朝东',
          value: 3
        },
        {
          label: '朝西',
          value: 4
        },
        {
          label: '东南',
          value: 5
        },
        {
          label: '西南',
          value: 6
        },
        {
          label: '东北',
          value: 7
        },
        {
          label: '西北',
          value: 8
        }
      ],
      uploadPicsModelVisible: false,
      facilityGroup: [
        {
          label: '家电',
          facilitys: [{
            value: '2',
            label: '洗衣机'
          }, {
            value: '3',
            label: '空调'
          }, {
            value: '4',
            label: '冰箱'
          }, {
            value: '5',
            label: '电视'
          }]
        },
        {
          label: '家具',
          facilitys: [{
            value: '7',
            label: '沙发'
          }, {
            value: '8',
            label: '茶几'
          }, {
            value: '10',
            label: '餐桌'
          }]
        },
        {
          label: '其他',
          facilitys: [{
            value: '6',
            label: '宽带'
          }]
        }
      ],
      activeRoomName: '0',
      cityManagerList: [],
      filterManagerList: [],
      cropperList: [],
      accept: 'image/png, image/jpeg, image/jpg',
      curPicListIndex: -1,
      currentPicList: []
    }
  },
  computed: {
    roomFacilityGroup() {
      let facilityList = this.facilityGroup.slice(0)
      facilityList.splice(1, 1, {
        label: '家具',
        facilitys: [{
          value: '1',
          label: '床'
        }, {
          value: '9',
          label: '书桌'
        }, {
          value: '12',
          label: '衣柜'
        }]
      })
      return facilityList
    }
  },
  methods: {
    searchZoneList(flag) { // 搜索板块列表
      [this.hostingRoomDetail.provinceId, this.hostingRoomDetail.cityId, this.hostingRoomDetail.regionId] = this.hostingRoomDetail.areaCode
      if (this.tempFormData.regionId !== this.hostingRoomDetail.regionId && !flag) {
        this.hostingRoomDetail.address = ''
        this.hostingRoomDetail.zoneId = ''
      }
      if (this.hostingRoomDetail.areaCode[2] !== undefined) {
        estateZoneListByAreaIdApi({
          regionId: this.hostingRoomDetail.regionId
        }).then((res) => {
          this.zoneList = res.data.list
        })
      } else {
        this.zoneList = []
      }
    },
    checkAddressSelect(e) { // 验证是否已填省市区
      if (!this.hostingRoomDetail.areaCode[2]) {
        this.$message.error('请先选择所在地区')
        e.target.blur()
      }
    },
    fetchAddressList(query) { // 模糊查询公寓/小区列表
      if (query !== '') {
        this.loading = true
        hostingAddressByKeywordsApi({
          cityId: Number(this.hostingRoomDetail.areaCode[1]) || 330100,
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
    setAddress(item) {
      if (item) {
        if (item.cityId === '-1') {
          this.hostingRoomDetail.address = ''
          this.mapModelVisible = true
          this.$set(this, 'formLabelAlign', {
            city: '',
            name: '',
            region: '',
            address: ''
          })
        } else {
          if (item.areaId !== this.hostingRoomDetail.areaCode[2]) {
            this.hostingRoomDetail.areaCode = [item.provinceId, item.cityId, item.areaId]
            this.hostingRoomDetail.zoneId = ''
            this.searchZoneList(true)
          }
          this.hostingRoomDetail.regionAddressId = item ? item.regionAddressId : ''
        }
      }
    },

    handleTabsEdit(targetName, action) {
      if (action === 'add') {
        let curIndex = this.hostingRoomDetail.hostingRooms.length
        this.hostingRoomDetail.hostingRooms.push({
          roomName: '房间' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')[curIndex],
          name: curIndex.toString(),
          roomArea: '',
          roomAttributes: [],
          pictures: []
        });
        this.activeRoomName = curIndex.toString()
      }
      if (action === 'remove') {
        debugger
        let tabs = this.hostingRoomDetail.hostingRooms
        let activeName = this.activeRoomName
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab.name
              }
            }
          })
        }

        this.activeRoomName = activeName
        this.hostingRoomDetail.hostingRooms = tabs.filter(tab => tab.name !== targetName)
      }
    },
    searchOrgListByKeywords(query) {
      if (query !== '') {
        this.loading = true
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
    setOrg(item) {
      this.hostingRoomDetail.accountName = item ? item.accountName : ''
      this.hostingRoomDetail.adminUserId = item ? item.adminUserId : ''
    },
    fetchFlyTigerList(query) {
      if (query !== '') {
        this.loading = true
        if (this.cityManagerList.length) {
          this.loading = false
          this.filterManagerList = this.cityManagerList.filter(item => {
            return (item.name.toLowerCase().includes(query.toLowerCase()) || item.mobile.includes(query))
          })
        } else {
          fhdAuditApi.queryCityManager().then((res) => {
            this.loading = false
            if (res.code === '0' && res.data) {
              this.cityManagerList = res.data
              this.filterManagerList = this.cityManagerList.filter(item => {
                return (item.name.toLowerCase().includes(query.toLowerCase()) || item.mobile.includes(query))
              })
            }
          })
        }
      } else {
        this.filterManagerList = []
      }
    },
    setRoomDetailData(val) {
      // if (JSON.stringify(val) === '{}') {

      // }
      // this.$set(this, 'hostingRoomDetail', val)
      // this.$refs.hostingRoomDetail.clearValidate()
    },
    returnRoomDetailData() {
      let roomDetailData = false
      this.$refs.hostingRoomDetail.validate((status) => {
        if (status) {
          roomDetailData = this.hostingRoomDetail
        } else {
          this.$message.error('您还有必填信息未填写完全，请全部填写好后再保存')
          return false
        }
      })
      return roomDetailData
    },
    openPicModel(index) {  // 打开上传图片列表
      this.curPicListIndex = index
      this.currentPicList = index === -1 ? this.hostingRoomDetail.pictures : this.hostingRoomDetail.hostingRooms[index].pictures
      this.uploadPicsModelVisible = true
    },
    uploadModelClose() {  // 关闭上传图片列表
      this.curPicListIndex === -1 ? (this.hostingRoomDetail.pictures = this.currentPicList) : (this.hostingRoomDetail.hostingRooms[this.curPicListIndex].pictures = this.currentPicList)
      this.currentPicList = []
    },
    // 删除图片
    emitDelete(val) {
      this.currentPicList = val || []
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
      this.currentPicList = [...this.currentPicList, ...list]
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
      let picList = this.currentPicList
      if (picList.length + files.length > 15) {
        this.$message.error(`您已上传${picList.length}张图片，最多还能上传${15 - picList.length}张图片`)
        e.target.value = null
        return false
      }
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
      e.target.value = null
    }
  }
}
</script>

<style lang="scss" scoped>
.room-detail-container {
  .estate-iontro-length-tips {
    position: absolute;
    bottom: 0px;
    right: 10px;
  }
  .room-attributes {
    & + .room-attributes {
      margin-left: 20px;
    }
  }
  .sub-room-info-list {
    margin-bottom: 18px;
    box-shadow: 0 0;
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

