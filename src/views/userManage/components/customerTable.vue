<template>
  <div class="clearfix">
    <div class="model-search clearfix">
      <el-form size="small" :inline="true" :model="formData">
        <el-select size="small" v-if="customerType == 1" v-model="formData.realNameType" placeholder="实名认证" class="item-select" style="width: 120px;" clearable filterable @change="searchParam">
          <el-option v-for="(item,index) in attestation" :key="index" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select size="small" v-if="customerType == 1" v-model="formData.liveType" placeholder="入住情况" class="item-select filter-item" style="width: 120px;" @change="searchParam" clearable filterable>
          <el-option v-for="(item,index) in checkIn" :key="index" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select size="small" v-if="customerType == 2" v-model="formData.type" placeholder="全部组织" @change="searchParam" class="item-select" style="width: 180px;" clearable filterable>
          <el-option v-for="(item,index) in organization" :key="index" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-input size="small" v-model.trim="formData.keyWord" placeholder="姓名/手机号码/证件号" class="filter-item" style="width:180px;" @keydown.native.enter="searchParam">
        </el-input>
        <el-button type="primary" size="small" icon="el-icon-search" @click.native="searchParam" v-waves class="filter-item">查询</el-button>
        <el-button plain size="small" icon="el-icon-remove-outline" @click.native="clearForm">清空</el-button>
      </el-form>
    </div>
    <div class="model-table" :style="tableStyle">
      <el-table :data="tableData" v-loading.body="listLoading" :max-height="tableHeight" size="small" fit stripe highlight-current-row>
        <el-table-column type="index" width="60" align="center">
        </el-table-column>
        <el-table-column v-for="(item,index) in colModels" :label="item.label" :width="item.width" :key="index" fit show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tag v-if="item.filterType == 'authentication'" :type="(scope.row[item.prop] == '2' ? 'success' : 'info')">
              {{(scope.row[item.prop]) | filterStr(item.filterType)}}
            </el-tag>
            <span v-else-if="item.filterType">
              {{(scope.row[item.prop]) | filterStr(item.filterType)}}
            </span>
            <el-tooltip v-else-if="item.prop == 'mobile' || item.prop == 'cardNo'" class="item" effect="dark" :content="scope.row[item.prop]" placement="top-start">
              <span>{{scope.row[item.prop] | xing}}</span>
            </el-tooltip>
            <span v-else>
              {{scope.row[item.prop]}}
            </span>
          </template>
        </el-table-column>
        <el-table-column type="selection" width="40">
          1111111111
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="230" v-if="customerType == 1">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-tickets" size="small" @click.native="showRecord(scope.row)">租房记录</el-button>
            <el-button type="primary" icon="el-icon-tickets" size="small" plain @click.native="showDevice(scope.row)">智能设备</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="model-pagination">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageItems.pageNo" :page-sizes="pageSizeList" :page-size="pageItems.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- 租房记录 -->
    <el-dialog title="租房记录" width="1000px" :visible.sync="rentRecord">
      <GridUnit
        v-if="rentRecord"
        ref="refGridUnit"
        :columns="overlayCol"
        :formOptions="rentParams"
        :listField="'data.list'"
        :showPagination="false"
        :url="'/market/customer/'"
        :dataMethod="'queryRentRecord'">
      </GridUnit>
    </el-dialog>
    <!-- 智能设备 -->
    <el-dialog title="智能设备" width="1100px" :visible.sync="deviceInfo">
      <GridUnit
        v-if="deviceInfo"
        ref="deviceTable"
        :columns="deviceCol"
        :formOptions="deviceParams"
        :listField="'data.list'"
        :showPagination="false"
        :url="'/market/customer/'"
        :dataMethod="'deviceList'">
        <template slot="deviceStatus" slot-scope="scope">
          <el-tag v-if="scope.row.deviceType === '电表'" :type="scope.row.deviceCurrentStatus === 1 ? 'success' : 'info'">
              {{scope.row.deviceCurrentStatus === 0 ? '等待安装' : (scope.row.deviceCurrentStatus === 1 ? '启用' : '停用')}}
          </el-tag>
          <span v-else>/</span>
        </template>
        <template slot="deviceCurrentStatus" slot-scope="scope">
          <el-tag v-if="scope.row.deviceType === '电表'" :type="scope.row.deviceCurrentStatus === 1 ? 'success' : 'info'">
              {{scope.row.deviceCurrentStatus === 1 ? '通电' : '断电'}}
          </el-tag>
          <el-tag v-else :type="scope.row.deviceCurrentStatus === 1 ? 'success' : 'info'">
              {{scope.row.deviceCurrentStatus === 1 ? '启用' : '停用'}}
          </el-tag>
        </template>
        <template slot="manageLimit" slot-scope="scope">
          <span v-if="scope.row.deviceType !== '门锁'">/</span>
          <el-tag v-else :type="scope.row.landlordStatus === 1 ? 'success' : 'info'">
              {{scope.row.landlordStatus === 1 ? '启用' : '停用'}}
          </el-tag>
        </template>
        <template slot="rentLimit" slot-scope="scope">
          <span v-if="scope.row.deviceType !== '门锁'">/</span>
          <el-tag v-else :type="scope.row.lodgerStatus === 1 ? 'success' : 'info'">
              {{scope.row.lodgerStatus === 1 ? '启用' : '停用'}}
          </el-tag>
        </template>
        <template slot="checkPassword" slot-scope="scope">
          <el-button type="text" v-if="scope.row.devicePwdStatus == 1 && devicePWDList[scope.$index] === undefined" @click="getDevivePWD(scope.row, scope.$index)">查看</el-button>
          <span v-else-if="devicePWDList[scope.$index]">{{devicePWDList[scope.$index]}}</span>
          <span v-else></span>
        </template>
      </GridUnit>
    </el-dialog>
  </div>
