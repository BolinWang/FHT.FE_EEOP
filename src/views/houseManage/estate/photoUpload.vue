<template>
  <div>
    <el-button type="primary" @click="uploadPicsModelVisible = true">点我</el-button>

    <el-dialog title="上传公寓照片" :visible.sync="uploadPicsModelVisible" width="600px" :append-to-body="true" custom-class="upload-pics-model">
      <div class="previewItems">
        <Preview :pic-list="pictureList" :delete-icon="`delete`" :disabled="``" @emitDelete="emitDelete">
        </Preview>
        <label class="el-upload el-upload--picture-card uploadImage" for="uploadImages">
          <i class="el-icon-plus"></i>
          <input type="file" id="uploadImages" :accept="accept" multiple @change="uploadImg($event)">
        </label>
      </div>
      <!-- 图片裁剪 -->
      <ImageCropper :cropperList="cropperList" @emitCropperList="emitCropperList" @emitCropperData="emitCropperData">
      </ImageCropper>
      <span slot="footer">
        <el-button @click="uploadPicsModelVisible = false" size="small" type="primary">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Preview from '@/components/Preview/Preview'
import ImageCropper from '@/components/ImageCropper/Cropper'
export default {
  components: {
    Preview,
    ImageCropper
  },
  data() {
    return {
      pictureList: [],
      cropperList: [],
      accept: 'image/png, image/jpeg, image/jpg',
      uploadPicsModelVisible: false
    }
  },
  methods: {
    // 删除图片
    emitDelete(val) {
      this.pictureList = val
    },
    // 上传的图片列表
    emitCropperList(list = []) {
      this.cropperList = list
    },
    // 裁剪后图片列表
    emitCropperData(list = []) {
      list.forEach((v, i) => {
        v.type = 1
      })
      this.pictureList = [...this.pictureList, ...list]
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
        reader.onerror = function (e) {
          console.log('读取异常....')
        }
        reader.onload = e => {
          const img = (typeof e.target.result === 'object')
            // 把Array Buffer转化为blob 如果是base64不需要
            ? window.URL.createObjectURL(new Blob([e.target.result]))
            : e.target.result
          let imageName = ''
          let type = 1
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
      this.layer_cropper = true
      e.target.value = null
    }
  }
}
</script>

<style>
</style>
