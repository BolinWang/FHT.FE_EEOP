<template>
  <div class="app-container">
    <div class="model-search clearfix">
      <el-select size="small" v-model="formData.requestStatus" placeholder="联系状态" class="item-select" style="width: 150px;" clearable>
        <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-input size="small" v-model="formData.mobile" placeholder="手机号码" class="filter-item" style="width:180px;" @keydown.native.enter="searchParam">
      </el-input>
      <el-button type="primary" size="small" icon="el-icon-search" @click.native="searchParam" v-waves class="filter-item">查询</el-button>
      <el-button plain size="small" icon="el-icon-remove-outline" @click.native="clearForm">清空</el-button>
      <el-button class="right" type="primary" size="small" icon="el-icon-circle-plus-outline" @click.native="handleApply">注册账号</el-button>
      <!-- <el-button class="right" type="primary" size="small" @click.native="layer_sign = true">标记为飞虎队</el-button>
      <el-button class="right" type="primary" size="small" @click.native="layer_card = true">银行卡绑定</el-button> -->
    </div>
    <div class="model-table" :style="tableStyle">
      <el-table :data="tableData" v-loading.body="listLoading" :max-height="tableHeight" size="small" fit stripe highlight-current-row>
        <el-table-column type="index" width="60" align="center"></el-table-column>
        <el-table-column v-for="(item,index) in colModels" :label="item.label" :width="item.width" :key="index" fit show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tag v-if="item.type === 'status'" :type="scope.row[item.prop] | statusFilter">
              {{scope.row[item.prop] | statusStrFilter}}
            </el-tag>
            <span v-else>
              {{scope.row[item.prop]}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button v-if="scope.row.requestStatus == 1" type="primary" icon="el-icon-star-off" size="small" @click.native="signContactor(scope.$index,scope.row)">标为已联系</el-button>
            <el-button v-else type="success" disabled icon="el-icon-star-on" size="small" @click.native="signContactor(scope.$index,scope.row)">已联系</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="model-pagination">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageItems.pageNo" :page-sizes="pageSizeList" :page-size="pageItems.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- 注册账号 -->
    <div class="dialog-info">
      <el-dialog title="注册账号" :visible.sync="layer_showInfo" width="600px" @close="dialogClose">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
          <el-form-item label="手机号码" prop="mobile">
            <el-input v-model.number="ruleForm.mobile"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div class="tips">温馨提示：默认密码为123456，请提醒用户首次登录后立即更改密码</div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="layer_showInfo = false" size="small">取 消</el-button>
          <el-button type="primary" size="small" @click="handleSaveData">确 定</el-button>
        </div>
      </el-dialog>
    </div>
     <!-- 标记为飞虎队 -->
    <!-- <div class="dialog-info">
      <el-dialog title="标记为飞虎队" :visible.sync="layer_sign" width="400px" @close="dialogSign">
        <el-form :model="signForm" size="small" status-icon :rules="rules" ref="signForm" label-width="150px">
          <el-form-item label="组织的主账号" prop="mobile">
            <el-input v-model="signForm.mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="设置出房服务费率" prop="spiltRate">
            <el-input v-model="signForm.spiltRate" auto-complete="off">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
          <el-form-item label="城市管家姓名" prop="managerMobile">
            <el-input v-model="signForm.managerMobile" placeholder="请输入城市管家姓名"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="layer_sign = false" size="small">取 消</el-button>
          <el-button type="primary" size="small" @click="signSaveData">确 定</el-button>
        </div>
      </el-dialog>
    </div> -->
     <!-- 银行卡绑定-->
    <!-- <div class="dialog-info">
      <el-dialog title="银行卡绑定" :visible.sync="layer_card" width="500px" @close="dialogCard">
        <el-form :model="cardForm" size="small" status-icon :rules="rules" ref="cardForm" label-width="150px">
          <el-form-item label="组织的主账号" prop="mobile">
            <el-input v-model="cardForm.mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="开户人姓名" prop="userName">
            <el-input v-model="cardForm.userName" auto-complete="off">
            </el-input>
          </el-form-item>
          <el-form-item label="银行卡号" prop="userCardNo">
            <el-input v-model="cardForm.userCardNo" auto-complete="off">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="layer_card = false" size="small">取 消</el-button>
          <el-button type="primary" size="small" @click="cardSaveData">确 定</el-button>
        </div>
      </el-dialog>
    </div> -->
  </div>
</template>
<script>
import waves from '@/directive/waves' // 水波纹指令
import { ObjectMap, deepClone } from '@/utils'
import {
  queryUserRequestByPageApi, saveUserRequestApi, registeredUserApi,
  initFlyOrgApi, addTempOrgApi, bindWithdrawCardApi
} from '@/api/userManage'
import { validateMobile } from '@/utils/validate'

export default {
  name: 'applyRegister',
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
    statusStrFilter(status) {
      const statusStrData = ['未联系', '已联系']
      return statusStrData[status - 1] || '未联系'
    }
  },
  data() {
    const validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入姓名'))
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (!validateMobile(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    const validateSpiltRate = (rule, value, callback) => {
      if (/^\d+(?:.\d{1,2})?$/.test(value) && value <= 100) {
        callback()
      } else {
        callback(new Error('费率为0到100,最多保留2位小数'))
      }
    }
    return {
      selectOptions: [
        { label: '未联系', value: 1 },
        { label: '已联系', value: 2 }
      ],
      colModels: [
        { prop: 'mobile', label: '手机号码', width: 150 },
        { prop: 'name', label: '姓名' },
        { prop: 'housePosion', label: '地区' },
        { prop: 'houseAmount', label: '房源数量', width: 100 },
        { prop: 'gmtCreate', label: '申请时间', width: 180 },
        { prop: 'requestStatus', label: '联系状态', width: 100, type: 'status' },
        { prop: 'operatorName', label: '操作人' },
        { prop: 'gmtModified', label: '操作时间', width: 180 }
      ],
      tableHeight: 300,
      tableData: [],
      total: null,
      pageItems: {
        pageNo: 1,
        pageSize: 20
      },
      pageSizeList: [10, 20, 30, 50],
      layer_showInfo: false,
      layer_sign: false,
      layer_card: false,
      formData: {
        requestStatus: '',
        mobile: ''
      },
      ruleForm: {
        mobile: '',
        name: ''
      },
      signForm: {

      },
      cardForm: {
        mobile: '',
        userName: '',
        userCardNo: ''
      },
      rules: {
        mobile: [
          { required: true, trigger: 'blur', validator: validatePhone }
        ],
        managerMobile: [
          { required: true, trigger: 'blur', message: '请输入城市管家姓名' }
        ],
        name: [
          { required: true, trigger: 'blur', validator: validateName }
        ],
        spiltRate: [
          { required: true, trigger: 'blur', validator: validateSpiltRate }
        ],
        userName: [
          { required: true, trigger: 'blur', message: '请输入开户人姓名' }
        ],
        userCardNo: [
          { required: true, trigger: 'blur', message: '请输入银行卡号' }
        ]
      }
    }
  },
  created() {
    this.getGridData(this.pageItems)
  },
  mounted() {
    /* 表格高度控制 */
    this.$nextTick(() => {
      let temp_height = document.body.clientHeight - 200
      this.tableHeight = temp_height > 300 ? temp_height : 300
      window.onresize = () => {
        return (() => {
          temp_height = document.body.clientHeight - 200
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
    handleApply() {
      this.layer_showInfo = true
      if (this.$refs.ruleForm) {
        this.$refs.ruleForm.clearValidate()
      }
    },
    /* 弹窗关闭时的回调 */
    dialogClose() {
      this.$refs.ruleForm.resetFields()
    },
    handleSizeChange(val) {
      this.pageItems.pageSize = val
      this.getGridData(this.pageItems)
    },
    handleCurrentChange(val) {
      this.pageItems.pageNo = val
      this.getGridData(this.pageItems)
    },
    /* 列表渲染，数据请求 */
    getGridData(params) {
      this.listLoading = true
      this.searchParams = Object.assign(deepClone(params), deepClone(this.formData))
      queryUserRequestByPageApi(ObjectMap(this.searchParams)).then(response => {
        this.tableData = response.data.content
        this.total = response.data.totalElements
        this.listLoading = false
      })
    },
    searchParam() {
      this.getGridData(this.pageItems)
    },
    clearForm() {
      this.pageItems = {
        pageNo: 1,
        pageSize: 20
      }
      this.formData = {
        requestStatus: '',
        mobile: ''
      }
      this.getGridData(this.pageItems)
    },
    signSaveData() { // 标记为飞虎队
      this.$refs.signForm.validate(valid => {
        if (valid) {
          initFlyOrgApi({
            mobile: this.signForm.mobile,
            spiltRate: this.signForm.spiltRate
          }).then(response => {
            addTempOrgApi({
              orgId: response.data.orgId,
              orgName: response.data.orgName,
              orgMobile: this.signForm.mobile,
              managerMobile: this.signForm.managerMobile
            }).then(res => {
              this.$message.success('标记成功')
              this.layer_sign = false
            })
          }).catch()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    dialogSign() {
      this.signForm = {
        mobile: '',
        spiltRate: ''
      }
      this.$refs.signForm.clearValidate()
    },
    cardSaveData() {
      this.$refs.cardForm.validate(valid => {
        if (valid) {
          bindWithdrawCardApi(deepClone(this.cardForm)).then(response => {
            this.$message.success('银行卡绑定成功')
            this.layer_card = false
          }).catch()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    dialogCard() {
      this.cardForm = {
        mobile: '',
        userName: '',
        userCardNo: ''
      }
      this.$refs.cardForm.clearValidate()
    },
    handleSaveData() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          registeredUserApi({
            mobile: this.ruleForm.mobile + '',
            name: this.ruleForm.name
          }).then(response => {
            this.layer_showInfo = false
            this.getGridData(this.pageItems)
            this.$notify({
              title: '成功',
              message: '注册成功，初始密码为：123456',
              type: 'success',
              duration: 2000
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    signContactor(index, row) {
      row.requestStatus = 2
      saveUserRequestApi([row]).then(response => {
        this.getGridData(this.pageItems)
        this.$notify({
          title: '成功',
          message: '标记成功',
          type: 'success',
          duration: 2000
        })
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
