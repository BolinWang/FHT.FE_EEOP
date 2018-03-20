<template>
  <div class="app-container">
    <div class="model-search clearfix">
      <el-form size="small" :inline="true" :model="formData">
        <el-input size="small" v-model="formData.keyword" placeholder="优惠券名称" style="width:260px;" @keydown.native.enter="searchParam">
        </el-input>
        <el-select size="small" v-model="formData.type" placeholder="状态" class="item-select" style="width: 120px;" clearable>
          <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select size="small" v-model="formData.feeType" placeholder="费用类型" class="item-select" style="width: 120px;" clearable>
          <el-option v-for="item in feeTypeOpts" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" size="small" icon="el-icon-search" @click.native="searchParam" v-waves class="filter-item">查询</el-button>
        <el-button plain size="small" icon="el-icon-remove-outline" @click.native="clearForm">清空</el-button>
        <el-button class="right" type="primary" size="small" icon="el-icon-remove" @click.native="addCoupon">创建优惠券</el-button>
      </el-form>
    </div>
    <div class="model-table" :style="tableStyle">
      <el-table :data="tableData" v-loading.body="listLoading" :max-height="tableHeight" size="small" fit stripe highlight-current-row>
        <el-table-column type="index" width="60" align="center"></el-table-column>
        <el-table-column v-for="(item,index) in colModels" :label="item.label" :width="item.width" key="index" fit show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tag v-if="item.type == 'status'" :type="scope.row[item.prop] | tagFilter">
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
            <el-button type="danger" icon="el-icon-error" size="small" @click.native="changeState(scope.row,1)">停用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog-info">
      <el-dialog title="创建优惠券" :visible.sync="layer_showInfo" width="600px" @close="dialogClose">
        <el-form size="small" status-icon :model="dialogForm" :rules="rules" ref="dialogForm" label-width="110px">
          <el-form-item label="优惠券名称">
            <el-input :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="优惠券类型">
            <el-input :disabled="isDisabled"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogClose;layer_showInfo=false" size="small">取 消</el-button>
          <el-button type="primary" size="small">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import waves from '@/directive/waves' // 水波纹指令
import { queryLookRecordApi } from '@/api/serviceManage'
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
    return {
      rules: {
        organizationName: [
          { required: true, message: '请输入企业名称', trigger: 'blur' }
        ],
        displayName: [
          { required: true, message: '请输入企业缩写名', trigger: 'blur' }
        ],
        orgLicence: [
          { required: true, message: '请输入统一社会信用代码', trigger: 'blur' }
        ],
        orgLegalPersonName: [
          { required: true, message: '请输入法人姓名', trigger: 'blur' }
        ],
        orgLegalPersonCardNo: [
          { required: true, message: '请输入法人身份证号', trigger: 'blur' }
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
      formData: {
        keyword: '',
        type: '',
        feeType: ''
      },
      searchParams: {
        pageNo: 1,
        pageSize: 20
      },
      dialogForm: {

      },
      layer_showInfo: false,
      listLoading: false,
      isDisabled: false,
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
      tableData: []
    }
  },
  mounted() {
    /* 表格高度控制 */
    let temp_height = document.body.clientHeight - 95;
    this.tableHeight = temp_height > 300 ? temp_height : 300;
    window.onresize = () => {
      return (() => {
        temp_height = document.body.clientHeight - 95;
        this.tableHeight = this.tableHeight = temp_height > 300 ? temp_height : 300;
      })()
    }
    this.getGridData();
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
    getGridData() {
      this.listLoading = true;
      queryLookRecordApi(this.searchParams).then(response => {
        this.tableData = response.data ? (response.data.list || []) : [];
        this.listLoading = false;
      })
    },
    searchParam() {

    },
    clearForm() {
      this.formData = {
        keyword: '',
        type: '',
        feeType: ''
      }
      this.searchParams = {
        pageNo: 1,
        pageSize: 20
      }
    },
    addCoupon() {
      this.layer_showInfo = true;
    },
    editData() {

    },
    changeState(row, index) {
      let tips = [
        '确定要激活优惠券吗？激活后，部分信息将无法编辑，用户可以开始领取优惠券',
        '确定要停用吗？停用后，用户将无法从此优惠券库中领取优惠券，已经领取的优惠券还可以正常使用'
      ];
      this.$confirm(tips[index], '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

      }).catch(() => {

      });

    },
    dialogClose() {

    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
</style>