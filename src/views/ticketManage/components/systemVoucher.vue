<template>
  <el-dialog
    :title="voucherDialog.title"
    :visible.sync="voucherDialog.show"
    @close="closeDialog"
    width="500px">
    <div class="voucherContent">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="抵扣券" name="1">
          <div v-for="item in codeData.list" :key="item.id">{{item.couponName}}</div>
        </el-collapse-item>
      </el-collapse>
      <div class="container" style="margin-top: 20px;">
        <el-form size="small" ref="ruleForm" label-width="100px" :model="formData">
          <el-form-item label="用户手机号">
            <el-radio-group v-model="formData.importType" @change="changeType">
              <el-radio label="单用户"></el-radio>
              <el-radio label="多用户"></el-radio>
            </el-radio-group>
            <div style="margin-top: 10px;">
              <el-input required v-if="formData.importType === '单用户'" v-model="formData.mobile" placeholder="请输入手机号" style="width: 200px;"></el-input>
              <div v-else>
                <label class="el-button el-button--primary el-button--small" for="imFile">
                  <i class="el-icon-upload"></i>
                  导入Excel
                  <input type="file" id="imFile" style="display: none"
                    @change="importFile($event)"
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                </label>
                <el-button v-if="excelData.length" size="small" type="danger" @click="excelData = []; importMessage = '请重新导入手机号'">删除已导入数据</el-button>
                <div class="tips" style="color: #999;">{{importMessage}}</div>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="voucherDialog.show = false">取 消</el-button>
      <el-button size="small" type="primary" @click="creatCode">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { voucherManageApi } from '@/api/ticketManage'
import { ObjectMap } from '@/utils'
import { validateMobile } from '@/utils/validate'
export default {
  name: 'systemVoucher',
  props: {
    codeData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      rules: {
        number: [
          { required: true, message: '请输入。。。' },
          { type: 'number', message: '请输入数字' }
        ]
      },
      voucherDialog: {
        show: true,
        title: '人工发放'
      },
      formData: {
        importType: '单用户'
      },
      downloadLoading: false,
      activeNames: '1',
      imFile: '',
      importMessage: '',
      excelData: []
    }
  },
  created() {

  },
  mounted() {
    this.$nextTick(() => {
      this.imFile = document.getElementById('imFile')
    })
  },
  methods: {
    changeType() {
      this.$nextTick(() => {
        this.imFile = document.getElementById('imFile')
      })
    },
    closeDialog() {
      this.$refs['ruleForm'].clearValidate()
      this.emitEventHandler('closeVoucher', 'systemVoucher')
    },
    emitEventHandler(event) {
      this.$emit(event, ...Array.from(arguments).slice(1))
    },
    // 发放抵扣券
    creatCode() {
      const userMobiles = this.formData.importType === '单用户' ? [this.formData.mobile] : this.excelData
      if (!userMobiles.length) {
        this.$message.error('手机号不能为空')
        return false
      }
      const sendParams = {
        couponIds: this.codeData.list.map(item => item.id),
        couponCodes: this.codeData.list.map(item => item.couponCode),
        userMobiles
      }
      voucherManageApi.grantingCoupon(ObjectMap(sendParams)).then(res => {
        if (res.data && res.data.errorNum) {
          this.$notify({
            title: '抵扣券发放详情',
            message: `发放成功${sendParams.userMobiles.length - res.data.errorNum}个用户，失败${res.data.errorNum}个用户。原因：${res.data.errorMsg}`,
            type: 'info',
            duration: 5000
          })
        } else {
          this.$message.success('抵扣券发放成功')
        }
        this.emitEventHandler('closeVoucher', 'systemVoucher')
      })
    },
    // 数据导入
    importFile(e) {
      const obj = this.imFile
      if (!obj.value) {
        console.log('取消上传...')
        return false
      }
      const XLSX = require('xlsx')
      this.downloadLoading = true
      if (!obj.files) {
        this.downloadLoading = false
        return
      }
      const f = obj.files[0]
      const reader = new FileReader()
      const $t = this
      reader.onload = function(e) {
        const data = e.target.result
        if ($t.rABS) {
          $t.wb = XLSX.read(btoa(this.fixdata(data)), { // 手动转化
            type: 'base64'
          })
        } else {
          $t.wb = XLSX.read(data, {
            type: 'binary'
          })
        }
        console.log($t.wb.Sheets)
        const json = XLSX.utils.sheet_to_json($t.wb.Sheets[$t.wb.SheetNames[0]])
        console.log(typeof json)
        $t.dealFile($t.analyzeData(json))
      }
      if (this.rABS) {
        reader.readAsArrayBuffer(f)
      } else {
        reader.readAsBinaryString(f)
      }
      e.target.value = null
    },
    analyzeData(data) {
      return data
    },
    dealFile(data) {
      console.log(data)
      this.imFile.value = null
      this.downloadLoading = false
      if (!data || !(data instanceof Array)) {
        this.importMessage = '导入文件格式不正确'
        this.$message.error(this.importMessage)
        return false
      }
      if (!data.length) {
        this.importMessage = '导入文件数据为空'
        this.$message.error(this.importMessage)
        return false
      }
      const isAccord = data.some(item => {
        if (!item.mobile) {
          this.importMessage = '格式不正确：Excel表首行请填写为mobile'
          this.$message.error(this.importMessage)
          return true
        }
        if (!validateMobile(item.mobile)) {
          this.importMessage = `格式不正确：${item.mobile} 为无效号码`
          this.$message.error(this.importMessage)
          return true
        }
      })
      if (isAccord) {
        return false
      }
      const mapData = data.map(item => {
        return item.mobile
      })
      this.excelData = [...new Set(mapData)]
      const diffLen = data.length - this.excelData.length
      this.importMessage = `成功导入${data.length}条数据，系统已自动去重${diffLen}条数据`
      this.$message.success(this.importMessage)
    }
  }
}
</script>
<style lang="scss" scoped>
  .container_voucher {
   .el-form-item {
     margin-bottom: 0;
   }
  }
</style>

