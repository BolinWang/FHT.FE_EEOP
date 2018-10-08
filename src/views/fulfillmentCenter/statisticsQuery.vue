<template>
    <div class="app-container">
        <div class="model-search clearfix">
            <el-form size="small" :inline="true" :model="formData">
                <div class="clearfix">
                    <el-input size="small" v-model="formData.code" 
                        placeholder="优惠批次编码"  
                        style="width:160px;"
                        @keydown.native.enter="searchParam">    
                    </el-input>
                    <el-input size="small" v-model="formData.mobile" 
                        placeholder="租客手机号码"  
                        style="width:130px;"
                        @keydown.native.enter="searchParam">    
                    </el-input>
                    <el-input size="small" v-model="formData.type1" 
                        placeholder="消费账单号"  
                        style="width:150px;"
                        @keydown.native.enter="searchParam">    
                    </el-input>
                    <el-select size="small" v-model="formData.type2" 
                        placeholder="优惠券状态" class="item-select" style="width: 120px;"
                        clearable>
                        <el-option
                            v-for="item in typeOpt1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select size="small" v-model="formData.type3" 
                        placeholder="费用类型" class="item-select" style="width: 100px;"
                        clearable>
                        <el-option
                            v-for="item in typeOpt2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select size="small" v-model="formData.type4" 
                        placeholder="获取渠道" class="item-select" style="width: 130px;"
                        clearable>
                        <el-option
                            v-for="item in typeOpt3"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button type="primary" size="small" icon="el-icon-search" @click.native="searchParam" v-waves class="filter-item">查询</el-button>
                    <el-button plain size="small" icon="el-icon-remove-outline" @click.native="clearForm">清空</el-button>
                </div>
                <div class="clearfix" style="margin-top: 10px;">
                    <el-date-picker
                      type="datetimerange"
                      v-model="date1"
                      range-separator="至"
                      size="small"
                      style="width:405px"
                      start-placeholder="领取开始日期"
                      end-placeholder="领取结束日期"
                      align="right">
                    </el-date-picker>
                    <el-date-picker
                      type="datetimerange"
                      v-model="date2"
                      class="item-select"
                      range-separator="至"
                      size="small"
                      style="width:403px"
                      start-placeholder="消费开始日期"
                      end-placeholder="消费结束日期"
                      align="right">
                    </el-date-picker>
                </div>
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
                    key="index"
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
                        <el-button type="primary" icon="el-icon-edit" size="small" @click.native="lookData(scope.row)">查看关联信息</el-button>
                        
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
                title="关联信息" 
                :visible.sync="layer_showInfo" width="800px"
                @close="dialogClose">
                <el-form size="small" status-icon :model="dialogForm" ref="dialogForm" label-width="110px">
                    <div class="clearfix">
                        <el-col :span="12">
                            <el-form-item label="用户姓名" >
                                <el-input v-model="dialogForm.name" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" >
                           <el-form-item label="手机号码">
                                <el-input v-model="dialogForm.name" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </div>
                    <div class="clearfix">
                        <el-col :span="12">
                            <el-form-item label="房源位置" >
                                <el-input v-model="dialogForm.name" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" >
                           <el-form-item label="公寓运营商">
                                <el-input v-model="dialogForm.name" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </div>
                    <div class="clearfix">
                        <el-col :span="12">
                            <el-form-item label="小区公寓-房间" >
                                <el-input v-model="dialogForm.name" disabled style="width:132.5px"></el-input>
                                <el-input v-model="dialogForm.name" disabled style="width:132.5px"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" >
                           <el-form-item label="" label-width="10px">
                                <el-input v-model="dialogForm.name" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </div>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import waves from '@/directive/waves' // 水波纹指令
    import { parseTime, ObjectMap, deepClone } from '@/utils'
    import { initOrgListApi } from '@/api/userManage'
    export default {
      name: 'lookRecord',
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
        return {
          formData: {
            code: '',
            mobile: '',
            type1: '',
            type2: '',
            type3: '',
            type4: '',
            startDate1: '',
            endDate1: '',
            startDate2: '',
            endDate2: ''
          },
          date1: [],
          date2: [],
          typeOpt1: [
            { label: '已领取', value: 1 },
            { label: '已过期', value: 2 },
            { label: '已使用', value: 3 }
          ],
          typeOpt2: [
            { label: '房租', value: 1 },
            { label: '押金', value: 2 },
            { label: '电费', value: 3 },
            { label: '水费', value: 4 }
          ],
          typeOpt3: [
            { label: '麦邻生活APP', value: 1 },
            { label: '微信H5', value: 2 },
            { label: '系统赠送', value: 3 },
            { label: '扫码', value: 4 }
          ],
          dialogForm: {
            name: ''
          },
          listLoading: false,
          layer_showInfo: false,
          colModels: [
            { prop: 'userName', label: '优惠券批次编码' },
            { prop: 'userMobile', label: '优惠券类型' },
            { prop: 'bookingTime', label: '费用类型' },
            { prop: 'roomAddr', label: '优惠金额' },
            { prop: 'serverName', label: '优惠券ID' },
            { prop: 'serverMobile', label: '优惠券状态' },
            { prop: 'lookHouseStatus', label: '领取手机号' },
            { prop: 'lookHouseResult', label: '领取时间' },
            { prop: 'lookHouseResult', label: '获取渠道' },
            { prop: 'lookHouseResult', label: '消费账单号' },
            { prop: 'lookHouseResult', label: '消费时间' }
          ],
          tableHeight: 300,
          tableData: [],
          pageSizeList: [10, 20, 30, 50],
          total: null,
          pageItems: {
            pageNo: 1,
            pageSize: 20
          }
        }
      },
      mounted() {
        /* 表格高度控制 */
        let temp_height = document.body.clientHeight - 220
        this.tableHeight = temp_height > 300 ? temp_height : 300
        window.onresize = () => {
          return (() => {
            temp_height = document.body.clientHeight - 220
            this.tableHeight = this.tableHeight = temp_height > 300 ? temp_height : 300
          })()
        }
        this.getGridData(this.pageItems)
        console.log((1187.50 + 255) * 2)
        console.log((701.37 + 250) * 3)
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
            code: '',
            mobile: '',
            type1: '',
            type2: '',
            type3: '',
            type4: '',
            startDate1: '',
            endDate1: '',
            startDate2: '',
            endDate2: ''
          }
          this.date1 = []
          this.date2 = []
          this.getGridData(this.pageItems)
        },
        lookData(row) {
          this.layer_showInfo = true
        },
        dialogClose() {
    
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
        date1(val) {
          val = val || []
          this.formData.startDate1 = val[0] ? parseTime(val[0]) : ''
          this.formData.endDate1 = val[1] ? parseTime(val[1]) : ''
        },
        date2(val) {
          val = val || []
          this.formData.startDate2 = val[0] ? parseTime(val[0]) : ''
          this.formData.endDate2 = val[1] ? parseTime(val[1]) : ''
        }
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    
</style>
