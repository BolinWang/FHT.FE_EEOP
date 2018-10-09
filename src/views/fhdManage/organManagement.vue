/*
 * @Author: ghost
 * @Date: 2018-08-31 14:55:54
 * @Last Modified by: chudequan
 * @Last Modified time: 2018-10-09 16:55:35
 */
<template>
  <div class="container">
    <div class="model-search clearfix">
      <el-form size="small" :inline="true" :model="formData">
        <el-date-picker v-model="dateTime" size="small" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:350px" @change="searchParam">
        </el-date-picker>
        <el-input v-model="formData.orgKeyWord" size="small" placeholder="房东／房东手机号码" style="width:150px;" @keydown.native.enter="searchParam" class="filter-item">
        </el-input>
        <el-input v-model="formData.cmKeyWord" size="small" placeholder="城市管家／手机号码" style="width:150px;" @keydown.native.enter="searchParam" class="filter-item">
        </el-input>
        <el-select size="small" style="width:130px;" v-model="formData.type" placeholder="机构类型" class="filter-item">
          <el-option v-for="item in organList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" size="small" icon="el-icon-search" @click.native="searchParam" class="filter-item">查询</el-button>
        <el-button plain size="small" icon="el-icon-remove-outline" @click.native="clearForm">清空</el-button>
        <el-button type="primary" size="small" icon="el-icon-upload" @click.native="exportExcel">导出
        </el-button>
      </el-form>
    </div>
    <div class="table-box">
      <el-table :data="organAllList" border style="width: 100%" size="small" :height="tableHeight">
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column prop="gmtCreateStr" width="160" label="创建时间">
        </el-table-column>
        <el-table-column prop='name' label="机构名称">
        </el-table-column>
        <el-table-column prop="mobile" width="120" label="手机号码">
        </el-table-column>
        <el-table-column label="类型" width="70">
          <template slot-scope="scope">
                  {{ scope.row.type | filererType }}
          </template>
        </el-table-column>
        <el-table-column
          label="费率">
          <template slot-scope="scope">
                {{ scope.row.splitFee || '-'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="province"
          label="是否绑卡"
          width="80">
            <template slot-scope="scope">
              {{ scope.row.haveBindCardId | filererhaveBindCardId }}
            </template>
        </el-table-column>
        <el-table-column
          label="自报体量"
          width="80">
           <template slot-scope="scope">
                {{ scope.row.volumn || '-'}}
           </template>
        </el-table-column>
        <el-table-column
            label="身份证照片">
              <template slot-scope="scope">
                {{ scope.row.haveIdCardImage | filererIsNo}}
              </template>
        </el-table-column>
          <el-table-column
            label="平台代理收租服务">
              <template slot-scope="scope">
                {{ scope.row.haveProxyImage | filererIsNo}}
              </template>
          </el-table-column>
          <el-table-column
            label="房源发布和租客引流服务">
              <template slot-scope="scope">
                {{ scope.row.haveAttractionFlowImage | filererIsNo}}
              </template>
          </el-table-column>
          <el-table-column
            prop="hostingFlyCount"
            label="分散式间数（飞虎队）">
          </el-table-column>
          <el-table-column
            prop="estateFlyCount"
            label="分散式间数"
            width="120">
          </el-table-column>
          <el-table-column
            prop="hostingFlyCount"
            label="集中式间数（飞虎队）">
          </el-table-column>
          <el-table-column
            prop="estateCount"
            label="集中式间数">
          </el-table-column>
          <el-table-column
            prop="flyRentCount"
            label="飞虎队在住房间">
          </el-table-column>
          <el-table-column
            prop="onlineBillCount"
            label="租客线上交租单数">
          </el-table-column>
          <el-table-column
            prop="offlineBillCount"
            label="租客线下交租单数">
          </el-table-column>
          <el-table-column
            label="城市管家"
            width="120">
            <template slot-scope="scope">
                {{ scope.row.createManagerName || '-'}}
              </template>
          </el-table-column>
          <el-table-column
            label="手机号码"
            width="120">
            <template slot-scope="scope">
                {{ scope.row.createManagerMobile || '-'}}
              </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="120">
              <template slot-scope="scope">
                <el-button @click.native.prevent="editOrgan(scope.row)" type="text" size="small">
                  编辑
                </el-button>
                <el-button @click.native.prevent="remarkOrgan(scope.row)" type="text" size="small">
                  备注信息
                </el-button>
              </template>
          </el-table-column>
      </el-table>
      <div class="model-pagination">
        <el-pagination background   @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageItems.pageNo" :page-sizes="pageSizeList" :page-size="pageItems.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
     <!-- 备注弹窗 -->
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
     <!-- 编辑弹窗  -->
    <organ-Edit :datalist = 'nowData' ref="organEdit"></organ-Edit>
 </div>
</template>

<script>
const FLY = process.env.FLY_API + '/bop'
import { debounce } from '@/utils'
import {
  parseTime,
  delObjectItem,
  ObjectMap
} from '@/utils'
import {
  getSessionId
} from '@/utils/auth'
import {
  orgManageListApi,
  orgRemarkSaveApi,
  orgRemarkListApi
} from '@/api/renting'
import organEdit from './components/organEdit.vue'
export default {
  components: {
    organEdit
  },
  data() {
    return {
      formLabelWidth: '60px',
      dialogTableVisible: false,
      innerVisible: false,
      total: null,
      gridData: [],
      nowData: {},
      formData: {
        type: '',
        gmtCreateStart: '',
        gmtCreateEnd: '',
        cmKeyWord: '',
        orgKeyWord: '',
        sessionId: getSessionId()
      },
      form: {
        remark: null,
        orgId: null,
        sessionId: getSessionId()
      },
      pageItems: { // pageSize对象
        pageNo: 1,
        pageSize: 20
      },
      rules: {
        remark: [{
          required: true,
          message: '请输入备注',
          trigger: 'blur'
        }]
      },
      pageSizeList: [10, 20, 30, 50],
      dateTime: [], // 时间数组
      organList: [{
        value: 1,
        label: '个人'
      }, {
        value: 2,
        label: '企业'
      }],
      tableHeight: 300,
      organAllList: []
    }
  },
  filters: {
    filererType(val) {
      const typeName = val === 1 ? '个人' : '企业'
      return typeName
    },
    filererhaveBindCardId(val) {
      const isCard = val === 0 ? '否' : '是'
      return isCard
    },
    filererIsNo(val) {
      const IsNo = val === 0 ? '无' : '有'
      return IsNo
    }
  },
  mounted() {
    const changeTableSize = debounce(() => {
      this.tableHeight = Math.max(document.body.clientHeight - 210, 300)
    }, 100)
    changeTableSize()
    window.addEventListener('resize', changeTableSize)
    this.searchParam()
  },
  created() {
  },
  beforeDestroy() {
    const dia = document.querySelectorAll('body>.el-dialog__wrapper')
    dia.forEach(element => {
      element.style.display = 'none'
    })
  },
  watch: {
    dateTime(val) {
      val = val || []
      this.formData.gmtCreateStart = val[0] ? parseTime(val[0]) : ''
      this.formData.gmtCreateEnd = val[1] ? parseTime(val[1]) : ''
    }
  },
  methods: {
    exportExcel() {
      const href = `${FLY}/orgManage/export?type=${this.formData.type}&gmtCreateStart=${this.formData.gmtCreateStart}&gmtCreateEnd=${this.formData.gmtCreateEnd}&cmKeyWord=${this.formData.cmKeyWord}&orgKeyWord=${this.formData.orgKeyWord}`
      var elink = document.createElement('a')
      elink.style.display = 'none'
      console.log(href)
      elink.href = encodeURI(href)
      console.log(elink.href)
      document.body.appendChild(elink)
      elink.click()

      document.body.removeChild(elink)
    },
    editOrgan(row) {
      this.nowData = row
      this.$refs.organEdit.open(this.nowData)
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
    closeInner() {
      this.innerVisible = false
      delObjectItem(this.form)
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
    handleSizeChange(val) {
      this.pageItems.pageSize = val
      this.searchParam()
    },
    handleCurrentChange(val) {
      this.pageItems.pageNo = val
      this.searchParam()
    },
    searchParam() {
      const searchParams = Object.assign(this.pageItems, this.formData)
      orgManageListApi(ObjectMap(searchParams)).then(res => {
        if (res.success) {
          this.organAllList = res.data.result || []
          this.total = res.data.total
        } else {
          this.$message.error('请求飞虎队失败')
          return false
        }
      })
    },
    clearForm() {
      this.formData = delObjectItem(this.formData)
      this.dateTime = []
    }
  }
}
</script>

<style scoped lang="scss">

  .container {
    padding: 20px;
  }
  .table-box {
    margin-top: 20px;
    border: 1px solid #e5e5e5;
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
