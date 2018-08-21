<template>
  <el-dialog title="添加房源" :visible.sync="roomDetail" width="1000px">
    <el-form ref="hostingRoomDetail" :model="hostingRoomDetail" :rules="hostingRoomDetailRules" label-width="90px" size="small">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="所在地区" prop="areaCode">
            <area-select ref="areaSelect" v-model="hostingRoomDetail.areaCode" :level="1" @input="searchZoneList(false)"></area-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属板块" prop="zoneId">
            <el-select v-model="hostingRoomDetail.zoneId" class="estate-model-select" :placeholder="zoneList.length ? '请选择' : '无'">
              <el-option v-for="item in zoneList" :key="item.zoneId" :label="item.zoneName" :value="item.zoneId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="公寓/小区" prop="address">
            <el-select class="estate-model-select" ref="addressSelect" v-model="hostingRoomDetail.address" filterable remote :clearable="true" placeholder="请搜索" :remote-method="fetchAddressList" popper-class="detail-address-options" :loading="loading" @focus="checkAddressSelect" @clear="setAddress">
              <el-option v-for="(item, index) in addressList" :key="index" v-html="item.displayText" :value="item.formatName" @click.native="setAddress(item)">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="楼幢" prop="">
            <el-input v-model="estateModel.estateName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单元" prop="">
            <el-input v-model="estateModel.estateName"></el-input>
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
      loading: false
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
          this.estateModel.address = ''
          this.mapModelVisible = true
          this.$set(this, 'formLabelAlign', {
            city: '',
            name: '',
            region: '',
            address: ''
          })
        } else {
          if (item.areaId !== this.estateModel.areaCode[2]) {
            this.estateModel.areaCode = [item.provinceId, item.cityId, item.areaId]
            this.estateModel.zoneId = ''
            this.searchZoneList(true)
          }
          this.estateModel.regionAddressId = item ? item.regionAddressId : ''
        }
      }
    },
  },

}
</script>

<style>
</style>
