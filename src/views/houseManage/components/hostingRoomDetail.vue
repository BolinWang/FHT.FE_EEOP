<template>
  <el-dialog title="添加房源" :visible.sync="roomDetail" width="1000">
    <el-form ref="hostingRoomDetail" :model="hostingRoomDetail" :rules="hostingRoomDetailRules" label-width="100px" size="small">
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
      zoneList: []
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
    }
  },

}
</script>

<style>
</style>
