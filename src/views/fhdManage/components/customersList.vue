<template>
  <div class="components-container">
    <div class="model-search clearfix">
      <el-form :rules="rulesCustmers" :model="customersSearchForm" ref="customersSearchForm" size="small" :inline="true">
        <el-form-item>
          <el-date-picker
            v-model="dateCreatTime"
            type="daterange"
            size="small"
            style="width: 290px;"
            align="right"
            key="dateTime"
            unlink-panels
            range-separator="-"
            start-placeholder="创建开始日期"
            end-placeholder="创建结束日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-cascader
            style="width:290px;"
            :options="treeAllList"
            :props='props'
            change-on-select
            placeholder="请选择省市板块"
            v-model="chooseZone"
            @change="handleChangeZone">
          </el-cascader>
        </el-form-item>
        <el-form-item prop="type">
          <el-select @change="searchParam" size="small" style="width:106px;" v-model="customersSearchForm.type" placeholder="创建来源" class="item-select" clearable>
            <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-cascader
            style="width:134px;"
            :options="sourceList"
            :props='propsSource'
            change-on-select
            placeholder="客源渠道"
            v-model="sourceChooseType"
            @change="handleChangeZone">
          </el-cascader>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" size="small" icon="el-icon-search" @click.native="searchParam" class="filter-item">查询</el-button>
        </el-form-item>
        <el-form-item class="fl-right">
          <el-button  size="small" type="primary" class="filter-item" @click.native="addCustomers('addOrEditCustomers')">登记客源</el-button>
        </el-form-item>
        <div>
          <el-form-item>
            <el-date-picker
              v-model="dateCurrentTime"
              type="daterange"
              size="small"
              style="width: 290px;"
              align="right"
              key="dateTime"
              unlink-panels
              range-separator="-"
              start-placeholder="接单开始日期"
              end-placeholder="接单结束日期"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="currentType">
            <el-select @change="searchParam" size="small" style="width:100px;" v-model="customersSearchForm.currentType" placeholder="客源类型" class="item-select" clearable>
              <el-option v-for="item in currentTypeList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="status">
            <el-select @change="searchParam" size="small" style="width:100px;" v-model="customersSearchForm.status" placeholder="客源状态" class="item-select" clearable>
              <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
           <el-form-item prop="customerKeyword">
            <el-input @keydown.native.enter="searchParam"  v-model="customersSearchForm.customerKeyword" size="small" placeholder="租客／租客手机号码" style="width:152px" />
          </el-form-item>
          <el-form-item prop="currentKeyword">
           <el-input @keydown.native.enter="searchParam"  v-model="customersSearchForm.currentKeyword" size="small" placeholder="接单人姓名／手机号码" style="width:162px" />
          </el-form-item>
          <el-form-item>
            <el-button plain size="small" icon="el-icon-remove-outline" class="filter-item" @click.native="clearForm('customersSearchForm')">清空</el-button>
          </el-form-item>
          <el-form-item  class="fl-right">
            <el-button  size="small" type="primary" class="filter-item" @click.native="exportExcel">导出</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <GridUnit
      ref="refGridUnit"
      :columns="colModels"
      :url="url"
      listField="data.result"
      totalField='data.total'
      :formOptions="customersSearchForm"
      :dataMethod="method"
      :height="tableHeight"
    >
    <template slot="customersType" slot-scope="scope">
      <span class="text" :class="{colorType:scope.row.type===2}">
        {{scope.row.type | filterType }}
      </span>
    </template>
    <template slot="customersSource" slot-scope="scope">
      <span class="text">
        {{scope.row.sourceName}}-{{scope.row.sourceTypeName}}
      </span>
    </template>
    <template slot="intentlist" slot-scope="scope">
      <div>
        <div v-if="scope.row.list.length>0" class="boxTag" :key="index" v-for="(item,index ) in scope.row.list">
          <el-tag >{{item}}</el-tag>
        </div>
        <div class="komng" v-show="scope.row.list.length===0">-</div>
      </div>
    </template>
    <template slot="currentStatus" slot-scope="scope">
      <div class="statusBox">
        <el-button @click="changeStatus(scope.row.id)" v-if="scope.row.currentType === 2 && !scope.row.currentTime&&!scope.row.currentName" type="danger" plain size="mini">待接单</el-button>
        <el-button @click="changeStatus(scope.row.id)" v-else :disabled="scope.row.status===2||scope.row.status===3" type="info" plain size="mini">{{scope.row.status | filterstatus}}</el-button>
      </div>
    </template>
    <template slot="currentType" slot-scope="scope">
      <span class="text">
        {{scope.row.currentType | filterCurrentType }}
      </span>
    </template>
    <template slot="customersHandle" slot-scope="scope">
      <el-button @click="lookCustomers(scope.row.id)" style="width:80px"  type="primary" size="mini" >查看</el-button>
      <el-button @click="lookFollowList(scope.row.id)" style="width:80px"  type="primary" size="mini" >跟进记录</el-button>
    </template>
    </GridUnit>
    <AddOrEditCustomers @searchAll='searchParam'  ref="addOrEditCustomers"></AddOrEditCustomers>
    <!-- 修改客源状态 -关闭 -->
    <StatusChange
      @getSearch="searchParam"
      ref="statusChange"></StatusChange>
     <!-- 跟进记录 -->
    <FollowUpCusTomers 
      ref="followUpCusTomers"></FollowUpCusTomers>
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
import GridUnit from '@/components/GridUnit/grid'
import StatusChange from './statusChange'
import FollowUpCusTomers from './followUpCustomers'
import { getCheckZoneApi, getSourceListApi } from '@/api/renting'
const FLYSUn = process.env.FLY_API + '/back'
export default {
  components: {
    AddOrEditCustomers,
    GridUnit,
    StatusChange,
    FollowUpCusTomers
  },
  watch: {
    chooseZone(val) {
      this.customersSearchForm.cityId = val[0] || ''
      this.customersSearchForm.regionId = val[1] || ''
      this.customersSearchForm.zoneId = val[2] || ''
      this.searchParam()
    },
    sourceChooseType(val) {
      this.customersSearchForm.source = val[0] || ''
      this.customersSearchForm.sourceType = val[1] || ''
      this.searchParam()
    }
  },
  filters: {
    filterType(val) {
      const typeMap = {
        '1': '自建客',
        '2': '总部'
      }
      return typeMap[val]
    },
    filterCurrentType(val) {
      const currentTypeMAP = {
        '1': '私有',
        '2': '公开'
      }
      return currentTypeMAP[val]
    },
    filterstatus(val) {
      const statusMap = {
        '1': '未签约',
        '2': '已签约',
        '3': '关闭',
        '4': '待接单'
      }
      return statusMap[val]
    }

  },
  data() {
    return {
      sourceChooseType: [],
      rulesCustmers: {},
      tableHeight: 300,
      method: 'POST',
      dateTime: [],
      sourceList: [],
      dateCreatTime: [],
      dateCurrentTime: [],
      pickerOptions: pickerOptions,
      sourceTypeList: [], // 客源渠道列表
      treeAllList: [],
      chooseZone: [],
      typeList: [
        { label: '全部', value: '' },
        { label: '自建客', value: 1 },
        { label: '总部', value: 2 }
      ],
      props: {
        value: 'id',
        label: 'name',
        children: 'childrens'
      },
      propsSource: {
        value: 'id',
        label: 'name',
        children: 'sourceTypes'
      },
      currentTypeList: [
        { label: '全部', value: '' },
        { label: '私有', value: '1' },
        { label: '公开', value: '2' }
      ],
      statusList: [ // 客源状态
        { label: '全部', value: '' },
        { label: '未签约', value: '1' },
        { label: '已签约', value: '2' },
        { label: '关闭', value: '3' },
        { label: '待接单', value: '4' }
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
        status: '4',
        sourceType: '',
        source: '',
        currentType: '',
        currentKeyword: '',
        customerKeyword: ''
      },
      url: FLYSUn + '/customerCenter/customerList',
      colModels: [
        { prop: 'id', label: '客源单号', width: '80' },
        { prop: '', label: '创建来源', align: 'center', slotName: 'customersType' },
        { prop: 'createName', label: '创建人' },
        { prop: 'createTime', label: '创建时间', width: '150' },
        { prop: 'name', label: '租客姓名' },
        { prop: '', label: '客源渠道', align: 'center', slotName: 'customersSource' },
        { prop: 'rentFeeName', label: '月租金范围' },
        { prop: 'list',
          label: '意向板块',
          align: 'center',
          width: '200',
          slotName: 'intentlist'
        },
        { prop: 'remark', label: '备注' },
        { prop: '', label: '类型', align: 'center', slotName: 'currentType' },
        { prop: 'status',
          label: '状态',
          slotName: 'currentStatus'
        },
        { prop: 'currentName', label: '接单人' },
        { prop: 'currentTime', label: '接单时间' },
        { prop: '', label: '操作', width: '200', align: 'center', slotName: 'customersHandle', fixed: 'right' }
      ]
    }
  },
  created() {
    let start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
    const nowY = start.getFullYear()
    const nowM = start.getMonth() + 1
    const nowD = start.getDate()
    start = `${nowY}-${(nowM < 10 ? '0' + nowM : nowM)}-${(nowD < 10 ? '0' + nowD : nowD)} 00:00:00`
    const myDate = new Date()
    const lastY = myDate.getFullYear()
    const lastM = myDate.getMonth() + 1
    const lastD = myDate.getDate()
    const end = `${lastY}-${(lastM < 10 ? '0' + lastM : lastM)}-${(lastD < 10 ? '0' + lastD : lastD)} 23:59:59`
    this.dateCreatTime = [start, end]
    this.customersSearchForm.createStart = start
    this.customersSearchForm.createEnd = end
    this.gettreeAllList()
  },
  mounted() {
    /* 表格高度控制 */
    this.$nextTick(() => {
      const offsetTop = this.$refs.refGridUnit.$el.offsetTop || 140
      const pagenationH = 55
      const containerPadding = 164
      let temp_height = document.body.clientHeight - offsetTop - pagenationH - containerPadding
      this.tableHeight = temp_height > 300 ? temp_height : 300
      window.onresize = () => {
        return (() => {
          temp_height = document.body.clientHeight - offsetTop - pagenationH - containerPadding
          this.tableHeight = this.tableHeight = temp_height > 300 ? temp_height : 300
        })()
      }
    })
    this.getSourceList()
  },
  methods: {
    getSourceList() { // 获取客源渠道列表
      getSourceListApi().then(res => {
        this.sourceList = res.data.sourceList
      })
    },
    handleChangeZone(val) {
      this.customersSearchForm.cityId = val[0] || ''
      this.customersSearchForm.regionId = val[1] || ''
      this.customersSearchForm.zoneId = val[2] || ''
      this.searchParam()
    },
    exportExcel() {
      const href = `${FLYSUn}/customerCenter/exportExcel?
        cityId=${this.customersSearchForm.cityId}
        &createStart=${this.customersSearchForm.createStart}
        &createEnd=${this.customersSearchForm.createEnd}
        &currentStart=${this.customersSearchForm.currentStart}
        &currentEnd=${this.customersSearchForm.currentEnd}
        &regionId=${this.customersSearchForm.regionId}
        &zoneId=${this.customersSearchForm.zoneId}
        &type=${this.customersSearchForm.type}
        &status=${this.customersSearchForm.status}
        &source=${this.customersSearchForm.source}
        &sourceType=${this.customersSearchForm.sourceType}
        &currentType=${this.customersSearchForm.currentType}
        &currentKeyword=${this.customersSearchForm.currentKeyword}
        &customerKeyword=${this.customersSearchForm.customerKeyword}`
      const elink = document.createElement('a')
      elink.style.display = 'none'
      elink.href = encodeURI(href)
      document.body.appendChild(elink)
      elink.click()
    },
    lookCustomers(id) {
      this.$refs.addOrEditCustomers.showDialog(id, false)
    },
    lookFollowList(id) {
      this.$refs.followUpCusTomers.showFollowList(id)
    },
    changeStatus(id) {
      this.$refs.statusChange.showDialog(id)
    },
    addCustomers(ref) { // 登记客源
      this.$refs[ref].showDialog()
    },

    gettreeAllList() {
      getCheckZoneApi().then(res => {
        this.treeAllList = res.data
      })
    },
    clearForm(formName) {
      this.dateCreatTime = []
      this.chooseZone = []
      this.dateCurrentTime = []
      this.sourceChooseType = []
      this.$refs[formName].resetFields()
    },
    searchParam() {
      this.$nextTick(() => {
        this.$refs.refGridUnit.searchHandler()
      })
    },
    changeCreatDate(value) { // 创建开始时间
      this.customersSearchForm.createStart = value.length > 0 ? `${value[0]} 00:00:00` : ''
      this.customersSearchForm.createEnd = value.length > 0 ? `${value[1]} 23:59:59` : ''
      this.searchParam()
    },
    changeCurrentDate(value) { // 接单开始时间
      this.customersSearchForm.currentStart = value.length > 0 ? `${value[0]} 00:00:00` : ''
      this.customersSearchForm.currentEnd = value.length > 0 ? `${value[1]} 23:59:59` : ''
      this.searchParam()
    }
  }
}
</script>
<style lang="scss" scoped>
.boxTag{
  padding-bottom:4px;
}
.colorType{
  color: #5BACFB;
}
  .fl-right{
    float: right;
  }
</style>
