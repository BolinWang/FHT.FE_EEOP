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
  data() {
    return {
      temp: deepClone(this.tempData),
      listLoading: false,
      checked: false,
      cropperList: [],
      accept: 'image/png, image/jpeg, image/jpg',
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
        this.checked = false
        this.deleteIds = []
        let picList = val.roomTypePicUrls || []
        this.temp.picList = picList.map((item) => {
          return { src: item.picUrl, w: 800, h: 600, id: item.id }
        })
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
.el-upload--picture-card {
  &.uploadImage {
    width: 122px;
    height: 92px;
    line-height: 98px;
    display: inline-block;
  }
}
</style>
