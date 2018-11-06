<template>
  <el-dialog
    :title="voucherDialog.title"
    :visible.sync="voucherDialog.show"
    @close="closeDialog"
    width="500px">
    <div class="voucherContent">
      <el-card class="box-card" shadow="hover">
        <div class="container_voucher">
          <el-form size="small" ref="form" :model="codeData" label-width="80px">
            <el-form-item label="名称">
              <span>阿发沙发舒服</span>
            </el-form-item>
            <el-form-item label="面值">
              <span>12</span>
            </el-form-item>
            <el-form-item label="发放总量">
              <span>222</span>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <div class="container" style="margin-top: 20px;">
        <el-form size="small" ref="ruleForm" label-width="100px" :model="formData">
          <el-form-item label="兑换码数量">
            <el-input v-model="formData.name" placeholder="请输入兑换码数量" style="width: 200px;"></el-input>
            <span>1231</span>
          </el-form-item>
          <el-form-item label="已兑换数量">
            <span>0</span>
          </el-form-item>
          <el-form-item label="兑换码类型">
            <el-radio-group v-model="formData.resource">
              <el-radio label="固定码"></el-radio>
              <el-radio label="单次码"></el-radio>
            </el-radio-group>
            <span>固定码</span>
            <div class="kouling">
              <el-input v-model="formData.name" placeholder="自定义固定码" style="width: 200px;"></el-input>
              <span>阿发沙发</span>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="voucherDialog.show = false">取 消</el-button>
      <el-button size="small" type="primary" @click="creatCode">生成兑换码</el-button>
      <el-button size="small" type="primary" @click="exportExcel" :loading="downloadLoading">下载兑换码Excel</el-button>
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
    return {
      rules: {
        number: [
          { required: true, message: '请输入。。。' },
          { type: 'number', message: '请输入数字' }
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

  },
  methods: {
    closeDialog() {
      this.$refs['ruleForm'].clearValidate()
      this.emitEventHandler('closeVoucher', 'codeVoucher')
    },
    emitEventHandler(event) {
      this.$emit(event, ...Array.from(arguments).slice(1))
    },
    // 生成兑换码
    creatCode() {
      const codeParams = {
        couponId: '1',
        redeemCodeNum: 1,
        redeemCodeType: 2,
        fixedCode: '周年快乐'
      }
      voucherManageApi.createCouponRedeemCode(ObjectMap(codeParams)).then(res => {
        console.log(res)
      })
    },
    // 数据导出
    exportExcel() {
      this.downloadLoading = true
      voucherManageApi.createCouponRedeemCode(
        ObjectMap({
          ...this.formData,
          pageNo: 1,
          pageSize: 999999
        })
      ).then(response => {
        const resData = (response.data.content || []).slice()
        resData.map((item, index) => {
          item.index = index * 1 + 1
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
          export_json_to_excel(tHeader, data, '兑换码', '兑换码')
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

