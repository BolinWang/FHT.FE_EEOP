<template>
  <el-dialog title="添加房源" :visible.sync="roomDetail" width="1000px" class="room-detail-container hosting-room-detail">
    <el-form ref="hostingRoomDetail" :model="hostingRoomDetail" :rules="hostingRoomDetailRules" label-width="90px" size="small">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="所在地区" prop="areaCode">
            <area-select ref="areaSelect" v-model="hostingRoomDetail.areaCode" :level="1" @input="searchZoneList(false)"></area-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="所属板块" prop="zoneId">
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
          <el-form-item label="楼幢" prop="">
            <el-input v-model="hostingRoomDetail.estateName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="单元" prop="">
            <el-input v-model="hostingRoomDetail.estateName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="室" prop="">
            <el-input v-model="hostingRoomDetail.estateName"></el-input>
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
                <el-form-item label="" prop="" class="room-item-count">
                  <el-input type="number" v-model="hostingRoomDetail.toiletCount"></el-input>
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
          <el-form-item label="看房电话" prop="contactName">
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
          <el-form-item label-width="0" prop="contactMobile">
            <el-input v-model="hostingRoomDetail.contactMobile" placeholder="联系电话"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item v-if="dialogType === 2" label="房间照片" prop="">
            <el-badge :value="hostingRoomDetail.pictures ? hostingRoomDetail.pictures.length : 0">
              <el-button type="primary" size="mini" @click="openPicModel">上传照片</el-button>
            </el-badge>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="13">
          <el-form-item :label="dialogType === 1 ? '公区设施' : '房间设施'" prop="">
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
        <el-tabs v-model="activeRoomName" type="card" editable @edit="handleTabsEdit">
          <el-tab-pane :key="item.name" v-for="(item, index) in editableTabs" :label="item.title" :name="item.name">
            <el-row :gutter="20" >
              <el-col :span="5">
                <el-form-item label-width="0" class="room-count">
                  <el-row>
                    <el-col :span="19">
                      <el-form-item label="房间面积" prop="">
                        <el-input v-model="hostingRoomDetail.hostingRoomList[0].roomArea"></el-input>
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
                  <el-select class="room-detail-select" v-model="hostingRoomDetail.hostingRoomList[0].roomDirection" placeholder="房间朝向">
                    <el-option v-for="item in roomDirectionList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="房间照片" prop="">
                  <el-badge :value="hostingRoomDetail.hostingRoomList[0].pictures ? hostingRoomDetail.hostingRoomList[0].pictures.length : 0">
                    <el-button type="primary" size="mini" @click="openPicModel">上传照片</el-button>
                  </el-badge>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-checkbox-group v-model="hostingRoomDetail.hostingRoomList[0].roomAttributes">
                  <el-checkbox label="独立卫生间"></el-checkbox>
                  <el-checkbox label="独立阳台"></el-checkbox>
                  <el-checkbox label="独立厨房"></el-checkbox>
                  <el-checkbox label="飘窗"></el-checkbox>
                </el-checkbox-group>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="13">
                <el-form-item label="房间设施" prop="">
                  <el-select class="room-detail-select" v-model="hostingRoomDetail.hostingRoomList[0].facilityItems" multiple placeholder="请选择">
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
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" type="primary" @click="roomDetail = false">保存并继续添加</el-button>
      <el-button size="small" type="primary" @click="roomDetail = false">保存并关闭</el-button>
      <el-button size="small" @click="roomDetail = false">取 消</el-button>
    </span>
  </el-dialog>
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
      roomDetail: true,
      hostingRoomDetail: {
        areaCode: ['', '', ''],
        hostingRoomList: [{
          roomArea: '',
          roomAttributes: []
        }]
      },
      hostingRoomDetailRules: {
        floorName: [
          { required: true, message: '请输入房源所在层', trigger: 'blur' }
        ]
      },
      zoneList: [],
      addressList: [],
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
      activeRoomName: '1',
      editableTabs: [{
        title: 'Tab 1',
        name: '1',
        content: 'Tab 1 content'
      }, {
        title: 'Tab 2',
        name: '2',
        content: 'Tab 2 content'
      }],
      tabIndex: 2
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
        let newTabName = ++this.tabIndex + '';
        this.editableTabs.push({
          title: 'New Tab',
          name: newTabName,
          content: 'New Tab content'
        });
        this.activeRoomName = newTabName
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
    }
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
}
</style>

