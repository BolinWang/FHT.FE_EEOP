/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-07-11 13:49:21
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-07-12 17:55:59
 */

 <template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane v-for="(item,index) in tabMapOptions" :label="item" :key='index' :name="item">
        <el-form class="model-search clearfix" :inline="true" size="small">
          <div>
            <el-select size="small" v-model="searchParams.type" filterable clearable placeholder="房间状态" class="item-select">
              <el-option label="已出租" :value="1"></el-option>
              <el-option label="未出租" :value="2"></el-option>
            </el-select>
            <el-select size="small" v-model="searchParams.type" filterable clearable placeholder="房间类型" class="item-select filter-item">
              <el-option label="普通" :value="1"></el-option>
              <el-option label="金融" :value="2"></el-option>
              <el-option label="飞虎队" :value="3"></el-option>
            </el-select>
            <el-select size="small" v-model="searchParams.type" filterable clearable placeholder="发布状态" class="item-select filter-item">
              <el-option label="已发布" :value="2"></el-option>
              <el-option label="未发布" :value="3"></el-option>
            </el-select>
            <el-button size="small" type="primary" icon="el-icon-search" @click="searchParam" class="filter-item">查询</el-button>
            <el-button size="small" icon="el-icon-remove-outline" @click="searchParam('clear')" class="filter-item">清空</el-button>
          </div>
          <div style="margin-top: 10px;">
            <el-input size="small" v-model="searchParams.organizationName" clearable placeholder="组织名称" style="width:150px;"></el-input>
            <el-input size="small" v-model="searchParams.mobile" clearable placeholder="手机号/姓名" class="filter-item" style="width:150px;"></el-input>
            <el-input size="small" v-model="searchParams.mobile" clearable placeholder="公寓/小区-房间" class="filter-item" style="width:150px;"></el-input>
            <el-button size="small" type="success" icon="el-icon-upload" class="filter-item" @click="syncItems('on')">发布</el-button>
            <el-button size="small" type="danger" icon="el-icon-remove" class="filter-item" @click="syncItems('off')">撤销</el-button>
          </div>
        </el-form>
        <GridUnit
          ref="refGridUnit"
          :columns="colModels"
          :formOptions="searchParams"
          :url="url"
          :showSelection="true"
          :pageSizes="[100, 200, 300, 500]"
          :dataMethod="method"
          :height="tableHeight"
          @selection-change="handleSelectionChange">
        </GridUnit>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import GridUnit from '@/components/GridUnit/grid'
import { deepClone, cleanArray, ObjectMap } from '@/utils'
import { hotRecommendApi, appIconApi } from '@/api/eeop'
export default {
  name: 'houseSync',
  components: {
    GridUnit
  },
  data() {
    return {
      tabMapOptions: ['整租','合租', '集中式'],
      activeName: '整租',
      searchParams: {
        type: 2,
        organizationName: '',
        mobile: ''
      },
      selectedItems: [],
      colModels: [
        { prop: 'status', label: '组织名称' },
        { prop: 'status', label: '姓名', width: 100 },
        { prop: 'status', label: '手机号', width: 150 },
        { prop: 'status', label: '用户类型', width: 100 },
        { prop: 'status', label: '房源位置', width: 200 },
        { prop: 'status', label: '公寓/小区-房间', width: 200 },
        { prop: 'status', label: '房源类型', width: 150 },
        { prop: 'status', label: '房间状态', width: 100 },
        { prop: 'status', label: '房源编码', width: 100 },
        { prop: 'status', label: '房价(元/月)', width: 100, align: 'right' },
        { prop: 'status', label: '麦邻租房', width: 100 },
        { prop: 'status', label: '闲鱼租房', width: 100 },
        { prop: 'status', label: '操作记录', width: 180 }
      ],
      tableHeight: 300,
      url: hotRecommendApi.defaultOptions.requestUrl,
      method: hotRecommendApi.defaultOptions.method
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
    tableStyle: function() {
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
        this.searchParams = {}
      }
      this.$refs.refGridUnit[0].searchHandler()
    },
    // 选择列表
    handleSelectionChange(list) {
      this.selectedItems = list
    },
    // 发布、撤销
    syncItems(type = 'on') {
      const typeTitle = {
        'on': {
          title: '发布'
        },
        'off': {
          title: '撤销'
        }
      }
      if (this.selectedItems.length === 0) {
        this.$message.error(`请选择需要${typeTitle[type].title}的房源`)
        return false
      }
      const unfilterItem = this.selectedItems.filter((item) => {
        return item.status === type
      })
      if (unfilterItem.length === 0) {
        this.$message.error(`已${typeTitle[type].title}的房源不能再${typeTitle[type].title}`)
        return false
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.model-search .filter-item {
  margin-left: 10px;
}

.item-select {
  width: 150px;
}
</style>
