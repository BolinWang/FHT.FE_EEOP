/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-07-11 13:49:21
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-07-13 14:46:31
 */

<template>
  <div class="app-container">
    <el-form class="model-search clearfix" :inline="true" size="small">
      <el-select size="small" v-model="searchParams.type" filterable clearable placeholder="组织类型" class="item-select">
        <el-option label="公司企业" :value="2"></el-option>
        <el-option label="个人" :value="3"></el-option>
        <el-option label="系统" :value="1"></el-option>
      </el-select>
      <el-input size="small" v-model="searchParams.organizationName" clearable placeholder="组织名称" class="filter-item" style="width:180px;"></el-input>
      <el-input size="small" v-model="searchParams.mobile" clearable placeholder="手机号" class="filter-item" style="width:180px;"></el-input>
      <el-button size="small" type="primary" icon="el-icon-search" @click="searchParam" class="filter-item">查询</el-button>
      <el-button size="small" icon="el-icon-remove-outline" @click="searchParam('clear')" class="filter-item">清空</el-button>
    </el-form>
    <GridUnit
      ref="refGridUnit"
      :columns="colModels"
      :formOptions="searchParams"
      :url="url"
      :dataMethod="method"
      :height="tableHeight"
      :showExpand="true"
      :expandColums="colModels"
      @expand-change="getExpandData">
      <template slot="expandTable" slot-scope="table_scope">
        <el-table
          :data="rowData.childrenData || []" style="width: 100%"
          :max-height="300"
          size="small"
          :header-row-class-name="`expandHeader`">
          <el-table-column v-for="(column, index) in expand_colModels" :label="column.label" :key="index" :prop="column.prop">
            <template slot-scope="expand_scope">
              <span v-if="column.slotName">
                <el-tag v-if="rowData.idlefishStatus !== `已开通`" type="warning" size="small">请先开通主账号</el-tag>
                <el-button v-if="rowData.idlefishStatus === `已开通`" @click="handleSetting(rowData, 0, 'change')" type="text" size="small">账号换绑</el-button>
                <el-tag v-if="rowData.idlefishStatus === `已开通`" type="success" size="small">已开通</el-tag>
              </span>
              <span v-else>
                {{ column.render ? column.render(expand_scope.row) : expand_scope.row[column.prop] }}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template slot="handle" slot-scope="scope">
        <el-button v-if="scope.row.idlefishStatus !== `已开通`" @click="handleSetting(scope.row, 1)" type="text" size="small">申请开通</el-button>
        <!-- <el-button v-if="scope.row.idlefishStatus === `已开通`" @click="handleSetting(scope.row, 1, 'change')" type="text" size="small">账号换绑</el-button> -->
        <el-tag v-if="scope.row.idlefishStatus === `已开通`" type="success" size="small">已开通</el-tag>
      </template>
    </GridUnit>
    <!-- 申请开通 -->
    <div class="dialog_apply">
      <el-dialog title="申请开通" :visible.sync="layer_showApply" @close="dialogClose">
        <el-steps :active="active_step" align-center finish-status="success" style="margin-bottom: 30px;">
          <el-step title="填写闲鱼昵称" description="打开闲鱼APP，点击【我的】，用户名即为闲鱼昵称，闲鱼昵称需要进行实名认证才可同步房源（闲鱼APP-我的-头像-实名认证）"></el-step>
          <el-step title="扫码授权" description="打开闲鱼APP进行扫码授权"></el-step>
        </el-steps>
        <div class="text-center" style="display: flex; justify-content: center;" v-if="active_step === 0">
          <el-form size="small" status-icon :rules="rules" ref="dataForm" :model="temp" style="width: 400px;">
            <el-form-item prop="account">
              <el-input placeholder="请输入闲鱼昵称" v-model="temp.account" clearable size="small">
                <template slot="prepend">闲鱼昵称</template>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="text-center" v-else style="display: flex; justify-content: center;">
          <el-card :body-style="{ padding: '0px' }" style="width: 500px;">
            <img :src="picUrl" style="display: block; width: 100%;">
            <div style="padding: 14px;">
              <span>请用闲鱼APP进行扫码授权</span>
            </div>
          </el-card>
        </div>
        <div slot="footer" class="dialog-footer text-center">
          <el-button v-if="active_step === 0" type="primary" @click="nextStep" size="small">下一步</el-button>
          <el-button v-if="active_step === 1" @click="active_step = 0" size="small">上一步</el-button>
          <el-button v-if="active_step === 1" type="primary" @click="saveApplyInfo" size="small">确认授权</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import GridUnit from '@/components/GridUnit/grid'
