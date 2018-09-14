/*
 * @Author: ghost 
 * @Date: 2018-09-05 18:34:04 
 * @Last Modified by: 
 * @Last Modified time: 2018-09-14 11:00:05
 */
<template>
  <div class="container">
    <el-dialog class="organEdit" title="飞虎队企业机构" width="800px" v-if="companyTableVisible" :visible.sync="companyTableVisible">
      <el-form :model="companyForm" :inline="true" :rules="rules" ref="ruleForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业名称" >
               <el-input v-model="companyForm.companyName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        <el-col :span="12">
            <el-form-item label="企业法人" >
               <el-input v-model="companyForm.legalPerson" :disabled="true"></el-input>
            </el-form-item>
        </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="社会统一信用代码" >
               <el-input v-model="companyForm.unifiedSocialCreditCode" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出房费率" >
               <el-input v-model="companyForm.splitFee" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业联系人" >
               <el-input v-model="companyForm.name" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码" >
               <el-input v-model="companyForm.mobile" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人身份证" prop="idNum">
               <el-input v-model="companyForm.idNum" :disabled="textCard()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房源体量" prop="volumn">
               <el-input v-model="companyForm.volumn" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="银行开户名" >
               <el-input v-model="companyForm.accountName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="银行卡号" >
               <el-input v-model="companyForm.bankCardNum" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="平台代收租服务"  label-width="120px">
              <div class="previewItems">
                <Preview
                  :pic-list="companyForm.proxyImageList"
                  :delete-icon="`delete`"
                  :disabled="``"
                  @emitDelete="emitDelete($event,'proxyImageList')">
                </Preview>
              </div>
              <label class="el-upload el-upload--picture-card uploadImage" for="uploadImages">
                  <i class="el-icon-plus"></i>
                  <input type="file" id="uploadImages" :accept="accept" multiple @change="uploadImg($event,'proxyImageList')">
              </label>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="房源发布和租客引流服务" label-width="120px">
              <div class="previewItems">
                <Preview
                  :pic-list="companyForm.attractionFlowImageList"
                  :delete-icon="`delete`"
                  :disabled="``"
                  @emitDelete="emitDelete($event,'attractionFlowImageList')">
                </Preview>
              </div>
              <label class="el-upload el-upload--picture-card uploadImage" for="uploadImageflow">
                  <i class="el-icon-plus"></i>
                  <input type="file" id="uploadImageflow" :accept="accept" multiple @change="uploadImg($event,'attractionFlowImageList')">
              </label>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="企业营业执照" label-width="120px">
              <div class="previewItems">
                <Preview
                  :pic-list="companyForm.businessLicenseImageList"
                  :delete-icon="`delete`"
                  :disabled="``"
                  @emitDelete="emitDelete($event,'businessLicenseImageList')">
                </Preview>
              </div>
              <label class="el-upload el-upload--picture-card uploadImage" for="uploadImagebusiness">
                  <i class="el-icon-plus"></i>
                  <input type="file" id="uploadImagebusiness" :accept="accept" multiple @change="uploadImg($event,'businessLicenseImageList')">
              </label>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="联系人身份证照片" >
              <div class="previewItems">
                <Preview
                  :pic-list="companyForm.idCardImageList"
                  :delete-icon="`delete`"
                  :disabled="``"
                  @emitDelete="emitDelete($event,'idCardImageList')">
                </Preview>
              </div>
              <label class="el-upload el-upload--picture-card uploadImage" for="uploadImageidCard">
                  <i class="el-icon-plus"></i>
                  <input type="file" id="uploadImageidCard" :accept="accept" multiple @change="uploadImg($event,'idCardImageList')">
              </label>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 图片裁剪 -->
      <ImageCropper :cropperList="cropperList" @emitCropperList="emitCropperList" @emitCropperData="emitCropperData">
      </ImageCropper>
      <div slot="footer" class="dialog-footer">
            <el-button @click="closeDialog('companyTableVisible')">取 消</el-button>
            <el-button type="primary" @click="submit('companyTableVisible')">确 定</el-button>
      </div>
    </el-dialog>
     <el-dialog class="organEdit" title="飞虎队个人机构" width="800px" v-else :visible.sync="personalTableVisible">
      <el-form :model="companyForm" :inline="true" :rules="rules" ref="ruleForm"> 
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" >
               <el-input v-model="companyForm.name" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        <el-col :span="12">
            <el-form-item label="手机号码" >
               <el-input v-model="companyForm.mobile" :disabled="true"></el-input>
            </el-form-item>
        </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="身份证" prop="idNum">
               <el-input v-model="companyForm.idNum" :disabled=" textCard()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出房费率" >
               <el-input v-model="companyForm.splitFee" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="房源体量" prop="volumn">
               <el-input v-model="companyForm.volumn"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="银行开户名" >
               <el-input v-model="companyForm.accountName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="银行卡号">
               <el-input v-model="companyForm.bankCardNum" :disabled="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="平台代收租服务" label-width="120px">
              <div class="previewItems">
                <Preview
                  :pic-list="companyForm.proxyImageList"
                  :delete-icon="`delete`"
                  :disabled="``"
                  @emitDelete="emitDelete($event,'proxyImageList')">
                </Preview>
              </div>
              <label class="el-upload el-upload--picture-card uploadImage" for="uploadImagesper">
                  <i class="el-icon-plus"></i>
                  <input type="file" id="uploadImagesper" :accept="accept" multiple @change="uploadImg($event,'proxyImageList')">
              </label>
              <!-- <el-upload
                class="upOgn"
                :action="`${actionBaseUrl}/api/upload/picture`"
                :before-upload="pictureUpload"
                :on-preview="picturePreview"
                :on-change="resetFile"
                :on-error="pictureError"
                :on-success="pictureSuccess"
                :limit="10" multiple :on-exceed="handleExceed"
                accept="image/jpg,image/jpeg,image/png" list-type="picture-card">
                <i class="el-icon-plus"></i>
                <div slot="tip" class="el-upload__tip">单张不超过5M，最多上传3张</div>
              </el-upload> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="房源发布和租客引流服务" label-width="120px">
             <div class="previewItems">
                <Preview
                  :pic-list="companyForm.attractionFlowImageList"
                  :delete-icon="`delete`"
                  :disabled="``"
                  @emitDelete="emitDelete($event,'attractionFlowImageList')">
                </Preview>
              </div>
              <label class="el-upload el-upload--picture-card uploadImage" for="uploadImagesflow">
                  <i class="el-icon-plus"></i>
                  <input type="file" id="uploadImagesflow" :accept="accept" multiple @change="uploadImg($event,'attractionFlowImageList')">
              </label>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="身份证照片" label-width="120px">
              <div class="previewItems">
                <Preview
                  :pic-list="companyForm.idCardImageList"
                  :delete-icon="`delete`"
                  :disabled="``"
                  @emitDelete="emitDelete($event,'idCardImageList')">
                </Preview>
              </div>
              <label class="el-upload el-upload--picture-card uploadImage" for="uploadImagesidCards">
                  <i class="el-icon-plus"></i>
                  <input type="file" id="uploadImagesidCards" :accept="accept" multiple @change="uploadImg($event,'idCardImageList')">
              </label>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 图片裁剪 -->
      <ImageCropper :cropperList="cropperList" @emitCropperList="emitCropperList" @emitCropperData="emitCropperData">
      </ImageCropper>
      <div slot="footer" class="dialog-footer">
            <el-button @click="closeDialog('personalTableVisible')">取 消</el-button>
            <el-button type="primary" @click="submit('personalTableVisible')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getSessionId
} from '@/utils/auth'
import { validateisCardNo, validateIntAndZero } from '@/utils/validate'
import Preview from '@/components/Preview/Preview'
import ImageCropper from '@/components/ImageCropper/Cropper'
import { delObjectItem } from '@/utils'
import { orgManagequeryByIdApi, orgManageSave } from '@/api/renting'
export default {
  components: {
    Preview,
    ImageCropper
  },
  data() {
    const isCardNo = (rule, value, callback) => {
      if (!validateisCardNo(value)) {
        callback(new Error('请输入正确身份证号码'))
      } else {
        callback()
      }
    }
    const isZero = (rule, value, callback) => {
      if (!validateIntAndZero(value)) {
        callback(new Error('请输入正整数'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        idNum: [
          { required: true, trigger: 'blur', validator: isCardNo }
        ],
        volumn: [
          { required: true, trigger: 'blur', validator: isZero }
        ]
      },
      text: '',
      accept: 'image/png, image/jpeg, image/jpg',
      companyTableVisible: false,
      personalTableVisible: false,
      companyForm: {},
      cropperList: [],
      personalForm: {},
      key: null
    }
  },
  mounted() {

  },
  methods: {
    textCard() {
      if (this.text === '33000000000000') {
        return false
      } else if (this.text === null || this.text === '') {
        return false
      } else {
        return true
      }
    },
    // 关闭弹窗
    closeDialog(key) {
      this[key] = false
      delObjectItem(this.companyForm)
    },
    submit(key) {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          orgManageSave(this.companyForm).then(res => {
            this[key] = false
            this.getData()
            console.log('12')
            console.log(res)
            // delObjectItem(this.companyForm)
          })
        }
      })
    },
    // 删除图片
    emitDelete(val, key) {
      this.companyForm[key] = val
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
      const listproxy = [...this.companyForm[this.key], ...list]
      this.companyForm[this.key] = listproxy.map((value, index) => {
        if (value.src.indexOf('data:image/jpeg;base64') !== -1) {
          return {
            src: value.src,
            tag: 0
          }
        } else {
          return {
            src: value.src,
            tag: 1
          }
        }
      })
    },
    /* 选择图片 */
    async uploadImg(e, keys) {
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
          console.log(this.companyForm[keys].length)
          if (this.companyForm[keys].length > 2) {
            this.$message.error(`您已上传${this.companyForm[keys].length}张图片，最多还能上传${3 - this.companyForm[keys].length}张图片`)
            return false
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
      this.key = keys
      e.target.value = null
    },
    open(data) {
      this.datalist = data
      console.log(data)
      this.datalist.type === 1 ? this.personalTableVisible = true : this.companyTableVisible = true
      this.getData()
    },
    getData() {
      const params = {
        sessionId: getSessionId,
        id: this.datalist.id
      }
      orgManagequeryByIdApi(params).then(res => {
        this.companyForm = res.data
        this.text = this.companyForm.idNum
      })
    }
  }
}
</script>
<style scoped lang="scss">
 .container .el-upload--picture-card {
    &.uploadImage {
      width: 120px;
      height: 90px;
      line-height: 88px;
      display: inline-block;
    }
  }
</style>