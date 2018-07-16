<template>
  <div class="clearfix">
    <div class="model-search clearfix">
      <el-form size="small" :inline="true" :model="formData">
        <el-select size="small" v-model="formData.cityId" placeholder="城市" class="item-select" style="width: 150px;" clearable>
          <el-option v-for="item in cityOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-if="type == 2" size="small" v-model="formData.houseFinanceType" placeholder="房源类型" class="item-select filter-item" style="width: 150px;" clearable>
          <el-option v-for="item in houseFinanceOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-if="type == 2" size="small" v-model="formData.houseRentType" placeholder="房源类别" class="item-select filter-item" style="width: 150px;" clearable>
          <el-option v-for="item in houseRentTypeOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-input v-if="type === 1" size="small" v-model="formData.keyword" placeholder="精品公寓名称" class="filter-item" style="width:180px;" @keydown.native.enter="searchParam">
        </el-input>
        <el-input v-if="type === 2" size="small" v-model="formData.subdistrictName" placeholder="小区地址" class="filter-item" style="width:180px;" @keydown.native.enter="searchParam">
        </el-input>
        <el-input v-if="type === 2" size="small" v-model="formData.roomCode" placeholder="房源编码" class="filter-item" style="width:150px;" @keydown.native.enter="searchParam">
        </el-input>
        <el-button type="primary" size="small" icon="el-icon-search" @click.native="searchParam" v-waves class="filter-item">查询</el-button>
        <el-button plain size="small" icon="el-icon-remove-outline" @click.native="clearForm">清空</el-button>
      </el-form>
    </div>
    <div class="model-table" :style="tableStyle">
      <el-table :data="tableData" v-loading.body="listLoading" :max-height="tableHeight" size="small" fit stripe highlight-current-row>
        <el-table-column type="index" width="60" align="center"></el-table-column>
        <el-table-column v-for="(item,index) in colModels" :label="item.label" :width="item.width" :key="index" fit :show-overflow-tooltip="!item.toolTip">
          <template slot-scope="scope">
            <span v-if="item.type === 'img'">
              <img class="image image-center" width="40" height="40"
                v-if="scope.row[item.prop][0]"
                v-lazy="scope.row[item.prop][0]"
                @click="showImage(scope.row[item.prop][0])" />
              <span v-else></span>
            </span>
            <span v-else-if="item.type === 'tags'">
                <el-tag style="margin: 0 5px 5px 0;"
                  v-for="(tag,tagIndex) in scope.row.tags"
                  :type="tag | filterTags"
                  :key="tagIndex">
                  {{tag}}
                </el-tag>
            </span>
            <span v-else-if="item.type === 'formatTime'">
              {{scope.row[item.prop] | parseTime()}}
            </span>
            <span v-else>
              {{scope.row[item.prop]}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-view" size="small" @click="handleView(scope.$index,scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="model-pagination">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageItems.pageNo" :page-sizes="pageSizeList" :page-size="pageItems.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- 查看图片 -->
    <div class="dialog-image">
      <el-dialog title="" width="100%" :show-close="false" :visible.sync="layer_showImage" style="text-align: center;" @click.native="layer_showImage = false">
        <img class="image" :src="showPicUrl" />
      </el-dialog>
    </div>
    <!-- 房源信息 -->
    <div class="dialog-info">
      <el-dialog title="房源详情" @close="dialogClose" :visible.sync="layer_showInfo" width="800px">
        <house-info v-if="housingType == 2" :type="`published`" :temp-data="temp" @saveReviewData="saveReviewData">
        </house-info>
        <estate-info v-if="housingType == 1" :type="`published`" :temp-data="temp" @saveReviewData="saveReviewData">
        </estate-info>
        <div slot="footer" class="dialog-footer">
          <el-button @click="layer_showInfo = false" size="small">取 消</el-button>
          <el-button type="primary" @click="saveData" size="small">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { parseTime, ObjectMap, deepClone } from '@/utils'
import { queryPublishRoomListByPageApi, queryPublishRoomDetailApi, savePublishStatusApi, batchRemoveRoomPictureApi } from '@/api/auditCenter'
import { getCityListApi } from '@/api/houseManage'
import waves from '@/directive/waves'
import houseInfo from '@/views/auditManage/components/houseInfo'
import estateInfo from '@/views/auditManage/components/estateInfo'

export default {
  name: 'auditPublish',
  props: {
    type: {
      type: Number,
      default: 2
    }
  },
  components: {
    houseInfo,
    estateInfo
  },
  directives: {
    waves
  },
  filters: {
    filterTags(val) {
      const filterObj = {
        '整租': '',
        '合租': 'info',
        '金融': 'warning',
        '飞虎队': 'success',
        '图招': 'danger'
      }
      return filterObj[val] || ''
    }
  },
  data() {
    return {
      formData: {
        cityId: '',
        houseFinanceType: '',
        houseRentType: '',
        keyword: '',
        subdistrictName: '',
        roomCode: ''
      },
      cityOptions: [],
      houseRentTypeOptions: [
        { label: '整租', value: 1 },
        { label: '合租', value: 2 }
      ],
      houseFinanceOptions: [
        { label: '普通', value: 1 },
        { label: '金融', value: 2 }
      ],
      temp: {},
      reviewData: {},
      listLoading: true,
      colModels: [
        { prop: 'city', label: '城市', width: 100 },
        { prop: 'roomInfo', label: '小区-房间' },
        { prop: 'roomCode', label: '房源编号', width: 100 },
        { prop: 'picUrls', label: '房源首图', type: 'img', width: 80 },
        { prop: 'tags', label: '标签', type: 'tags', width: 200 },
        { prop: 'roomType', label: '室卫厅', width: 100 },
        { prop: 'roomArea', label: '面积(㎡)', width: 80 },
        { prop: 'publishTime', label: '发布时间', width: 140, type: 'formatTime' }
      ],
      tableHeight: 300,
      tableData: [],
      total: null,
      pageItems: {
        pageNo: 1,
        pageSize: 20
      },
      searchParams: {},
      pageSizeList: [10, 20, 30, 50],
      showPicUrl: '',
      layer_showInfo: false,
      layer_showImage: false
    }
  },
  created() {
    this.housingType = this.type;
    if (this.housingType == 1) {
      this.$set(this.colModels[1], 'label', '精品公寓-房型');
      this.colModels.splice(2, 1);
      this.colModels.splice(-1, 1);
    }
    this.getCityList();
    this.getGridData(this.pageItems);
  },
  mounted() {
    /* 表格高度控制 */
    let temp_height = document.body.clientHeight - 267;
    this.tableHeight = temp_height > 300 ? temp_height : 300;
    window.onresize = () => {
      return (() => {
        temp_height = document.body.clientHeight - 267;
        this.tableHeight = this.tableHeight = temp_height > 300 ? temp_height : 300;
      })()
    }
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
    /* 获取城市列表 */
    getCityList() {
      getCityListApi({
        housingType: this.housingType
      }).then(response => {
        this.cityOptions = response.data.list.map((item) => ({ 'label': item.areaName, 'value': item.areaId }))
      });
    },
    /* 查看图片 */
    showImage(picUrl) {
      if (!picUrl) {
        return false;
      }
      this.showPicUrl = picUrl;
      this.layer_showImage = true;
    },
    handleSizeChange(val) {
      this.pageItems.pageSize = val;
      this.getGridData(this.pageItems);
    },
    handleCurrentChange(val) {
      this.pageItems.pageNo = val;
      this.getGridData(this.pageItems);
    },
    /* 列表渲染，数据请求 */
    getGridData(params) {
      this.listLoading = true;
      this.searchParams = Object.assign(deepClone(params), this.formData);
      this.searchParams.housingType = this.housingType;
      queryPublishRoomListByPageApi(ObjectMap(this.searchParams)).then(response => {
        this.tableData = response.data.list;
        this.total = response.data.record;
        this.listLoading = false;
      })
    },
    clearForm() {
      this.formData = {
        cityId: '',
        reviewStatus: '',
        houseFinanceType: '',
        subdistrictName: '',
        roomCode: '',
        keyword: ''
      };
      this.pageItems = {
        pageNo: 1,
        pageSize: 20
      };
      this.getGridData(this.pageItems);
    },
    searchParam() {
      this.getGridData(this.pageItems);
    },
    dialogClose() {
      this.temp = {};
      this.reviewData = {};
    },
    /* 查看详情 */
    handleView(index, row) {
      this.reviewData = this.housingType == 1 ? {
        estateRoomTypeId: row.estateRoomTypeId
      } : {
        roomId: row.roomId
      }
      let params = deepClone(this.reviewData);
      params.housingType = this.housingType;
      queryPublishRoomDetailApi(params).then(response => {
        this.temp = response.data.result;
        this.temp.reviewStatus = row.reviewStatus;
        this.layer_showInfo = true;
      });
    },
    saveReviewData(val) {
      if (val.checked != undefined) {
        this.reviewData.checked = val.checked;
      }
      if (val.ids) {
        this.reviewData.ids = val.ids;
      }
    },
    /* 保存 */
    saveData() {
      if (!this.reviewData.checked && !this.reviewData.ids) {
        this.$message('该数据未修改');
        this.layer_showInfo = false;
        return false;
      }
      this.reviewData.housingType = this.housingType;

      /* 删除图片 */
      if (this.reviewData.ids) {
        batchRemoveRoomPictureApi(ObjectMap(this.reviewData)).then(response => {
          if (!this.reviewData.checked) {
            this.layer_showInfo = false;
            this.getGridData(this.pageItems);
          }
          this.$notify({
            title: '成功',
            message: '图片删除成功',
            type: 'success',
            duration: 2000
          })
        });
      }
      /* 下架 */
      if (this.reviewData.checked) {
        this.reviewData.checked = '';
        this.reviewData.ids = '';
        savePublishStatusApi(ObjectMap(this.reviewData)).then(response => {
          this.layer_showInfo = false;
          this.getGridData(this.pageItems);
          this.$notify({
            title: '成功',
            message: '房源下架成功',
            type: 'success',
            duration: 2000
          })
        });
      }
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.dialog-image .el-dialog {
  background: inherit;
  box-shadow: none;
}
</style>
