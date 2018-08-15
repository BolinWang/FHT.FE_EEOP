<template>
  <div>
    <el-form ref="roomDetailModel" :model="roomDetailModel" :rules="roomDetailModelRules" label-width="110px" size="small">
      <template v-if="type === 1">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="公寓" prop="estateName">
              <el-input v-model="estateInfo.estateName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="楼层" prop="floorId">
              <el-select class="room-detail-select" v-model="roomDetailModel.floorId" placeholder="请选择">
                <el-option v-for="item in estateInfo.floors" :key="item.floorId" :label="item.floorName" :value="item.floorId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="起始房号" prop="startNo">
              <el-input v-model="roomDetailModel.startNo" placeholder="例: 101"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="末尾房号" prop="">
              <el-input v-model="roomDetailModel.endNo" placeholder="例: 120"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="跳过尾号" prop="">
              <el-select class="room-detail-select" v-model="roomDetailModel.skipNo" multiple placeholder="请选择">
                <el-option v-for="(item, index) in 10" :key="index" :label="index" :value="index">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房间类型" prop="roomTypeId">
              <el-select class="room-detail-select" v-model="roomDetailModel.roomTypeId" placeholder="请选择">
                <el-option v-for="item in estateInfo.roomTypeList" :key="item.id" :label="item.styleName" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
      <template v-else>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="楼层" prop="floorId">
              <el-select class="room-detail-select" v-model="roomDetailModel.floorId" placeholder="请选择">
                <el-option v-for="item in estateInfo.floors" :key="item.floorId" :label="item.floorName" :value="item.floorId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房号" prop="roomNo">
              <el-input v-model="roomDetailModel.roomNo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="房间类型" prop="roomTypeId">
              <el-select class="room-detail-select" v-model="roomDetailModel.roomTypeId" placeholder="请选择">
                <el-option v-for="item in estateInfo.roomTypeList" :key="item.id" :label="item.styleName" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房间照片" prop="">
              <el-badge :value="roomDetailModel.pictureList.length">
                <el-button type="primary" size="mini" @click="openPicListModel">上传照片</el-button>
              </el-badge>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="室卫厅" class="room-count" prop="chamberCount">
            <el-row :gutter="10">
              <el-col :span="6">
                <el-form-item label="" prop="chamberCount" class="room-item-count">
                  <el-input v-model="roomDetailModel.chamberCount"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                室
              </el-col>
              <el-col :span="6">
                <el-form-item label="" prop="toiletCount" class="room-item-count">
                  <el-input v-model="roomDetailModel.toiletCount"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                卫
              </el-col>
              <el-col :span="6">
                <el-form-item label="" prop="boardCount" class="room-item-count">
                  <el-input v-model="roomDetailModel.boardCount"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                厅
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="面积" prop="roomArea">
            <el-input placeholder="请输入内容" v-model="roomDetailModel.roomArea">
              <template slot="append">m<sup>2</sup></template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="装修程度" prop="decorationDegree">
            <el-select class="room-detail-select" v-model="roomDetailModel.decorationDegree" placeholder="请选择">
              <el-option v-for="item in decorationDegreeList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="朝向" prop="roomDirection">
            <el-select class="room-detail-select" v-model="roomDetailModel.roomDirection" placeholder="请选择">
              <el-option v-for="item in roomDirectionList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="最多入住人数" prop="maxPerson">
            <el-input v-model="roomDetailModel.maxPerson"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="床数" prop="bedCount">
            <el-input v-model="roomDetailModel.bedCount"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="飞虎队">
            <el-checkbox v-model="roomDetailModel.tag"></el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog title="上传照片" :visible.sync="uploadPicsModelVisible" width="600px" :append-to-body="true" custom-class="upload-pics-model">
      <div class="previewItems">
        <preview :pic-list="roomDetailModel.pictureList" :delete-icon="`delete`" @emitDelete="emitDelete">
        </preview>
        <label class="el-upload el-upload--picture-card uploadImage" for="uploadImages">
          <i class="el-icon-plus"></i>
          <input type="file" id="uploadImages" :accept="accept" multiple @change="uploadImg($event)">
        </label>
      </div>
      <p class="upload-pics-info">温馨提示： </p>
      <p class="upload-pics-info">1.请勿上传虚假、模糊、与房源信息无关、含有其他公司水印的照片； </p>
      <p class="upload-pics-info">2.房间照片最佳组合：卧室2~6张、公共区域1~4张、厨房1~3张、卫生间1-4张； </p>
      <p class="upload-pics-info">3.目前最多支持15张，支持JPG/JPEG/PNG，可以拖动图片进行排序，支持批量上传。</p>
      <ImageCropper :cropperList="cropperList" @emitCropperList="emitCropperList" @emitCropperData="emitCropperData">
      </ImageCropper>
      <span slot="footer">
        <el-button @click="uploadPicsModelVisible = false" size="small" type="primary">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { deepClone } from '@/utils'
