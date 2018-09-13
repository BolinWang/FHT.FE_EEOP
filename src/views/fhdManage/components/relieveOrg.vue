<template>
   <el-dialog title="解除合作机构" :visible.sync="outerVisible">
     <el-form :model="searchForm" :inline="true" :rules="searchF" ref="searchForm">
        <el-form-item label="组织的主账号" prop="mobile">
          <el-input v-model="searchForm.mobile" placeholder="请输入手机号码"></el-input>
        </el-form-item>
     </el-form>
    <el-dialog
      width="40%"
      title="解除合作机构"
      :visible.sync="innerVisible"
      append-to-body>
        <el-form :model="relieve" ref="relieve" :rules="relieveRule" >
          <el-row :gutter="20">
            <el-col :span="12">
               <el-form-item label="机构名称" >
                <el-input v-model="relieve.name" :disabled="true"></el-input>
               </el-form-item>
            </el-col>
            <el-col :span="12">
               <el-form-item label="手机号码" >
                <el-input v-model="relieve.mobile" :disabled="true"></el-input>
               </el-form-item>
            </el-col>
          </el-row>
          <div class="text">确定要此机构解除合作么</div>
          <div class="text">解除后，机构所有房源全部下架，无法给此机构录入房源，带看</div>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="remark" width="100%">
                <el-input v-model="relieve.remark" :maxlength="100"  type="textarea" :rows="2" placeholder="请输入原因（0-100字)"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveOrg">确 定</el-button>
        </div>
    </el-dialog>
    <div slot="footer" class="dialog-footer">
      <el-button @click="clear">取 消</el-button>
      <el-button type="primary" @click="goNext">下一步</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { validateMobile } from '@/utils/validate'
import {
  delObjectItem
} from '@/utils'
import {
  orgManageRecoverApi,
  orgManagequeryByMobileApi
} from '@/api/renting'
import {
  getSessionId
} from '@/utils/auth'
export default {
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!validateMobile(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    return {
      outerVisible: false,
      innerVisible: false,
      searchF: {
        mobile: { required: true, trigger: 'blur', validator: validatePhone }
      },
      relieveRule: {
        remark: [{
          required: true,
          message: '请输入原因',
          trigger: 'blur'
        }]
      },
      searchForm: {
        mobile: '',
        sessionId: getSessionId()
      },
      relieve: {
        remark: '',
        name: '',
        mobile: '',
        id: '',
        sessionId: getSessionId()
      }
    }
  },
  methods: {
    saveOrg() {
      this.$refs['relieve'].validate((valid) => {
        if (valid) {
          const params = {
            id: this.relieve.id,
            remark: this.relieve.remark,
            sessionId: getSessionId()
          }
          orgManageRecoverApi(params).then(res => {
            delObjectItem(this.relieve)
            this.$emit('search')
            this.innerVisible = false
            this.outerVisible = false
            this.$message({
              message: '已解除',
              type: 'succes'
            })
          })
        }
      })
    },
    clear() {
      delObjectItem(this.searchForm)
      this.outerVisible = false
    },
    goNext() {
      this.getManage()
    },
    open() {
      this.outerVisible = true
    },
    getManage() {
      this.$refs['searchForm'].validate((valid) => {
        if (valid) {
          orgManagequeryByMobileApi(this.searchForm).then(res => {
            if (res.code === '0') {
              this.innerVisible = true
              this.relieve.name = res.data.name
              this.relieve.mobile = res.data.mobile
              this.relieve.id = res.data.id
            } else {
              this.$message({
                message: res.message,
                type: 'error'
              })
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
