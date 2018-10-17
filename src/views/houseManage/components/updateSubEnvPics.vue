<template>
  <el-dialog title="上传小区环境图" :visible.sync="dialog_showPic" :append-to-body="true" @close="dialogClose" width="600px">
    <div class="previewItems">
      <Preview :pic-list="currentPicList" :delete-icon="`delete`" :disabled="``" @emitDelete="emitDelete">
      </Preview>
      <label class="el-upload el-upload--picture-card uploadImage" for="core_uploadImages">
        <i class="el-icon-plus"></i>
        <input type="file" id="core_uploadImages" :accept="accept" multiple @change="uploadImg($event)">
      </label>
    </div>
    <p class="upload-pics-info">温馨提示： </p>
    <p class="upload-pics-info">1.请勿上传虚假、模糊、与小区环境信息无关、含有其他公司水印的照片； </p>
    <p class="upload-pics-info">2.上传小区环境照片不得少于两张； </p>
    <p class="upload-pics-info">3.目前最多支持15张，支持JPG/JPEG/PNG，可以拖动图片进行排序，支持批量上传。</p>
    <!-- 图片裁剪 -->
    <ImageCropper :cropperList="cropperList" @emitCropperList="emitCropperList" @emitCropperData="emitCropperData">
    </ImageCropper>
    <span slot="footer" v-if="type === `total`">
      <el-button @click="savePics" size="small" type="primary">确定</el-button>
      <el-button @click="dialog_showPic = false" size="small" type="primary">取消</el-button>
    </span>
    <span slot="footer" v-else>
      <el-button @click="dialog_showPic = false" size="small" type="primary">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Preview from '@/components/Preview/Preview'
import ImageCropper from '@/components/ImageCropper/Cropper'
import { uploadHousesPicturesApi } from '@/api/houseManage'
export default {
  name: 'updateSubEnvPics',
  components: {
    Preview,
    ImageCropper
  },
  props: {
    // total: 统一上传
    type: {
      type: String,
      default: 'total'
    },
    isShow: {
      type: Boolean,
      default: false
    },
    dataList: {
      type: Array,
      default: () => {
        return []
      }
    },
    picList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      cropperList: [],
      currentPicList: this.picList,
      accept: 'image/png, image/jpeg, image/jpg',
      dialog_showPic: false,
      dataListMap: this.dataList
    }
  },
  watch: {
    isShow(val) {
      this.dialog_showPic = val || false
    },
    dataList: {
      immediate: true,
      handler(val) {
        this.dataListMap = (val || []).slice()
      }
    },
    picList: {
      immediate: true,
      handler(val) {
        this.currentPicList = (val || []).slice()
      }
    }
  },
  methods: {
    dialogClose() {
      this.$emit('emitHandleSubEnv', {
        isShow: false,
        picList: this.currentPicList.map(item => {
          return {
            imageName: item.imageName,
            isBase64: 1,
            src: item.src,
            picTag: item.picTag || '小区环境'
          }
        })
      })
      this.currentPicList = []
    },
    savePics() {
      if (this.currentPicList.length < 2) {
        this.$message.error('请上传至少2张小区环境图片')
        return false
      }
      const houseInfo = this.dataListMap.map(item => {
        return {
          houseId: item.houseId,
          isFlying: item.tags.find((val) => {
            return val === '飞虎队'
          }) ? 1 : 0
        }
      })
      uploadHousesPicturesApi({
        houseInfo,
        pictures: this.currentPicList.map(item => {
          return {
            imageName: item.imageName,
            isBase64: 1,
            src: item.src,
            picTag: item.picTag || '小区环境'
          }
        })
      }).then(res => {
        console.log(res)
        this.$emit('emitHandleSubEnv', {
          isShow: false
        })
      }).catch()
    },
    // 删除图片
    emitDelete(val) {
      this.currentPicList = val || []
    },
    // 上传的图片列表
    emitCropperList(list = []) {
      this.cropperList = list
    },
    // 裁剪后图片列表
    emitCropperData(list = []) {
      const listMap = list.map(item => {
        return {
          imageName: item.title,
          isBase64: 1,
          src: item.src,
          picTag: item.picTag || '小区环境'
        }
      })
      console.log(listMap)
      this.currentPicList = [...this.currentPicList, ...listMap]
    },
    /* 选择图片 */
    async uploadImg(e) {
      if (!e.target.value) {
        console.log('取消上传...')
        return false
      }
      const uploadList = []
      const readFileAsync = file => new Promise(resolve => {
        const reader = new FileReader()
        reader.onerror = function(e) {
          console.log('读取异常....')
        }
        reader.onload = e => {
          const img = (typeof e.target.result === 'object')
            // 把Array Buffer转化为blob 如果是base64不需要
            ? window.URL.createObjectURL(new Blob([e.target.result]))
            : e.target.result
          let imageName = ''
          const type = 1
          if (!file.name) {
            imageName = ''
          } else {
            imageName = file.name.split('.')[0].length <= 30
              ? file.name.split('.')[0]
              : file.name.split('.')[0].substr(0, 30)
          }
          resolve({
            img,
            imageName,
            type
          })
        }
        // 转化为base64
        // reader.readAsDataURL(file)
        // 转化为blob
        reader.readAsArrayBuffer(file)
      })

      const files = e.target.files
      const picList = this.currentPicList
      if (picList.length + files.length > 15) {
        this.$message.error(`您已上传${picList.length}张图片，最多还能上传${15 - picList.length}张图片`)
        e.target.value = null
        return false
      }
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
          imageName: item.imageName,
          type: item.type
        }
      })
      e.target.value = null
    }
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
.el-upload--picture-card.uploadImage {
  width: 122px;
  height: 92px;
  line-height: 98px;
}
</style>