import Preview from '@/components/Preview/Preview'
import ImageCropper from '@/components/ImageCropper/Cropper'
export default {
  name: 'roomDetailModel',
  components: {
    Preview,
    ImageCropper
  },
  props: [
    'type',
    'modelVisible',
    'estateInfo'
  ],
  data() {
    return {
      roomDetailModel: {},
      roomDetailModelRules: {
        estateName: [
          { required: true, message: '请输入公寓名称', trigger: 'change' }
        ],
        floorId: [
          { required: true, message: '请选择楼层', trigger: 'change' }
        ],
        roomCode: [
          { required: true, message: '请输入房号', trigger: 'change' }
        ],
        startNo: [
          { required: true, message: '请输入起始房号', trigger: 'change' }
        ],
        roomTypeId: [
          { required: true, message: '请选择房间类型', trigger: 'change' }
        ],
        chamberCount: [
          { required: true, message: '请输入值', trigger: 'change' }
        ],
        toiletCount: [
          { required: true, message: '请输入值', trigger: 'change' }
        ],
        boardCount: [
          { required: true, message: '请输入值', trigger: 'change' }
        ],
        roomArea: [
          { required: true, message: '请输入房间面积', trigger: 'change' }
        ],
        decorationDegree: [
          { required: true, message: '请选择装修程度', trigger: 'change' }
        ],
        roomDirection: [
          { required: true, message: '请选择房间朝向', trigger: 'change' }
        ],
        maxPerson: [
          { required: true, message: '请输入房间最多入住人数', trigger: 'change' }
        ],
        bedCount: [
          { required: true, message: '请输入房间床数', trigger: 'change' }
        ]
      },
      decorationDegreeList: [
        {
          label: '毛坯',
          value: 1
        },
        {
          label: '简装',
          value: 2
        },
        {
          label: '精装修',
          value: 3
        },
        {
          label: '豪华装',
          value: 4
        }
      ],
      roomDirectionList: [
        {
          label: '朝南',
          value: 1
        },
        {
          label: '朝北',
          value: 2
        },
        {
          label: '朝东',
          value: 3
        },
        {
          label: '朝西',
          value: 4
        },
        {
          label: '东南',
          value: 5
        },
        {
          label: '西南',
          value: 6
        },
        {
          label: '东北',
          value: 7
        },
        {
          label: '西北',
          value: 8
        }
      ],
      uploadPicsModelVisible: false,
      cropperList: [],
      accept: 'image/png, image/jpeg, image/jpg'
    }
  },
  methods: {
    openPicListModel() {
      this.uploadPicsModelVisible = true
    },
    // 删除图片
    emitDelete(val) {
      this.roomDetailModel.pictureList = val
    },
    // 上传的图片列表
    emitCropperList(list = []) {
      this.cropperList = list
    },
    // 裁剪后图片列表
    emitCropperData(list = []) {
      list.forEach((v, i) => {
        v.type = 1
        // v.imageName = v.title
        // v.imageUrl = v.src
        // v.isBase64 = true
      })
      let picList = [...this.roomDetailModel.pictureList, ...list]
      this.$set(this.roomDetailModel, 'pictureList', picList)
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
      e.target.value = null
    },
    /* 保存房间详情信息 */
    saveRoomData() {
      let roomData = false
      this.$refs.roomDetailModel.validate((status) => {
        if (status) {
          roomData = deepClone(this.roomDetailModel)
          if (this.type === 2) {
            roomData.uploadPictureList = roomData.pictureList.filter(item => item.isBase64)
            roomData.pictureList = roomData.pictureList.filter(item => !item.isBase64)
          }
          roomData.skipNo = roomData.skipNo ? roomData.skipNo.join(',') : []
          roomData.tag = roomData.tag ? 1 : 0
        }
      })
      return roomData
    }
  },
  watch: {
    modelVisible: {
      immediate: true,
      handler: function (val) {
        if (val) {
          this.type === 1 && this.$set(this.roomDetailModel, 'estateName', this.estateInfo.estateName)
          this.type === 2 && this.$set(this, 'roomDetailModel', deepClone(this.$store.state.estateDetailData.estateRoomInfo))
          this.$nextTick(() => {
            this.$refs.roomDetailModel.clearValidate()
          })
        } else {
          Object.keys(this.roomDetailModel).forEach((key) => {
            this.roomDetailModel[key] = Object.prototype.toString.call(this.roomDetailModel[key]) === '[object Array]' ? [] : ''
          })
        }
      }
    }
  }
}
</script>

<style lang="scss">
.room-detail-select {
  width: 100%;
}
.room-count {
  .room-item-count {
    margin-bottom: 0;
  }
  label {
    width: 90px !important;
    padding-right: 0;
  }
}
.upload-pics-model {
  .previewItems {
    margin-bottom: 10px;
    .el-upload--picture-card.uploadImage {
      width: 122px;
      height: 92px;
      line-height: 98px;
    }
  }
  .upload-pics-info {
    margin: 0 0 5px;
  }
}
</style>

