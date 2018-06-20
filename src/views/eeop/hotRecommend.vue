<template>
  <div class="app-container">
    <el-form :inline="true" :model="searchParams" size="small">
      <el-form-item>
        <el-select v-model="searchParams.cityId" size="small" filterable clearable placeholder="城市">
          <el-option v-for="item in cityList" :key="item.cityId"
            :label="item.cityName" :value="item.cityId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchParams.status" filterable clearable placeholder="搜索词状态">
          <el-option label="未推荐" value="1"></el-option>
          <el-option label="已推荐" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchParams.keyword" clearable placeholder="搜索词"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="searchParam">查询</el-button>
        <el-button icon="el-icon-remove-outline" @click="searchParam('clear')">清空</el-button>
      </el-form-item>
      <el-button class="right" type="primary" size="small" icon="el-icon-plus" @click="handleAdd">新增搜索词</el-button>
    </el-form>
    <GridUnit
      ref="refGridUnit"
      :columns="colModels"
      :showPagination="false"
      :url="url"
      :listField="`data`"
      :dataMethod="method"
      :height="tableHeight">
      <template slot="handle" slot-scope="scope">
        <el-button v-if="scope.row.status === 2" type="primary" icon="el-icon-setting" size="small"
          @click="handleSetting(scope.row)">
          设为推荐词
        </el-button>
        <el-button v-else type="danger" icon="el-icon-warning" size="small"
          @click="handleSetting(scope.row)">
          取消设置
        </el-button>
      </template>
    </GridUnit>
    <!-- 新增dialog -->
    <div class="dialog-info">
      <el-dialog title="新增搜索词" :visible.sync="layer_showInfo" @close="dialogClose">
        <el-form size="small" status-icon :rules="rules" ref="dataForm" :model="temp" label-width="100px">
          <el-form-item label="搜索词" prop="data">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8}"
              placeholder="输入多个搜索词时，请换行区分"
              v-model="temp.data">
            </el-input>
          </el-form-item>
          <el-form-item label="投放城市">
            <el-select v-model="temp.cityId" size="small" clearable filterable placeholder="全部城市">
              <el-option v-for="item in cityList" :key="item.cityId"
                :label="item.cityName" :value="item.cityId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="layer_showInfo = false" size="small">取 消</el-button>
          <el-button type="primary" size="small" @click="saveData">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import waves from '@/directive/waves'
import GridUnit from '@/components/GridUnit/grid'
import { deepClone } from '@/utils'
import { hotRecommendApi, appIconApi } from '@/api/eeop'

export default {
  name: 'hotRrcommend',
  directives: {
    waves
  },
  components: {
    GridUnit
  },
  data() {
    return {
      searchParams: {
        status: '',
        keyword: '',
        cityId: ''
      },
      temp: {},
      cityList: [],
      colModels: [
        { prop: 'title', label: '搜索词TOP' },
        { prop: 'title', label: '搜索次数', sortable: true, align: 'right' },
        { prop: 'title', label: '搜索结果数', sortable: true, align: 'right' },
        { label: '操作', slotName: 'handle', width: 150, fixed: 'right', align: 'center' },
        { prop: 'title', label: '操作时间', width: 150, fixed: 'right', filter: 'parseTime'}
      ],
      tableHeight: 300,
      url: hotRecommendApi.defaultOptions.requestUrl,
      method: hotRecommendApi.defaultOptions.method,
      rules: {
        data: [
          { required: true, message: '请输入搜索词', trigger: 'blur' }
        ]
      },
      temp: {},
      actionBaseUrl: process.env.BASE_API,
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
    handleAdd() {
      this.temp = {
        data: '',
        cityId: this.searchParams.cityId
      }
      this.layer_showInfo = true
    },
    handleSetting(row) {

    },
    saveData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let multiVals = this.temp.data.split(/[\n|\r\n|\r]/gi).join(',')
          console.log(multiVals)
          this.searchParam()
          this.layer_showInfo = false
          this.$notify({
            title: '成功',
            message: '等待接口',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    dialogClose() {
      this.temp = {}
      this.$refs.dataForm.resetFields()
      this.layer_showInfo = false
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.pswp {
  z-index: 9999999;
}
.model-table {
  margin: 0;
}
</style>
