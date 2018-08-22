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
              <el-col :span="2">
                室
              </el-col>
              <el-col :span="4">
                <el-form-item label="" prop="boardCount" class="room-item-count">
                  <el-input type="number" v-model="hostingRoomDetail.boardCount"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                厅
              </el-col>
              <el-col :span="4">
                <el-form-item label="" prop="toiletCount" class="room-item-count">
                  <el-input type="number" v-model="hostingRoomDetail.toiletCount"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                卫
              </el-col>
              <el-col :span="4">
                <el-form-item label="" prop="" class="room-item-count">
                  <el-input type="number" v-model="hostingRoomDetail.toiletCount"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                m<sup>2</sup>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="朝向" label-width="60px" prop="roomDirection">
            <el-select class="room-detail-select" v-model="hostingRoomDetail.roomDirection" placeholder="请选择">
              <el-option v-for="item in roomDirectionList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="装修程度" prop="decorationDegree">
            <el-select class="room-detail-select" v-model="hostingRoomDetail.decorationDegree" placeholder="请选择">
              <el-option v-for="item in decorationDegreeList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
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
        <el-col :span="5">
          <el-form-item label="层高" label-width="60px" prop="contactMobile" class="room-detail-floor-container">
            <el-input v-model="hostingRoomDetail.contactMobile">
              <template slot="prepend">所在层</template>
            </el-input>
            <el-input v-model="hostingRoomDetail.contactMobile">
              <template slot="prepend">总楼层</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
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
import {} from '@/api/houseManage'
export default {
  components: {
    areaSelect
  },
  data() {
    return {
      // dialogType: 1 // 1: 合租 2: 整租
      roomDetail: true,
      hostingRoomDetail: {
        areaCode: ['', '', '']
      },
      hostingRoomDetailRules: {},
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
    }
  },
  methods: {
    searchZoneList (flag) { // 搜索板块列表
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
  },

}
</script>

<style lang="scss" scoped>
.room-detail-container {
  .room-detail-select {
    width: 100%;
  }
}

</style>

