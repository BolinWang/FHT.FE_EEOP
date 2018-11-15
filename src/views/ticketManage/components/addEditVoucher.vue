<template>
  <el-dialog
    :title="voucherDialog.title"
    :visible.sync="voucherDialog.show"
    :before-close="beforeCloseDialog"
    @close="closeDialog"
    width="600px">
    <div class="voucherContent">
      <el-form
        :disabled="voucherData.dialogtTitle === '查看'"
        size="small"
        :model="dataInfo" :rules="rules" ref="dataInfo" label-width="100px">
        <el-collapse v-model="voucherDialog.activeName" accordion>
          <el-collapse-item name="baseInfo">
            <template slot="title">
              基础信息
              <div class="dataInfo_title right" :style="computedInfoColor('baseInfo')" v-if="EVPI !== 'EVPI'">
                <i :class="{
                  'el-icon-success': !EVPI.includes('baseInfo'),
                  'el-icon-error': EVPI.includes('baseInfo')
                }"></i>
                {{EVPI.includes('baseInfo') ? '信息未完善' : '信息已完善'}}
              </div>
            </template>
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
                  <el-option label="无" value="无"></el-option>
                  <el-option label="注册" value="注册"></el-option>
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
          <el-collapse-item name="limitInfo">
            <template slot="title">
              限制条件
              <div class="dataInfo_title right" :style="computedInfoColor('limitInfo')" v-if="EVPI !== 'EVPI'">
                <i :class="{
                  'el-icon-success': !EVPI.includes('limitInfo'),
                  'el-icon-error': EVPI.includes('limitInfo')
                }"></i>
                {{EVPI.includes('limitInfo') ? '信息未完善' : '信息已完善'}}
              </div>
            </template>
            <el-form-item size="small" label="发放总量" prop="totalNum">
              <el-input v-model="dataInfo.totalNum" :maxlength="20" placeholder="请输入发放总量" style="width: 220px;"></el-input>
            </el-form-item>
            <el-form-item size="small" label="起用金额" prop="fullMoney">
              <el-input v-model="dataInfo.fullMoney" placeholder="请输入起用金额" style="width: 220px;"></el-input>
            </el-form-item>
            <el-form-item size="small" label="起用租期" prop="monthNum">
              <el-slider
                v-model="dataInfo.monthNum"
                :max="24"
                :format-tooltip="formatTooltip"
                show-input>
              </el-slider>
            </el-form-item>
            <el-form-item label="城市" prop="cityIds">
              <el-radio-group v-model="cityType">
                <el-radio :label="0">不限城市</el-radio>
                <el-radio :label="1">限城市</el-radio>
              </el-radio-group>
              <div class="checkbox_group cityLimit" v-if="cityType === 1">
                <el-select v-model="dataInfo.cityIds" multiple clearable filterable placeholder="请选择限制城市，可搜索快速匹配" style="width: 100%;">
                  <el-option
                    v-for="item in dataInfo.cityList"
                    :key="item.cityId"
                    :label="item.cityName"
                    :value="item.cityId">
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
            <el-form-item size="small" label="抵扣类型" prop="deductibleType">
              <el-select
                v-model="dataInfo.deductibleType" placeholder="请选择抵扣类型" clearable style="width: 220px;">
                <el-option label="房租" value="房租"></el-option>
                <el-option label="手续费" disabled value="手续费"></el-option>
                <el-option label="水电费" disabled value="水电费"></el-option>
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
      <el-button size="small" @click="voucherDialog.show = false">{{voucherData.dialogtTitle === '查看' ? '关 闭' : '取消'}}</el-button>
      <el-button v-if="voucherData.dialogtTitle !== '查看'" size="small" type="primary" @click="saveData">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { voucherManageApi } from '@/api/ticketManage'
