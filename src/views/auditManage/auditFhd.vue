<template>
  <div class="app-container">
    <div class="model-search clearfix">
      <el-form size="small" :inline="true" :model="formData">
        <el-select size="small" style="width:120px;" v-model="formData.status" placeholder="审核状态" class="item-select" clearable>
          <el-option v-for="item in auditOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select size="small" style="width:130px" v-model="formData.type" placeholder="机构类型" class="item-select filter-item" clearable>
          <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-input size="small" v-model="formData.name" placeholder="请输入机构名称" class="filter-item" style="width:180px;" @keydown.native.enter="searchParam">
        </el-input>
        <el-input size="small" v-model="formData.createManagerName" placeholder="请输入城市管家" class="filter-item" style="width:180px;" @keydown.native.enter="searchParam">
        </el-input>
        <el-button type="primary" size="small" icon="el-icon-search" @click.native="searchParam" v-waves class="filter-item">查询</el-button>
        <el-button plain size="small" icon="el-icon-remove-outline" @click.native="clearForm">清空</el-button>
        <el-button class="right" type="primary" size="small" @click.native="layer_sign = true">标记为飞虎队</el-button>
        <el-button class="right" type="primary" size="small" @click.native="layer_card = true">银行卡绑定</el-button>
      </el-form>
    </div>
    <GridUnit
      ref="refGridUnit"
      :columns="colModels"
      :url="url"
      :formOptions="formData"
      :dataMethod="method"
      :height="tableHeight">
      <template slot="slot_status" slot-scope="scope">
        <el-popover v-if="scope.row.status == 2" trigger="hover" placement="top">
          <p>不通过原因: {{ scope.row.auditReason }}</p>
          <div slot="reference">
            <el-tag :type="scope.row.status | renderStatusType">
              {{scope.row.status | renderStatusValue}}
            </el-tag>
          </div>
        </el-popover>
        <el-tag v-else :type="scope.row.status | renderStatusType">
          {{scope.row.status | renderStatusValue}}
        </el-tag>
      </template>
      <template slot="handle" slot-scope="scope">
        <el-button type="primary" icon="el-icon-view" size="small"
          @click="showDetail(scope.$index, scope.row)">
          查看
        </el-button>
      </template>
    </GridUnit>
    <!-- 查看审核 -->
    <div class="dialog-info">
      <el-dialog :model="data_detail"
        :title="data_detail.type | typeFilter"
        :visible.sync="layer_showInfo"
        @close="dialogClose"
        width="600px">
        <fhd-person v-if="data_detail.type === 1" :temp-data="data_detail">
        </fhd-person>
        <fhd-business v-else :temp-data="data_detail">
        </fhd-business>
        <div slot="footer" class="dialog-footer">
          <el-button v-if="data_detail.status === 0" @click="layer_showInfo = false" size="small">取 消</el-button>
          <el-button v-else @click="layer_showInfo = false" size="small">关闭</el-button>
          <el-button v-if="data_detail.status === 0" type="primary" size="small" @click.native="saveAuditResult">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 标记为飞虎队 -->
    <div class="dialog-info">
      <el-dialog title="标记为飞虎队" :visible.sync="layer_sign" width="400px" @close="dialogSign">
        <el-form :model="signForm" size="mini" status-icon :rules="rules" ref="signForm" label-width="150px">
          <el-form-item label="组织的主账号" prop="mobile">
            <el-input v-model="signForm.mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="设置出房服务费率" prop="spiltRate">
            <el-input v-model="signForm.spiltRate">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
          <el-form-item label="房源体量" prop="volumn">
            <el-input v-model="signForm.volumn" placeholder="0 / 正整数，可不填"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="layer_sign = false" size="small">取 消</el-button>
          <el-button type="primary" size="small" @click="signSaveData">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 银行卡绑定-->
    <div class="dialog-info">
      <el-dialog title="银行卡绑定" :visible.sync="layer_card" width="600px" @close="dialogCard">
        <div v-if="inputMobie" class="text-center">
          <el-input placeholder="请输入主账号手机号" v-model="cardForm.mobile" size="small"  style="width: 300px;">
            <template slot="prepend">组织主账号</template>
          </el-input>
        </div>
        <el-form v-else :model="cardForm" size="mini" status-icon :rules="rules" ref="cardForm" label-width="100px">
          <div class="clearfix">
            <el-col :span="12">
              <el-form-item label="姓名">
                <el-input v-model="cardForm.userName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号码">
                <el-input v-model="cardForm.mobile" disabled></el-input>
              </el-form-item>
            </el-col>
          </div>
          <div class="clearfix">
            <el-col :span="12">
              <el-form-item label="身份证号">
                <el-input v-model="cardForm.cardNo" disabled>
                </el-input>
              </el-form-item>
            </el-col>
            <el-tag style="margin-left: 10px;" :type="cardForm.status | statusFilter">
              {{cardForm.status | statusStrFilter}}
            </el-tag>
          </div>
          <div class="clearfix">
            <el-col :span="12">
              <el-form-item label="银行卡类型">
                <el-select size="small" style="width:100%" v-model="cardForm.cardType" class="item-select">
                  <el-option label="个人账户" :value="1">
                  </el-option>
                  <el-option label="对公账户" :value="2">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="开户人姓名">
                <el-input v-model="cardForm.name"></el-input>
              </el-form-item>
            </el-col>
          </div>
          <div class="clearfix">
            <el-col :span="12">
              <el-form-item label="银行卡号">
                <el-input v-model="cardForm.cardNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="开户人身份证" label-width="110px" v-if="cardForm.cardType === 1">
                <el-input v-model="cardForm.accountIdNo"></el-input>
              </el-form-item>
              <el-form-item label="开户银行" v-else>
                <el-select size="small" style="width:100%" placeholder="请选择" v-model="cardForm.bankName" class="item-select">
                  <el-option v-for="(item, index) in bankList" :key="index" :label="item" :value="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button v-if="inputMobie" type="primary" @click="nextStep" size="small">下一步</el-button>
          <el-button v-if="!inputMobie" @click="layer_card = false" size="small">取 消</el-button>
          <el-button v-if="!inputMobie" type="primary" size="small" @click="cardSaveData">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import waves from '@/directive/waves'
