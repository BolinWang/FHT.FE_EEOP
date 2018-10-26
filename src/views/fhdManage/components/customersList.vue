<template>
  <div class="components-container">
    <div class="model-search clearfix">
      <el-form :model="customersSearchForm" ref="customersSearchForm" size="small" :inline="true">
        <el-form-item>
          <el-date-picker
            v-model="dateCreatTime"
            type="daterange"
            size="small"
            style="width: 260px;"
            align="right"
            key="dateTime"
            unlink-panels
            range-separator="-"
            start-placeholder="创建开始日期"
            end-placeholder="创建结束日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            @change="changeCreatDate">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select size="small" @change="chooseCity" style="width:94px;" v-model="customersSearchForm.cityId" placeholder="城市" class="item-select" clearable>
            <el-option v-for="item in treeAllList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select size="small" style="width:94px;" v-model="customersSearchForm.regionId" placeholder="区域" class="item-select" clearable>
            <el-option v-for="item in treeAllList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select size="small" style="width:95px;" v-model="customersSearchForm.zoneId" placeholder="板块" class="item-select" clearable>
            <el-option v-for="item in treeAllList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select size="small" style="width:116px;" v-model="customersSearchForm.type" placeholder="创建来源" class="item-select" clearable>
            <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select size="small" style="width:120px;" v-model="customersSearchForm.sourceType" placeholder="客源渠道" class="item-select" clearable>
            <el-option v-for="item in sourceTypeList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="el-icon-search" @click.native="searchParam" class="filter-item">查询</el-button>
        </el-form-item>
        <el-form-item class="fl-right">
          <el-button  size="small" type="primary" class="filter-item" @click.native="clearForm('customersSearchForm')">登记客源</el-button>
        </el-form-item>
        <div>
          <el-form-item>
            <el-date-picker
              v-model="dateCurrentTime"
              type="daterange"
              size="small"
              style="width: 260px;"
              align="right"
              key="dateTime"
              unlink-panels
              range-separator="-"
              start-placeholder="接单开始日期"
              end-placeholder="接单结束日期"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
              @change="changeCurrentDate">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-select size="small" style="width:110px;" v-model="customersSearchForm.currentType" placeholder="客源类型" class="item-select" clearable>
              <el-option v-for="item in currentTypeList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select size="small" style="width:110px;" v-model="customersSearchForm.status" placeholder="客源状态" class="item-select" clearable>
              <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
           <el-form-item>
            <el-input v-model="customersSearchForm.customerKeyword" size="small" placeholder="租客／租客手机号码" style="width:152px" />
          </el-form-item>
          <el-form-item>
           <el-input v-model="customersSearchForm.currentKeyword" size="small" placeholder="接单人姓名／手机号码" style="width:162px" />
          </el-form-item>
          <el-form-item>
            <el-button plain size="small" icon="el-icon-remove-outline" class="filter-item" @click.native="clearForm('customersSearchForm')">清空</el-button>
          </el-form-item>
          <el-form-item  class="fl-right">
            <el-button  size="small" type="primary" class="filter-item" @click.native="clearForm('customersSearchForm')">导出</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <AddOrEditCustomers ref="addOrEditCustomers"></AddOrEditCustomers>
  </div>
</template>
<script>
import AddOrEditCustomers from './addOrEditCustomers'
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
  components: {
    AddOrEditCustomers
  },
  data() {
    return {
      dateTime: [],
      dateCreatTime: [],
      dateCurrentTime: [],
      pickerOptions: pickerOptions,
      sourceTypeList: [], // 客源渠道列表
      treeAllList: [],
      typeList: [
        { label: '全部', value: '' },
        { label: '自建客', value: 1 },
        { label: '总部', value: 2 }
      ],
      currentTypeList: [
        { label: '全部', value: '' },
        { label: '私有', value: 1 },
        { label: '公开', value: 2 }
      ],
      statusList: [ // 客源状态
        { label: '全部', value: '' },
        { label: '未签约', value: 1 },
        { label: '已签约', value: 1 },
        { label: '关闭', value: 3 },
        { label: '待接单', value: 4 }
      ],
      customersSearchForm: {
        cityId: '',
        createStart: '',
        createEnd: '',
        currentStart: '',
        currentEnd: '',
        regionId: '',
        zoneId: '',
        type: '',
        status: 4,
        sourceType: '',
        currentType: '',
        currentKeyword: '',
        customerKeyword: ''
      }
    }
  },
  created() {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
    this.dateCreatTime = [start, end]
  },
  methods: {
    gettreeAllList() {

    },
    clearForm() {

    },
    searchParam() {

    },
    chooseCity() {

    },
    changeCreatDate(value) { // 创建开始时间
      this.customersSearchForm.createStart = value ? `${value[0]} 00:00:00` : ''
      this.customersSearchForm.createEnd = value ? `${value[1]} 00:00:00` : ''
    },
    changeCurrentDate(value) { // 接单开始时间
      this.customersSearchForm.currentStart = value ? `${value[0]} 00:00:00` : ''
      this.customersSearchForm.currentEnd = value ? `${value[1]} 00:00:00` : ''
    }
  }
}
</script>
<style lang="scss" scoped>
  .fl-right{
    float: right;
  }
</style>
