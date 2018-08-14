/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-07-11 13:49:21
 * @Last Modified by: chudequan
 * @Last Modified time: 2018-08-14 16:16:30
 */

 <template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClickTab">
      <el-tab-pane v-for="(item,index) in tabMapOptions" :label="item" :key='index' :name="item">
      </el-tab-pane>
      <el-form class="model-search clearfix" :inline="true" size="small">
        <div>
          <el-select size="small" v-model="searchParams.houseStatus" filterable clearable placeholder="房间状态" class="item-select">
            <el-option label="已出租" :value="1"></el-option>
            <el-option label="未出租" :value="0"></el-option>
          </el-select>
          <el-select size="small" v-model="searchParams.houseType" filterable clearable placeholder="房间类型" class="item-select filter-item">
            <el-option label="普通" :value="0"></el-option>
            <el-option label="金融" :value="1"></el-option>
            <el-option label="飞虎队" :value="2"></el-option>
          </el-select>
          <el-select size="small" v-model="searchParams.publishStatus" filterable clearable placeholder="麦邻发布状态" class="item-select filter-item">
            <el-option label="未发布" :value="0"></el-option>
            <el-option label="已发布" :value="1"></el-option>
            <el-option label="发布中" :value="2"></el-option>
          </el-select>
          <el-button size="small" type="primary" icon="el-icon-search" @click="searchParam" class="filter-item">查询</el-button>
          <el-button size="small" icon="el-icon-remove-outline" @click="searchParam('clear')" class="filter-item">清空</el-button>
        </div>
        <div style="margin-top: 10px;">
          <el-input size="small" v-model="searchParams.organizationName" clearable placeholder="组织名称" style="width:150px;"></el-input>
          <el-input size="small" v-model="searchParams.mobileOrName" clearable placeholder="手机号/姓名" class="filter-item" style="width:150px;"></el-input>
          <el-input size="small" v-model="searchParams.keywords" clearable placeholder="公寓/小区" class="filter-item" style="width:150px;"></el-input>
          <el-button size="small" type="success" icon="el-icon-upload" class="filter-item" @click="syncItems('on')">发布</el-button>
          <el-button size="small" type="danger" icon="el-icon-remove" class="filter-item" @click="syncItems('off')">撤销</el-button>
          <!-- fhj -->
          <el-dialog class="select-dialog" :title='"选择"+dialogTitle+"平台"' :visible.sync="dialogVisible" width="40%">
            <div class="select-platform-container">
              <div class="left">
                <input type="checkbox" v-model="publishSelect.mlzf" id="mlRent" />
                <label for="mlRent">
                  <div class="ml-selectName" v-bind:class="{changeBackground:publishSelect.mlzf}">麦邻租房</div>
                  <div class="ml-selectStatus">
                    <i class="el-icon-check" v-show="publishSelect.mlzf"></i>
                  </div>
                </label>
              </div>
              <div class="right">
                <input type="checkbox" v-model="publishSelect.idlefish" id="idleFishRent" />
                <label for="idleFishRent">
                  <div class="ml-selectName" v-bind:class="{changeBackground:publishSelect.idlefish}">咸鱼租房</div>
                  <div class="ml-selectStatus">
                    <i class="el-icon-check" v-show="publishSelect.idlefish"></i>
                  </div>
                </label>
              </div>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="gotoHouseAsync">{{dialogTitle === "撤销"?"确定":"发布"}}</el-button>
            </span>
          </el-dialog>
          <!--fhj-->
        </div>
      </el-form>
      <GridUnit ref="refGridUnit" :columns="colModels" :formOptions="searchParams" :url="url" :showSelection="true" :pageSizes="[50, 100, 200, 500]" :dataMethod="method" :height="tableHeight" @selection-change="handleSelectionChange">
        <template slot="slot_popover" slot-scope="scope">
          <el-popover v-if="scope.row.idlefishStatus === `发布失败` || scope.row.publishStatus === `发布失败` " trigger="hover" placement="top">
            <p>发布失败原因: {{ scope.row.failReason }}</p>
            <div slot="reference">
              <el-tag :type="(scope.row.idlefishStatus|| scope.row.publishStatus) | renderStatusType">
                {{(scope.row.idlefishStatus || scope.row.publishStatus) | renderStatusValue}}
              </el-tag>
            </div>
          </el-popover>
          <el-tag v-else :type="(scope.row.idlefishStatus || scope.row.publishStatus) | renderStatusType">
            {{scope.row.idlefishStatus || scope.row.publishStatus | renderStatusValue}}
          </el-tag>
        </template>
      </GridUnit>
    </el-tabs>
  </div>
