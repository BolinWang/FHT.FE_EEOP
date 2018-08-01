<template>
  <div class="app-container">
    <el-form class="house-search-form" ref="houseSearchForm" :inline="true" :model="houseSearchForm" size="small">
      <el-form-item class="house-search-form-group">
        <area-select v-model="houseSearchForm.cityArea" :level="0" placeholder="请选择城市" :filterable="true" :showAllLevels="false"></area-select>
      </el-form-item>
      <el-form-item class="house-search-form-group">
        <el-input v-model="houseSearchForm.organization" placeholder="组织名称"></el-input>
      </el-form-item>
      <el-form-item class="house-search-form-group">
        <el-input v-model="houseSearchForm.estateName" placeholder="公寓名称"></el-input>
      </el-form-item>
      <el-form-item class="house-search-form-group">
        <el-button type="primary" icon="el-icon-search" @click="searchEstateHouseList('search')">查询</el-button>
        <el-button icon="el-icon-remove-outline" @click="searchEstateHouseList('clear')">清空</el-button>
      </el-form-item>
      <el-form-item class="right house-search-form-group">
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="showEstateModel = true">新建公寓</el-button>
      </el-form-item>
    </el-form>

    <grid-unit ref="estateHouseList" :url="url" listField="data.list" totalField="data.record" :dataMethod="method" :formOptions="houseSearchForm" :columns="colModels" :height="tableHeight">
      <template slot="operateEstate" slot-scope="scope">
        <el-button type="primary" size="mini" @click="routerToEstateRoomList(scope.row)">查看房间</el-button>
        <el-button type="primary" size="mini">编辑公寓</el-button>
        <el-button type="danger" size="mini">删除公寓</el-button>
      </template>
      <template slot="operateRecordStr" slot-scope="scope">
        <p>{{scope.row.lastoperator}} {{scope.row.lastOperateTime}}</p>
      </template>
    </grid-unit>

    <el-dialog :title="false ? '新建公寓' : '编辑公寓'" :visible.sync="showEstateModel" width="900px">
      <el-form ref="estateModel" :model="estateModel" label-width="100px" size="small">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="品牌公寓">
              <el-input v-model="estateModel.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所在地区">
              <area-select v-model="estateModel.areaCode" :level="1"></area-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="所属板块">
              <el-input v-model="estateModel.region"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="具体位置">
              <el-select
                class="estate-detail-address"
                v-model="estateModel.address"
                filterable
                remote
                reserve-keyword
                :clearable="true"
                placeholder="请输入关键词"
                :remote-method="remoteMethod"
                popper-class="detail-address-options"
                @change="showMap"
                :loading="loading">
                <el-option
                  v-for="item in options4"
                  :key="item.cityId"
                  v-html="item.name"
                  :value="item.address">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="看房电话">
              <el-input v-model="estateModel.people" placeholder="联系人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label-width="0">
              <el-select v-model="estateModel.sex">
                <el-option label="先生" value="1"></el-option>
                <el-option label="女士" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="0">
              <el-input v-model="estateModel.phone" placeholder="联系电话"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="公寓简介">
              <el-input type="textarea" v-model="estateModel.intro" placeholder="最多可输入150个字"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="房源管理权限">
              <el-input placeholder="组织名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="0">
              <el-input placeholder="账号名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label-width="0">
              <el-checkbox-group v-model="estateModel.managePeople">
                <el-checkbox label="飞虎队" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="公寓/照片">
              <el-button type="primary">公寓照片</el-button>
              <el-button type="primary">房源基础设施</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="公寓楼层">
              <el-button type="primary">添加楼层</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="房间类型">
              <el-input val="1231321"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-badge :value="1" class="room-type-btn">
              <el-button type="primary" size="small">房型照片</el-button>
            </el-badge>
            <el-badge :value="40" class="room-type-btn">
              <el-button type="primary" size="small">应用到房间</el-button>
            </el-badge>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showEstateModel = false" size="small">保 存</el-button>
        <el-button @click="showEstateModel = false" size="small">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog title="地图选择小区" :visible.sync="dialogTableVisible" width="700px">
      <el-card class="map-selected-tips" :body-style="{padding: '10px'}">
        <p>1. 如果搜索的内容在右侧列表中小区名称不对（例如：天天超市），点击后可以自定义小区名称、具体位置、所在区域。</p>
        <p>2. 如果搜索的内容在右侧列表中查询不到，请通过鼠标手动定位房源位置，自定义小区名称、具体位置、所在区域。</p>
      </el-card>
      <div class="map-selected-container">
        <div class="bm-container" ref="bmContainer">
          <div id="bm-view" class="bm-view">

          </div>
          <el-input class="search-input" placeholder="请输入公寓地址" v-model="searchKeywords" clearable size="small" @keyup.native="searchPositionByKeywords">
          </el-input>
          <el-popover popper-class="selected-house-position" ref="popover" placement="right" width="360" trigger="manual">
            <el-form label-position="right" label-width="80px" :model="formLabelAlign" :rules="rules" size="mini" ref="ruleForm">
              <i class="el-icon-close close-icon" @click="$refs.popover.doClose()"></i>
              <el-form-item class="form-item">
                <div slot="label" class="city-label">当前城市</div>
                <p class="city-name">杭州市</p>
              </el-form-item>
              <el-form-item class="form-item" label="所在区域" prop="region">
                <el-input v-model="formLabelAlign.region"></el-input>
              </el-form-item>
              <el-form-item class="form-item" label="小区名称" prop="name">
                <el-input v-model="formLabelAlign.name"></el-input>
              </el-form-item>
              <el-form-item class="form-item" label="具体地址" prop="address">
                <el-input v-model="formLabelAlign.address"></el-input>
              </el-form-item>
            </el-form>
            <div class="selected-point" slot="reference"></div>
          </el-popover>
        </div>
        <el-card class="search-list" :body-style="{padding: '10px 0'}">
          <a class="search-list-item" v-for="(o, i) in searchResult" :key="i" @click="setMapPosition(o.point)">
            <p class="title">{{o.title}}</p>
            <p class="address">{{o.address}}</p>
          </a>
        </el-card>
      </div>
      <div slot="footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { debounce } from "@/utils"
