<template>
   <div class="container-upload">
      <div class="previewItems">
        <Preview
          :pic-list="fileList"
          :delete-icon="`delete`"
          :disabled="``"
          @emitDelete="emitDelete">
        </Preview>
       </div>
       <el-upload
        class="upOgn"
        :action="`${actionBaseUrl}/api/upload/picture`"
        :before-upload="pictureUpload"
        :on-preview="picturePreview"
        :on-change="resetFile"
        :disabled='fileList.length>=2'
        :on-error="pictureError"
        :on-success="pictureSuccess"
        :limit="10" multiple :on-exceed="handleExceed"
        accept="image/jpg,image/jpeg,image/png" list-type="picture-card">
        <i class="el-icon-plus"></i>
        <div slot="tip" class="el-upload__tip">单张不超过5M，最多上传10张</div>
      </el-upload>
   </div>
</template>
<script>
import Preview from '@/components/Preview/Preview'
export default {
   components: {
    Preview
  },
  props: {
    fileList:Array
  },
  data () {
    return {
      fileListLeng:[],
      actionBaseUrl: process.env.FLY_API,
      iSFile: false,
      accept: 'image/png, image/jpeg, image/jpg',
    }
  },
  watch: {
    
  },
  methods: {
    pictureError(err, file) {
      file = null;
    },
    handleExceed(files) {
      // this.$message.warning(`当前限制上传 3 张图片，本次选择了 ${files.length} 个文件，共选择了 ${files.length + this.fileList.length} 个文件`);
    },
    // 删除图片
    emitDelete(val) {
      this.fileList = val
    },
    resetFile(file) {
      file = null;
    },
     pictureSuccess(response, file) {
      this.fileList.push({
        'src': file.response.data
      })
    },
    // 上传的图片列表
     pictureUpload(file) {
      const isLt5M = file.size / 1024 / 1024 <= 5
      if (['image/jpeg', 'image/jpg', 'image/png'].indexOf(file.type) == -1) {
        this.$message.error('请上传jpg/png的图片');
        return false;
      }
      if (!isLt5M) {
        this.$message.error('请上传5Mb大小以内的图片');
        return false;
      }
     
    },
    picturePreview(file){
    console.log(file)
    },
  }
}
</script>
<style>

</style>

