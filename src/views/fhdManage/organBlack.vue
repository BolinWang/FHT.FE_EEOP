/*
 * @Author: ghost
 * @Date: 2018-08-31 11:27:54
 * @Last Modified by: 
 * @Last Modified time: 2018-09-13 14:51:48
 */
 <template>
    <div class="container">
        <div class="model-search clearfix">
            <el-form size="small" :inline="true" >
              <el-input
              size="small"
              placeholder="房东／房东手机号码"
              v-model="orgKeyWord"
              style="width:180px;"
              @keydown.native.enter="searchParam"
              class="filter-item">
              </el-input>
                <el-button type="primary" size="small" icon="el-icon-search" @click.native="searchParam"  class="filter-item">查询</el-button>
                <el-button plain size="small" icon="el-icon-remove-outline" @click.native="clearForm">清空</el-button>
                <el-button type="primary" class="btn-right" size="small" @click.native="relieveOrnFun">机构解除合作</el-button>
            </el-form>
        </div>
        <div class="table-box" :style="styleHeight">
           <el-table
            :data="backList"
            :max-height="tableHeight"
            style="width: 100%">
            <el-table-column
              prop="gmtRelieveStr"
              label='解除合作时间'
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="机构名称">
            </el-table-column>
            <el-table-column
              prop="mobile"
              label="手机号码">
            </el-table-column>
             <el-table-column
              label="类型">
              <template slot-scope="scope">
                  {{ scope.row.type | filererType }}
             </template>
            </el-table-column>
            <el-table-column
              width="220"
              label="操作">
               <template slot-scope="scope">
                <el-button
                  @click.native.prevent="remarkOrgan(scope.row)"
                  type="text"
                  size="small">
                  备注信息
                </el-button>
                <el-button
                  @click.native.prevent="recoverOrgan(scope.row)"
                  type="text"
                  size="small">
                   恢复合作
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="model-pagination">
          <el-pagination background   @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageItems.pageNo" :page-sizes="pageSizeList" :page-size="pageItems.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
       </div>
       <!-- 备注信息 -->
       <el-dialog title="备注信息" :visible.sync="dialogTableVisible">
        <el-row>
          <el-button type="primary" @click="addFllow">新增备注</el-button>
        </el-row>
        <el-dialog
          width="30%"
          title="新增备注信息"
          :visible.sync="innerVisible"
          append-to-body>
            <el-form :model="form"  ref="orgForm" :rules="rules">
              <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
                <el-input v-model="form.remark" :maxlength="100"  type="textarea" :rows="2" placeholder="请输入备注（0-100字)"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="addFollowSubmit">确 定</el-button>
              <el-button @click="closeInner">关闭</el-button>
            </div>
        </el-dialog>
          <div class="all-text">
            <div class="table-container" v-if="gridData.length">
              <div class="box" v-for="Item in gridData" :key="Item.id">
                <div class="name-box">{{Item.gmtCreateStr}} {{Item.userName}}</div>
                  <div class="name-box">{{Item.remark}}</div>
              </div>
            </div>
            <div class="table-container" v-else>
              <div class="box">
                  <div class="text-empty">暂无数据</div>
              </div>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
              <el-button @click="dialogTableVisible = false">关闭</el-button>
          </div>
      </el-dialog>
      <!-- 机构恢复 -->
      <el-dialog title="恢复合作" :visible.sync="recoverVisible" >
        <div class="text">确定要与此机构重新合作么</div>
        <div class="text">恢复后请重新调整服务费率</div>
        <el-form :model="recoverform" ref="recoverform" :rules='rulesRecover'>
          <el-form-item  prop="remark">
                <el-input v-model="recoverform.remark" :maxlength="100"  type="textarea" :rows="2" placeholder="请输入备注（0-100字)"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancalRecover">取 消</el-button>
          <el-button type="primary" @click="saveRecover">确 定</el-button>
        </div>
      </el-dialog>
      <relieve-Org ref="relieveOrg" v-on:searchStart="searchParam"></relieve-Org> 
    </div>
