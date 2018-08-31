<template>
  <div>
    <el-form :model="defaultRentPayForm" ref="financeRentPayForm" label-width="0">
      <el-table class="finance-rent-pay-way" :data="defaultRentPayForm.financeRentPayList" style="width: 100%" empty-text="暂无金融·交租方式">
        <el-table-column label="金融·交租方式" width="130">
          <template slot-scope="scope">
            {{scope.row.name}}
          </template>
        </el-table-column>
        <el-table-column label="房价/月">
          <template slot-scope="scope">
            <el-form-item label="" :key="scope.row.roomRentTypeId" :prop="'financeRentPayList.' + scope.$index + '.rentPrice'" :rules="defaultRentPayForm.rules.rentPrice">
              <el-input size="mini" v-model="scope.row.rentPrice" class="rent-price-input">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="押金">
          <template slot-scope="scope">
            <el-form-item label="" :key="scope.row.roomRentTypeId" :prop="'financeRentPayList.' + scope.$index + '.depositPrice'" :rules="defaultRentPayForm.rules.depositPrice">
              <el-input size="mini" v-model="scope.row.depositPrice" class="rent-price-input">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="最短租期" width="100">
          <template slot-scope="scope">
            <el-select size="mini" v-model="scope.row.minMonthNum" disabled>
              <el-option v-for="n in 24" :key="n" :label="n + '个月'" :value="n">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="最长租期" width="100">
          <template slot-scope="scope">
            <el-select size="mini" v-model="scope.row.maxMonthNum" disabled>
              <el-option v-for="n in 24" :key="n" :label="n + '个月'" :value="n">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <template v-if="curRoomFinanceType !== 2">
          <el-table-column label="服务费·元/月" width="130">
            <template slot-scope="scope">
              <el-select size="mini" v-model="scope.row.serviceChargeType" @change="switchServiceChargeType(scope.row)" disabled>
                <el-option v-for="n in serviceChargeTypeList" :key="n.value" :label="n.label" :value="n.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="" width="140">
            <template slot-scope="scope">
              <el-row>
                <el-col :span="24" v-if="scope.row.serviceChargeType === 2">
                  <el-form-item label="" :key="scope.row.roomRentTypeId" :prop="'financeRentPayList.' + scope.$index + '.serviceChargePrice'" :rules="defaultRentPayForm.rules.serviceChargePrice">
                    <el-input size="mini" type="number" v-model="scope.row.serviceChargePrice" disabled></el-input>
                  </el-form-item>
                </el-col>
                <template v-else-if="scope.row.serviceChargeType === 3">
                  <el-col :span="10">
                    <el-form-item label="" :key="scope.row.roomRentTypeId" :prop="'financeRentPayList.' + scope.$index + '.serviceChargeRatio'" :rules="defaultRentPayForm.rules.serviceChargeRatio">
                      <el-input size="mini" v-model="scope.row.serviceChargeRatio" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="service-charge-price-percent">
                    %
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="" :key="scope.row.roomRentTypeId" :prop="'financeRentPayList.' + scope.$index + '.serviceChargePrice'" :rules="defaultRentPayForm.rules.serviceChargePrice">
                      <el-input size="mini" v-model="scope.row.serviceChargePrice" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </template>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column label="服务费支付方式" width="130">
            <template slot-scope="scope">
              <el-select size="mini" v-model="scope.row.serviceFeeType" disabled>
                <el-option v-if="scope.row.serviceChargeType === 1" label="无" :value="1">
                </el-option>
                <el-option v-else v-for="n in serviceFeeTypeList" :key="n.value" :label="n.label" :value="n.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="" width="50">
          <template slot-scope="scope">
            <el-button v-show="false" class="delete-btn" type="text" icon="el-icon-delete" @click="deleteCurRentPay(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-form :model="defaultRentPayForm" ref="defaultRentPayForm" label-width="0">
      <el-table class="default-rent-pay-way" :data="defaultRentPayForm.defaultRentPayList" style="width: 100%" empty-text="暂无常规·交租方式">
        <el-table-column label="常规·交租方式" width="130">
          <template slot-scope="scope">
            <span v-if="scope.row.roomRentTypeId">
              {{scope.row.name}}
            </span>
            <el-form-item v-else label="" :key="scope.row.roomRentTypeId">
              <el-select v-model="scope.row.rentQty" size="mini" @change="switchRentType(scope.row)">
                <el-option v-for="n in baseRentTypeList" :key="n.rentQty" :label="n.name" :value="n.rentQty">
                </el-option>
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="房价/月">
          <template slot-scope="scope">
            <el-form-item label="" :key="scope.row.roomRentTypeId" :prop="'defaultRentPayList.' + scope.$index + '.rentPrice'" :rules="defaultRentPayForm.rules.rentPrice">
              <el-input size="mini" type="number" v-model="scope.row.rentPrice" class="rent-price-input" @change="computeServiceChargePrice(scope.row)">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="押金">
          <template slot-scope="scope">
            <el-form-item label="" :key="scope.row.roomRentTypeId" :prop="'defaultRentPayList.' + scope.$index + '.depositPrice'" :rules="defaultRentPayForm.rules.depositPrice">
              <el-input size="mini" type="number" v-model="scope.row.depositPrice" class="rent-price-input">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="最短租期" width="100">
          <template slot-scope="scope">
            <el-form-item label="" :key="scope.row.roomRentTypeId">
              <el-select size="mini" v-model="scope.row.minMonthNum">
                <el-option v-for="n in 24" :key="n" :label="n + '个月'" :value="n">
                </el-option>
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="最长租期" width="100">
          <template slot-scope="scope">
            <el-form-item label="" :key="scope.row.roomRentTypeId">
              <el-select size="mini" v-model="scope.row.maxMonthNum">
                <el-option v-for="n in 24" :key="n" :label="n + '个月'" :value="n">
                </el-option>
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <template v-if="curRoomFinanceType !== 2">
          <el-table-column label="服务费·元/月" width="130">
            <template slot-scope="scope">
              <el-form-item label="" :key="scope.row.roomRentTypeId">
                <el-select size="mini" v-model="scope.row.serviceChargeType" @change="switchServiceChargeType(scope.row)">
                  <el-option v-for="n in serviceChargeTypeList" :key="n.value" :label="n.label" :value="n.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="" width="140">
            <template slot-scope="scope">
              <el-row>
                <el-col :span="24" v-if="scope.row.serviceChargeType === 2">
                  <el-form-item label="" :key="scope.row.roomRentTypeId" :prop="'defaultRentPayList.' + scope.$index + '.serviceChargePrice'" :rules="defaultRentPayForm.rules.serviceChargePrice">
                    <el-input size="mini" type="number" v-model="scope.row.serviceChargePrice"></el-input>
                  </el-form-item>
                </el-col>
                <template v-else-if="scope.row.serviceChargeType === 3">
                  <el-col :span="10">
                    <el-form-item label="" :key="scope.row.roomRentTypeId" :prop="'defaultRentPayList.' + scope.$index + '.serviceChargeRatio'" :rules="defaultRentPayForm.rules.serviceChargeRatio">
                      <el-input size="mini" type="number" v-model="scope.row.serviceChargeRatio" @change="computeServiceChargePrice(scope.row)"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="service-charge-price-percent">
                    %
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="" :key="scope.row.roomRentTypeId" :prop="'defaultRentPayList.' + scope.$index + '.serviceChargePrice'" :rules="defaultRentPayForm.rules.serviceChargePrice">
                      <el-input size="mini" v-model="scope.row.serviceChargePrice" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </template>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column label="服务费支付方式" width="130">
            <template slot-scope="scope">
              <el-form-item label="" :key="scope.row.roomRentTypeId">
                <el-select size="mini" v-model="scope.row.serviceFeeType">
                  <el-option v-if="scope.row.serviceChargeType === 1" label="无" :value="1">
                  </el-option>
                  <el-option v-else v-for="n in serviceFeeTypeList" :key="n.value" :label="n.label" :value="n.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="" width="50">
          <template slot-scope="scope">
            <el-button class="delete-btn" type="text" icon="el-icon-delete" @click="deleteCurRentPay(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-button type="primary" size="mini" @click="addRentPay">添加交租方式</el-button>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: []
    },
    curRoomFinanceType: {
      type: Number,
      default: 1
    },
    baseRentTypeList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      rentPayList: [],
      serviceChargeTypeList: [
        {
          label: '无',
          value: 1
        },
        {
          label: '固定金额',
          value: 2
        },
        {
          label: '租金百分比',
          value: 3
        }
      ],
      serviceFeeTypeList: [
        {
          label: '随租金付',
          value: 2
        },
        {
          label: '一次性付清',
          value: 3
        }
      ]
    }
  },
  computed: {
    defaultRentPayForm() {
      return {
        financeRentPayList: this.rentPayList.filter((item) => item.type === 2),
        defaultRentPayList: this.rentPayList.filter((item) => item.type === 1),
        rules: {
          rentPrice: [
            { required: true, message: '请输入房价', trigger: 'blur' }
          ],
          depositPrice: [
            { required: true, message: '请输入押金', trigger: 'blur' }
          ],
          serviceChargePrice: [
            { required: true, message: '请输入服务费', trigger: 'blur' }
          ],
          serviceChargeRatio: [
            { required: true, message: '请输入租金百分比', trigger: 'blur' }
          ]
        }
      }
    }
  },
  methods: {
    addRentPay() {  // 添加交租方式
      this.rentPayList.push({
        depositPrice: '',
        depositQty: '',
        maxMonthNum: 12,
        minMonthNum: 1,
        name: "月付",
        rentPrice: '',
        rentQty: 1,
        rentTypeId: 1,
        roomId: this.rentPayList[0] ? this.rentPayList[0].roomId : undefined,
        roomRentTypeId: undefined,
        serviceChargePrice: null,
        serviceChargeRatio: null,
        serviceChargeType: 1,
        serviceFeeType: 1,
        type: 1
      })
    },
    computeServiceChargePrice(row) {
      if (row.serviceChargeType !== 3) {
        return
      }
      row.serviceChargePrice = row.serviceChargeRatio * row.rentPrice / 100
    },
    switchServiceChargeType(row) {
      row.serviceFeeType = row.serviceChargeType === 1 ? 1 : 2
    },
    switchRentType(row) {
      const tempArr = this.baseRentTypeList.filter((item) => item.rentQty === row.rentQty)
      Object.keys(tempArr[0]).forEach((key) => {
        if (key === 'baseRentTypeId') {
          row['rentTypeId'] = tempArr[0][key]
        } else {
          row[key] = tempArr[0][key]
        }
      })
      row.minMonthNum = row.rentQty
    },
    deleteCurRentPay(row) {
      this.$set(this, 'rentPayList', this.rentPayList.filter((item) => item != row))
    },
    returnRentPayList() {
      let list = false
      this.$refs.financeRentPayForm.validate((valid) => {
        if (valid) {
          this.$refs.defaultRentPayForm.validate((success) => {
            if (success) {
              list = this.rentPayList
            } else {
              // this.$message.error('请填写完交租方式再保存')
              return false
            }
          })
        } else {
          // this.$message.error('请填写完交租方式再保存')
          return false
        }
      })
      return list
    }
  },
  watch: {
    list: {
      immediate: true,
      handler: function (val) {
        this.rentPayList = val.slice()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.finance-rent-pay-way {
  margin-bottom: 15px;
  .service-charge-price-percent {
    line-height: 66px;
    text-align: center;
  }
}
.rent-pay-model-row {
  margin-bottom: 15px;
  .el-col {
    &:last-child {
      .delete-btn {
        padding: 3px 0;
        font-size: 18px;
        color: red;
      }
    }
  }
  .lease-term {
    width: 100px;
  }
}
.default-rent-pay-way {
  margin-bottom: 15px;
  .delete-btn {
    padding: 3px 0;
    font-size: 18px;
    color: red;
  }
  .service-charge-price-percent {
    line-height: 66px;
    text-align: center;
  }
}
</style>
