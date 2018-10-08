<template>
  <div class="app-container">
    <el-form class="model-search clearfix" :inline="true" size="small">
      <el-select size="small" v-model="searchParams.cityId" filterable clearable placeholder="城市" class="item-select">
        <el-option v-for="item in cityList" :key="item.cityId"
          :label="item.cityName" :value="item.cityId">
        </el-option>
      </el-select>
      <el-select size="small" v-model="searchParams.status" filterable clearable placeholder="搜索词状态" class="item-select filter-item">
        <el-option label="未推荐" :value="0"></el-option>
        <el-option label="已推荐" :value="1"></el-option>
      </el-select>
      <el-input size="small" v-model="searchParams.keyword" clearable placeholder="搜索词" class="filter-item" style="width:180px;"></el-input>
      <el-button size="small" type="primary" icon="el-icon-search" @click="searchParam" class="filter-item">查询</el-button>
      <el-button size="small" icon="el-icon-remove-outline" @click="searchParam('clear')" class="filter-item">清空</el-button>
      <el-button size="small" class="right" type="primary" icon="el-icon-plus" @click="handleAdd">新增搜索词</el-button>
    </el-form>
    <GridUnit
      ref="refGridUnit"
      :columns="colModels"
      :formOptions="searchParams"
      :url="url"
      :dataMethod="method"
      :height="tableHeight">
      <template slot="handle" slot-scope="scope">
        <el-button v-if="scope.row.status === 0" type="primary" icon="el-icon-setting" size="small"
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
          <el-form-item label="投放城市" prop="cityId">
            <el-select v-model="temp.cityId" size="small" clearable filterable placeholder="请选择城市">
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
import { cleanArray, ObjectMap } from '@/utils'
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
      cityList: [],
      colModels: [
        { prop: 'keyword', label: '搜索词TOP' },
        { prop: 'searchTimes', label: '搜索次数', sortable: true, align: 'right', render(row) {
          return row.searchTimes || 0
        } },
        { prop: 'resultAmount', label: '搜索结果数', sortable: true, align: 'right', render(row) {
          return row.resultAmount || 0
        } },
        { prop: 'gmtModified', label: '操作时间', width: 150, filter: 'parseTime' },
        { label: '操作', slotName: 'handle', width: 150, align: 'center' }
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
  created() {
    appIconApi.cityList().then(response => {
      this.cityList = response.data
    })
  },
  mounted() {
    /* 表格高度控制 */
    this.$nextTick(() => {
      const offsetTop = this.$refs.refGridUnit.$el.offsetTop || 140
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
      hotRecommendApi.set({
        id: row.id,
        status: 1 - row.status
      }).then(response => {
        this.searchParam()
        this.$notify({
          title: '成功',
          message: '操作成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    saveData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const keywords = this.temp.data.split(/[\n|\r\n|\r]/gi)
          hotRecommendApi.add(ObjectMap({
            cityId: this.temp.cityId,
            keywords: cleanArray(keywords)
          })).then(response => {
            this.layer_showInfo = false
            this.searchParam()
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success',
              duration: 2000
            })
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
  margin-bottom: 0;
}
</style>
