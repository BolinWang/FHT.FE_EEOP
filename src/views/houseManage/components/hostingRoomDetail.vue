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
        <el-form-item label="户型" class="room-count" prop="tag">
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
            <el-button type="primary" size="mini" @click="openPicModel">上传照片</el-button>
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
                    <el-form-item label="房间面积" prop="" class="room-item-count">
                      <el-input v-model="hostingRoomDetail.hostingRooms[index].roomArea"></el-input>
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
              <el-form-item label-width="0" prop="roomDirection">
                <el-select class="room-detail-select" v-model="hostingRoomDetail.hostingRooms[index].roomDirection" placeholder="房间朝向">
                  <el-option v-for="item in roomDirectionList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="房间照片" prop="">
                <el-badge :value="hostingRoomDetail.hostingRooms[index].pictures ? hostingRoomDetail.hostingRooms[index].pictures.length : 0">
                  <el-button type="primary" size="mini" @click="openPicModel">上传照片</el-button>
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
        <el-form-item label-width="30px">
          <el-checkbox label="飞虎队" name="type" v-model="hostingRoomDetail.tag"></el-checkbox>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item v-show="hostingRoomDetail.tag" label-width="0" prop="sourceInfo" >
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
  </el-form>
</template>

<script>
import areaSelect from '@/components/AreaSelect'
import { } from '@/api/houseManage'
export default {
  components: {
    areaSelect
  },
  data() {
    return {
      dialogType: 1, // 1: 合租 2: 整租
      hostingRoomDetail: {
        areaCode: ['', '', ''],
        hostingRooms: [{
          roomArea: '',
          roomAttributes: [],
          roomName: "房间A"
        }]
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
        floorName: [
          { required: true, message: '请输入房源所在层', trigger: 'blur' }
        ],
        floorAmount: [
          { required: true, message: '请输入总楼层数', trigger: 'blur' }
        ],
        sourceInfo: [
          { required: true, message: '请选择一个房源提供者', trigger: 'change' }
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
      filterManagerList: []
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
    openPicModel() {  // 打开上传图片列表
      this.uploadPicsModelVisible = true
    },
    handleTabsEdit(targetName, action) {
      if (action === 'add') {
        let curIndex = this.hostingRoomDetail.hostingRooms.length
        this.hostingRoomDetail.hostingRooms.push({
          roomName: '房间' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')[curIndex],
          name: curIndex.toString
        });
        this.activeRoomName = curIndex.toString
      }
      if (action === 'remove') {
        let tabs = this.editableTabs;
        let activeName = this.activeRoomName
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.activeRoomName = activeName
        this.editableTabs = tabs.filter(tab => tab.name !== targetName)
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
  },

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
</style>

