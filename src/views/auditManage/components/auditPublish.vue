<template>
  <div class="clearfix">
    <div class="model-search clearfix">
      <el-form size="small" :inline="true" :model="formData">
        <el-select size="small" v-model="formData.cityId" placeholder="城市" class="item-select" style="width: 150px;" clearable>
          <el-option v-for="item in cityOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-if="type == 2" size="small" v-model="formData.reviewStatus" placeholder="审核状态" class="item-select filter-item" style="width: 150px;" clearable>
          <el-option v-for="item in auditOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-if="type == 2" size="small" v-model="formData.houseFinanceType" placeholder="房源类型" class="item-select filter-item" style="width: 150px;" clearable>
          <el-option v-for="item in houseFinanceOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-input size="small" v-model="formData.keyword" :placeholder="placeholder[2 - type]" class="filter-item" style="width:180px;" @keydown.native.enter="searchParam">
        </el-input>
        <el-button type="primary" size="small" icon="el-icon-search" @click.native="searchParam" v-waves class="filter-item">查询</el-button>
        <el-button plain size="small" icon="el-icon-remove-outline" @click.native="clearForm">清空</el-button>
      </el-form>
    </div>
    <div class="model-table" :style="tableStyle">
      <el-table :data="tableData" v-loading.body="listLoading" :max-height="tableHeight" size="small" fit stripe highlight-current-row>
        <el-table-column type="index" width="60" align="center"></el-table-column>
        <el-table-column v-for="(item,index) in colModels[type]" :label="item.label" :width="item.width" :key="index" fit :show-overflow-tooltip="!item.toolTip">
          <template slot-scope="scope">
            <span v-if="item.type === 'formatHouseResource'">
              {{scope.row[item.prop] | formatHouseResource(scope.row)}}
            </span>
            <span v-else-if="item.type === 'formatTime'">
              {{scope.row[item.prop] | formatTime(item.prop,scope.row)}}
            </span>
            <span v-else-if="item.type === 'formatType'">
              {{scope.row[item.prop] | formatTypeFilter}}
            </span>
            <span v-else-if="item.type === 'formatRoomName'">
              {{scope.row[item.prop] | formatRoomName(scope.row)}}
            </span>
            <span v-else-if="item.type === 'formatEstateName'">
              {{scope.row[item.prop] | formatEstateName(scope.row)}}
            </span>
            <el-tag v-else-if="item.type === 'status'" :type="scope.row[item.prop] | statusFilter">
              {{scope.row[item.prop] | formatStatus}}
            </el-tag>
            <span v-else-if="item.type === 'tags'">
              <el-tag style="margin: 0 5px 5px 0;"
                v-for="(tag,tagIndex) in scope.row.tags"
                :type="tag | filterTags"
                :key="tagIndex">
                {{tag}}
              </el-tag>
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
        <house-info v-if="housingType == 2" :type="`audit`" :temp-data="temp" @saveReviewData="saveReviewData">
        </house-info>
        <estate-info v-if="housingType == 1" :type="`audit`" :temp-data="temp" @saveReviewData="saveReviewData">
        </estate-info>
        <div slot="footer" class="dialog-footer">
          <el-button v-if="housingType == 1 || temp.reviewStatus != 1" @click="layer_showInfo = false" size="small">关 闭</el-button>
          <el-button v-else @click="layer_showInfo = false" size="small">取 消</el-button>
          <el-button v-if="housingType == 2 && temp.reviewStatus == 1" type="primary" @click="saveData" size="small">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { parseTime, ObjectMap, deepClone } from '@/utils'
