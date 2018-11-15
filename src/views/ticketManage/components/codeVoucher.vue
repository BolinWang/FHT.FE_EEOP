<template>
  <el-dialog
    :title="voucherDialog.title"
    :visible.sync="voucherDialog.show"
    @close="closeDialog"
    width="500px">
    <div class="voucherContent">
      <el-card class="box-card" shadow="hover">
        <div class="container_voucher">
          <el-form size="small" ref="form" :model="codeData" label-width="110px">
            <el-form-item label="名称">
              <span>{{codeData.couponName}}</span>
            </el-form-item>
            <el-form-item label="面值">
              <span>{{codeData.discountAmount}}</span>
            </el-form-item>
            <el-form-item label="剩余可发数量">
              <span>{{codeData.residualQuantityNum}}</span>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <div class="container" style="margin-top: 20px;">
        <el-form size="small" ref="codeForm" :rules="rules" label-width="100px" :model="formData">
          <el-form-item label="兑换码数量" prop="redeemCodeNum">
            <el-input v-if="!formData.existingExchangeCode" v-model="formData.redeemCodeNum" placeholder="请输入兑换码数量" style="width: 200px;"></el-input>
            <span v-else>{{formData.redeemCodeNum}}</span>
          </el-form-item>
          <el-form-item label="已兑换数量" v-if="formData.existingExchangeCode">
            <span>{{formData.redeemCodeConvertedQuantity}}</span>
          </el-form-item>
          <el-form-item label="兑换码类型" prop="redeemCodeType">
            <el-radio-group v-if="!formData.existingExchangeCode" v-model="formData.redeemCodeType">
              <el-radio :label="2">固定码</el-radio>
              <el-radio :label="1">单次码</el-radio>
            </el-radio-group>
            <span v-else>{{formData.redeemCodeType === 1 ? '单次码' : '固定码'}}</span>
            <div class="kouling" v-if="formData.redeemCodeType === 2">
              <el-input v-if="!formData.existingExchangeCode" v-model="formData.fixedCode" placeholder="自定义固定码" style="width: 200px;"></el-input>
              <span v-else>{{formData.fixedCode}}</span>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="voucherDialog.show = false">{{formData.existingExchangeCode ? '关 闭' : '取消'}}</el-button>
      <el-button v-if="!formData.existingExchangeCode" size="small" type="primary" @click="creatCode">生成兑换码</el-button>
      <el-button v-else-if="formData.redeemCodeType === 1" size="small" type="primary" @click="exportExcel" :loading="downloadLoading">下载兑换码Excel</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { voucherManageApi } from '@/api/ticketManage'
import { ObjectMap } from '@/utils'
export default {
  name: 'codeVoucher',
  props: {
    codeData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    const validateInteger = (rule, value, callback) => {
      value = value * 1
      if (!Number.isInteger(value) || value < 0) {
        return callback(new Error('请输入正整数'))
      }
      if (value > this.codeData.residualQuantityNum) {
        return callback(new Error(`不能大于抵扣券可发放数量：${this.codeData.residualQuantityNum}`))
      }
      callback()
    }
    const validateRedeemCodeType = (rule, obj, callback) => {
      if (!this.formData.redeemCodeType) {
        callback(new Error('请选择兑换码类型'))
      } else {
        if (this.formData.redeemCodeType === 2 && !this.formData.fixedCode) {
          callback(new Error('请输入固定码'))
        }
        callback()
      }
    }
    return {
      rules: {
        redeemCodeNum: [
          { required: true, message: '请输入兑换码数量', trigger: 'blur' },
          { validator: validateInteger, trigger: 'blur' }
        ],
        redeemCodeType: [
          { required: true, validator: validateRedeemCodeType, trigger: 'change' }
        ]
      },
      voucherDialog: {
        show: true,
        title: '抵扣券兑换码'
      },
      formData: {},
      downloadLoading: false
    }
  },
  created() {
    this.queryRedeemCodeUsedInfo()
  },
  methods: {
    queryRedeemCodeUsedInfo() {
      voucherManageApi.queryRedeemCodeUsedInfo({
        couponId: this.codeData.id
      }).then(res => {
        this.formData = res.data && res.data.existingExchangeCode ? res.data : {
          existingExchangeCode: false
        }
      })
    },
    closeDialog() {
      this.$refs['codeForm'].clearValidate()
      this.emitEventHandler('closeVoucher', 'codeVoucher', true)
    },
    emitEventHandler(event) {
      this.$emit(event, ...Array.from(arguments).slice(1))
    },
    // 生成兑换码
    creatCode() {
      this.$refs.codeForm.validate((valid, obj) => {
        if (valid) {
          const codeParams = {
            couponId: this.codeData.id,
            ...this.formData,
            redeemCodeNum: this.formData.redeemCodeNum * 1
          }
          voucherManageApi.createCouponRedeemCode(ObjectMap(codeParams)).then(res => {
            this.queryRedeemCodeUsedInfo()
          })
        } else {
          return false
        }
      })
    },
    // 数据导出
    exportExcel() {
      this.downloadLoading = true
      voucherManageApi.queryRedeemCodeByCouponId({
        couponId: this.codeData.id
      }).then(response => {
        const resData = (response.data || []).slice()
        resData.map((item, index) => {
          item.index = index * 1 + 1
        })
        require.ensure([], () => {
          const { export_json_to_excel } = require('@/vendor/Export2Excel')
          const filterCols = [
            { prop: 'couponName', label: '抵扣券名称' },
            { prop: 'redeemCode', label: '兑换码' },
            { prop: 'statusStr', label: '状态' },
            { prop: 'exchangeTimeStr', label: '兑换时间' }
          ]
          const tHeader = ['序号', ...(filterCols.map((item) => item.label))]
          const filterVal = ['index', ...(filterCols.map((item) => item.prop))]
          const data = this.formatJson(filterVal, resData)
          export_json_to_excel(tHeader, data, `${this.codeData.couponName}-兑换码`, '兑换码')
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

