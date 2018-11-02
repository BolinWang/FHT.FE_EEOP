/*
 * @Author: ghost 
 * @Date: 2018-10-22 16:17:32 
 * @Last Modified by: ghost
 * @Last Modified time: 2018-11-02 16:42:05
 */
<template>
  <div class="compents-container">
    <el-dialog width="960px" :before-close="handleClose" :title="formCustomers.id?'编辑客源':'新增客源'" :visible.sync="editOrAdd" v-if="editOrAdd">
      <el-form size="small" ref="formCunstomers" :rules="rulesFormCunstomers" :model="formCustomers" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name" >
              <el-input :maxlength="10" :disabled="disabledALL" style="width:174px;" placeholder="请输入" v-model="formCustomers.name" auto-complete="off"></el-input>
              <el-select :disabled="disabledALL" style="width:94px;" v-model="formCustomers.gender" placeholder="性别">
                <el-option :label="item.label" :value="item.value" v-for="(item,index) in genderList" :key='index'></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="mobile">
              <el-input :disabled="disabledALL" style="width:174px;" placeholder="请输入手机号码" v-model="formCustomers.mobile" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="客源渠道" prop="sourceType">
              <el-select 
                :disabled="disabledALL"
                @change="chooseOneSourceList"
                style="width:94px;"
                v-model="formCustomers.source"
                placeholder="一级渠道">
                <el-option 
                  :label="item.name" 
                  :value="item.id" 
                  v-for="(item,index) in sourceList" 
                  :key='index'></el-option>
              </el-select>
              <el-select 
                :disabled="disabledALL" 
                v-if="sourceList[oneSourceIndex]" 
                style="width:174px;"  
                v-model="formCustomers.sourceType" 
                placeholder="请选择二级渠道">
                 <el-option 
                  v-for="(item,index) in sourceList[oneSourceIndex].sourceTypes" 
                  :key='index'
                  :label="item.name"
                  :value="item.id"></el-option> 
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="19">
                <el-form-item v-if='!customrentFee'  label="月租金范围" prop="rentFee">
                  <el-row>
                    <el-col :span="15" >
                      <el-select :disabled="disabledALL"  style="width:174px;" v-model="formCustomers.rentFee" placeholder="月租金范围">
                        <el-option  :label="item.label" :value="item.value" v-for="(item,index) in rentFeeList" :key='index'></el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item v-else  label="月租金范围" prop="rentMax">
                   <el-row>
                    <el-col :span="22" >
                      <div >
                        <el-row>
                          <el-col :span="9">
                            <el-input
                            size="small"
                            :min="1"
                            :disabled="disabledALL"
                            placeholder="最低"
                            @keyup.native="changeNumMin"
                            v-model="formCustomers.rentMin"/>
                          </el-col>
                          <el-col :span="4" style="text-align:center;">
                          -
                          </el-col>
                          <el-col :span="9">
                            <el-input
                              size="small"
                              :disabled="disabledALL"
                              placeholder="最高"
                              @keyup.native="changeNumMax"
                              v-model="formCustomers.rentMax"/>
                          </el-col>
                        </el-row>
                      </div>
                    </el-col>
                    
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-col :span="6">
                  <el-checkbox class="lineCheck" :disabled="disabledALL" @change='customRentFree' v-model="customrentFee">自定义</el-checkbox>
                </el-col>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="房间户型" prop='roomType'>
            <el-radio-group v-model="formCustomers.roomType">
              <el-radio 
                :disabled="disabledALL"
                v-for="(item,index) in roomTypeList" 
                :key="index" 
                :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="房间朝向" prop="houseDirection">
            <el-radio-group v-model="formCustomers.houseDirection">
              <el-radio 
                :disabled="disabledALL"
                v-for="(item,index) in houseDirectionList" 
                :key="index" 
                :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="房间类型" prop="houseType">
            <el-radio-group v-model="formCustomers.houseType" @change='changeHouse'>
              <el-radio 
                :disabled="disabledALL"
                v-for="(item,index) in houseTypeList" 
                :key="index" 
                :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row v-if='formCustomers.houseType===1' >
          <el-form-item label="房间特色（多选）" prop="houseFeature">
            <el-checkbox-group v-model="formCustomers.houseFeature">
              <el-checkbox 
                :disabled="disabledALL"
                :key="index"
                v-for="(item,index) in houseFeatureList"
                :label="item.value">{{item.label}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="房源意向板块" prop="customerAreasList">
            <el-select
             filterable
             remote
             :disabled="disabledALL"
             :remote-method="findNewZone"
             size="small" 
             multiple
             :loading="loading"
             :multiple-limit='3'
             style='width:100%'
             v-model="customerAreasList">
                 <el-tree
                  class="filter-tree"
                  :data="zoneTreeList"
                  :props="defaultProps"
                  node-key="id"
                  show-checkbox
                  ref="zoneTreeTwo"
                  :filter-node-method="filterNode"
                  @check-change="overlayNodeClick">
                </el-tree>
                <el-option style="display:none" value=""></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="备注" prop="remark">
            <el-input
              :disabled="disabledALL"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 7}"
              placeholder="请输入内容"
              :maxlength='500'
              v-model="formCustomers.remark">
            </el-input>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" :disabled="editDisabled" v-show='disabledALL' @click="handleEdit">编 辑</el-button>
        <el-button v-show='!disabledALL' type="primary" @click="addNewCustomers('formCunstomers')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getCustomerInfoApi, getCheckZoneApi, getSourceListApi, customerCenterSaveApi } from '@/api/renting'
