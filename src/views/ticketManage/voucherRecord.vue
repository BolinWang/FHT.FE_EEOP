<template>
  <div class="app-container">
    <div class="model-search clearfix">
      <div>
        <el-select
          size="small" v-model="formData.status" placeholder="抵扣券状态"
          style="width: 150px;" clearable filterable>
          <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-input size="small" style="width: auto;" class="filter-item"
          v-model="formData.couponName" placeholder="抵扣券名称"
          @keydown.native.enter="searchParam">
        </el-input>
        <el-input size="small" style="width: auto;" class="filter-item"
          v-model="formData.userMobile" placeholder="用户账号"
          @keydown.native.enter="searchParam">
        </el-input>
        <el-button
          type="primary" size="small"
          icon="el-icon-search" class="filter-item"
           @click.native="searchParam">查询</el-button>
        <el-button
          plain size="small" icon="el-icon-remove-outline"
          @click.native="clearForm">清空</el-button>
        <el-button
          type="primary" size="small" icon="el-icon-download"
          :loading="downloadLoading"
          @click="exportExcel">导出</el-button>
      </div>
      <div style="margin-top: 10px;">
        <el-date-picker
          v-model="dateTime1"
          type="daterange"
          size="small"
          style="width: 360px;"
          align="right"
          key="dateTime1"
          unlink-panels
          range-separator="至"
          start-placeholder="领取开始日期"
          end-placeholder="领取结束日期"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions"
          @change="value => {
            return changeDate(value, 'receive')
          }">
        </el-date-picker>
        <el-date-picker
          v-model="dateTime2"
          type="daterange"
          size="small"
          class="filter-item"
          style="width: 360px;"
          align="right"
          key="dateTime2"
          unlink-panels
          range-separator="至"
          start-placeholder="修改开始日期"
          end-placeholder="修改结束日期"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions"
          @change="value => {
            return changeDate(value, 'modified')
          }">
        </el-date-picker>
      </div>
    </div>
    <GridUnit
      ref="refGridUnit"
      :columns="colModels"
      :url="gridFetchOptions.url"
      :data-method="gridFetchOptions.method"
      :is-mock="gridFetchOptions.isMock"
      :height="tableHeight"
      :form-options="formData">
    </GridUnit>
  </div>
</template>
<script>
import { ObjectMap } from '@/utils'
import { voucherRecordApi } from '@/api/ticketManage'
import GridUnit from '@/components/GridUnit/grid'

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
  name: 'voucherRecord',
  components: {
    GridUnit
  },
  filters: {

  },
  data() {
    return {
      tableHeight: 300,
      statusList: [{
        label: '未使用',
        value: 0
      }, {
        label: '已使用',
        value: 1
      }, {
        label: '已过期',
        value: 3
      }],
      dateTime1: '',
      dateTime2: '',
      pickerOptions,
      formData: {},
      downloadLoading: false,
      colModels: [
        { prop: 'couponName', label: '名称' },
        { prop: 'discountAmount', label: '面值', width: 100 },
        { prop: 'userMobile', label: '用户账号', width: 100 },
        { prop: 'status',
          label: '状态',
          width: 100,
          type: 'status',
          unitFilters: {
            renderStatusType(status) {
              const statusMap = {
                '3': 'danger',
                '1': 'success',
                '0': 'info'
              }
              return statusMap[status] || 'info'
            },
            renderStatusValue(status) {
              const statusStrData = ['未使用', '已使用', '未知', '已过期']
              return statusStrData[status] || '未知'
            }
          }
        },
        {
          prop: 'createTimeStr',
          label: '领取时间',
          width: 140
        },
        {
          prop: 'gmtModifiedStr',
          label: '修改时间',
          width: 140
        },
        { prop: 'receiveSourceStr', label: '领取方式' },
        { prop: 'operateName', label: '操作人' }
      ],
      gridFetchOptions: {
        url: voucherRecordApi.baseUrl,
        method: voucherRecordApi.queryMethod,
        isMock: true
      }
    }
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
    searchParam() {
      this.$nextTick(() => {
        this.$refs.refGridUnit.searchHandler()
      })
    },
    // 清空
    clearForm() {
      this.formData = {}
      this.dateTime1 = []
      this.dateTime2 = []
      this.searchParam()
    },

    // 日期选择
    changeDate(value, type) {
      this.formData[`${type}StartTime`] = value ? value[0] : ''
      this.formData[`${type}EndTime`] = value ? value[1] : ''
    },

    // 数据导出
    exportExcel() {
      this.downloadLoading = true
      voucherRecordApi.list(
        ObjectMap({
          ...this.formData,
          pageNo: 1,
          pageSize: 999999
        })
      ).then(response => {
        const resData = (response.data.content || []).slice()
        resData.map((item, index) => {
          item.index = index * 1 + 1
          item.status = item.statusStr
        })
        require.ensure([], () => {
          const { export_json_to_excel } = require('@/vendor/Export2Excel')
          const filterCols = this.colModels.filter((item) => {
            return !item.noExport
          })
          const tHeader = ['序号', ...(filterCols.map((item) => item.label))]
          const filterVal = ['index', ...(filterCols.map((item) => item.prop))]
          console.log(tHeader, filterVal)
          const data = this.formatJson(filterVal, resData)
          export_json_to_excel(tHeader, data, '抵扣券使用记录', '抵扣券使用记录')
          this.downloadLoading = false
        })
      }).catch((err) => {
        console.log(err)
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    }
  }
}
</script>
<style lang="scss">

</style>

