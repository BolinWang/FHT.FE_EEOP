<template>
  <div class="app-container">
    <div class="model-search clearfix">
      <div>
        <el-select
          size="small" v-model="formData.cityName" placeholder="城市" style="width: 150px;" clearable filterable>
          <el-option v-for="item in cityList" :key="item.cityId"
            :label="item.cityName" :value="item.cityName">
          </el-option>
        </el-select>
        <el-select
          size="small" v-model="formData.deductibleType" placeholder="抵扣类型"
          class="filter-item" style="width: 150px;" clearable filterable>
          <el-option label="房租" value="房租"></el-option>
          <el-option label="水费" value="水费"></el-option>
          <el-option label="电费" value="电费"></el-option>
        </el-select>
        <el-select
          size="small" v-model="formData.triggerType" placeholder="触发类型"
          class="filter-item" style="width: 150px;" clearable filterable>
          <el-option label="无" value="无"></el-option>
          <el-option label="注册" value="注册"></el-option>
        </el-select>
        <el-select
          size="small" v-model="formData.status" placeholder="抵扣券状态"
          class="filter-item" style="width: 150px;" clearable filterable>
          <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-button
          type="primary" size="small"
          icon="el-icon-search" class="filter-item"
           @click.native="searchParam">查询</el-button>
        <el-button
          plain size="small" icon="el-icon-remove-outline"
          @click.native="clearForm">清空</el-button>
      </div>
      <div style="margin-top: 10px;">
        <el-input size="small"
          v-model="formData.couponName" placeholder="抵扣券名称"
          style="width: 269px;"
          @keydown.native.enter="searchParam">
        </el-input>
        <el-date-picker
          v-model="dateTime"
          type="daterange"
          size="small"
          class="filter-item"
          style="width: 360px;"
          align="right"
          key="dateTime"
          unlink-panels
          range-separator="至"
          start-placeholder="创建开始日期"
          end-placeholder="创建结束日期"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions"
          @change="changeDate">
        </el-date-picker>
        <el-button
          type="primary" size="small" class="filter-item"
          icon="el-icon-circle-plus-outline"
          @click="openDialog('addEditVoucher', '新增', {})">新增抵扣券</el-button>
        <el-button
          class="filter-item" type="primary"
          size="small" icon="el-icon-service"
          @click="openDialog('systemVoucher', '人工发放', selections)">人工发放</el-button>
      </div>
    </div>
    <GridUnit
      ref="refGridUnit"
      :columns="colModels"
      :url="gridFetchOptions.url"
      :data-method="gridFetchOptions.method"
      :is-mock="gridFetchOptions.isMock"
      :height="tableHeight"
      :showSelection="true"
      @selection-change="handleSelectionChange"
      :form-options="formData">
      <el-table-column slot="selection" type="selection">
      </el-table-column>
      <template
        slot="handle"
        slot-scope="scope">
        <el-button
          type="primary"
          size="small"
          @click="openDialog('addEditVoucher', '查看', scope.row)">查看</el-button>
        <el-button
          type="warning"
          size="small"
          @click="openDialog('codeVoucher', '兑换码', scope.row)">兑换码</el-button>
        <el-button
          v-if="scope.row.status !== 2"
          :type="scope.row.status === 1 ? 'danger' : 'success'"
          size="small"
          @click="changeVoucherStatus(scope.row)">
          {{scope.row.status === 1 ? '停用' : '启用'}}
        </el-button>
      </template>
    </GridUnit>
    <add-edit-voucher
      ref="addEditVoucher"
      :voucherData="voucherDialog.detailData_addEditVoucher"
      v-if="voucherDialog.show_addEditVoucher"
      @closeVoucher="closeVoucher('addEditVoucher')">
    </add-edit-voucher>
    <code-voucher
      ref="codeVoucher"
      :codeData="voucherDialog.detailData_codeVoucher"
      v-if="voucherDialog.show_codeVoucher"
      @closeVoucher="closeVoucher('codeVoucher')">
    </code-voucher>
    <system-voucher
      ref="systemVoucher"
      :codeData="voucherDialog.detailData_systemVoucher"
      v-if="voucherDialog.show_systemVoucher"
      @closeVoucher="closeVoucher('systemVoucher')">
    </system-voucher>
  </div>
</template>
<script>
import { voucherManageApi } from '@/api/ticketManage'
import { appIconApi } from '@/api/eeop'
import GridUnit from '@/components/GridUnit/grid'
import addEditVoucher from './components/addEditVoucher'
import codeVoucher from './components/codeVoucher'
import systemVoucher from './components/systemVoucher'
import { pickerOptions } from '@/utils'

const pickerOptionsObj = {
  shortcuts: pickerOptions
}

