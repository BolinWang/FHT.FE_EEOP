<template>
  <div class="app-container">
    <div class="model-search clearfix">
      <el-select size="small" v-model="formData.cityId" class="item-select" style="width: 150px;" clearable @change="getAreaList">
        <el-option v-for="(item,index) in cityList" :key="index" :label="item.cityName" :value="item.cityId">
        </el-option>
      </el-select>
      <el-input size="small" v-model="formData.keyword" placeholder="请输入小区名或地址" class="filter-item" style="width:300px;" prefix-icon="el-icon-search" clearable @keydown.native.enter="searchParam">
      </el-input>
      <el-button type="primary" size="small" icon="el-icon-search" @click.native="searchParam" v-waves class="filter-item">查询</el-button>
    </div>
    <div class="model-itemFilters">
      <div class="position clearfix">
        <dl class="clearfix">
          <dt>区域<span>|</span></dt>
          <dd>
            <span :class="{active: isAreaActive[0].index == -1}" @click="selectAreaMethod(0,-1)">
              不限
            </span>
            <span v-for="(item,index) in areaList" :class="{active:index == isAreaActive[0].index}" :key="index" @click="selectAreaMethod(0,index,item.areaId)">
              {{item.areaName}}
            </span>
          </dd>
        </dl>
        <div class="zoneItems">
          <p style="display: inline-block; margin: 0" v-for="(value, key, index) in zoneList" :key="index">
            {{key}}
            <span v-for="(item, k) in value" :class="{active: key == isAreaActive[1].value && k == isAreaActive[1].index}" :key="k" @click="selectAreaMethod(1,k,item.zoneId,key)">
              {{item.zoneName}}
            </span>
          </p>
        </div>
      </div>
      <div class="list-more">
        <div class="list-more-item clearfix" v-for="(item, index) in itemFilters" :key="index" :label="item.label" :value="item.value">
          <dl>
            <dt>{{item.label}}<span>|</span> </dt>
            <dd>
              <span :class="{active: isActive[index] == -1}" @click="selectMethod(index, -1)">
                不限
              </span>
              <span v-for="(v,k) in item.filters" :class="{active:k == isActive[index]}" :key="k" @click="selectMethod(index,k)">
                {{v.label}}
              </span>
              <span v-if="item.value=='rentPrice'">
                <el-input
                  v-model="rentPrice.minPrice"
                  size="mini"
                  style="width:70px;">
                </el-input>
                 -
                <el-input
                  v-model="rentPrice.maxPrice"
                  size="mini"
                  style="width:70px;">
                </el-input>
            </span>
              <span v-if="item.value=='roomArea'">
                <el-input
                  v-model="roomArea.minRoomArea"
                  size="mini"
                  style="width:70px;">
                </el-input>
                 -
                <el-input
                  v-model="roomArea.maxRoomArea"
                  size="mini"
                  style="width:70px;">
                </el-input>
              </span>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <div class="renterInfo" style="padding-top: 5px;">
      <el-form :inline="true" ref="ruleForm" :model="renterInfo" :rules="rules" size="small">
        <el-form-item>
          <el-input v-model="renterInfo.userName" placeholder="可输入租客姓名"></el-input>
        </el-form-item>
        <el-form-item prop="userMobile">
          <el-input v-model="renterInfo.userMobile" placeholder="请输入租客电话"></el-input>
        </el-form-item>
        <el-form-item prop="selectedServicer">
          <el-select v-model="renterInfo.selectedServicer.serverId" placeholder="请选择城市管家" @focus="getServicers" @change="changeServicer">
            <el-option v-for="(item,index) in serviceList" :key="index" :label="`${item.name} ${item.mobile}`" :value="item.userId">
              <span class="left dropItem">【区域】{{ item.areaName }}</span>
              <span class="left dropItem">【管家】{{ item.name }}</span>
              <span class="left dropItem">{{ item.mobile }}</span>
              <span class="left dropItem">【待带看数】{{ item.unLookCount }}</span>
              <el-tag size="mini" :type="item.serverStatus | statusFilter" class="left dropItem dropTag">
                {{ item.serverStatus | serviceFilter }}
              </el-tag>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-message" @click="saveSendData()">发送短信</el-button>
        </el-form-item>
        <el-input type="textarea" placeholder="请输入租客详细需求" v-model="renterInfo.detailRequireMent" style="margin-bottom: 15px; display: block;width: 688px;">
        </el-input>
      </el-form>
    </div>
    <div class="model-table" :style="tableStyle">
      <el-table :data="tableData" v-loading.body="listLoading" :max-height="tableHeight" size="small" fit stripe highlight-current-row @selection-change="handleSelectionChange">
        <el-table-column type="index" width="60" align="center"></el-table-column>
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column v-for="(item,index) in colModels" :label="item.label" :width="item.width" :key="index" fit show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="item.type === 'img'">
              <img class="preview-img image image-center" width="40" height="40"
                v-if="scope.row[item.prop]"
                v-lazy="scope.row[item.prop]"
                @click="handlePreview(scope.row[item.targetProp])" />
              <span v-else></span>
            </span>
            <span v-else-if="item.type == 'areaZone'">
              {{scope.row[item.prop] | zoneFilter(scope.row)}}
            </span>
            <el-tag v-else-if="item.type === 'type'" :type="scope.row[item.prop] | statusFilter">
              {{scope.row[item.prop] | formatStatus}}
            </el-tag>
            <span v-else-if="item.prop == 'minRentPrice'">
              {{scope.row[item.prop]}}元起
            </span>
            <span v-else>
              {{scope.row[item.prop]}}
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import waves from '@/directive/waves' // 水波纹指令
import { parseTime, ObjectMap, deepClone } from '@/utils'
import { validateMobile } from '@/utils/validate';
import {
  getAreaListApi,
  getZoneListApi,
  getGridApi,
  getServicersApi,
  saveRenterInfoApi
} from '@/api/serviceManage'
export default {
  name: 'searchHouseSource',
  directives: { waves },
  filters: {
    statusFilter(val) {
      const filterObj = {
        '1': 'success',
        '2': 'info'
      }
      return filterObj[val] || 'info'
    },
    formatStatus(val) {
      const filterObj = {
        '1': '集中式',
        '2': '分散式'
      }
      return filterObj[val] || '分散式'
    },
    zoneFilter(item, row) {
      return `${row.region}${row.zone || ''}`
    },
    serviceFilter(val) {
      const filterObj = {
        '0': '空闲中',
        '1': '带看中'
      }
      return filterObj[val] || '空闲中'
    }
  },
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!value || !validateMobile(value.trim())) {
        callback(new Error('请输入正确的手机号'));
      } else {
        callback();
      }
    };
    const validateServicer = (rule, value, callback) => {
      if (!value || !value.serverId) {
        callback(new Error('请选择城市管家'));
      } else {
        callback();
      }
    }
    return {
      formData: {
        cityId: 310100,
        keyword: '',
        /*orgOwnIds: [2, 4],*/
        tags: ['fhd'],
        allPics: true
      },
      renterInfo: {
        userMobile: '',
        userName: '',
        detailRequireMent: '',
        selectedServicer: []
      },
      cityList: [{
        cityId: 330100,
        cityName: '杭州市'
      }, {
        cityId: 310100,
        cityName: '上海市'
      }],
      areaList: [],
      zoneList: [],
      searchParams: {},
      listLoading: false,
      colModels: [
        { prop: 'areaZone', label: '区域板块', type: 'areaZone' },
        { prop: 'name', label: '小区/公寓-房间' },
        { prop: 'type', label: '房源类型', width: 100, type: 'type' },
        { prop: 'imageUrl', label: '图片', type: 'img', width: 80, targetProp: 'imageUrls' },
        { prop: 'houseType', label: '室卫厅', width: 100 },
        { prop: 'roomArea', label: '面积', width: 100 },
        { prop: 'minRentPrice', label: '月租金', width: 100 }
      ],
      tableHeight: 300,
      tableData: [],
      multipleSelection: [],
      itemFilters: [{
        label: '月租',
        value: 'rentPrice',
        filters: [{
          label: '500元以下',
          maxPrice: 500,
          minPrice: null
        }, {
          label: '500-1000元',
          maxPrice: 1000,
          minPrice: 500
        }, {
          label: '1000-1500元',
          maxPrice: 1500,
          minPrice: 1000
        }, {
          label: '1500-2000元',
          maxPrice: 2000,
          minPrice: 1500
        }, {
          label: '2000-3000元',
          maxPrice: 3000,
          minPrice: 2000
        }, {
          label: '3000-5000元',
          maxPrice: 5000,
          minPrice: 3000
        }, {
          label: '5000-8000元',
          maxPrice: 8000,
          minPrice: 5000
        }, {
          label: '8000元以上',
          maxPrice: null,
          minPrice: 8000
        }]
      }, {
        label: '面积',
        value: 'roomArea',
        filters: [{
          label: '50平以下',
          max: 50,
          min: null
        }, {
          label: '50-70平',
          max: 70,
          min: 50
        }, {
          label: '70-90平',
          max: 90,
          min: 70
        }, {
          label: '90-110平',
          max: 110,
          min: 90
        }, {
          label: '110-130平',
          max: 130,
          min: 110
        }, {
          label: '130-150平',
          max: 150,
          min: 130
        }, {
          label: '150-200平',
          max: 200,
          min: 150
        }, {
          label: '200平以上',
          max: null,
          min: 200
        }]
      }, {
        label: '户型',
        value: 'chamberCounts',
        filters: [{
          label: '一室',
          max: 1,
          min: 1
        }, {
          label: '两室',
          max: 2,
          min: 2
        }, {
          label: '三室',
          max: 3,
          min: 3
        }, {
          label: '四室',
          max: 4,
          min: 4
        }, {
          label: '五室',
          max: 5,
          min: 5
        }, {
          label: '五室以上',
          max: null,
          min: 5
        }]
      }, {
        label: '方式',
        value: 'houseRentType',
        filters: [{
          label: '整租',
          value: 1
        }, {
          label: '合租',
          value: 2
        }]
      }],
      isActive: [-1, -1, -1, -1, -1],
      isAreaActive: [{
        id: '',
        index: -1,
        value: ''
      }, {
        id: '',
        index: -1,
        value: ''
      }],
      rules: {
        userMobile: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ],
        selectedServicer: [
          { required: true, validator: validateServicer, trigger: 'change' }
        ]
      },
      serviceList: [],
      rentPrice: {
        minPrice: null,
        maxPrice: null
      },
      roomArea: {
        minRoomArea: null,
        maxRoomArea: null
      }
    }
  },
  mounted() {
    /* 表格高度控制 */
    let temp_height = document.body.clientHeight - 425;
    this.tableHeight = temp_height > 300 ? temp_height : 300;
    window.onresize = () => {
      return (() => {
        temp_height = document.body.clientHeight - 425;
        this.tableHeight = this.tableHeight = temp_height > 300 ? temp_height : 300;
      })()
    }
    this.getAreaList();
  },
  computed: {
    tableStyle: function() {
      return {
        width: '100%',
        height: this.tableHeight + 'px',
        margin: 0
      }
    }
  },
  methods: {
    getAreaList() {
      getAreaListApi({
        cityId: this.formData.cityId
      }).then(response => {
        this.areaList = response.data || [];
        this.getGridData();
      })
    },
    getGridData() {
      this.listLoading = true;
      this.searchParams = Object.assign({ pageNo: 1, pageSize: 100 }, deepClone(this.formData));
      getGridApi(ObjectMap(this.searchParams)).then(response => {
        this.tableData = response.data ? (response.data.resultList || []) : [];
        this.listLoading = false;
      })
    },
    searchParam() {
      // 垃圾代码 isActive对象形式存储才对 以后再说吧
      this.formData = ObjectMap({
        ...this.formData,
        regionId: this.isAreaActive[0].id,
        zoneId: this.isAreaActive[1].id,
        ...this.rentPrice,
        ...this.roomArea,
        chamberCounts: [{
          min: (this.isActive[2] == -1 ? '' : this.itemFilters[2].filters[this.isActive[2]].min),
          max: (this.isActive[2] == -1 ? '' : this.itemFilters[2].filters[this.isActive[2]].max)
        }],
        houseRentType: (this.isActive[3] == -1 ? '' : this.itemFilters[3].filters[this.isActive[3]].value)
      })
      this.getGridData();
    },
    selectMethod(pindex, index) {
      this.$set(this.isActive, pindex, index);
      if (pindex == 0 && this.isActive[0] != -1) {
        this.rentPrice.minPrice = this.itemFilters[0].filters[this.isActive[0]].minPrice,
          this.rentPrice.maxPrice = this.itemFilters[0].filters[this.isActive[0]].maxPrice
      }
      if (pindex == 1 && this.isActive[0] != -1) {
        this.roomArea.minRoomArea = this.itemFilters[1].filters[this.isActive[1]].min,
          this.roomArea.maxRoomArea = this.itemFilters[1].filters[this.isActive[1]].max
      }
    },
    selectAreaMethod(pindex, index, id, value) {
      this.$set(this.isAreaActive, pindex, {
        id: id,
        index: index,
        value: value
      });
      if (pindex != 0) {
        return false;
      }
      this.$set(this.isAreaActive, 1, {
        id: '',
        index: -1,
        value: ''
      });
      if (index == -1) {
        this.zoneList = [];
        return false;
      }
      getZoneListApi({
        regionId: this.areaList[index].areaId
      }).then(response => {
        this.zoneList = response.data;
      })
    },
    handleSelectionChange(list) {
      this.multipleSelection = list;
    },
    handlePreview(picList = []) {
      if (!picList || picList.length == 0) {
        this.$message.error('暂无房源图片');
        return false;
      }
      this.$preview.open(0, picList.map((item, index) => {
        return ({ id: index, src: item, w: 800, h: 600 })
      }))
    },
    getServicers() {
      getServicersApi({}).then(response => {
        this.serviceList = response.data
      });
    },
    changeServicer(val) {
      let filterData = this.serviceList.filter((item) => {
        return (item.userId == val)
      })[0]
      this.renterInfo.selectedServicer = {
        serverId: val,
        serverName: filterData.name,
        serverMobile: filterData.mobile
      }
    },
    saveSendData() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.multipleSelection.length == 0) {
            this.$message.error('请选择房源，最多5个');
            return false;
          }
          if (this.multipleSelection.length > 5) {
            this.$message.error('最多可选择5个房源！请重新选择');
            return false;
          }
          let saveData = {
            userMobile: this.renterInfo.userMobile,
            userName: this.renterInfo.userName,
            detailRequireMent: this.renterInfo.detailRequireMent,
            ...this.renterInfo.selectedServicer,
            rooms: this.multipleSelection
          }
          saveRenterInfoApi(saveData).then(response => {
            this.$notify({
              title: '成功',
              message: '短信发送成功',
              type: 'success',
              duration: 2000
            })
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
dl,
dt,
dd {
  margin: 0;
  padding: 0;
}

.model-itemFilters {
  border-bottom: 1px solid #f0f0f0;
  border-top: 1px solid #f0f0f0;
  margin: 10px 0;
  padding: 5px 0;
}

.model-itemFilters dt {
  float: left;
  font-weight: 700;
  color: #909399;
  font-size: 12px;
  line-height: 28px;
}

.model-itemFilters dt span {
  margin-left: 10px;
  color: #dfdfdf;
  font-size: 13px;
}

.model-itemFilters dd {
  float: left;
  color: #909399;
  font-size: 12px;
  margin-left: 10px;
}

.zoneItems {
  margin-left: 2em;
  font-size: 14px;
  padding-left: 20px;
}

.model-itemFilters dd span,
.model-itemFilters .zoneItems span {
  display: inline-block;
  margin-right: 20px;
  line-height: 28px;
  cursor: pointer;
  color: #909399;
  font-size: 12px;
}

.active {
  color: #ff8448!important;
}

.dropItem {
  margin-right: 10px;
}

.el-select-dropdown__item span.dropTag {
  line-height: 20px !important;
  margin-top: 7px;
}
</style>
