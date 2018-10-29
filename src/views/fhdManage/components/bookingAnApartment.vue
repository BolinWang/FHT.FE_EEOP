/*
 * @Author: ghost 
 * @Date: 2018-10-22 09:35:00 
 * @Last Modified by: ghost
 * @Last Modified time: 2018-10-25 20:37:40
 */
<template>
  <div class="compents-container">
    <div class="model-search clearfix">
      <el-form :rules="rules" :model="bookingSearchForm" ref="bookingSearchForm" size="small" :inline="true">
        <el-form-item prop="keyword">
          <el-input 
            @keydown.native.enter="searchParam" 
            v-model="bookingSearchForm.keyword" 
            size="small" 
            placeholder="租客／租客手机号码" 
            style="width:155px" />
        </el-form-item>
        <el-form-item >
          <el-date-picker 
            v-model="dateTime" 
            type="daterange" 
            size="small" 
            class="filter-item" 
            style="width: 240px;" 
            align="right" 
            key="dateTime" 
            unlink-panels 
            range-separator="-" 
            start-placeholder="开始日期" 
            end-placeholder="结束日期" 
            value-format="yyyy-MM-dd" 
            :picker-options="pickerOptions" 
            @change="changeDate">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="housingType">
          <el-select @change="searchParam" v-model="bookingSearchForm.housingType" filterable clearable size="small" placeholder="房源类型" style="width:120px">
            <el-option v-for="(item,index) in houseTypeList" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="status">
          <el-select @change="searchParam" v-model="bookingSearchForm.status" filterable clearable size="small" placeholder="操作" style="width:120px">
            <el-option v-for="(item,index) in status" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" size="small" icon="el-icon-search" @click.native="searchParam" class="filter-item">查询</el-button>
        <el-button plain size="small" icon="el-icon-remove-outline" @click.native="clearForm('bookingSearchForm')">清空</el-button>
        <el-button type="primary" size="small" icon="el-icon-upload" @click.native="exportExcel">导出</el-button>
      </el-form>
    </div>
    <GridUnit
      ref="refGridUnit"
      :columns="colModels"
      :url="url"
      totalField='data.total'
      listField="data.result"
      :formOptions="bookingSearchForm"
      :dataMethod="method"
      :height="tableHeight">
      <template slot="bookingApar" slot-scope="scope">
        <div>{{scope.row.name}}</div>
        <div>{{scope.row.mobile}}</div>
      </template>
      <template slot="bookingPosition" slot-scope="scope">
        <div>
          {{scope.row.city}}-{{scope.row.region}}-{{scope.row.zone}}
        </div>
      </template>
      <template slot="bookingOrgan" slot-scope="scope">
        <div>{{scope.row.orgName}}</div>
        <div>{{scope.row.orgMobile}}</div>
      </template>
      <template slot='bookingHandle' slot-scope="scope">
         <el-button style="width:120px" v-if="scope.row.status===0" plain disabled type="info" size="mini" >已登记</el-button>
         <el-button style="width:120px" v-else-if="scope.row.status===2" plain disabled type="info" size="mini" >已忽略</el-button>
         <div class="group-box" v-else>
           <el-button style="width:70px" type="primary" @click="registerCustomers('addOrEditCustomers',scope.row)" size="mini" >登记客源</el-button>
           <el-button style="width:70px" type="primary" @click='closeBooking(scope.row.id)' size="mini" >忽略</el-button>
         </div>
      </template>
    </GridUnit>
    <AddOrEditCustomers  
      @searchAll='searchParam'
      ref="addOrEditCustomers"></AddOrEditCustomers>
  </div>
</template>

<script>
const pickerOptions = {
  shortcuts: [
    {
      text: '最近一周',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '最近一个月',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '最近三个月',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
        picker.$emit('pick', [start, end])
      }
    }
  ]
}

import { getTenantcloseApi } from '@/api/renting'
import AddOrEditCustomers from './addOrEditCustomers'
import GridUnit from '@/components/GridUnit/grid'
const FLYSUn = process.env.FLY_API + '/back'
export default {
  components: {
    GridUnit,
    AddOrEditCustomers
  },

  data() {
    return {
      rules: {},
      url: FLYSUn + '/tenant/tenantBookingList',
      tableHeight: 300,
      sourceList: [],
      colModels: [
        { prop: 'gmtCreate', label: '申请时间' },
        { prop: '', label: '意向租客', slotName: 'bookingApar', align: 'center' },
        {
          prop: 'housingType',
          label: '房源类型',
          type: 'status',
          unitFilters: {
            renderStatusType(status) {
              const statusMap = {
                1: 'success',
                2: 'danger'
              }
              return statusMap[status] || 'info'
            },
            renderStatusValue(status) {
              const statusMap = {
                1: '集中式',
                2: '分散式'
              }
              return statusMap[status]
            }
          }
        },
        { prop: 'position', label: '意向房间', width: '200' },
        { prop: 'remark', label: '备注' },
        { label: '房源位置', slotName: 'bookingPosition', width: '200' },
        { prop: '', label: '房东/手机号', slotName: 'bookingOrgan' },
        { prop: 'bookingTime', label: '预约时间' },
        { prop: 'status', label: '操作', width: '200', align: 'center', slotName: 'bookingHandle', fixed: 'right' }
      ],
      method: 'POST',
      bookingSearchForm: {
        keyword: '',
        start: '',
        end: '',
        housingType: '',
        status: ''
      },
      houseTypeList: [
        { label: '集中式', value: '1' },
        { label: '分散式', value: '2' }
      ],
      status: [
        { label: '已登记', value: '0' },
        { label: '待登记', value: '1' },
        { label: '忽略', value: '2' }
      ],
      pickerOptions: pickerOptions,
      dateTime: []
    }
  },
  watch: {
    dateTime(value) {
      this.bookingSearchForm.start = value.length > 0 ? `${value[0]} 00:00:00` : ''
      this.bookingSearchForm.end = value.length > 0 ? `${value[1]} 23:59:59` : ''
      this.searchParam()
    }
  },
  mounted() {
    /* 表格高度控制 */
    this.$nextTick(() => {
      const offsetTop = this.$refs.refGridUnit.$el.offsetTop || 140
      const pagenationH = 55
      const containerPadding = 160
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

    exportExcel() {
      const href = `${FLYSUn}/tenant/exportExcel?keyword=${this.bookingSearchForm.keyword}&
      start=${this.bookingSearchForm.start}
      &end=${this.bookingSearchForm.end}
      &housingType=${this.bookingSearchForm.housingType}
      &status=${this.bookingSearchForm.status}`
      const elink = document.createElement('a')
      elink.style.display = 'none'
      elink.href = encodeURI(href)
      document.body.appendChild(elink)
      elink.click()
    },
    registerCustomers(ref, row) {
      const param = {
        editID: false,
        bookingID: row.id,
        disabled: false,
        bookMessage: row
      }
      this.$refs[ref].showDialog(param)
    },
    closeBooking(id) {
      getTenantcloseApi({ id: id }).then(res => {
        this.$message({
          message: '已忽略',
          type: 'success'
        })
        this.searchParam()
      })
    },
    searchParam() {
      this.$nextTick(() => {
        this.$refs.refGridUnit.searchHandler()
      })
    },
    clearForm(formName) {
      this.dateTime = []
      this.$refs[formName].resetFields()
    },
    changeDate(value) {
      // this.bookingSearchForm.start = value ? `${value[0]} 00:00:00` : ''
      // this.bookingSearchForm.end = value ? `${value[1]} 23:59:59` : ''
      // this.searchParam()
    }
  }
}
</script>

<style scoped>
</style>

