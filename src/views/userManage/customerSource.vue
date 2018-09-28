/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-09-26 18:01:22
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-09-28 18:23:36
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
          size="small" v-model="formData.housingType" placeholder="预约类型"
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
          size="small"
          @click="addAndEdit(2, scope.row)">
          编辑
        </el-button>
        <el-button
          type="success"
          size="small"
          @click="sendMessage(scope.row)">
          发送短信
        </el-button>
        <el-button
          type="danger"
          size="small"
          @click="handleDelete(scope.row)">
          删除
        </el-button>
      </template>
    </GridUnit>
    <div class="dialog-info">
      <el-dialog
        :title="infoTitle"
        :visible.sync="layer_showInfo"
        @close="closeInfo('detailFrom')"
        :before-close="handleClose"
        width="800px">
        <div class="container">
          <el-form
            ref="detailFrom"
            label-width="80px"
            size="small"
            :rules="rules"
            :model="detailData">
            <el-form-item label="客户姓名" prop="tenantName">
              <el-input class="input_auto" v-model="detailData.tenantName"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="tenantMobile">
              <el-input class="input_auto" v-model="detailData.tenantMobile"></el-input>
            </el-form-item>
            <el-form-item label="看房时间" prop="bookingTime">
              <el-date-picker
                class="input_auto"
                type="datetime"
                key="bookingTime"
                placeholder="请选择看房时间"
                v-model="detailData.bookingTime"
                value-format="yyyy-MM-dd HH:mm"
                format="yyyy-MM-dd HH:mm"></el-date-picker>
            </el-form-item>
            <el-form-item label="客户来源" prop="tenantSource">
              <el-select
                class="input_auto"
                v-model="detailData.tenantSource"
                placeholder="请选择客户来源"
                clearable
                filterable>
                <el-option v-for="item in sourceList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="bookingRemark">
              <el-input
                type="textarea"
                v-model="detailData.bookingRemark"
                placeholder="最多可输入70个字"
                :rows="3"></el-input>
              <span class="limitTips">{{detailData.bookingRemark ? detailData.bookingRemark.length : 0}}/70</span>
            </el-form-item>
            <el-form-item label="房源信息" required>
              <el-card class="card_wrapper">
                <div slot="header" class="clearfix">
                  <el-row :gutter="10">
                    <el-col :span="4">
                      <el-select
                        v-model="findRoomInfo.housingType"
                        placeholder="房源类型"
                        clearable>
                        <el-option v-for="item in housingTypeList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="7">
                      <area-select
                        ref="areaSelect"
                        v-model="findRoomInfo.regionId"
                        placeholder="地区">
                      </area-select>
                    </el-col>
                    <el-col :span="8">
                      <el-input v-model="findRoomInfo.keyWord" placeholder="房源编码/小区/位置"></el-input>
                    </el-col>
                    <el-col :span="5">
                      <el-input v-model="findRoomInfo.landlordInfo" placeholder="房东姓名/手机号"></el-input>
                    </el-col>
                  </el-row>
                </div>
                <div class="card_container">
                  <el-collapse v-model="activeName" accordion>
                    <el-collapse-item title="房源搜索结果（展示10条数据）" name="1">
                      <div class="roomsInfo_items" v-if="roomsInfoList.length > 0">
                        <ul>
                          <li
                            class="rooms_item"
                            v-for="item in roomsInfoList"
                            :key="item.roomCode"
                            @click="selectRoomInfo(item)">
                            <div class="roomName">{{item.estateName}}</div>
                            <div class="roomAddress">{{item.address}}</div>
                          </li>
                        </ul>
                      </div>
                      <div style="color:#999;" v-else>无数据, 请选择条件进行房源搜索</div>
                    </el-collapse-item>
                    <el-collapse-item title="您选择的房源信息展示" name="2">
                      <div class="roomInfo_container" v-if="JSON.stringify(selectedRoomInfo) !==`{}`">
                        <el-row :gutter="10">
                          <el-col :span="12">
                            <div class="roomInfo_details" v-if="selectedRoomInfo.roomCode">
                              <span class="detail_label">{{ selectedRoomInfo.housingType === 1 ? '公寓编号' : '房源编码' }}：</span>
                              <span class="detail_value">{{selectedRoomInfo.roomCode}}</span>
                            </div>
                          </el-col>
                          <el-col :span="12">
                            <div class="roomInfo_details" v-if="selectedRoomInfo.estateName">
                              <span class="detail_label">{{ selectedRoomInfo.housingType === 1 ? '公寓名称' : '小区名称' }}：</span>
                              <span class="detail_value">{{selectedRoomInfo.estateName}}</span>
                            </div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="10" v-if="selectedRoomInfo.address">
                          <el-col :span="24">
                            <div class="roomInfo_details">
                              <span class="detail_label">房源地址：</span>
                              <span class="detail_value">{{selectedRoomInfo.address}}</span>
                            </div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="10" v-if="landlordList">
                          <el-col :span="24">
                            <div class="roomInfo_details">
                              <span class="detail_label">选择房东：</span>
                              <el-select
                                  class="input_auto"
                                  v-model="selectedRoomInfo.landlordMobile"
                                  placeholder="输入姓名/手机号快速匹配"
                                  @change="selectLandlord"
                                  filterable>
                                  <el-option
                                    v-for="item in landlordList"
                                    :key="item.landlordMobile"
                                    :label="item.landlordName"
                                    :value="item.landlordMobile">
                                    <span style="float: left">{{ item.landlordName }}</span>
                                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.landlordMobile }}</span>
                                  </el-option>
                                </el-select>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                      <div style="color:#999;" v-else>无数据, 请在房源搜索结果中选择</div>
                    </el-collapse-item>
                  </el-collapse>
                </div>
              </el-card>
            </el-form-item>
            <el-form-item label="房东信息" class="radius_border">
              <el-row :gutter="0">
                <el-col :span="9" style="padding-left: 0">
                  <el-input placeholder="姓名" v-model="detailData.landlordName">
                    <template slot="prepend">姓名</template>
                    <template slot="append">手机号</template>
                  </el-input>
                </el-col>
                <el-col :span="7" style="padding-right: 0">
                  <el-input placeholder="手机号" v-model="detailData.landlordMobile" class="radius_borderLeft">
                  </el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="处理状态">
              <el-select
                class="input_auto"
                v-model="detailData.processStatus"
                placeholder="选择处理状态"
                @change="changeStatus">
                <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="处理结果" v-if="detailData.processStatus * 1 === 1">
              <el-select
                class="input_auto"
                v-model="detailData.processResult"
                placeholder="选择处理结果"
                clearable>
                <el-option v-for="item in resultList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="layer_showInfo = false" size="small">取消</el-button>
          <el-button type="primary" size="small" @click="saveInfoData">确定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="dialog-info">
      <el-dialog
        title="发送短信"
        :visible.sync="layer_showMessage"
        @close="closeInfo('msgForm')"
        width="600px">
        <div class="container">
          <el-form
            :model="sendMessageForm"
            :rules="msgRules"
            size="small"
            ref="msgForm"
            label-width="100px">
            <el-form-item label="发送类型" prop="sendType">
              <el-checkbox-group v-model="sendMessageForm.sendType">
                <el-checkbox label="房东" name="sendType" border></el-checkbox>
                <el-checkbox label="租客" name="sendType" border></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="房东手机号" prop="landlordMobile">
              <el-select
                v-model="sendMessageForm.landlordMobile"
                placeholder="输入姓名/手机号快速匹配"
                :disabled="!(sendMessageForm.sendType || []).includes('房东')"
                filterable
                clearable
                allow-create
                default-first-option
                style="width: 200px;">
                <el-option
                  v-for="item in landlordList"
                  :key="item.landlordMobile"
                  :label="item.landlordMobile"
                  :value="item.landlordMobile">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="租客手机号" prop="tenantMobile">
              <el-input
                v-model="sendMessageForm.tenantMobile"
                :disabled="!(sendMessageForm.sendType || []).includes('租客')"
                style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label="房东短信">
              <el-input
                type="textarea"
                :autosize="{ minRows: 3}"
                disabled
                :value="`【麦邻租房】您好，${sendMessageForm.tenantName}${sendMessageForm.tenantMobile}通过麦邻租房平台成功预约您发布的房源{房源名称}，看房时间为${sendMessageForm.bookingTime}请及时跟进，若有疑问可致电400-882-7099。`">
              </el-input>
            </el-form-item>
            <el-form-item label="租客短信">
              <el-input
                type="textarea"
                :autosize="{ minRows: 3}"
                disabled
                :value="`【麦邻租房】您好，您在${sendMessageForm.tenantSource}预约的信息已发送给房东${sendMessageForm.landlordMobile}，若有疑问可致电400-882-7099。`">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="layer_showMessage = false" size="small">取消</el-button>
          <el-button type="primary" size="small" @click="doSendMessage">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { parseTime, ObjectMap, deepClone } from '@/utils'