</template>
<script>
import waves from '@/directive/waves'
import GridUnit from '@/components/GridUnit/grid'
import { customerListApi, businessUserListApi, devicePasswordApi } from '@/api/userManage'
import { ObjectMap, deepClone, plusXing } from '@/utils'

export default {
  name: 'queryCenterComp',
  props: {
    customerType: {
      type: Number,
      default: 1
    }
  },
  components: {
    GridUnit
  },
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '1': 'info',
        '2': 'success'
      }
      return statusMap[status] || 'info'
    },
    filterStr(status, key) {
      const statusStrData = {
        'gender': ['', '男', '女'],
        'cardType': ['', '身份证', '护照', '港澳通行证', '台湾通行证'],
        'authentication': ['未认证', '未认证', '已认证'],
        'authenticationSource': ['', '系统', '人工', '系统'],
        'registerSource': ['', 'PC', 'APP'],
        'status': ['未入住', '在住', '申请换房', '申请退房', '已搬离'],
        'isContracter': ['否', '是', '否'],
        'housingType': ['', '集中式', '分散式'],
        'deviceStatus': ['等待安装', '正常', '停用'],
        'deviceLimit': ['可用', '不可用']
      }
      if (!statusStrData[key]) {
        return ''
      }
      return statusStrData[key][status] ||
        (key === 'authenticationSource' ? '其他' : '')
    },
    xing(val) {
      const value = (val && val.length >= 7) ? plusXing(val, 3, 4) : val
      return value
    }
  },
  data() {
    return {
      attestation: [
        { value: 0, label: '未提交资料' },
        { value: 1, label: '审核中' },
        { value: 2, label: '认证通过' },
        { value: 3, label: '审核不通过' }
      ],
      checkIn: [
        { value: 1, label: '目前在住' },
        { value: 2, label: '尚未入住' }
      ],
      organization: [
        { value: 1, label: '系统' },
        { value: 2, label: '公司企业' },
        { value: 3, label: '个人组织' }
      ],
      formData: {
        type: '',
        realNameType: '',
        liveType: '',
        keyWord: ''
      },
      overlayCol: [
        { prop: 'subdistrictAddress', label: '位置' },
        { prop: 'subdistrictName', label: '小区/公寓' },
        {
          prop: 'status',
          label: '入住状态',
          filterType: 'status',
          width: 80,
          type: 'status',
          unitFilters: {
            renderStatusType(status) {
              return status * 1 === 1 ? 'success' : 'info'
            },
            renderStatusValue(status) {
              const statusStrData = ['未入住', '在住', '申请换房', '申请退房', '已搬离']
              return statusStrData[status] || '待上线'
            }
          }
        },
        {
          prop: 'isContracter',
          label: '签约人',
          filterType: 'isContracter',
          width: 80,
          type: 'status',
          unitFilters: {
            renderStatusType(status) {
              return status * 1 === 1 ? 'success' : 'info'
            },
            renderStatusValue(status) {
              const statusStrData = ['否', '是']
              return statusStrData[status] || '待上线'
            }
          }
        },
        { prop: 'startDate', label: '入住时间' },
        { prop: 'endDate', label: '离开时间' },
        { prop: 'rentTypeName', label: '租赁方式' },
        {
          prop: 'housingType',
          label: '房源类型',
          filterType: 'housingType',
          width: 80,
          render(row) {
            return row.housingType * 1 === 1 ? '集中式' : '分散式'
          }
        },
        { prop: 'orgName', label: '归属组织' }
      ],
      deviceCol: [
        { prop: 'fangyuanName', label: '房源信息' },
        { prop: 'roomCode', label: '房源编码' },
        { prop: 'deviceType', label: '设备类型' },
        { prop: 'productBrandName', label: '设备品牌' },
        { prop: 'productType', label: '设备型号' },
        {
          prop: 'deviceStatus',
          label: '管理状态',
          align: 'center',
          slotName: 'deviceStatus'
        },
        {
          prop: 'deviceCurrentStatus',
          label: '设备状态',
          slotName: 'deviceCurrentStatus',
          align: 'center'
        },
        {
          prop: 'landlordStatus',
          label: '管家权限',
          slotName: 'manageLimit',
          align: 'center'
        },
        {
          prop: 'lodgerStatus',
          label: '租客权限',
          slotName: 'rentLimit',
          align: 'center'
        },
        {
          prop: 'devicePwdStatus',
          label: '查看离线密码',
          slotName: 'checkPassword',
          align: 'center'
        }
      ],
      rentRecord: false,
      deviceInfo: false,
      tableHeight: 300,
      tableData: [],
      customerTypeClone: this.customerType,
      searchParams: {},
      rentParams: {},
      deviceParams: {},
      detailData: {},
      total: null,
      pageItems: {
        pageNo: 1,
        pageSize: 20
      },
      pageSizeList: [10, 20, 30, 50],
      listLoading: false,
      devicePWDList: {}
    }
  },
  created() {
    if (this.customerType * 1 === 1) {
      this.colModels = [
        { prop: 'customerId', label: 'ID' },
        { prop: 'customerName', label: '用户名' },
        { prop: 'mobile', label: '手机号码', width: 120 },
        { prop: 'realName', label: '真实姓名', width: 120 },
        { prop: 'gender', label: '性别', width: 80, filterType: 'gender' },
        { prop: 'cardType', label: '证件类型', width: 100, filterType: 'cardType' },
        { prop: 'cardNo', label: '证件号码', width: 180 },
        { prop: 'authentication', label: '实名状态', width: 100, filterType: 'authentication' },
        { prop: 'authenticationSource', label: '实名类型', width: 80, filterType: 'authenticationSource' },
        { prop: 'registerSource', label: '注册端', width: 80, filterType: 'registerSource' }
      ]
    } else {
      this.colModels = [
        { prop: 'mobile', label: '手机号码' },
        { prop: 'name', label: '姓名' },
        { prop: 'gender', label: '性别', filterType: 'gender' },
        { prop: 'cardType', label: '证件类型', width: 120, filterType: 'cardType' },
        { prop: 'cardNo', label: '证件号码', width: 180 },
        { prop: 'authentication', label: '实名状态', width: 120, filterType: 'authentication' },
        { prop: 'gmtCreateName', label: '归属组织', width: 180 }
      ]
    }
    this.getGridData(this.pageItems)
  },
  mounted() {
    /* 表格高度控制 */
    this.$nextTick(() => {
      let temp_height = document.body.clientHeight - 250
      this.tableHeight = temp_height > 300 ? temp_height : 300
      window.onresize = () => {
        return (() => {
          temp_height = document.body.clientHeight - 250
          this.tableHeight = this.tableHeight = temp_height > 300 ? temp_height : 300
        })()
      }
    })
  },
  computed: {
    tableStyle: function() {
      return {
        width: '100%',
        height: this.tableHeight + 'px'
      }
    }
  },
  watch: {
    deviceInfo(val) {
      if (!val) {
        this.devicePWDList = {}
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageItems.pageSize = val
      this.getGridData(this.pageItems)
    },
    handleCurrentChange(val) {
      this.pageItems.pageNo = val
      this.getGridData(this.pageItems)
    },
    searchParam() {
      const params = deepClone(this.formData)
      this.pageItems = {
        pageNo: 1,
        pageSize: 20
      }
      this.getGridData(Object.assign(this.pageItems, params))
    },
    clearForm() {
      this.formData = {
        type: '',
        realNameType: '',
        liveType: '',
        keyWord: ''
      }
      this.pageItems = {
        pageNo: 1,
        pageSize: 20
      }
      this.searchParam()
    },
    /* 租房记录 */
    showRecord(row) {
      this.rentRecord = true
      this.rentParams = {
        pageNo: 1,
        pageSize: 9999,
        customerId: row.customerId
      }
    },
    /* 智能设备 */
    showDevice(row) {
      this.deviceInfo = true
      this.deviceParams = {
        customerId: row.customerId
      }
    },
    showDetail(row) {
      this.lookDetail = true
      this.detailData = row
    },
    /* 列表渲染 */
    getGridData(params) {
      this.listLoading = true
      this.searchParams = deepClone(params)
      const dataApi = this.customerType * 1 === 1 ? customerListApi : businessUserListApi
      dataApi(ObjectMap(this.searchParams)).then(response => {
        this.tableData = response.data.list
        this.total = response.data.record
        this.listLoading = false
      })
    },
    /* 查看智能设备密码 */
    getDevivePWD(row, i) {
      devicePasswordApi({
        deviceId: row.deviceId
      }).then((res) => {
        this.$set(this.devicePWDList, i, res.data || '')
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