import GridUnit from '@/components/GridUnit/grid'
import { parseTime, ObjectMap, deepClone } from '@/utils'
import { fhdAuditApi } from '@/api/auditCenter'
import { validateMobile, validateIntAndZero } from '@/utils/validate'
import fhdPerson from '@/views/auditManage/components/fhdPerson'
import fhdBusiness from '@/views/auditManage/components/fhdBusiness'

export default {
  name: 'auditFhd',
  directives: {
    waves
  },
  components: {
    GridUnit,
    fhdPerson,
    fhdBusiness
  },
  filters: {
    typeFilter(type) {
      const typeData = ['个人', '企业']
      return `飞虎队${typeData[type - 1]}机构` || ''
    },
    renderStatusType(status) {
      const statusMap = {
        '0': 'info',
        '1': 'success',
        '2': 'danger'
      }
      return statusMap[status] || 'info'
    },
    renderStatusValue(status) {
      const statusStrData = ['待审核', '审核通过', '审核不通过']
      return statusStrData[status] || '待审核'
    },
    statusFilter(status) {
      const statusMap = {
        '0': 'info',
        '1': 'success'
      }
      return statusMap[status] || 'info'
    },
    statusStrFilter(status) {
      const statusStrData = ['未实名', '已实名']
      return statusStrData[status] || '未实名'
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
      if(/^\d+(?:.\d{1,2})?$/.test(value) && value <= 100) {
        callback()
      } else {
        callback(new Error('费率为0到100,最多保留2位小数'))
      }
    }
    const validateVolunm = (rule, value, callback) => {
      if (!validateIntAndZero(value)) {
        callback(new Error('请输入0或正整数'))
      } else {
        callback()
      }
    }
    return {
      inputMobie: true,  // 是否是第一步输入主账号手机号
      typeOptions: [
        { value: 1, label: '个人' },
        { value: 2, label: '企业' }
      ],
      auditOptions: [
        { value: 0, label: '未审核' },
        { value: 1, label: '审核通过' },
        { value: 2, label: '审核不通过' }
      ],
      bankList: {
        "01000000": "邮储银行",
        "01020000": "工商银行",
        "01030000": "农业银行",
        "01040000": "中国银行",
        "01050000": "建设银行",
        "03010000": "交通银行",
        "03020000": "中信银行",
        "03030000": "光大银行",
        "03040000": "华夏银行",
        "03050000": "民生银行",
        "03060000": "广发银行",
        "03070000": "平安银行",
        "03080000": "招商银行",
        "03090000": "兴业银行",
        "03100000": "浦发银行",
        "03160000": "浙商银行",
        "04012900": "上海银行",
        "04031000": "北京银行",
        "04083320": "宁波银行",
        "04233310": "杭州银行",
        "04256020": "东莞银行",
        "04375850": "珠海华润",
        "04791920": "包商银行",
        "05083000": "江苏银行",
        "64135810": "广州银行",
        "64895910": "广东南粤"
      },
      formData: {
        name: '',
        type: '',
        createManagerName: '',
        status: 0
      },
      signForm: {},
      cardForm: {
        cardType: 1
      },
      rules: {
        mobile: [
          { required: true, trigger: 'blur', validator: validatePhone }
        ],
        name: [
          { required: true, trigger: 'blur', validator: validateName }
        ],
        spiltRate: [
          { required: true, trigger: 'blur', validator: validateSpiltRate }
        ],
        volumn: [
          { trigger: 'blur', validator: validateVolunm }
        ],
        userName: [
          { required: true, trigger: 'blur', message: '请输入开户人姓名' }
        ],
        userCardNo: [
          { required: true, trigger: 'blur', message: '请输入银行卡号' }
        ]
      },
      searchParams: {},
      saveAuditParam: {},
      dateTime: [],
      colModels: [
        { prop: 'id', label: '审核号', width: 80 },
        { prop: 'gmtCreate', label: '申请时间', width: 180, filter: 'parseTime' },
        { prop: 'name', label: '机构名称' },
        { prop: 'type', label: '机构类型', width: 100,
          render(row) {
            const typeData = ['个人', '企业']
            return typeData[row.type - 1] || ''
          }
        },
        { prop: 'createManagerName', label: '城市管家' },
        { slotName: 'slot_status', label: '审核状态', width: 120 },
        {
          prop: 'gmtModified', label: '审核时间', width: 140,
          showOverflowTooltip: true,
          render(row) {
            let filterTime = parseTime(row.gmtModified)
            return `${filterTime} ${row.auditName || ''}`
          }
        },
        { label: '操作', slotName: 'handle', fixed: 'right', width: 100, align: 'center' }
      ],
      tableHeight: 300,
      data_detail: {},
      url: fhdAuditApi.defaultOptions.requestUrl,
      method: fhdAuditApi.defaultOptions.method,
      layer_showInfo: false,
      layer_sign: false,
      layer_card: false
    }
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
    searchParam() {
      this.$refs.refGridUnit.searchHandler()
    },
    clearForm() {
      this.formData = {}
      this.$refs.refGridUnit.searchHandler({
        type: 'clear',
        data: {}
      })
    },
    // 查看详情
    showDetail(index, row) {
      fhdAuditApi.detail({
        id: row.id
      }).then(response => {
        this.data_detail = response.data
        this.layer_showInfo = true
      }).catch()
    },
    dialogClose() {
      this.data_detail = {}
    },
    // 审核
    saveAuditResult() {
      let typeMap = ['personal', 'business'][this.data_detail.type - 1]
      const saveAuditApi = fhdAuditApi[typeMap]
      const store_fhdData = this.$store.getters.fhdAuditData[typeMap]
      if (!store_fhdData.status) {
        this.$message.error('请选择审核结果')
        return false
      }
      if (store_fhdData.status === 2 && !store_fhdData.reason) {
        this.$message.error('请填写审核不通过原因，最多30个字符')
        return false
      }
      saveAuditApi(store_fhdData).then(response => {
        this.$message.success('操作成功')
        this.searchParam()
        this.layer_showInfo = false
      }).catch()
    },
    // 标记为飞虎队
    signSaveData() {
      this.$refs.signForm.validate(valid => {
        if (valid) {
          fhdAuditApi.markFhd(this.signForm).then(response => {
            this.$message.success('标记成功')
            this.layer_sign = false
          }).catch()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    dialogSign() {
      this.signForm = {}
      this.$refs.signForm.clearValidate()
    },
    // 绑定银行卡
    nextStep() {
      if (!validateMobile(this.cardForm.mobile)) {
        this.$message.error('请输入正确的手机号')
        return false
      }
      fhdAuditApi.queryByMobile({
        mobile: this.cardForm.mobile
      }).then(response => {
        this.cardForm = response.data
        this.inputMobie = false
      }).catch()
    },
    cardSaveData() {
      this.$refs.cardForm.validate(valid => {
        if (valid) {
          fhdAuditApi.updateBankCard(this.cardForm).then(response => {
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
        cardType: 1
      }
      if (!this.inputMobie) {
        this.$refs.cardForm.clearValidate()
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.model-search .filter-item {
  margin-left: 10px;
}

.item-select {
  width: 150px;
}

.el-popover {
  max-width: 500px;
}
</style>
