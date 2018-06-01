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
      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="temp.houseDesc">
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
    <el-collapse style="margin-bottom: 16px;">
      <el-collapse-item>
        <template slot="title">
          <span style="color: #606266; font-size: 14px; font-weight: normal;">交租方式</span>
          <el-badge :value="temp.roomRentTypes.length" style="top: 4px; left: 10px;"></el-badge>
        </template>
        <el-card class="box-card">
          <div v-for="(item, index) in temp.roomRentTypes" :key="index">
            <el-tag>交租方式：{{item.name}}</el-tag>
            <el-tag type="success">房价：{{item.rentPrice}} 元/月</el-tag>
            <el-tag type="danger">押金：{{item.depositPrice}} 元</el-tag>
            <el-tag type="warning">服务费：{{item.serviceChargePrice}} 元/月</el-tag>
          </div>
        </el-card>
      </el-collapse-item>
    </el-collapse>
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
      <div class="previewItems">
        <Preview
          :pic-list="temp.picList"
          :delete-icon="`delete`"
          :disabled="``"
          @emitDelete="emitDelete">
        </Preview>
        <label class="el-upload el-upload--picture-card uploadImage" for="uploadImages">
          <i class="el-icon-plus"></i>
          <input type="file" id="uploadImages" :accept="accept" multiple @change="uploadImg($event)">
        </label>
      </div>
      <!-- 图片裁剪 -->
      <ImageCropper
        :cropperList="cropperList"
        @emitCropperList="emitCropperList"
        @emitCropperData="emitCropperData">
      </ImageCropper>
    </el-form-item>
  </el-form>
</template>
<script>
import Preview from '@/components/Preview/Preview'
import ImageCropper from '@/components/ImageCropper/Cropper'
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
      const statusStrData = ['待审核', '审核通过', '审核不通过']
      return statusStrData[status - 1] || '待审核'
    }
  },
  components: {
    Preview,
    ImageCropper
  },
  data() {
    return {
      temp: deepClone(this.tempData),
      cropperList: [],
      reviewStatus: '',
      checked: false,
      remark: '',
      deleteIds: [],
      accept: 'image/png, image/jpeg, image/jpg',
      remarkOptions: [
        { label: '照片不符合上传规则', value: '照片不符合上传规则' },
        { label: '房源描述不符合规则', value: '房源描述不符合规则' },
        { label: '交租方式不符合规则', value: '交租方式不符合规则' },
        { label: '电话信息错误', value: '电话信息错误' },
        { label: '面积信息错误', value: '面积信息错误' }
      ],
      layer_cropper: false
    }
  },
  created() {
    this.temp.roomInfosFormat = this.temp.roomInfos ? this.temp.roomInfos[0] : ''
    this.temp.roomRentTypes = this.temp.roomRentTypes || []
    let picList = this.temp.picUrls || []
    this.temp.picList = picList.map((item) => {
      return { src: item.picUrl, picTag: item.picTag || '' }
    })
  },
  methods: {
    emitPicList(val, id) {
      this.temp.picList = val
      this.deleteIds.push(id)
    },
    // 删除图片
    emitDelete(val) {
      this.temp.picList = val
    },
    // 上传的图片列表
    emitCropperList(list = []) {
      this.cropperList = list
    },
    // 裁剪后图片列表
    emitCropperData(list = []) {
      this.$set(this.temp,'picList',[...this.temp.picList,...list])
    },
    /* 选择图片 */
    async uploadImg(e) {
      if (!e.target.value) {
        console.log('取消上传...')
        return false
      }
      const uploadList = []
      const readFileAsync = file => new Promise(resolve => {
        let reader = new FileReader()
        reader.onerror = function(e) {
          console.log('读取异常....')
        }
        reader.onload = e => {
          const img = (typeof e.target.result === 'object')
            // 把Array Buffer转化为blob 如果是base64不需要
            ? window.URL.createObjectURL(new Blob([e.target.result]))
            : e.target.result
          let imageName = ''
          if (!file.name) {
            imageName = ''
          } else {
            imageName = file.name.split('.')[0].length <= 30
              ? file.name.split('.')[0]
              : file.name.split('.')[0].substr(0, 30)
          }
          resolve({
            img,
            imageName
          })
        }
        // 转化为base64
        // reader.readAsDataURL(file)
        // 转化为blob
        reader.readAsArrayBuffer(file)
      })

      const files = e.target.files
      for (let i = 0; i < files.length; i++) {
        if (!this.accept.includes(files[i].type)) {
          this.$message.error(`请上传${this.accept.replace(/image\//gi, '')}的图片`)
          e.target.value = null
          return false
        }
        uploadList.push(await readFileAsync(files[i]))
      }

      this.cropperList = uploadList.map((item, kindex) => {
        return {
          img: item.img,
          imageName: item.imageName
        }
      })
      this.layer_cropper = true
      e.target.value = null
    }
  },
  watch: {
    tempData: {
      handler(val) {
        this.temp = val
        this.reviewStatus = ''
        this.remark = ''
        this.checked = false
        this.deleteIds = []
        this.temp.roomInfosFormat = val.roomInfos ? val.roomInfos[0] : ''
        this.temp.roomRentTypes = this.temp.roomRentTypes || []
        let picList = val.picUrls || []
        this.temp.picList = picList.map((item) => {
          return { src: item.picUrl, w: 800, h: 600, id: item.id, picTag: item.picTag || '' }
        })
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
.el-upload--picture-card {
  &.uploadImage {
    width: 122px;
    height: 92px;
    line-height: 98px;
    display: inline-block;
  }
}
</style>
