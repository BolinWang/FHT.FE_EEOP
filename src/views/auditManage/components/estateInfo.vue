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
      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="estateInfoData.desc"
        :disabled="temp.reviewStatus !== 1 || type === `published`">>
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
    <!-- <el-form-item v-if="type == 'audit'" label="审核结果">
      <el-radio-group v-model="estateInfoData.reviewStatus" v-if="!temp.reviewStatus || temp.reviewStatus === 1">
        <el-radio :label="2">通过</el-radio>
        <el-radio :label="3">不通过</el-radio>
      </el-radio-group>
      <el-tag v-else :type="temp.reviewStatus | statusFilter">
        {{temp.reviewStatus | statusStrFilter}}
      </el-tag>
    </el-form-item>
    <el-form-item v-if="type === 'audit' && estateInfoData.reviewStatus" label="请选择">
      <el-select size="small" v-if="estateInfoData.reviewStatus === 3"
        v-model="estateInfoData.remark"
        placeholder="请选择不通过原因" class="item-select"
        clearable style="width: 200px;">
        <el-option v-for="item in remarkOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select size="small" v-else-if="estateInfoData.reviewStatus === 2"
         v-model="estateInfoData.accordPic"
         placeholder="请选择是否符合图招" class="item-select"
         clearable style="width: 200px;">
        <el-option label="符合图招" :value="2"></el-option>
        <el-option label="不符合图招" :value="1"></el-option>
      </el-select>
    </el-form-item> -->
    <el-form-item v-if="type == 'published'" label="操作">
      <el-checkbox v-model="checked">立即下架</el-checkbox>
    </el-form-item>
    <el-form-item label="房型照片">
      <div class="previewItems">
        <Preview
          :pic-list="estateInfoData.picList"
          :delete-icon="``"
          :disabled="``"
          @emitDelete="emitDelete">
        </Preview>
        <!-- <label v-if="temp.reviewStatus === 1" class="el-upload el-upload--picture-card uploadImage" for="uploadImages">
          <i class="el-icon-plus"></i>
          <input type="file" id="uploadImages" :accept="accept" multiple @change="uploadImg($event)">
        </label> -->
      </div>
      <!-- 图片裁剪 -->
      <ImageCropper
        :cropperList="cropperList"
        @emitCropperList="emitCropperList"
        @emitCropperData="emitCropperData">
      </ImageCropper>
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
import ImageCropper from '@/components/ImageCropper/Cropper'
import { parseTime, ObjectMap, deepClone } from '@/utils'
import noPic from '@/assets/noPic.jpg'
import store from '@/store'

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
    Preview,
    ImageCropper
  },
  filters: {
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
  data() {
    return {
      temp: deepClone(this.tempData),
      listLoading: false,
      estateInfoData: {
        picList: [],
        reviewStatus: '',
        remark: ''
      },
      remarkOptions: [
        { label: '照片不符合上传规则', value: '照片不符合上传规则' },
        { label: '房源描述不符合规则', value: '房源描述不符合规则' },
        { label: '电话信息错误', value: '电话信息错误' },
        { label: '面积信息错误', value: '面积信息错误' }
      ],
      checked: false,
      cropperList: [],
      accept: 'image/png, image/jpeg, image/jpg',
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
    let picList = this.temp.roomTypePicUrls || []
    this.estateInfoData.desc = deepClone(this.temp).introduction
    this.estateInfoData.picList = picList.map((item) => {
      return { id: item.id, src: item.picUrl, picTag: item.picTag || '', type: item.picType }
    });
  },
  methods: {
    emitPicList(val) {
      this.estateInfoData.picList = val
    },
    // 删除图片
    emitDelete(val) {
      this.estateInfoData.picList = val
    },
    // 上传的图片列表
    emitCropperList(list = []) {
      this.cropperList = list
    },
    // 裁剪后图片列表
    emitCropperData(list = []) {
      this.$set(this.estateInfoData,'picList',[...this.picList,...list])
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
        this.checked = false
        let picList = val.roomTypePicUrls || []
        this.houseInfoData = {
          reviewStatus: '',
          remark: '',
          desc: deepClone(val).introduction,
          picList: picList.map((item) => {
            return { src: item.picUrl, id: item.id, picTag: item.picTag || '', type: item.picType }
          })
        }
      },
      deep: true
    },
    estateInfoData: {
      handler(val) {
        val.remark = val.reviewStatus === 2 ? '' : val.remark
        // 未审核数据
        if (this.type === 'audit' && this.temp.reviewStatus === 1) {
          store.dispatch('UpdateInfoData', {
            data: val,
            housingType: 1
          })
        }
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
