<template>
  <el-form size="small" :model="temp" label-position="left" label-width="70px">
    <div class="clearfix">
      <el-col :span="13">
        <el-form-item label="公寓名称">
          <el-input :value="temp.estateName" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="1">&nbsp;&nbsp;</el-col>
      <el-col :span="10">
        <el-form-item label="看房电话">
          <el-input :value="temp.contactInfo" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
    </div>
    <div class="clearfix">
      <el-col :span="17">
        <el-form-item label="房源地址">
          <el-input :value="temp.estateAddress" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="1">&nbsp;&nbsp;</el-col>
      <el-col :span="6">
        <el-form-item label="所属板块">
          <el-input :value="temp.zoneName" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
    </div>
    <el-form-item label="公寓简介">
      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="temp.introduction" :disabled="true">
      </el-input>
    </el-form-item>
    <el-form-item label="配套服务">
      <el-tag v-for="(item,index) in temp.services" :key="index">
        {{item}}
      </el-tag>
    </el-form-item>
    <el-form-item label="门店服务">
      <el-tag v-for="(item,index) in temp.storeServices" :key="index">
        {{item}}
      </el-tag>
    </el-form-item>
    <el-form-item label="周边设施">
      <el-tag v-for="(item,index) in temp.surroundings" :key="index">
        {{item}}
      </el-tag>
    </el-form-item>
    <el-form-item label="房间类型">
      <el-col :span="10">
        <el-input v-model="temp.styleName" :disabled="true">
        </el-input>
      </el-col>
    </el-form-item>
    <el-form-item v-if="type == 'published'" label="操作">
      <el-checkbox v-model="checked">立即下架</el-checkbox>
    </el-form-item>
    <el-form-item label="房型照片">
      <Preview :pic-list="temp.picList" :delete-icon="type == `published` ? `delete` : `` " @emitPicList="emitPicList"></Preview>
    </el-form-item>
    <el-form-item label="关联房间" style="margin-bottom: 0"></el-form-item>
    <div class="model-table">
      <el-table :data="temp.roomList" v-loading.body="listLoading" size="small" max-height="300" fit stripe highlight-current-row>
        <el-table-column type="index" width="60" align="center"></el-table-column>
        <el-table-column v-for="(item,index) in colModels" :label="item.label" :width="item.width" :key="index" fit show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="item.type === 'formatTime'">
                            {{scope.row[item.prop] | parseTime()}}
                        </span>
            <span v-else>
                            {{scope.row[item.prop]}}
                        </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-form>
</template>
<script>
import Preview from '@/components/Preview/Preview'
import { parseTime, ObjectMap, deepClone } from '@/utils'
import noPic from '@/assets/noPic.jpg'

export default {
  name: 'houseInfo',
  props: {
    type: {
      type: String,
      default: 'audit'
    },
    tempData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  components: {
    Preview
  },
  data() {
    return {
      temp: this.tempData,
      listLoading: false,
      checked: false,
      deleteIds: [],
      colModels: [
        { prop: 'roomNo', label: '房号' },
        { prop: 'roomInfo', label: '室卫厅' },
        { prop: 'decorationDegree', label: '朝向' },
        { prop: 'roomArea', label: '面积(㎡)' },
        { prop: 'roomCode', label: '房源编号' },
        { prop: 'publishTime', label: '发布时间', width: 170, type: 'formatTime' }
      ]
    }
  },
  created() {
    let picList = this.temp.roomTypePicUrls || [];
    this.temp.picList = picList.map((item) => {
      return { id: item.id, src: item.picUrl, w: 800, h: 600 }
    });
  },
  methods: {
    emitPicList(val, id) {
      this.temp.picList = val
      this.deleteIds.push(id)
    }
  },
  watch: {
    tempData: {
      handler(val) {
        this.temp = val;
        this.checked = false;
        this.deleteIds = [];
        let picList = val.roomTypePicUrls || [];
        this.temp.picList = picList.length > 0 ? picList.map((item) => {
          return { src: item.picUrl, w: 800, h: 600, id: item.id }
        }) : [{ src: noPic, w: 800, h: 600, isnoPic: true }];
      },
      deep: true
    },
    checked(val) {
      if (this.type == 'published') {
        this.$emit('saveReviewData', {
          checked: val,
          type: 'pulished'
        });
      }
    },
    deleteIds(val) {
      let deleteIds = Array.from(new Set(val)).join(',')
      this.$emit('saveReviewData', {
        ids: deleteIds,
        type: 'pulished'
      });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.el-tag {
  margin: 0 5px 5px 0;
}
</style>
