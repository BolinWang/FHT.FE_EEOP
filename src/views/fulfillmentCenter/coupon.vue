<template>
    <div class="app-container">
        <div class="model-search clearfix">
           <el-form size="small" :inline="true" :model="formData">
                <el-input size="small" v-model="formData.keyword" placeholder="优惠券名称"
                    style="width:260px;"
                    @keydown.native.enter="searchParam">
                </el-input>
                <el-select size="small" v-model="formData.type"
                    placeholder="状态" class="item-select" style="width: 120px;"
                    clearable>
                    <el-option
                        v-for="item in typeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-select size="small" v-model="formData.feeType"
                    placeholder="费用类型" class="item-select" style="width: 120px;"
                    clearable>
                    <el-option
                        v-for="item in feeTypeOpts"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" size="small" icon="el-icon-search" @click.native="searchParam" v-waves class="filter-item">查询</el-button>
                <el-button plain size="small" icon="el-icon-remove-outline" @click.native="clearForm">清空</el-button>
                <el-button class="right" type="primary" size="small" icon="el-icon-circle-plus-outline" @click.native="addCoupon">创建优惠券</el-button>
            </el-form>
        </div>
        <div class="model-table" :style="tableStyle">
            <el-table
                :data="tableData"
                v-loading.body="listLoading"
                :max-height="tableHeight"
                size="small"
                fit stripe highlight-current-row>
                <el-table-column type="index" width="60" align="center"></el-table-column>
                <el-table-column v-for="(item,index) in colModels"
                    :label="item.label"
                    :width="item.width"
                    :key="index"
                    fit
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-tag v-if="item.type == 'status'"
                            :type="scope.row[item.prop] | tagFilter">
                            {{scope.row[item.prop] | statusFilter(item.prop)}}
                        </el-tag>
                        <span v-else>
                            {{scope.row[item.prop]}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="220">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="small" @click.native="editData(scope.$index,scope.row)">编辑</el-button>
                         <el-button type="success" icon="el-icon-success" size="small" @click.native="changeState(scope.row,0)">激活</el-button>
                        <el-button type="danger" v-if="false" icon="el-icon-error" size="small" @click.native="changeState(scope.row,1)">停用</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="model-pagination">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="pageItems.pageNo"
                :page-sizes="pageSizeList"
                :page-size="pageItems.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
        <div class="dialog-info">
            <el-dialog
                title="创建优惠券"
                :visible.sync="layer_showInfo" width="800px"
                @close="dialogClose">
                <el-form size="small" status-icon :model="dialogForm" :rules="rules" ref="dialogForm" label-width="140px">
                    <el-form-item label="优惠券名称" prop="name">
                        <el-input v-model.trim="dialogForm.name"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="优惠券类型" prop="type">
                        <el-radio v-model="dialogForm.type"
                                label="1" :disabled="isDisabled">代金券</el-radio>
                    </el-form-item>
                    <div class="clearfix">
                        <el-col :span="10">
                            <el-form-item label="券总数" prop="count">
                                <el-input v-model.trim="dialogForm.count" :disabled="isDisabled">
                                    <template slot="append">张</template>
                                 </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" v-if="isActive" >
                            <el-form-item label="再增加" prop="addCount" label-width="100px">
                                <el-input v-model.trim="dialogForm.addCount" >
                                     <template slot="append">张</template>
                                 </el-input>
                            </el-form-item>
                        </el-col>
                    </div>
                    <div class="clearfix">
                        <el-col :span="10">
                            <el-form-item label="每人累计领取上限" prop="type1">
                                <el-select size="small"
                                    v-model="dialogForm.type1"
                                    placeholder="状态"
                                    :disabled="isDisabled" class="item-select"
                                    >
                                    <el-option
                                        v-for="item in restrictionOpts"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" v-if="dialogForm.type1 == 1">
                            <el-form-item label="每人" prop="count1" label-width="100px">
                                <el-input v-model.trim="dialogForm.count1" :disabled="isDisabled">
                                    <template slot="append">张</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </div>
                    <div class="clearfix">
                        <el-col :span="10">
                            <el-form-item label="券使用费用类型" prop="type2">
                                <el-select size="small"
                                    v-model="dialogForm.type2"
                                    placeholder="请选择"
                                    :disabled="isDisabled"
                                    class="item-select"
                                    >
                                    <el-option
                                        v-for="item in feeTypeOpts"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </div>
                    <div class="clearfix">
                        <el-col :span="10">
                            <el-form-item label="券面值" prop="count2">
                                <el-input v-model.trim="dialogForm.count2" :disabled="isDisabled">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </div>
                    <div class="clearfix">
                        <el-col :span="10">
                            <el-form-item label="最低消费金额" prop="type3">
                                <el-select size="small"
                                    v-model="dialogForm.type3"
                                    placeholder="请选择"
                                    :disabled="isDisabled"
                                    class="item-select"
                                    >
                                    <el-option
                                        v-for="item in priceOpts"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" v-if="dialogForm.type3 == 1">
                            <el-form-item label="" prop="count3" label-width="10px">
                                <el-input v-model.trim="dialogForm.count3" :disabled="isDisabled">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </div>
                    <div class="clearfix">
                        <el-col :span="10">
                            <el-form-item label="券使用有效期" prop="type4">
                                <el-select size="small"
                                    v-model="dialogForm.type4"
                                    placeholder="请选择"
                                    :disabled="isDisabled"
                                    class="item-select"
                                    >
                                    <el-option
                                        v-for="item in timeOpts"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="14" v-if="dialogForm.type4 == 1">
                            <el-form-item label="" prop="time" label-width="10px">
                                <el-date-picker
                                  type="datetimerange"
                                  :disabled="isDisabled"
                                  v-model="dialogForm.time"
                                  range-separator="至"
                                  start-placeholder="开始日期"
                                  end-placeholder="结束日期"
                                  align="right">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </div>
                    <div class="clearfix">
                        <el-col :span="10">
                            <el-form-item label="券不可用日期" prop="type5">
                                <el-select size="small"
                                    v-model="dialogForm.type5"
                                    placeholder="请选择"
                                    :disabled="isDisabled"
                                    class="item-select"
                                    >
                                    <el-option
                                        label="不限制"
                                        value="1">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </div>
                    <div class="clearfix">
                        <el-col :span="10">
                            <el-form-item label="券使用时间段" prop="type6">
                                <el-select size="small"
                                    v-model="dialogForm.type6"
                                    placeholder="请选择"
                                    :disabled="isDisabled"
                                    class="item-select"
                                    >
                                    <el-option
                                        label="不限制"
                                        value="1">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </div>
                    <el-form-item label="券使用说明">
                        <el-input
                          type="textarea"
                          :rows="2"
                          :maxlength="150"
                          v-model.trim="dialogForm.desc"
                          placeholder="请输入内容最多150个字符"
                          >
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogClose;layer_showInfo=false" size="small">取 消</el-button>
                    <el-button type="primary" @click="saveData" size="small">确定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>

</template>

<script>
    import waves from '@/directive/waves' // 水波纹指令
    import { parseTime, ObjectMap, deepClone } from '@/utils'
    import { initOrgListApi } from '@/api/userManage'
    export default {
      name: 'promotions',
      directives: { waves },
      filters: {
        tagFilter(val) {
          const filterObj = {
            '0': 'info',
            '1': 'success',
            '2': 'success'
          }
          return filterObj[val] || 'info'
        },
        statusFilter(val, item) {
          const filterObj = {
            'lookHouseStatus': ['未带看', '带看中', '已带看'],
            'lookHouseResult': ['未签约', '已签约']
          }
          return filterObj[item][val] || '未知'
        }
      },
      data() {
        // 包括非负整数
        const validateCount1 = (rule, value, callback) => {
          const r = /^\d+$/
          if (!r.test(value) || value > 100000000) {
            callback(new Error('请输入0 ~ 100,000,000的整数'))
          } else {
            callback()
          }
        }
        // 正整数
        const validateCount2 = (rule, value, callback) => {
          const r = /^\+?[1-9][0-9]*$/
          if (!r.test(value) || value > 100) {
            callback(new Error('请输入1 ~ 100的整数'))
          } else {
            callback()
          }
        }
        // 两位小数
        const validateCount3 = (rule, value, callback) => {
          const r = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
          if (!r.test(value)) {
            callback(new Error('请输入1 ~ 10,000的数字，最多两位小数'))
          } else {
            callback()
          }
        }
        return {
          rules: {
            name: [
              { required: true, message: '请输入优惠券名称', trigger: 'blur' },
              { min: 1, max: 50, message: '最多输入50个字符', trigger: 'blur' }
            ],
            type: [
              { required: true, message: '请选择优惠券类型', trigger: 'change' }
            ],
            count: [
              { required: true, message: '请输入券总数', trigger: 'blur' },
              { validator: validateCount1, trigger: 'blur' }
            ],
            addCount: [
              { required: true, message: '请输入再增加数量', trigger: 'blur' },
              { validator: validateCount1, trigger: 'blur' }
            ],
            count1: [
              { required: true, message: '请输入每人限领数量', trigger: 'blur' },
              { validator: validateCount2, trigger: 'blur' }
            ],
            count2: [
              { required: true, message: '请输入券面值', trigger: 'blur' },
              { validator: validateCount3, trigger: 'blur' }
            ],
            count3: [
              { required: true, message: '请选择最低消费金额', trigger: 'blur' },
              { validator: validateCount3, trigger: 'blur' }
            ],
            type1: [
              { required: true, message: '请选择每人累计领取上限', trigger: 'blur' }
            ],
            type2: [
              { required: true, message: '请选择券使用费用类型', trigger: 'change' }
            ],
            type3: [
              { required: true, message: '请选择最低消费金额', trigger: 'blur' }
            ],
            type4: [
              { required: true, message: '请选择券使用有效期', trigger: 'blur' }
            ],
            type5: [
              { required: true, message: '请选择券不可用日期', trigger: 'change' }
            ],
            type6: [
              { required: true, message: '请选择券使用时间段', trigger: 'change' }
            ],
            time: [
              { required: true, message: '请选择券时间', trigger: 'change' }
            ]
          },
          typeOptions: [
            { label: '未激活', value: 1 },
            { label: '已激活', value: 2 },
            { label: '已停用', value: 3 }
          ],
          feeTypeOpts: [
            { label: '房租', value: 1 },
            { label: '押金', value: 2 },
            { label: '电费', value: 3 },
            { label: '水费', value: 4 }
          ],
          restrictionOpts: [
            { label: '限制', value: 1 },
            { label: '不限制', value: 2 }
          ],
          priceOpts: [
            { label: '固定金额', value: 1 },
            { label: '不限制', value: 2 }
          ],
          timeOpts: [
            { label: '固定时间', value: 1 },
            { label: '不限制', value: 2 }
          ],
          formData: {
            keyword: '',
            type: '',
            feeType: '',
            organizationType: ''// 临时
          },
          pageItems: {
            pageNo: 1,
            pageSize: 20
          },
          dialogForm: {
            name: '',
            type: '1',
            type1: 1,
            type2: '',
            type3: 1,
            type4: 1,
            type5: '1',
            type6: '1',
            count: '',
            count1: '',
            count2: '',
            count3: '',
            time: [],
            startDate: '',
            endDate: ''
          },
          layer_showInfo: false,
          listLoading: false,
          isDisabled: false,
          isActive: false,
          colModels: [
            { prop: 'userName', label: '创建时间' },
            { prop: 'userMobile', label: '优惠券名称' },
            { prop: 'bookingTime', label: '状态', width: 100 },
            { prop: 'roomAddr', label: '优惠批次编码' },
            { prop: 'serverName', label: '优惠券类型', width: 100 },
            { prop: 'serverMobile', label: '费用类型', width: 100 },
            { prop: 'lookHouseStatus', label: '优惠金额', width: 100 },
            { prop: 'lookHouseResult', label: '上限数量', width: 100 },
            { prop: 'lookHouseResult', label: '领取数量', width: 100 },
            { prop: 'lookHouseResult', label: '使用数量', width: 100 },
            { prop: 'lookHouseResult', label: '实际补贴金额', width: 100 }
          ],
          tableHeight: 300,
          tableData: [],
          pageSizeList: [10, 20, 30, 50],
          total: null
        }
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
          this.getGridData(this.pageItems)
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
        getGridData(parm) {
          this.listLoading = true
          this.searchParams = Object.assign(deepClone(parm), deepClone(this.formData))
          initOrgListApi(ObjectMap(this.searchParams)).then(response => {
            this.listLoading = false
            this.tableData = response.data.list
            this.total = response.data.record
          })
        },
        saveData() {
          this.$refs.dialogForm.validate((valid) => {

          })
        },
        searchParam() {
          this.pageItems = {
            pageNo: 1,
            pageSize: 20
          }
          this.getGridData(this.pageItems)
        },
        clearForm() {
          this.pageItems = {
            pageNo: 1,
            pageSize: 20
          }
          this.formData = {
            searchField: '',
            organizationType: 2
          }
          this.getGridData(this.pageItems)
        },
        addCoupon() {
          this.layer_showInfo = true
        },
        clearDialog() {
          this.dialogForm = {
            name: '',
            type: '1',
            type1: 1,
            type2: '',
            type3: 1,
            type4: 1,
            type5: '1',
            type6: '1',
            count: '',
            count1: '',
            count2: '',
            count3: '',
            time: [],
            startDate: '',
            endDate: ''
          }
        },
        editData(index, row) {
          this.isActive = true
          this.layer_showInfo = true
          this.isDisabled = !!this.isActive
          this.dialogForm = {
            name: '新的优惠券',
            type: '1',
            type1: 1,
            type2: 1,
            type3: 1,
            type4: 1,
            type5: '1',
            type6: '1',
            count: '333',
            count1: '44',
            count2: '33',
            count3: '33',
            startDate: '2018-03-17 00:00:00',
            endDate: '2018-03-19 00:00:00'
          }
          this.dialogForm.time = [this.dialogForm.startDate, this.dialogForm.endDate]
        },
        changeState(row, index) {
          const tips = [
            '确定要激活优惠券吗？激活后，部分信息将无法编辑，用户可以开始领取优惠券',
            '确定要停用吗？停用后，用户将无法从此优惠券库中领取优惠券，已经领取的优惠券还可以正常使用'
          ]
          this.$confirm(tips[index], '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {

          }).catch(() => {

          })
        },
        dialogClose() {
          this.$refs.dialogForm.clearValidate()
          this.clearDialog()
        },
        handleSizeChange(val) {
          this.pageItems.pageSize = val
          this.getGridData(this.pageItems)
        },
        handleCurrentChange(val) {
          this.pageItems.pageNo = val
          this.getGridData(this.pageItems)
        }
      },
      watch: {
        'dialogForm.time'(val) {
          val = val || []
          this.dialogForm.startDate = val[0] ? parseTime(val[0]) : ''
          this.dialogForm.endDate = val[1] ? parseTime(val[1]) : ''
        }
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .textRight {
        text-align: right;
        padding-right: 10px;
    }
</style>
