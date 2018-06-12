<template>
  <div class="app-container">
    <el-form :inline="true" :model="formOptions" size="small">
      <el-form-item>
        <el-select v-model="formOptions.cityId" filterable clearable placeholder="城市">
          <el-option v-for="item in cityList" :key="item.cityId"
            :label="item.cityName" :value="item.cityId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="formOptions.status" filterable clearable placeholder="搜索词状态">
          <el-option label="未推荐" value="1"></el-option>
          <el-option label="已推荐" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formOptions.keyword" clearable placeholder="搜索词"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="searchParam">查询</el-button>
        <el-button icon="el-icon-remove-outline" @click="searchParam('clear')">清空</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增搜索词</el-button>
      </el-form-item>
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
  </div>
</template>
<script>
import waves from '@/directive/waves'
import GridUnit from '@/components/GridUnit/grid'
import { deepClone } from '@/utils'
import { hotRecommendApi } from '@/api/eeop'

export default {
  name: 'auditFhd',
  directives: {
    waves
  },
  components: {
    GridUnit
  },
  data() {
    return {
      formOptions: {
        status: '',
        keyword: '',
        cityId: ''
      },
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
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        picList: [
          { required: true, message: '请上传图片', trigger: 'change' }
        ]
      },
      temp: {},
      actionBaseUrl: process.env.BASE_API,
      layer_showInfo: false
    }
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
        this.formOptions = {}
      }
      this.$refs.refGridUnit.searchHandler()
    },
    handleAdd() {
      this.layer_showInfo = true
    },
    handleSetting(row) {

    },
    saveData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const saveApi = this.temp.iconId ? hotRecommendApi.edit : hotRecommendApi.add
          saveApi({
            iconId: this.temp.iconId,
            title: this.temp.title,
            picUrl: this.temp.picList.length > 0 ? this.temp.picList[0].url : ''
          }).then(response => {
            this.searchParam()
            this.layer_showInfo = false
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
    },
    /* 上传图片 */
    pictureUpload(file) {
      const isLt500K = file.size / 1024 / 1024 <= 0.5
      if (['image/jpeg', 'image/jpg', 'image/png'].indexOf(file.type) == -1) {
        this.$message.error('请上传jpg/png的图片')
        return false
      }
      if (!isLt500K) {
        this.$message.error('请上传500Kb大小以内的图片')
        return false
      }
    },
    pictureRemove(file, fileList) {
      console.log('remove')
      this.temp.picList = []
    },
    picturePreview(file) {
      const _this = this
      if (!this.temp.picList || this.temp.picList.length == 0) {
        this.$message.error('图片预览失败')
        return false
      }
      let previewObj = {src: this.temp.picList[0].url}
      let _img = new Image()
      _img.src = this.temp.picList[0].url
      _img.onload = function() {
        previewObj.w = _img.width || 800
        previewObj.h = _img.height || 600
        _this.$preview.open(0, [previewObj])
      }
    },
    pictureSuccess(response, file, fileList) {
      console.log('success')
      fileList = response.data.map(item => {
        return {
          url: item,
          name: '查看图片'
        }
      })
      this.$set(this.temp, 'picList', fileList)
    },
    pictureError(err, file) {
      file = null
    },
    resetFile(file) {
      file = null
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
