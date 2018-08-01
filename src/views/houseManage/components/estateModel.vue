<template>
  <div class="estate-model-container">
    <el-form ref="estateModel" :model="estateModel" :rules="estateModelRules" label-width="100px" size="small">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <div class="model-panel-title">
              公寓
            </div>
          </template>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="品牌公寓" prop="name">
                <el-input v-model="estateModel.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所在地区" required>
                <area-select v-model="estateModel.areaCode" :level="1"></area-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="所属板块" prop="region" required>
                <el-select v-model="estateModel.region">
                  <el-option label="板块1" value="1"></el-option>
                  <el-option label="板块2" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="具体位置" required>
                <el-select class="estate-detail-address" v-model="estateModel.address" filterable remote reserve-keyword :clearable="true" placeholder="请输入关键词" :remote-method="remoteMethod" popper-class="detail-address-options" @change="showMap" :loading="loading">
                  <el-option v-for="item in options4" :key="item.cityId" v-html="item.name" :value="item.address">
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
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <div class="model-panel-title">
              楼层
            </div>
          </template>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="公寓楼层">
                <el-button type="primary">添加楼层</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <div class="model-panel-title">
              房型
            </div>
          </template>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="房间类型">
                <el-input value="1231321"></el-input>
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
        </el-collapse-item>
      </el-collapse>
    </el-form>

    <el-dialog title="地图选择小区" :visible.sync="dialogTableVisible" width="700px" :append-to-body="true">
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
        <el-button @click="dialogTableVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible = false" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import areaSelect from "@/components/AreaSelect"
import { estateAddressByKeywordsApi } from "@/api/houseManage"
export default {
  name: 'estateModel',
  components: {
    areaSelect
  },
  props: [
    'showModel',
    'changeModelStatus'
  ],
  data(){
    return {
      dialogTableVisible: false,
      local: null,
      map: null,
      showPositionInfoModel: false,
      searchKeywords: "",
      searchResult: [],
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
      estateModelRules: {
        name: [
          { required: true, message: '请输入公寓名称', trigger: 'blur' }
        ]
      },
      loading: false,
      options4: [],
      activeNames: ['1']
    }
  },
  methods: {
    initBMap() {
      let self = this;
      self.map = new BMap.Map("bm-view"); // 创建地图实例
      self.map.centerAndZoom("杭州", 15);
      self.map.enableScrollWheelZoom(true);

      self.map.addEventListener("click", function (e) {
        self.setMapPosition(e.point);
      });
      let options = {
        onSearchComplete: function (results) {
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
        })
      } else {
        this.$refs.popover.doClose()
      }
    }
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
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
.map-selected-tips {
  margin-top: -20px;
  margin-bottom: 10px;
  p {
    font-size: 12px;
    margin: 0;
    color: red;
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
.detail-address-options {
  li:last-child {
    color: red;
  }
}
.estate-model-container {
  .model-panel-title {
    font-size: 16px;
  }
  .estate-detail-address {
    width: 100%;
  }
  .room-type-btn {
    margin-right: 20px;
  }
}
</style>


