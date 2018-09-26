/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-09-26 18:01:22
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-09-26 19:03:28
 */
<template>
  <div class="app-container">
    <div class="model-search clearfix">
      <div>
        <el-select
          size="small" v-model="formData.tenantSource" placeholder="客户来源"
          class="item-select" style="width: 150px;"
          clearable filterable>
          <el-option v-for="item in sourceList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select
          size="small" v-model="formData.housingType" placeholder="预约房型"
          class="filter-item item-select" style="width: 150px;" clearable>
          <el-option v-for="item in housingTypeList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-date-picker
          v-model="dateTime"
          type="daterange"
          size="small"
          class="filter-item"
          style="width: 350px;"
          align="right"
          key="dateTime"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions"
          @change="changeDate">
        </el-date-picker>
        <el-button
          type="primary" size="small"
          icon="el-icon-search" class="filter-item"
           @click.native="searchParam">查询</el-button>
        <el-button
          plain size="small" icon="el-icon-remove-outline"
          @click.native="clearForm">清空</el-button>
      </div>
      <div style="margin-top: 10px;">
        <el-select size="small"
          v-model="formData.processStatus" placeholder="处理状态"
          class="item-select" style="width: 150px;" clearable>
          <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select
          size="small" v-model="formData.processResult"
          placeholder="处理结果" class="filter-item item-select"
          style="width: 150px;" clearable>
          <el-option v-for="item in resultList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-input size="small"
          v-model="formData.mobile" placeholder="客户/房东手机号"
          class="filter-item"
          style="width: 350px;"
          @keydown.native.enter="searchParam">
        </el-input>
        <el-button
          class="filter-item" type="primary"
          size="small" icon="el-icon-upload"
          @click="exportExcel"
          :loading="downloadLoading">导出</el-button>
        <el-button type="primary" size="small"
          icon="el-icon-circle-plus-outline"
          @click="addAndEdit(1)">新增预约</el-button>
      </div>
    </div>
    <GridUnit
      ref="refGridUnit"
      :columns="colModels"
      :url="url"
      :data-method="method"
      :height="tableHeight"
      :pageSizes="[50, 100, 150, 200]"
      :form-options="formData">
      <template
        slot="handle"
        slot-scope="scope">
        <el-button
          type="primary"
          icon="el-icon-view"
          size="small"
          @click="handleView(scope.$index)">
          再来一个表格吧
        </el-button>
      </template>
    </GridUnit>
    <div class="dialog-info">
      <el-dialog
        :title="infoTitle"
        :visible.sync="layer_showInfo"
        width="600px">
        <div class="container">
          <el-form
            ref="detailFrom"
            label-width="80px"
            size="small"
            :model="detailData" >
            <el-form-item label="活动名称">
              <el-input v-model="detailData.name"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
              <el-select v-model="detailData.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="活动时间">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="detailData.date1" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="detailData.date2" style="width: 100%;"></el-time-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="即时配送">
              <el-switch v-model="detailData.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="活动性质">
              <el-checkbox-group v-model="detailData.type">
                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                <el-checkbox label="地推活动" name="type"></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="特殊资源">
              <el-radio-group v-model="detailData.resource">
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="活动形式">
              <el-input type="textarea" v-model="detailData.desc"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="layer_showInfo = false" size="small">取 消</el-button>
          <el-button type="primary" size="small">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { ObjectMap, deepClone } from '@/utils'
import { tenantReservationApi } from '@/api/userManage'
// import { validateMobile } from '@/utils/validate'
import GridUnit from '@/components/GridUnit/grid'
import { customerData } from './pageData/customerSource'

const pickerOptions = {
  shortcuts: [{
    text: '最近一周',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }]
}

