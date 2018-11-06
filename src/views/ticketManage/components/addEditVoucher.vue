<template>
  <el-dialog
    :title="voucherDialog.title"
    :visible.sync="voucherDialog.show"
    @close="closeDialog"
    width="600px">
    <div class="voucherContent">
      <el-collapse v-model="voucherDialog.activeName" accordion>
        <el-collapse-item title="基础信息" name="baseInfo">
          <el-form
            size="small" class="baseInfo"
            :model="baseInfo" :rules="rules" ref="baseInfo" label-width="100px">
            <el-form-item label="名称" prop="name">
              <el-input v-model="baseInfo.name" :maxlength="20" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="面值" prop="name">
              <el-input v-model="baseInfo.name" placeholder="请输入面值"></el-input>
            </el-form-item>
            <el-form-item label="触发条件" prop="name">
              <el-select
                v-model="baseInfo.name" placeholder="请选择触发条件" clearable style="width: 100%;">
                <el-option label="无" :value="0"></el-option>
                <el-option label="注册" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="desc">
              <el-input v-model="baseInfo.desc" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="使用说明" prop="desc" class="large">
              <el-input type="textarea" placeholder="请输入使用说明" v-model="baseInfo.desc" :maxlength="200"></el-input>
            </el-form-item>
          </el-form>
        </el-collapse-item>
        <el-collapse-item title="限制条件" name="limitInfo">
          <el-form :model="limitInfo" :rules="rules" ref="limitInfo" label-width="100px">
            <el-form-item size="small" label="发放总量" prop="name">
              <el-input v-model="limitInfo.name" :maxlength="20" placeholder="请输入发放总量" style="width: 220px;"></el-input>
            </el-form-item>
            <el-form-item size="small" label="起用金额" prop="name">
              <el-input v-model="limitInfo.name" placeholder="请输入起用金额" style="width: 220px;"></el-input>
            </el-form-item>
            <el-form-item label="城市" prop="resource">
              <el-radio-group v-model="limitInfo.resource">
                <el-radio label="不限城市"></el-radio>
                <el-radio label="限城市"></el-radio>
              </el-radio-group>
              <div class="checkbox_group">
                <el-checkbox-group>
                  <el-checkbox label="上海"></el-checkbox>
                  <el-checkbox label="杭州"></el-checkbox>
                  <el-checkbox label="北京"></el-checkbox>
                </el-checkbox-group>
              </div>
            </el-form-item>
            <el-form-item size="small" label="抵扣类型" prop="name">
              <el-select
                v-model="limitInfo.name" placeholder="请选择抵扣类型" clearable style="width: 220px;">
                <el-option label="房租" :value="0"></el-option>
                <el-option label="手续费" :value="1"></el-option>
                <el-option label="水电费" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="抵扣类型" prop="name">
              <el-checkbox-group>
                <el-checkbox label="集中式"></el-checkbox>
                <el-checkbox label="分散式"></el-checkbox>
                <el-checkbox label="飞虎队"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="券生效日期" prop="resource">
              <el-radio-group v-model="limitInfo.resource">
                <el-radio label="领取日"></el-radio>
                <el-radio label="固定生效日"></el-radio>
              </el-radio-group>
              <div class="date">
                <el-date-picker
                  size="small"
                  type="date"
                  placeholder="选择生效日期">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="券失效日期" prop="resource">
              <el-radio-group v-model="limitInfo.resource">
                <el-radio label="固定有效天数"></el-radio>
                <el-radio label="固定失效日"></el-radio>
              </el-radio-group>
              <div class="day">
                <el-input size="small"  style="width: 220px;" v-model="limitInfo.name" placeholder="请输入固定有效天数"></el-input>
              </div>
              <div class="date">
                <el-date-picker
                  size="small"
                  type="date"
                  placeholder="选择失效日期">
                </el-date-picker>
              </div>
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="voucherDialog.show = false">取 消</el-button>
      <el-button size="small" type="primary" @click="voucherDialog.show = false">确 定</el-button>
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
    return {
      rules: {
        number: [
          { required: true, message: '请输入。。。' },
          { type: 'number', message: '请输入数字' }
        ]
      },
      voucherDialog: {
        show: true,
        title: '',
        activeName: 'baseInfo'
      },
      baseInfo: {},
      limitInfo: {}
    }
  },
  created() {
    this.$set(this.voucherDialog, 'title', `${this.voucherData.dialogtTitle}抵扣券`)
    this.$set(this, 'baseInfo', this.voucherData.baseInfo || {})
    this.$set(this, 'limitInfo', this.voucherData.limitInfo || {})
  },
  methods: {
    closeDialog() {
      this.$refs['baseInfo'].clearValidate()
      this.$refs['limitInfo'].clearValidate()
      this.emitEventHandler('closeVoucher', 'addEditVoucher')
    },
    emitEventHandler(event) {
      this.$emit(event, ...Array.from(arguments).slice(1))
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
</style>

