/*
 * @Author: ghost 
 * @Date: 2018-10-24 17:34:00 
 * @Last Modified by: ghost
 * @Last Modified time: 2018-10-25 16:58:08
 */
<template>
  <el-dialog :before-close="dialogHandleClose" title="关闭客源" :visible.sync="dialogChangeStatus">
    <el-form :rules="rules" ref="formName" :model="form" >
      <div class="text-box">确定要关闭此客源么？</div> 
      <el-form-item  prop="remark">
        <el-input :rows="4" :maxlength='100' v-model="form.remark" type="textarea" placeholder="请输入关闭原因，最多100字符" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogHandleClose('formName')">取 消</el-button>
      <el-button type="primary" @click="closeSure('formName')">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { customerCenterCloseApi } from '@/api/renting'
export default {
  data() {
    return {
      dialogChangeStatus: false,
      rules: {
        remark: [
          { required: true, message: '请输入关闭原因', trigger: 'blur' }
        ]
      },
      form: {
        id: '',
        remark: ''
      }
    }
  },
  methods: {
    closeSure(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          customerCenterCloseApi(this.form).then(res => {
            this.dialogChangeStatus = false
            this.$refs.formName.resetFields()
            if (res.code === '000') {
              this.$message({
                message: '此客源正在带看中，暂时无法关闭',
                type: 'warning'
              })
              return
            }
            this.$message({
              message: '客源状态已关闭',
              type: 'success'
            })
            this.$emit('getSearch')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    dialogHandleClose() {
      this.dialogChangeStatus = false
      this.$refs.formName.resetFields()
    },
    showDialog(id) {
      this.dialogChangeStatus = true
      this.form.id = id
    }
  }
}
</script>
<style lang="scss" scoped>
  .text-box{
    line-height:40px;
  }
</style>