export default {
  name: 'customerSource',
  components: {
    GridUnit
  },
  filters: {

  },
  data() {
    return {
      tableHeight: 300,
      tableData: [],
      downloadLoading: false,
      layer_showInfo: false,
      infoTitle: '新增客源',
      dateTime: '',
      pickerOptions,
      ...customerData,
      detailData: {},
      formData: {
        startDate: '',
        endDate: '',
        processStatus: 0
      },
      colModels: [
        { prop: 'tenantName', label: '客户姓名' },
        { prop: 'tenantMobile', label: '手机号码' },
        {
          prop: 'housingType',
          label: '预约房型',
          render (row) {
            return row.housingType === 1 ? '集中式' : '分散式'
          }
        },
        { prop: 'tenantSource', label: '客户来源' },
        { prop: 'roomCode', label: '房源编号' },
        { prop: 'landlordName', label: '房东' },
        { prop: 'landlordMobile', label: '房东手机号' },
        { prop: 'cityName', label: '城市' },
        { prop: 'addressName', label: '房源位置' },
        { prop: 'bookingRemark', label: '备注' },
        { prop: 'bookingTime', label: '预约时间', filter: 'parseTime', width: 180 },
        {
          prop: 'activityStatus',
          label: '处理状态',
          width: 80,
          type: 'status',
          unitFilters: {
            renderStatusType(status) {
              const statusMap = {
                '1': 'success',
                '0': 'danger'
              }
              return statusMap[status] || 'info'
            },
            renderStatusValue(status) {
              const statusStrData = ['未处理', '已处理']
              return statusStrData[status] || '未知'
            }
          }
        },
        { prop: 'createTime', label: '创建时间', filter: 'parseTime', width: 180 },
        { prop: 'modifyTime', label: '更新时间', filter: 'parseTime', width: 180 },
        { label: '操作', slotName: 'handle', width: 160, fixed: 'right', noExport: true }
      ],
      url: tenantReservationApi.baseUrl,
      method: tenantReservationApi.queryMethod
    }
  },
  created() {

  },
  mounted() {
    /* 表格高度控制 */
    this.$nextTick(() => {
      const offsetTop = this.$refs.refGridUnit.$el.offsetTop || 140
      const pagenationH = 55
      const containerPadding = 30
      let temp_height = document.body.clientHeight - offsetTop - pagenationH - containerPadding
      this.tableHeight = temp_height > 300 ? temp_height : 300
      window.onresize = () => {
        return (() => {
          temp_height = document.body.clientHeight - offsetTop - pagenationH - containerPadding
          this.tableHeight = this.tableHeight = temp_height > 300 ? temp_height : 300
        })()
      }
    })
  },
  methods: {
    // 查询数据
    searchParam () {
      this.$nextTick(() => {
        this.$refs.refGridUnit.searchHandler()
        this.tableData = this.$refs.refGridUnit.tableData
        console.log(this.tableData)
      })
    },

    // 日期选择
    changeDate (value) {
      this.formData.startDate = value ? value[0] : ''
      this.formData.endDate = value ? value[1] : ''
    },

    // 新增/编辑客源
    addAndEdit (type, data = {}) {
      this.layer_showInfo = true
      this.infoTitle = type === 2 ? '编辑客源' : '新增客源'
      this.detailData = data
    },

    // 数据导出
    exportExcel () {
      this.downloadLoading = true
      tenantReservationApi.list(
        ObjectMap({
          ...this.formData,
          pageNo: 1,
          pageSize: 999999
        })
      ).then(response => {
        response.data.list.map((item, index) => {
          item.index = index * 1 + 1
        })
        require.ensure([], () => {
          const { export_json_to_excel } = require('@/vendor/Export2Excel')
          const filterCols = this.colModels.filter((item) => {
            return !item.noExport
          })
          const tHeader = filterCols.map((item) => item.label)
          const filterVal = filterCols.map((item) => item.prop)
          const data = this.formatJson(filterVal, response.data.list || [])
          export_json_to_excel(tHeader, data, new Date().getTime(), '意向客源')
          this.downloadLoading = false
        })
      })
      .catch(() => {
        this.downloadLoading = false
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