</template>
<script>
import GridUnit from '@/components/GridUnit/grid'
import { deepClone, cleanArray, ObjectMap } from '@/utils'
import { houseAsyncApi } from '@/api/houseManage'
import { publishHouseApi } from '@/api/houseManage'
export default {
  name: 'houseSync',
  components: {
    GridUnit
  },
  filters: {
    renderStatusType(status) {
      const statusMap = {
        '已发布': 'success',
        '发布中': 'primary',
        '发布失败': 'danger',
        '下架中': 'warning',
        '未发布': 'info'
      }
      return statusMap[status] || 'info'
    },
    renderStatusValue(status) {
      return status || '未知'
    }
  },
  data() {
    return {
      tabMapOptions: ['整租', '合租', '集中式'],
      activeName: '整租',
      searchParams: {
        houseRentType: 1,
        houseStatus: 0,
        houseType: '',
        publishStatus: '',
        organizationName: '',
        keywords: '',
        mobileOrName: ''
      },
      selectedItems: [],
      colModels: [
        { prop: 'organizationName', label: '组织名称' },
        { prop: 'name', label: '姓名', width: 100 },
        { prop: 'mobile', label: '手机号', width: 150 },
        { prop: 'userType', label: '用户类型', width: 100 },
        { prop: 'address', label: '房源位置', width: 200 },
        { prop: 'roomName', label: '公寓/小区-房间', width: 200 },
        { prop: 'houseType', label: '房源类型', width: 150 },
        { prop: 'roomCode', label: '房源编码', width: 100 },
        { prop: 'rent', label: '房价(元/月)', width: 100, align: 'right' },
        {
          prop: 'roomStatus',
          label: '房间状态',
          width: 100,
          type: 'status',
          fixed: 'right',
          unitFilters: {
            renderStatusType(status) {
              const statusMap = {
                '已出租': 'success',
                '未出租': 'info'
              }
              return statusMap[status] || 'info'
            },
            renderStatusValue(status) {
              return status || '未知'
            }
          }
        },
        {
          prop: 'publishStatus',
          label: '麦邻租房',
          width: 100,
          type: 'status',
          fixed: 'right',
          unitFilters: {
            renderStatusType(status) {
              const statusMap = {
                '已发布': 'success',
                '未发布': 'info',
                '发布中': 'primary'
              }
              return statusMap[status] || 'info'
            },
            renderStatusValue(status) {
              return status || '未知'
            }
          }
        },
        { prop: 'idlefishStatus', label: '闲鱼租房', width: 100, slotName: 'slot_popover', fixed: 'right' },
        { prop: 'operation', label: '操作记录', width: 180 }
      ],
      tableHeight: 300,
      url: houseAsyncApi.defaultOptions.requestUrl,
      method: houseAsyncApi.defaultOptions.method,
      dialogVisible: false,
      publishSelect: {
        mlzf: true,
        idlefish: true
      },
      dialogTitle: ''
    }
  },
  mounted() {
    /* 表格高度控制 */
    this.$nextTick(() => {
      const offsetTop = 230
      const pagenationH = 64
      const containerPadding = 20
      let temp_height = document.body.clientHeight - offsetTop - pagenationH - containerPadding
      this.tableHeight = temp_height > 300 ? temp_height : 300
      window.onresize = () => {
        return (() => {
          temp_height = document.body.clientHeight - offsetTop - pagenationH - containerPadding
          this.tableHeight = this.tableHeight = temp_height > 300 ? temp_height : 300
        })()
      }
    })
  },
  computed: {
    tableStyle: function () {
      return {
        width: '100%',
        height: this.tableHeight + 'px'
      }
    }
  },
  methods: {
    // 查询
    searchParam(type) {
      if (type === 'clear') {
        this.searchParams = {
          houseStatus: '',
          houseType: '',
          publishStatus: '',
          organizationName: '',
          keywords: '',
          mobileOrName: ''
        }
      }
      this.searchParams.houseRentType = this.activeName === '整租' ? 1 : (this.activeName === '合租' ? 2 : 0)
      // 解决watch执行顺序
      this.$nextTick(() => {
        this.$refs.refGridUnit.searchHandler()
      })
    },
    // tabs切换
    handleClickTab(tab) {
      this.searchParam('clear')
    },
    // 选择列表
    handleSelectionChange(list) {
      this.selectedItems = list
    },
    // 选择数据
    syncItems(type = 'on') {
      const typeConfig = {
        'on': {
          title: '发布'
        },
        'off': {
          title: '撤销'
        }
      }
      if (this.selectedItems.length === 0) {
        this.$message.error(`请选择需要${typeConfig[type].title}的房源`)
        return false
      }
      const pendingRomms = this.selectedItems.filter(item => item.idlefishStatus === '发布中' || item.publishStatus === '发布中')
      if (pendingRomms.length > 0) {
        this.$message.error(`发布中的房源不能进行${typeConfig[type].title}`)
        return false
      }
      const unfilterItem = this.selectedItems.filter(item => item.idlefishStatus === type || item.publishStatus === type)
      if (unfilterItem.length !== 0) {
        this.$message.error(`已${typeConfig[type].title}的房源不能再${typeConfig[type].title}`)
        return false
      }
      this.dialogVisible = true;
      this.dialogTitle = typeConfig[type].title;
      this.publishSelect.mlzf = false;
      this.publishSelect.idlefish = false;
    },
    // 发布、撤销
    gotoHouseAsync() {
      let roomCodes = this.selectedItems.map(item => item.roomCode);
      let platform = [];
      for (var i in this.publishSelect) {
        if (this.publishSelect[i]) {
          platform.push(i);
        }
      }
      publishHouseApi({
        platforms: platform,
        roomCodeList: roomCodes
      },this.dialogTitle === "发布" ? 1 : 2).then(response => {
        this.$notify({
          title: '成功',
          message: '操作成功',
          type: 'success',
          duration: 2000,
        })
        this.dialogVisible=false;
        this.searchParam()
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.model-search .filter-item {
  margin-left: 10px;
}

.select-platform-container {
  height: 100px;
  padding: 15px 10px;
}

.item-select {
  width: 150px;
}

.left {
  margin-left: 5%;
}

.right {
  margin-right: 5%;
}

input[type="checkbox"] {
  display: none;
}

label {
  display: inline-block;
  width: 120px;
  height: 30px;
}

.ml-selectStatus {
  width: 40px;
  height: 30px;
  margin-top: -30px;
  font-size: 25px;
  color: #ffa500;
  float: right;
  border: 0.5px solid #e4e7ed;
  text-align: center;
  line-height: 35px;
}

.ml-selectName {
  background-color: #ebeef5;
  width: 80px;
  height: 30px;
  font-size: 14px;
  text-align: center;
  line-height: 30px;
}
.changeBackground {
  background-color: #ffa500;
  color: #ffffff;
}
//隐藏原生复选框
#mlRent {
  position: absolute;
  clip: rect(0, 0, 0, 0);
}
</style>