export default {
  data() {
    const validateRent = (rule, value, callback) => {
      if (this.formCustomers.rentMax !== '' && this.formCustomers.rentMax <= this.formCustomers.rentMin) {
        callback(new Error('最高租金需大于最低租金'))
      } else {
        callback()
      }
    }
    return {
      rulesFormCunstomers: {
        name: [
          { required: true, message: '请输入租客姓名', trigger: 'blur' }
        ],
        rentMax: [
          { validator: validateRent, trigger: 'blur' }
        ],
        sourceType: [
          { required: true, message: '请选择客源渠道', trigger: 'change' }
        ],
        rentFee: [
          { required: true, message: '请设置租金范围', trigger: 'change' }
        ]
      },
      disabledALL: false,
      defaultProps: {
        children: 'childrens',
        label: 'name'
      },
      loading: false,
      editOrAdd: false,
      customrentFee: false, // 自定义选价
      zoneTreeList: [],
      sourceList: [], // 客源渠道列表
      oneSourceIndex: 0, // 一级渠道
      customerArea: [],
      customerAreasList: [],
      editDisabled: false,
      customerAreasIDList: [],
      genderList: [
        { value: 1, label: '先生' },
        { value: 2, label: '女士' }
      ],
      houseTypeList: [
        { value: 1, label: '合租' },
        { value: 2, label: '整租' },
        { value: 3, label: '公寓' }
      ],
      houseFeatureList: [
        { value: '1', label: '独立卫生间' },
        { value: '2', label: '独立阳台' },
        { value: '3', label: '独立厨房' },
        { value: '4', label: '飘窗' }
      ],
      houseDirectionList: [
        { value: 1, label: '朝南' },
        { value: 2, label: '朝北' },
        { value: 3, label: '朝东' },
        { value: 4, label: '朝西' }
      ],
      rentFeeList: [
        { value: 0, label: '不限' },
        { value: 1, label: '1500元以下' },
        { value: 2, label: '1500元-2000元' },
        { value: 3, label: '2000元-2500元' },
        { value: 4, label: '2500元-3000元' },
        { value: 5, label: '3000元-3500元' },
        { value: 6, label: '3500元-4000元' },
        { value: 7, label: '4000元-5000元' },
        { value: 8, label: '5000元以上' }
      ],
      roomTypeList: [
        { value: 1, label: '1室' },
        { value: 2, label: '2室' },
        { value: 3, label: '3室' },
        { value: 4, label: '4室' },
        { value: 5, label: '4室以上' }
      ],
      formLabelWidth: '160px',
      formCustomers: {
        id: '',
        name: '',
        gender: 1,
        mobile: '',
        source: '',
        sourceType: '',
        rentFee: '',
        rentMin: '',
        rentMax: '',
        customerAreas: [], // 意向房源板块
        houseDirection: '',
        houseFeature: []
      }
    }
  },
  mounted() {

  },
  created() {

  },
  watch: {
    customerAreasList(val) {
      this.customerAreasIDList = []
      this.formCustomers.customerAreas = this.formCustomers.customerAreas.filter(item => {
        let customerAreas = ''
        this.customerAreasList.map(v => {
          if (item.backName === v) {
            this.customerAreasIDList.push(item.zoneId)
            customerAreas = item
          }
        })
        return customerAreas
      })
      this.$refs.zoneTreeTwo.setCheckedKeys(this.customerAreasIDList)
    }
  },
  methods: {
    changeNumMax() {
      this.formCustomers.rentMax = this.formCustomers.rentMax.replace(/[^\.\d]/g, '')
      this.formCustomers.rentMax = this.formCustomers.rentMax.replace('.', '')
    },
    changeNumMin() {
      this.formCustomers.rentMin = this.formCustomers.rentMin.replace(/[^\.\d]/g, '')
      this.formCustomers.rentMin = this.formCustomers.rentMin.replace('.', '')
    },
    changeHouse(val) {
      this.formCustomers.houseFeature = []
    },
    changeCustomerAreasList(val) {
      this.$refs.zoneTreeTwo.filter('')
    },
    addNewCustomers(ref) {
      this.$refs[ref].validate((valid) => {
        if (valid) {
          this.formCustomers.houseFeature = this.formCustomers.houseFeature.toString()
          customerCenterSaveApi(this.formCustomers).then(res => {
            this.$refs.formCunstomers.resetFields()
            this.$emit('searchAll')
            this.editOrAdd = false
            this.customrentFee = false
            this.formCustomers.gender = 1
            this.formCustomers.source = ''
            this.formCustomers.rentMin = ''
            this.formCustomers.rentMax = ''
            this.formCustomers.rentFee = ''
            this.customerAreasList = []
            this.customerAreasIDList = []
            this.formCustomers.customerAreas = []
            this.$refs.zoneTreeTwo.setCheckedKeys(this.customerAreasIDList)
            this.$message({
              message: `${this.formCustomers.id ? '编辑' : '新增'}客源成功`,
              type: 'success'
            })
            this.formCustomers.houseFeature = []
          })
        } else {
          return false
        }
      })
    },
    overlayNodeClick(data, check) {
      let name = ''
      let zoneId = ''
      this.zoneTreeList.map(item => {
        item.childrens.map(v => {
          v.childrens.map(value => {
            if (value.name === data.name) {
              name = `${item.name}-${v.name}-${value.name}`
              zoneId = data.id
            }
          })
        })
      })
      if (check) {
        if (this.customerAreasList.length < 3) {
          this.validateNum(name, zoneId)
        } else {
          this.$refs.zoneTreeTwo.setChecked(zoneId, false)
          this.$message({
            message: '您选中的客源意向板块已经超过三个',
            type: 'error'
          })
        }
      } else {
        if (!data.childrens) {
          this.customerAreasList = this.customerAreasList.filter(v =>
            v !== name
          )
        }
      }
    },
    validateNum(name, zoneId) {
      this.customerAreasList.push(name)
      this.customerAreasIDList.push(zoneId)
      this.formCustomers.customerAreas.push(
        {
          backName: name,
          zoneId: zoneId
        }
      )
    },
    findNewZone(val) {
      this.$refs.zoneTreeTwo.filter(val)
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    chooseOneSourceList(val) { // 客源渠道一级选中
      this.formCustomers.sourceType = ''
      this.sourceList.map((res, index) => {
        if (res.id === val) {
          this.oneSourceIndex = index
        }
      })
    },
    getZoneList() { // 获取区域板块
      getCheckZoneApi().then(res => {
        this.zoneTreeList = res.data
        this.zoneTreeList.map(item => {
          item.disabled = true
          item.childrens.map(v => {
            v.disabled = true
          })
        })
      })
    },
    getSourceList() { // 获取客源渠道列表
      getSourceListApi().then(res => {
        this.sourceList = res.data.sourceList
      })
    },
    customRentFree(val) {
      this.customrentFee === true ? this.formCustomers.rentFee = -1 : this.formCustomers.rentFee = ''
    },
    getCusTomersInfo() {
      getCustomerInfoApi({ customerId: this.formCustomers.id }).then(res => {
        this.formCustomers = res.data
        this.formCustomers.houseFeature = res.data.houseFeature.split(',')
        this.formCustomers.rentFee === -1 ? this.customrentFee = true : this.customrentFee = false
        this.formCustomers.customerAreas.map(v => {
          this.customerAreasList.push(v.backName)
          this.customerAreasIDList.push(v.zoneId)
        })
        this.sourceList.map((res, index) => {
          if (res.id === this.formCustomers.source) {
            this.oneSourceIndex = index
          }
        })

        this.$refs.zoneTreeTwo.setCheckedKeys(this.customerAreasIDList)
      })
    },
    showDialog(param) {
      this.editOrAdd = true
      this.getZoneList()
      this.$nextTick(res => {
        this.formCustomers.id = ''
        this.getSourceList()
        this.getZoneList()
        if (param.editID) {
          this.editDisabled = param.disabled
          this.formCustomers.id = param.editID
          this.getCusTomersInfo()
          this.disabledALL = true
        } else if (param.bookingID) {
          this.formCustomers.tenantBookingId = param.bookingID
          this.formCustomers.mobile = param.bookMessage.mobile || ''
          this.formCustomers.rentFee = 0
          this.formCustomers.name = param.bookMessage.name
          this.formCustomers.source = 1
          this.formCustomers.sourceType = 19
          this.formCustomers.customerAreas = param.bookMessage.customerAreaDTO
          this.formCustomers.customerAreas.map(v => {
            this.customerAreasList.push(v.backName)
            this.customerAreasIDList.push(v.zoneId)
          })
          this.$refs.zoneTreeTwo.setCheckedKeys(this.customerAreasIDList)
        }
      })
    },
    handleEdit() {
      this.disabledALL = false
    },
    handleClose() {
      this.customerAreasList = []
      this.disabledALL = false
      this.customrentFee = false
      this.formCustomers.rentFee = ''
      this.formCustomers.rentMin = ''
      this.formCustomers.rentMax = ''
      this.formCustomers.source = ''
      this.customerAreasIDList = []
      this.formCustomers.gender = 1
      this.formCustomers.customerAreas = []
      this.$refs.formCunstomers.resetFields()
      this.editOrAdd = false
    }
  }
}
</script>
<style scoped>
  .lineCheck{
    line-height: 32px;
  }
</style>
