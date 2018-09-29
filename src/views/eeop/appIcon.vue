<template>
  <div class="app-container">
    <div class="model-search clearfix">
      <el-select v-model="searchParams.cityId" size="small" filterable clearable placeholder="城市" @change="searchParam()">
        <el-option v-for="item in cityList" :key="item.cityId"
          :label="item.cityName" :value="item.cityId">
        </el-option>
      </el-select>
      <el-button class="right" type="primary" icon="el-icon-rank" size="small" @click.native="sortApp">APP展示排序</el-button>
      <el-button style="margin-right: 10px;" class="right" type="primary" icon="el-icon-plus" size="small" @click.native="handleDetail()">新增</el-button>
    </div>
    <GridUnit
      ref="refGridUnit"
      :columns="colModels"
      :showPagination="false"
      :formOptions="searchParams"
      :url="url"
      :listField="`data`"
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
      <el-dialog :title="temp.iconId ? `编辑icon` : `新增icon`" :visible.sync="layer_showInfo" @close="dialogClose">
        <el-form size="small" status-icon :rules="rules" ref="dataForm" :model="temp" label-width="80px">
          <el-form-item label="标题" prop="title">
            <el-input v-model="temp.title" placeholder="请输入标题" :maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="图片" prop="picList">
            <el-upload :action="`${actionBaseUrl}/util/upload/uploadPicture`"
              :before-upload="pictureUpload"
              :on-preview="picturePreview"
              :on-remove="(file, fileList)=>{return pictureRemove(file, fileList)}"
              :on-success="(response, file, fileList)=>{return pictureSuccess(response, file, fileList)}"
              :on-change="resetFile" :on-error="pictureError"
              :file-list="temp.picList || []"
              accept="image/jpg,image/jpeg,image/png" list-type="picture">
              <el-button size="small" type="primary" icon="el-icon-upload">上传图片</el-button>
              <div slot="tip" class="el-upload__tip">请上传480 * 240的jpg/png图片，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="跳转语义" prop="configId">
            <el-select v-model="temp.configId" size="small" clearable filterable placeholder="请选择">
              <el-option v-for="item in configList" :key="item.configId"
                :label="item.description" :value="item.configId">
                <span style="float: left">{{ item.description }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
              </el-option>
            </el-select>
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

    <!-- 列表排序 -->
    <div class="dialog-sort">
      <el-dialog title="APP展示排序" :visible.sync="layer_appsort" width="800px">
        <draggable class="list-group" element="ul" v-model="sort_tableData" :options="dragOptions" @start="isDragging=true" @end="isDragging=false">
          <transition-group type="transition" :name="'flip-list'">
            <li class="list-group-item clearfix" v-for="(item,index) in sort_tableData" :key="index">
              <span class="left sortContent">
                <i class="el-icon-d-caret" aria-hidden="true"></i>
                {{item.title}}
              </span>
            </li>
          </transition-group>
        </draggable>
        <div slot="footer" class="dialog-footer">
          <el-button @click="layer_appsort = false" size="small">取 消</el-button>
          <el-button type="primary" size="small" @click="saveSort()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import GridUnit from '@/components/GridUnit/grid'
import { deepClone, ObjectMap } from '@/utils'
import { appIconApi } from '@/api/eeop'

/* 阻止原生dragale打开新页面 */
document.body.ondrop = function(event) {
  event.preventDefault()
  event.stopPropagation()
}

export default {
  name: 'appIcon',
  components: {
    GridUnit,
    draggable
  },
  data() {
    return {
      searchParams: {
        cityId: ''
      },
      cityList: [],
      configList: [],
      colModels: [
        { prop: 'title', label: '标题', minWidth: 300 },
        { prop: 'picUrl', label: '图片', width: 200, type: 'img' },
        { label: '操作', slotName: 'handle', width: 200 }
      ],
      tableHeight: 300,
      url: appIconApi.defaultOptions.requestUrl,
      method: appIconApi.defaultOptions.method,
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        picList: [
          { required: true, message: '请上传图片', trigger: 'change' }
        ],
        configId: [
          { required: true, message: '请选择跳转语义', trigger: 'change' }
        ]
      },
      temp: {},
      actionBaseUrl: process.env.BASE_API,
      layer_showInfo: false,
      layer_appsort: false,
      isDragging: false,
      delayedDragging: false,
      sort_tableData: []
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
    },
    dragOptions() {
      return {
        animation: 0,
        group: 'description',
        ghostClass: 'ghost'
      }
    }
  },
  methods: {
    searchParam() {
      this.$refs.refGridUnit.searchHandler()
    },
    handleDetail(row = {}) {
      this.temp = {
        ...deepClone(row),
        cityId: row.cityId || this.searchParams.cityId,
        picList: row.picUrl ? [{ url: row.picUrl, name: '查看图片' }] : []
      }
      this.temp.picList = row.picUrl ? [{
        url: row.picUrl,
        name: '查看图片'
      }] : []
      appIconApi.configList().then(response => {
        this.configList = response.data || []
        this.layer_showInfo = true
      })
    },
    handleDelete(row) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        appIconApi.delete({
          iconId: row.iconId
        }).then(response => {
          this.searchParam()
          this.$notify({
            title: '成功',
            message: '操作成功',
            type: 'success',
            duration: 2000
          })
        })
      }).catch(() => {

      })
    },
    saveData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const saveApi = this.temp.iconId ? appIconApi.edit : appIconApi.add
          const { configId, iconId, title, cityId } = this.temp
          saveApi(ObjectMap({
            configId,
            iconId,
            title,
            cityId,
            picUrl: this.temp.picList.length > 0 ? this.temp.picList[0].url : ''
          })).then(response => {
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
    saveSort() {
      this.sort_tableData.forEach((item, index) => item.sortNum = index * 1 + 1)
      appIconApi.saveSort(ObjectMap({
        cityId: this.searchParams.cityId,
        list: this.sort_tableData
      })).then(response => {
        this.layer_appsort = false
        this.searchParam()
        this.$notify({
          title: '成功',
          message: '操作成功',
          type: 'success',
          duration: 2000
        })
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
      const previewObj = { src: this.temp.picList[0].url }
      const _img = new Image()
      _img.src = this.temp.picList[0].url
      _img.onload = function() {
        previewObj.w = _img.width || 800
        previewObj.h = _img.height || 600
        _this.$preview.open(0, [previewObj])
      }
    },
    pictureSuccess(response, file, fileList) {
      console.log('success')
      const picList = response.data.map(item => {
        return {
          url: item,
          name: '查看图片'
        }
      })
      this.$set(this.temp, 'picList', picList)
      if (fileList.length > 1) {
        fileList.splice(0, 1)
      }
    },
    pictureError(err, file) {
      file = null
    },
    resetFile(file) {
      file = null
    },
    /* 列表排序 */
    sortApp() {
      this.sort_tableData = this.$refs.refGridUnit.tableData.sort((a, b) => a['sortNum'] * 1 - b['sortNum'] * 1)
      if (this.sort_tableData.length == 0) {
        this.$message.error('没有可排序的数据')
        return false
      }
      this.layer_appsort = true
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
