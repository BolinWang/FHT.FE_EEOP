/*
 * @Author: ghost 
 * @Date: 2018-10-22 09:35:00 
 * @Last Modified by: ghost
 * @Last Modified time: 2018-10-22 14:18:26
 */
<template>
  <div class="compents-container">
    <div class="model-search clearfix">
      <el-form :model="bookingSearchForm" ref="bookingSearchForm" size="small" :inline="true">
        <el-form-item>
          <el-input v-model="bookingSearchForm.keyword" size="small" placeholder="租客／租客手机号码" style="width:155px" />
        </el-form-item> 
        <el-form-item>
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
        <el-form-item>
          <el-select v-model="bookingSearchForm.housingType" filterable clearable size="small" placeholder="房源类型" style="width:120px">
              <el-option v-for="(item,index) in houseTypeList" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="bookingSearchForm.status" filterable clearable size="small" placeholder="操作" style="width:120px">
              <el-option v-for="(item,index) in status" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" size="small" icon="el-icon-search" @click.native="searchParam" class="filter-item">查询</el-button>
        <el-button plain size="small" icon="el-icon-remove-outline" @click.native="clearForm('bookingSearchForm')">清空</el-button>
        <el-button type="primary" size="small" icon="el-icon-upload" @click.native="exportExcel">导出</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
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
  data() {
    return {
      bookingSearchForm: {
        keyword: '',
        start: '',
        end: '',
        housingType: '',
        status: ''
      },
      houseTypeList: [
        { label: '集中式', value: 1 },
        { label: '分散式', value: 2 }
      ],
      status: [
        { label: '已登记', value: 0 },
        { label: '待登记', value: 1 },
        { label: '忽略', value: 2 }
      ],
      pickerOptions: pickerOptions,
      dateTime: []
    }
  },
  methods: {
    searchParam() {

    },
    clearForm(formName) {
      this.$refs[formName].resetFields()
    },
    changeDate() {

    }
  }
}
</script>
<style scoped>

</style>