</template>
<script>
import relieveOrg from './components/relieveOrg'
import {
  delObjectItem
} from '@/utils'
import {
  orgManageblackListApi,
  orgRemarkListApi,
  orgRemarkSaveApi,
  orgManageRecoverApi
} from '@/api/renting'
import {
  getSessionId
} from '@/utils/auth'
export default {
  components: {
    relieveOrg
  },
  data() {
    return {
      tableHeight: 300,
      formLabelWidth: '60px',
      orgKeyWord: '',
      recoverVisible: false,
      pageItems: { // pageSize对象
        pageNo: 1,
        pageSize: 20
      },
      recoverform: {
        remark: '',
        id: '',
        sessionId: getSessionId()
      },
      form: {
        remark: null,
        orgId: null,
        sessionId: getSessionId()
      },
      rulesRecover: {
        remark: [{
          required: true,
          message: '请输入备注信息',
          trigger: 'blur'
        }]
      },
      rules: {
        remark: [{
          required: true,
          message: '请输入备注',
          trigger: 'blur'
        }]
      },
      pageSizeList: [10, 20, 30, 50],
      total: null,
      backList: [],
      dialogTableVisible: false,
      innerVisible: false,
      nowData: [],
      gridData: []
    }
  },
  computed: {
    styleHeight() {
      return {
        width: '100%',
        height: this.tableHeight + 'px'
      }
    }
  },
  filters: {
    filererType(val) {
      const typeName = val === 1 ? '个人' : '企业'
      return typeName
    }
  },
  mounted() {
    this.searchParam()
    let temp_height = document.body.clientHeight - 190
    this.tableHeight = temp_height > 300 ? temp_height : 300
    window.onresize = () => {
      return (() => {
        temp_height = document.body.clientHeight - 190
        this.tableHeight = this.tableHeight = temp_height > 300 ? temp_height : 300
      })()
    }
  },
  methods: {
    relieveOrnFun() {
      this.$refs.relieveOrg.open()
    },
    recoverOrgan(row) {
      this.recoverform.id = row.id
      this.recoverVisible = true
    },
    saveRecover() {
      this.$refs['recoverform'].validate((valid) => {
        if (valid) {
          orgManageRecoverApi(this.recoverform).then(res => {
            this.$message({
              message: '已回恢复合作',
              type: 'succes'
            })
            delObjectItem(this.recoverform)
            this.recoverVisible = false
            this.searchParam()
          })
        }
      })
    },
    closeInner() {
      this.innerVisible = false
      delObjectItem(this.form)
    },
    cancalRecover() {
      this.recoverVisible = false
      delObjectItem(this.recoverform)
    },
    addFollowSubmit() {
      this.form.orgId = this.nowData.orgId
      this.$refs['orgForm'].validate((valid) => {
        if (valid) {
          orgRemarkSaveApi(this.form).then(res => {
            this.getremarkList()
            delObjectItem(this.form)
            this.innerVisible = false
            this.$message({
              message: '添加备注成功',
              type: 'succes'
            })
          })
        }
      })
    },
    addFllow() {
      this.innerVisible = true
    },
    remarkOrgan(row) { // 备注
      this.dialogTableVisible = true
      this.nowData = row
      this.getremarkList()
    },
    getremarkList() {
      const params = {
        orgId: this.nowData.orgId,
        sessionId: getSessionId()
      }
      orgRemarkListApi(params).then(res => {
        this.gridData = res.data.orgRemarkList
      })
    },
    handleSizeChange(val) {
      this.pageItems.pageSize = val
      this.searchParam()
    },
    handleCurrentChange(val) {
      this.pageItems.pageNo = val
      this.searchParam()
    },
    clearForm() {
      this.orgKeyWord = null
    },
    searchParam() {
      console.log('1')
      let params = {
        orgKeyWord: this.orgKeyWord,
        sessionId: getSessionId()
      }
      params = Object.assign(params, this.pageItems)
      orgManageblackListApi(params).then(res => {
        this.backList = res.data.result
        this.total = res.data.total
      })
    }
  }
}
</script>
<style scoped>
   .container {
      padding: 20px;
    }
    .table-box {
      margin-top: 20px;
      border: 1px solid #e5e5e5;
    }
    .btn-right{
      float:right;
    }
    .box {
      min-height: 68px;
      padding-top: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid #e0e0e0;
    }
  .text-empty {
    line-height: 60px;
    text-align: center;
    border-top: 1px solid #e0e0e0;
  }
</style>

