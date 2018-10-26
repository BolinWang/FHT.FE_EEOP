/*
 * @Author: ghost 
 * @Date: 2018-10-22 16:17:32 
 * @Last Modified by: ghost
 * @Last Modified time: 2018-10-22 22:58:57
 */
<template>
  <div class="compents-container">
    <el-dialog :before-close="handleClose" :title="formCustomers.id?'编辑客源':'新增客源'" :visible.sync="editOrAdd">
      <el-form :model="formCustomers">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input placeholder="请输入" v-model="formCustomers.name" autocomplete="off"></el-input>
          <el-select v-model="formCustomers.gender" placeholder="请选择性别">
            <el-option :label="item.value" :value="item.value" v-for="(item,index) in genderList" :key='index'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客源渠道" :label-width="formLabelWidth">
          <el-select v-model="formCustomers.region" placeholder="请选择客源渠道">
            <!-- <el-option label=" m j q区域一" value="shanghai"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码" :label-width="formLabelWidth">
          <el-input placeholder="请输入手机号码" v-model="formCustomers.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      editOrAdd: false,
      genderList: [
        { value: 1, label: '先生' },
        { value: 2, label: '女士' }
      ],
      formLabelWidth: '100px',
      formCustomers: {
        id: '',
        name: '',
        gender: '',
        mobile: '',
        source: '',
        sourceType: '',
        rentFee: ''
      }
    }
  },
  methods: {
    showDialog(id) {
      this.formCustomers.id = id
      this.editOrAdd = true
    },
    handleClose() {
      this.editOrAdd = false
    }
  }
}
</script>
<style scoped>

</style>
