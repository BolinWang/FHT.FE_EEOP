<template>
  <div class="app-container">
    <div class="map-selected-container">
      <div class="bm-container" ref="bmContainer">
        <div id="bm-view" class="bm-view">

        </div>
        <el-input
          class="search-input"
          placeholder="请输入公寓地址"
          v-model="searchKeywords"
          clearable
          @keyup.native="searchPositionByKeywords">
        </el-input>
        <el-popover
          popper-class="selected-house-position"
          ref="popover"
          placement="right"
          width="360"
          trigger="manual">
          <el-form
            label-position="right"
            label-width="80px"
            :model="formLabelAlign"
            :rules="rules"
            size="mini"
            ref="ruleForm">
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
        <a
        class="search-list-item"
        v-for="(o, i) in searchResult"
        :key="i"
        @click="setMapPosition(o.point)">
          <p class="title">{{o.title}}</p>
          <p class="address">{{o.address}}</p>
        </a>
      </el-card>
    </div>
  </div>
</template>

<script>
import { debounce } from "@/utils";
export default {
  data() {
    return {
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
      }
    }
  },
  methods: {
    initBMap() {
      let self = this;
      self.map = new BMap.Map("bm-view") // 创建地图实例
      self.map.centerAndZoom("杭州", 15)
      self.map.enableScrollWheelZoom(true)

      self.map.addEventListener("click", function(e) {
        self.setMapPosition(e.point)

      })
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
      }
      self.local = new BMap.LocalSearch(self.map, options)
    },
    setMapPosition(position) {
      let point = new BMap.Point(position.lng, position.lat)
      let marker = new BMap.Marker(point)
      let geoc = new BMap.Geocoder()
      this.map.clearOverlays()
      this.map.addOverlay(marker)
      this.map.panTo(point)
      geoc.getLocation(point, (rs) => {
        this.formLabelAlign.address = rs.address
        this.formLabelAlign.region = rs.addressComponents.district
      })
      this.$refs.popover.doShow();
    },
    searchPositionByKeywords() {
      this.local.search(this.searchKeywords);
    }
  },
  mounted() {
    this.initBMap();
  }
};
</script>

<style lang="scss" scoped>
.map-selected-container {
  position: relative;
  width: 650px;
  height: 400px;
  display: flex;
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