import { ObjectMap } from '@/utils'
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
    const validateInteger = (rule, value, callback) => {
      value = value * 1
      if (!Number.isInteger(value) || value < 0) {
        return callback(new Error('请输入正整数'))
      }
      if (value > 100000) {
        return callback(new Error('不能大于100000'))
      }
      callback()
    }
    const validateDeci = (rule, value, callback) => {
      value = value * 1
      const reg = /^\d+(\.\d{1,2})?$/
      if (!reg.test(value)) {
        return callback(new Error('请输入精度为两位小数内的正数'))
      }
      callback()
    }
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
      }
      if (obj.type === 1) {
        if (!obj.days) {
          return callback(new Error('请输入固定天数'))
        }
        if (!Number.isInteger(obj.days * 1) || obj.days * 1 < 0) {
          return callback(new Error('请输入正整数'))
        }
        if (obj.days * 1 > 100000) {
          return callback(new Error('不能大于100000'))
        }
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
      EVPI: 'EVPI',
      rules: {
        couponName: [
          { required: true, message: '请输入名称', trigger: 'blur', baseForm: 'baseInfo' }
        ],
        discountAmount: [
          { required: true, message: '请输入面值', trigger: 'blur', baseForm: 'baseInfo' },
          { validator: validateInteger, trigger: 'blur' }
        ],
        triggerType: [
          { required: true, message: '请选择触发类型', trigger: 'change', baseForm: 'baseInfo' }
        ],
        couponDesc: [
          { required: true, message: '请输入使用说明', trigger: 'change', baseForm: 'baseInfo' }
        ],
        totalNum: [
          { required: true, message: '请输入发放总量', trigger: 'blur', baseForm: 'limitInfo' },
          { validator: validateInteger, trigger: 'blur' }
        ],
        fullMoney: [
          { required: true, message: '请输入起用金额', trigger: 'blur', baseForm: 'limitInfo' },
          { validator: validateDeci, trigger: 'blur' }
        ],
        // monthNum: [
        //   { required: true, message: '请完善起用租期', trigger: 'blur', baseForm: 'limitInfo' }
        // ],
        deductibleType: [
          { required: true, message: '请选择抵扣类型', trigger: 'blur', baseForm: 'limitInfo' }
        ],
        housingType: [
          { required: true, type: 'array', message: '请选择房源类型', trigger: 'change', baseForm: 'limitInfo' }
        ],
        effectiveDate: [
          { required: true, type: 'object', validator: validateEffectiveDate, trigger: 'change', baseForm: 'limitInfo' }
        ],
        expirationDate: [
          { required: true, type: 'object', validator: validateExpirationDate, trigger: 'change', baseForm: 'limitInfo' }
        ],
        cityIds: [
          { required: true, type: 'array', validator: validateCity, trigger: 'change', baseForm: 'limitInfo' }
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
      cityType: ''
    }
  },
  computed: {
    computedInfoColor() {
      return str => {
        return {
          color: this.EVPI.includes(str) ? '#F56C6C' : '#67C23A'
        }
      }
    }
  },
  created() {
    const cityIds = (this.voucherData.cityIds || []).map(item => item * 1)
    this.$set(this.voucherDialog, 'title', `${this.voucherData.dialogtTitle}抵扣券`)
    this.$set(this, 'dataInfo', {
      ...this.voucherData
    })
    this.$set(this.dataInfo, 'cityIds', cityIds)
    this.$set(this.dataInfo, 'monthNum', this.dataInfo.monthNum * 1)
    this.$set(this.dataInfo, 'housingType', this.voucherData.housingType || [])
    this.$set(this.dataInfo, 'effectiveDate', this.voucherData.effectiveDate || {})
    this.$set(this.dataInfo, 'expirationDate', this.voucherData.expirationDate || {})
    this.$set(this, 'cityType', this.dataInfo.cityIds.length ? 1 : 0)
    if (this.dataInfo.expirationDate.type === 1) {
      this.$set(this.dataInfo.expirationDate, 'days', (this.dataInfo.expirationDate.days || '') + '')
    }
  },
  methods: {
    formatTooltip(val) {
      return `${val}个月`
    },
    beforeCloseDialog(done) {
      if (this.voucherData.dialogtTitle === '查看') {
        done()
        return false
      }
      this.$confirm('您有信息未保存，确认退出？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        done()
      }).catch()
    },
    closeDialog() {
      this.$refs['dataInfo'].clearValidate()
      this.emitEventHandler('closeVoucher', 'addEditVoucher')
    },
    emitEventHandler(event) {
      this.$emit(event, ...Array.from(arguments).slice(1))
    },
    saveData() {
      this.$refs.dataInfo.validate((valid, obj) => {
        if (valid) {
          const cityNames = this.dataInfo.cityList.filter(item => {
            return this.dataInfo.cityIds.find(cityId => item.cityId === cityId)
          }).map(item => item.cityName)
          voucherManageApi.saveCoupon(ObjectMap({
            couponType: 1,
            ...this.dataInfo,
            deductibleType: this.dataInfo.deductibleType.split(','),
            triggerType: this.dataInfo.triggerType.split(','),
            cityNames: this.cityType ? cityNames : [],
            expirationDate: ObjectMap({
              ...this.dataInfo.expirationDate,
              days: this.dataInfo.expirationDate.type === 1 ? this.dataInfo.expirationDate.days : undefined,
              fixedDate: this.dataInfo.expirationDate.type === 2 ? this.dataInfo.expirationDate.fixedDate : undefined
            }),
            effectiveDate: ObjectMap({
              ...this.dataInfo.effectiveDate,
              fixedDate: this.dataInfo.effectiveDate.type === 2 ? this.dataInfo.effectiveDate.fixedDate : undefined
            }),
            cityList: undefined,
            monthNum: this.dataInfo.monthNum + ''
          })).then(res => {
            this.$message.success('保存成功')
            this.emitEventHandler('closeVoucher', 'addEditVoucher', true)
          })
        } else {
          this.$message.error('您还有信息未完善~')
          const unvalidateList = []
          Object.keys(obj).map(item => {
            unvalidateList.push(this.rules[item][0].baseForm)
          })
          this.EVPI = [...new Set(unvalidateList)].join(',')
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