import { deepClone, ObjectMap } from '@/utils'
import { hotRecommendApi } from '@/api/eeop'
import { authorizeApi } from '@/api/houseManage'
import defaultPicUrl from '@/assets/banner.jpg'

export default {
  name: 'authorize',
  components: {
    GridUnit
  },
  data() {
    return {
      searchParams: {
        type: 2,
        organizationName: '',
        mobile: ''
      },
      picUrl: defaultPicUrl,
      colModels: [
        { prop: 'organizationName', label: '组织名称' },
        {
          prop: 'status',
          label: '组织状态',
          type: 'status',
          unitFilters: {
            renderStatusType(status) {
              const statusMap = {
                '启用': 'success',
                '停用': 'danger'
              }
              return statusMap[status] || 'info'
            },
            renderStatusValue(status) {
              return status || '未知'
            }
          }
        },
        { prop: 'name', label: '姓名' },
        { prop: 'mobile', label: '手机号' },
        { prop: 'userType', label: '用户类型' },
        { prop: 'idlefishStatus', label: '闲鱼账号', slotName: 'handle', width: 150 },
        { prop: 'idlefishAccount', label: '闲鱼昵称' }
      ],
      childrenData: [],
      expand_colModels: [
        { prop: 'name', label: '姓名' },
        { prop: 'mobile', label: '手机号' },
        { prop: 'userType', label: '用户类型' },
        { prop: 'idlefishStatus', label: '闲鱼账号', slotName: 'handle', width: 150 },
        { prop: 'idlefishAccount', label: '闲鱼昵称' }
      ],
      tableHeight: 300,
      url: hotRecommendApi.defaultOptions.requestUrl,
      method: hotRecommendApi.defaultOptions.method,
      rules: {
        account: [
          { required: true, message: '请填写闲鱼昵称', trigger: 'blur' }
        ]
      },
      temp: {
        account: ''
      },
      rowData: {},
      active_step: 0,
      layer_showApply: false
    }
  },
  created () {

  },
  mounted() {
    /* 表格高度控制 */
   this.$nextTick(() => {
      const offsetTop = this.$refs.refGridUnit.$el.offsetTop || 140
      const pagenationH = 64
      const containerPadding = 20
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
  computed: {
    tableStyle: function() {
      return {
        width: '100%',
        height: this.tableHeight + 'px'
      }
    }
  },
  methods: {
    // 查询
    searchParam(type) {
      if (type === 'clear') {
        this.searchParams = {}
      }
      this.$refs.refGridUnit.searchHandler()
    },
    // 获取展开行数据 children
    getExpandData(row, expandedRows) {
      this.rowData = deepClone(row)
      this.rowData.childrenData = [
        {
          name:'子账号',
          mobile:'12345678902',
          userType:'普通用户',
          idlefishStatus:'已开通',
          idlefishAccount:'aaaa'
        }
      ]
    },
    // 申请开通
    handleSetting(row, type, bindType) {
      this.temp = {
        ...row,
        account: '',
        type,
        bindType
      }
      this.layer_showApply = true
    },
    // 下一步
    nextStep() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // TODO调用绑定接口
          let bindParams = {
            platform: 'idlefish',
            userid: this.temp.userid,
            account: this.temp.account,
            type: this.temp.type,
            mobile: this.temp.mobile,
            brand: this.temp.name
          }
          this.active_step = 1
          return false
          const bindApi = this.temp.bindType ? authorizeApi.switch : authorizeApi.bind
          bindApi(ObjectMap(bindParams)).then(response => {
            authorizeApi.picture({
              platform: 'idlefish',
              saasId: 0
            }).then(response => {
              this.picUrl = response.picUrl
              this.active_step = 1
            })
          })
        }
      })
    },
    // 确认授权
    saveApplyInfo() {
      return false
      authorizeApi.status(ObjectMap({
        platform: 'idlefish',
        userid: this.temp.userid,
      })).then(response => {
        this.layer_showApply = false
        this.searchParam()
        this.$notify({
          title: '成功',
          message: '授权成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    dialogClose() {
      this.temp = {
        account: ''
      }
      this.active_step = 0
      if (this.$refs.dataForm) {
        this.$refs.dataForm.resetFields()
      }
      this.layer_showApply = false
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.model-table {
  margin-bottom: 0;
}
.dialog_apply .el-step__description {
  color: #c0c4cc !important;
}
</style>