import GridUnit from "@/components/GridUnit/grid"
import areaSelect from "@/components/AreaSelect"
import { estateAddressByKeywordsApi } from "@/api/houseManage"
export default {
  name: "estateHouseList",
  components: {
    GridUnit,
    areaSelect
  },
  data() {
    return {
      loading: false,
      options4: [],
      states: ["Alabama", "Alaska", "Arizona",
        "Arkansas", "California", "Colorado",
        "Connecticut", "Delaware", "Florida",
        "Georgia", "Hawaii", "Idaho", "Illinois",
        "Indiana", "Iowa", "Kansas", "Kentucky",
        "Louisiana", "Maine", "Maryland",
        "Massachusetts", "Michigan", "Minnesota",
        "Mississippi", "Missouri", "Montana",
        "Nebraska", "Nevada", "New Hampshire",
        "New Jersey", "New Mexico", "New York",
        "North Carolina", "North Dakota", "Ohio",
        "Oklahoma", "Oregon", "Pennsylvania",
        "Rhode Island", "South Carolina",
        "South Dakota", "Tennessee", "Texas",
        "Utah", "Vermont", "Virginia",
        "Washington", "West Virginia", "Wisconsin",
        "点击这里添加小区"],
      list: [],
      showEstateModel: false,
      dialogTableVisible: false,
      searchKeywords: "",
      searchResult: [],
      local: null,
      map: null,
      showPositionInfoModel: false,
      formLabelAlign: {
        name: "",
        region: "",
        address: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        address: [
          {
            required: true,
            message: "请输入具体地址",
            trigger: "change"
          }
        ]
      },
      houseSearchForm: {
        orgName: '',
        estateName: '',
        cityArea: [],
        cityId: ''
      },
      estateModel: {
        name: "",
        areaCode: [],
        region: "",
        address: [],
        people: "",
        phone: "",
        sex: "1",
        managePeople: []
      },
      cityOptions: [],
      tableHeight: 500,
      url: "http://localhost:9528/api/market/fangyuan",
      method: "queryEstateHouseList",
      colModels: [
        { prop: "orgName", label: "组织名称", align: "center" },
        { prop: "cityName", label: "城市", align: "center" },
        { prop: "estateName", label: "公寓名称", align: "center" },
        {
          prop: "operate",
          label: "操作",
          slotName: "operateEstate",
          width: "300",
          align: "center"
        },
        {
          prop: "operateRecord",
          label: "操作记录",
          slotName: "operateRecordStr",
          align: "center"
        }
      ],
      tableData: [
        {
          orgName: "麦家",
          cityName: "杭州",
          estateName: "漫果",
          operateRecord: new Date().getTime()
        }
      ]
    }
  },
  computed: {
    cityArea() {
      return this.houseSearchForm.cityArea
    }
  },
  methods: {
    initBMap() {
      let self = this;
      self.map = new BMap.Map("bm-view"); // 创建地图实例
      self.map.centerAndZoom("杭州", 15);
      self.map.enableScrollWheelZoom(true);

      self.map.addEventListener("click", function(e) {
        self.setMapPosition(e.point);
      });
      let options = {
        onSearchComplete: function(results) {
          // 判断状态是否正确
          if (self.local.getStatus() == BMAP_STATUS_SUCCESS) {
            self.searchResult = [];
            for (var i = 0; i < results.getCurrentNumPois(); i++) {
              self.searchResult.push(results.getPoi(i));
            }
          }
        }
      };
      self.local = new BMap.LocalSearch(self.map, options);
    },
    setMapPosition(position) {
      let point = new BMap.Point(position.lng, position.lat);
      let marker = new BMap.Marker(point);
      let geoc = new BMap.Geocoder();
      this.map.clearOverlays();
      this.map.addOverlay(marker);
      this.map.panTo(point);
      geoc.getLocation(point, rs => {
        this.formLabelAlign.address = rs.address;
        this.formLabelAlign.region = rs.addressComponents.district;
      });
      this.$refs.popover.doShow();
    },
    searchPositionByKeywords() {
      this.local.search(this.searchKeywords)
    },
    searchEstateHouseList(type) {
      if (type === 'clear') {
        for (const key in this.houseSearchForm) {
          if (key === 'cityArea' || key === 'cityId') {
            continue
          }
          this.houseSearchForm[key] = ''
        }
      }
      if (this.houseSearchForm.cityArea.length === 0) {
        this.$message.error('请至少选择城市后再查询公寓')
        return
      }
      this.$refs.estateHouseList.searchHandler()
    },
    routerToEstateRoomList(row) {
      this.$router.push({ path: 'estateRoomList', query: { fangyuanCode: row.fangyuanCode } })
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        estateAddressByKeywordsApi({
          cityId: '330100',
          keyword: query
        }).then((res) => {
          this.loading = false
          if (res.code === '0') {
            this.options4 = res.data.list
            this.options4.push({
              address: 'noSelect',
              cityId: '-1',
              name: '<span style="color: red">找不到小区？点击这里添加小区</span>'
            })
          }
        })
      } else {
        this.options4 = [];
      }
    },
    showMap(val) {
      if (val === 'noSelect') {
        this.estateModel.address = ''
        this.dialogTableVisible = true
      }
    }
  },
  watch: {
    dialogTableVisible(val) {
      if (val) {
        this.$nextTick(() => {
          this.initBMap();
        });
      } else {
        this.$refs.popover.doClose();
      }
    },
    cityArea(val) {
      if (val && val[1]) {
        this.houseSearchForm.cityId = val[1]
      }
    }
  },
  mounted() {
    let changeTableSize = debounce(() => {
      this.tableHeight = Math.max(document.body.clientHeight - 190, 250)
    }, 100)
    changeTableSize()
    window.addEventListener("resize", changeTableSize)
  }
}
</script>

