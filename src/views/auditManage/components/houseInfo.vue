<template>
  <el-form size="small" :model="temp" label-position="left" label-width="70px">
    <div class="clearfix">
      <el-col :span="17">
        <el-form-item label="房源地址">
          <el-input :value="temp.houseAddress" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="1">&nbsp;&nbsp;</el-col>
      <el-col :span="6">
        <el-form-item label="所属板块">
          <el-input :value="temp.zoneName" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
    </div>
    <div class="clearfix">
      <el-col :span="17">
        <el-form-item label="套房信息">
          <el-input :value="temp.houseInfo" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="1">&nbsp;&nbsp;</el-col>
      <el-col :span="6">
        <el-form-item label="房源层高">
          <el-input :value="temp.floorName | formatFloor(temp.floorAmount)" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
    </div>
    <div class="clearfix">
      <el-col :span="8">
        <el-form-item label="户型信息">
          <el-input :value="temp.houseTypeInfo" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="1">&nbsp;&nbsp;</el-col>
      <el-col :span="8">
        <el-form-item label="看房电话">
          <el-input :value="temp.contactInfo" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="1">&nbsp;&nbsp;</el-col>
      <el-col :span="6">
        <el-form-item label="装修风格">
          <el-input :value="temp.decorationDegree" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
    </div>
    <el-form-item label="公共设施" v-if="temp.houseRentType == 2">
      <el-tag v-for="(item,index) in temp.facilityItems" :key="index">
        {{item}}
      </el-tag>
    </el-form-item>
    <el-form-item label="房源描述">
      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="temp.houseDesc" :disabled="true">
      </el-input>
    </el-form-item>
    <div class="clearfix" v-if="temp.houseRentType == 2">
      <el-col :span="8">
        <el-form-item label="房间信息">
          <el-input :value="temp.roomInfosFormat" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
    </div>
    <el-form-item label="房间设施">
      <el-tag v-for="(item,index) in temp.roomFacilityItems" :key="index">
        {{item}}
      </el-tag>
    </el-form-item>
    <el-form-item v-if="type == 'audit'" label="审核结果">
      <el-radio-group v-model="reviewStatus" v-if="temp.reviewStatus == 1">
        <el-radio :label="2">通过</el-radio>
        <el-radio :label="3">不通过</el-radio>
      </el-radio-group>
      <el-tag v-else :type="temp.reviewStatus | statusFilter">
        {{temp.reviewStatus | statusStrFilter}}
      </el-tag>
      <el-select size="small" v-model="remark" v-if="reviewStatus == 3" placeholder="请选择不通过原因" class="item-select" style="width: 180px; padding-left: 10px;" clearable :maxlength="50">
        <el-option v-for="item in remarkOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item v-if="type == 'published'" label="操作">
      <el-checkbox v-model="checked">立即下架</el-checkbox>
    </el-form-item>
    <el-form-item label="房间照片">
      <Preview :pic-list="temp.picList" :delete-icon="type == `published` ? `delete` : `` " @emitPicList="emitPicList"></Preview>
    </el-form-item>
  </el-form>
</template>
<script>
import Preview from '@/components/Preview'
import { ObjectMap, deepClone } from '@/utils'
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
  filters: {
    formatFloor(val, amount) {
      return `${val} / ${amount}`
    },
    statusFilter(status) {
      const statusMap = {
        '1': 'info',
        '2': 'success',
        '3': 'danger'
      }
      return statusMap[status] || 'info'
    },
    statusStrFilter(status) {
      const statusStrData = ['待审核', '审核通过', '审核不通过'];
      return statusStrData[status - 1] || '待审核'
    }
  },
  components: {
    Preview
  },
  data() {
    return {
      temp: this.tempData,
      reviewStatus: '',
      checked: false,
      remark: '',
      deleteIds: [],
      remarkOptions: [
        { label: '照片不符合上传规则', value: '照片不符合上传规则' },
        { label: '房源描述不符合规则', value: '房源描述不符合规则' },
        { label: '电话信息错误', value: '电话信息错误' },
        { label: '面积信息错误', value: '面积信息错误' }
      ]
    }
  },
  created() {
    this.temp.roomInfosFormat = this.temp.roomInfos ? this.temp.roomInfos[0] : '';
    let picList = this.temp.picUrls || [];
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
        this.reviewStatus = '';
        this.remark = '';
        this.checked = false;
        this.deleteIds = [];
        this.temp.roomInfosFormat = val.roomInfos ? val.roomInfos[0] : '';
        let picList = val.picUrls || [];
        this.temp.picList = picList.length > 0 ? picList.map((item) => {
          return { src: item.picUrl, w: 800, h: 600, id: item.id, picTag: item.picTag || '' }
        }) : [{ src: noPic, w: 800, h: 600, isnoPic: true, picTag: '' }];
      },
      deep: true
    },
    reviewStatus(val) {
      if (this.type == 'audit') {
        this.remark = '';
        this.$emit('saveReviewData', {
          reviewStatus: val,
          type: 'audit'
        });
      }
    },
    remark(val) {
      if (this.type == 'audit') {
        this.$emit('saveReviewData', {
          remark: val,
          type: 'audit'
        });
      }
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
