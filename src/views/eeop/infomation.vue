<template>
  <div class="app-container">
    <div class="model-search clearfix">
      <el-select v-model="selectData.value" clearable size="small" placeholder="大麦状态" @change="searchParam()">
        <el-option v-for="item in selectData.options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button class="right" type="primary" icon="el-icon-plus" size="small" @click.native="handleDetail()">新增</el-button>
    </div>
    <GridUnit
      ref="refGridUnit"
      :columns="colModels"
      :url="url"
      :dataMethod="method"
      :height="tableHeight">
      <template slot="handle" slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" size="small"
          @click="handleDetail(scope.row)">
          编辑
        </el-button>
        <el-button type="danger" icon="el-icon-delete" size="small"
          @click="handleDelete(scope.row)">
          删除
        </el-button>
      </template>
    </GridUnit>

    <!-- 新增编辑dialog -->
    <div class="dialog-info">
      <el-dialog :title="temp.id ? `编辑大麦消息` : `新增大麦消息`" :visible.sync="layer_showInfo" @close="dialogClose">
        <el-form size="small" status-icon :rules="rules" ref="dataForm" :model="temp" label-width="100px">
          <el-form-item label="标题" prop="title">
            <el-input v-model="temp.title" placeholder="请输入标题" :maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="链接" prop="linkUrl">
            <el-autocomplete style="width: 100%" v-model="temp.linkUrl" placeholder="请输入有效链接">
            </el-autocomplete>
          </el-form-item>
          <el-form-item label="上线时间" prop="effectiveTime">
            <el-date-picker
              v-model="temp.effectiveTime"
              type="datetime"
              placeholder="选择上线时间">
            </el-date-picker>
            <el-checkbox v-model="nowOnline" class="filter-item">立即上线</el-checkbox>
          </el-form-item>
          <el-form-item label="下线时间" prop="ineffectiveTime">
            <el-date-picker
              v-model="temp.ineffectiveTime"
              type="datetime"
              placeholder="选择下线时间">
            </el-date-picker>
            <el-checkbox v-model="nowOffline" class="filter-item">立即下线</el-checkbox>
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
import { infomationApi } from '@/api/eeop'

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
      selectData: {
        options: [
          { value: 1, label: '待上线' },
          { value: 2, label: '已上线' },
          { value: 3, label: '已下线' }
        ],
        value: ''
      },
      colModels: [
        { prop: 'status', label: '状态', width: 80, type: 'status' },
        { prop: 'title', label: '标题' },
        { prop: 'linkUrl', label: '链接', type: 'link' },
        { prop: 'effectiveTime', label: '上线时间', width: 180, filter: 'formatTime' },
        { prop: 'ineffectiveTime', label: '下线时间', width: 180, filter: 'formatTime' },
        { label: '操作', slotName: 'handle', width: 200 }
      ],
      tableHeight: 300,
      url: infomationApi.defaultOptions.requestUrl,
      method: infomationApi.defaultOptions.method,
      temp: {},
      actionBaseUrl: process.env.BASE_API,
      layer_showInfo: false
    }
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
    searchParam() {
      this.$refs.refGridUnit.searchHandler()
    },
    handleDetail(row = {}) {
      this.temp = deepClone(row)
      this.layer_showInfo = true
    },
    handleDelete(row) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

      }).catch(() => {

      })
    },
    saveData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {

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
</style>