import { queryReviewCheckListByPageApi, saveReviewStatusApi, queryReviewCheckRoomDetailApi } from '@/api/auditCenter'
import { getCityListApi } from '@/api/houseManage'
import waves from '@/directive/waves' // 水波纹指令
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
    formatTypeFilter(val) {
      const filterObj = {
        '1': '普通',
        '2': '金融',
        '3': '金融申请中'
      }
      return filterObj[val] || '普通'
    },
    filterTags(val) {
      const filterObj = {
        '整租': '',
        '合租': 'info',
        '金融': 'warning',
        '飞虎队': 'success'
      }
      return filterObj[val] || ''
    },
    statusFilter(val) {
      const filterObj = {
        '1': 'info',
        '2': 'success',
        '3': 'danger'
      }
      return filterObj[val] || 'info'
    },
    formatStatus(val) {
      const filterObj = {
        '1': '未审核',
        '2': '审核通过',
        '3': '审核不通过'
      }
      return filterObj[val] || '未审核'
    },
    formatHouseResource(val, item) {
      return `${item.province}/${item.city}/${item.region}`
    },
    formatTime(val, prop, item) {
      let name = prop == 'publishTime' ? item.publisher : item.reviewer;
      return `${parseTime(val)} ${name}`
    },
    formatRoomName(val, item) {
      let unitCodeStr = item.unitCode ? (item.unitCode + '单元 ') : '',
        buildingNameStr = item.buildingName ? (item.buildingName + '幢 ') : '';
      return ('【' + item.subdistrictName + '】' +
        buildingNameStr + unitCodeStr +
        item.floorName + '楼 ' + item.roomNo + '号 ' + '- ' + (item.roomName || '整套房间'));
    },
    formatEstateName(val, item) {
      return `【${val}】${item.subdistrictAddress}`
    }
  },
  data() {
    return {
      formData: {
        cityId: '',
        reviewStatus: 1,
        houseFinanceType: '',
        publishStatus: '',
        keyword: ''
      },
      placeholder: [
        '房源编号/小区名称',
        '精品公寓名称'
      ],
      cityOptions: [],
      auditOptions: [
        { label: '未审核', value: 1 },
        { label: '审核通过', value: 2 },
        { label: '审核不通过', value: 3 }
      ],
      houseFinanceOptions: [
        { label: '普通', value: 1 },
        { label: '金融', value: 2 },
        { label: '金融申请中', value: 3 }
      ],
      temp: {},
      reviewData: {},
      listLoading: true,
      colModels: {
        '2': [
          { prop: 'reviewCheckId', label: '审核号', width: 60 },
          { prop: 'houseResource', label: '房源位置', width: 150, type: 'formatHouseResource', toolTip: true },
          { prop: 'roomName', label: '小区-房间', width: 200, type: 'formatRoomName', toolTip: true },
          { prop: 'roomCode', label: '房源编号', width: 100 },
          { prop: 'tags', label: '标签', type: 'tags', width: 200 },
          { prop: 'houseFinanceType', label: '房源类型', type: 'formatType' },
          { prop: 'publishTime', label: '提交时间', width: 140, type: 'formatTime', toolTip: true },
          { prop: 'reviewStatus', label: '审核状态', width: 110, type: 'status' },
          { prop: 'reviewTime', label: '操作时间', width: 140, type: 'formatTime', toolTip: true },
          { prop: 'reviewRemark', label: '备注' }
        ],
        '1': [
          { prop: 'province', label: '房源位置', width: 150, type: 'formatHouseResource', toolTip: true },
          { prop: 'estateName', label: '精品公寓', type: 'formatEstateName', toolTip: true },
          { prop: 'styleName', label: '房间类型', width: 200 },
          { prop: 'roomCount', label: '数量(间)', width: 80 },
          { prop: 'publishTime', label: '提交时间', width: 140, type: 'formatTime', toolTip: true }
        ]
      },
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
      this.formData.reviewStatus = '';
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
      queryReviewCheckListByPageApi(ObjectMap(this.searchParams)).then(response => {
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
        publishStatus: '',
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
      this.reviewData = {
        reviewCheckId: row.reviewCheckId
      };
      let params = this.housingType == 1 ? {
        estateId: row.estateId,
        estateTypeId: row.estateTypeId,
        publisherId: row.publisherId,
        publishTime: parseTime(row.publishTime)
      } : {
        reviewCheckId: row.reviewCheckId
      }
      params.housingType = this.housingType;
      queryReviewCheckRoomDetailApi(params).then(response => {
        this.temp = response.data.result;
        this.temp.reviewStatus = row.reviewStatus;
        this.layer_showInfo = true;
      });
    },
    saveReviewData(val) {
      if (val.reviewStatus) {
        this.reviewData.reviewStatus = val.reviewStatus;
      }
      if (this.reviewData.reviewStatus == 3) {
        this.reviewData.reviewRemark = val.remark;
      } else {
        this.reviewData.reviewRemark = '';
      }
    },
    /* 保存 */
    saveData() {
      if (!this.reviewData.reviewStatus) {
        this.$message.error('请选择审核结果');
        return false;
      }
      if (this.reviewData.reviewStatus == 3 && !this.reviewData.reviewRemark) {
        this.$message.error('请选择审核不通过原因');
        return false;
      }
      saveReviewStatusApi(ObjectMap(this.reviewData)).then(response => {
        this.layer_showInfo = false;
        this.getGridData(this.pageItems);
        this.$notify({
          title: '成功',
          message: '操作成功',
          type: 'success',
          duration: 2000
        })
      });
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