import { tenantReservationApi } from '@/api/userManage'
import { validateMobile } from '@/utils/validate'
import GridUnit from '@/components/GridUnit/grid'
import areaSelect from '@/components/AreaSelect'
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
    GridUnit,
    areaSelect
  },
  filters: {

  },
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!validateMobile(value)) {
        callback(new Error('请填写正确的手机号'))
      } else {
        callback()
      }
    }
    return {
      tableHeight: 300,
      tableData: [],
      downloadLoading: false, // 控制导出excel
      layer_showInfo: false, // 新增/编辑信息
      layer_showMessage: false, // 发送短信
      infoTitle: '新增客源',
      dateTime: '',
      pickerOptions,
      ...customerData, // 页面所需数据
      detailData: {}, // 预约信息
      findRoomInfo: {}, // 房源查询参数
      activeName: '1', // 房源信息手风琴展示
      selectedRoomInfo: {}, // 选择的房源信息
      roomsInfoList: [], // 房源列表
      landlordList: [], // 房东列表
      formData: {
        startDate: '',
        endDate: '',
        processStatus: 0
      },
      colModels: [
        { prop: 'tenantName', label: '客户姓名' },
        { prop: 'tenantMobile', label: '手机号码', width: 100 },
        {
          prop: 'housingType',
          label: '预约类型',
          width: 80,
          render(row) {
            return row.housingType === 1 ? '集中式' : '分散式'
          }
        },
        { prop: 'tenantSource', label: '客户来源', width: 100 },
        { prop: 'positionId', label: '房源编号', width: 100 },
        { prop: 'landlordName', label: '房东姓名', width: 100 },
        { prop: 'landlordMobile', label: '房东手机号', width: 100 },
        { prop: 'cityName', label: '城市' },
        { prop: 'addressName', label: '房源位置', width: 220 },
        { prop: 'bookingRemark', label: '备注' },
        {
          prop: 'bookingTime',
          label: '预约时间',
          width: 140,
          render(row) {
            return parseTime(row.bookingTime, '{y}-{m}-{d} {h}:{i}')
          }
        },
        {
          prop: 'processStatus',
          label: '处理状态',
          fixed: 'right',
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
        { prop: 'processResult', label: '处理结果' },
        {
          prop: 'createTime',
          label: '创建时间',
          width: 140,
          render(row) {
            return parseTime(row.createTime)
          }
        },
        {
          prop: 'modifyTime',
          label: '更新时间',
          width: 140,
          render(row) {
            return parseTime(row.modifyTime)
          }
        },
        { label: '操作', slotName: 'handle', width: 240, fixed: 'right', noExport: true }
      ],
      url: tenantReservationApi.baseUrl,
      method: tenantReservationApi.queryMethod,
      sendMessageForm: {},
      msgRules: {
        sendType: [
          { type: 'array', required: true, message: '请选择发送类型', trigger: 'change' }
        ],
        tenantMobile: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ],
        landlordMobile: [
          { required: true, validator: validatePhone, trigger: 'change' }
        ]
      },
      rules: {
        tenantName: [
          { required: true, message: '请输入客户姓名', trigger: 'blur' }
        ],
        tenantMobile: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ],
        tenantSource: [
          { required: true, message: '请选择客户来源', trigger: 'change' }
        ],
        bookingTime: [
          { required: true, message: '请选择看房时间', trigger: 'change' }
        ]
      }
    }
  },
  created() {},
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
        this.tableData = this.$refs.refGridUnit.tableData
        console.log(this.tableData)
      })
    },

    clearForm() {
      this.formData = {}
      this.searchParam()
    },

    // 日期选择
    changeDate(value) {
      this.formData.startDate = value ? value[0] : ''
      this.formData.endDate = value ? value[1] : ''
    },

    // dialog关闭 移除表单验证结果
    closeInfo(ref) {
      this.$refs[ref].clearValidate()
      this.landlordList = []
      this.sendMessageForm = {}
      this.detailData = {}
      this.findRoomInfo = {}
      this.activeName = '1'
      this.selectedRoomInfo = {}
      this.roomsInfoList = []
    },
    handleClose(done) {
      this.$confirm('您有信息未保存，确认退出？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        done()
      }).catch(() => {
        console.log('cancel')
      })
    },

    // 新增/编辑客源
    addAndEdit(type, data = {}) {
      this.infoTitle = type === 2 ? '编辑客源' : '新增客源'
      data.bookingTime = data.bookingTime ? parseTime(data.bookingTime, '{y}-{m}-{d} {h}:{i}') : ''
      data.processStatus = data.processStatus * 1 === 1 ? 1 : 0
      this.detailData = deepClone(data)
      if (type * 1 === 2) {
        this.getSearchRooms({
          housingType: data.housingType,
          positionId: data.positionId
        }, true)
      } else {
        this.layer_showInfo = true
      }
    },

    // 房源信息查询
    getSearchRooms(params, flag) {
      tenantReservationApi.getRooms({
        pageNo: 1,
        pageSize: 10,
        ...params
      }).then((res) => {
        if (this.infoTitle === '新增客源') {
          this.layer_showInfo = true
          this.$set(this, 'roomsInfoList', res.data.content || [])
          this.activeName = '1'
        } else {
          const _tempInfo = (res.data.content || [])[0]
          this.selectRoomInfo(_tempInfo, true)
        }
      }).catch(() => {
        this.roomsInfoList = []
      })
    },

    // 选择房源
    selectRoomInfo(item, flag) {
      this.selectedRoomInfo = item || {}
      const loadingInstance = this.$loading({
        background: 'rgba(0, 0, 0, 0)',
        text: '拼命加载中...'
      })
      tenantReservationApi.getLandlord({
        housingType: item.housingType,
        positionId: item.positionId
      }).then(res => {
        this.landlordList = res.data || []
        this.selectedRoomInfo.landlordMobile =
        this.landlordList.length > 0 ? this.landlordList[0].landlordMobile : ''
        if (!flag) {
          this.detailData.landlordMobile = this.selectedRoomInfo.landlordMobile
          this.selectLandlord(this.detailData.landlordMobile)
        } else {
          this.layer_showInfo = true
        }
        // 关闭当前手风琴，开启另一个
        this.activeName = '2'
        loadingInstance.close()
      })
    },

    // 选择房东
    selectLandlord(data) {
      let filterObj = {}
      filterObj = this.landlordList.find((item) => {
        return item.landlordMobile === data
      })
      this.detailData.landlordName = filterObj.landlordName || ''
      this.detailData.landlordMobile = data
    },

    // 处理状态变更
    changeStatus(status) {
      if (status !== 1) {
        this.detailData.processResult = ''
      }
    },

    // 客源保存
    saveInfoData() {
      this.$refs.detailFrom.validate((valid) => {
        if (valid) {
          if (JSON.stringify(this.selectedRoomInfo) === '{}') {
            this.$message.error('请选择房源信息')
            return false
          }
          if (this.detailData.processStatus === 1 && !this.detailData.processResult) {
            this.$message.error('请选择处理结果')
            return false
          }
          tenantReservationApi.update(ObjectMap({
            ...this.detailData,
            id: this.detailData.id || 0,
            housingType: this.selectedRoomInfo.housingType,
            positionId: this.selectedRoomInfo.positionId,
            cityName: this.selectedRoomInfo.cityName,
            addressName: this.selectedRoomInfo.address
          })).then(res => {
            this.$notify({
              title: this.infoTitle,
              message: '操作成功',
              type: 'success',
              duration: 3000
            })
            this.layer_showInfo = false
            this.searchParam()
          }).catch()
        } else {
          this.$message.error('请完善客源信息后再保存！')
          return false
        }
      })
    },

    // 发送短信
    sendMessage(row) {
      this.sendMessageForm = {
        ...deepClone(row),
        sendType: ['房东', '租客']
      }
      const loadingInstance = this.$loading({
        background: 'rgba(0, 0, 0, 0)',
        text: '拼命加载中...'
      })
      tenantReservationApi.getLandlord({
        housingType: row.housingType,
        positionId: row.positionId
      }).then(res => {
        this.landlordList = res.data || []
        // 如果房东手机号不在landlordList中，则加进去啦
        const filterLen = this.landlordList.find(item => item.landlordMobile === this.sendMessageForm.landlordMobile)
        if (!filterLen) {
          this.landlordList.unshift({
            landlordMobile: this.sendMessageForm.landlordMobile
          })
        }
        loadingInstance.close()
        this.layer_showMessage = true
      })
    },
    doSendMessage() {
      this.$refs.msgForm.validate((valid) => {
        if (valid) {
          tenantReservationApi.sendMessage(ObjectMap({
            id: this.sendMessageForm.id,
            tenantMobile: this.sendMessageForm.sendType.includes('租客') ? this.sendMessageForm.tenantMobile : '',
            landlordMobile: this.sendMessageForm.sendType.includes('房东') ? this.sendMessageForm.landlordMobile : ''
          })).then(res => {
            this.$notify({
              title: '发送短信',
              message: '短信发送成功',
              type: 'success',
              duration: 3000
            })
            this.layer_showMessage = false
          }).catch()
        } else {
          this.$message.error('请完善信息后再发送！')
          return false
        }
      })
    },

    // 删除数据
    handleDelete(row) {
      this.$confirm('确认是否删除该条预约信息？', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.doDelete(row)
      }).catch()
    },
    doDelete(row) {
      tenantReservationApi.delete({
        ids: [row.id]
      }).then(res => {
        this.$message.success('删除成功')
        this.searchParam()
      })
    },

    // 数据导出
    exportExcel() {
      this.downloadLoading = true
      this.searchParam()
      tenantReservationApi.list(
        ObjectMap({
          ...this.formData,
          pageNo: 1,
          pageSize: 999999
        })
      ).then(response => {
        const resData = (response.data.content || []).slice()
        resData.map((item, index) => {
          item.index = index * 1 + 1
          item.bookingTime = parseTime(item.bookingTime, '{y}-{m}-{d} {h}:{i}')
          item.createTime = parseTime(item.createTime, '{y}-{m}-{d} {h}:{i}')
          item.modifyTime = item.modifyTime ? parseTime(item.modifyTime, '{y}-{m}-{d} {h}:{i}') : ''
          item.housingType = item.housingType * 1 === 1 ? '集中式' : '分散式'
          item.processStatus = item.processStatus * 1 === 1 ? '已处理' : '未处理'
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
          export_json_to_excel(tHeader, data, '意向客源数据导出', '意向客源')
          this.downloadLoading = false
        })
      })
        .catch((err) => {
          console.log(err)
          this.downloadLoading = false
        })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    }
  },
  watch: {
    // 查询房间条件变换
    findRoomInfo: {
      deep: true,
      handler(val) {
        this.$nextTick(() => {
          // 无搜索条件，清空房源列表
          if (!val.housingType && !val.keyWord && (!val.regionId || val.regionId.length === 0) && !val.landlordInfo) {
            this.roomsInfoList = []
          } else {
            const regionId = this.findRoomInfo.regionId ? this.findRoomInfo.regionId[2] : ''
            this.getSearchRooms(ObjectMap({
              pageNo: 1,
              pageSize: 10,
              ...this.findRoomInfo,
              regionId
            }))
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.limitTips {
  position: absolute;
  bottom: 0px;
  right: 10px;
  color: #999;
}
.el-form-item .input_auto {
  width: 300px;
}
.rooms_item {
  cursor: pointer;
  line-height: normal;
  padding: 5px 0;
  &:not(:first-child) {
    border-top: 1px solid #ebeef5;
  }
  .roomAddress {
    color: #999;
  }
}
.roomInfo_details {
 margin-bottom: 10px;
 .detail_label {
   display: inline-block;
   width: 70px;
 }
 .detail_value {
   color: #999;
 }
}
</style>
<style lang="scss">
.radius_border {
  .el-input-group__append {
    border-right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .radius_borderLeft input {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>