export default {
  name: 'voucherManage',
  components: {
    GridUnit,
    addEditVoucher,
    codeVoucher,
    systemVoucher
  },
  filters: {

  },
  data() {
    return {
      tableHeight: 300,
      dateTime: '',
      pickerOptions: pickerOptionsObj,
      cityList: [],
      formData: {
        couponType: 1
      },
      statusList: [{
        label: '未启用',
        value: 0
      }, {
        label: '启用中',
        value: 1
      }, {
        label: '已过期',
        value: 2
      }],
      colModels: [
        { slot: 'selection' },
        { prop: 'couponName', label: '名称' },
        { prop: 'discountAmount', label: '面值', width: 100 },
        { prop: 'fullMoney', label: '起用金额', width: 100 },
        { prop: 'useRange', label: '抵扣类型', width: 100 },
        { prop: 'residualQuantityNum', label: '剩余可发数量' },
        { prop: 'triggerTypeStr', label: '触发条件', width: 100 },
        { prop: 'status',
          label: '状态',
          width: 100,
          type: 'status',
          unitFilters: {
            renderStatusType(status) {
              const statusMap = {
                '2': 'danger',
                '1': 'success',
                '0': 'info'
              }
              return statusMap[status] || 'info'
            },
            renderStatusValue(status) {
              const statusStrData = ['未启用', '启用中', '已过期']
              return statusStrData[status] || '未知'
            }
          }
        },
        { prop: 'totalNum', label: '发放总量' },
        { prop: 'createTimeStr', label: '创建时间', width: 140 },
        { label: '操作', slotName: 'handle', width: 265, fixed: 'right' }
      ],
      gridFetchOptions: {
        url: voucherManageApi.baseUrl,
        method: voucherManageApi.queryMethod,
        isMock: true
      },
      voucherDialog: {},
      selections: []
    }
  },
  created() {
    appIconApi.cityList().then(response => {
      this.cityList = response.data
    })
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
    openDialog(type, dialogtTitle, data = {}) {
      if (type === 'systemVoucher') {
        if (!this.selections.length) {
          this.$message.error('请选择发放的优惠券')
          return false
        }
      }
      if (dialogtTitle === '查看') {
        voucherManageApi.queryOneCouponInfo({
          couponId: data.id
        }).then(res => {
          const resData = res.data || {}
          const cpCouponTemplate = res.data.cpCouponTemplate || {}
          data = {
            ...resData,
            ...cpCouponTemplate,
            cpCouponTemplate: undefined,
            discountAmount: (cpCouponTemplate.discountAmount || '') + '',
            totalNum: (cpCouponTemplate.totalNum || '') + '',
            fullMoney: (cpCouponTemplate.fullMoney || '') + '',
            deductibleType: (resData.deductibleType || [])[0],
            triggerType: (resData.triggerType || [])[0] || '无'
          }
          this.doOpenDialog(type, dialogtTitle, data)
        })
      } else {
        this.doOpenDialog(type, dialogtTitle, data)
      }
    },
    doOpenDialog(type, dialogtTitle, data = {}) {
      this.voucherDialog[`detailData_${type}`] = type === 'systemVoucher' ? {
        dialogtTitle,
        list: data.filter(item => {
          return item.status !== 2 && item.residualQuantityNum * 1 > 0
        })
      } : {
        dialogtTitle,
        cityList: this.cityList,
        ...data
      }
      if (type === 'systemVoucher') {
        this.$confirm(`已选择${this.voucherDialog[`detailData_${type}`].list.length}个符合条件的抵扣券，请确认`, '提示', {
          confirmButtonText: '已确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$set(this.voucherDialog, `show_${type}`, true)
        }).catch()
      } else {
        this.$set(this.voucherDialog, `show_${type}`, true)
      }
    },
    closeVoucher(type) {
      this.voucherDialog[`detailData_${type}`] = {}
      this.voucherDialog[`show_${type}`] = false
      // if (type === 'addEditVoucher') {
      //   this.searchParam()
      // }
    },

    // 查询数据
    searchParam() {
      this.$nextTick(() => {
        this.$refs.refGridUnit.searchHandler()
      })
    },
    // 清空
    clearForm() {
      this.formData = {
        couponType: 1
      }
      this.dateTime = []
      this.searchParam()
    },

    // 日期选择
    changeDate(value) {
      this.formData.createStartDate = value ? value[0] : ''
      this.formData.createEndDate = value ? value[1] : ''
    },

    handleSelectionChange(selections) {
      this.selections = selections || []
    },

    changeVoucherStatus(row) {
      voucherManageApi.editCouponStatus({
        couponId: row.id,
        status: row.status === 1 ? 0 : 1
      }).then(res => {
        this.$message.success(`${row.status === 1 ? '停用' : '启用'}成功`)
        this.searchParam()
      })
    }
  }
}
</script>
<style lang="scss">

</style>

