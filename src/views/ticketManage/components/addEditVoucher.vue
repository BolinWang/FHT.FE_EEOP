<template>
  <el-dialog
    :title="voucherDialog.title"
    :visible.sync="voucherDialog.show"
    @close="closeDialog"
    width="600px">
    <div class="voucherContent">
      <el-form
        size="small"
        :model="dataInfo" :rules="rules" ref="dataInfo" label-width="100px">
        <el-collapse v-model="voucherDialog.activeName" accordion>
          <el-collapse-item title="基础信息" name="baseInfo">
            <div class="baseInfo">
              <el-form-item label="名称" prop="couponName">
                <el-input v-model="dataInfo.couponName" :maxlength="20" placeholder="请输入名称"></el-input>
              </el-form-item>
              <el-form-item label="面值" prop="discountAmount">
                <el-input v-model="dataInfo.discountAmount" placeholder="请输入面值"></el-input>
              </el-form-item>
              <el-form-item label="触发条件" prop="triggerType">
                <el-select
                  v-model="dataInfo.triggerType" placeholder="请选择触发条件" clearable style="width: 100%;">
                  <el-option label="无" :value="0"></el-option>
                  <el-option label="注册" :value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="备注" prop="remark">
                <el-input v-model="dataInfo.remark" :maxlength="20"></el-input>
              </el-form-item>
              <el-form-item label="使用说明" prop="couponDesc" class="large">
                <el-input type="textarea" autosize placeholder="请输入使用说明" v-model="dataInfo.couponDesc" :maxlength="200"></el-input>
              </el-form-item>
            </div>
          </el-collapse-item>
          <el-collapse-item title="限制条件" name="limitInfo">
            <el-form-item size="small" label="发放总量" prop="totalNum">
              <el-input v-model="dataInfo.totalNum" :maxlength="20" placeholder="请输入发放总量" style="width: 220px;"></el-input>
            </el-form-item>
            <el-form-item size="small" label="起用金额" prop="fullMoney">
              <el-input v-model="dataInfo.fullMoney" placeholder="请输入起用金额" style="width: 220px;"></el-input>
            </el-form-item>
            <el-form-item label="城市" prop="cityIds">
              <el-radio-group v-model="cityType">
                <el-radio :label="0">不限城市</el-radio>
                <el-radio :label="1">限城市</el-radio>
              </el-radio-group>
              <div class="checkbox_group cityLimit" v-if="cityType === 1">
                <el-checkbox-group v-model="dataInfo.cityIds">
                  <el-checkbox
                    v-for="item in dataInfo.cityList"
                    :key="item.cityId"
                    :label="item.cityId">{{item.cityName}}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </el-form-item>
            <el-form-item size="small" label="抵扣类型" prop="deductibleType">
              <el-select
                v-model="dataInfo.deductibleType" placeholder="请选择抵扣类型" clearable style="width: 220px;">
                <el-option label="房租" :value="0"></el-option>
                <el-option label="手续费" disabled :value="1"></el-option>
                <el-option label="水电费" disabled :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="房源类型" prop="housingType">
              <el-checkbox-group v-model="dataInfo.housingType">
                <el-checkbox label="estate">集中式</el-checkbox>
                <el-checkbox label="hostingHouse">分散式</el-checkbox>
                <el-checkbox label="fhd">飞虎队</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="券生效日期" prop="effectiveDate">
              <el-radio-group v-model="dataInfo.effectiveDate.type">
                <el-radio :label="1">领取日</el-radio>
                <el-radio :label="2">固定生效日</el-radio>
              </el-radio-group>
              <div class="date" v-if="dataInfo.effectiveDate.type === 2">
                <el-date-picker
                  size="small"
                  type="datetime"
                  v-model="dataInfo.effectiveDate.fixedDate"
                  key="effectiveDate"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择生效日期">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="券失效日期" prop="expirationDate">
              <el-radio-group v-model="dataInfo.expirationDate.type">
                <el-radio :label="1">固定有效天数</el-radio>
                <el-radio :label="2">固定失效日</el-radio>
              </el-radio-group>
              <div class="day" v-if="dataInfo.expirationDate.type === 1">
                <el-input size="small" style="width: 220px;" v-model="dataInfo.expirationDate.days" placeholder="请输入固定有效天数"></el-input>
              </div>
              <div class="date" v-if="dataInfo.expirationDate.type === 2">
                <el-date-picker
                  size="small"
                  type="datetime"
                  v-model="dataInfo.expirationDate.fixedDate"
                  key="expirationDate"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择失效日期">
                </el-date-picker>
              </div>
            </el-form-item>
          </el-collapse-item>
        </el-collapse>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="voucherDialog.show = false">取 消</el-button>
      <el-button size="small" type="primary" @click="saveData">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'addEditVoucher',
  props: {
    voucherData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    const validateEffectiveDate = (rule, obj, callback) => {
      if (!obj.type) {
        callback(new Error('请选择'))
      } else {
        if (obj.type === 2 && !obj.fixedDate) {
          callback(new Error('请选择生效日期'))
        }
        callback()
      }
    }
    const validateExpirationDate = (rule, obj, callback) => {
      if (!obj.type) {
        return callback(new Error('请选择'))
      }
      if (obj.type === 2 && !obj.fixedDate) {
        return callback(new Error('请选择失效日期'))
      } else if (obj.type === 1 && !obj.days) {
        return callback(new Error('请输入固定天数'))
      }
      callback()
    }
    const validateCity = (rule, value, callback) => {
      if (this.cityType === '') {
        return callback(new Error('请选择'))
      }
      if (this.cityType === 1 && !value.length) {
        return callback(new Error('请选择城市'))
      }
      callback()
    }
    return {
      rules: {
        couponName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        discountAmount: [
          { required: true, message: '请输入面值', trigger: 'blur' }
        ],
        triggerType: [
          { required: true, message: '请选择触发类型', trigger: 'change' }
        ],
        couponDesc: [
          { required: true, message: '请输入使用说明', trigger: 'change' }
        ],
        totalNum: [
          { required: true, message: '请输入发放总量', trigger: 'blur' }
        ],
        fullMoney: [
          { required: true, message: '请输入起用金额', trigger: 'blur' }
        ],
        deductibleType: [
          { required: true, message: '请选择抵扣类型', trigger: 'blur' }
        ],
        housingType: [
          { required: true, type: 'array', message: '请选择房源类型', trigger: 'change' }
        ],
        effectiveDate: [
          { required: true, type: 'object', validator: validateEffectiveDate, trigger: 'change' }
        ],
        expirationDate: [
          { required: true, type: 'object', validator: validateExpirationDate, trigger: 'change' }
        ],
        cityIds: [
          { required: true, type: 'array', validator: validateCity, trigger: 'change' }
        ]
      },
      voucherDialog: {
        show: true,
        title: '',
        activeName: 'baseInfo'
      },
      dataInfo: {
        effectiveDate: {},
        expirationDate: {}
      },
      dateTime: '',
      dateTime1: '',
      cityType: ''
    }
  },
  created() {
    this.$set(this.voucherDialog, 'title', `${this.voucherData.dialogtTitle}抵扣券`)
    this.$set(this, 'dataInfo', {
      effectiveDate: this.voucherData.effectiveDate || {},
      expirationDate: this.voucherData.expirationDate || {},
      housingType: this.voucherData.housingType || [],
      cityIds: this.voucherData.cityIds || [],
      ...this.voucherData
    })
  },
  methods: {
    closeDialog() {
      this.$refs['dataInfo'].clearValidate()
      this.emitEventHandler('closeVoucher', 'addEditVoucher')
    },
    emitEventHandler(event) {
      this.$emit(event, ...Array.from(arguments).slice(1))
    },
    saveData() {
      this.$refs.dataInfo.validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
.baseInfo {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-form-item {
    width: 50%;
    &.large {
      width: 100%;
    }
  }
}
.cityLimit .el-checkbox {
  width: 120px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-right: 20px;
  margin-left: 0;
}
</style>

