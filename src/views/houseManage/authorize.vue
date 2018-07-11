<template>
  <div class="app-container">
    <el-form class="model-search clearfix" :inline="true" size="small">
      <el-select size="small" v-model="searchParams.type" filterable clearable placeholder="组织类型" class="item-select">
        <el-option label="公司企业" :value="2"></el-option>
        <el-option label="个人" :value="3"></el-option>
        <el-option label="系统" :value="1"></el-option>
      </el-select>
      <el-input size="small" v-model="searchParams.organizationName" clearable placeholder="组织名称" class="filter-item" style="width:180px;"></el-input>
      <el-input size="small" v-model="searchParams.mobile" clearable placeholder="手机号" class="filter-item" style="width:180px;"></el-input>
      <el-button size="small" type="primary" icon="el-icon-search" @click="searchParam" class="filter-item">查询</el-button>
      <el-button size="small" icon="el-icon-remove-outline" @click="searchParam('clear')" class="filter-item">清空</el-button>
    </el-form>
    <GridUnit
      ref="refGridUnit"
      :columns="colModels"
      :formOptions="searchParams"
      :showPagination="false"
      :url="url"
      :dataMethod="method"
      :height="tableHeight"
      :showExpand="true"
      :expandType="`table`"
      :expandColums="colModels">
      <template slot="expandTable" slot-scope="scope">
        <el-table :data="scope.row || []" style="width: 100%"
          border
          :max-height="300"
          size="small"
          :header-row-class-name="`expandHeader`">
          <el-table-column v-for="(item, index) in colModels" :label="item.label" :key="index" :prop="item.prop">
          </el-table-column>
        </el-table>
      </template>
      <template slot="handle" slot-scope="scope">
        <el-button v-if="scope.row.status === 0" type="primary" icon="el-icon-setting" size="small"
          @click="handleSetting(scope.row)">
          申请开通
        </el-button>
        <el-button v-else type="success" disabled icon="el-icon-success" size="small">
          已开通
        </el-button>
      </template>
    </GridUnit>
  </div>
</template>
<script>
import GridUnit from '@/components/GridUnit/grid'
import { deepClone, cleanArray, ObjectMap } from '@/utils'
import { hotRecommendApi, appIconApi } from '@/api/eeop'

export default {
  name: 'authorize',
  components: {
    GridUnit
  },
  data() {
    return {
      searchParams: {
        type: 2,
        organizationName: '',
        mobile: ''
      },
      cityList: [],
      colModels: [
        { prop: 'organizationName', label: '组织名称' },
        { prop: 'status', label: '组织状态' },
        { prop: 'status', label: '姓名' },
        { prop: 'status', label: '手机号' },
        { prop: 'status', label: '用户类型' },
        { prop: 'status', label: '账号状态' },
        { prop: 'status', label: '闲鱼账号' },
        { label: '操作', slotName: 'handle', width: 150, align: 'center' },
        { prop: 'status', label: '闲鱼昵称' }
      ],
      tableHeight: 300,
      url: hotRecommendApi.defaultOptions.requestUrl,
      method: hotRecommendApi.defaultOptions.method,
      rules: {
        data: [
          { required: true, message: '请输入搜索词', trigger: 'blur' }
        ],
        cityId: [
          { required: true, message: '请选择城市', trigger: 'change' }
        ]
      },
      temp: {},
      layer_showInfo: false
    }
  },
  created () {
    appIconApi.cityList().then(response => {
      this.cityList = response.data
    })
  },
  mounted() {
    /* 表格高度控制 */
   this.$nextTick(() => {
      const offsetTop = this.$refs.refGridUnit.$el.offsetTop || 140
      const pagenationH = 5
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
    searchParam(type) {
      if (type === 'clear') {
        this.searchParams = {}
      }
      this.$refs.refGridUnit.searchHandler()
    },
    handleSetting(row) {

    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.model-table {
  margin-bottom: 0;
}
</style>