<style lang="scss" scoped>
.house-search-form {
  .house-search-form-group {
    margin-bottom: 0;
    &.right {
      margin-right: 0;
    }
  }
}
.map-selected-dialog {
  .el-dialog__body {
    padding: 0;
  }
}
.map-selected-tips {
  margin-top: -20px;
  margin-bottom: 10px;
  p {
    font-size: 12px;
    margin: 0;
    color: red;
  }
}
.map-selected-container {
  position: relative;
  width: 660px;
  height: 400px;
  display: flex;
  justify-content: space-between;
  .bm-container {
    width: 400px;
    height: 400px;
    .bm-view {
      width: 400px;
      height: 400px;
      background-color: #ff0000;
    }
    .search-input {
      position: absolute;
      top: 10px;
      left: 10px;
      width: 340px;
    }
  }
  .search-list {
    width: 250px;
    height: 400px;
    overflow-x: hidden;
    overflow-y: scroll;
    .search-list-item {
      display: block;
      line-height: 1;
      padding: 8px 15px;
      &:hover {
        background-color: rgba(240, 240, 240, 0.8);
      }
    }
    .address {
      margin: 0;
      color: #999;
      font-size: 12px;
    }
    .title {
      margin: 0 0 5px;
      font-size: 14px;
      color: #333;
    }
  }
  .selected-point {
    position: absolute;
    top: 200px;
    left: 200px;
    width: 0;
    height: 0;
    visibility: hidden;
  }
}
.selected-house-position {
  .form-item {
    position: relative;
    margin-bottom: 10px;
    .city-label {
      &::before {
        content: "*";
        color: #f56c6c;
        margin-right: 4px;
      }
    }
  }
  .city-name {
    margin: 0;
  }
  .close-icon {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 10;
    cursor: pointer;
    font-size: 18px;
    transition: transform 0.3s;
    &:hover {
      transform: rotate(90deg);
    }
  }
}

.room-type-btn {
  margin-right: 20px;
}
.estate-detail-address {
  width: 100%;
}
.detail-address-options {
  .el-scrollbar__wrap {
    padding-bottom: 30px;
  }
  li:last-child {
    color: red;
  }
}
</style>


