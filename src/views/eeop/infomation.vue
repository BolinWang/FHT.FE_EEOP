<template>
  <div class="app-container">
    <div class="model-search clearfix">
      <el-select v-model="searchParams.cityId" size="small" filterable clearable placeholder="城市" @change="searchParam()">
        <el-option v-for="item in cityList" :key="item.cityId"
          :label="item.cityName" :value="item.cityId">
        </el-option>
      </el-select>
      <el-select v-model="searchParams.status" clearable size="small"
        placeholder="大麦状态" @change="searchParam()"
        style="margin-left: 10px;">
        <el-option v-for="item in selectData" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button class="right" type="primary" icon="el-icon-plus" size="small" @click.native="handleDetail()">新增</el-button>
    </div>
    <GridUnit
      ref="refGridUnit"
      :columns="colModels"
      :url="url"
      :formOptions="searchParams"
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
          <el-form-item label="链接" prop="newsUrl">
            <el-input style="width: 100%" v-model="temp.newsUrl" placeholder="请输入有效链接">
            </el-input>
          </el-form-item>
          <el-form-item label="上线时间" prop="effectiveTime">
            <el-date-picker
              v-model="temp.effectiveTime"
              type="datetime"
              key="effectiveTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择上线时间"
              :disabled="(temp.status && temp.status !== 1) || temp.nowOnline"
              @change="startChange">
            </el-date-picker>
            <el-checkbox v-model="temp.nowOnline" class="filter-item" @change="changeOnline">立即上线</el-checkbox>
          </el-form-item>
          <el-form-item label="下线时间" prop="ineffectiveTime">
            <el-date-picker
              v-model="temp.ineffectiveTime"
              type="datetime"
              key="ineffectiveTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择下线时间"
              :disabled=" (temp.status && temp.status !== 1) || temp.nowOffline"
              @change="endChange">
            </el-date-picker>
            <el-checkbox v-model="temp.nowOffline" class="filter-item" @change="changeOffline">立即下线</el-checkbox>
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
import { deepClone, parseTime, ObjectMap } from '@/utils'
import { validateURL } from '@/utils/validate'
import { infomationApi, appIconApi } from '@/api/eeop'

export default {
  name: 'infomation',
  directives: {
    waves
  },
  components: {
    GridUnit
  },
  data() {
    const validateUrl = (rule, value, callback) => {
      if (!validateURL(value)) {
        callback(new Error('请输入合法的链接'))
      } else {
        callback()
      }
    }
    return {
      searchParams: {
        status: '',
        cityId: ''
      },
      cityList: [],
      selectData: [
        { value: 1, label: '待上线' },
        { value: 2, label: '已上线' },
        { value: 3, label: '已下线' }
      ],
      colModels: [
        {
          prop: 'newsStatus',
          label: '状态',
          width: 80,
          type: 'status',
          unitFilters: {
            renderStatusType(status) {
              const statusMap = {
                '1': 'info',
                '2': 'success',
                '3': 'danger'
              }
              return statusMap[status] || 'info'
            },
            renderStatusValue(status) {
              const statusStrData = ['待上线', '已上线', '已下线']
              return statusStrData[status - 1] || '待上线'
            }
          }
        },
        { prop: 'cityName', label: '城市' },
        { prop: 'title', label: '标题' },
        { prop: 'newsUrl', label: '链接', type: 'link' },
        { prop: 'effectiveTime', label: '上线时间', width: 180, filter: 'parseTime' },
        { prop: 'ineffectiveTime', label: '下线时间', width: 180, filter: 'parseTime' },
        { label: '操作', slotName: 'handle', width: 200, fixed: 'right', align: 'center' }
      ],
      tableHeight: 300,
      url: infomationApi.defaultOptions.requestUrl,
      method: infomationApi.defaultOptions.method,
      temp: {
        nowOnline: false,
        nowOffline: false
      },
      actionBaseUrl: process.env.BASE_API,
      layer_showInfo: false,
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        newsUrl: [
          { required: true, validator: validateUrl, trigger: 'blur' }
        ],
        effectiveTime: [
          { required: true, message: '请选择上线时间', trigger: 'change' }
        ],
        ineffectiveTime: [
          { required: true, message: '请选择下线时间', trigger: 'change' }
        ]
      }
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
    searchParam() {
      this.$refs.refGridUnit.searchHandler()
    },
    /**
     * 时间控件
     */
    startChange(val) {
      this.temp.effectiveTime = val
    },
    endChange(val) {
      this.temp.ineffectiveTime = val
    },
    /**
     * checkbox切换
     */
    changeOnline(val) {
      this.temp.effectiveTime = parseTime(new Date())
      if (val) {
        this.temp.nowOffline = false
      }
    },
    changeOffline(val) {
      this.temp.ineffectiveTime = parseTime(new Date())
      if (val) {
        this.temp.nowOnline = false
      }
    },
    /**
     * 删除
     */
    handleDelete(row) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        infomationApi.delete({
          id: row.id
        }).then(response => {
          this.searchParam()
          this.$notify({
            title: '成功',
            message: '操作成功',
            type: 'success',
            duration: 2000
          })
        })
      }).catch(() => {})
    },
    /**
     * 新增编辑
     */
    handleDetail(row = {}) {
      const cloneRow = deepClone(row)
      const { effectiveTime, ineffectiveTime } = cloneRow
      this.temp = {
        ...cloneRow,
        effectiveTime: effectiveTime ? parseTime(effectiveTime) : '',
        ineffectiveTime: ineffectiveTime ? parseTime(ineffectiveTime) : '',
        nowOffline: false,
        nowOnline: false,
        cityId: cloneRow.cityId || this.searchParams.cityId
      }
      this.layer_showInfo = true
    },
    saveData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.temp.effectiveTime >= this.temp.ineffectiveTime) {
            this.$message.error('上线时间必须小于下线时间')
            return false
          }
          const saveApi = this.temp.id ? infomationApi.edit : infomationApi.add
          const { id, title, newsUrl, effectiveTime, ineffectiveTime, cityId } = this.temp
          const status = this.temp.nowOnline ? 2 : (this.temp.nowOffline ? 3 : 1)
          saveApi(ObjectMap({ id, title, newsUrl, effectiveTime, ineffectiveTime, cityId, status })).then(response => {
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
      this.$refs.dataForm.resetFields()
      this.layer_showInfo = false
      this.temp = {
        nowOffline: false,
        nowOnline: false
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
