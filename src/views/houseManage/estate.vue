<template>
  <div class="app-container">
    <el-form ref="houseSearchForm" :inline="true" :model="houseSearchForm" size="small">
      <el-form-item>
        <el-select v-model="houseSearchForm.cityId" filterable placeholder="城市">
          <el-option v-for="item in cityOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="houseSearchForm.organization" placeholder="组织名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="houseSearchForm.estateName" placeholder="公寓名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="searchEstateHouseList">查询</el-button>
        <el-button icon="el-icon-remove-outline" @click="resetHouseSearchForm('houseSearchForm')">清空</el-button>
      </el-form-item>
      <el-form-item class="right">
        <el-button type="primary" icon="el-icon-circle-plus-outline">新建公寓</el-button>
      </el-form-item>
    </el-form>

    <grid-unit
      ref="estateHouseList"
      :url="url"
      listField="data.list"
      totalField="data.record"
      :dataMethod="method"
      :formOptions="houseSearchForm"
      :columns="colModels"
      :height="tableHeight">
      <template slot="operateEstate" slot-scope="scope">
        <el-button type="primary" size="mini">查看房间</el-button>
        <el-button type="primary" size="mini">编辑公寓</el-button>
        <el-button type="danger" size="mini">删除公寓</el-button>
      </template>
      <template slot="operateRecordStr" slot-scope="scope">
        <p>{{scope.row.lastoperator}} {{scope.row.lastOperateTime}}</p>
      </template>
    </grid-unit>

    <el-dialog title="地图选择小区" :visible.sync="dialogTableVisible" width="700px">
      <el-card class="map-selected-tips" :body-style="{padding: '10px'}">
        <p>1. 如果搜索的内容在右侧列表中小区名称不对（例如：天天超市），点击后可以自定义小区名称、具体位置、所在区域。</p>
        <p>2. 如果搜索的内容在右侧列表中查询不到，请通过鼠标手动定位房源位置，自定义小区名称、具体位置、所在区域。</p>
      </el-card>
      <div class="map-selected-container">
        <div class="bm-container" ref="bmContainer">
          <div id="bm-view" class="bm-view">

          </div>
          <el-input class="search-input" placeholder="请输入公寓地址" v-model="searchKeywords" clearable @keyup.native="searchPositionByKeywords">
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
import GridUnit from '@/components/GridUnit/grid'
import { estateHouseListApi } from '@/api/houseManage'
export default {
  components: {
    GridUnit
  },
  data() {
    return {
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
        cityId: '123123',
        orgName: '',
        estateName: ''
      },
      cityOptions: [
        {
          value: "123123",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        }
      ],
      tableHeight: 500,
      url: 'http://localhost:9528/api/market/fangyuan',
      method: 'marketCityAndSubdistrictList',
      colModels: [
        { prop: 'orgName', label: '组织名称', align: 'center' },
        { prop: 'cityName', label: '城市', align: 'center' },
        { prop: 'estateName', label: '公寓名称', align: 'center' },
        { prop: 'operate', label: '操作', slotName: 'operateEstate', width: '300', align: 'center' },
        { prop: 'operateRecord', label: '操作记录', slotName: 'operateRecordStr', align: 'center' }
      ],
      tableData: [
        {
          orgName: '麦家',
          cityName: '杭州',
          estateName: '漫果',
          operateRecord: new Date().getTime()
        }
      ]
    };
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
    searchEstateHouseList() {
      this.$refs.estateHouseList.searchHandler()
    },
    resetHouseSearchForm(formName) {
      // this.searchParams = {}
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
    }
  },
  mounted() {
    this.dialogTableVisible = true
  }
};
</script>

<style lang="scss" scoped>
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
      width: 380px;
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
</style>


